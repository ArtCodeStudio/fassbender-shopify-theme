import {
  VideoComponent,
} from '@ribajs/core';

interface IScope {
  hello?: string;
}

export class FsbdrVideoComponent extends VideoComponent {

  public static tagName: string = 'fsbdr-video';

  protected autobind = true;

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected requiredAttributes() {
    return ['mp4Src'];
  }
}
