import Debug from 'debug';
import { Pjax, Prefetch, RibaComponent, Binding } from '../../tinybind';
import $ from '../../jquery';

class ProductScrollbarRibaComponent extends RibaComponent {

  public static tagName: string = 'rv-product-scrollbar';

  protected debug = Debug('component:rv-product-scrollbar');

  protected scope: any = {};

  // private model: any = {};
  private pjax = new Pjax();
  private prefetch = new Prefetch();
  private $products?: JQuery<HTMLElement>;

  constructor(element?: HTMLElement) {
    super(element);
    const $el = $(this.el);
    this.$products = $el.find('.content-box');

    this.scope.onScroll = this.onScroll;
    this.scope.onProductTap = this.onProductTap;
    this.scope.onProductMouseenter = this.onProductMouseenter;

    this.scope.title = 'Please choose a product';

    this.bind();

    this.debug('constructor', this);
  }

  /**
   * Just open the product url
   */
  public onProductTap(event: JQuery.Event<HTMLElement, null>, scope: any, eventEl: HTMLElement, context: Binding) {
    const url = $(eventEl).data('url');
    this.pjax.goTo(url);
  }

  /**
   * Preload product on mouse over
   */
  public onProductMouseenter(event: JQuery.Event<HTMLElement>, scope: any, eventEl: HTMLElement, context: Binding) {
    this.debug('onProductMouseenter');
    const url = $(eventEl).data('url');
    this.prefetch.onLinkEnter(event, url);
  }

  /**
   * get product in the middle of the scrollbar element
   */
  public onScroll(event: JQuery.Event<HTMLElement>, scope: any, eventEl: HTMLElement, context: Binding) {
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

// (ProductScrollbarRibaComponent as any).prototype.__proto__ = HTMLElement.prototype;
// (ProductScrollbarRibaComponent as any).__proto__ = HTMLElement;

export { ProductScrollbarRibaComponent };
