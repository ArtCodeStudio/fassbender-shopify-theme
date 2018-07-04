import Debug from 'debug';
import { IOneWayBinder, BinderWrapper } from '../tinybind';

/**
 * for-*-*
 * for-from-to
 */
export const forFromToBinder: BinderWrapper = () => {
  const name = 'for-*.*';
  const debug = Debug('binders:' + name);
  const binder: IOneWayBinder<string> = function(el: HTMLElement, value: any) {
    const $el = $(el);
    const start = Number((this as any).args[0]);
    const end = Number((this as any).args[1]);
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
