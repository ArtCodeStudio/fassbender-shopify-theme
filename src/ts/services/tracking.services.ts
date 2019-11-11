import {
  EventDispatcher,
} from '@ribajs/core';

import { State } from '@ribajs/router';

export interface TheTradeDesk {
  enabled: boolean;
  adv: string;
  tagId: string;
  baseSrc: string;
}

export interface GoogleAnalytics {
  enabled: boolean;
  trackingId: string;
}

export interface PinterestTag {
  enabled: boolean;
  trackingId: string;
}

export interface FacebookPixel {
  enabled?: boolean;
}

// see also PrivacySettingsComponent
export class TrackingService {

  public static instance?: TrackingService;

  public shopifyCartEventDispatcher = new EventDispatcher('ShopifyCart');

  public theTradeDeskDisableStr: string;

  public googleAnalyticsDisableStr: string;

  public facebookPixelDisableStr: string;

  public pinterestTagDisableStr: string;

  protected theTradeDesk: TheTradeDesk;

  protected googleAnalytics: GoogleAnalytics;

  protected facebookPixel: FacebookPixel = {};

  protected pinterestTag: PinterestTag;

  protected dispatcher = new EventDispatcher('main');

  // Original document.cookie function to hold them if we block all cookies
  protected _cookie: any;

  public get theTradeDeskDisabled(): boolean {
    if (document.cookie.indexOf(this.theTradeDeskDisableStr + '=true') > -1) {
      return true;
    }
    return false;
  }

  public set theTradeDeskDisabled(disabled: boolean) {
    document.cookie = `${this.theTradeDeskDisableStr}=${disabled}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
    (window as any)[this.theTradeDeskDisableStr] = disabled;
    this.theTradeDesk.enabled = !disabled;
  }

  public get googleAnalyticsDisabled(): boolean {
    if (document.cookie.indexOf(this.googleAnalyticsDisableStr + '=true') > -1) {
      return true;
    }
    return false;
  }

  public set googleAnalyticsDisabled(disabled: boolean) {
    document.cookie = `${this.googleAnalyticsDisableStr}=${disabled}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
    // see https://developers.google.com/analytics/devguides/collection/analyticsjs/user-opt-out
    (window as any)[this.googleAnalyticsDisableStr] = disabled;
    this.googleAnalytics.enabled = !disabled;

    // be sure that ga is disabled by overwrite the function
    if (disabled) {
      (window as any)._ga = (window as any).ga;
      (window as any).ga = (...args: any[]) => {
        console.warn('ga is disabled, ignore', args);
      };
    } else {
      if ((window as any)._ga) {
        (window as any).ga = (window as any)._ga;
      }
    }
  }

  public get facebookPixelDisabled(): boolean {
    if (document.cookie.indexOf(this.facebookPixelDisableStr + '=true') > -1) {
      return true;
    }
    return false;
  }

  public set facebookPixelDisabled(disabled: boolean) {
    document.cookie = `${this.facebookPixelDisableStr}=${disabled}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
    // see https://www.tba-berlin.de/blog/dsgvo-optout/
    (window as any)[this.facebookPixelDisableStr] = disabled;
    this.facebookPixel.enabled = !disabled;

    // be sure that fbq is disabled by overwrite the function
    if (disabled) {
      (window as any)._fbq = (window as any).fbq;
      (window as any).fbq = (...args: any[]) => {
        console.warn('fbp is disabled, ignore', args);
      };
    } else {
      if ((window as any)._fbq) {
        (window as any).fbq = (window as any)._fbq;
      }
    }
  }

  public get pinterestTagDisabled(): boolean {
    if (document.cookie.indexOf(this.pinterestTagDisableStr + '=true') > -1) {
      return true;
    }
    return false;
  }

  public set pinterestTagDisabled(disabled: boolean) {
    document.cookie = `${this.pinterestTagDisableStr}=${disabled}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
    // see https://www.tba-berlin.de/blog/dsgvo-optout/
    (window as any)[this.pinterestTagDisableStr] = disabled;
    this.pinterestTag.enabled = !disabled;

    // be sure that pintrk is disabled by overwrite the function
    if (disabled) {
      (window as any)._pintrk = (window as any).pintrk;
      (window as any).pintrk = (...args: any[]) => {
        console.warn('pinterest is disabled, ignore', (window as any).pintrk);
      };
    } else {
      if ((window as any)._pintrk) {
        (window as any).pintrk = (window as any)._pintrk;
      }
    }
  }

