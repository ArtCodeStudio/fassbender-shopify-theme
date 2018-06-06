import { BaseTransition } from './BaseTransition';

/**
 * Basic Transition object, wait for the new Container to be ready,
 * scroll top, and finish the transition (removing the old container and displaying the new one)
 *
 * @private
 * @namespace Barba.HideShowTransition
 * @augments Barba.BaseTransition
 */
class HideShowTransition extends BaseTransition {
  start() {
    this.newContainerLoading.then(this.finish.bind(this));
  };

  finish() {
    document.body.scrollTop = 0;
    this.done();
  };
}

export { HideShowTransition };
