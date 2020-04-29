import { Component } from "@ribajs/core";
import { Pjax } from "@ribajs/router";
import { getViewportDimensions } from "@ribajs/utils/src/dom";
import {
  InstagramMedia,
  InstagramResponse,
  InstagramService,
} from "@ribajs/shopify-tda";
import template from "./instagram-scrollbar.component.html";

export interface Scope {
  instagramId?: string;
  openLinks: boolean;
  openUrl: string;
  limit: number;
  onScroll: InstagramScrollbarComponent["onScroll"];
  onTap: InstagramScrollbarComponent["onTap"];
  media?: InstagramMedia;
}

export class InstagramScrollbarComponent extends Component {
  public static tagName = "rv-instagram-scrollbar";

  static get observedAttributes() {
    return ["instagram-id", "open-links", "limit", "open-url"];
  }

  protected scope: Scope = {
    instagramId: undefined,
    openLinks: false,
    openUrl: "",
    limit: 0,
    onScroll: this.onScroll,
    onTap: this.onTap,
    media: undefined,
  };

  protected $el: JQuery<HTMLElement>;
  private $scollWith?: JQuery<HTMLElement>;

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.$scollWith = this.$el.find<HTMLElement>(".title-row");
    this.init(InstagramScrollbarComponent.observedAttributes);
  }

  /**
   * Just open the instagram url
   */
  public onTap(event: JQuery.Event, scope: any, eventEl: HTMLElement) {
    const pjax = Pjax.getInstance("main");
    if (this.scope.openUrl.length > 0) {
      pjax?.goTo(this.scope.openUrl);
    }
    if (this.scope.openLinks) {
      const url = $(eventEl).first().data("url");
      pjax?.goTo(url, true);
    }
  }

  /**
   * get instagram in the middle of the scrollbar elementinnerWidth
   * TODO not used
   */
  public onScroll(event: JQuery.Event, scope: any, eventEl: HTMLElement) {
    if (this.$scollWith) {
      const factor = 3;
      this.$scollWith.scrollLeft(eventEl.scrollLeft / factor);
    }
  }

  /**
   * Get width insite the scrollbar of the autoscolling title
   * TODO not used
   */
  protected getTitleWidth() {
    if (!this.$scollWith) {
      return 0;
    }
    return this.$scollWith.find(".title-col")[0].clientWidth || 0;
  }

  /**
   * Get width insite the scrollbar of the dragablle / scrollable area
   */
  protected getInstagramWidth() {
    if (!this.scope.media) {
      return;
    }
    const width =
      (getViewportDimensions().w / 3) * this.scope.media.data.length;
    return width;
  }

  protected loadMedia() {
    if (!this.scope.instagramId) {
      throw new Error("instagram id is required!");
    }
    InstagramService.loadMedia(this.scope.instagramId, this.scope.limit)
      .then((response: InstagramResponse) => {
        this.scope.media = response.media;
        return this.scope.media;
      })
      .catch((error) => {
        console.error(`Error: Can't load instagram media`, error);
      });
  }

  protected async beforeBind() {
    return this.loadMedia();
  }

  protected requiredAttributes() {
    return ["instagramId", "limit"];
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
