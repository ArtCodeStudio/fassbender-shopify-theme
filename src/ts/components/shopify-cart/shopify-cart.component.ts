import Debug from 'debug';
import $ from 'jquery';
import {
  RibaComponent,
  shopifyExtension,
  IShopifyCartLineItem,
  IShopifyCartObject,
  IShopifyCustomerAddress,
  IShopifyShippingRates,
  IShopifyShippingRatesNormalized,
} from '../../tinybind';
import template from './shopify-cart.component.html';
import { Utils } from '../../services/Utils';
import { DropdownService } from '../bs4/dropdown/dropdown.service';

const ShopifyCartService = shopifyExtension.services.ShopifyCartService;

interface IScope {
  cart: IShopifyCartObject | null;
  shippingAddress: IShopifyCustomerAddress | null;
  estimateShippingRate: boolean;
  shippingRates: IShopifyShippingRatesNormalized;
  toggle: ShopifyCartComponent['toggle'];
  remove: ShopifyCartComponent['remove'];
  increase: ShopifyCartComponent['increase'];
  decrease: ShopifyCartComponent['decrease'];
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
    remove: this.remove,
    increase: this.increase,
    decrease: this.decrease,
  };

  protected set cart(cart: any) {
    // TODO check if cart values are changed
    this.scope.cart = cart;
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

  public toggle(event: Event) {
    this.debug('toggle');
    event.preventDefault();
    event.stopPropagation();
    return this.dropdownService.toggle();
  }

  public remove(lineItem: IShopifyCartLineItem, lineIndex: number) {
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
      // this.cart = cart;
    });
  }

  protected async beforeBind() {
    this.debug('beforeBind');
    return ShopifyCartService.get()
    // .then((cart) => {
    //   this.cart = ShopifyCartService.cart || cart;
    //   this.debug('beforeBind', this.scope.cart );
    //   return this.scope.cart;
    // })
    .catch((error) => {
      console.error(error);
    });
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
    ShopifyCartService.dispatcher.on('ShopifyCart:request:start', () => {
      this.debug('ShopifyCart:request:start');
    });
    // ShopifyCartService.dispatcher.on('ShopifyCart:request:changed', (cart: IShopifyCartObject) => {
    //   this.debug('ShopifyCart:request:changed', cart);
    //   this.cart = cart;
    // });
    ShopifyCartService.dispatcher.on('ShopifyCart:request:complete', (cart: IShopifyCartObject) => {
      this.debug('ShopifyCart:request:complete', cart);
      if (cart) {
        this.cart = cart;
      }
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
