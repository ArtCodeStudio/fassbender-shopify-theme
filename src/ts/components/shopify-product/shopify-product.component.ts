import Debug from 'debug';
import $ from 'jquery';
import { RibaComponent, IShopifyProductImage, IShopifyProduct, IShopifyProductVariant } from '../../tinybind';
import template from './shopify-product.component.html';
import { getJSON } from '../../services/Utils';

interface IScope {
  handle: string | null;
  product: IShopifyProduct  | null;
  variant: IShopifyProductVariant | null;
  images: string[];
  onClickColor: ShopifyProductComponent['onClickColor'];
}

export class ShopifyProductComponent extends RibaComponent {

  public static tagName: string = 'rv-shopify-product';

  static get observedAttributes() {
    return ['handle', 'extras'];
  }

  protected debug = Debug('component:' + ShopifyProductComponent.tagName);

  protected scope: IScope = {
    handle: null,
    product: null,
    variant: null,
    images: [],
    onClickColor: this.onClickColor,
  };

  constructor(element?: HTMLElement) {
    super(element);
    const $el = $(this.el);
    this.debug('constructor', this);
    this.init(ShopifyProductComponent.observedAttributes);
  }

  public onClickColor(option: string) {
    this.scope.variant = this.getVariantOfSelection([option]);
  }

  public getVariantOfSelection(options: string[]) {
    let result = null;
    if (this.scope.product) {
      this.scope.product.variants.forEach((variant: IShopifyProductVariant) => {
        let fit = true;
        options.forEach((option) => {
          fit = variant.options.indexOf(option) !== -1;
        });
        if (fit) {
          result = variant;
        }
      });
    }
    return result;
  }

  public getVariant(id: number) {
    this.debug('selectVariant');
    let result = null;
    // this.scope.variant =
    if (this.scope.product) {
      this.scope.product.variants.forEach((variant: IShopifyProductVariant) => {
        if (variant.id === id) {
          result = variant;
        }
      });
    }
    return result;
  }

  /**
   * Get images wich are not linked to any variant
   */
  // public getImages() {
  //   this.debug('getImages');
  //   let images: string[] = [];
  //   if (this.scope.product) {
  //     // copy all images
  //     images = this.scope.product.images.slice(0);

  //     // remove variant images from copied array
  //     this.scope.product.variants.forEach((variant: IShopifyProductVariant) => {
  //       const index = images.indexOf(variant.featured_image.src);
  //       if (index >= 0) {
  //         images.splice(index, 1);
  //       }
  //     });
  //   }

  //   return images;
  // }

  protected async beforeBind() {
    this.debug('beforeBind', this.scope);
    // https://help.shopify.com/en/themes/development/getting-started/using-ajax-api
    return getJSON(`/products/${this.scope.handle}.js`)
    .then((product: IShopifyProduct) => {
      this.debug('JSON Data: ', product );
      this.scope.product = product;
      this.scope.variant = this.scope.product.variants[0];
      // this.scope.images = this.getImages();
      return product;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
  }

  protected requiredAttributes() {
    return ['handle', 'extras'];
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
