import * as Debug from 'debug';
import $ = require('jquery'); // not working on parcel.js: import * as $ from 'jquery';
// import Rivets = require('rivets');
import { BarbaBaseTransition, Rivets } from './Rivets';

// import { from, Observable, of, range, ReplaySubject, Subject } from 'rxjs';
import * as Barba from './barba';
import { Tetris } from './Tetris';
// import { Utils } from './Utils';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

const initBarba = () => {
  // console.log('initBarba');

  const prefetch = new Barba.Prefetch();
  const dispatcher = new Barba.Dispatcher();
  const pjax = new Barba.Pjax(new BarbaBaseTransition());

  prefetch.init();

  dispatcher.on('newPageReady', (currentStatus: Barba.IState, prevStatus: Barba.IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, isInit: boolean) => {
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
  Rivets.bind($('#rivets-top, #rivets-bottom'), window.model);
});

// TODO slideshow inpirated by https://slideout.js.org/
