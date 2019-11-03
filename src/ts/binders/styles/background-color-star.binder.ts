import { IBinder } from '@ribajs/core';
import { JQuery as $ } from '@ribajs/jquery';

export const backgroundColorStarBinder: IBinder<string> = {
  name: 'background-color-*',
  routine(el: HTMLElement, value: string) {
    const $el = $(el);
    const color =  this.args[0].toString() || 'transparent';
    if (value) {
      $el.css('background-color', color);
    } else {
      $el.css('background-color', '');
    }
  },
};
