import Debug from 'debug';
import $ from 'jquery';
import Slideout from 'slideout';
import { IOneWayBinder, ITwoWayBinder } from 'tinybind';
import { Dispatcher } from '../dispatcher';
import { TypingTextService } from './../typing-text.service';

export type TSide = 'right' | 'left';

/**
 * Slideout click event to toggle the slideout
 */
export const slideoutTogglerBinder = (dispatcher: Dispatcher) => {

  const name = 'slideout-toggler';

  const debug = Debug('binders:slideout-toggler');

  const binder: IOneWayBinder<TSide> = (el: HTMLElement, side: TSide) => {
    const $el = $(el);
    debug('init', el, side);
    let slideout: Slideout = null;
    let text = $el.html();
    const typetext = new TypingTextService($el[0], 2000);
    // typetext.auto(['Info', 'Close']);

    dispatcher.on('slideout.component:initialize', (newSlideout: Slideout) => {
      debug('slideout.component:initialize', newSlideout);
      if (slideout !== null) {
        $el.off('click');
      }
      slideout = newSlideout;

      $el.on('click', () => {
        slideout.toggle();
      });

      slideout.on('beforeopen', () => {
        text = $el.html();
        // $el.html('Close');
        $el.css('color', 'white');
        $el.css('min-height', $el.outerHeight());
        typetext.delete(() => {
          debug('delete Close done');
          typetext.write('Close');
        });
      });

      slideout.on('beforeclose', () => {
        // $el.html(text);
        $el.css('min-height', $el.outerHeight());
        typetext.delete(() => {
          debug(`delete ${text} done`);
          $el.css('color', 'black');
          typetext.write(text);
        });
      });
    });
  };

  return {
    binder,
    name,
  };
};
