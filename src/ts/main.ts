import Debug from 'debug';
import JQuery from './jquery';

import {
  Tinybind,
  View,
  GlobalEvent,
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

// import {
//   backgroundImageBinderWrapper,
//   backgroundColorStarBinderWrapper,
//   opacityStarBinderWrapper,
//   scrollbarDragableBinder,
//   collapseBinder,
//   expanOnUrlBinder,
//   collapseOnUrlBinder,
//   scrollspyStarBinder,
// } from './binders/index';

import { customBinders, styleBinders } from './binders/index';

import * as CustomComponents from './components/components';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

/* tslint:disable:max-classes-per-file */
// declare function TTDUniversalPixelApi(): {
//   getVersion(): string,
//   init(adv: string, tagIds: string[], baseSrc: string, dynParams?: string[]): void,
// };
declare class TTDUniversalPixelApiWrapper {
  public getVersion(): string;
  public init(adv: string, tagIds: string[], baseSrc: string, dynParams?: string[]): void;
}
declare function TTDUniversalPixelApi(optionalTopLevelUrl?: string): TTDUniversalPixelApiWrapper;

export class Main {

  private view: View;
  private debug = Debug('main');
  private tinybind = new Tinybind();
  private dispatcher = new GlobalEvent();

  constructor() {

    this.debug('init the main application');

    this.dispatcher.on('newPageReady', (viewId: string, currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, dataset: any, isFirstPageLoad: boolean) => {
      this.trackingCallback(viewId, currentStatus, prevStatus, $container, newPageRawHTML, dataset, isFirstPageLoad);
    });

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

    window.model.assign = function(key: string, value: any) {
      this[key] = value;
    };

    window.model.system.shopify = (window as any).Shopify;

    // window.model.toggle = function(key: string, value: boolean) {
    //   this[key] = !this[key];
    // };

    this.view = this.tinybind.bind(JQuery('body')[0], window.model);
  }

  public trackingCallback(viewId: string, currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, dataset: any, isFirstPageLoad: boolean) {
    const self = this;
    // self.debug('trackingCallback', viewId, currentStatus, prevStatus, dataset, isFirstPageLoad);
    if (typeof((window as any).ttd_dom_ready) === 'function') {
      (window as any).ttd_dom_ready( () => {
        // self.debug('TTDUniversalPixelApi', (window as any).TTDUniversalPixelApi);
        if (typeof((window as any).TTDUniversalPixelApi) === 'function') {
          const universalPixelApi = new (window as any).TTDUniversalPixelApi();
          self.debug('universalPixelApi', universalPixelApi.getVersion());
          universalPixelApi.init('1fqgs22', ['hqe0lr3'], 'https://insight.adsrvr.org/track/up');
        }
      });
    }
  }
}

JQuery(($: JQueryStatic) => {
  const main = new Main();
});
