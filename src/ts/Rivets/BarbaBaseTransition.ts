import * as Debug from 'debug';
import { BaseTransition, ITransition } from '../barba/Transition/BaseTransition';
import { Utils } from '../barba/Utils';
import { IView, Rivets } from '../Rivets';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

/**
 * Basic Transition object, wait for the new Container to be ready,
 * scroll top, and finish the transition (removing the old container and displaying the new one)
 *
 * @private
 */
class BarbaBaseTransition extends BaseTransition implements ITransition {

  protected debug = Debug('rivets:BarbaBaseTransition');

  private view: IView = null;

  public init($oldContainer: JQuery<HTMLElement>, newContainer: Promise<JQuery<HTMLElement>>): Promise<void> {
    const self = this;

    this.$oldContainer = $oldContainer;
    this.debug('init');

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

  public start() {
    if (this.view !== null) {
      this.view.unbind();
    }
    this.debug('BarbaBaseTransition start');
    this.newContainerLoading.then(this.finish.bind(this));
  }

  public finish($container: JQuery<HTMLElement>) {
    document.body.scrollTop = 0;
    this.view = Rivets.bind(this.$newContainer, window.model);
    this.debug('BarbaBaseTransition finish');
    this.done();
  }

}

export { BarbaBaseTransition };
