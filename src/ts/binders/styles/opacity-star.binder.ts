import { Binder } from '@ribajs/core';
import { JQuery as $ } from '@ribajs/jquery';

export const opacityStarBinder: Binder<string> = {
  name: 'opacity-*',
  routine(el: HTMLElement, value: string) {
    const $el = $(el);
    const opacity =  parseFloat(this.args[0] as string);
    if (value) {
      $el.css('opacity', opacity);
    } else {
      $el.css('opacity', '');
    }
  },
};
