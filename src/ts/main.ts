import Debug from 'debug';
import JQuery from './jquery';
import { TrackingService } from './services/tracking.services';

import {
  Tinybind,
  View,
  EventDispatcher,
  IState,

  // binders
  routerBinders,
  basicBindersWrapper,

  // formatters
  compareFormatters,
  mathFormatters,
  propertyFormatters,
  specialFormatters,
  stringFormatters,

  // shopify extensions
  shopifyExtension,
} from './tinybind';

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
  private tinybind = new Tinybind();
  // private dispatcher = new EventDispatcher('main');

  constructor() {

    this.debug('init the main application');

    window.model.filter = {
      stories: 'all',
    };

    // Regist custom components
    this.tinybind.componentService.regists(CustomComponents);

    // Regist binders
    this.tinybind.binderService.regists(basicBindersWrapper(JQuery));
    this.tinybind.binderService.regists(routerBinders);
    this.tinybind.binderService.regists(customBinders);
    this.tinybind.binderService.regists(styleBinders);

    // Regist formatters
    this.tinybind.formatterService.regists(compareFormatters);
    this.tinybind.formatterService.regists(mathFormatters);
    this.tinybind.formatterService.regists(propertyFormatters);
    this.tinybind.formatterService.regists(specialFormatters);
    this.tinybind.formatterService.regists(stringFormatters);

    this.tinybind.formatterService.regists(shopifyExtension.formatters);

    window.model.assign = function(key: string, value: any, event: Event) {
      // event.preventDefault();
      // event.stopPropagation();
      this[key] = value;
    };

    window.model.system.shopify = (window as any).Shopify;

    this.view = this.tinybind.bind(JQuery('body')[0], window.model);
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
