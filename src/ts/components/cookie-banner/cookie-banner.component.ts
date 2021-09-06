import { Component } from "@ribajs/core";
import template from "./cookie-banner.component.html";
import { hasChildNodesTrim } from "@ribajs/utils";

interface Scope {
  accept: CookieBannerComponent["accept"];
  close: CookieBannerComponent["close"];
  show: boolean;
}

export class CookieBannerComponent extends Component {
  public static tagName = "rv-cookie-banner";

  protected cookieAcceptedString = "cookieconsent_accepted";

  static get observedAttributes() {
    return ["title", "text", "url", "label"];
  }

  public scope: Scope = {
    accept: this.accept,
    close: this.close,
    show: false,
  };

  protected get cookieAccepted(): boolean {
    if (document.cookie.indexOf(this.cookieAcceptedString + "=true") > -1) {
      return true;
    }
    return false;
  }

  protected set cookieAccepted(accepted: boolean) {
    document.cookie = `${this.cookieAcceptedString}=${accepted}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
    this.scope.show = !accepted;
  }

  constructor() {
    super();
    this.scope.show = !this.cookieAccepted;
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(CookieBannerComponent.observedAttributes);
  }

  public accept() {
    this.cookieAccepted = true;
  }

  public close() {
    this.scope.show = false;
  }

  protected requiredAttributes() {
    return [];
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
