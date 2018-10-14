import Debug from 'debug';
import { RibaComponent } from '../../tinybind';
import template from './instagram.component.html';
import { IInstagramMedia, IInstagramResponse, InstagramService } from '../../services/instagram.service';

export interface IScope {
  media?: IInstagramMedia;
  instagramId?: string;
}

export class InstagramComponent extends RibaComponent {

  public static tagName: string = 'rv-instagram';

  static get observedAttributes() {
    return ['instagram-id'];
  }

  protected instagramId = '17841406311268728';

  protected debug = Debug('component:' + InstagramComponent.tagName);

  protected scope: IScope = {
    media: undefined,
    instagramId: undefined,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.init(InstagramComponent.observedAttributes);
  }

  protected loadMedia() {
    if (!this.scope.instagramId) {
      return Promise.reject();
    }
    InstagramService.loadMedia(this.scope.instagramId)
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
    return ['instagramId'];
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
