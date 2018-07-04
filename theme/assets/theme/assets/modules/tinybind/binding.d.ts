import { Observer, IObserverSyncCallback } from './observer';
import { Binder } from './binder.service';
import { View } from './view';
export interface IFormatterObservers {
    [key: string]: {
        [key: string]: Observer;
    };
}
export declare type eventHandlerFunction = (event: Event) => void;
/**
 *  A single binding between a model attribute and a DOM element.
 */
export declare class Binding {
    static FORMATTER_ARGS: RegExp;
    static FORMATTER_SPLIT: RegExp;
    value?: any;
    observer?: Observer;
    view: View;
    el: HTMLElement;
    /**
     * Name of the binder without the prefix
     */
    type: string | null;
    binder: Binder<any> | null;
    formatters: string[] | null;
    formatterObservers: IFormatterObservers;
    keypath: string | null;
    /**
     * Arguments parsed from star binders, e.g. on foo-*-* args[0] is the first star, args[1] the second-
     */
    args: string[] | null;
    /**
     *
     */
    model?: any;
    /**
     * HTML Comment to mark a binding in the DOM
     */
    marker?: Comment;
    /**
     * Used in component bindings. TODO e.g. move to ComponentBinding or binders?
     */
    _bound?: boolean;
    /**
     * just to have a value where we could store custom data
     */
    customData?: any;
    /**
     * All information about the binding is passed into the constructor; the
     * containing view, the DOM node, the type of binding, the model object and the
     * keypath at which to listen for changes.
     * @param {*} view
     * @param {*} el
     * @param {*} type
     * @param {*} keypath
     * @param {*} binder
     * @param {*} args The start binders, on `class-*` args[0] wil be the classname
     * @param {*} formatters
     */
    constructor(view: View, el: HTMLElement, type: string | null, keypath: string | null, binder: Binder<any> | null, args: string[] | null, formatters: string[] | null);
    /**
     * Observes the object keypath
     * @param obj
     * @param keypath
     */
    observe(obj: any, keypath: string, callback?: IObserverSyncCallback): Observer;
    parseTarget(): void;
    /**
     * Get the iteration alias, used in the interation binders like `each-*`
     * @param {*} modelName
     * @see https://github.com/mikeric/rivets/blob/master/dist/rivets.js#L26
     * @see https://github.com/mikeric/rivets/blob/master/dist/rivets.js#L1175
     */
    getIterationAlias(modelName: string): string;
    parseFormatterArguments(args: string[], formatterIndex: number): string[];
    /**
     * Applies all the current formatters to the supplied value and returns the
     * formatted value.
     */
    formattedValue(value: any): any;
    /**
     * Returns an event handler for the binding around the supplied function.
     */
    eventHandler(fn: eventHandlerFunction): (ev: Event) => any;
    /**
     * Sets the value for the binding. This Basically just runs the binding routine
     * with the supplied value formatted.
     */
    set(value: any): void;
    /**
     * Syncs up the view binding with the model.
     */
    sync(): void;
    /**
     * Publishes the value currently set on the input element back to the model.
     */
    publish(): void;
    /**
     * Subscribes to the model for changes at the specified keypath. Bi-directional
     * routines will also listen for changes on the element to propagate them back
     * to the model.
     */
    bind(): void;
    /**
     * Unsubscribes from the model and the element.
     */
    unbind(): void;
    /**
     * Updates the binding's model from what is currently set on the view. Unbinds
     * the old model first and then re-binds with the new model.
     * @param {any} models
     */
    update(models?: any): void;
    /**
     * Returns elements value
     * @param el
     */
    getValue(el: HTMLSelectElement | HTMLInputElement): any;
}
