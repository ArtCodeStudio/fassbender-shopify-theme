import $ from 'jquery';
import { IOneWayBinder } from 'tinybind';
import { BinderWrapper } from './binders.service';

export const classAddRemove: IOneWayBinder<string> = function(el: HTMLElement, value: string) {
  const $el = $(el);
  const className = this.arg[0];
  // debug('class-*', className, value);
  if (value) {
    $el.addClass(className);
  } else {
    $el.removeClass(className);
  }
  return value;
};

/**
 * class-*
 * class-[classname]
 *
 * Custom version of class-[classname]
 * Adds a class (whatever value is in place of [classname]) on the element when the value evaluates to true and removes that class if the value evaluates to false.
 * @see http://rivetsjs.com/docs/reference/#class-[classname]
 */
export const classAddRemoveBinder: BinderWrapper = () => {
  return {
    binder: classAddRemove,
    name: 'class-*',
  };
};
