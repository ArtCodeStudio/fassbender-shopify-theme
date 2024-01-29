import { Binder } from "@ribajs/core";

/**
 * mailto
 */
export class MailtoBinder extends Binder<string> {
  static key = "mailto";
  routine(el: HTMLElement, value: any) {
    el.setAttribute("href", "mailto:" + value);
  }
}
