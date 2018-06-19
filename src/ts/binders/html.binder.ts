import { IOneWayBinder } from 'tinybind';
import { Utils } from '../services/Utils';
import { BinderWrapper } from './binders.service';

/**
 * mailto
 */
export const htmlBinder: BinderWrapper = () => {
  const name = 'html';
  const html: IOneWayBinder<string> = (el: HTMLElement, value: string) => {
    const $el = $(el);
    if (!Utils.isString(value)) {
      value = $el.attr('rv-html');
    }
    $(el).html(value);
  };
  return {
    binder: html,
    name,
  };
};
