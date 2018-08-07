import { shopifyExtension } from '../tinybind';
import { ShopifyCart } from './shopify-cart.service';

export class ShopifyService extends shopifyExtension.services.ShopifyService {
  public cart = new ShopifyCart();
}
