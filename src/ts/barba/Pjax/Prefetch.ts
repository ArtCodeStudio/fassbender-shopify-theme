import { Utils } from '../Utils';
import { Pjax } from './Pjax';

/**
 * Prefetch
 *
 * @namespace Barba.Prefetch
 * @type {Object}
 */
class Prefetch {

  /**
   * Class name used to ignore prefetch on links
   *
   * @memberOf Barba.Prefetch
   * @type {String}
   * @default
   */
  public ignoreClassLink = 'no-barba-prefetch';

  /**
   * Init the event listener on mouseover and touchstart
   * for the prefetch
   *
   * @memberOf Barba.Prefetch
   */
  public init() {
    if (!window.history.pushState) {
      return false;
    }

    document.body.addEventListener('mouseover', this.onLinkEnter.bind(this));
    document.body.addEventListener('touchstart', this.onLinkEnter.bind(this));
  }

  /**
   * Callback for the mousehover/touchstart
   *
   * @memberOf Barba.Prefetch
   * @private
   * @param  {Object} evt
   */
  public onLinkEnter(evt: MouseEvent) {

    let el = (evt.target as HTMLAnchorElement);

    while (el && !Pjax.getHref(el)) {
      el = (el.parentNode as HTMLAnchorElement); // TODO testme
    }

    if (!el || el.classList.contains(this.ignoreClassLink)) {
      return;
    }

    const url = Pjax.getHref(el);

    // Check if the link is elegible for Pjax
    if (Pjax.preventCheck(evt, el) && !Pjax.cache.get(url)) {
      const xhr = Utils.xhr(url);
      Pjax.cache.set(url, xhr);
    }
  }
}

export { Prefetch };
