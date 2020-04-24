import { Component } from "@ribajs/core";
import {
  ShopifyCartService,
  ShopifyCartLineItem,
  ShopifyCartObject,
  ShopifyCustomerAddress,
  ShopifyShippingRates,
  ShopifyShippingRatesNormalized,
} from "@ribajs/shopify";
import template from "./shopify-cart.component.html";
import { DropdownService } from "@ribajs/bs4/src/services/dropdown.service";

interface Scope {
  cart: ShopifyCartObject | null;
  shippingAddress: ShopifyCustomerAddress | null;
  estimateShippingRate: boolean;
  shippingRates: ShopifyShippingRatesNormalized;
  toggle: ShopifyCartComponent["toggle"];
  remove: ShopifyCartComponent["removeCart"];
  increase: ShopifyCartComponent["increase"];
  decrease: ShopifyCartComponent["decrease"];
  closeDropdowns: ShopifyCartComponent["closeDropdowns"];
  pending: boolean;
  startAddAnimation: boolean;
}

export class ShopifyCartComponent extends Component {
  public static tagName = "rv-shopify-cart";

  static get observedAttributes() {
    return ["shipping-address", "estimate-shipping-rate"];
  }

  protected requiredAttributes() {
    return [];
  }

  protected dropdownService: DropdownService;

  protected scope: Scope = {
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
      }).then(
        (
          shippingRates: ShopifyShippingRates | ShopifyShippingRatesNormalized
        ) => {
          this.scope.shippingRates = shippingRates as ShopifyShippingRatesNormalized;
        }
      );
    }
  }

  constructor(element?: HTMLElement) {
    super(element);
    const dropdownElement = this.el.querySelector(
      ".dropdown-toggle"
    ) as HTMLButtonElement;
    if (dropdownElement) {
      this.dropdownService = new DropdownService(dropdownElement);
    }
    this.init(ShopifyCartComponent.observedAttributes);
  }

  public toggle(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    return this.dropdownService.toggle();
  }

  public removeCart(lineItem: ShopifyCartLineItem) {
    ShopifyCartService.change(lineItem.variant_id, 0)
      .then((cart: ShopifyCartObject) => {
        this.cart = cart;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public increase(lineItem: ShopifyCartLineItem) {
    lineItem.quantity++;
    ShopifyCartService.change(lineItem.variant_id, lineItem.quantity)
      .then((cart: ShopifyCartObject) => {
        // this.cart = cart;
        return cart;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public decrease(lineItem: ShopifyCartLineItem) {
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
    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:start",
      () => {
        this.scope.pending = true;
      }
    );

    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:complete",
      (cart: ShopifyCartObject) => {
        if (cart) {
          this.cart = cart;
        }
        this.scope.pending = false;
      }
    );
  }

  protected async afterBind() {
    this.debug("afterBind", this.scope);
    return ShopifyCartService.get().catch((error: Error) => {
      console.error(error);
    });
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
