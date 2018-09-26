import $ from 'jquery';
import { IOneWayBinder, BinderWrapper, EventDispatcher } from '../../tinybind';
import { CollapseService } from './collapse.service';
import { Utils } from '../../services/Utils';

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
export const collapseOnUrlBinderWrapper: BinderWrapper = () => {
  const name = 'bs4-collapse-on-url';
  const binder: IOneWayBinder<string> = (el: HTMLElement, url: string) => {
    const $el = $(el);
    const collapseService = new CollapseService($el);
    const dispatcher = new EventDispatcher('main');

    const checkURL = (urlToCheck?: string) => {
      if (urlToCheck && Utils.onRoute(urlToCheck)) {
        collapseService.hide();
        return true;
      }
      // collapseService.show();
      return false;
    };

    dispatcher.on('newPageReady', () => checkURL(url));

  };
  return {
    binder,
    name,
  };
};