  public set cookieStorageDisabled(disabled: boolean) {
    if (disabled) {
      this.blockCookies();
    } else {
      this.unblockCookies();
    }
  }

  constructor(settings: {
    theTradeDesk: TheTradeDesk,
    googleAnalytics: GoogleAnalytics,
    pinterestTag: PinterestTag,
  }) {

    this.theTradeDesk = settings.theTradeDesk;
    this.googleAnalytics = settings.googleAnalytics;
    this.pinterestTag = settings.pinterestTag;

    this.googleAnalyticsDisableStr = 'ga-disable-' + this.googleAnalytics.trackingId;
    this.theTradeDeskDisableStr = 'TTDOptOut';
    this.facebookPixelDisableStr = 'fb-pixel-is-disabled';
    this.pinterestTagDisableStr = 'pinterest-tag-is-disabled';

    this.checkDisableTrackingCookies();

    /**
     * store original cookie getter and setter to make it possible to revert the block
     */
    this._cookie = {
      get: undefined as any,
      set: undefined as any,
    };

    if ((document as any).__lookupGetter__ && (document as any).__lookupGetter__('cookie')) {
      this._cookie.get = (document as any).__lookupGetter__('cookie');
    }

    if ((document as any).__lookupSetter__ && (document as any).__lookupSetter__('cookie')) {
      this._cookie.set = (document as any).__lookupSetter__('cookie');
    }

    if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(document, 'cookie') && (Object.getOwnPropertyDescriptor(document, 'cookie') as PropertyDescriptor).get) {
      this._cookie.get = (Object.getOwnPropertyDescriptor(document, 'cookie') as PropertyDescriptor).get;
    }

