import { Component } from "@ribajs/core";
import {
  ShopifyCartService,
  ShopifyCartLineItem,
  ShopifyCartObject,
  ShopifyCustomerAddress,
  ShopifyShippingRates,
  ShopifyShippingRatesNormalized,
} from "@ribajs/shopify";
import template from "./shopify-cart.component.html?raw";
import { DropdownService } from "@ribajs/bs4/src/services/dropdown.service";
import { hasChildNodesTrim } from "@ribajs/utils";

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
  public static tagName = "fsbdr-shopify-cart";

  static get observedAttributes() {
    return ["shipping-address", "estimate-shipping-rate"];
  }

  protected requiredAttributes() {
    return [];
  }

  protected dropdownService?: DropdownService;

  public scope: Scope = {
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
          shippingRates: ShopifyShippingRates | ShopifyShippingRatesNormalized,
        ) => {
          this.scope.shippingRates =
            shippingRates as ShopifyShippingRatesNormalized;
        },
      );
    }
  }

  constructor() {
    super();
    const dropdownElement = this.querySelector(
      ".dropdown-toggle",
    ) as HTMLButtonElement;
    if (dropdownElement) {
      this.dropdownService = new DropdownService(dropdownElement);
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyCartComponent.observedAttributes);
  }

  public toggle(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.dropdownService) {
      return this.dropdownService.toggle();
    }
  }

  public removeCart(lineItem: ShopifyCartLineItem) {
    ShopifyCartService.change(lineItem.variant_id, 0)
      .then(async (cart: ShopifyCartObject | null) => {
        this.cart = (await ShopifyCartService.refresh()) || null;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public increase(lineItem: ShopifyCartLineItem) {
    lineItem.quantity++;
    ShopifyCartService.change(lineItem.variant_id, lineItem.quantity)
      .then((cart: ShopifyCartObject | null) => {
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
      .then((cart: ShopifyCartObject | null) => {
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
      },
    );

    ShopifyCartService.shopifyCartEventDispatcher.on(
      "ShopifyCart:request:complete",
      async (cart: ShopifyCartObject | null) => {
        if(cart?.items) {
          this.cart = cart;
        } else {
          this.cart = (await ShopifyCartService.refresh()) || null;
        }
        this.scope.pending = false;
      },
    );
  }

  protected async afterBind() {
    this.debug("afterBind", this.scope);
    this.scope.cart = (await ShopifyCartService.get()) || null;
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
