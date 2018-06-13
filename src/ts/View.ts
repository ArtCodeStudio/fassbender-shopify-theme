import Debug from 'debug';
import JQuery from 'jquery';
import Rivets from 'rivets';
import * as Barba from './barba';
import { binders } from './Binders';
import { components } from './Components';
import { Dispatcher } from './Dispatcher';
import { Tetris } from './Tetris';

export class View {

  private prefetch = new Barba.Prefetch();
  private dispatcher = new Dispatcher();
  private pjax = new Barba.Pjax(new Barba.CustomTransition());
  private outsite: any = null;
  private insite: any = null;
  private debug = Debug('View');

  constructor() {

    Rivets.binders = binders;
    Rivets.components = components;

    this.outsite = Rivets.bind(JQuery('#rivets-top, #rivets-bottom'), window.model);

    this.dispatcher.on('newPageReady', (currentStatus: Barba.IState, prevStatus: Barba.IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, isInit: boolean) => {
      this.debug('newPageReady');
      // unbind the old rivets view
      if (!isInit && this.insite !== null) {
        this.insite.unbind();
      }
      // bind the new container
      this.insite = Rivets.bind($container, window.model);

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
