import Debug from 'debug';
import $ from 'jquery';
import { Utils } from '../Utils';

export interface IOptions {
  angle: 'vertical' | 'horizontal';
  direction: 1 | -1;
  jumps: number;
  delay: number;
  width?: string;
}

const debug = Debug('binders:autoscroll');

// TODO try alternative version from https://www.sitepoint.com/community/t/auto-scrolling-a-div-with-overflow-scroll-auto/2291/3
const initAutoscroll = ($el: JQuery<HTMLElement>, options: IOptions) => {
  let direction = options.direction;
  const jumps = options.jumps;
  const delay = options.delay;
  let stop = false;
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

    if (Utils.isString(options.width)) {
      $el.css('width', options.width);
    }

    $el.addClass(`rv-autoscroll-${options.angle}`);

    setTimeout(() => {
      initAutoscroll($el, options);
    }, 1000);

  };
};
