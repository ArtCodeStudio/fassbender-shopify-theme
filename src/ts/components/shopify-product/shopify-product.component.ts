import Debug from 'debug';
import $ from 'jquery';
import { RibaComponent, IShopifyProductImage, IShopifyProductVariantOption, IShopifyProduct, IShopifyProductVariant } from '../../tinybind';
import template from './shopify-product.component.html';
import { getJSON } from '../../services/Utils';

interface IPrepairedProductVariant extends IShopifyProductVariant {
  images?: string[];
}

interface IScope {
  handle: string | null;
  product: IShopifyProduct  | null;
  variant: IPrepairedProductVariant | null;
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
    onClickColor: this.onClickColor,
  };

  private colorOption: IShopifyProductVariantOption | null = null;

  constructor(element?: HTMLElement) {
    super(element);
    const $el = $(this.el);
    this.debug('constructor', this);
    this.init(ShopifyProductComponent.observedAttributes);
  }

  public onClickColor(option: string) {
    this.scope.variant = this.getVariantOfOptions([option]);
  }

  protected async beforeBind() {
    // https://help.shopify.com/en/themes/development/getting-started/using-ajax-api
    return getJSON(`/products/${this.scope.handle}.js`)
    .then((product: IShopifyProduct) => {

      // prepair product
      product.featured_image = product.featured_image
      .replace(/(^\w+:|^)\/\//, '//'); // remove protocol

      this.scope.product = product;

      this.colorOption = this.getOption(product, 'color');

      // set the first variant to the selected one
      this.scope.variant = this.prepairVariant(this.scope.product.variants[0]);
      // this.scope.images = this.getImages();
      this.debug('beforeBind', this.colorOption, this.scope);
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

  private getVariantOfOptions(options: string[]) {
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

    if (result) {
      return this.prepairVariant(result);
    } else {
      return null;
    }
  }

  private getVariant(id: number) {
    let result = null;
    // this.scope.variant =
    if (this.scope.product) {
      this.scope.product.variants.forEach((variant: IShopifyProductVariant) => {
        if (variant.id === id) {
          result = variant;
        }
      });
    }
    this.debug('selectVariant', result);
    if (result) {
      return this.prepairVariant(result);
    }
  }

  /**
   * custom version of images.indexOf but compares without protocol and query strin in url
   * @param images
   * @param findImage
   */
  private indexOfUrl(images: string[], findImage: string) {
    let index = -1;
    const clearFindImage = findImage
    .split('?')[0] // remove query string
    .replace(/(^\w+:|^)\/\//, '//'); // remove protocol
    images.forEach((image, i) => {
      const clearImage = image
      .split('?')[0] // remove query string
      .replace(/(^\w+:|^)\/\//, '//'); // remove protocol
      if (clearImage === clearFindImage) {
        index = i;
      }
    });
    return index;
  }

  /**
   * Get images wich are not linked to any variant
   */
  private getGeneralImages(optionName = 'color') {
    optionName = optionName.toLowerCase();
    this.debug('getImages');
    const generalImages: string[] = [];
    if (this.scope.product) {

      // add images without optionName in filename
      this.scope.product.images.forEach((image: string, index) => {
        if (!image.toLowerCase().includes(`${optionName}-`)) {
          generalImages.push(image);
        }
      });

      // remove variant images from copied array
      this.scope.product.variants.forEach((variant: IShopifyProductVariant) => {
        const index = this.indexOfUrl(generalImages, variant.featured_image.src);
        if (index >= 0) {
          generalImages.splice(index, 1);
        }
      });
    }

    this.debug('getGeneralImages', generalImages);

    return generalImages;
  }

  /**
   * Get options images (without featured image) filtered by filename
   */
  private getOptionImages(option: IShopifyProductVariantOption, optionValue: string) {
    optionValue = optionValue.toLowerCase().replace('#', '_');
    const optionName = option.name.toLowerCase();
    // this.debug('getOptionImages', optionName, optionValue);
    const optionImages: string[] = [];
    if (this.scope.product) {
      this.scope.product.images.forEach((image: string, index) => {
        // this.debug(`check ${optionName}-${optionValue} in`, image);
        if (image.toLowerCase().includes(`${optionName}-${optionValue}`)) {
          optionImages.push(image);
        }
      });
    }

    return optionImages;
  }

  /**
   * Get featured images of variant, use the first option image or the featured product image as fallback
   */
  private getFeaturedImage(variant: IPrepairedProductVariant) {
    if (variant.featured_image !== null) {
      variant.featured_image.src = variant.featured_image.src
      .replace(/(^\w+:|^)\/\//, '//'); // remove protocol
      return variant.featured_image;
    }

    let fallbackImageSrc = '';

    if (variant.images && variant.images.length > 0) {
      fallbackImageSrc = variant.images[0];
    } else if (this.scope.product) {
      fallbackImageSrc =  this.scope.product.featured_image;
    }

    // remove protocol for normalisation
    fallbackImageSrc = fallbackImageSrc.replace(/(^\w+:|^)\/\//, '//');

    // If variant has no image use the default product image
    if (this.scope.product) {
      const featuredImage = {
        src: fallbackImageSrc,
        position: 0,
        product_id: this.scope.product.id,
        variant_ids: [],
        alt: this.scope.product.title,
        created_at: this.scope.product.created_at,
        height: 0,
        width: 0,
        id: 0,
        updated_at: this.scope.product.created_at,
      };
      return featuredImage;
    }

    throw new Error('image not found');
  }

  /**
   * prepair variant, e.g. fix missing image etc
   * @param variant
   */
  private prepairVariant(variant: IPrepairedProductVariant) {
    if (variant === null) {
      return null;
    }

    if (this.colorOption) {
      variant.images = this.getOptionImages(this.colorOption, variant.options[this.colorOption.position - 1]);
    } else {
      console.warn('colorOption not defined');
      variant.images = [];
    }

    variant.featured_image = this.getFeaturedImage(variant);

    if (variant.images) {
      // Remove featured image so that it does not appear twice
      const i = this.indexOfUrl(variant.images, variant.featured_image.src);
      if (i >= 0) {
        variant.images.splice(i, 1);
      }

      // add gerneal images
      variant.images = variant.images.concat(this.getGeneralImages());
    }

    return variant;
  }

  private getOption(product: IShopifyProduct, name: string) {
    let result = null;
    product.options.forEach((option, index) => {
      if (option.name.toLowerCase() === name.toLowerCase()) {
        result = option;
      }
    });
    return result;
  }
}
