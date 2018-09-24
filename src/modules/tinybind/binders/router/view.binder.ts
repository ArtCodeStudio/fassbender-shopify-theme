import Debug from 'debug';
import JQuery from 'jquery';
import { ITwoWayBinder, BinderWrapper } from '../../binder.service';
import { Pjax, Prefetch, IState, HideShowTransition } from './barba/barba';
import { GlobalEvent } from '../../global-event';
import { View as RivetsView } from '../../view';
import { Utils } from '../../utils';

/**
 * The main wrapper for the riba view
 * TODO convert this to a component
 *
 * ```
 *   <div rv-view='{"listenAllLinks": true}'>
 *     <div class="rv-view-container" {% include 'jumplink-utils-barba-container-attributes', parseCollection: true %}>
 *       {{ content_for_layout }}
 *     </div>
 *   </div>
 * ```
 */
export const viewBinderWrapper: BinderWrapper = (dispatcher: GlobalEvent, prefetch: Prefetch) => {

  const debug = Debug('binders:view');

  const binder: ITwoWayBinder<string> = {

    block: true,

    bind(el: HTMLUnknownElement) {
      debug('bind', this.customData);
      const self = this;
      if (!this.customData) {
        this.customData = {};
      }

      this.customData.nested = this.customData.nested || null,
      this.customData.$wrapper = this.customData.$wrapper || JQuery(el),

      this.customData.onPageReady = (viewId: string, currentStatus: IState, prevStatus: IState, $container: JQuery<HTMLElement>, newPageRawHTML: string, dataset: any, isInit: boolean) => {
        // Only to anything if the viewID is eqal (in this way it is possible to have multiple views)
        if (viewId !== self.customData.options.viewId) {
          debug('not the right view', self.customData.options.viewId, viewId);
          return;
        }

        // unbind the old rivets view
        if (self.customData.nested) {
          debug('unbind nested'); // TODO not called?
          if (self.customData.options.action === 'replace') {
            self.customData.nested.unbind();
          }
        }

        // add the dateset to the model
        if (!Utils.isObject(self.view.models)) {
          self.view.models = {};
        }

        if (self.customData.options.datasetToModel === true && Utils.isObject(dataset)) {
          self.view.models.dataset = dataset; // = $container.data();
          debug('newPageReady dataset:', dataset);
        }

        // TODO append on action append
        self.customData.nested = new RivetsView($container[0], self.view.models, self.view.options);
        self.customData.nested.bind();
      };

      this.customData.onTransitionCompleted = (viewId: string) => {
        debug('onTransitionCompleted', self.customData);

        // Only to anything if the viewID is eqal (in this way it is possible to have multiple views)
        if (viewId !== self.customData.options.viewId) {
          debug('[onTransitionCompleted] not the right view', self.customData.options.viewId, viewId);
          return;
        }

        // scroll to Anchor of hash
        if (this.customData.options.scrollToAnchorHash && window.location.hash) {
          const $scrollToMe = JQuery(window.location.hash);
          if ($scrollToMe && $scrollToMe.length) {
            const offset = $scrollToMe.offset();
            if (offset && offset.top) {
              debug('scroll to anchor:', $scrollToMe);
              return new Promise((resolve, reject) => {
                setTimeout(() => {
                  JQuery('html').animate({scrollTop: offset.top}, {
                    duration: 1000,
                    complete: () => {
                      debug('scroll complete');
                      resolve();
                    },
                    fail: () => {
                      debug('scroll fail');
                      reject();
                    },
                  });
                }, 0);
              });
            }
          }
        }
        return Promise.resolve();
      };

      /*
      * Make the dispatcher available in the model to register event handlers.
      *
      * I.e., if we have initialized rivets/tinybind with:
      *
      *  `rivets.bind(document.body, model)`,
      *
      * then we can register event handlers for the Barba router dispatcher like this:
      *
      *  `model.routerDispatcher.on('newPageReady', ...);`
      *  `model.routerDispatcher.on('transitionCompleted', ...);`
      * ...etc.
      *
      */
      this.view.models.routerDispatcher = dispatcher;
    },

    routine(el: HTMLUnknownElement, options: any) {
      const $el = JQuery(el);
      // Set default options
      this.customData.options = options || {};
      this.customData.options.action = this.customData.options.action || 'replace'; // replace / append
      this.customData.options.scrollToTop = Utils.isBoolean(this.customData.options.scrollToTop) ? this.customData.options.scrollToTop : true;
      this.customData.options.listenAllLinks = Utils.isBoolean(this.customData.options.listenAllLinks) ? this.customData.options.listenAllLinks : true;
      this.customData.options.scrollToAnchorHash = Utils.isBoolean(this.customData.options.scrollToAnchorHash) ? this.customData.options.scrollToAnchorHash : true;
      this.customData.options.parseTitle = Utils.isBoolean(this.customData.options.parseTitle) ? this.customData.options.parseTitle : false;
      this.customData.options.transition = this.customData.options.transition || new HideShowTransition(this.customData.options.action, this.customData.options.scrollToTop);
      this.customData.options.viewId = this.customData.options.viewId || $el.attr('id') || 'main';
      this.customData.options.datasetToModel = Utils.isBoolean(this.customData.options.datasetToModel) ? this.customData.options.datasetToModel : true;
      // this.customData.options.wrapperSelector = '#' + this.customData.options.viewId;
      this.customData.options.containerSelector = this.customData.options.containerSelector || '[data-namespace]';

      debug('routine', this.customData.options.viewId);

      this.customData.$wrapper.attr('id', this.customData.options.viewId);
      debug('options', this.customData.options);

      dispatcher.on('newPageReady', this.customData.onPageReady);
      dispatcher.on('transitionCompleted', this.customData.onTransitionCompleted);

      const pjax = new Pjax(this.customData.options.viewId, this.customData.$wrapper, this.customData.options.containerSelector, this.customData.options.listenAllLinks, this.customData.options.transition, this.customData.options.parseTitle);
      prefetch.init(this.customData.options.listenAllLinks);
      pjax.start();
    },

    unbind(el: HTMLUnknownElement) {
      debug('unbind', this.customData.options.viewId);
      if (dispatcher) {
        dispatcher.off('newPageReady', this.customData.onPageReady);
        dispatcher.off('transitionCompleted', this.customData.onTransitionCompleted);
      }

      if (this.customData && this.customData.nested !== null) {
        this.customData.nested.unbind();
      }

      delete this.customData;
    },
  };

  return {
    binder,
    name: 'view',
  };
};
