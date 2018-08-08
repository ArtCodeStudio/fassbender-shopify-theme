import Debug from 'debug';
import $ from 'jquery';
import { IShopifyProductVariant, IShopifyProduct, IShopifyProductVariantOption, RibaComponent, shopifyExtension } from '../../tinybind';
import template from './shopify-product.component.html';
import { Utils } from '../../services/Utils';

const ShopifyCartService = shopifyExtension.services.ShopifyCartService;

interface IPrepairedProductVariant extends IShopifyProductVariant {
  images?: string[];
}

interface IScope {
  handle: string | null;
  product: IShopifyProduct  | null;
  variant: IPrepairedProductVariant | null;
  quantity: number;
  selectedOptions: string[];
  showDetailMenu: boolean;
  showAddToCartButton: boolean;
  isOptionActive: ShopifyProductComponent['isOptionActive'];
  onClickOption: ShopifyProductComponent['onClickOption'];
  addToCart: ShopifyProductComponent['addToCart'];
  toggleDetailMenu: ShopifyProductComponent['toggleDetailMenu'];
}

export class ShopifyProductComponent extends RibaComponent {

  public static tagName: string = 'rv-shopify-product';

  static get observedAttributes() {
    return ['handle', 'extras'];
  }

  protected $el: JQuery<HTMLElement>;

  protected debug = Debug('component:' + ShopifyProductComponent.tagName);

  protected scope: IScope = {
    handle: null,
    product: null,
    variant: null,
    quantity: 1,
    selectedOptions: [],
    showDetailMenu: false,
    showAddToCartButton: false,
    isOptionActive: this.isOptionActive,
    onClickOption: this.onClickOption,
    addToCart: this.addToCart,
    toggleDetailMenu: this.toggleDetailMenu,
  };

  private colorOption: IShopifyProductVariantOption | null = null;

  protected set product(product: IShopifyProduct | null) {
    this.debug('set product', product);
    if (product) {
      this.scope.product = product;

      // prepair product
      this.scope.product.featured_image = product.featured_image
      .replace(/(^\w+:|^)\/\//, '//'); // remove protocol

      this.scope.selectedOptions = new Array(this.scope.product.options.length);

      this.colorOption = this.getOption(product, 'color');
      // set the first variant to the selected one
      this.variant = this.scope.product.variants[0];
    }
  }

  protected get product(): IShopifyProduct | null {
    return this.scope.product;
  }

  protected set variant(variant: IShopifyProductVariant) {
    this.debug('set variant', variant);
    this.scope.variant = this.prepairVariant(variant);
    if (this.scope.variant) {
      this.scope.selectedOptions = Utils.clone(false, this.scope.variant.options.slice());
      this.activateOptions();
    }
  }

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.debug('constructor', this);
    this.init(ShopifyProductComponent.observedAttributes);
  }

  /**
   * Used in template with rv-class-active="isOptionActive | call size"
   * @param optionValue
   */
  public isOptionActive(optionValue: string | number) {
    this.debug('isOptionActive', optionValue, this.scope.selectedOptions.indexOf(optionValue.toString()) );
    if (Utils.isUndefined(optionValue)) {
      return false;
    }
    return this.scope.selectedOptions.indexOf(optionValue.toString()) > -1;
  }

  public onClickOption(optionValue: string | number, position1: number, optionName: string, event: MouseEvent, scope: any, el: HTMLElement) {
    optionValue = optionValue.toString();
    this.debug('onClickOption', optionValue, position1, this.scope.selectedOptions);
    this.scope.selectedOptions[position1 - 1] = optionValue.toString();
    const variant = this.getVariantOfOptions(this.scope.selectedOptions);
    if (variant) {
      this.variant = variant as IShopifyProductVariant;
    }
    event.stopPropagation();
  }

  public addToCart() {
    if (!this.scope.variant) {
      this.debug('Variant not selected');
      return;
    }
    this.debug('addToCart', this.scope.variant.id, this.scope.quantity);
    ShopifyCartService.add(this.scope.variant.id, this.scope.quantity)
    .then((response) => {
      this.debug('addToCart response', response);
    })
    .catch((error) => {
      this.debug('addToCart error', error);
    });
  }

  public toggleDetailMenu() {
    this.scope.showDetailMenu = !this.scope.showDetailMenu;
  }

  /**
   * Workaround because `rv-class-active="isOptionActive | call size"` is not updating if selectedOptions changes
   * @param optionValue
   * @param optionName
   */
  protected activateOption(optionValue: string, optionName: string) {
    optionValue = optionValue.toString().replace('#', '');
    this.debug('activateOption', `.option-${optionName.toLowerCase()}-${optionValue}`);
    this.$el.find(`.option-${optionName.toLocaleLowerCase()}`).removeClass('active');
    this.$el.find(`.option-${optionName.toLocaleLowerCase()}-${optionValue}`).addClass('active');
  }

  protected activateOptions() {
    for (const position0 in this.scope.selectedOptions) {
      if (this.scope.selectedOptions[position0]) {
        const optionValue = this.scope.selectedOptions[position0];
        if (this.scope.product) {
          const optionName = this.scope.product.options[position0].name.toLowerCase();
          this.activateOption(optionValue, optionName);
        }
      }
    }
  }

  protected async beforeBind() {
    this.debug('beforeBind');
    // https://help.shopify.com/en/themes/development/getting-started/using-ajax-api
    return Utils.getJSON(`/products/${this.scope.handle}.js`)
    .then((product: IShopifyProduct) => {
      this.product = product;
      return this.product;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
    this.activateOptions();
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

  private getVariantOfOptions(optionValues: string[]) {
    // this.debug('getVariantOfOptions', optionValues);
    let result: IShopifyProductVariant | null = null;
    if (this.scope.product) {
      for (const i in this.scope.product.variants) {
        if (this.scope.product.variants[i]) {
          result = null;
          const variant = this.scope.product.variants[i];
          let fit = false;
          for (const position0 in optionValues) {
            if (optionValues[position0]) {
              const optionValue = optionValues[position0];
              fit = variant.options.indexOf(optionValue.toString()) > -1;
              this.debug('variant.options', variant.options, 'indexOf', optionValue.toString(), fit);
            }
          }
          if (fit) {
            result = variant;
            this.debug('break', result);
            break;
          }
        }
      }
    }

    this.debug('getVariantOfOptions optionValues', optionValues, 'variant', result);

    if (result) {
      return result;
    } else {
      return null;
    }
  }

  /**
   * Get variant object by variant id
   * @param id Variant id
   */
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
      return result;
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
    // this.debug('getImages');
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
        let index = -1;
        if (variant.featured_image !== null && variant.featured_image.src) {
          index = this.indexOfUrl(generalImages, variant.featured_image.src);
        }
        if (index >= 0) {
          generalImages.splice(index, 1);
        }
      });
    }

    // this.debug('getGeneralImages', generalImages);

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

  /**
   * Get product option by name
   * @param product product wich holds the options
   * @param name option name
   */
  private getOption(product: IShopifyProduct, name: string) {
    let result = null;
    product.options.forEach((option) => {
      if (option.name.toLowerCase() === name.toLowerCase()) {
        result = option;
      }
    });
    return result;
  }
}
