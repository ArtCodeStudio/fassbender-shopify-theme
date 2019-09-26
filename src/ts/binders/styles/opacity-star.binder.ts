import { IBinder, BinderWrapper, JQuery as $ } from '@ribajs/core';

export const opacityStarBinder: IBinder<string> = {
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
