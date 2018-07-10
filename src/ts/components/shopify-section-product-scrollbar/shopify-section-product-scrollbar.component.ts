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
      this.$el = $(el);
      const scope = this;
      debug('initialize', data);

      /**
       * Just open the product url
       */
      scope.onProductTap = (event: JQuery.Event<HTMLElement, null>, _: any, eventEl: HTMLElement) => {
        const url = $(eventEl).data('url');
        pjax.goTo(url);
      };

      /**
       * Preload product
       */
      scope.onProductMouseenter = (event: JQuery.Event<HTMLElement, null>, _: any, eventEl: HTMLElement) => {
        const url = $(eventEl).data('url');
        prefetch.onLinkEnter(event, url);
      };

      return scope;
    },
  };

  return component;
};
