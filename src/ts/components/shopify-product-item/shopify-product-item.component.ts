import Debug from 'debug';
import $ from 'jquery';
import {
  RibaComponent,
  IShopifyProduct,
  IShopifyProductVariant,
} from '../../tinybind';
import template from './shopify-product-item.component.html';
import { Utils } from '../../services/Utils';

import { ShopifyProductComponent, IScope } from '../shopify-product/shopify-product.component';

/**
 * TODO minify this, create a general product service instead of extend from ShopifyProductComponent
 * or create a product list for all products
 * or just get the attributes we need like the options
 * or render the most with liquid
 */
export class ShopifyProductItemComponent extends RibaComponent /*ShopifyProductComponent*/ {

  public static tagName: string = 'rv-shopify-product-item';

  static get observedAttributes() {
    return ['handle'];
  }

  protected scope = {};

  protected debug = Debug('component:' + ShopifyProductItemComponent.tagName);

  constructor(element?: HTMLElement) {
    super(element);
    this.debug('constructor', this);
    this.init(ShopifyProductItemComponent.observedAttributes);
  }

  protected requiredAttributes() {
    return ['handle'];
  }

  // protected async beforeBind() {
  //   this.debug('beforeBind');
  //   if (this.scope.handle === null) {
  //     throw new Error('Product handle not set');
  //   }
  //   // https://help.shopify.com/en/themes/development/getting-started/using-ajax-api
  //   return Utils.getJSON(`/products/${this.scope.handle}.js`)
  //   .then((product: IShopifyProduct) => {
  //     this.product = product;
  //     return this.product;
  //   });
  // }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      return null;
    } else {
      return template;
    }
  }
}
