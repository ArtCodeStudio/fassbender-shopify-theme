import { Binder } from "@ribajs/core";

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/scrollspy/
 */
export const scrollspyStarBinder: Binder<string> = {
  name: "bs4-scrollspy-*",
  routine(el: HTMLElement, targetSelector: string) {
    const nativeIDTargetSelector = targetSelector.replace("#", "");
    // const dispatcher = new EventDispatcher('main');
    let target = document.getElementById(nativeIDTargetSelector);
    const className = this.args[0] as string;

    /**
     * Determine if an element is in the viewport
     * @param elem The element
     * @return Returns true if element is in the viewport
     */
    const isInViewport = (elem: Element): boolean => {
      if (!elem) {
        return false;
      }
      const distance = elem.getBoundingClientRect();
      return (
        distance.top + distance.height >= 0 &&
        distance.bottom - distance.height <= 0
      );
    };

    const onScroll = () => {
      // reget element each scroll because it could be removed from the page using the router
      target = document.getElementById(nativeIDTargetSelector);
      if (!target) {
        return;
      } else {
        // $target = $(nativeIDTargetSelector);
      }

      if (isInViewport(target)) {
        el.classList.add(className);
        if ((el as HTMLInputElement).type.toLowerCase() === "radio") {
          (el as HTMLInputElement).checked = true;
        }
      } else {
        el.classList.remove(className);
        if ((el as HTMLInputElement).type.toLowerCase() === "radio") {
          (el as HTMLInputElement).checked = false;
        }
      }
    };

    // $(window).off("scroll", onScroll).on("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  },
};
