import { Component } from "@ribajs/core";

import template from "./fsbdr-mainbar.component.html";
import { hasChildNodesTrim } from "@ribajs/utils";

interface Scope {
  assign: FsbdrMainbarComponent["assign"];
  open: FsbdrMainbarComponent["open"];
  close: FsbdrMainbarComponent["close"];
  menuOpen: boolean;
  [name: string]: any;
}

export class FsbdrMainbarComponent extends Component {
  public static tagName = "fsbdr-mainbar";

  protected autobind = true;

  public _debug = false;

  protected logoTop: HTMLElement | null;

  static get observedAttributes() {
    return ["dataset", "filter"];
  }

  public scope: Scope = {
    assign: this.assign,
    open: this.open,
    close: this.close,
    menuOpen: false,
    filterOpen: true,
  };

  constructor() {
    super();
    this.logoTop = document.querySelector(".logo-text.logo-text-top");
    this.init(FsbdrMainbarComponent.observedAttributes);
  }

  public assign(key: string, value: any) {
    // event.preventDefault();
    // event.stopPropagation();
    this.scope[key] = value;
  }

  public open() {
    this.scope.menuOpen = true;
    if (this.logoTop) {
      this.logoTop.setAttribute("hidden", "hidden");
    }
  }

  public close() {
    this.scope.menuOpen = false;
    if (this.logoTop) {
      this.logoTop.removeAttribute("hidden");
    }
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected async afterBind() {
    this.logoTop = document.querySelector(".logo-text.logo-text-top");
    this.debug("afterBind", this.scope);
  }

  protected requiredAttributes() {
    return ["dataset"];
  }

  protected async attributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    await super.attributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
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
