import Debug from 'debug';
import $ from 'jquery';
import { RibaComponent } from '../../tinybind';
import template from './shopify-product-item.component.html';

export class ShopifyProductItemComponent extends RibaComponent {

  public static tagName: string = 'rv-shopify-product-item';

  static get observedAttributes() {
    return ['product'];
  }

  protected debug = Debug('component:' + ShopifyProductItemComponent.tagName);

  protected scope: any = {
    product: {},
  };

  constructor(element?: HTMLElement) {
    super(element);
    const $el = $(this.el);
    this.debug('constructor', this);
    this.init(ShopifyProductItemComponent.observedAttributes);
  }

  protected requiredAttributes() {
    return ['product'];
  }

  protected template() {
     // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      return null;
    } else {
      return template;
    }
  }
}
