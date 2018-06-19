import Debug from 'debug';
import JQuery from 'jquery';
import { View } from 'tinybind';
import tinybind from 'tinybind';
import { CustomTransition, IState, Pjax, Prefetch } from './barba';
import { autoscrollBinder, BindersService, removeClassBinder, routeBinder, slideoutTogglerBinder } from './binders';
import { navItems, slideoutComponent } from './components';
import { Dispatcher } from './dispatcher';
import { get } from './formatters';
import { Tetris } from './tetris';

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
    tinybind.components['nav-items'] = navItems();
    tinybind.components.slideout = slideoutComponent(this.dispatcher);

    // Regist formatters
    tinybind.formatters.get = get;

    // Regist binders
    this.binderRegister.registWrapper(routeBinder(this.dispatcher, this.pjax, this.prefetch));
    this.binderRegister.registWrapper(slideoutTogglerBinder(this.dispatcher));
    this.binderRegister.registWrapper(autoscrollBinder());
    this.binderRegister.registWrapper(removeClassBinder());

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
