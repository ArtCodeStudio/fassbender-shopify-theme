import Debug from 'debug';
import JQuery from './jquery';

// (window as any).$ = JQuery;

// import { Tetris } from './services/tetris';
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
} from './tinybind';

import {
  addClassBinder,
  autoscrollBinder,
  removeClassBinder,
  valueBinder,
  scrollbarDragableBinder,
} from './binders/index';
import {
  contactComponent,
  iconsetComponent,
  navItemsComponent,
  productScrollbarComponent,
  ProductScrollbarRibaComponent,
} from './components/index';

export class Main {

  // private prefetch = new Prefetch();
  private dispatcher = new GlobalEvent();
  //  private pjax = new Pjax(new CustomTransition());
  private view: View;
  private debug = Debug('main');
  private tinybind = new Tinybind();

  constructor() {

    this.debug('init the main application');

    // Regist components
    this.tinybind.componentService.regist(contactComponent());
    this.tinybind.componentService.regist(navItemsComponent());
    this.tinybind.componentService.regist(iconsetComponent());
    // this.tinybind.componentService.regist(productScrollbarComponent());
    this.tinybind.componentService.regist(ProductScrollbarRibaComponent, ProductScrollbarRibaComponent.tagName);

    // Regist binders
    const basicBinders = basicBindersWrapper(JQuery);
    // console.error('basicBinders', basicBinders);
    this.tinybind.binderService.regists(routerBinders);
    this.tinybind.binderService.regists(basicBinders);
    this.tinybind.binderService.regist(scrollbarDragableBinder());
    this.tinybind.binderService.registWrapper(autoscrollBinder());
    this.tinybind.binderService.registWrapper(removeClassBinder());
    this.tinybind.binderService.registWrapper(addClassBinder());
    this.tinybind.binderService.registWrapper(valueBinder());

    // Regist formatters
    this.tinybind.formatterService.regists(compareFormatters);
    this.tinybind.formatterService.regists(mathFormatters);
    this.tinybind.formatterService.regists(propertyFormatters);
    this.tinybind.formatterService.regists(specialFormatters);
    this.tinybind.formatterService.regists(stringFormatters);

    this.view = this.tinybind.bind(JQuery('body')[0], window.model);

    // Define custom Elements always after tinybind.bind
    // customElements.define(ProductScrollbarRibaComponent.tagName, ProductScrollbarRibaComponent);

  }
}

JQuery(($: JQueryStatic) => {
  const main = new Main();
});
