import { Binder } from "@ribajs/core";

export class BackgroundColorStarBinder extends Binder<string> {
  static key = "background-color-*";
  routine(el: HTMLElement, value: string) {
    const color = this.args[0].toString() || "transparent";
    if (value) {
      el.style.backgroundColor = color;
    } else {
      el.style.backgroundColor = "";
    }
  }
}
