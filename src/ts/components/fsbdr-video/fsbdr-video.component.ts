import {
  VideoComponent,
  Debug,
} from '@ribajs/core';

interface IScope {
  hello?: string;
}

export class FsbdrVideoComponent extends VideoComponent {

  public static tagName: string = 'fsbdr-video';

  protected autobind = true;

  protected debug = Debug('component:' + FsbdrVideoComponent.tagName);

  constructor(element?: HTMLElement) {
    super(element);
    this.debug('constructor', this);
  }

  protected requiredAttributes() {
    return ['mp4Src'];
  }
}
