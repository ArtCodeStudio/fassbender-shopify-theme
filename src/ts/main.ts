import Debug from 'debug';
import JQuery from 'jquery';

// import { Tetris } from './services/tetris';
import { tinybind, View } from '../modules/tinybind/index';

import { Dispatcher } from '../modules/tinybind/binders/router/barba/dispatcher';

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
  private debug = Debug('View');
  private tinybind = tinybind;

  constructor() {

    // Regist components
    this.tinybind.componentService.regist(contactComponent());
    this.tinybind.componentService.regist(navItemsComponent());
    this.tinybind.componentService.regist(slideoutComponent(this.dispatcher));
    this.tinybind.componentService.regist(iconsetComponent());

    // Regist binders
    this.tinybind.binderService.registWrapper(slideoutTogglerBinder(this.dispatcher));
    this.tinybind.binderService.registWrapper(autoscrollBinder());
    this.tinybind.binderService.registWrapper(removeClassBinder());
    this.tinybind.binderService.registWrapper(addClassBinder());
    this.tinybind.binderService.registWrapper(valueBinder());

    this.view = this.tinybind.bind(JQuery('body')[0], window.model);

  }
}

JQuery(() => {
  const main = new Main();
});
