import Debug from 'debug';
import { RibaComponent } from '../../tinybind';
import template from './shopify-filter.component.html';

/**
 * rv-linklist
 */
export class ShopifyFilterComponent extends RibaComponent {

  public static tagName: string = 'shopify-filter';

  protected debug = Debug('component:' + ShopifyFilterComponent.tagName);

  static get observedAttributes() {
    return [];
  }

  protected scope = {
    linklist: window.model.system.linklists.filter,
  };

  constructor(element?: HTMLElement) {
    super(element);

    this.init(ShopifyFilterComponent.observedAttributes);
  }

  protected template() {
    return template;
  }
}
