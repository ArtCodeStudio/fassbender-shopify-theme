import {
  EventDispatcher,
} from '@ribajs/core';

import {
  IState,
} from '@ribajs/router';

import Debug from 'debug';

// see also PrivacySettingsComponent
export class TrackingService {

  public static instance?: TrackingService;

  public theTradeDeskDisableStr: string;

  public googleAnalyticsDisableStr: string;

  public facebookPixelDisableStr: string;

  protected theTradeDesk: any;

  protected googleAnalytics: any;

  protected facebookPixel: any = {};

  protected debug = Debug('app:TrackingService');

  protected dispatcher = new EventDispatcher('main');

  // Original document.cookie function to hold them if we block all cookies
  protected _cookie: string;

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

  public set cookieStorageDisabled(disabled: boolean) {
    if (disabled) {
      this.blockCookies();
    } else {
      this.unblockCookies();
    }
  }

  constructor(settings: any) {

    this.theTradeDesk = settings.theTradeDesk;
    this.googleAnalytics = settings.googleAnalytics;

    this.googleAnalyticsDisableStr = 'ga-disable-' + this.googleAnalytics.trackingId;
    this.theTradeDeskDisableStr = 'TTDOptOut';
    this.facebookPixelDisableStr = 'fb-pixel-is-disabled';

    this.checkDisableTrackingCookies();

    /**
     * store original cookie getter and setter to make it possible to revert the block
     */
    this._cookie = {
      get: (document as any).__lookupGetter__('cookie') || (Object.getOwnPropertyDescriptor(document, 'cookie') as PropertyDescriptor).get,
      set: (document as any).__lookupSetter__('cookie') || (Object.getOwnPropertyDescriptor(document, 'cookie') as PropertyDescriptor).set,
    } as any;

    if (TrackingService.instance) {
      return TrackingService.instance;
    }

    this.debug('google analytics disabled: ', (window as any)[this.googleAnalyticsDisableStr]);
    this.debug('the trade desk disabled: ', (window as any)[this.theTradeDeskDisableStr]);
    this.debug('facebook pixel disabled: ', (window as any)[this.facebookPixelDisableStr]);

    this.dispatcher.on('newPageReady', (viewId: string, currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, dataset: any, isFirstPageLoad: boolean) => {
      this.trackingCallback(currentStatus, prevStatus, $container, newPageRawHTML, dataset, isFirstPageLoad);
    });

    TrackingService.instance = this;
  }

  public checkDisableTrackingCookies() {
    this.theTradeDeskDisabled = this.theTradeDeskDisabled;
    this.googleAnalyticsDisabled = this.googleAnalyticsDisabled;
    this.facebookPixelDisabled = this.facebookPixelDisabled;
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
    this.debug('deleteCookie', `"${name}"`);
    document.cookie = `${name}=; expires=${new Date(0).toUTCString()}; Max-Age=-99999999; path=/`;
  }

  /**
   * Remove cookies on the server
   */
  public deleteCookieOnServer() {
    this.debug('deleteCookieOnServer not implemented yet');
  }

  /**
   * Remove all browser cookies, please note this do not remove the cookies setted by shopify on the server
   * @see https://snippetlib.com/jquery/remove_cookies
   */
  public removeCookies(ignore: string[] = []) {
    const cookieKeys = this.getCookieKeys();
    this.debug('cookieKeys', cookieKeys);
    this.debug('ignore', ignore);
    // delete all cookies
    for (let i = 0; i < cookieKeys.length; i++) {
      const cookieKey = cookieKeys[i];
      if (ignore.includes(cookieKey)) {
        this.debug('ignore cookie', cookieKey);
      } else {
        this.deleteCookie(cookieKey);
      }
    }
    this.deleteCookie(''); // remove cookie without name
    this.deleteCookieOnServer();
  }

  public trackingCallback(currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, dataset: any, isFirstPageLoad: boolean) {
    const self = this;
    // self.debug('trackingCallback', viewId, currentStatus, prevStatus, dataset, isFirstPageLoad);
    if (self.theTradeDesk.enabled && (window as any)[this.theTradeDeskDisableStr] !== true) {
      if (typeof((window as any).ttd_dom_ready) === 'function') {
        (window as any).ttd_dom_ready( () => {
          // self.debug('TTDUniversalPixelApi', (window as any).TTDUniversalPixelApi);
          if (typeof((window as any).TTDUniversalPixelApi) === 'function') {
            const universalPixelApi = new (window as any).TTDUniversalPixelApi();
            universalPixelApi.init(self.theTradeDesk.adv, [self.theTradeDesk.tagId[1]], self.theTradeDesk.baseSrc);
            self.debug('ttd tracked!', universalPixelApi.getVersion());
          }
        });
      }
    } else {
      this.debug('theTradeDesk is disabled');
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
      this.debug('googleAnalytics is disabled');
    }
  }

}
