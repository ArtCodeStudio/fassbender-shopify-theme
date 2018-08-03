import { Utils as tinybindUtils, getJSON } from '../tinybind';

export { getJSON };

/**
 * Just an Class with some helpful functions
 *
 * @export
 * @class Utils
 */
export class Utils extends tinybindUtils {

  /**
   * Shoutout AngusCroll (https://goo.gl/pxwQGp)
   * @param obj
   */
  public static toType(obj: any) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  /**
   *
   * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/util.js#L124
   */
  public static isElement(obj: Element | Element[]) {
    return ((obj as Element[])[0] || obj).nodeType;
  }

  /**
   *
   * @param componentName
   * @param config
   * @param configTypes
   */
  public static typeCheckConfig(componentName: string, config: any, configTypes: any) {
    for (const property in configTypes) {
      if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
        const expectedTypes = configTypes[property];
        const value         = config[property];
        const valueType     = value && Utils.isElement(value) ? 'element' : Utils.toType(value);

        if (!new RegExp(expectedTypes).test(valueType)) {
          throw new Error(
            `${componentName.toUpperCase()}: ` +
            `Option "${property}" provided type "${valueType}" ` +
            `but expected type "${expectedTypes}".`);
        }
      }
    }
  }

  public static getSelectorFromElement(element: Element) {
    let selector = element.getAttribute('data-target');
    if (!selector || selector === '#') {
      selector = element.getAttribute('href') || '';
    }

    try {
      return document.querySelector(selector) ? selector : null;
    } catch (err) {
      return null;
    }
  }

  public static stringHasOnlyNumbers(str: string) {
    return /^\d+$/.test(str);
  }

  /**
   * Which HTML element is the target of the event
   * @see https://gist.github.com/electricg/4435259
   */
  public eventTarget(e: Event | JQuery.Event) {
    let targ;
    let $targ;
    e = e || window.event;

    if (e.target) {
      targ = e.target;
    } else if ((e as any).srcElement) {
      targ = (e as any).srcElement;
    }
    // defeat Safari bug
    if (targ.nodeType === 3) {
      targ = targ.parentNode;
    }
    $targ = $(targ);
    return $targ;
  }

  /**
   * Get the mouse / touch position relative to the document
   * @see http://www.quirksmode.org/js/events_properties.html
   */
  public eventPositionDocument(e?: MouseEvent | TouchEvent | Event) {
    let posx = 0;
    let posy = 0;
    if (!e) {
      e = window.event;
    }

    if (e) {
      if ((e as any).originalEvent) {
        e = (e as any).originalEvent;
      }
    }
    if (e && (e as TouchEvent).changedTouches) {
      e = (e as TouchEvent);
      if ((e as TouchEvent).changedTouches && (e as TouchEvent).changedTouches[0] && ((e as TouchEvent).changedTouches[0].pageX || (e as TouchEvent).changedTouches[0].pageY)) {
        posx = (e as TouchEvent).changedTouches[0].pageX;
        posy = (e as TouchEvent).changedTouches[0].pageY;
      } else if ((e as MouseEvent).pageX || (e as MouseEvent).pageY) {
        posx = (e as MouseEvent).pageX;
        posy = (e as MouseEvent).pageY;
      } else if ((e as TouchEvent).touches && (e as TouchEvent).changedTouches[0] && ((e as TouchEvent).changedTouches[0].clientX || (e as TouchEvent).changedTouches[0].clientY)) {
        posx = (e as TouchEvent).changedTouches[0].clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = (e as TouchEvent).changedTouches[0].clientY + document.body.scrollTop + document.documentElement.scrollTop;
      } else if ((e as MouseEvent).clientX || (e as MouseEvent).clientY) {
        posx = (e as MouseEvent).clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = (e as MouseEvent).clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }
    }
    return {
      x : posx,
      y : posy,
    };
  }

  /**
   * Get the position of an element relative to document
   */
  public getElementPosition(selector: string | JQuery<any>) {
    const $el = $(selector);
    const pageYScroll = window.pageYOffset || document.documentElement.scrollTop;
    const pageXScroll = window.pageXOffset || document.documentElement.scrollLeft;
    // optionally get horizontal scroll
    // get position of element relative to viewport
    const rect = $el[0].getBoundingClientRect();
    const result = {
      'x': rect.left + pageXScroll,
      'fixed-x': rect.left,
      'y': rect.top + pageYScroll,
      'fixed-y': rect.top,
      'w': rect.width,
      'h': rect.height,
      '$element': $el,
    };
    return result;
  }

  /**
   * Get the position of an element relative to another element e.g. his parent element
   * E.g. used in rv-tabs to get the scrollpostion of an element insite a scrollable element to scroll the active tab to left
   */
  public getElementPositionInElement(selector: string, parentSelector: string) {
    const elementPos = this.getElementPosition(selector);
    const parentElementPos = this.getElementPosition(parentSelector);
    const result = {
      'x': elementPos.x - parentElementPos.x,
      'y': elementPos.y - parentElementPos.y,
      'fixed-x': elementPos['fixed-x'] - parentElementPos['fixed-x'],
      'fixed-y': elementPos['fixed-y'] - parentElementPos['fixed-y'],
      'w': elementPos.w,
      'h': elementPos.h,
      '$element': elementPos.$element,
      '$parent': parentElementPos.$element,
      'elementPos': elementPos,
      'parentPos': parentElementPos,
    };
    return result;
  }

  /**
   * Mouse position relative to the element  (not working on IE7 and below)
   * @see https://gist.github.com/electricg/4435259
   */
  public mousePositionElement(e: MouseEvent, target: JQuery<any>) {
    const mousePosDoc = this.eventPositionDocument(e);
    // if target not set try to get target from event
    if (!target) {
      target = this.eventTarget(e);
    }
    const targetPos = this.getElementPosition(target);
    const posx = mousePosDoc.x - targetPos.x;
    const posy = mousePosDoc.y - targetPos.y;
    return {
      x : posx,
      y : posy,
      element: target,
    };
  }

  /**
   * Mouse position relative to the element in percent (not working on IE7 and below)
   * @see https://gist.github.com/electricg/4435259
   */
  public mousePositionElementInPercent(e: MouseEvent, target: JQuery<any>) {
    const mousePosDoc = this.eventPositionDocument(e);
    // if target not set try to get target from event
    if (!target) {
      target = this.eventTarget(e);
    }
    const width = target[0].offsetWidth;
    const height = target[0].offsetHeight;
    const targetPos = this.getElementPosition(target);
    const posx = mousePosDoc.x - targetPos.x;
    const posy = mousePosDoc.y - targetPos.y;
    return {
      x: posx,
      y: posy,
      left: posx / width, // percent value
      top: posy / height, // percent value
      w: width,
      h: height,
      element: target,
    };
  }

  /**
   * Get the browser viewport dimensions
   * @see https://stackoverflow.com/a/8876069/1465919
   */
  public getViewportDimensions()  {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return {
      w,
      h,
    };
  }

}
