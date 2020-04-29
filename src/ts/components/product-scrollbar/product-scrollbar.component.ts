import { Component } from "@ribajs/core";
import { JQuery as $ } from "@ribajs/jquery";
import { Pjax, Prefetch } from "@ribajs/router";

export class ProductScrollbarComponent extends Component {
  public static tagName = "rv-product-scrollbar";

  static get observedAttributes() {
    return [];
  }

  protected scope: any = {
    onScroll: this.onScroll,
    onProductTap: this.onProductTap,
    onProductMouseenter: this.onProductMouseenter,
    title: "",
  };

  private products?: NodeListOf<HTMLElement>;

  constructor(element?: HTMLElement) {
    super(element);
    this.products = this.el.querySelectorAll(".embed-responsive");
    this.init(ProductScrollbarComponent.observedAttributes);
  }

  /**
   * Just open the product url
   */
  public onProductTap(event: Event, scope: any, eventEl: HTMLElement) {
    const url = eventEl.dataset.url;
    if (!url) {
      return;
    }
    const pjax = Pjax.getInstance("main");
    if (!pjax) {
      return;
    }
    pjax.goTo(url);
  }

  /**
   * Preload product on mouse over
   */
  public onProductMouseenter(event: Event, scope: any, eventEl: HTMLElement) {
    // console.debug'onProductMouseenter');
    const url = $(eventEl).data("url");
    const prefetch = Prefetch.getInstance();
    if (!prefetch) {
      return;
    }
    prefetch.onLinkEnter(url, url, event);
  }

  /**
   * get product in the middle of the scrollbar element
   */
  public onScroll(
    event: JQuery.Event | Event,
    scope: any,
    eventEl: HTMLElement
  ) {
    if (this.products) {
      this.products.forEach((product /*, index*/) => {
        if (this.products) {
          // const product = this.products[index];
          const productData = product.dataset;
          const parentRect = eventEl.getBoundingClientRect();
          const elementRect = product.getBoundingClientRect();
          const elementMiddle = elementRect.width / 2;
          /** centerX is 0 if the product is in the middle */
          const centerX =
            elementRect.left - (parentRect.width / 2 - elementMiddle);
          const offset = elementMiddle;

          if (centerX > offset * -1 && centerX < offset) {
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
    this.products = this.el.querySelectorAll(".embed-responsive");
  }

  protected template() {
    return null;
  }
}
