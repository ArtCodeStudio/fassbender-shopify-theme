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
  backgroundImageBinderWrapper,
  backgroundColorStarBinderWrapper,
  opacityStarBinderWrapper,
  scrollbarDragableBinder,
  collapseBinder,
  expanOnUrlBinder,
  collapseOnUrlBinder,
  scrollspyStarBinder,
} from './binders/index';
import {
  NewsletterComponent,
  ContactFormComponent,
  IconComponent,
  ShopifyLinklistComponent,
  ShopifyFilterComponent,
  ShopifyArticleItemComponent,
  ShopifyProductComponent,
  ShopifyProductItemComponent,
  ShopifyCartComponent,
  ProductScrollbarComponent,
  TabsComponent,
  DropdownComponent,
  InstagramComponent,
  InstagramScrollbarComponent,
} from './components/components';

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
    this.tinybind.componentService.regist(ContactFormComponent);
    this.tinybind.componentService.regist(ShopifyLinklistComponent);
    this.tinybind.componentService.regist(ShopifyFilterComponent);
    this.tinybind.componentService.regist(IconComponent);
    this.tinybind.componentService.regist(ProductScrollbarComponent);
    this.tinybind.componentService.regist(ShopifyProductItemComponent);
    this.tinybind.componentService.regist(ShopifyProductComponent);
    this.tinybind.componentService.regist(ShopifyCartComponent);
    this.tinybind.componentService.regist(TabsComponent);
    this.tinybind.componentService.regist(DropdownComponent);
    this.tinybind.componentService.regist(InstagramComponent);
    this.tinybind.componentService.regist(InstagramScrollbarComponent);

    // Regist binders
    this.tinybind.binderService.regists(basicBindersWrapper(JQuery));
    this.tinybind.binderService.regist(backgroundImageBinderWrapper());
    this.tinybind.binderService.regist(backgroundColorStarBinderWrapper());
    this.tinybind.binderService.regist(opacityStarBinderWrapper());
    this.tinybind.binderService.regist(collapseBinder());
    this.tinybind.binderService.regist(collapseOnUrlBinder());
    this.tinybind.binderService.regist(expanOnUrlBinder());
    this.tinybind.binderService.regists(routerBinders);
    this.tinybind.binderService.regist(scrollspyStarBinder());
    this.tinybind.binderService.regist(scrollbarDragableBinder());

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
