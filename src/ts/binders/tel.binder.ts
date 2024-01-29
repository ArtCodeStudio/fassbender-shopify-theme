import { Binder } from "@ribajs/core";

/**
 * tel
 */
export class TelBinder extends Binder<string> {
  static key = "tel";
  routine(el: HTMLElement, value: any) {
    el.setAttribute("href", "tel:" + value);
  }
}
