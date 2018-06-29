import { IOneWayBinder } from '../tinybind';
import { BinderWrapper } from './binders.service';

/**
 * mailto
 */
export const mailtoBinder: BinderWrapper = () => {
  const name = 'mailto';
  const binder: IOneWayBinder<string> = (el: HTMLElement, value: any) => {
    $(el).attr('href', 'mailto:' + value);
  };
  return {
    binder,
    name,
  };
};
