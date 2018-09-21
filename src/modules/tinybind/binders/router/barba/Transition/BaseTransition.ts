import Debug from 'debug';
import { Utils } from '../../../../utils';

export interface ITransition {
  // $oldContainer: JQuery<HTMLElement>;
  // $newContainer: JQuery<HTMLElement>;
  // newContainerLoading: Promise<JQuery<HTMLElement>>;
  // extend(obj: object): object;
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
export abstract class BaseTransition implements ITransition {
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

  protected deferred: any; // TODO type

  protected debug = Debug('barba:BaseTransition');

  protected action: 'replace' | 'append';

  constructor(action: 'replace' | 'append' = 'replace') {
    this.action = action;
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
  public init($oldContainer: JQuery<HTMLElement>, newContainer: Promise<JQuery<HTMLElement>>): Promise<void> {
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
    this.debug('done');
    // this.$oldContainer[0].parentNode.removeChild(this.$oldContainer[]);
    if (!this.$oldContainer) {
      throw new Error('Can\'t remove old container');
    }

    if (this.action === 'replace') {
      this.$oldContainer.remove();
    }
    // this.newContainer.style.visibility = 'visible';
    if (!this.$newContainer) {
      throw new Error('Can\'t show new container');
    }
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
