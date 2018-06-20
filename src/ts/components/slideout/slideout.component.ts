import Debug from 'debug';
import $ from 'jquery';
import Slideout from 'slideout';
import { Dispatcher } from '../../dispatcher';
import { ICustomComponent } from '../index';
import { Utils } from './../../services/Utils';
import template from './slideout.component.html';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

/**
 * slideout
 * @see https://github.com/mango/slideout
 */
export const slideoutComponent = (dispatcher: Dispatcher) => {

  const debug = Debug('component:slideout');

  const component: ICustomComponent = {
    name: 'slideout',

    template() {
      return template;
    },

    initialize(el: HTMLElement, data: any) {
      const scope = this;
      scope.linklist = window.model.system.linklists['main-menu']; // data.linklist;
      scope.system = window.model.system;

      debug('initialize', this);

      setTimeout(() => {
        const options = {
          duration: 800,
          menu: el,
          padding: Utils.getViewportDimensions().w,
          panel: document.getElementById('slideout-panel'),
          side: ('right' as 'right' | 'left' ),
          tolerance: 70,
        };

        let slideout = new Slideout(options);
        dispatcher.trigger('slideout.component:initialize', slideout);

        // WORKAROUND for viewport width
        $( window ).resize(() => {
          if (!(slideout as any)._opened) {
            slideout.destroy();
            options.padding = Utils.getViewportDimensions().w;
            slideout = new Slideout(options);
            dispatcher.trigger('slideout.component:initialize', slideout);
          }

          debug('resize', slideout);
        });

        dispatcher.on('initStateChange', () => {
          slideout.close();
        });

        slideout.on('open', () => {
          debug('open');
        });

      }, 0);

      return scope;
    },
  };

  return component;
};
