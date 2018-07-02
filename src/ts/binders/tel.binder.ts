import { IOneWayBinder, BinderWrapper } from '../../modules/tinybind';

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
