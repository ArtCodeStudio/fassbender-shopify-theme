import { sayHello } from './greet';
import * as jQuery from 'jquery';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { Barba } from './barba.ts';
import * as Rivets from 'rivets';

import * as Debug from 'debug';

declare global {
  interface Window {
    $: any;
    jQuery: any;
    Barba: any;
    rivets: any;
  }
  interface Window {  }
}

// window.$ = jQuery;
// window.jQuery = jQuery;
// window.Barba = Barba;
// window.rivets = Rivets;



console.log('Barba', Barba);
console.log('Rivets', Rivets , window.rivets);

function showHello(selector: string, name: string) {
  const $el = jQuery(selector);
  console.log($el);
  $el.text(sayHello(name));
};

jQuery(() => {
  showHello("#greeting", "TypeScript");
  Barba.Prefetch.init();
  Barba.Pjax.start();
});
