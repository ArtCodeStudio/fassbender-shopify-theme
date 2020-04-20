import { Binder } from "@ribajs/core";

/**
 * tel
 */
export const telBinder: Binder<string> = {
  name: "tel",
  routine(el: HTMLElement, value: any) {
    $(el).attr("href", "tel:" + value);
  },
};
