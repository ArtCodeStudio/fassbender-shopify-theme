import { VideoComponent } from "@ribajs/extras";

export class FsbdrVideoComponent extends VideoComponent {
  public static tagName = "fsbdr-video";

  protected autobind = true;

  constructor() {
    super();
  }

  protected requiredAttributes() {
    return ["video-src"];
  }
}
