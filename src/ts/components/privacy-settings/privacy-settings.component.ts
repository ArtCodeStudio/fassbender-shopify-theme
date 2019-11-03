import {
  Component,
  Debug,
  IBinder,
} from '@ribajs/core';
import { JQuery as $ } from '@ribajs/jquery';
import {
  ShopifyCartService,
} from '@ribajs/shopify';
import template from './privacy-settings.component.html';
import { TrackingService } from '../../services/tracking.services';
import { Utils } from '../../services/Utils';

interface IScope {
  theTradeDesk: {
    enabled: boolean;
    adv: string;
    tagId: string;
    baseSrc: string;
  };
  googleAnalytics: {
    enabled: boolean;
    trackingId: string;
  };
  pinterestTag: {
    enabled: boolean;
    trackingId: string;
  };
  facebookPixel: {
    enabled: boolean;
  };
  cookies: {
    enabled: boolean;
  };
  shopifyAnalytics: {
    enabled: boolean;
  };
  hostname: string;
  onCookiesStorageChanged: PrivacySettingsComponent['onCookiesStorageChanged'];
  onTheTradeDeskChanged: PrivacySettingsComponent['onTheTradeDeskChanged'];
  onGoogleAnalyticsChanged: PrivacySettingsComponent['onGoogleAnalyticsChanged'];
  onFacebookPixelChanged: PrivacySettingsComponent['onFacebookPixelChanged'];
  onPinterestTagChanged: PrivacySettingsComponent['onPinterestTagChanged'];
  onClearDataClicked: PrivacySettingsComponent['onClearDataClicked'];
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/doNotTrack
   */
  doNotTrack: boolean;
}

// see also TrackingService
export class PrivacySettingsComponent extends Component {

  public static tagName: string = 'rv-privacy-settings';

  static get observedAttributes() {
    return [];
  }

  protected $el: JQuery<HTMLElement>;

  protected debug = Debug('component:' + PrivacySettingsComponent.tagName);

  protected scope: IScope;

  protected trackingService: TrackingService;

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);

    this.scope = {
      theTradeDesk: window.model.system.themeSettings.theTradeDesk,
      googleAnalytics: window.model.system.themeSettings.googleAnalytics,
      pinterestTag: window.model.system.themeSettings.pinterestTag,
      facebookPixel: {
        enabled: true,
      },
      cookies: {
        enabled: true,
      },
      shopifyAnalytics: {
        enabled: true,
      },
      hostname: window.location.hostname,
      onCookiesStorageChanged: this.onCookiesStorageChanged,
      onTheTradeDeskChanged: this.onTheTradeDeskChanged,
      onGoogleAnalyticsChanged: this.onGoogleAnalyticsChanged,
      onFacebookPixelChanged: this.onFacebookPixelChanged,
      onPinterestTagChanged: this.onPinterestTagChanged,
      onClearDataClicked: this.onClearDataClicked,
      doNotTrack: navigator.doNotTrack === '1',
    };

    this.trackingService = new TrackingService({
      theTradeDesk: this.scope.theTradeDesk,
      googleAnalytics: this.scope.googleAnalytics,
      pinterestTag: this.scope.pinterestTag,
    });

    this.scope.googleAnalytics.enabled = !this.trackingService.googleAnalyticsDisabled;
    this.scope.theTradeDesk.enabled = !this.trackingService.theTradeDeskDisabled;
    this.scope.facebookPixel.enabled = !this.trackingService.facebookPixelDisabled;
    this.scope.pinterestTag.enabled = !this.trackingService.pinterestTagDisabled;

    this.init(PrivacySettingsComponent.observedAttributes);
  }

  public onClearDataClicked(context: IBinder<any>, event: Event) {
    this.debug('onClearDataClicked', this.scope.cookies.enabled);
    ShopifyCartService.clear()
    .then(() => {
      return Utils.get('/account/logout');
    })
    .then(() => {
      return this.trackingService.removeCookies([this.trackingService.theTradeDeskDisableStr, this.trackingService.googleAnalyticsDisableStr, this.trackingService.facebookPixelDisableStr /*, 'cookieconsent_accepted'*/]);
    })
    .then(() => {
      location.reload();
    })
    .catch((error: Error) => {
      console.error(error);
    });
    event.preventDefault();
  }

  public onCookiesStorageChanged() {
    this.debug('onCookiesStorageChanged', this.scope.cookies.enabled);
    if (!this.scope.cookies.enabled) {
      this.trackingService.removeCookies();
    }
    this.trackingService.cookieStorageDisabled = !this.scope.cookies.enabled;
  }

  public onGoogleAnalyticsChanged() {
    this.debug('onGoogleAnalyticsChanged', this.scope.googleAnalytics.enabled);
    this.trackingService.googleAnalyticsDisabled = !this.scope.googleAnalytics.enabled;
  }

  public onTheTradeDeskChanged() {
    this.debug('onTheTradeDeskChanged', this.scope.theTradeDesk.enabled);
    this.trackingService.theTradeDeskDisabled = !this.scope.theTradeDesk.enabled;
  }

  public onFacebookPixelChanged() {
    this.debug('onFacebookPixelChanged', this.scope.facebookPixel.enabled);
    this.trackingService.facebookPixelDisabled = !this.scope.facebookPixel.enabled;
  }

  public onPinterestTagChanged() {
    this.debug('onPinterestTagChanged', this.scope.pinterestTag.enabled);
    this.trackingService.pinterestTagDisabled = !this.scope.pinterestTag.enabled;
  }

  protected async beforeBind() {
    this.debug('beforeBind');
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      return null;
    } else {
      return template;
    }
  }
}
