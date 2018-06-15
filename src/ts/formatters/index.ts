import Debug from 'debug';
import { Utils } from '../Utils';

/**
 * Add useful general-purpose formatters for Rivets.js
 * Some formatters from cart.js
 * @see https://github.com/discolabs/cartjs/blob/master/src/rivets.coffee#L52
 * @see https://github.com/matthieuriolo/rivetsjs-stdlib/blob/master/src/rivetsstdlib.js
 * @see https://github.com/JumpLinkNetwork/shopify-productjs/blob/master/src/utilities.js
 */

const formatters: any = {};
const debug = Debug('rivets:formatters');

/**
 * a === b
 */
formatters.eq = (a: any, b: any) => {
  return a === b;
};

/**
 * a !== b
 */
formatters.ueq = (a: any, b: any) => {
  return a !== b;
};

formatters.includes = (a: string, b: string) => {
  return a.indexOf(b) >= 0;
};

formatters.match = (a: string, regexp: string, flags?: string) => {
  return a.match(new RegExp(regexp, flags));
};

formatters.lt = (a: number, b: number) => {
  debug('[lt]', a, b);
  return a < b;
};

/**
 * a <= b
 */
formatters.elt = (a: number, b: number) => {
  debug('[elt]', a, b);
  return a <= b;
};

/**
 * a > b
 */
formatters.gt = (a: number, b: number) => {
  debug('[gt]', a, b);
  return a > b;
};

/**
 * a >= b
 */
formatters.egt = (a: number, b: number) => {
  debug('[egt]', a, b);
  return a >= b;
};

/**
 * !a
 */
formatters.not = (a: boolean) => {
  return !a;
};

formatters.empty = (a: any[] | string ) => {
  return !formatters.size(a);
};

/**
 * a && b
 */
formatters.and = (a: boolean, b: boolean) => {
  return a && b;
};

/**
 * a || b
 */
formatters.or = (a: boolean, b: boolean) => {
  return a || b;
};

/**
 * parse json string to object
 * @example <div rv-class='"["col-2", "col-3", "col-4", "col-5", "col-6"]" | parse | random'>
 */
formatters.parse = (jsonString: string) => {
  if (Utils.isString(jsonString)) {
    const object = JSON.parse(jsonString);
    return object;
  }
  return null;
};

/**
 * Get a back random value of array
 * @example <div rv-class='"["col-2", "col-3", "col-4", "col-5", "col-6"]" | parse | random'>
 */
formatters.random = (array: any[]) => {
    if (Utils.isArray(array)) {
        const value = array[Math.floor(Math.random() * array.length)];
        return value;
    }
    return null;
};

/**
 * Adds a number to an output.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#plus
 */
formatters.plus = (a: string | number, b: string | number) => {
  return Number(a) + Number(b);
};

/**
 * Subtracts a number from an output.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#minus
 */
formatters.minus = (a: string | number, b: string | number) => {
  return Number(a) - Number(b);
};

/**
 * Multiplies an output by a number.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#times
 */
formatters.times = (a: string | number, b: string | number) => {
  return Number(a) * Number(b);
};

/**
 * Divides an output by a number. The output is rounded down to the nearest integer.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#divided_by
 */
formatters.divided_by = (a: string | number, b: string | number) => {
  return Number(a) / Number(b);
};

/**
 * Divides an output by a number and returns the remainder.
 * @see https://help.shopify.com/themes/liquid/filters/math-filters#modulo
 */
formatters.modulo = (a: string | number, b: string | number) => {
  return Number(a) % Number(b);
};

/**
 * Prepends characters to a string.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#prepend
 */
formatters.prepend = (a: string, b: string) => {
  return b + a;
};

/**
 * Appends characters to a string.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#append
 */
formatters.append = (a: string, b: string) => {
  return a + b;
};

/**
 * The `slice` filter returns a substring, starting at the specified index.
 * An optional second parameter can be passed to specify the length of the substring.
 * If no second parameter is given, a substring of one character will be returned.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#slice
 */
formatters.slice = (value: any, start: number, end: number) => {
  return value.slice(start, end);
};

formatters.pluralize = (input: any, singular: string, plural: string) => {
  if (plural === null) {
    plural = singular + 's';
  }
  if (Utils.isArray(input)) {
    input = input.length;
  }
  if (input === 1) {
    return singular;
  } else {
    return plural;
  }
};

