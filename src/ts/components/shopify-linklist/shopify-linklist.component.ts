import { ShopifyLinklistComponent as OriginalShopifyLinklistComponent } from "@ribajs/shopify/src/components/linklist/linklist.component";
import template from "./shopify-linklist.component.html?raw";
import { hasChildNodesTrim } from "@ribajs/utils";

/**
 * shopify-linklist
 */
export class ShopifyLinklistComponent extends OriginalShopifyLinklistComponent {
  public static tagName = "shopify-linklist";

  constructor() {
    super();
  }

  /**
   * Only set the component template if there no childs already
   */
  protected async template() {
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
