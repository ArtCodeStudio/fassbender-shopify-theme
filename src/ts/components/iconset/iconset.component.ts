import Debug from 'debug';
import $ from 'jquery';
import { ICustomComponent } from '../index';
import template from './iconset.component.html';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

/**
 * nav-items
 */
export const iconsetComponent = () => {

  const debug = Debug('component:iconset');

  const component: ICustomComponent<any> = {

    name: 'iconset',

    template() {
      return template;
    },

    initialize(el: HTMLElement, data: any) {
      const scope = this;
      const $el = $(el);
      const src = data.src || window.model.system.assetsPath + data.name;
      const color = data.color || null;
      const direction = data.direction || 'top';
      const size = data.size || 32;
      let classString = `iconset direction-${direction} size-${size} color-${color}`;
      debug('initialize', data, template);

      if (direction === 'left' ) {
        classString += ' rotate-270';
      } else if ( direction === 'left-top' || direction === 'left-up' || direction === 'top-left' || direction === 'up-left' ) {
        classString += ' rotate-315' ;
      } else if ( direction === 'top' || direction === 'up' ) {
        classString += ' rotate-0';
      } else if ( direction === 'top-right' || direction === 'up-right' || direction === 'right-top' || direction === 'right-up') {
        classString += ' rotate-45';
      } else if ( direction === 'right' ) {
        classString += ' rotate-90';
      } else if ( direction === 'right-bottom' || direction === 'right-down' || direction === 'bottom-right' || direction === 'down-right' ) {
        classString += ' rotate-135';
      } else if ( direction === 'bottom' || direction === 'down' ) {
        classString += ' rotate-180';
      } else if ( direction === 'left-bottom' || direction === 'left-down' || direction === 'bottom-left' || direction === 'down-left' ) {
        classString += ' rotate-225';
      }

      $(el)
      .load( src )
      .css({
        color,
        height: size + 'px',
        width: size + 'px',
      })
      .addClass(classString)
      .attr('aria-hidden', 'true')
      .attr('role', 'img');

      return scope;
    },
  };

  return component;
};