/**
 * Array formatter to get value by index
 */
formatters.index = (array: any[], index: number) => {
  return (array && array.length >= index) ? array[index] : null;
};

/**
 * Array formatter to get the first element of an array
 */
formatters.first = (array: any[]) => {
  return (array && array.length) ? array[0] : null;
};

/**
 * Array formatter to get the last element of an array
 */
formatters.last = (array: any[]) => {
  return (array && array.length) ? array[array.length - 1] : null;
};

/**
 * Formats a number as a currency (ie $1,234.56). When no currency symbol is provided, default symbol for current locale is used.
 * @param amount Input to filter.
 * @param symbol Currency symbol or identifier to be displayed. (optional)
 * @see https://docs.angularjs.org/api/ng/filter/currency
 */
formatters.currency = (amount: number, symbol: string) => {
    let result = amount.toFixed(2).toString().replace('.', ',');
    if (symbol) {
      result = result + symbol;
    }
    return result;
};

// Add Shopify-specific formatters for Rivets.js.
// formatters.money = (value, currency) => {
//   return Utils.formatMoney(value, ProductJS.settings.moneyFormat, 'money_format', currency);
// };

// formatters.money_with_currency = (value, currency) => {
//   return Utils.formatMoney(value, ProductJS.settings.moneyWithCurrencyFormat, 'money_with_currency_format', currency);
// };

// formatters.weight = (grams) => {
//   switch (CartJS.settings.weightUnit) {
//     case 'kg':
//       return (grams / 1000).toFixed(CartJS.settings.weightPrecision);
//     case 'oz':
//       return (grams * 0.035274).toFixed(CartJS.settings.weightPrecision);
//     case 'lb':
//       return (grams * 0.00220462).toFixed(CartJS.settings.weightPrecision);
//     default:
//       return grams.toFixed(CartJS.settings.weightPrecision);
//   }
// };

/**
 * Formats the product variant's weight. The weight unit is set in General Settings.
 * @see https://help.shopify.com/themes/liquid/filters/additional-filters#weight_with_unit
 */
// formatters.weight_with_unit = (grams) => {
//   return formatters.weight(grams) + CartJS.settings.weightUnit;
// };

// formatters.product_image_size = (src, size) => {
//   return CartJS.Utils.getSizedImageUrl(src, size);
// };

// Add camelCase aliases for underscore formatters.
formatters.moneyWithCurrency = formatters.money_with_currency;
formatters.weightWithUnit = formatters.weight_with_unit;
formatters.productImageSize = formatters.product_image_size;

// Additional formatters for ProductJS

/**
 * Returns the size of a string (the number of characters) or an array (the number of elements).
 * @see https://help.shopify.com/themes/liquid/filters/array-filters#size
 */
formatters.size = (array: any[]) => {
  return (array && array.length) ? array.length : 0;
};

/**
 * Alias for size formatter
 */
formatters.length = formatters.size;

/**
 * Alias for size formatter
 */
formatters.count = formatters.size;

/**
 * Strips tabs, spaces, and newlines (all whitespace) from the left and right side of a string.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#strip
 */
formatters.strip = (str: string) => {
  return $.trim(str);
};

/**
 * Converts a string into uppercase.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#upcase
 */
formatters.upcase = (str: string) =>  {
  return str.toUpperCase();
};

/**
 * Converts a string into lowercase.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#downcase
 */
formatters.downcase = (str: string) => {
  return str.toLowerCase();
};

/**
 * Formats a string into a handle.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#handle-handleize
 */
formatters.handleize = (str: string) => {
  str = formatters.strip(str);
  str = str.replace(/[^\w\s]/gi, ''); // http://stackoverflow.com/a/4374890
  str = formatters.downcase(str);
  return str.replace(/ /g, '-');
};

/**
 * Set default value
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
formatters.default = (value: any, args: any) => {
  return (typeof value !== 'undefined' && value !== null) ? value : args;
};

/**
 * Converts a string into JSON format.
 * @see https://help.shopify.com/themes/liquid/filters/additional-filters#json
 */
formatters.json = (object: any) => {
  return JSON.stringify(object);
};

