import $ from 'jquery';
import { IOneWayBinder, BinderWrapper } from '../tinybind';

export const backgroundImage: IOneWayBinder<string> = (el: HTMLElement, value: string) => {
  const $el = $(el);
  $el.css('background-image', 'url(' + value + ')');
};

/**
 * background-image
 */
export const backgroundImageBinder: BinderWrapper = () => {
  return {
    binder: backgroundImage,
    name: 'background-image',
  };
};
