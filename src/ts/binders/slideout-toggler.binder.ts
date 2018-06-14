import Debug from 'debug';
import $ from 'jquery';
import Slideout from 'slideout';
import { Pjax, Prefetch } from '../barba';
import { Dispatcher } from '../dispatcher';
import { Utils } from '../Utils';
import { TypingTextService } from './../typing-text.service';

/**
 * Slideout click event to toggle the slideout
 */
export const slideoutTogglerBinder = (dispatcher: Dispatcher, pjax: Pjax, prefetch: Prefetch) => {

  const debug = Debug('binders:slideout-toggler');

  return (el: HTMLElement, side: 'right' | 'left') => {
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
        typetext.delete(() => {
          debug('delete Close done');
          typetext.write('Close');
        });
      });

      slideout.on('beforeclose', () => {
        // $el.html(text);
        typetext.delete(() => {
          debug(`delete ${text} done`);
          typetext.write(text);
        });
      });

    });

  };
};
