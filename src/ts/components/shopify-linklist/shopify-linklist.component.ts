import { Component, Debug } from '@ribajs/core';
import template from './shopify-linklist.component.html';

export interface LinklistLink {
  active: boolean;
  child_active: boolean;
  handle: string;
  level: number;
  levels: number;
  links: LinklistLink[];
  title: string;
  type: string;
  url: string;

  // custom
  collapseable?: boolean;
  collapsed?: boolean;
}

export interface Linklist {
  handle: string;
  id: string | null;
  levels: number;
  links: LinklistLink[];
  title: string;
}

export interface Scope {
  linklist?: Linklist;
  toggle: ShopifyLinklistComponent['toggle'];
}

/**
 * shopify-filter
 */
export class ShopifyLinklistComponent extends Component {

  public static tagName: string = 'shopify-linklist';

  protected debug = Debug('component:' + ShopifyLinklistComponent.tagName);

  static get observedAttributes() {
    return ['name', 'linklist', 'pills', 'vertical'];
  }

  protected scope: Scope = {
    toggle: this.toggle,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.init(ShopifyLinklistComponent.observedAttributes);
  }

  public toggle(link: LinklistLink) {
    this.debug('toggle', link);
    link.collapsed = !link.collapsed;
  }

  public attributeChangedCallback(name: string, oldValue: any, newValue: any, namespace: string | null) {
    // injects the changed attributes to scope
    super.attributeChangedCallback(name, oldValue, newValue, namespace);

    // set linklist by name
    if (name === 'name') {
      this.scope.linklist = window.model.system.linklists[newValue];
    }
  }

  protected async beforeBind(): Promise<any> {
    super.beforeBind();
    this.transformLinklist();
  }

  protected transformLinklist() {
    this.debug('current linklist', this.scope.linklist);
    if (this.scope.linklist) {
      for (const link of this.scope.linklist.links) {
        if (link.url === '#collapse') {
          link.collapseable = true;
          link.collapsed = true;
        } else {
          link.collapseable = false;
          link.collapsed = true;
        }
      }
    }
  }

  protected requiredAttributes() {
    return ['linklist'];
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
