import Debug from 'debug';
import $ from 'jquery';
import { IComponentWrapperResult } from '../../../modules/tinybind/index';
import template from './contact.component.html';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

/**
 * contact
 */
export const contactComponent = () => {

  const debug = Debug('component:contact');

  const component: IComponentWrapperResult<any> = {

    name: 'contact',

    template() {
      return template;
    },

    initialize(el: HTMLElement, data: any) {
      const scope = (this as any);
      const $el = $(el);
      scope.name = '';
      scope.message = '';
      scope.regards = '';
      scope.mail = '';
      scope.phone = '';

      scope.send = () => {
        debug('send');
      };

      return scope;
    },
  };

  return component;
};
