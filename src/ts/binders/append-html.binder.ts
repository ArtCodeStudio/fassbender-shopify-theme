import { IOneWayBinder } from 'tinybind';
import { Utils } from '../services/Utils';
import { BinderWrapper } from './binders.service';

/**
 * mailto
 */
export const appendHtmlBinder: BinderWrapper = () => {
  const name = 'append-html';
  const appendHtml: IOneWayBinder<string> = (el: HTMLElement, value: string) => {
    const $el = $(el);
    if (!Utils.isString(value)) {
      value = $el.attr('rv-append-html');
    }
    const htmlNodes = $.parseHTML(value);
    $(el).append(htmlNodes);
  };
  return {
    binder: appendHtml,
    name,
  };
};
