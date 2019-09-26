import $ from 'jquery';
import { IBinder } from '@ribajs/core';

export const backgroundImageBinder: IBinder<string> = {
  name: 'background-image',
  routine(el: HTMLElement, value: string) {
    const $el = $(el);
    if (value) {
      $el.css('background-image', 'url(' + value + ')');
    } else {
      $el.css('background-image', '');
    }
  },
};
