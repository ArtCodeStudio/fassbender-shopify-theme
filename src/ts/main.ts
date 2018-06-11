import * as Debug from 'debug';
import $ = require('jquery'); // not working on parcel.js: import * as $ from 'jquery';
import * as Rivets from 'rivets';

import { from, Observable, of, range, ReplaySubject, Subject } from 'rxjs';
import { Tetris } from './Tetris';

import * as Barba from './barba';

// import '../scss/static/theme.scss';

// declare global {
//   interface Window {
//     $: any;
//   }
//   interface Window {  }
// }

// window.jQuery = $;
// window.Barba = Barba;
// window.rivets = Rivets;

// let $el: JQuery<HTMLElement>

// console.log('Barba', Barba);
// console.log('Rivets', Rivets);

const initBarba = () => {
  // console.log('initBarba');

  const prefetch = new Barba.Prefetch();
  const dispatcher = new Barba.Dispatcher();
  const pjax = new Barba.Pjax();

  prefetch.init();

  dispatcher.on('newPageReady', (currentStatus: Barba.IState, prevStatus: Barba.IState, $container: JQuery<HTMLElement>, newPageRawHTML: string) => {
    // init Template
    const data = $container.data();
    // console.log('newPageReady', currentStatus, );
    if (data.template === 'page.tetris') {
      const tetris = new Tetris();
      tetris.run();
    }
  });
  pjax.start();
};

$(() => {
  initBarba();
});

// TODO slideshow inpirated by https://slideout.js.org/
