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

import {
  autoscrollBinder,
  scrollbarDragableBinder,
} from './binders/index';
import {
  NewsletterComponent,
  IconsetComponent,
  ShopifyLinklistComponent,
  ShopifyFilterComponent,
  ProductScrollbarComponent,
} from './components/index';

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

    // Regist components
    this.tinybind.componentService.regist(NewsletterComponent);
    this.tinybind.componentService.regist(ShopifyLinklistComponent);
    this.tinybind.componentService.regist(ShopifyFilterComponent);
    this.tinybind.componentService.regist(IconsetComponent);
    this.tinybind.componentService.regist(ProductScrollbarComponent);

    // Regist binders
    this.tinybind.binderService.regists(routerBinders);
    this.tinybind.binderService.regists(basicBindersWrapper(JQuery));
    this.tinybind.binderService.regist(scrollbarDragableBinder());
    this.tinybind.binderService.registWrapper(autoscrollBinder());

    // Regist formatters
    this.tinybind.formatterService.regists(compareFormatters);
    this.tinybind.formatterService.regists(mathFormatters);
    this.tinybind.formatterService.regists(propertyFormatters);
    this.tinybind.formatterService.regists(specialFormatters);
    this.tinybind.formatterService.regists(stringFormatters);

    this.tinybind.formatterService.regists(shopifyExtension.formatters);

    this.view = this.tinybind.bind(JQuery('body')[0], window.model);

  }
}

JQuery(($: JQueryStatic) => {
  const main = new Main();
});
