import {
  Component,
} from '@ribajs/core';
import { JQuery as $} from '@ribajs/jquery';
import {
  ShopifyProductVariant,
  ShopifyProduct,
  ShopifyProductVariantOption,
  ShopifyCartService,
  ShopifyProductService,
} from '@ribajs/shopify';
import template from './shopify-product.component.html';

const IMAGES_PER_ROW = 2;

export interface ImageRow {
  class: string;
  images: string[];
  sizes: string;
}

export interface IPrepairedProductVariant extends ShopifyProductVariant {
  images?: string[];
  imageRows?: ImageRow[];
}

export interface IScope {
  handle: string | null;
  product: ShopifyProduct  | null;
  variant: IPrepairedProductVariant | null;
  quantity: number;
  showDetailMenu: boolean;
  // showAddToCartButton: boolean;
  chooseOption: ShopifyProductComponent['chooseOption'];
  addToCart: ShopifyProductComponent['addToCart'];
  toggleDetailMenu: ShopifyProductComponent['toggleDetailMenu'];
  decrease: ShopifyProductComponent['decrease'];
  increase: ShopifyProductComponent['increase'];
  $parent?: any;
  /**
   * If the variant is available, used to disable the add to cart button
   */
  available: boolean;
}

export class ShopifyProductComponent extends Component {

  public static tagName: string = 'rv-shopify-product';

  protected autobind: boolean = true;

  /**
   * handle is the product handle to get the product json object
   * extras are product data wich is only avaiable over liquid and not over the product json object
   */
  static get observedAttributes() {
    return ['handle', 'extras'];
  }

  protected $el: JQuery<HTMLElement>;

  protected scope: IScope = {
    handle: null,
    product: null,
    variant: null,
    quantity: 1,
    showDetailMenu: false,
    // showAddToCartButton: false,
    chooseOption: this.chooseOption,
    addToCart: this.addToCart,
    toggleDetailMenu: this.toggleDetailMenu,
    decrease: this.decrease,
    increase: this.increase,
    /**
     * If the variant is available, used to disable the add to cart button
     */
    available: false,
  };

  private colorOption: ShopifyProductVariantOption | null = null;

  private selectedOptions: string[] = [];

  /**
   * Is true if the user has choosed an option
   */
  private optionChoosed: boolean = false;

  protected set product(product: ShopifyProduct | null) {
    if (product) {
      this.scope.product = ShopifyProductService.prepair(product);

      // this.selectedOptions = new Array(this.scope.product.options.length);

      this.colorOption = ShopifyProductService.getOption(this.scope.product, 'color');
      // set the first variant to the selected one
      this.variant = this.scope.product ? this.scope.product.variants[0] : null;
    }
  }

  protected get product(): ShopifyProduct | null {
    return this.scope.product;
  }

  protected set variant(variant: ShopifyProductVariant | null) {
    if (variant === null) {
      console.warn('Error: Variant ist null');
      return;
    }
    this.scope.variant = this.prepairVariant(variant);
    if (this.scope.variant) {
      this.selectedOptions = this.scope.variant.options.slice();
      this.available = this.scope.variant.available;
      this.activateOptions();
    }
  }

  protected get variant() {
    return this.scope.variant;
  }

