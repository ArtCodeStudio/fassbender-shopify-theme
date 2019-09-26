import { IBinder } from '@ribajs/core';

/**
 * mailto
 */
export const mailtoBinder: IBinder<string> = {
  name: 'mailto',
  routine(el: HTMLElement, value: any) {
    $(el).attr('href', 'mailto:' + value);
  },
};
