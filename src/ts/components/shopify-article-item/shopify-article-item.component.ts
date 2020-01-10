import { Component } from '@ribajs/core';
import template from './shopify-article-item.component.html';

export class ShopifyArticleItemComponent extends Component {

  public static tagName = 'rv-shopify-article-item';

  static get observedAttributes() {
    return [];
  }

  protected scope: any = {
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.init(ShopifyArticleItemComponent.observedAttributes);
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
