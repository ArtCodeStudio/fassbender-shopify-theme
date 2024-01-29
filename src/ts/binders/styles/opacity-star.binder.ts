import { Binder } from "@ribajs/core";

export class OpacityStarBinder extends Binder<string> {
  static key = "opacity-*";
  routine(el: HTMLElement, value: string) {
    const opacity = parseFloat(this.args[0] as string);
    if (value) {
      el.style.opacity = opacity.toString();
    } else {
      el.style.opacity = "";
    }
  }
}
