import Debug from 'debug';
import $ from 'jquery';
import {
  RibaComponent,
  shopifyExtension,
  IShopifyCartObject,
  Pjax,
} from '../../tinybind';
import { Utils } from '../../services/Utils';
import template from './shopify-cart-button.component.html';

const ShopifyCartService = shopifyExtension.services.ShopifyCartService;

interface IScope {
  cartItemCount: number;
  toggle: ShopifyCartButtonComponent['toggle'];
  pending: boolean;
}

export class ShopifyCartButtonComponent extends RibaComponent {

  public static tagName: string = 'rv-shopify-cart-button';

  public static cartUrl: string = '/cart';

  public static pjax = Pjax.getInstance('global');

  static get observedAttributes() {
    return [];
  }

  protected $el: JQuery<HTMLElement>;

  protected debug = Debug('component:' + ShopifyCartButtonComponent.tagName);

  protected scope: IScope = {
    cartItemCount: 0,
    toggle: this.toggle,
    pending: false,
  };

  protected set cart(cart: IShopifyCartObject) {
    if (this.scope.cartItemCount !== cart.item_count) {
      this.scope.cartItemCount = cart.item_count;
    }
  }

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.debug('constructor', this);
    this.init(ShopifyCartButtonComponent.observedAttributes);
  }

  public toggle(event: Event) {
    this.debug('toggle');
    event.preventDefault();
    event.stopPropagation();

    if (Utils.onRoute(ShopifyCartButtonComponent.cartUrl)) {
      this.debug('already on this site');
      window.history.back();
    } else {
      if (ShopifyCartButtonComponent.cartUrl) {
        ShopifyCartButtonComponent.pjax.goTo(ShopifyCartButtonComponent.cartUrl, false);
      }
    }

  }

  protected async beforeBind() {
    this.debug('beforeBind');

    ShopifyCartService.dispatcher.on('ShopifyCartButton:request:start', () => {
      this.debug('ShopifyCartButton:request:start');
      this.scope.pending = true;
    });

    ShopifyCartService.dispatcher.on('ShopifyCartButton:request:complete', (cart: IShopifyCartObject) => {
      this.debug('ShopifyCartButton:request:complete', cart);
      if (cart) {
        this.cart = cart;
      }
      this.scope.pending = false;
    });

  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);

    return ShopifyCartService.get()
    .catch((error) => {
      this.debug(error);
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
