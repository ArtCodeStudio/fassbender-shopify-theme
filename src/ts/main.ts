import Debug from 'debug';
import JQuery from './jquery';

import {
  Tinybind,
  View,
  GlobalEvent,

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

import { customBinders } from './binders/index';

import * as CustomComponents from './components/components';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

export class Main {

  private view: View;
  private debug = Debug('main');
  private tinybind = new Tinybind();

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
}

JQuery(($: JQueryStatic) => {
  const main = new Main();
});
