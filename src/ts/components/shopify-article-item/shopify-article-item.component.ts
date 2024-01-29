import { Component } from "@ribajs/core";
import template from "./shopify-article-item.component.html?raw";
import { hasChildNodesTrim } from "@ribajs/utils";

export class ShopifyArticleItemComponent extends Component {
  public static tagName = "rv-shopify-article-item";

  static get observedAttributes() {
    return [];
  }

  public scope: any = {};

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyArticleItemComponent.observedAttributes);
  }

  protected requiredAttributes() {
    return [];
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
