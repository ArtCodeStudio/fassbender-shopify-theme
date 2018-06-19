import Debug from 'debug';
import $ from 'jquery';
import { IOneWayBinder, ITwoWayBinder } from 'tinybind';
import { Pjax, Prefetch } from '../barba';
import { Dispatcher } from '../dispatcher';
import { Utils } from '../Utils';
import { BinderWrapper } from './binders.service';

/**
 * Open link with pajax if the route is not the active route
 * Sets also the element active if his url is the current url
 */
export const routeBinder: BinderWrapper = (dispatcher: Dispatcher, pjax: Pjax, prefetch: Prefetch) => {

  const name = 'route';

  const debug = Debug('binders:route');

  const binder: IOneWayBinder<string> = (el: HTMLElement, url: string) => {
    const $el = $(el);
    let newTab = false;
    const usePajax = true;
    const self = this;

    debug('getBinder', el, url);

    if (!url) {
      url = $el.attr('href');
    }

    if ($el.attr('target') === '_blank') {
      newTab = true;
    }

    const location = Utils.getLocation();
    const host = location.protocol + '//' + location.hostname;

    // nromalize url
    if (Utils.isAbsoluteUrl(url)) {

      // if is not an external link
      if (url.indexOf(host) === 0) {
        // get relative url
        url = url.replace(host, '');
      } else {
        newTab = true;
      }
    }

    const alreadyOnURL = (checkUrl: string) => {
      const pathname = Utils.getLocation().pathname;
      debug('checkURL', pathname, checkUrl);
      if (checkUrl === pathname) {
        return true;
      }
      return false;
    };

    const checkURL = (urlToCheck: string) => {
      if (alreadyOnURL(urlToCheck)) {
        $el.addClass('active');
        return true;
      }
      $el.removeClass('active');
      return false;
    };

    if (usePajax) {
      dispatcher.on('newPageReady', () => checkURL(url));
    } else {
      $(window).on('hashchange', () => checkURL(url));
    }

    $el.off('click').on('click', (event) => {
        event.preventDefault();
        if (alreadyOnURL(url)) {
          debug('already on this site');
        } else {
          pjax.goTo(url, newTab);
        }
    });

    if (usePajax && !newTab && !alreadyOnURL(url)) {
      $el.off('mouseenter touchstart').on('mouseenter touchstart', (event) => {
        prefetch.onLinkEnter(event, url);
      });
    }

    checkURL(url);
  };

  return {
    binder,
    name,
  };
};
