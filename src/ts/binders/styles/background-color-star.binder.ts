import { IOneWayBinder, BinderWrapper, JQuery as $ } from '@ribajs/core';

export const backgroundColorStarBinder: IOneWayBinder<string> = function(el: HTMLElement, value: string) {
  const $el = $(el);
  const color =  this.args[0].toString() || 'transparent';
  if (value) {
    $el.css('background-color', color);
  } else {
    $el.css('background-color', '');
  }
};

/**
 * background-image
 */
export const backgroundColorStarBinderWrapper: BinderWrapper = () => {
  return {
    binder: backgroundColorStarBinder,
    name: 'background-color-*',
  };
};
