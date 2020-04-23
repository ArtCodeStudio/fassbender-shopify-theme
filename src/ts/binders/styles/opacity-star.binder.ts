import { Binder } from "@ribajs/core";

export const opacityStarBinder: Binder<string> = {
  name: "opacity-*",
  routine(el: HTMLElement, value: string) {
    const opacity = parseFloat(this.args[0] as string);
    if (value) {
      el.style.opacity = opacity.toString();
    } else {
      el.style.opacity = "";
    }
  },
};
