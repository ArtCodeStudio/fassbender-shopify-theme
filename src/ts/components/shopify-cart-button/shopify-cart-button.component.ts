import { Component } from "@ribajs/core";
import { JQuery as $ } from "@ribajs/jquery";
import { Pjax } from "@ribajs/router";
import { ShopifyCartService, ShopifyCartObject } from "@ribajs/shopify";
import { onRoute, hasChildNodesTrim } from "@ribajs/utils";
import template from "./shopify-cart-button.component.html";

interface Scope {
  cartItemCount: number;
  toggle: ShopifyCartButtonComponent["toggle"];
  pending: boolean;
  startAddAnimation: boolean;
}

export class ShopifyCartButtonComponent extends Component {
  public static tagName = "rv-shopify-cart-button";

  public static cartUrl = "/cart";

  static get observedAttributes() {
    return [];
  }

  protected $el: JQuery<HTMLElement>;

  public scope: Scope = {
    cartItemCount: 0,
    toggle: this.toggle,
    pending: false,
    startAddAnimation: false,
  };

  protected set cart(cart: ShopifyCartObject) {
    this.scope.cartItemCount = cart.item_count;
    this.scope.startAddAnimation = true;
    setTimeout(() => {
      this.scope.startAddAnimation = false;
    }, 3000);
  }

  constructor() {
    super();
    this.$el = $(this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyCartButtonComponent.observedAttributes);
  }

  public toggle(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (onRoute(ShopifyCartButtonComponent.cartUrl)) {
      console.warn("already on this site");
      window.history.back();
    } else {
      if (ShopifyCartButtonComponent.cartUrl) {
        const pjax = Pjax.getInstance("main");
        pjax?.goTo(ShopifyCartButtonComponent.cartUrl, false);
      }
    }
  }

  protected async beforeBind() {
    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:start",
      () => {
        this.scope.pending = true;
      },
    );

    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:complete",
      (cart: ShopifyCartObject) => {
        if (cart) {
          this.cart = cart;
        }
        this.scope.pending = false;
      },
    );
  }

  protected async afterBind() {
    return ShopifyCartService.get().catch((error: Error) => {
      console.warn(error);
    });
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
