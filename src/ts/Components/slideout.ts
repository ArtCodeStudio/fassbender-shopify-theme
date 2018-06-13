import Debug from 'debug';
import $ from 'jquery';
import Slideout from 'slideout';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

/**
 * slideout
 * @see https://github.com/mango/slideout
 */
export const slideout = {
  template() {
    return window.model.system.templates.slideout;
  },
  initialize(el: HTMLElement, data: any) {
    const controller = this;
    const $el = $(el);
    const debug = Debug('rivets:slideout');

    controller.linklist = window.model.system.linklists['main-menu'];

    debug('initialize');

    setTimeout(() => {
      const options = {
        menu: el,
        padding: 256,
        panel: document.getElementById('slideout-panel'),
        side: ('right' as 'right' | 'left' ),
        tolerance: 70,
      };

      const slideoutElement = new Slideout(options);

      slideoutElement.on('open', () => {
        debug('open');
      });

      $(`.toggle-slideout-${options.side}`).on('click', () => {
        slideoutElement.toggle();
    });

    }, 0);

    return controller;
  },
};
