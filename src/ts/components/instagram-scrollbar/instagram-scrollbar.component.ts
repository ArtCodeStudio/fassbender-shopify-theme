import Debug from 'debug';
import { Pjax, Prefetch, Binding, shopifyExtension } from '../../tinybind';
import $ from '../../jquery';
import { IInstagramMedia, IInstagramResponse, InstagramService } from '../../services/instagram.service';
import template from './instagram-scrollbar.component.html';

export interface IScope {
  onScroll: InstagramScrollbarComponent['onScroll'];
  onTap: InstagramScrollbarComponent['onTap'];
  onMouseenter: InstagramScrollbarComponent['onMouseenter'];
  media?: IInstagramMedia;
}

export class InstagramScrollbarComponent extends shopifyExtension.components.ShopifySectionComponent {

  public static tagName: string = 'rv-instagram-scrollbar';

  static get observedAttributes() {
    return [];
  }

  protected accessToken = 'EAAB8vuocl5sBAMfnJbSmXIlmlUMgWJLqDJeWEZAL1MGWcbZChFLHgMgfQqjN1KnAOdZBZBOEWtJXKnJMZC8nu4ZAw1Os9QsaVmrhsfGyi2ESYrcabNM2tCnEoozweliqVOqzMNTZCQzJVlni5jmhhZAQXHaxeWuyzMoVD4U2hnzsewuzD8GVvYZCW6pJVgvdBt0yxwYeZBqWKjlAZDZD';
  protected instagramId = '17841406311268728';

  protected debug = Debug('component:' + InstagramScrollbarComponent.tagName);

  protected scope: any = {
    onScroll: this.onScroll,
    onTap: this.onTap,
    onMouseenter: this.onMouseenter,
    media: undefined,
  };

  protected $el: JQuery<HTMLElement>;

  // private model: any = {};
  private pjax = new Pjax('main');
  // private prefetch = new Prefetch();
  // private $instagrams?: JQuery<HTMLElement>;
  private $scollWith?: JQuery<HTMLElement>;

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    // this.$instagrams = this.$el.find('.content-box');
    this.$scollWith = this.$el.find('.title-row');
    this.loadMedia();
    this.init(InstagramScrollbarComponent.observedAttributes);
  }

  /**
   * Just open the instagram url
   */
  public onTap(event: JQuery.Event<HTMLElement, null>, scope: any, eventEl: HTMLElement, context: Binding) {
    const url = $(eventEl).data('url');
    this.pjax.goTo(url);
  }

  /**
   * Preload instagram on mouse over
   */
  public onMouseenter(event: JQuery.Event<HTMLElement>, scope: any, eventEl: HTMLElement, context: Binding) {
    this.debug('onMouseenter');
    // const url = $(eventEl).data('url');
    // this.prefetch.onLinkEnter(event, url);
  }

  /**
   * get instagram in the middle of the scrollbar elementinnerWidth
   */
  public onScroll(event: JQuery.Event<HTMLElement>, scope: any, eventEl: HTMLElement, context: Binding) {
    const self = this;
    // this.debug('onScroll', eventEl.scrollLeft);
    if (this.$scollWith) {
      // const factor = this.getInstagramWidth() / this.getTitleWidth();
      // this.debug('factor', factor, this.getTitleWidth(), this.getInstagramWidth());
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
    const width = (document.documentElement.clientWidth / 3) * (this.scope.media.data.length);
    return width;
  }

  protected loadMedia() {
    InstagramService.loadMedia(this.accessToken, this.instagramId, 9)
    .then((response: IInstagramResponse) => {
      this.scope.media = response.media;
      this.debug('response', response);
    })
    .catch((error) => {
      this.debug(`Error: Can't load instagram media`, error);
    });
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
