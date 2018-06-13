import $ from 'jquery';

export class Utils {

  /**
   * Check if value is undefined
   */
  public static isUndefined(value?: any) {
    return typeof(value) === 'undefined';
  }

  /**
   * Check if value is undefined
   */
  public static isDefined(value?: any) {
    return !this.isUndefined(value);
  }

  /**
   * Check if value is a function
   */
  public static isFunction(value: any) {
    return typeof(value) === 'function';
  }

  /**
   * Check if variable is an Array
   * @see https://stackoverflow.com/a/4775737/1465919
   */
  public static isArray(value: any) {
    return Object.prototype.toString.call( value ) === '[object Array]';
  }

  /**
   * Check whether variable is number or string in JavaScript
   * @see https://stackoverflow.com/a/1421988/1465919
   */
  public static isNumbern(value?: any): boolean {
    return !isNaN(parseFloat(value)) && !isNaN(value - 0);
  }

  /**
   * heck if type is Object
   * @see https://stackoverflow.com/a/4775737/1465919
   */
  public static isObject(value?: any) {
    return this.isDefined(value) && typeof value === 'object';
  }

  /**
   * Check if type is Boolean
   * @see https://stackoverflow.com/a/28814615/1465919
   */
  public static isBoolean(value?: any) {
    return typeof(value) === typeof(true);
  }

  /**
   * Check if value is a string
   */
  public static isString(value?: any) {
    return this.isDefined(value) && typeof(value) === 'string';
  }

  /**
   * Check if string contains a number
   */
  public static stringHasNumber(value: string) {
    return this.isString(value) && /\d/.test(value);
  }

  /**
   * Check if string contains only numbers
   */
  public static stringHasOnlyNumber(value?: any) {
    return /^\d+$/.test(value);
  }

  /**
   * Check if string contains only numbers, +, - and ()
   */
  public static stringIsPhoneNumber(value: string) {
    return /^[0-9 ()+-]+$/.test(value);
  }

  /**
   * Just get the digits of a string, useful to remove px pixel from css value
   *
   * @see http://stackoverflow.com/a/1100653/1465919
   */
  public static justDigits(str: string) {
    const num = str.replace(/[^-\d\.]/g, '');
    if (!Utils.isNumbern(num)) {
      return 0;
    } else {
      return Number(num);
    }
  }

  /**
   * Merge the contents of two or more objects together into the first object.
   * @param {boolean} deep If true, the merge becomes recursive (aka. deep copy).
   * @param {object} target An object that will receive the new properties if additional objects are passed in or that will extend the jQuery namespace if it is the sole argument.
   * @param {object} object1 An object containing additional properties to merge in.
   * @param {object} objectN Additional objects containing properties to merge in.
   */
  public static extend(deep: boolean, target: object, object1: object, objectN: object) {
    let result;
    if (deep) {
      result = $.extend(true, target, object1, objectN);
    } else {
      // Passing false for deep argument is not supported.
      result = $.extend(target, object1, objectN);
    }
    return result;
  }

  /**
   * Concat the contents of two objects together into the first object.
   * @param {boolean} deep If true, the merge becomes recursive (aka. deep copy).
   * @param {object} object1 An first object containing properties to concat.
   * @param {object} object2 The second object containing properties to concat.
   */
  public static concat(deep: boolean, object1: object, object2: object) {
    return this.extend(deep, {}, object1, object2);
  }

}
