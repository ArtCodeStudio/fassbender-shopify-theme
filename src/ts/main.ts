import { sayHello } from './greet';
import { Barba } from './barba.ts';
import * as $ from 'jquery';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';


declare global {
  interface Window { Barba: any; }
}

window.Barba = Barba;

function showHello(selector: string, name: string) {
    const $el = $(selector);
    console.log($el);
    $el.text(sayHello(name));
};

$(() => {
  showHello("#greeting", "TypeScript");
});

console.log('Barba', Barba);