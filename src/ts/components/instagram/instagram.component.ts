import Debug from 'debug';
import $ from 'jquery';
import { Utils } from '../../services/Utils';
import { RibaComponent } from '../../tinybind';
import template from './instagram.component.html';

export interface IInstagramMediaData {
  media_url: string;
  media_type: 'VIDEO' | 'IMAGE' | 'CAROUSEL_ALBUM';
  caption: string;
  id: string;
  comments_count: number;
  is_comment_enabled: boolean;
  like_count: number;
  permalink: string;
  timestamp: string;
}

export interface IInstagramMediaPaging {
  cursors: {
    after: string;
    before: string;
  };
}

export interface IInstagramMedia {
  data: IInstagramMediaData[];
  paging: IInstagramMediaPaging;
}

export interface IInstagramResponse {
  media: IInstagramMedia;
  id: string;
}

export interface IScope {
  media?: IInstagramMedia;
}

export class InstagramComponent extends RibaComponent {

  public static tagName: string = 'rv-instagram';

  static get observedAttributes() {
    return [];
  }

  protected baseUrl = 'https://graph.facebook.com/v3.1/';
  protected accessToken = 'EAAB8vuocl5sBAGcmaM4CuCIcm0CbVgkgTWaMzRcbjWJa5779T0x7hCTeBr8UqB7tgssU0znbXIdQtXcIYGALtZC9bbVFlQwHPLIpvnEJJa5sVEjPNMAajZAflJ9NT2wwQpV8nZCWqscK5SMNfav3RQZCgoZAaD3vl4vBNsZC8b1uKxyvoXPZC14AVG1z9L9BVStmovEJBBClgZDZD';
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
    // TODO create a server app wich wrappes the api requests
    const url = `${this.baseUrl}/${this.instagramId}`;
    $.getJSON(url, {
      fields: 'media{caption,comments_count,is_comment_enabled,like_count,media_type,media_url,permalink,timestamp,children{media_type,media_url}},media_count',
      access_token: this.accessToken,
    })
    .done((response: IInstagramResponse) => {
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
