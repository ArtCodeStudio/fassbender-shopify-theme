import Debug from 'debug';
import { Pjax, Prefetch, Binding, shopifyExtension } from '../../tinybind';
import $ from '../../jquery';
import { Utils } from '../../services/Utils';
import { IInstagramMedia, IInstagramResponse, InstagramService } from '../../services/instagram.service';
import template from './instagram-scrollbar.component.html';

export interface IScope {
  onScroll: InstagramScrollbarComponent['onScroll'];
  onTap: InstagramScrollbarComponent['onTap'];
  media?: IInstagramMedia;
}

export class InstagramScrollbarComponent extends shopifyExtension.components.ShopifySectionComponent {

  public static tagName: string = 'rv-instagram-scrollbar';

  static get observedAttributes() {
    return ['instagram-id'];
  }

  protected debug = Debug('component:' + InstagramScrollbarComponent.tagName);

  protected scope: any = {
    instagramId: undefined,
    onScroll: this.onScroll,
    onTap: this.onTap,
    media: undefined,
  };

  protected $el: JQuery<HTMLElement>;
  private pjax = new Pjax('main');
  private $scollWith?: JQuery<HTMLElement>;

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.$scollWith = this.$el.find('.title-row');
    this.init(InstagramScrollbarComponent.observedAttributes);
  }

  /**
   * Just open the instagram url
   */
  public onTap(event: JQuery.Event<HTMLElement, null>, scope: any, eventEl: HTMLElement, context: Binding) {
    const url = $(eventEl).first().data('url');
    this.pjax.goTo(url, true);
  }

  /**
   * get instagram in the middle of the scrollbar elementinnerWidth
   */
  public onScroll(event: JQuery.Event<HTMLElement>, scope: any, eventEl: HTMLElement, context: Binding) {
    const self = this;
    // this.debug('onScroll', eventEl.scrollLeft);
    if (this.$scollWith) {
      const factor = 3;
      this.$scollWith.scrollLeft(eventEl.scrollLeft / factor);
    }
  }

  /**
   * Get width insite the scrollbar of the autoscolling title
   */
  protected getTitleWidth() {
    if (!this.$scollWith) {
      return 0;
    }
    return this.$scollWith.find('.title-col')[0].clientWidth || 0;
  }

  /**
   * Get width insite the scrollbar of the dragablle / scrollable area
   */
  protected getInstagramWidth() {
    const width = (Utils.getViewportDimensions().w / 3) * (this.scope.media.data.length);
    return width;
  }

  protected loadMedia() {
    InstagramService.loadMedia(this.scope.instagramId, 9)
    .then((response: IInstagramResponse) => {
      this.scope.media = response.media;
      this.debug('response', response);
    })
    .catch((error) => {
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
