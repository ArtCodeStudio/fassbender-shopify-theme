import Debug from 'debug';
import JQuery from 'jquery';
import { View } from 'tinybind';
import tinybind from 'tinybind';
import {
  CustomTransition,
  IState,
  Pjax,
  Prefetch,
} from './barba';
import {
  addClassBinder,
  autoscrollBinder,
  BindersService,
  htmlBinder,
  removeClassBinder,
  routeBinder,
  slideoutTogglerBinder,
  valueBinder,
} from './binders';
import {
  contactComponent,
  iconsetComponent,
  navItemsComponent,
  slideoutComponent,
} from './components';
import { Dispatcher } from './dispatcher';
import {
  debug,
  defaultFormatter,
  get,
  not,
} from './formatters';
import { Tetris } from './services/tetris';

export interface IViews {
  dynamic: View;
  static: View;
}

export class Main {

  private prefetch = new Prefetch();
  private dispatcher = new Dispatcher();
  private pjax = new Pjax(new CustomTransition());
  private views: IViews = {
    dynamic: null,
    static: null,
  };
  private binderRegister = new BindersService(tinybind);
  private debug = Debug('View');

  constructor() {

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
    this.binderRegister.registWrapper(routeBinder(this.dispatcher, this.pjax, this.prefetch));
    this.binderRegister.registWrapper(slideoutTogglerBinder(this.dispatcher));
    this.binderRegister.registWrapper(autoscrollBinder());
    this.binderRegister.registWrapper(htmlBinder());
    this.binderRegister.registWrapper(removeClassBinder());
    this.binderRegister.registWrapper(addClassBinder());
    this.binderRegister.registWrapper(valueBinder());

    this.views.static = tinybind.bind(JQuery('body').get(), window.model);

    this.dispatcher.on('newPageReady', (currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, isInit: boolean) => {
      this.debug('newPageReady');
      // unbind the old rivets view
      if (!isInit && this.views.dynamic !== null) {
        this.views.dynamic.unbind();
      }
      // bind the new container
      this.views.dynamic = tinybind.bind($container.get(), window.model);

      // init Template
      const data = $container.data();
      if (data.template === 'page.tetris') {
        const tetris = new Tetris();
        tetris.run();
      }
    });

    this.prefetch.init();
    this.pjax.start();

  }
}

JQuery(() => {
  const view = new Main();
});
