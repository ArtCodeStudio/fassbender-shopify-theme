declare type EventCallback = (...args: any[]) => any;
/**
 * Little Dispatcher inspired by MicroEvent.js
 *
 * @type {object}
 */
declare class Dispatcher {
    private static instance;
    /**
     * Object that keeps all the events
     *
     * @memberOf Barba.Dispatcher
     * @readOnly
     * @type {object}
     */
    private events;
    /**
     * Creates an singleton instance of Dispatcher.
     * @memberof Dispatcher
     */
    constructor();
    /**
     * Bind a callback to an event
     *
     * @memberOf Barba.Dispatcher
     * @param {string} eventName
     * @param {EventCallback} function
     */
    on(e: string, f: EventCallback): void;
    /**
     * Unbind event
     *
     * @memberOf Barba.Dispatcher
     * @param {string} eventName
     * @param {EventCallback} function
     */
    off(e: string, f: EventCallback): void;
    /**
     * Fire the event running all the event associated to it
     *
     * @memberOf Barba.Dispatcher
     * @param  {string} eventName
     * @param  {any[]} args
     */
    trigger(e: string, ...args: any[]): void;
}
export { Dispatcher };
