import { Binder } from "@ribajs/core";
import { CollapseService } from "./collapse.service";

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 */
export class CollapseBinder extends Binder<string> {
  static key = "bs4-collapse";
  routine(el: HTMLElement, targetSelector: string) {
    const target = document.querySelector<HTMLElement>(targetSelector);
    if (!target) {
      console.warn(`Target selector "${targetSelector}" not found`);
      return;
    }

    const collapseService = new CollapseService(target);

    const onStateChange = () => {
      if (collapseService.isCollapsed()) {
        el.classList.add(CollapseService.CLASSNAME.COLLAPSED);
        el.setAttribute("aria-expanded", "false");
      } else {
        el.classList.remove(CollapseService.CLASSNAME.COLLAPSED);
        el.setAttribute("aria-expanded", "true");
      }
    };

    target.addEventListener(CollapseService.EVENT.SHOWN, onStateChange);

    target.addEventListener(CollapseService.EVENT.HIDDEN, onStateChange);

    el.addEventListener("click", (event) => {
      event.preventDefault();
      collapseService.toggle();
    });

    onStateChange();
  }
}
