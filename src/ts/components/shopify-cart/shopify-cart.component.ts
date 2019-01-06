import {
  RibaComponent,
  JQuery as $,
  Debug,
  Binder,
} from '@ribajs/core';
import {
  ShopifyCartService,
  IShopifyCartLineItem,
  IShopifyCartObject,
  IShopifyCustomerAddress,
  IShopifyShippingRates,
  IShopifyShippingRatesNormalized,
} from '@ribajs/shopify';
import template from './shopify-cart.component.html';
import { DropdownService } from '../bs4/dropdown/dropdown.service';

interface IScope {
  cart: IShopifyCartObject | null;
  shippingAddress: IShopifyCustomerAddress | null;
  estimateShippingRate: boolean;
  shippingRates: IShopifyShippingRatesNormalized;
  toggle: ShopifyCartComponent['toggle'];
  remove: ShopifyCartComponent['removeCart'];
  increase: ShopifyCartComponent['increase'];
  decrease: ShopifyCartComponent['decrease'];
  closeDropdowns: ShopifyCartComponent['closeDropdowns'];
  pending: boolean;
  startAddAnimation: boolean;
}

export class ShopifyCartComponent extends RibaComponent {

  public static tagName: string = 'rv-shopify-cart';

  static get observedAttributes() {
    return ['shipping-address', 'estimate-shipping-rate'];
  }

  protected $el: JQuery<HTMLElement>;

  protected debug = Debug('component:' + ShopifyCartComponent.tagName);

  protected dropdownService: DropdownService;

  protected scope: IScope = {
    cart: ShopifyCartService.cart,
    shippingAddress: null,
    estimateShippingRate: false,
    shippingRates: [],
    toggle: this.toggle,
    remove: this.removeCart,
    increase: this.increase,
    decrease: this.decrease,
    closeDropdowns: this.closeDropdowns,
    pending: false,
    startAddAnimation: false,
  };

  protected set cart(cart: any) {
    // TODO check if cart values are changed
    this.scope.cart = cart;

    this.scope.startAddAnimation = true;
    setTimeout(() => {
      this.scope.startAddAnimation = false;
    }, 3000);

    if (this.scope.shippingAddress && this.scope.estimateShippingRate) {
      ShopifyCartService.getShippingRates(this.scope.shippingAddress, true, {
        triggerOnChange: false,
        triggerOnComplete: false,
        triggerOnStart: false,
      })
      .then((shippingRates: IShopifyShippingRates | IShopifyShippingRatesNormalized) => {
        this.debug('Get shipping rate', shippingRates);
        this.scope.shippingRates = shippingRates as IShopifyShippingRatesNormalized;
      });
    }
  }

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.dropdownService = new DropdownService(this.$el.find('.dropdown-toggle')[0] as HTMLButtonElement);
    this.debug('constructor', this);
    this.init(ShopifyCartComponent.observedAttributes);
  }

  public toggle(context: Binder<any>, event: Event) {
    this.debug('toggle');
    event.preventDefault();
    event.stopPropagation();
    return this.dropdownService.toggle();
  }

  public removeCart(lineItem: IShopifyCartLineItem, lineIndex: number) {
    this.debug('remove', lineItem, lineIndex);
    ShopifyCartService.change(lineItem.variant_id, 0)
    .then((cart: IShopifyCartObject) => {
      this.debug('removed', cart);
      this.cart = cart;
    });
  }

  public increase(lineItem: IShopifyCartLineItem, lineIndex: number) {
    this.debug('increase', lineItem, lineIndex);
    lineItem.quantity++;
    ShopifyCartService.change(lineItem.variant_id, lineItem.quantity)
    .then((cart: IShopifyCartObject) => {
      this.debug('increased', cart);
      // this.cart = cart;
    });
  }

  public decrease(lineItem: IShopifyCartLineItem, lineIndex: number) {
    this.debug('decrease', lineItem, lineIndex);
    lineItem.quantity--;
    if (lineItem.quantity < 0) {
      lineItem.quantity = 0;
    }
    ShopifyCartService.change(lineItem.variant_id, lineItem.quantity)
    .then((cart: IShopifyCartObject) => {
      this.debug('decreased', cart);
    });
  }

  public closeDropdowns() {
    this.debug('closeDropdowns');
    DropdownService.closeAll();
  }

  protected async beforeBind() {
    this.debug('beforeBind');

    ShopifyCartService.shopifyCartEventDispatcher.on('ShopifyCart:request:start', () => {
      this.debug('ShopifyCart:request:start');
      this.scope.pending = true;
    });

    ShopifyCartService.shopifyCartEventDispatcher.on('ShopifyCart:request:complete', (cart: IShopifyCartObject) => {
      this.debug('ShopifyCart:request:complete', cart);
      if (cart) {
        this.cart = cart;
      }
      this.scope.pending = false;
    });
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);

    return ShopifyCartService.get()
    .catch((error: Error) => {
      console.error(error);
    });
  }

  protected requiredAttributes() {
    return [];
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
