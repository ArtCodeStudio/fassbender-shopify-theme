import { IOneWayBinder, BinderWrapper } from '@ribajs/core';

/**
 * tel
 */
export const telBinderWrapper: BinderWrapper = () => {
  const name = 'tel';
  const binder: IOneWayBinder<string> = (el: HTMLElement, value: any) => {
    $(el).attr('href', 'tel:' + value);
  };
  return {
    binder,
    name,
  };
};
