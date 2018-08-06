import Debug from 'debug';
import { RibaComponent } from '../../tinybind';
import template from './instagram.component.html';
import { IInstagramMedia, IInstagramResponse, InstagramService } from '../../services/instagram.service';

export interface IScope {
  media?: IInstagramMedia;
}

export class InstagramComponent extends RibaComponent {

  public static tagName: string = 'rv-instagram';

  static get observedAttributes() {
    return [];
  }

  protected accessToken = 'EAAB8vuocl5sBAItyu8FN3A0BkerBP7TU4ZCq8m6jFGgtPGGcCOyQyvz0MicH47LdlBowjfZBas95lAhZBLXE15HM11CfAUdR1RKIPrKZB8zBIRCtrns5hsS5Dal8V0V8sOmA8sZAB3GNsAOH5CWV12tvzIAXEnxSpFKnROW0rTR7WH1yfg2Gp6ib4sAancbiODYQVZAfYU8gZDZD';
  protected instagramId = '17841406311268728';

  protected debug = Debug('component:' + InstagramComponent.tagName);

  protected scope: IScope = {
    media: undefined,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.loadMedia();
    this.init(InstagramComponent.observedAttributes);
  }

  protected loadMedia() {
    InstagramService.loadMedia(this.accessToken, this.instagramId)
    .then((response: IInstagramResponse) => {
      this.scope.media = response.media;
      this.debug('response', response);
    });
  }

  protected async beforeBind() {
    this.debug('beforeBind', this.scope);
  }

  protected requiredAttributes() {
    return ['media'];
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
