import { Binder, EventDispatcher } from "@ribajs/core";
import { onRoute } from "@ribajs/utils";

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
export const hideOnUrlBinder: Binder<string> = {
  name: "hide-on-url",
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
  },
};
