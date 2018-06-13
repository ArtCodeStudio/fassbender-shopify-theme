// import Debug from 'debug';
import $ from 'jquery';
import { View } from './View';
// import Rivets = require('rivets');
// import { from, Observable, of, range, ReplaySubject, Subject } from 'rxjs';
// import { Utils } from './Utils';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

$((jQuery) => {
  const view = new View(jQuery);
});

// TODO slideshow inpirated by https://slideout.js.org/
