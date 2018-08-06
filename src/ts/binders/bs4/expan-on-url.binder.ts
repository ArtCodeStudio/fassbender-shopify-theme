import $ from 'jquery';
import { IOneWayBinder, BinderWrapper, GlobalEvent } from '../../tinybind';
import { CollapseService } from './collapse.service';
import { Utils } from '../../services/Utils';

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
export const expanOnUrlBinder: BinderWrapper = () => {
  const name = 'bs4-expan-on-url';
  const binder: IOneWayBinder<string> = (el: HTMLElement, url: string) => {
    const $el = $(el);
    const collapseService = new CollapseService($el);
    const dispatcher = new GlobalEvent();

    const checkURL = (urlToCheck?: string) => {
      if (urlToCheck && Utils.onRoute(urlToCheck)) {
        collapseService.show();
        return true;
      }
      collapseService.hide();
      return false;
    };

    dispatcher.on('newPageReady', () => checkURL(url));

  };
  return {
    binder,
    name,
  };
};