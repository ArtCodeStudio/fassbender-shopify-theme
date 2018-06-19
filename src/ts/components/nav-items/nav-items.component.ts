import Debug from 'debug';
import { IComponent } from 'tinybind';
import template from './nav-items.component.html';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

/**
 * nav-items
 */
export const navItems = () => {

  const debug = Debug('component:nav-items');

  const component: IComponent = {
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
