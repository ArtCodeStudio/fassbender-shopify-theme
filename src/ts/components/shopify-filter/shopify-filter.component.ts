import Debug from 'debug';
import { RibaComponent } from '../../tinybind';
import template from './shopify-filter.component.html';

interface IScope {
  linklist: any;
  show: any;
  namespace?: string;
  type: any;
}

/**
 * shopify-filter
 */
export class ShopifyFilterComponent extends RibaComponent {

  public static tagName: string = 'shopify-filter';

  protected debug = Debug('component:' + ShopifyFilterComponent.tagName);

  static get observedAttributes() {
    return ['namespace', 'linklist', 'template'];
  }

  protected scope: IScope = {
    linklist: window.model.system.linklists.filter,
    show: this.show,
    type: this.type,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.debug('constructor', this);
    this.init(ShopifyFilterComponent.observedAttributes);
  }

  public show(filterHandle: string, namespace: string, shopifyTemplate: any): boolean {
    this.debug('show', filterHandle, namespace, shopifyTemplate);
    switch (filterHandle) {
      case 'stories':
        return namespace === 'blog';
      case 'account':
        return namespace === 'cart' || shopifyTemplate.directory === 'customers';
      case 'legal-area':
        return shopifyTemplate.template === 'page.legals';
      default:
        break;
    }
    return true;
  }

  public type(filterHandle: string): string {
    this.debug('type', filterHandle);
    switch (filterHandle) {
      case 'stories':
        return 'filter';
      case 'legal-area':
        case 'scrollspy':
      default:
        return 'routes';
    }
  }

  protected requiredAttributes() {
    return ['namespace', 'template'];
  }

  /**
   * Only set the component template if there no childs already
   */
  protected template() {
    if (this.el.hasChildNodes()) {
      return null;
    } else {
      return template;
    }
  }
}
