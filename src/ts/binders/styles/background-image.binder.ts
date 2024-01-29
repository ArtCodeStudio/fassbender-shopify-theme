import { Binder } from "@ribajs/core";

export class BackgroundImageBinder extends Binder<string> {
  static key = "background-image";
  routine(el: HTMLElement, value: string) {
    if (value) {
      el.style.backgroundImage = "url(" + value + ")";
    } else {
      el.style.backgroundImage = "";
    }
  }
}
