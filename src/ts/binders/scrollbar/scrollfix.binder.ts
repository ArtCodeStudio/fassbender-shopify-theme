import { IBinder } from '@ribajs/core';
import { JQuery } from '@ribajs/jquery';

const onWheel = (event: Event) => {
  if ((event as any).wheelDelta > 0 || (event as WheelEvent).detail < 0) {
    // scroll up
  } else {
    // scroll down
  }
};

/**
 * scrollfix passes scroll events to the body to fix scroll with mouse well over vimeo iframes
 * TODO not working yet
 * @see issue https://stackoverflow.com/questions/29344162/fullscreen-video-doesnt-allow-scrolling-on-firefox
 */
export const scrollfixBinder: IBinder<any> = {
  name: 'scrollfix',
  routine(el: HTMLElement, value: any) {

    const $el = JQuery(el);

    $el.hover(() => {
      // over
      document.addEventListener('wheel', onWheel);
      document.addEventListener('mousewheel', onWheel);
      document.addEventListener('DOMMouseScroll', onWheel);
    }, () => {
      // leave
      document.removeEventListener('wheel', onWheel);
      document.removeEventListener('mousewheel', onWheel);
      document.removeEventListener('DOMMouseScroll', onWheel);
    });
  },
};
