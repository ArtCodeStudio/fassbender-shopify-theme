/// <reference types="jquery" />
/**
 * Prefetch
 *
 * @namespace Barba.Prefetch
 * @type {object}
 */
declare class Prefetch {
    /**
     * Class name used to ignore prefetch on links
     *
     * @memberOf Barba.Prefetch
     * @type {String}
     * @default
     */
    ignoreClassLink: string;
    private debug;
    /**
     * Init the event listener on mouseover and touchstart
     * for the prefetch
     *
     * @memberOf Barba.Prefetch
     */
    init(autobindLinks?: boolean): boolean;
    /**
     * Callback for the mousehover/touchstart, please use the rv-route binder instead
     *
     * @memberOf Barba.Prefetch
     * @private
     * @param  {object} evt
     */
    onLinkEnter(evt: JQuery.Event<HTMLElement, null>, url?: string): void;
}
export { Prefetch };
