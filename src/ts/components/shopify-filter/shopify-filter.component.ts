import Debug from 'debug';
import { RibaComponent } from '../../tinybind';
import template from './shopify-filter.component.html';

interface IScope {
  linklist: any;
  show: any;
  namespace?: string;
}

/**
 * shopify-filter
 */
export class ShopifyFilterComponent extends RibaComponent {

  public static tagName: string = 'shopify-filter';

  protected debug = Debug('component:' + ShopifyFilterComponent.tagName);

  static get observedAttributes() {
    return ['namespace', 'linklist', 'template-directory'];
  }

  protected scope: IScope = {
    linklist: window.model.system.linklists.filter,
    show: this.show,
  };

  constructor(element?: HTMLElement) {
    super(element);

    this.init(ShopifyFilterComponent.observedAttributes);
  }

  public show(handle: string, namespace: string, templateDirectory: string): boolean {
    this.debug('show', namespace, handle, templateDirectory);
    switch (handle) {
      case 'stories':
        return namespace === 'blog';
      case 'account':
        return templateDirectory === 'customers';
      default:
        break;
    }
    return true;
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
