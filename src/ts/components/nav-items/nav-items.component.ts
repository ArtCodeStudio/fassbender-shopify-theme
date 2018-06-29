import Debug from 'debug';
import { ICustomComponent } from '../index';
import template from './nav-items.component.html';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

/**
 * nav-items
 */
export const navItemsComponent = () => {

  const debug = Debug('component:nav-items');

  const component: ICustomComponent<any> = {
    name: 'nav-items',

    template() {
      return template;
    },

    initialize(el: HTMLElement, data: any) {
      const scope = this;
      debug('initialize', data, template);

      scope.linklist = data.linklist;
      scope.pills = data.pills;
      scope.vertical = !!data.vertical;
      return scope;
    },
  };

  return component;
};
