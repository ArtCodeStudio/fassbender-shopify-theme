import {
  Riba,
  View,
  Debug,
  JQuery,
  Binder,

  coreModule,

} from '@ribajs/core';
import shopifyModule from '@ribajs/shopify';
import routerModule from '@ribajs/router';
import { i18nModule, LocalesRestService } from '@ribajs/i18n';

import { TrackingService } from './services/tracking.services';
import { customBinders, styleBinders } from './binders/index';

import * as CustomComponents from './components/components';

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
  private localesService = new LocalesRestService('https://the-developer-app.artandcode.studio/shopify/api/themes');
  // private dispatcher = new EventDispatcher('main');

  constructor() {

    this.debug('init the main application');

    window.model.filter = {
      stories: 'all',
    };

    // Regist custom components
    this.riba.module.regist({
      components: CustomComponents,
      binders: {...customBinders, ...styleBinders},
    });

    this.riba.module.regist(coreModule);
    this.riba.module.regist(routerModule);
    this.riba.module.regist(shopifyModule);
    this.riba.module.regist(i18nModule(this.localesService));

    window.model.assign = function(key: string, value: any, context: Binder<any>, event: Event) {
      // event.preventDefault();
      // event.stopPropagation();
      this[key] = value;
    };

    window.model.globalToggle = function(key: string, context: Binder<any>, event: Event) {
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
});

JQuery(($: JQueryStatic) => {
  const main = new Main();
});

(window as any).$ = JQuery;
(window as any).JQuery = JQuery;
