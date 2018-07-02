import Debug from 'debug';
import JQuery from 'jquery';

import { Tetris } from './services/tetris';
import { tinybind, View } from '../modules/tinybind';

import { Dispatcher} from '../modules/tinybind/binders/router/barba';

import {
  CustomTransition,
  IState,
  Pjax,
  Prefetch,
} from '../modules/tinybind/binders/router/barba';
import {
  addClassBinder,
  autoscrollBinder,
  BindersService,
  htmlBinder,
  removeClassBinder,
  slideoutTogglerBinder,
  valueBinder,
} from './binders';
import {
  contactComponent,
  iconsetComponent,
  navItemsComponent,
  slideoutComponent,
} from './components';
import {
  debug,
  defaultFormatter,
  get,
  not,
} from './formatters';

export interface IViews {
  dynamic: View;
  static: View;
}

export class Main {

  // private prefetch = new Prefetch();
  private dispatcher = new Dispatcher();
  //  private pjax = new Pjax(new CustomTransition());
  private views: IViews = {
    dynamic: null,
    static: null,
  };
  private binderRegister = new BindersService(tinybind);
  private debug = Debug('View');

  constructor() {

    console.log(tinybind);

    // Regist components
    tinybind.components.contact = contactComponent();
    tinybind.components['nav-items'] = navItemsComponent();
    tinybind.components.slideout = slideoutComponent(this.dispatcher);
    tinybind.components.iconset = iconsetComponent();

    // Regist formatters
    tinybind.formatters.debug = debug;
    tinybind.formatters.default = defaultFormatter;
    tinybind.formatters.get = get;
    tinybind.formatters.not = not;

    // Regist binders
    this.binderRegister.registWrapper(slideoutTogglerBinder(this.dispatcher));
    this.binderRegister.registWrapper(autoscrollBinder());
    this.binderRegister.registWrapper(htmlBinder());
    this.binderRegister.registWrapper(removeClassBinder());
    this.binderRegister.registWrapper(addClassBinder());
    this.binderRegister.registWrapper(valueBinder());

    this.views.static = tinybind.bind(JQuery('body')[0], window.model);

  }
}

JQuery(() => {
  const view = new Main();
});
