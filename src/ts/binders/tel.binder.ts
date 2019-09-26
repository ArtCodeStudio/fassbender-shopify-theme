import { IBinder } from '@ribajs/core';

/**
 * tel
 */
export const telBinder: IBinder<string> = {
  name: 'tel',
  routine(el: HTMLElement, value: any) {
    $(el).attr('href', 'tel:' + value);
  },
};
