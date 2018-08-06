import Debug from 'debug';
import { Utils } from './Utils';

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

export class InstagramService {

  public static baseUrl = 'https://graph.facebook.com/v3.1/';

  public static async loadMedia(accessToken: string, instagramId: string, limit = 0) {
    // TODO create a server app wich wrappes the api requests
    const url = `${this.baseUrl}/${instagramId}`;

    const mediaProperty = limit > 0 ? `media.limit(${limit})` : 'media';

    const data = {
      fields: `${mediaProperty}{caption,comments_count,is_comment_enabled,like_count,media_type,media_url,permalink,timestamp,children{media_type,media_url}},media_count`,
      access_token: accessToken,
    };

    return Utils.getJSON(url, data);
  }

}
