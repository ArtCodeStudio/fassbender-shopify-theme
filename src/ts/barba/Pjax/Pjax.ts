import { BaseCache } from '../Cache';
import { Dispatcher } from '../Dispatcher';
import { HideShowTransition } from '../Transition';
import { Utils } from '../Utils';
import { Dom } from './Dom';
import { HistoryManager } from './HistoryManager';

/**
 * Pjax is a static object with main function
 *
 * @namespace Barba.Pjax
 * @borrows Dom as Dom
 * @type {object}
 */
class Pjax {

  private static instance: Pjax;

  public dom = new Dom();
  public history = new HistoryManager();
  public cache = new BaseCache();

 /**
  * Indicate wether or not use the cache
  *
  * @memberOf Barba.Pjax
  * @type {boolean}
  * @default
  */
  public cacheEnabled: true;

 /**
  * Class name used to ignore links
  *
  * @memberOf Barba.Pjax
  * @type {string}
  * @default
  */
 public ignoreClassLink = 'no-barba';

 /**
  * Indicate if there is an animation in progress
  *
  * @memberOf Barba.Pjax
  * @readOnly
  * @type {boolean}
  */
  public transitionProgress = false;

  private dispatcher = new Dispatcher();

  constructor() {
    if (Pjax.instance) {
      return Pjax.instance;
    }

    Pjax.instance = this;
    return Pjax.instance;
  }

 /**
  * Function to be called to start Pjax
  *
  * @memberOf Barba.Pjax
  */
  public start() {
    this.init();
  }

 /**
  * Init the events
  *
  * @memberOf Barba.Pjax
  * @private
  */
  public init() {
    const $container = this.dom.getContainer();
    const $wrapper = this.dom.getWrapper();

    $wrapper.attr('aria-live', 'polite');

    this.history.add(
      this.getCurrentUrl(),
      this.dom.getNamespace($container),
    );

    // Fire for the current view.
    this.dispatcher.trigger('initStateChange', this.history.currentStatus());
    this.dispatcher.trigger('newPageReady',
      this.history.currentStatus(),
      {},
      $container,
      this.dom.currentHTML,
    );
    this.dispatcher.trigger('transitionCompleted', this.history.currentStatus());
    this.bindEvents();
  }

 /**
  * Attach the eventlisteners
  *
  * @memberOf Barba.Pjax
  * @private
  */
  public bindEvents() {
    document.addEventListener('click',
      this.onLinkClick.bind(this),
    );

    window.addEventListener('popstate',
      this.onStateChange.bind(this),
    );
  }

 /**
  * Return the currentURL cleaned
  *
  * @memberOf Barba.Pjax
  * @return {string} currentUrl
  */
  public getCurrentUrl() {
    return Utils.cleanLink(
      Utils.getCurrentUrl(),
    );
  }

 /**
  * Change the URL with pushstate and trigger the state change
  *
  * @memberOf Barba.Pjax
  * @param {string} newUrl
  */
  public goTo(url: string) {
    window.history.pushState(null, null, url);
    this.onStateChange();
  }

 /**
  * Force the browser to go to a certain url
  *
  * @memberOf Barba.Pjax
  * @param {Location} url
  * @private
  */
 public forceGoTo(url: Location | string) {
   if (url instanceof Location) {
    window.location = url;
   }
   if (typeof url === 'string') {
    window.location.href = url;
   }
  }

 /**
  * Load an url, will start an xhr request or load from the cache
  *
  * @memberOf Barba.Pjax
  * @private
  * @param  {string} url
  * @return {Promise<HTMLElement>}
  */
 public load(url: string): Promise<HTMLElement> {
    const deferred = Utils.deferred();
    const self = this;
    let xhr;

    xhr = this.cache.get(url);

    if (!xhr) {
      xhr = Utils.xhr(url);
      this.cache.set(url, xhr);
    }

    xhr.then((data: string) => {
        const $container = self.dom.parseResponse(data);

        self.dom.putContainer($container);

        if (!self.cacheEnabled) {
          self.cache.reset();
        }

        deferred.resolve($container);
      }, () => {
        // Something went wrong (timeout, 404, 505...)
        self.forceGoTo(url);

        deferred.reject();
      },
    );

    return deferred.promise;
  }

