import $ from 'jquery';
import { ITwoWayBinder, BinderWrapper } from '../../binder.service';
import { Utils } from '../../utils';
import { GlobalEvent } from './barba/barba';

export const parentRouteClassStarBinderWrapper: BinderWrapper = (dispatcher: GlobalEvent) => {

  const binder: ITwoWayBinder<string> = {

    bind(el: HTMLUnknownElement) {
      // console.warn('routeClassStarBinder bind', el);
    },

    /**
     * Tests the url with the current location, if the url is equal to the current location this element is active
     * @param el Binder HTML Element
     * @param url Url to compare with the current location
     */
    routine(el: HTMLElement, url: string) {
      const $el = $(el);
      const className = this.args[0].toString() || 'active';
      const isAnkerHTMLElement = $el.prop('tagName') === 'A';
      if (!url && isAnkerHTMLElement) {
        const href = $el.attr('href');
        if (href) {
          url = href;
        }
      }
      const onUrlChange = (urlToCheck?: string) => {
        if (urlToCheck) {
          if (Utils.onParentRoute(urlToCheck)) {
            $el.addClass(className);
            // check if element is radio input
            if ($el.is(':radio')) {
              $el.prop('checked', true);
            }
            return true;
          } else {
            $el.removeClass(className);
            // uncheck if element is radio input
            if ($el.is(':radio')) {
              $el.prop('checked', false);
            }
          }
        }
        return false;
      };

      dispatcher.on('newPageReady', () => onUrlChange(url));
      onUrlChange(url);
    },

    unbind(el: HTMLUnknownElement) {
      // console.warn('routeClassStarBinder routine', el);
    },
  };

  return {
    binder,
    name: 'parent-route-class-*',
  };
};
