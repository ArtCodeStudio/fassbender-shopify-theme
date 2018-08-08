import Debug from 'debug';
import $ from 'jquery';
import { RibaComponent, shopifyExtension } from '../../tinybind';
import template from './shopify-cart.component.html';
import { Utils } from '../../services/Utils';
import { DropdownService } from '../bs4/dropdown/dropdown.service';

const ShopifyCartService = shopifyExtension.services.ShopifyCartService;

interface IScope {
  cart: any;
  toggle: ShopifyCartComponent['toggle'];
}

export class ShopifyCartComponent extends RibaComponent {

  public static tagName: string = 'rv-shopify-cart';

  static get observedAttributes() {
    return [];
  }

  protected $el: JQuery<HTMLElement>;

  protected debug = Debug('component:' + ShopifyCartComponent.tagName);

  protected dropdownService: DropdownService;

  protected scope: IScope = {
    cart: ShopifyCartService.cart,
    toggle: this.toggle,
  };

  protected set cart(cart: any) {
    this.scope.cart = cart;
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

  protected async beforeBind() {
    this.debug('beforeBind');
    return ShopifyCartService.get()
    .then((cart) => {
      this.cart = ShopifyCartService.cart || cart;
      this.debug('beforeBind', this.scope.cart );
      return this.scope.cart;
    })
    .catch((error) => {
      console.error(error);
    });
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
    ShopifyCartService.dispatcher.on('ShopifyCart:request:complete', (cart: any) => {
      this.debug('ShopifyCart:request:complete', cart);
      this.cart = cart;
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
