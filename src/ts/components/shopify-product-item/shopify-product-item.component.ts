import Debug from 'debug';
import $ from 'jquery';
import {
  RibaComponent,
  IShopifyProductVariant,
  IShopifyProduct,
  IShopifyProductVariantOption,
  shopifyExtension,
} from '../../tinybind';
import template from './shopify-product-item.component.html';

export interface IScope {
  handle: string | null;
  product: IShopifyProduct  | null;
  variant: IShopifyProductVariant | null;
  quantity: number;
  showDetailMenu: boolean;
  detailMenuPadding: string;
  // showAddToCartButton: boolean;
  chooseOption: ShopifyProductItemComponent['chooseOption'];
  addToCart: ShopifyProductItemComponent['addToCart'];
  toggleDetailMenu: ShopifyProductItemComponent['toggleDetailMenu'];
  $parent?: any;
  self: ShopifyProductItemComponent; // WORKAROUND
  colorOption: IShopifyProductVariantOption | null;
  sizeOption: IShopifyProductVariantOption | null;
  available: boolean;
}

const ShopifyCartService = shopifyExtension.services.ShopifyCartService;
const ShopifyProductService = shopifyExtension.services.ShopifyProductService;

/**
 * TODO minify this, create a general product service instead of extend from ShopifyProductItemComponent
 * or create a product list for all products
 * or just get the attributes we need like the options
 * or render the most with liquid
 */
export class ShopifyProductItemComponent extends RibaComponent /*ShopifyProductItemComponent*/ {

  public static tagName: string = 'rv-shopify-product-item';

  protected autobind: boolean = true;

  /**
   * handle is the product handle to get the product json object
   * extras are product data wich is only avaiable over liquid and not over the product json object
   */
  static get observedAttributes() {
    return ['handle', 'extras'];
  }

  protected $el: JQuery<HTMLElement>;

  protected debug = Debug('component:' + ShopifyProductItemComponent.tagName);

  protected scope: IScope = {
    handle: null,
    product: null,
    variant: null,
    quantity: 1,
    showDetailMenu: false,
    detailMenuPadding: '60px',
    // showAddToCartButton: false,
    chooseOption: this.chooseOption,
    addToCart: this.addToCart,
    toggleDetailMenu: this.toggleDetailMenu,
    self: this, // WORKAROUND
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
   * Number of detail menü padding without px
   */
  private _menuPadding: number = 60;

  /**
   * Is true if the user has choosed an option
   */
  private optionChoosed: boolean = false;

  protected set menuPadding(padding: number) {
    this._menuPadding = padding;
    this.scope.detailMenuPadding = this._menuPadding + 'px';
  }

  /**
   * available is only true if the variant is available and the user has clicked on an option
   */
  protected set available(available: boolean) {
    this.scope.available = (available && this.optionChoosed);
  }

  protected set showMenu(show: boolean) {
    if (show) {
      this.menuPadding = 215;
    } else {
      this.menuPadding = 60;
    }
    this.scope.showDetailMenu = show;
  }

  protected get showMenu() {
    return this.scope.showDetailMenu;
  }

  protected set product(product: IShopifyProduct | null) {
    this.debug('set product', product);
    if (product) {
      this.scope.product = ShopifyProductService.prepair(product);

      this.scope.colorOption = ShopifyProductService.getOption(this.scope.product, 'color');
      this.scope.sizeOption = ShopifyProductService.getOption(this.scope.product, 'size');

      // set the first variant to the selected one
      this.variant = this.scope.product.variants[0];
    }
  }

  protected get product(): IShopifyProduct | null {
    return this.scope.product;
  }

  protected set variant(variant: IShopifyProductVariant | null) {
    if (variant === null) {
      this.debug('Error: Variant ist null');
      return;
    }
    this.debug('set variant', variant);
    this.scope.variant = variant;
    if (this.scope.variant) {
      this.selectedOptions = this.scope.variant.options.slice();
      this.debug('set selectedOptions', this.selectedOptions);
      this.available = this.scope.variant.available;
      this.activateOptions();
    }
  }

  protected get variant() {
    return this.scope.variant;
  }

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.debug('constructor', this);
    this.init(ShopifyProductItemComponent.observedAttributes);
  }

  public chooseOption(self: ShopifyProductItemComponent, optionValue: string | number, position1: number, optionName: string, event: MouseEvent, scope: any, el: HTMLElement) {
    optionValue = optionValue.toString();

    if (!this.scope.product) {
      throw new Error('Product not set!');
    }

    self.debug('chooseOption', optionValue, position1, self.selectedOptions, self.variant);

    self.selectedOptions[(position1 - 1)] = optionValue.toString();
    const variant = ShopifyProductService.getVariantOfOptions(this.scope.product, self.selectedOptions);
    if (variant) {
      // Option choosed so enable add to cart button
      self.optionChoosed = true;

      self.variant = variant as IShopifyProductVariant;
    }

    event.stopPropagation();
  }

  public addToCart() {
    if (!this.variant) {
      this.debug('Variant not selected');
      return;
    }
    this.debug('addToCart', this.variant.id, this.scope.quantity);
    ShopifyCartService.add(this.variant.id, this.scope.quantity)
    .then((response) => {
      this.debug('addToCart response', response);
    })
    .catch((error) => {
      this.debug('addToCart error', error);
    });
  }

  public toggleDetailMenu() {
    this.debug('toggleDetailMenu');
    this.showMenu = !this.showMenu;
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

  /**
   * Activate option by selected options (scope.selectedOptions)
   * This method sets the active class to the options elements
   */
  protected activateOptions() {
    for (const position0 in this.selectedOptions) {
      if (this.selectedOptions[position0]) {
        const optionValue = this.selectedOptions[position0];
        if (this.scope.product) {
          this.debug('activateOptions', this.scope.product.options[position0]);
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
    this.debug('beforeBind');
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
    this.debug('afterBind', this.scope);
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
