import Debug from 'debug';
import JQuery from 'jquery';

// import { Tetris } from './services/tetris';
import { Tinybind, View, Dispatcher, routerBinders, basicBinders, compareFormatters, mathFormatters, propertyFormatters, specialFormatters, stringFormatters } from './tinybind';
// import { tinybind, View } from 'tinybind';

import {
  addClassBinder,
  autoscrollBinder,
  removeClassBinder,
  slideoutTogglerBinder,
  valueBinder,
} from './binders/index';
import {
  contactComponent,
  iconsetComponent,
  navItemsComponent,
  slideoutComponent,
} from './components/index';

export class Main {

  // private prefetch = new Prefetch();
  private dispatcher = new Dispatcher();
  //  private pjax = new Pjax(new CustomTransition());
  private view: View;
  private debug = Debug('main');
  private tinybind = new Tinybind();;

  constructor() {

    this.debug('init the main application')

    // Regist components
    this.tinybind.componentService.regist(contactComponent());
    this.tinybind.componentService.regist(navItemsComponent());
    this.tinybind.componentService.regist(slideoutComponent(this.dispatcher));
    this.tinybind.componentService.regist(iconsetComponent());

    // Regist binders
    this.tinybind.binderService.regists(routerBinders);
    this.tinybind.binderService.regists(basicBinders);
    this.tinybind.binderService.registWrapper(slideoutTogglerBinder(this.dispatcher));
    this.tinybind.binderService.registWrapper(autoscrollBinder());
    this.tinybind.binderService.registWrapper(removeClassBinder());
    this.tinybind.binderService.registWrapper(addClassBinder());
    this.tinybind.binderService.registWrapper(valueBinder());

    this.tinybind.formatterService.regists(compareFormatters);
    this.tinybind.formatterService.regists(mathFormatters);
    this.tinybind.formatterService.regists(propertyFormatters);
    this.tinybind.formatterService.regists(specialFormatters);
    this.tinybind.formatterService.regists(stringFormatters);

    this.view = this.tinybind.bind(JQuery('body')[0], window.model);

  }
}

JQuery(() => {
  const main = new Main();
});
