import { Binder } from '@ribajs/core';
import { JQuery as $ } from '@ribajs/jquery';

export const backgroundImageBinder: Binder<string> = {
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
