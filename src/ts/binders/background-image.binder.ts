import $ from 'jquery';
import { IOneWayBinder } from 'tinybind';
import { BinderWrapper } from './binders.service';

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
