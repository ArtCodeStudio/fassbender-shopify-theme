import Debug from 'debug';
import $ from 'jquery';
import { IOneWayBinder, ITwoWayBinder, BinderWrapper } from '../tinybind';
import { Utils } from '../services/Utils';

export interface IOptions {
  angle: 'vertical' | 'horizontal';
  direction: 1 | -1;
  jumps: number;
  delay: number;
  width?: string;
}

/**
 * Slideout click event to toggle the slideout
 */
export const autoscrollBinder: BinderWrapper = () => {

  const debug = Debug('binder:autoscroll');

  const name = 'autoscroll';

  const getWidth = ($el: JQuery<HTMLElement>, options: IOptions) => {
    let w;
    if (options.width === '100vw') {
      w = Utils.getViewportDimensions().w;
    } else {
      // todo just digits
      w = $el.prop('scrollWidth') - ($el.outerWidth() || 0);
    }
    return w;
  };

  // TODO try alternative version from https://www.sitepoint.com/community/t/auto-scrolling-a-div-with-overflow-scroll-auto/2291/3
  const initAutoscroll = ($el: JQuery<HTMLElement>, options: IOptions) => {
    let direction = options.direction;
    const jumps = options.jumps;
    const delay = options.delay;
    let stop = false;
    let position = null;
    let maxScrollWidth = getWidth($el, options);

    $( window ).resize(() => {
      maxScrollWidth = getWidth($el, options);
    });

    if (direction < 0) {
      // start right
      $el.scrollLeft(maxScrollWidth);
    } else {
      // start left
      $el.scrollLeft(0);
    }

    const scroll = () => {
      if (stop) {
        // do nothing
        return setTimeout(scroll, 200);
      }

      position = $el.scrollLeft() || 0;
      if (direction > 0) {
        position = position + jumps;
      } else {
        position = position - jumps;
      }

      if ( position <= 5) {
        direction = 1;
      } else if (position >= maxScrollWidth) {
        direction = -1;
      }

      return $el.animate({
        scrollLeft: position,
      }, delay, 'linear', scroll);
    };

    const mouseIn = () => {
      setTimeout(() => {
          if ($el.filter(':hover').length) {
            stop = true;
            direction *= -1;
          }
      }, 10);
    };

    const mouseOut = () => {
      setTimeout(() => {
        if (stop && !$el.filter(':hover').length) {
          stop = false;
        }
      }, 500);
    };

    $el.hover(mouseIn, mouseOut);

    return setTimeout(scroll, 0);
  };

  const binder: IOneWayBinder<IOptions> = (el: HTMLElement, options: IOptions) => {
    const $el = $(el);
    // debug('init', options);
    if (options && options.width && Utils.isString(options.width)) {
      if (options.width === '100vw') {
        // Utils.getViewportDimensions().w
        $el.css('width', options.width);
      } else {
        $el.css('width', options.width);
      }
    }

    $el.addClass(`rv-autoscroll-${options.angle}`);

    setTimeout(() => {
      initAutoscroll($el, options);
    }, 1000);

  };

  return {
    binder,
    name,
  };
};