 /**
  * Get the .href parameter out of an element
  * and handle special cases (like xlink:href)
  *
  * @private
  * @memberOf Barba.Pjax
  * @param  {HTMLAnchorElement} el
  * @return {string} href
  */
 public getHref(el: HTMLAnchorElement | SVGAElement): string {
    if (!el) {
      return undefined;
    }

    if (el.getAttribute && typeof el.getAttribute('xlink:href') === 'string') {
      return el.getAttribute('xlink:href');
    }

    if (typeof el.href === 'string') {
      return el.href;
    }

    return undefined;
  }

 /**
  * Callback called from click event
  *
  * @memberOf Barba.Pjax
  * @private
  * @param {MouseEvent} evt
  */
 public onLinkClick(evt: MouseEvent) {
    let el: HTMLAnchorElement = (evt.target as HTMLAnchorElement );

    // Go up in the nodelist until we
    // find something with an href
    while (el && !this.getHref(el)) {
      el = (el.parentNode as HTMLAnchorElement);
    }

    if (this.preventCheck(evt, el)) {
      evt.stopPropagation();
      evt.preventDefault();

      this.dispatcher.trigger('linkClicked', el, evt);

      const href = this.getHref(el);
      this.goTo(href);
    }
  }

 /**
  * Determine if the link should be followed
  *
  * @memberOf Barba.Pjax
  * @param  {MouseEvent} evt
  * @param  {HTMLAnchorElement} element
  * @return {boolean}
  */
 public preventCheck(evt: MouseEvent, element: HTMLAnchorElement): boolean {
    if (!window.history.pushState) {
      return false;
    }

    const href = this.getHref(element);

    // User
    if (!element || !href) {
      return false;
    }

    // Middle click, cmd click, and ctrl click
    if (evt.which > 1 || evt.metaKey || evt.ctrlKey || evt.shiftKey || evt.altKey) {
      return false;
    }

    // Ignore target with _blank target
    if (element.target && element.target === '_blank') {
      return false;
    }

    // Check if it's the same domain
    if (window.location.protocol !== element.protocol || window.location.hostname !== element.hostname) {
      return false;
    }

    // Check if the port is the same
    if (Utils.getPort() !== Utils.getPort(element.port)) {
      return false;
    }

    // Ignore case when a hash is being tacked on the current URL
    if (href.indexOf('#') > -1) {
      return false;
    }

    // Ignore case where there is download attribute
    if (element.getAttribute && typeof element.getAttribute('download') === 'string') {
      return false;
    }

    // In case you're trying to load the same page
    if (Utils.cleanLink(href) === Utils.cleanLink(location.href)) {
      return false;
    }

    if (element.classList.contains(this.ignoreClassLink)) {
      return false;
    }

    return true;
  }

 /**
  * Return a transition object
  *
  * @memberOf Barba.Pjax
  * @return {Barba.Transition} Transition object
  */
  public getTransition() {
    // User customizable
    return new HideShowTransition();
  }

 /**
  * Method called after a 'popstate' or from .goTo()
  *
  * @memberOf Barba.Pjax
  * @private
  */
  public onStateChange() {
    const newUrl = this.getCurrentUrl();

    if (this.transitionProgress) {
      this.forceGoTo(newUrl);
    }

    if (this.history.currentStatus().url === newUrl) {
      return false;
    }

    this.history.add(newUrl);

    const newContainer = this.load(newUrl);
    const transition = Object.create(this.getTransition());

    this.transitionProgress = true;

    this.dispatcher.trigger('initStateChange',
      this.history.currentStatus(),
      this.history.prevStatus(),
    );

    const transitionInstance = transition.init(
      this.dom.getContainer(),
      newContainer,
    );

    newContainer.then(
      this.onNewContainerLoaded.bind(this),
    );

    transitionInstance.then(
      this.onTransitionEnd.bind(this),
    );
  }

 /**
  * Function called as soon the new container is ready
  *
  * @memberOf Barba.Pjax
  * @private
  * @param {HTMLElement} container
  */
  public onNewContainerLoaded($container: JQuery<HTMLElement>) {
    const currentStatus = this.history.currentStatus();
    currentStatus.namespace = this.dom.getNamespace($container);

    this.dispatcher.trigger('newPageReady',
      this.history.currentStatus(),
      this.history.prevStatus(),
      $container,
      this.dom.currentHTML,
    );
  }

 /**
  * Function called as soon the transition is finished
  *
  * @memberOf Barba.Pjax
  * @private
  */
  public onTransitionEnd() {
    this.transitionProgress = false;

    this.dispatcher.trigger('transitionCompleted',
      this.history.currentStatus(),
      this.history.prevStatus(),
    );
  }
}

export { Pjax };
