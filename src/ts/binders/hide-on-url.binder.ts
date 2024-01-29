import { Binder } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { onRoute } from "@ribajs/utils";

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
export class HideOnUrlBinder extends Binder<string> {
  static key = "hide-on-url";
  routine(el: HTMLElement, url: string) {
    const dispatcher = new EventDispatcher("main");

    const checkURL = (urlToCheck?: string) => {
      if (urlToCheck && onRoute(urlToCheck)) {
        el.setAttribute("hidden", "hidden");
        return true;
      }
      el.removeAttribute("hidden");
      return false;
    };

    dispatcher.on("newPageReady", () => checkURL(url));

    checkURL(url);
  }
}
