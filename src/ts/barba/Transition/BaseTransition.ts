import { Utils } from '../Utils';

/**
 * BaseTransition to extend
 *
 * @namespace Barba.BaseTransition
 * @type {Object}
 */
abstract class BaseTransition {
  /**
   * @memberOf Barba.BaseTransition
   * @type {JQuery<HTMLElement>}
   */
  public $oldContainer: JQuery<HTMLElement>;

  /**
   * @memberOf Barba.BaseTransition
   * @type {JQuery<HTMLElement>}
   */
  public $newContainer: JQuery<HTMLElement>;

  /**
   * @memberOf Barba.BaseTransition
   * @type {Promise}
   */
  public newContainerLoading: Promise<JQuery<HTMLElement>>;

  private deferred: any; // TODO type

  /**
   * Helper to extend the object
   *
   * @memberOf Barba.BaseTransition
   * @param  {Object} newObject
   * @return {Object} newInheritObject
   */
  public extend(obj: object) {
    return Utils.extend(this, obj);
  }

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
  public init($oldContainer: JQuery<HTMLElement>, newContainer: Promise<JQuery<HTMLElement>>) {
    const self = this;

    this.$oldContainer = $oldContainer;

    this.deferred = Utils.deferred();
    const newContainerReady = Utils.deferred();
    this.newContainerLoading = newContainerReady.promise;

    this.start();

    newContainer.then(($newContainer: JQuery<HTMLElement>) => {
      self.$newContainer = $newContainer;
      newContainerReady.resolve();
    });

    return this.deferred.promise;
  }

  /**
   * This function needs to be called as soon the Transition is finished
   *
   * @memberOf Barba.BaseTransition
   */
  public done() {
    // this.$oldContainer[0].parentNode.removeChild(this.$oldContainer[]);
    this.$oldContainer.remove();
    // this.newContainer.style.visibility = 'visible';
    this.$newContainer.css('visibility', 'visible');
    this.deferred.resolve();
  }

  /**
   * Constructor for your Transition
   *
   * @memberOf Barba.BaseTransition
   * @abstract
   */
  public abstract start(): any;
}

export { BaseTransition };