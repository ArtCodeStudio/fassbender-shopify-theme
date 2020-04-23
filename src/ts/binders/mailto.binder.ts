import { Binder } from "@ribajs/core";

/**
 * mailto
 */
export const mailtoBinder: Binder<string> = {
  name: "mailto",
  routine(el: HTMLElement, value: any) {
    el.setAttribute("href", "mailto:" + value);
  },
};
