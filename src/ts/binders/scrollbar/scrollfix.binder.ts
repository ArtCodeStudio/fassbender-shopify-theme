import Debug from 'debug';
import { IOneWayBinder, BinderWrapper, JQuery } from '@ribajs/core';

const debug = Debug('binder:rv-scrollfix');

const onWheel = (event: Event) => {
  debug('onWheel');
  if ((event as any).wheelDelta > 0 || (event as WheelEvent).detail < 0) {
    // scroll up
    debug('scroll up');
  } else {
    // scroll down
    debug('scroll down');
  }
};

/**
 * scrollfix passes scroll events to the body to fix scroll with mouse well over vimeo iframes
 * TODO not working yet
 * @see issue https://stackoverflow.com/questions/29344162/fullscreen-video-doesnt-allow-scrolling-on-firefox
 */
export const scrollfixBinderWrapper: BinderWrapper = () => {
  const name = 'scrollfix';
  const binder: IOneWayBinder<string> = (el: HTMLElement, value: any) => {

    debug('scrollfix', el);
    const $el = JQuery(el);

    $el.hover(() => {
      debug('over');
      document.addEventListener('wheel', onWheel);
      document.addEventListener('mousewheel', onWheel);
      document.addEventListener('DOMMouseScroll', onWheel);
    }, () => {
      debug('leave');
      document.removeEventListener('wheel', onWheel);
      document.removeEventListener('mousewheel', onWheel);
      document.removeEventListener('DOMMouseScroll', onWheel);
    });
  };
  return {
    binder,
    name,
  };
};