  /**
   * available is only true if the variant is available and the user has clicked on an option
   */
  protected set available(available: boolean) {
    this.scope.available = (available && this.optionChoosed);
  }

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.init(ShopifyProductComponent.observedAttributes);
  }

  public chooseOption(optionValue: string | number, position1: number, optionName: string, _: any, event: MouseEvent, scope: any, el: HTMLElement) {
    if (!this.scope.product) {
      throw new Error('Product not set!');
    }

    optionValue = optionValue.toString();

    this.selectedOptions[(position1 - 1)] = optionValue.toString();

    const variant = ShopifyProductService.getVariantOfOptions(this.scope.product, this.selectedOptions);

    if (variant) {
      // Option choosed so enable add to cart button
      this.optionChoosed = true;

      this.variant = variant as ShopifyProductVariant;
    }

    event.stopPropagation();
  }

  public addToCart() {
    if (!this.variant) {
      console.warn('Variant not selected');
      return;
    }
    ShopifyCartService.add(this.variant.id, this.scope.quantity)
    .then((response: any) => {
      return response;
    })
    .catch((error: Error) => {
      console.error('addToCart error', error);
    });
  }

  public toggleDetailMenu() {
    this.scope.showDetailMenu = !this.scope.showDetailMenu;
  }

  public increase() {
    this.scope.quantity++;
  }

  public decrease() {
    this.scope.quantity--;
    if (this.scope.quantity <= 0) {
      this.scope.quantity = 1;
    }
  }

  /**
   * Workaround because `rv-class-active="isOptionActive | call size"` is not updating if selectedOptions changes
   * @param optionValue
   * @param optionName
   */
  protected activateOption(optionValue: string, optionName: string) {
    optionValue = optionValue.toString().replace('#', '');
    this.$el.find(`.option-${optionName.toLocaleLowerCase()}`).removeClass('active');
    this.$el.find(`.option-${optionName.toLocaleLowerCase()}-${optionValue}`).addClass('active');
  }

  /**
   * Activate option by selected options (scope.selectedOptions)
   * This method sets the active class to the options elements
   */
  protected activateOptions() {
    for (const position0 in this.selectedOptions) {
      if (this.selectedOptions[position0]) {
        const optionValue = this.selectedOptions[position0];
        if (this.scope.product) {
          const optionName = this.scope.product.options[position0].name;
          // Only activate size if it was clicked by the user
          if (optionName === 'size') {
            if (this.optionChoosed) {
              this.activateOption(optionValue, optionName);
            }
          } else {
            this.activateOption(optionValue, optionName);
          }
        }
      }
    }
  }

  protected async beforeBind() {
    if (this.scope.handle === null) {
      throw new Error('Product handle not set');
    }
    return ShopifyProductService.get(this.scope.handle)
    .then((product: ShopifyProduct) => {
      this.product = product;
    });
  }

  protected async afterBind() {
    this.activateOptions();
  }

  protected requiredAttributes() {
    return ['handle'];
  }

  protected template() {
     // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      return null;
    } else {
      return template;
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
    const generalImages: string[] = [];
    if (this.scope.product) {
      // add images without optionName in filename
      this.scope.product.images.forEach((image: string, index) => {
        if (!image.toLowerCase().includes(`${optionName}-`)) {
          generalImages.push(image);
        }
      });
      // remove variant images from copied array
      this.scope.product.variants.forEach((variant: ShopifyProductVariant) => {
        let index = -1;
        if (variant.featured_image !== null && variant.featured_image.src) {
          index = this.indexOfUrl(generalImages, variant.featured_image.src);
        }
        if (index >= 0) {
          generalImages.splice(index, 1);
        }
      });
    }
    return generalImages;
  }

  /**
   * Get options images (without featured image) filtered by filename.
   * Shopify only supports one image per variant, with this function more images for each variant are possible.
   * The image filename must include {optionName}-{optionValue} for that.
   */
  private getOptionImages(option: ShopifyProductVariantOption, optionValue: string) {
    optionValue = optionValue.toLowerCase().replace('#', '_');
    const optionName = option.name.toLowerCase();
    const optionImages: string[] = [];
    if (this.scope.product) {
      this.scope.product.images.forEach((image: string, index) => {
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
   * Get image rows,
   * Always two pictures side by side.
   * If the last picture would stood alone then 3 pictures next to each other.
   * @param images
   */
  private getImageRows(images: string[]) {
    const leftoverPictureCount = (images.length % IMAGES_PER_ROW);
    const rowLength = Math.floor(images.length / IMAGES_PER_ROW);
    const rows: Array<ImageRow> = new Array(rowLength);
    for (let index = 0; index < rows.length; index++) {
      rows[index] = {
        class: 'col-12 col-md px-0',
        images: [],
        sizes: '(min-width: 768px) 50vw, 100vw',
      };
    }

    let imageIndex = 0;
    for (let rowIndex = 0; rowIndex < rowLength; rowIndex++) {
      const currentRow = rows[rowIndex];
      // Append IMAGES_PER_ROW images to the row
      for (let rowImageIndex = 0; rowImageIndex < IMAGES_PER_ROW; rowImageIndex++, imageIndex++) {
        const rowImage = images[imageIndex];
        currentRow.images.push(rowImage);
      }
      // Append the leftover pictures to the last row
      if (rowIndex === rowLength - 1) {
        currentRow.sizes = '(min-width: 768px) 33vw, 100vw';
        for (let rowImageIndex = 0; rowImageIndex < leftoverPictureCount; rowImageIndex++, imageIndex++) {
          const rowImage = images[imageIndex];
          currentRow.images.push(rowImage);
        }
      }
    }
    return rows;
  }

  /**
   * prepair variant, e.g. fix missing image etc
   * @param variant
   */
  private prepairVariant(variant: IPrepairedProductVariant) {
    if (variant === null) {
      console.error('Variant is null!');
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

      variant.imageRows = this.getImageRows(variant.images);
    }

    return variant;
  }
}
