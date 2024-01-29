import { Binder } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { CollapseService } from "./collapse.service";
import { onRoute } from "@ribajs/utils";

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
export class CollapseOnUrlBinder extends Binder<string> {
  static key = "bs4-collapse-on-url";
  routine(el: HTMLElement, url: string) {
    const collapseService = new CollapseService(el);
    const dispatcher = new EventDispatcher("main");

    const checkURL = (urlToCheck?: string) => {
      if (urlToCheck && onRoute(urlToCheck)) {
        collapseService.hide();
        return true;
      }
      // collapseService.show();
      return false;
    };

    dispatcher.on("newPageReady", () => checkURL(url));
  }
}
