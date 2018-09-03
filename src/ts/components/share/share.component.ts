import Debug from 'debug';
import $ from 'jquery';
import {
  RibaComponent,
} from '../../tinybind';
import template from './share.component.html';
import { DropdownService } from '../bs4/dropdown/dropdown.service';

interface IScope {
  title: string;
  text: string;
  url: string;
  label: string;
  share: ShareComponent['share'];
  isAndroid: boolean;
  isIos: boolean;
  isDesktop: boolean;
  shareUrls: any;
}

interface INavigatorShareParam {
  url: USVString;
  text: USVString;
  title: USVString;
}

declare global {
  // tslint:disable: interface-name
  interface Navigator { share: (data: INavigatorShareParam) => Promise<any>; }
}

/**
 * Component to share the a link
 * Inspired by:
 *  * https://github.com/nimiq/web-share-shim
 *  * http://webintents.org/
 *  * http://chriswren.github.io/native-social-interactions/
 *  * https://www.sharethis.com/platform/share-buttons/
 */
export class ShareComponent extends RibaComponent {

  public static tagName: string = 'rv-share';

  static get observedAttributes() {
    return ['title', 'text', 'url', 'label'];
  }

  protected $el: JQuery<HTMLElement>;

  protected debug = Debug('component:' + ShareComponent.tagName);

  protected dropdownService: DropdownService;

  protected get shareUrls() {
    const fbid = null;
    this.scope.url = encodeURIComponent(this.scope.url);
    this.scope.text = encodeURIComponent(this.scope.text);
    this.scope.title = encodeURIComponent(this.scope.title);
    const body = encodeURIComponent(this.scope.text + ' ' + this.scope.url);
    const redirectUri = encodeURIComponent(this.scope.url);
    const urls = {
      whatsapp: this.scope.isDesktop ? `https://api.whatsapp.com/send?text=${body}` : `whatsapp://send?text=${body}`,
      telegram: this.scope.isDesktop ? `https://telegram.me/share/url?url=${this.scope.url}&text=${body}` : `tg://msg?text=${body}`,
      facebook: this.scope.isDesktop ? `https://www.facebook.com/dialog/share?app_id=${fbid}&display=popup&href=${this.scope.url}&redirect_uri=${redirectUri}&quote=${body}` : `fb-messenger://share/?message=${body}`,
      email: `mailto:?subject=${this.scope.title}&body=${body}`,
      sms: `sms:?body=${body}`,
    };

    return urls;
  }

  protected scope: IScope = {
    title: $(document).find('title').text(),
    text: '',
    url: window.location.href,
    label: 'Share',
    share: this.share,
    isAndroid: navigator.userAgent.match(/Android/i) !== null,
    isIos: navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null,
    isDesktop: false,
    shareUrls: {},
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.dropdownService = new DropdownService(this.$el.find('.dropdown-toggle')[0] as HTMLButtonElement);
    this.debug('constructor', this);
    this.$el.on('click', this.share);
    this.init(ShareComponent.observedAttributes);
    this.scope.isDesktop = !(this.scope.isIos || this.scope.isAndroid); // on those two support "mobile deep links", so HTTP based fallback for all others.
  }

  public share(event: Event): Promise<any> {
    this.debug('share', this.scope);
    event.preventDefault();
    event.stopPropagation();
    // return this.dropdownService.toggle();
    if (navigator.share) {
      return navigator.share({
        title: this.scope.title,
        text: this.scope.text,
        url: this.scope.url || window.location.href,
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve();
        // TODO open menu
        this.toggle(event);
      });
    }
  }

  public toggle(event: Event) {
    this.debug('toggle');
  }

  public closeDropdowns() {
    this.debug('closeDropdowns');
    DropdownService.closeAll();
  }

  protected async beforeBind() {
    this.debug('beforeBind');
    // const $whatsapp = this.$el.find('.web-share-whatsapp');
    // const $facebook = this.$el.find('.web-share-facebook');
    // const $telegram = this.$el.find('.web-share-telegram');
    // const $email    = this.$el.find('.web-share-email');
    // const $sms      = this.$el.find('.web-share-sms');
    // const $copy     = this.$el.find('.web-share-copy');
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
    this.scope.shareUrls = this.shareUrls;
  }

  protected requiredAttributes() {
    return ['title', 'text', 'url', 'label'];
  }

  protected template() {
    return template;
  }
}
