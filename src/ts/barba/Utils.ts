
interface IDeferred {
  resolve: any;
  reject: any;
}

/**
 * Just an object with some helpful functions
 *
 * @type {Object}
 * @namespace Barba.Utils
 */
class Utils {

  /**
   * Time in millisecond after the xhr request goes in timeout
   *
   * @memberOf Barba.Utils
   * @type {Number}
   * @default
   */
  public static xhrTimeout: 5000;

  /**
   * Return the current url
   *
   * @memberOf Barba.Utils
   * @return {string} currentUrl
   */
  public static getCurrentUrl(): string {
    return window.location.protocol + '//' +
           window.location.host +
           window.location.pathname +
           window.location.search;
  }

  /**
   * Given an url, return it without the hash
   *
   * @memberOf Barba.Utils
   * @private
   * @param  {string} url
   * @return {string} newCleanUrl
   */
  public static cleanLink(url: string): string {
    return url.replace(/#.*/, '');
  }

  /**
   * Start an XMLHttpRequest() and return a Promise
   *
   * @memberOf Barba.Utils
   * @param  {string} url
   * @return {Promise}
   */
  public static xhr(url: string) {
    const deferred = this.deferred();
    const req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if (req.status === 200) {
          return deferred.resolve(req.responseText);
        } else {
          return deferred.reject(new Error('xhr: HTTP code is not 200'));
        }
      }
    };

    req.ontimeout = () => {
      return deferred.reject(new Error('xhr: Timeout exceeded'));
    };

    req.open('GET', url);
    req.timeout = this.xhrTimeout;
    req.setRequestHeader('x-barba', 'yes');
    req.send();

    return deferred.promise;
  }

  /**
   * Get obj and props and return a new object with the property merged
   *
   * @memberOf Barba.Utils
   * @param  {object} obj
   * @param  {any} props
   * @return {object}
   */
  public static extend(obj: object, props: any): object {
    const newObj = Object.create(obj);

    for (const prop in props) {
      if (props.hasOwnProperty(prop)) {
        newObj[prop] = props[prop];
      }
    }

    return newObj;
  }

  /**
   * Return a new "Deferred" object
   * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
   *
   * @memberOf Barba.Utils
   * @return {IDeferred}
   */
  public static deferred(): any {
    const obj: any = {};
    const prom = new Promise((resolve: any, reject: any) => {
      obj.resolve = resolve;
      obj.reject = reject;
    });
    obj.promise = prom;
    return obj;
  }

  /**
   * Return the port number normalized, eventually you can pass a string to be normalized.
   *
   * @memberOf Barba.Utils
   * @private
   * @param  {String} p
   * @return {Int} port
   */
  public static getPort(p?: string) {
    const port = typeof p !== 'undefined' ? p : window.location.port;
    const protocol = window.location.protocol;

    if (port !== '') {
      return Number(port);
    }
    if (protocol === 'http:') {
      return 80;
    }

    if (protocol === 'https:') {
      return 443;
    }
  }
}

export { Utils };
