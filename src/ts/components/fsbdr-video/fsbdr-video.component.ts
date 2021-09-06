import { VideoComponent } from "@ribajs/core";

export class FsbdrVideoComponent extends VideoComponent {
  public static tagName = "fsbdr-video";

  protected autobind = true;

  constructor() {
    super();
  }

  protected requiredAttributes() {
    return ["mp4Src"];
  }
}
