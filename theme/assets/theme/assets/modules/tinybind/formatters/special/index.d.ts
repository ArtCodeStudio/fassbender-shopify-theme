import { IFormatters } from '../../formatter.service';
import { debug } from './debug.formatter';
import { def } from './def.formatter';
import { currency } from './currency.formatter';
/**
* Formats the product variant's weight. The weight unit is set in General Settings.
* @see https://help.shopify.com/themes/liquid/filters/additional-filters#weightWithUnit
*/
export { debug, def, currency };
export declare const specialFormatters: IFormatters;
