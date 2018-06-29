import $ from 'jquery';
import { IOneWayBinder } from '../tinybind';
import { BinderWrapper } from './binders.service';

/**
 * add-class
 * @param el
 * @param value
 */
export const addClass: IOneWayBinder<string> = (el: HTMLElement, value: string) => {
  const $el = $(el);
  if (value) {
    $el.addClass(value);
  }
  return value;
};

export const addClassBinder: BinderWrapper = () => {
  const name = 'mailto';
  const binder: IOneWayBinder<string> = (el: HTMLElement, value: any) => {
    $(el).attr('href', 'mailto:' + value);
  };
  return {
    binder: addClass,
    name: 'add-class',
  };
};
