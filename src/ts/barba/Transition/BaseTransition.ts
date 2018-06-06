import { Utils } from '../Utils';

/**
 * BaseTransition to extend
 *
 * @namespace Barba.BaseTransition
 * @type {Object}
 */
class BaseTransition {
  /**
   * @memberOf Barba.BaseTransition
   * @type {JQuery<HTMLElement>}
   */
  $oldContainer: JQuery<HTMLElement>;

  /**
   * @memberOf Barba.BaseTransition
   * @type {JQuery<HTMLElement>}
   */
  $newContainer: JQuery<HTMLElement>;

  /**
   * @memberOf Barba.BaseTransition
   * @type {Promise}
   */
  newContainerLoading: Promise<JQuery<HTMLElement>>;

  private deferred: any; // TODO type

  /**
   * Helper to extend the object
   *
   * @memberOf Barba.BaseTransition
   * @param  {Object} newObject
   * @return {Object} newInheritObject
   */
  extend (obj: Object) {
    return Utils.extend(this, obj);
  };

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
  init($oldContainer: JQuery<HTMLElement>, $newContainer: Promise<JQuery<HTMLElement>>) {
    var _this = this;

    this.$oldContainer = $oldContainer;
    let _newContainerPromise = $newContainer;

    this.deferred = Utils.deferred();
    let newContainerReady = Utils.deferred();
    this.newContainerLoading = newContainerReady.promise;

    this.start();

    _newContainerPromise.then(function($newContainer: JQuery<HTMLElement>) {
      _this.$newContainer = $newContainer;
      newContainerReady.resolve();
    });

    return this.deferred.promise;
  };

  /**
   * This function needs to be called as soon the Transition is finished
   *
   * @memberOf Barba.BaseTransition
   */
  done() {
    // this.$oldContainer[0].parentNode.removeChild(this.$oldContainer[]);
    this.$oldContainer.remove();
    // this.newContainer.style.visibility = 'visible';
    this.$newContainer.css('visibility', 'visible');
    this.deferred.resolve();
  };

  /**
   * Constructor for your Transition
   *
   * @memberOf Barba.BaseTransition
   * @abstract
   */
  start() {

  };
};

export { BaseTransition };