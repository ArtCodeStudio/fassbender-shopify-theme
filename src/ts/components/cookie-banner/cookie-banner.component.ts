import Debug from 'debug';
import $ from 'jquery';
import {
  RibaComponent,
} from '@ribajs/core';
import template from './cookie-banner.component.html';

interface IScope {
  accept: CookieBannerComponent['accept'];
  close: CookieBannerComponent['close'];
  show: boolean;
}

export class CookieBannerComponent extends RibaComponent {

  public static tagName: string = 'rv-cookie-banner';

  protected cookieAcceptedString = 'cookieconsent_accepted';

  static get observedAttributes() {
    return ['title', 'text', 'url', 'label'];
  }

  protected debug = Debug('component:' + CookieBannerComponent.tagName);

  protected scope: IScope = {
    accept: this.accept,
    close: this.close,
    show: false,
  };

  protected get cookieAccepted(): boolean {
    if (document.cookie.indexOf(this.cookieAcceptedString + '=true') > -1) {
      return true;
    }
    return false;
  }

  protected set cookieAccepted(accepted: boolean) {
    document.cookie = `${this.cookieAcceptedString}=${accepted}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
    this.scope.show = !accepted;
  }

  constructor(element?: HTMLElement) {
    super(element);
    this.debug('constructor', this);
    this.scope.show = !this.cookieAccepted;
    this.init(CookieBannerComponent.observedAttributes);
  }

  public accept(event: Event) {
    this.debug('accept');
    this.cookieAccepted = true;
  }

  public close(event: Event) {
    this.debug('close');
    this.scope.show = false;
  }

  protected async beforeBind() {
    this.debug('beforeBind');
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
  }

  protected requiredAttributes() {
    return [];
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