/**
 * True if array / string contains property / substring or containts property with value
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
formatters.contains = (value: string | any | any[], attr: string, search: string) => {

    // console.log("contains", value, attr, search);

    if (!Utils.isArray(value) || !Utils.isObject(value) || !Utils.isString(value)) {
      return false;
    }

    if (Utils.isUndefined(search)) {
      search = attr;
    }

    if (Utils.isString(value)) {
      return (value.indexOf(search) !== -1);
    }

    if (Utils.isArray(value)) {
      for (const key in value) {
        if ((value.hasOwnProperty(key).hasOwnProperty(attr)) || (Utils.isDefined(value[key]) && Utils.isDefined(value[key][attr]))) {
          if (value[key][attr] === search) {
            return true;
          }
        }
      }
    }

    return false;
};

/**
 * Just get the digits of a string, useful to remove px from css value
 * @see http://stackoverflow.com/a/1100653/1465919
 */
formatters.justDigits = (str: string) => {
  if (Utils.isNumber(str)) {
    return str;
  }
  const num = str.replace(/[^-\d\.]/g, '');
  if (isNaN(Number(num))) {
    return 0;
  } else {
    return Number(num);
  }
};

/**
 * Prüft ob eine Zahl gerade ist oder nicht
 * Check if a number is even or not
 */
formatters.even = (num: number) => {
  return (num % 2) === 0;
};

formatters.uneven = (num: number) => {
  return (num % 2) !== 0;
};

/**
 * Check if value is a string
 */
formatters.isString = (str: string) => {
    return Utils.isString(str);
};

/**
 * Check if value is a string and not empty
 */
formatters.filledString = (str: string) => {
    return Utils.isString(str) && !formatters.empty(str.replace(/\s/g, ''));
};

/**
 * Returns true if value index it the last index of the array. Returns false if it is not the last index.
 * ```
 *  <div rv-each-image="product.images" rv-hide="product.images | last %image%"></div>
 * ```
 * @see https://help.shopify.com/themes/liquid/objects/for-loops#forloop-last
 */
formatters.last = (array: any[], index: number) => {
  return (array.length === index + 1);
};

/**
 * Get property of object or array
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
formatters.get = (obj: any, key: string) => {
  debug('get', obj, key);
  if (Utils.isObject(obj) || Utils.isArray(obj)) {
    debug('get', obj, key, obj[key]);
    return obj[key];
  }
  return null;
};

/**
 * Set property of object
 * @see https://gist.github.com/der-On/cdafe908847e2b882691
 */
formatters.set = (obj: any, key: string, value: any) => {
  if (obj && typeof obj === 'object') {
    obj[key] = value;
  }

  return obj;
};

// Additional formatters for Textilyze

/**
 * greatest common divisor (GCD) useful to calculate the ratio
 * @see https://stackoverflow.com/a/1186465/1465919
 */
formatters.gcd = (a: number, b: number) => {
  return (b === 0) ? a : formatters.gcd(b, a % b);
};

// Date formatters
// @see https://github.com/matthieuriolo/rivetsjs-stdlib/blob/master/src/rivetsstdlib.js

/* date s */

// formatters.date = (target, format) => {
//   return moment(target).format(format || 'DD.MM.YYYY');
// };

// formatters.time = (target, format) => {
//   return moment(target).format(format || 'HH:mm');
// };

// formatters.datetime = (target, format) => {
//   return moment(target).format(format);
// };

// formatters.toTimestamp = (target) => {
//   return moment(target).format('X');
// };

// formatters.toDate = (target) => {
//   return moment.unix(target).toDate();
// };

// formatters.toMoment = (target) => {
//   return moment(target);
// };

/**
 * Get the duration between two dates
 * @example  {startAt | duration endAt | asHours }
 */
// formatters.duration = (start, end) => {
//   return moment.duration(moment(end).diff(start));
// };

// formatters.asHours = (date) => {
//   return date.asHours();
// };

/**
 * The date formatter returns a formatted date string according to the moment.js
 * formatting syntax.
 *
 * ```html
 * <span rv-value="model:date | date 'dddd, MMMM Do'"></span>
 * ```
 *
 * @see {@link http://momentjs.com/docs/#/displaying} for format options.
 */
// formatters.dateFormat = (target, val) => {
//   return moment(target).format(val);
// };

export { formatters };
