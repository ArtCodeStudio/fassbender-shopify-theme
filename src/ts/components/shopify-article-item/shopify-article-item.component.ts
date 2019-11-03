import { Component, Debug } from '@ribajs/core';
import { JQuery as $ } from '@ribajs/jquery';
import template from './shopify-article-item.component.html';

export class ShopifyArticleItemComponent extends Component {

  public static tagName: string = 'rv-shopify-article-item';

  static get observedAttributes() {
    return [];
  }

  protected debug = Debug('component:' + ShopifyArticleItemComponent.tagName);

  protected scope: any = {
  };

  constructor(element?: HTMLElement) {
    super(element);
    const $el = $(this.el);
    this.debug('constructor', this);
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
