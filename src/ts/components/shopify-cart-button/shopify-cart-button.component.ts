import {
  Component,
  IBinder,
} from '@ribajs/core';
import { JQuery as $ } from '@ribajs/jquery';
import {
  Pjax,
} from '@ribajs/router';
import {
  ShopifyCartService,
  IShopifyCartObject,
} from '@ribajs/shopify';
import { Utils } from '../../services/Utils';
import template from './shopify-cart-button.component.html';

interface IScope {
  cartItemCount: number;
  toggle: ShopifyCartButtonComponent['toggle'];
  pending: boolean;
  startAddAnimation: boolean;
}

export class ShopifyCartButtonComponent extends Component {

  public static tagName: string = 'rv-shopify-cart-button';

  public static cartUrl: string = '/cart';

  static get observedAttributes() {
    return [];
  }

  protected $el: JQuery<HTMLElement>;

  protected scope: IScope = {
    cartItemCount: 0,
    toggle: this.toggle,
    pending: false,
    startAddAnimation: false,
  };

  protected set cart(cart: IShopifyCartObject) {
    this.scope.cartItemCount = cart.item_count;
    this.scope.startAddAnimation = true;
    setTimeout(() => {
      this.scope.startAddAnimation = false;
    }, 3000);
  }

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.init(ShopifyCartButtonComponent.observedAttributes);
  }

  public toggle(context: IBinder<any>, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (Utils.onRoute(ShopifyCartButtonComponent.cartUrl)) {
      console.warn('already on this site');
      window.history.back();
    } else {
      if (ShopifyCartButtonComponent.cartUrl) {
        const pjax = Pjax.getInstance('main');
        pjax.goTo(ShopifyCartButtonComponent.cartUrl, false);
      }
    }

  }

  protected async beforeBind() {
    ShopifyCartService.shopifyCartEventDispatcher.on('ShopifyCart:request:start', () => {
      this.scope.pending = true;
    });

    ShopifyCartService.shopifyCartEventDispatcher.on('ShopifyCart:request:complete', (cart: IShopifyCartObject) => {
      if (cart) {
        this.cart = cart;
      }
      this.scope.pending = false;
    });

  }

  protected async afterBind() {
    return ShopifyCartService.get()
    .catch((error: Error) => {
      console.warn(error);
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
