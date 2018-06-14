import Debug from 'debug';
import JQuery from 'jquery';
import Rivets from 'rivets';
import {CustomTransition, IState, Pjax, Prefetch } from './barba';
import { binders, routeBinder } from './binders';
import { components } from './components';
import { Dispatcher } from './dispatcher';
import { Tetris } from './tetris';

export class View {

  private prefetch = new Prefetch();
  private dispatcher = new Dispatcher();
  private pjax = new Pjax(new CustomTransition());
  private outsite: any = null;
  private insite: any = null;
  private debug = Debug('View');

  constructor() {

    Rivets.binders = binders;
    Rivets.components = components;

    Rivets.binders.route = routeBinder(this.dispatcher, this.pjax, this.prefetch);

    this.outsite = Rivets.bind(JQuery('#rivets-top, #rivets-bottom'), window.model);

    this.dispatcher.on('newPageReady', (currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, isInit: boolean) => {
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
