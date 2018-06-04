/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Rivets.Util
// -----------

import * as jQuery from 'jquery';

class Util {

  static bindEvent(el: HTMLElement, event: string, handler): JQuery<HTMLElement>   {
    return jQuery(el).on(event, handler);
  }

  static unbindEvent(el: HTMLElement, event: string, handler): JQuery<HTMLElement>  {
    return jQuery(el).off(event, handler);
  }

  static getInputValue(el) {
    const $el = jQuery(el);
    if ($el.attr('type') === 'checkbox') {
      return $el.is(':checked');
    } else {
      return ($el.val)();
    }
  }
}

export { Util };