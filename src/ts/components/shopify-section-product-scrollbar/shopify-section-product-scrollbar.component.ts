import Debug from 'debug';
import { IComponentWrapperResult, Pjax, Prefetch } from '../../tinybind';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

/**
 * shopify-section-product-scrollbar
 */
export const shopifySectionProductScrollbarComponent = ($: JQueryStatic) => {

  const debug = Debug('component:shopify-section-product-scrollbar');

  const pjax = new Pjax();
  const prefetch = new Prefetch();

  const component: IComponentWrapperResult<any> = {
    name: 'shopify-section-product-scrollbar',

    template() {
      return null;
    },

    initialize(el: HTMLElement, data: any) {
      this.customData = {};
      const $el = $(el);
      const $products = $el.find('.content-box');
      const scope = this;
      debug('initialize', data);

      scope.title = 'Please choose a product';

      /**
       * Just open the product url
       */
      scope.onProductTap = (event: JQuery.Event<HTMLElement, null>, controller: any, eventEl: HTMLElement) => {
        const url = $(eventEl).data('url');
        pjax.goTo(url);
      };

      /**
       * Preload product on mouse over
       */
      scope.onProductMouseenter = (event: JQuery.Event<HTMLElement>, controller: any, eventEl: HTMLElement) => {
        const url = $(eventEl).data('url');
        prefetch.onLinkEnter(event, url);
      };

      /**
       * get product in the middle of the scrollbar element
       */
      scope.onScroll = (event: JQuery.Event<HTMLElement>, controller: any, eventEl: HTMLElement) => {
        debug('onScroll');
        $products.each(function(this: HTMLElement, index: number) {
          const product = $products.get(index);
          const productData = product.dataset;
          const parentRect = eventEl.getBoundingClientRect();
          const elementRect = product.getBoundingClientRect();
          const elementMiddle = (elementRect.width / 2);
          /** centerX is 0 if the product is in the middle */
          const centerX = elementRect.left - ((parentRect.width / 2) - elementMiddle);
          const offset = elementMiddle;

          if (centerX > (offset * -1) && centerX < offset) {
            scope.title = productData.title;
          }
        });
      };

      return scope;
    },
  };

  return component;
};
