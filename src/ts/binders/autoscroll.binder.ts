import Debug from 'debug';
import $ from 'jquery';
import { Utils } from '../Utils';

export interface IOptions {
  angle: 'vertical' | 'horizontal';
  direction: 1 | -1;
}

const debug = Debug('binders:autoscroll');

// TODO try alternative version from https://www.sitepoint.com/community/t/auto-scrolling-a-div-with-overflow-scroll-auto/2291/3
const initAutoscroll = ($el: JQuery<HTMLElement>, direction: 1 | -1 = 1) => {
  const jumps = 4;
  let stop = false;
  const delay = 120;
  let position = null;
  const maxScrollWidth = $el.prop('scrollWidth') - $el.outerWidth();

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

    position = $el.scrollLeft();
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

/**
 * Slideout click event to toggle the slideout
 */
export const autoscrollBinder = () => {

  return (el: HTMLElement, optionsString: string) => {
    const $el = $(el);

    let options: IOptions = null;

    // if options injected with just with a json string
    if (!Utils.isString(optionsString)) {
      optionsString = $el.attr('rv-autoscroll');
    }

    debug('init', el, optionsString);

    if (Utils.isString(optionsString)) {
      options = JSON.parse(optionsString);
    }

    $el.addClass(`rv-autoscroll-${options.angle}`);

    setTimeout(() => {
      initAutoscroll($el, options.direction);
    }, 1000);

  };
};
