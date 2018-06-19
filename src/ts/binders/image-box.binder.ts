import { IOneWayBinder } from 'tinybind';
import { BinderWrapper } from './binders.service';

export const imageBox: IOneWayBinder<string> = (el: HTMLElement, value: string) => {
  const $el = $(el);
  $el.addClass('image-box');
  if (value) {
    const ratioStrings = value.split(':');
    const ratios = new Array<number>();
    ratios[0] = Number(ratioStrings[0]);
    ratios[1] = Number(ratioStrings[1]);
    const heightInPercent = (ratios[1] / ratios[0] * 100);
    const ratioClass = 'ratio-' + ratios[0] + '-' + ratios[1];
    const style = 'padding-top: ' + heightInPercent + '%;';
    $el.addClass(ratioClass);
    $('head').append('<style>.image-box.' + ratioClass + ':before{' + style + '}</style>');
  }
};

/**
 * mailto
 */
export const imageBoxBinder: BinderWrapper = () => {
  return {
    binder: imageBox,
    name: 'image-box',
  };
};
