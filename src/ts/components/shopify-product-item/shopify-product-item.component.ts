import {
  Component,
  IBinder,
} from '@ribajs/core';
import {
  IShopifyProductVariant,
  IShopifyProduct,
  IShopifyProductVariantOption,
  ShopifyCartService,
  ShopifyProductService,
} from '@ribajs/shopify';
import template from './shopify-product-item.component.html';

export interface IScope {
  handle: string | null;
  product: IShopifyProduct  | null;
  variant: IShopifyProductVariant | null;
  quantity: number;
  showDetailMenu: boolean;
  // showAddToCartButton: boolean;
  chooseOption: ShopifyProductItemComponent['chooseOption'];
  addToCart: ShopifyProductItemComponent['addToCart'];
  toggleDetailMenu: ShopifyProductItemComponent['toggleDetailMenu'];
  decrease: ShopifyProductItemComponent['decrease'];
  increase: ShopifyProductItemComponent['increase'];
  $parent?: any;
  colorOption: IShopifyProductVariantOption | null;
  sizeOption: IShopifyProductVariantOption | null;
  available: boolean;
}

/**
 * TODO minify this, create a general product service instead of extend from ShopifyProductItemComponent
 * or create a product list for all products
 * or just get the attributes we need like the options
 * or render the most with liquid
 */
export class ShopifyProductItemComponent extends Component /*ShopifyProductItemComponent*/ {

  public static tagName: string = 'rv-shopify-product-item';

  protected autobind: boolean = true;

  /**
   * handle is the product handle to get the product json object
   * extras are product data wich is only avaiable over liquid and not over the product json object
   */
  static get observedAttributes() {
    return ['handle', 'extras'];
  }

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
    colorOption: null,
    sizeOption: null,
    /**
     * If the variant is available, used to disable the add to cart button
     */
    available: false,
  };

  /**
   * Array with all selected product options
   */
  private selectedOptions: string[] = [];

  /**
   * Is true if the user has choosed an option
   */
  private optionChoosed: boolean = false;

  /**
   * available is only true if the variant is available and the user has clicked on an option
   */
  protected set available(available: boolean) {
    this.scope.available = (available && this.optionChoosed);
  }

  protected set showMenu(show: boolean) {
    this.scope.showDetailMenu = show;
  }

  protected get showMenu() {
    return this.scope.showDetailMenu;
  }

  protected set product(product: IShopifyProduct | null) {
    if (product) {
      this.scope.product = ShopifyProductService.prepair(product);

      this.scope.colorOption = ShopifyProductService.getOption(this.scope.product, 'color');
      this.scope.sizeOption = ShopifyProductService.getOption(this.scope.product, 'size');

      // set the first variant to the selected one
      this.variant = this.scope.product ? this.scope.product.variants[0] : null;
    }
  }

  protected get product(): IShopifyProduct | null {
    return this.scope.product;
  }

  protected set variant(variant: IShopifyProductVariant | null) {
    if (variant === null) {
      console.warn('Error: Variant ist null');
      return;
    }
    this.scope.variant = variant;
    if (this.scope.variant) {
      this.selectedOptions = this.scope.variant.options.slice();
      this.available = this.scope.variant.available;
      this.activateOptions();
    }
  }

  protected get variant() {
    return this.scope.variant;
  }

  constructor(element?: HTMLElement) {
    super(element);
    this.init(ShopifyProductItemComponent.observedAttributes);
    this.el.addEventListener('mouseleave', (event: Event) => {
      this.showMenu = false;
    }, false);
  }

  public chooseOption(optionValue: string | number, position1: number, optionName: string, context: IBinder<any>, event: MouseEvent, scope: any, el: HTMLElement) {
    optionValue = optionValue.toString();

    if (!this.scope.product) {
      throw new Error('Product not set!');
    }

    // console.warn('chooseOption', '\noptionValue', JSON.stringify(optionValue), '\nposition1', position1, '\noptionName', optionName, '\ncontext', context, '\nevent', event, '\nscope', scope, '\nel', el );

    this.selectedOptions[(position1 - 1)] = optionValue.toString();
    const variant = ShopifyProductService.getVariantOfOptions(this.scope.product, this.selectedOptions);
    if (variant) {
      // Option choosed so enable add to cart button
      this.optionChoosed = true;

      this.variant = variant as IShopifyProductVariant;
    }

    event.stopPropagation();
  }

  public addToCart() {
    if (!this.variant) {
      console.warn('Variant not selected');
      return;
    }
    ShopifyCartService.add(this.variant.id, this.scope.quantity)
    .then((response: any /** TODO not any */) => {
      return response;
    })
    .catch((error: Error) => {
      console.error('addToCart error', error);
    });
  }

  public toggleDetailMenu() {
    this.showMenu = !this.showMenu;
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

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  /**
   * Workaround because `rv-class-active="isOptionActive | call size"` is not updating if selectedOptions changes
   * @param optionValue
   * @param optionName
   */
  protected activateOption(optionValue: string, optionName: string) {
    optionValue = optionValue.toString().replace('#', '');
    const allOptions = this.el.querySelectorAll(`.option-${optionName.toLocaleLowerCase()}`);
    allOptions.forEach((el) => {
      el.classList.remove('active');
    });
    const activeOptions = this.el.querySelectorAll(`.option-${optionName.toLocaleLowerCase()}-${optionValue}`);
    activeOptions.forEach((el) => {
      el.classList.add('active');
    });
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
    .then((product: IShopifyProduct) => {
      this.product = product;
      return product;
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
}
