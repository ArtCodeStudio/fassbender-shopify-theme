import { Component } from "@ribajs/core";
import { Pjax } from "@ribajs/router";
import template from "./instagram.component.html";
import { InstagramMedia, InstagramApiService } from "@ribajs/shopify-tda";
import { hasChildNodesTrim } from "@ribajs/utils";

export interface Scope {
  media?: InstagramMedia;
  instagramId?: string;
  openLinks: boolean;
  limit: number;
  onTap: InstagramComponent["onTap"];
}

export class InstagramComponent extends Component {
  public static tagName = "rv-instagram";

  static get observedAttributes() {
    return ["instagram-id", "open-links", "limit"];
  }

  public scope: Scope = {
    media: undefined,
    openLinks: false,
    limit: 0,
    instagramId: undefined,
    onTap: this.onTap,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(InstagramComponent.observedAttributes);
  }

  /**
   * Just open the instagram url
   */
  public onTap(event: JQuery.Event, scope: any, eventEl: HTMLElement) {
    if (!this.scope.openLinks) {
      return;
    }
    const url = $(eventEl).first().data("url");
    const pjax = Pjax.getInstance("main");
    pjax?.goTo(url, true);
  }

  protected loadMedia() {
    if (!this.scope.instagramId) {
      return Promise.reject();
    }
    InstagramApiService.getSingleton()
      .media(this.scope.instagramId, this.scope.limit)
      .then((response) => {
        this.scope.media = response;
      })
      .catch((error: Error) => {
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
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
