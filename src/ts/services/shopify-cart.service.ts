import { Utils } from './Utils';

export class ShopifyCart {

  /**
   * Use this to add a variant to the cart.
   * @param data
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart
   */
  public static add(data: any) {
    return Utils.post(this.CART_POST_ADD_URL, data);
  }

  /**
   * Use this to get the cart as JSON.
   * @param data
   * @return The JSON of the cart.
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart
   */
  public static get(data: any) {
    return Utils.get(this.CART_GET_URL, data);
  }

  /**
   * Use this to change cart attributes, the cart note, and quantities of line items in the cart.
   * @param data
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#update-cart
   */
  public static update(data: any) {
    return Utils.post(this.CART_POST_UPDATE_URL, data);
  }

  /**
   * This call sets the quantity of an item already in the cart.
   * @param data
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#change-cart
   */
  public static change(data: any) {
    return Utils.post(this.CART_POST_CHANGE_URL, data);
  }

  /**
   * This call sets all quantities of all line items in the cart to zero.
   * @return The JSON of an empty cart. This does not remove cart attributes nor the cart note.
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#clear-cart
   */
  public static clear() {
    return Utils.post(this.CART_POST_CLEAR_URL);
  }

  /**
   * Get estimated shipping rates.
   * @param shippingAddress TODO: /cart/shipping_rates.json?shipping_address[zip]=K1N 5T2&shipping_address[country]=Canada&shipping_address[province]=Ontario
   * @see https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-shipping-rates
   */
  public static shippingRates(shippingAddress: any) {
    return Utils.post(this.CART_POST_CLEAR_URL);
  }

  protected static CART_POST_ADD_URL = '/cart/add.js';

  protected static CART_GET_URL = '/cart.js';

  protected static CART_POST_UPDATE_URL = '/cart/update.js';

  protected static CART_POST_CHANGE_URL = '/cart/change.js';

  protected static CART_POST_CLEAR_URL = '/cart/clear.js';

  protected static CART_GET_SHIPPING_RATES_URL = '/cart/shipping_rates.json';

}
