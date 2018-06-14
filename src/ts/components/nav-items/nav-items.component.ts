import Debug from 'debug';
import $ from 'jquery';
import template from './nav-items.component.html';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

/**
 * nav-items
 */
export const navItems = {
  template() {
    return template;
  },
  initialize(el: HTMLElement, data: any) {
    const controller = this;
    const $el = $(el);
    const debug = Debug('rivets:nav-items');
    debug('initialize', data, template);

    controller.linklist = data.linklist;
    controller.pills = data.pills;
    controller.vertical = data.vertical;

    // setTimeout(() => {

    // }, 0);

    return controller;
  },
};
