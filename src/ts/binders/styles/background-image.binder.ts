import { Binder } from "@ribajs/core";

export const backgroundImageBinder: Binder<string> = {
  name: "background-image",
  routine(el: HTMLElement, value: string) {
    if (value) {
      el.style.backgroundImage = "url(" + value + ")";
    } else {
      el.style.backgroundImage = "";
    }
  },
};
