import { IOneWayBinder, BinderWrapper } from '../../modules/tinybind/index';
import { Utils } from '../services/Utils';

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
