import { Debug, JQuery as $, Binding, Binder, RibaComponent } from '@ribajs/core';
import { Pjax, Prefetch } from '@ribajs/router';

export class ProductScrollbarComponent extends RibaComponent {

  public static tagName: string = 'rv-product-scrollbar';

  static get observedAttributes() {
    return [];
  }

  protected debug = Debug('component:' +  + ProductScrollbarComponent.tagName);

  protected scope: any = {
    onScroll: this.onScroll,
    onProductTap: this.onProductTap,
    onProductMouseenter: this.onProductMouseenter,
    title: '',
  };

  // private model: any = {};
  private pjax = new Pjax('main');
  private prefetch = new Prefetch();
  private $products?: JQuery<HTMLElement>;

  constructor(element?: HTMLElement) {
    super(element);
    const $el = $(this.el);
    this.$products = $el.find('.content-box');
    this.init(ProductScrollbarComponent.observedAttributes);
  }

  /**
   * Just open the product url
   */
  public onProductTap(context: Binder<any>, event: JQuery.Event, scope: any, eventEl: HTMLElement, binding: Binding) {
    const url = $(eventEl).data('url');
    this.pjax.goTo(url);
  }

  /**
   * Preload product on mouse over
   */
  public onProductMouseenter(context: Binder<any>, event: JQuery.Event, scope: any, eventEl: HTMLElement, binding: Binding) {
    this.debug('onProductMouseenter');
    const url = $(eventEl).data('url');
    this.prefetch.onLinkEnter(event, url);
  }

  /**
   * get product in the middle of the scrollbar element
   */
  public onScroll(context: Binder<any>, event: JQuery.Event, scope: any, eventEl: HTMLElement, binding: Binding) {
    const self = this;
    this.debug('onScroll', this.scope);
    if (this.$products) {
      this.$products.each((index: number) => {
        if (self.$products) {
          const product = self.$products.get(index);
          const productData = product.dataset;
          const parentRect = eventEl.getBoundingClientRect();
          const elementRect = product.getBoundingClientRect();
          const elementMiddle = (elementRect.width / 2);
          /** centerX is 0 if the product is in the middle */
          const centerX = elementRect.left - ((parentRect.width / 2) - elementMiddle);
          const offset = elementMiddle;

          if (centerX > (offset * -1) && centerX < offset) {
            this.scope.title = productData.title;
          }
        }
      });
    }
  }

  protected requiredAttributes() {
    return [];
  }

  /**
   * Default custom Element method
   * Invoked when the custom element is first connected to the document's DOM.
   */
  protected connectedCallback() {
    this.$products = $((this as any)).find('.content-box');
  }

  protected template() {
    return null;
  }
}
