import { IOneWayBinder } from 'tinybind';
import { BinderWrapper } from './binders.service';

/**
 * tel
 */
export const telBinder: BinderWrapper = () => {
  const name = 'tel';
  const binder: IOneWayBinder<string> = (el: HTMLElement, value: any) => {
    $(el).attr('href', 'tel:' + value);
  };
  return {
    binder,
    name,
  };
};