    if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(document, 'cookie') && (Object.getOwnPropertyDescriptor(document, 'cookie') as PropertyDescriptor).set) {
      this._cookie.set = (Object.getOwnPropertyDescriptor(document, 'cookie') as PropertyDescriptor).set;
    }

    if (TrackingService.instance) {
      return TrackingService.instance;
    }

    // console.warn('google analytics disabled: ', (window as any)[this.googleAnalyticsDisableStr]);
    // console.warn('the trade desk disabled: ', (window as any)[this.theTradeDeskDisableStr]);
    // console.warn('facebook pixel disabled: ', (window as any)[this.facebookPixelDisableStr]);
    // console.warn('pinterest tag disabled: ', (window as any)[this.pinterestTagDisableStr]);

    this.dispatcher.on('newPageReady', (viewId: string, currentStatus: State, prevStatus: State, $container: JQuery<HTMLElement>, newPageRawHTML: string, dataset: any, isFirstPageLoad: boolean) => {
      this.trackingCallback(currentStatus, prevStatus, $container, newPageRawHTML, dataset, isFirstPageLoad);
    });

    this.shopifyCartEventDispatcher.on('ShopifyCart:add', (data: {id: number, quantity: number, properties: any}) => {
      if (navigator.doNotTrack === '1') {
        console.warn('The user wishs no tracking');
        return;
      }
      if (this.pinterestTag && this.pinterestTag.enabled && (window as any).pintrk) {
        (window as any).pintrk('track', 'addtocart');
      }
    });

    TrackingService.instance = this;
  }

  public checkDisableTrackingCookies() {
    this.theTradeDeskDisabled = this.theTradeDeskDisabled || navigator.doNotTrack === '1';
    this.googleAnalyticsDisabled = this.googleAnalyticsDisabled || navigator.doNotTrack === '1';
    this.facebookPixelDisabled = this.facebookPixelDisabled || navigator.doNotTrack === '1';
    this.pinterestTagDisabled = this.pinterestTagDisabled || navigator.doNotTrack === '1';
  }

  /**
   * Block the possebillity to store cookies
   * @see https://stackoverflow.com/a/41606174/1465919
   */
  public blockCookies() {
    if (!(document as any).__defineGetter__) {
      Object.defineProperty(document, 'cookie', {
        get: () => {
          console.warn('Cookies are blocked, do nothing');
          return '';
        },
        set: (value: string) => {
          console.warn('Cookies are blocked, do nothing. value:', value);
          return true;
        },
      });
    } else {
      (document as any).__defineGetter__('cookie', () => {
        console.warn('Cookies are blocked, do nothing');
        return '';
      });
      (document as any).__defineSetter__('cookie', (value: string) => {
        console.warn('Cookies are blocked, do nothing. value:', value);
      });
    }
  }

  /**
   * Unblock cookies, restore the original function
   */
  public unblockCookies() {
    if ((this as any)._cookie && (this as any)._cookie.get && (this as any)._cookie.set) {
      if (!(document as any).__defineGetter__) {
        Object.defineProperty(document, 'cookie', {
          get: (this as any)._cookie.get,
          set: (this as any)._cookie.set,
        });
      } else {
        (document as any).__defineGetter__('cookie', (this as any)._cookie.get );
        (document as any).__defineSetter__('cookie', (this as any)._cookie.set );
      }
    }
  }

  /**
   * Method to get the keys for each cookie name
   */
  public getCookieKeys() {
    // Separate key value pairs
    const cookies = document.cookie.split(';');
    const keys: string[] = [];
    for (let i = 0; i < cookies.length; i++) {
      const cookieEntry = cookies[i].split('=');
      //  first part of the split string holds the key ...
      keys.push(cookieEntry[0].trim());
    }
    return keys;
  }

  /**
   * delete cookie by name
   */
  public deleteCookie(name: string) {
    console.warn('deleteCookie', `"${name}"`);
    document.cookie = `${name}=; expires=${new Date(0).toUTCString()}; Max-Age=-99999999; path=/`;
  }

  /**
   * Remove cookies on the server
   */
  public deleteCookieOnServer() {
    console.warn('deleteCookieOnServer not implemented yet');
  }

  /**
   * Remove all browser cookies, please note this do not remove the cookies setted by shopify on the server
   * @see https://snippetlib.com/jquery/remove_cookies
   */
  public removeCookies(ignore: string[] = []) {
    const cookieKeys = this.getCookieKeys();
    // delete all cookies
    for (let i = 0; i < cookieKeys.length; i++) {
      const cookieKey = cookieKeys[i];
      if (ignore.includes(cookieKey)) {
        console.warn('ignore cookie', cookieKey);
      } else {
        this.deleteCookie(cookieKey);
      }
    }
    this.deleteCookie(''); // remove cookie without name
    this.deleteCookieOnServer();
  }

  public trackingCallback(currentStatus: State, prevStatus: State, $container: JQuery<HTMLElement>, newPageRawHTML: string, dataset: any, isFirstPageLoad: boolean) {
    const self = this;
    if (navigator.doNotTrack === '1') {
      console.warn('The user wishs no tracking');
      return;
    }
    if (self.theTradeDesk.enabled && (window as any)[this.theTradeDeskDisableStr] !== true) {
      if (typeof((window as any).ttd_dom_ready) === 'function') {
        (window as any).ttd_dom_ready( () => {
          if (typeof((window as any).TTDUniversalPixelApi) === 'function') {
            const universalPixelApi = new (window as any).TTDUniversalPixelApi();
            universalPixelApi.init(self.theTradeDesk.adv, [self.theTradeDesk.tagId[1]], self.theTradeDesk.baseSrc);
          }
        });
      }
    } else {
      console.warn('theTradeDesk is disabled');
    }

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(arguments);
    }

    if (self.googleAnalytics.enabled && (window as any)[this.googleAnalyticsDisableStr] !== true) {
      if (isFirstPageLoad) {
        // this is already tracked by the shopify event listener code
      } else {
        // if never framework  Website-Tag (gtag.js) for google analytics is used:
        gtag('event', 'page_view', {
          // tslint:disable-next-line:object-literal-key-quotes
          'send_to': self.googleAnalytics.trackingId, // object-literal-key-quotes
        });
        if ((window as any).ga) {
          (window as any).ga('send', 'pageview');
        }
      }
    } else {
      console.warn('googleAnalytics is disabled');
    }

    if (self.pinterestTag && self.pinterestTag.enabled && !isFirstPageLoad && (window as any).pintrk) {
      (window as any).pintrk('track', 'pagevisit');
    }

  }
}
