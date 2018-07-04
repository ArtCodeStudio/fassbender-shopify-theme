import { IOneWayBinder, BinderWrapper } from '../../modules/tinybind/index';
export declare const classAddRemove: IOneWayBinder<string>;
/**
 * class-*
 * class-[classname]
 *
 * Custom version of class-[classname]
 * Adds a class (whatever value is in place of [classname]) on the element when the value evaluates to true and removes that class if the value evaluates to false.
 * @see http://rivetsjs.com/docs/reference/#class-[classname]
 */
export declare const classAddRemoveBinder: BinderWrapper;
