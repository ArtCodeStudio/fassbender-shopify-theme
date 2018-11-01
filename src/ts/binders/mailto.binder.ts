import { IOneWayBinder, BinderWrapper } from '@ribajs/core';

/**
 * mailto
 */
export const mailtoBinderWrapper: BinderWrapper = () => {
  const name = 'mailto';
  const binder: IOneWayBinder<string> = (el: HTMLElement, value: any) => {
    $(el).attr('href', 'mailto:' + value);
  };
  return {
    binder,
    name,
  };
};
