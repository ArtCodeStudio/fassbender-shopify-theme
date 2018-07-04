/// <reference types="jquery" />
/**
 * Object that is going to deal with DOM parsing/manipulation
 *
 * @namespace Barba.Pjax.Dom
 * @type {Object}
 */
declare class Dom {
    /**
     * The name of the data attribute on the container
     *
     * @default
     */
    dataNamespace: string;
    private _$wrapper;
    /**
     * Class name used to identify the containers
     *
     * @default
     */
    containerSelector: string;
    /**
     * Full HTML String of the current page.
     * By default is the innerHTML of the initial loaded page.
     *
     * Each time a new page is loaded, the value is the response of the xhr call.
     *
     */
    currentHTML?: string;
    constructor($wrapper: JQuery<HTMLElement>);
    /**
     * Parse the responseText obtained from the xhr call
     *
     */
    parseResponse(responseText: string): JQuery<HTMLElement>;
    /**
     * Get the main barba wrapper by the ID `wrapperId`
     */
    getWrapper(): JQuery<HTMLElement>;
    /**
     * Get the container on the current DOM,
     * or from an HTMLElement passed via argument
     */
    getContainer($newPage?: JQuery<HTMLElement>): JQuery<HTMLElement>;
    /**
     * Get the namespace of the container
     */
    getNamespace($element: JQuery<HTMLElement>): string;
    /**
     * Put the container on the page
     */
    putContainer($element: JQuery<HTMLElement>): void;
    /**
     * Get container selector
     *
     * @memberOf Barba.Pjax.Dom
     * @private
     * @param element
     */
    parseContainer($newPage: JQuery<HTMLElement>): JQuery<HTMLElement>;
}
export { Dom };
