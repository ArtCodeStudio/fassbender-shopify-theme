import Debug from 'debug';
import JQuery from 'jquery';
import tinybind from 'tinybind';
import { CustomTransition, IState, Pjax, Prefetch } from './barba';
import { autoscrollBinder, binders, routeBinder, slideoutTogglerBinder } from './binders';
// import { components, slideoutComponent } from './components';
import { components, slideoutComponent } from './components';
import { Dispatcher } from './dispatcher';
import { formatters } from './formatters';
import { Tetris } from './tetris';

export class View {

  private prefetch = new Prefetch();
  private dispatcher = new Dispatcher();
  private pjax = new Pjax(new CustomTransition());
  private outsite: any = null;
  private insite: any = null;
  private debug = Debug('View');

  constructor() {

    // Set components
    tinybind.components = components; // TODO seperate components
    tinybind.components.slideout = slideoutComponent(this.dispatcher);

    // Set formatters https://github.com/QAPInt/rivets
    (tinybind.formatters as any).get = formatters.get; // TODO seperate formatters

    // Set binders
    tinybind.binders = binders; // TODO seperate binders
    tinybind.binders.route = routeBinder(this.dispatcher, this.pjax, this.prefetch);
    tinybind.binders['slideout-toggler'] = slideoutTogglerBinder(this.dispatcher);
    tinybind.binders.autoscroll = autoscrollBinder();

    this.outsite = tinybind.bind(JQuery('#rivets-top, #rivets-bottom').get(), window.model);

    this.dispatcher.on('newPageReady', (currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, isInit: boolean) => {
      this.debug('newPageReady');
      // unbind the old rivets view
      if (!isInit && this.insite !== null) {
        this.insite.unbind();
      }
      // bind the new container
      this.insite = tinybind.bind($container.get(), window.model);

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
