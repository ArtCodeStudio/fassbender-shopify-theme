import {
  Component,
  Binder,
} from '@ribajs/core';
import { JQuery as $ } from '@ribajs/jquery';
import {
  ShopifyCartService,
  ShopifyCartLineItem,
  ShopifyCartObject,
  ShopifyCustomerAddress,
  ShopifyShippingRates,
  ShopifyShippingRatesNormalized,
} from '@ribajs/shopify';
import template from './shopify-cart.component.html';
import { DropdownService } from '../bs4/dropdown/dropdown.service';

interface IScope {
  cart: ShopifyCartObject | null;
  shippingAddress: ShopifyCustomerAddress | null;
  estimateShippingRate: boolean;
  shippingRates: ShopifyShippingRatesNormalized;
  toggle: ShopifyCartComponent['toggle'];
  remove: ShopifyCartComponent['removeCart'];
  increase: ShopifyCartComponent['increase'];
  decrease: ShopifyCartComponent['decrease'];
  closeDropdowns: ShopifyCartComponent['closeDropdowns'];
  pending: boolean;
  startAddAnimation: boolean;
}

export class ShopifyCartComponent extends Component {

  public static tagName: string = 'rv-shopify-cart';

  static get observedAttributes() {
    return ['shipping-address', 'estimate-shipping-rate'];
  }

  protected $el: JQuery<HTMLElement>;

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
      .then((shippingRates: ShopifyShippingRates | ShopifyShippingRatesNormalized) => {
        this.scope.shippingRates = shippingRates as ShopifyShippingRatesNormalized;
      });
    }
  }

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.dropdownService = new DropdownService(this.$el.find('.dropdown-toggle')[0] as HTMLButtonElement);
    this.init(ShopifyCartComponent.observedAttributes);
  }

  public toggle(context: Binder<any>, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    return this.dropdownService.toggle();
  }

  public removeCart(lineItem: ShopifyCartLineItem, lineIndex: number) {
    ShopifyCartService.change(lineItem.variant_id, 0)
    .then((cart: ShopifyCartObject) => {
      this.cart = cart;
    });
  }

  public increase(lineItem: ShopifyCartLineItem, lineIndex: number) {
    lineItem.quantity++;
    ShopifyCartService.change(lineItem.variant_id, lineItem.quantity)
    .then((cart: ShopifyCartObject) => {
      // this.cart = cart;
      return cart;
    });
  }

  public decrease(lineItem: ShopifyCartLineItem, lineIndex: number) {
    lineItem.quantity--;
    if (lineItem.quantity < 0) {
      lineItem.quantity = 0;
    }
    ShopifyCartService.change(lineItem.variant_id, lineItem.quantity)
    .then((cart: ShopifyCartObject) => {
      return cart;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  public closeDropdowns() {
    DropdownService.closeAll();
  }

  protected async beforeBind() {
    ShopifyCartService.shopifyCartEventDispatcher.on('ShopifyCart:request:start', () => {
      this.scope.pending = true;
    });

    ShopifyCartService.shopifyCartEventDispatcher.on('ShopifyCart:request:complete', (cart: ShopifyCartObject) => {
      if (cart) {
        this.cart = cart;
      }
      this.scope.pending = false;
    });
  }

  protected async afterBind() {
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
