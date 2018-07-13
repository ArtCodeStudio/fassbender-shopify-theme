import Debug from 'debug';
import { IOneWayBinder, BinderWrapper } from '../../tinybind';

/**
 * shopify-section-product-scrollbar
 */
export const productScrollbarBinder: BinderWrapper = () => {
  const name = 'shopify-section-product-scrollbar';
  const binder: IOneWayBinder<string> = (el: HTMLElement, data: any) => {
    const debug = Debug('binders:shopify-section-product-scrollbar');
    debug('ready');
  };
  return {
    binder,
    name,
  };
};
