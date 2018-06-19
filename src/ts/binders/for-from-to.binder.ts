import Debug from 'debug';
import { IOneWayBinder } from 'tinybind';
import { BinderWrapper } from './binders.service';

/**
 * for-*-*
 * for-from-to
 */
export const forFromToBinder: BinderWrapper = () => {
  const name = 'for-*.*';
  const debug = Debug('binders:' + name);
  const binder: IOneWayBinder<string> = (el: HTMLElement, value: any) => {
    const $el = $(el);
    const start = Number(this.arg[0]);
    const end = Number(this.arg[1]);
    debug('start', start, 'end', end);
    const htmlString = $el.html();
    for (let index = start; index < end; index++) {
      // $el.children().clone().appendTo($el);
      debug('index', index);
      // html += html;
    }
    debug('html', htmlString);
    // $el.html('test');
    return value;
  };
  return {
    binder,
    name,
  };
};
