import { Binding, Debug, RibaComponent } from '@ribajs/core';
import { Pjax } from '@ribajs/router';
import { shopifyExtension } from '@ribajs/shopify';
import template from './instagram.component.html';
import { IInstagramMedia, IInstagramResponse, InstagramService } from '../../services/instagram.service';

export interface IScope {
  media?: IInstagramMedia;
  instagramId?: string;
  openLinks: boolean;
  limit: number;
  onTap: InstagramComponent['onTap'];
}

export class InstagramComponent extends RibaComponent /*shopifyExtension.components.ShopifySectionComponent*/ {

  public static tagName: string = 'rv-instagram';

  static get observedAttributes() {
    return ['instagram-id', 'open-links', 'limit'];
  }

  protected debug = Debug('component:' + InstagramComponent.tagName);

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
  public onTap(event: JQuery.Event<HTMLElement, null>, scope: any, eventEl: HTMLElement, context: Binding) {
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
    .then((response: IInstagramResponse) => {
      this.scope.media = response.media;
      this.debug('response', response);
    })
    .catch((error: Error) => {
      this.debug(`Error: Can't load instagram media`, error);
    });
  }

  protected async beforeBind() {
    this.debug('beforeBind', this.scope);
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
