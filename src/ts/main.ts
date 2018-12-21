import {
  Riba,
  View,
  Debug,
  JQuery,
  Binder,

  // binders
  basicBindersWrapper,

  // formatters
  compareFormatters,
  mathFormatters,
  propertyFormatters,
  specialFormatters,
  stringFormatters,

} from '@ribajs/core';
import { shopifyExtension } from '@ribajs/shopify';
import { routerBinders } from '@ribajs/router';
import * as i18nBinders from '@ribajs/i18n/src/binders/i18n.binders';
import * as i18nFormatters from '@ribajs/i18n/src/formatters/i18n.formatters';

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
  private lcalesService = new shopifyExtension.services.LocalesService();
  // private dispatcher = new EventDispatcher('main');

  constructor() {

    this.debug('init the main application');

    window.model.filter = {
      stories: 'all',
    };

    // Regist custom components
    this.riba.componentService.regists(CustomComponents);

    // Regist binders
    this.riba.binderService.regists(basicBindersWrapper(JQuery));
    this.riba.binderService.regists(routerBinders);
    this.riba.binderService.regists(customBinders);
    this.riba.binderService.regists(styleBinders);

    this.riba.binderService.regist(i18nBinders.i18nStarBinderWrapper(new shopifyExtension.services.LocalesService()));

    // Regist formatters
    this.riba.formatterService.regists(compareFormatters);
    this.riba.formatterService.regists(mathFormatters);
    this.riba.formatterService.regists(propertyFormatters);
    this.riba.formatterService.regists(specialFormatters);
    this.riba.formatterService.regists(stringFormatters);

    this.riba.formatterService.regists(shopifyExtension.formatters);
    const i18nFormatter = i18nFormatters.i18nFormatterWrapper(new shopifyExtension.services.LocalesService());
    this.riba.formatterService.regist(i18nFormatter.formatter, i18nFormatter.name);

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
