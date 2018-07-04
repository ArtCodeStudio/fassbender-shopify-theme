/// <reference types="jquery" />
import { BaseCache } from '../Cache';
import { ITransition } from '../Transition/index';
import { Dom } from './Dom';
import { HistoryManager } from './HistoryManager';
/**
 * Pjax is a static object with main function
 *
 * @namespace Barba.Pjax
 * @borrows Dom as Dom
 * @type {object}
 */
declare class Pjax {
    /**
     * Class name used to ignore links
     *
     * @memberOf Barba.Pjax
     * @type {string}
     * @default
     */
    static ignoreClassLink: string;
    static cache: BaseCache;
    /**
     * Determine if the link should be followed
     *
     * @memberOf Barba.Pjax
     * @param  {MouseEvent} evt
     * @param  {HTMLAnchorElement} element
     * @return {boolean}
     */
    static preventCheck(evt: JQuery.Event<HTMLElement, null>, element: HTMLAnchorElement): boolean;
    /**
     * Get the .href parameter out of an element
     * and handle special cases (like xlink:href)
     *
     * @memberOf Barba.Pjax
     * @param  {HTMLAnchorElement} el
     * @return {string} href
     */
    static getHref(el: HTMLAnchorElement | SVGAElement): string;
    dom?: Dom;
    history: HistoryManager;
    /**
     * Indicate wether or not use the cache
     *
     * @memberOf Barba.Pjax
     * @type {boolean}
     * @default
     */
    cacheEnabled: boolean;
    /**
     * Indicate if there is an animation in progress
     *
     * @memberOf Barba.Pjax
     * @readOnly
     * @type {boolean}
     */
    transitionProgress: boolean;
    private dispatcher;
    private transition;
    constructor();
    /**
     * Function to be called to start Pjax
     *
     * @memberOf Barba.Pjax
     */
    start($wrapper: JQuery<HTMLElement>, transition?: ITransition): void;
    /**
     * Return the currentURL cleaned
     *
     * @memberOf Barba.Pjax
     * @return {string} currentUrl
     */
    getCurrentUrl(): string;
    /**
     * Change the URL with pushstate and trigger the state change
     *
     * @memberOf Barba.Pjax
     * @param {string} newUrl
     */
    goTo(url: string, newTab?: boolean): boolean | void;
    /**
     * Return a transition object
     *
     * @memberOf Barba.Pjax
     * @return {Barba.Transition} Transition object
     */
    getTransition(): ITransition;
    /**
     * Attach the eventlisteners
     *
     * @memberOf Barba.Pjax
     * @protected
     */
    protected bindEvents(): void;
    /**
     * Force the browser to go to a certain url
     *
     * @memberOf Barba.Pjax
     * @param {Location} url
     * @private
     */
    protected forceGoTo(url: Location | string): void;
    /**
     * Load an url, will start an xhr request or load from the cache
     *
     * @memberOf Barba.Pjax
     * @protected
     * @param  {string} url
     * @return {Promise<JQuery<HTMLElement>>}
     */
    protected load(url: string): Promise<JQuery<HTMLElement>>;
    /**
     * Callback called from click event
     *
     * @memberOf Barba.Pjax
     * @protected
     * @param {MouseEvent} evt
     */
    protected onLinkClick(evt: JQuery.Event<HTMLElement, null>): void;
    /**
     * Method called after a 'popstate' or from .goTo()
     *
     * @memberOf Barba.Pjax
     * @protected
     */
    protected onStateChange(): boolean;
    /**
     * Function called as soon the new container is ready
     *
     * @memberOf Barba.Pjax
     * @protected
     * @param {JQuery<HTMLElement>} $container
     */
    protected onNewContainerLoaded($container: JQuery<HTMLElement>): void;
    /**
     * Function called as soon the transition is finished
     *
     * @memberOf Barba.Pjax
     * @protected
     */
    protected onTransitionEnd(): void;
    /**
     * Init the events
     *
     * @memberOf Barba.Pjax
     * @protected
     */
    protected init($wrapper: JQuery<HTMLElement>): void;
}
export { Pjax };
