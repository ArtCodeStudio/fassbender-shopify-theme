import * as Barba from './barba';
import { Rivets } from './Rivets';
import { Tetris } from './Tetris';

export class View {

  private prefetch = new Barba.Prefetch();
  private dispatcher = new Barba.Dispatcher();
  private pjax = new Barba.Pjax(new Barba.CustomTransition());
  private outsite: any;
  private insite: any;

  constructor($) {

    this.outsite = Rivets.bind($('#rivets-top, #rivets-bottom'), window.model);

    this.dispatcher.on('newPageReady', (currentStatus: Barba.IState, prevStatus: Barba.IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, isInit: boolean) => {
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
