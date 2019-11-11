import { Binding, Component, Binder } from '@ribajs/core';
import { Pjax } from '@ribajs/router';
import template from './instagram.component.html';
import { InstagramMedia, InstagramResponse, InstagramService } from '@ribajs/shopify-tda';

export interface IScope {
  media?: InstagramMedia;
  instagramId?: string;
  openLinks: boolean;
  limit: number;
  onTap: InstagramComponent['onTap'];
}

export class InstagramComponent extends Component {

  public static tagName: string = 'rv-instagram';

  static get observedAttributes() {
    return ['instagram-id', 'open-links', 'limit'];
  }

  protected scope: IScope = {
    media: undefined,
    openLinks: false,
    limit: 0,
    instagramId: undefined,
    onTap: this.onTap,
  };

  private pjax = new Pjax('main');

  constructor(element?: HTMLElement) {
    super(element);
    this.init(InstagramComponent.observedAttributes);
  }

  /**
   * Just open the instagram url
   */
  public onTap(context: Binder<any>, event: JQuery.Event, scope: any, eventEl: HTMLElement, binding: Binding) {
    if (!this.scope.openLinks) {
      return;
    }
    const url = $(eventEl).first().data('url');
    this.pjax.goTo(url, true);
  }

  protected loadMedia() {
    if (!this.scope.instagramId) {
      return Promise.reject();
    }
    InstagramService.loadMedia(this.scope.instagramId, this.scope.limit)
    .then((response: InstagramResponse) => {
      this.scope.media = response.media;
    })
    .catch((error: Error) => {
      console.error(`Error: Can't load instagram media`, error);
    });
  }

  protected async beforeBind() {
    return this.loadMedia();
  }

  protected requiredAttributes() {
    return ['instagramId', 'limit'];
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      return null;
    } else {
      return template;
    }
  }
}
