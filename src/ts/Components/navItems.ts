import Debug from 'debug';
import $ from 'jquery';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

/**
 * nav-items
 */
export const navItems = {
  template() {
    return window.model.system.templates.navItems;
  },
  initialize(el: HTMLElement, data: any) {
    const controller = this;
    const $el = $(el);
    const debug = Debug('rivets:nav-items');
    debug('initialize', data);

    controller.linklist = data.linklist;

    // setTimeout(() => {

    // }, 0);

    return controller;
  },
};
