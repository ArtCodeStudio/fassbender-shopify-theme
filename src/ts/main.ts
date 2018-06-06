import { Tetris } from './Tetris';
import * as $ from 'jquery';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { Barba, IState } from './barba';
import * as Rivets from 'rivets';

import * as Debug from 'debug';

declare global {
  interface Window {
    $: any;
  }
  interface Window {  }
}

window.$ = $;
// window.jQuery = $;
// window.Barba = Barba;
// window.rivets = Rivets;

var $el: JQuery<HTMLElement>

console.log('Barba', Barba);
console.log('Rivets', Rivets);

let initBarba = () => {
  console.log('initBarba');

  Barba.Prefetch.init();

  Barba.Dispatcher.on('newPageReady', (currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string) => {
    // init Template
    var data = $container.data();
    console.log('newPageReady', currentStatus, );
    if(data.template === 'page.tetris') {
      let tetris = new Tetris();
      tetris.run();
    }
  });

  
  Barba.Pjax.start();
}

$(() => {
  initBarba();
});


