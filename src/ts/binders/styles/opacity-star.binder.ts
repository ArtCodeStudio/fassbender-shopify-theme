import { IOneWayBinder, BinderWrapper, JQuery as $ } from '@ribajs/core';

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
