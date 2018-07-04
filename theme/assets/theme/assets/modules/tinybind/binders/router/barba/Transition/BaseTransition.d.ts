/// <reference types="jquery" />
import Debug from 'debug';
export interface ITransition {
    init($oldContainer: JQuery<HTMLElement>, newContainer: Promise<JQuery<HTMLElement>>): Promise<void>;
    done(): void;
    start(): any;
}
/**
 * BaseTransition to extend
 *
 * @namespace Barba.BaseTransition
 * @type {Object}
 */
export declare abstract class BaseTransition implements ITransition {
    /**
     * @memberOf Barba.BaseTransition
     * @type {JQuery<HTMLElement>}
     */
    protected $oldContainer?: JQuery<HTMLElement>;
    /**
     * @memberOf Barba.BaseTransition
     * @type {JQuery<HTMLElement>}
     */
    protected $newContainer?: JQuery<HTMLElement>;
    /**
     * @memberOf Barba.BaseTransition
     * @type {Promise}
     */
    protected newContainerLoading?: Promise<JQuery<HTMLElement>>;
    protected deferred: any;
    protected debug: Debug.IDebugger;
    /**
     * Helper to extend the object
     *
     * @memberOf Barba.BaseTransition
     * @param  {Object} newObject
     * @return {Object} newInheritObject
     */
    /**
     * This function is called from Pjax module to initialize
     * the transition.
     *
     * @memberOf Barba.BaseTransition
     * @private
     * @param  {HTMLElement} oldContainer
     * @param  {Promise} newContainer
     * @return {Promise}
     */
    init($oldContainer: JQuery<HTMLElement>, newContainer: Promise<JQuery<HTMLElement>>): Promise<void>;
    /**
     * This function needs to be called as soon the Transition is finished
     *
     * @memberOf Barba.BaseTransition
     */
    done(): void;
    /**
     * Constructor for your Transition
     *
     * @memberOf Barba.BaseTransition
     * @abstract
     */
    abstract start(): any;
}
