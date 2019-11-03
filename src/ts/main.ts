import {
  Riba,
  View,
  Debug,
  Utils,
  IBinder,

  coreModule,

} from '@ribajs/core';
import { jqueryModule, JQuery} from '@ribajs/jquery';
import shopifyModule from '@ribajs/shopify';
import routerModule from '@ribajs/router';
import i18nModule from '@ribajs/i18n';

import { TrackingService } from './services/tracking.services';
import * as customBinders from './binders/index';

import * as CustomComponents from './components/index';
import { LocalesService } from '@ribajs/shopify-tda';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

/* tslint:disable:max-classes-per-file */
declare class TTDUniversalPixelApiWrapper {
  public getVersion(): string;
  public init(adv: string, tagIds: string[], baseSrc: string, dynParams?: string[]): void;
}
declare function TTDUniversalPixelApi(optionalTopLevelUrl?: string): TTDUniversalPixelApiWrapper;

export class Main {

  private view: View;
  private debug = Debug('app:main');
  private riba = new Riba();
  private localesService = new LocalesService();
  // private dispatcher = new EventDispatcher('main');

  constructor() {

    this.debug('init the main application');

    window.model.year = new Date().getFullYear();

    window.model.filter = {
      stories: 'all',
    };

    this.riba.module.regist(coreModule);
    this.riba.module.regist(jqueryModule);
    this.riba.module.regist(routerModule);
    this.riba.module.regist(shopifyModule);
    this.riba.module.regist(i18nModule(this.localesService));

    // Regist custom components
    this.riba.module.regist({
      components: CustomComponents,
      binders: customBinders,
    });

    window.model.assign = function(key: string, value: any, context: IBinder<any>, event: Event) {
      // event.preventDefault();
      // event.stopPropagation();
      this[key] = value;
    };

    window.model.globalToggle = function(key: string, context: IBinder<any>, event: Event) {
      this[key] = !!!this[key];
      event.preventDefault();
      event.stopPropagation();
    };

    window.model.system.shopify = (window as any).Shopify;

    this.view = this.riba.bind(JQuery('body')[0], window.model);
  }
}

const tracking = new TrackingService({
  googleAnalytics: window.model.system.themeSettings.googleAnalytics,
  theTradeDesk: window.model.system.themeSettings.theTradeDesk,
  pinterestTag: window.model.system.themeSettings.pinterestTag,
});

Utils.domIsReady(() => {
  const main = new Main();
});

(window as any).$ = JQuery;
(window as any).JQuery = JQuery;
