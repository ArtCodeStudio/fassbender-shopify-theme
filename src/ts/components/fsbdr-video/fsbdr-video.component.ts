import { VideoComponent } from "@ribajs/core";

export class FsbdrVideoComponent extends VideoComponent {
  public static tagName = "fsbdr-video";

  protected autobind = true;

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected requiredAttributes() {
    return ["mp4Src"];
  }
}
