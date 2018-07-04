export interface IDeferred {
    resolve: any;
    reject: any;
}
export declare const mergeObject: (target: any, obj: any) => any;
/**
 * Test if string is a json string
 * @param str
 */
export declare const isJson: (str: string) => boolean;
/**
 * Check if a value is an object than can be observed.
 * @param obj
 */
export declare const isObject: (obj: object) => boolean;
export declare const getString: (value: string) => string;
export declare const times: (n: number, cb: () => void) => void;
/**
 *
 */
export declare const getInputValue: (el: HTMLInputElement | HTMLSelectElement) => string | boolean | string[];
/**
 * Just an Class with some helpful functions
 *
 * @export
 * @class Utils
 */
export declare class Utils {
    /**
     * Time in millisecond after the xhr request goes in timeout
     *
     * @memberOf Barba.Utils
     * @type {Number}
     * @default
     */
    static xhrTimeout: 5000;
    /**
     * Check if value is undefined
     */
    static isUndefined(value?: any): boolean;
    /**
     * Check if value is undefined
     */
    static isDefined(value?: any): boolean;
    /**
     * Check if value is a function
     */
    static isFunction(value: any): boolean;
    /**
     * Check if variable is an Array
     * @see https://stackoverflow.com/a/4775737/1465919
     */
    static isArray(value: any): boolean;
    /**
     * Check whether variable is number or string in JavaScript
     * @see https://stackoverflow.com/a/1421988/1465919
     */
    static isNumber(value?: any): boolean;
    /**
     * heck if type is Object
     * @see https://stackoverflow.com/a/4775737/1465919
     */
    static isObject(value?: any): boolean;
    /**
     * Check if type is Boolean
     * @see https://stackoverflow.com/a/28814615/1465919
     */
    static isBoolean(value?: any): boolean;
    /**
     * Check if value is a string
     */
    static isString(value?: any): boolean;
    /**
     * Check if string contains a number
     */
    static stringHasNumber(value: string): boolean;
    /**
     * Check if string contains only numbers
     */
    static stringHasOnlyNumber(value?: any): boolean;
    /**
     * Check if string contains only numbers, +, - and ()
     */
    static stringIsPhoneNumber(value: string): boolean;
    /**
     * Just get the digits of a string, useful to remove px pixel from css value
     *
     * @see http://stackoverflow.com/a/1100653/1465919
     */
    static justDigits(str: string): number;
    /**
     * Merge the contents of two or more objects together into the first object.
     * @param {boolean} deep If true, the merge becomes recursive (aka. deep copy).
     * @param {object} target An object that will receive the new properties if additional objects are passed in or that will extend the jQuery namespace if it is the sole argument.
     * @param {object} object1 An object containing additional properties to merge in.
     * @param {object} [objectN] Additional objects containing properties to merge in.
     * @returns
     * @memberof Utils
     */
    static extend(deep: boolean, target: object, object1: object, objectN?: object): object;
    /**
     * Concat the contents of two objects together into the first object.
     * @param {boolean} deep If true, the merge becomes recursive (aka. deep copy).
     * @param {object} object1 An first object containing properties to concat.
     * @param {object} object2 The second object containing properties to concat.
     */
    static concat(deep: boolean, object1: object, object2: object): object;
    /**
     * Start an XMLHttpRequest() and return a Promise
     *
     * @memberOf Barba.Utils
     * @param  {string} url
     * @return {Promise}
     */
    static xhr(url: string): any;
    /**
     * Return a new "Deferred" object
     * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
     *
     * @memberOf Barba.Utils
     * @return {IDeferred}
     */
    static deferred(): any;
    /**
     * get hostname an path of address bar
     * @see http://stackoverflow.com/a/736970/1465919
     *
     * @example
     * var l = getLocation("http://example.com/path");
     * console.debug(l.hostname)
     * >> "example.com"
     * console.debug(l.pathname)
     * >> "/path"
     */
    static getLocation(url?: string): Location;
    /**
     * Return the current url
     *
     * @memberOf Barba.Utils
     * @return {string} currentUrl
     */
    static getUrl(url?: string): string;
    /**
     * Given an url, return it without the hash
     *
     * @memberOf Barba.Utils
     * @private
     * @param  {string} url
     * @return {string} newCleanUrl
     */
    static cleanLink(url: string): string;
    /**
     * Return the port number normalized, eventually you can pass a string to be normalized.
     *
     * @memberOf Barba.Utils
     * @private
     * @param  {String} p
     * @return {Int} port
     */
    static getPort(p?: string, url?: string): number;
    /**
     * Test if url is absolute or relative
     */
    static isAbsoluteUrl(url: string): boolean;
    /**
     * get param from hash
     */
    static getUrlParameter(name: string, url: string): string;
    /**
     * Get hash from address bar or url if set
     */
    static getHash(url?: string): string;
    /**
     * Change hash from address bar
     */
    static updateHash(hash: string): string;
    /**
     * Remove hash from address bar
     */
    static removeHash(): void;
    static getViewportDimensions(): {
        h: number;
        w: number;
    };
}
