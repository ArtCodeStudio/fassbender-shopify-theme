import $ from '../../jquery';
import { IOneWayBinder, BinderWrapper } from '../../tinybind';

export const opacityStarBinder: IOneWayBinder<string> = function(el: HTMLElement, value: string) {
  const $el = $(el);
  const opacity =  parseFloat(this.args[0] as string);
  if (value) {
    $el.css('opacity', opacity);
  } else {
    $el.css('opacity', '');
  }
};

/**
 * background-image
 */
export const opacityStarBinderWrapper: BinderWrapper = () => {
  return {
    binder: opacityStarBinder,
    name: 'opacity-*',
  };
};
