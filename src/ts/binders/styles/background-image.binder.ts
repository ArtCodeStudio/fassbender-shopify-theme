import $ from 'jquery';
import { IOneWayBinder, BinderWrapper } from '../../tinybind';

export const backgroundImageBinder: IOneWayBinder<string> = (el: HTMLElement, value: string) => {
  const $el = $(el);
  if (value) {
    $el.css('background-image', 'url(' + value + ')');
  } else {
    $el.css('background-image', '');
  }
};

/**
 * background-image
 */
export const backgroundImageBinderWrapper: BinderWrapper = () => {
  return {
    binder: backgroundImageBinder,
    name: 'background-image',
  };
};
