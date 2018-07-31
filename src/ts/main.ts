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
  backgroundImageBinder,
  scrollbarDragableBinder,
  collapseBinder,
  expanOnUrlBinder,
  collapseOnUrlBinder,
} from './binders/index';
import {
  NewsletterComponent,
  IconComponent,
  ShopifyLinklistComponent,
  ShopifyFilterComponent,
  ShopifyArticleItemComponent,
  ShopifyProductComponent,
  ShopifyProductItemComponent,
  ProductScrollbarComponent,
  TabsComponent,
  DropdownComponent,
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

    window.model.filter = {
      stories: 'all',
    };

    // Regist components
    this.tinybind.componentService.regist(NewsletterComponent);
    this.tinybind.componentService.regist(ShopifyLinklistComponent);
    this.tinybind.componentService.regist(ShopifyFilterComponent);
    this.tinybind.componentService.regist(IconComponent);
    this.tinybind.componentService.regist(ProductScrollbarComponent);
    this.tinybind.componentService.regist(ShopifyProductItemComponent);
    this.tinybind.componentService.regist(ShopifyProductComponent);
    this.tinybind.componentService.regist(TabsComponent);
    this.tinybind.componentService.regist(DropdownComponent);

    // Regist binders
    this.tinybind.binderService.regists(routerBinders);
    this.tinybind.binderService.regists(basicBindersWrapper(JQuery));
    this.tinybind.binderService.regist(scrollbarDragableBinder());
    this.tinybind.binderService.regist(backgroundImageBinder());
    this.tinybind.binderService.regist(collapseBinder());
    this.tinybind.binderService.regist(expanOnUrlBinder());
    this.tinybind.binderService.regist(collapseOnUrlBinder());

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

    // window.model.toggle = function(key: string, value: boolean) {
    //   this[key] = !this[key];
    // };

    this.view = this.tinybind.bind(JQuery('body')[0], window.model);

  }
}

JQuery(($: JQueryStatic) => {
  const main = new Main();
});
