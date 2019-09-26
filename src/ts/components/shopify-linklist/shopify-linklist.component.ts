import Debug from 'debug';
import { Component } from '@ribajs/core';
import template from './shopify-linklist.component.html';

/**
 * shopify-filter
 */
export class ShopifyLinklistComponent extends Component {

  public static tagName: string = 'shopify-linklist';

  protected debug = Debug('component:' + ShopifyLinklistComponent.tagName);

  static get observedAttributes() {
    return ['name', 'linklist', 'pills', 'vertical'];
  }

  protected scope: any = {};

  constructor(element?: HTMLElement) {
    super(element);
    this.init(ShopifyLinklistComponent.observedAttributes);
  }

  public attributeChangedCallback(name: string, oldValue: any, newValue: any, namespace: string | null) {
    // injects the changed attributes to scope
    super.attributeChangedCallback(name, oldValue, newValue, namespace);

    // set linklist by name
    if (name === 'name') {
      this.scope.linklist = window.model.system.linklists[newValue];
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
