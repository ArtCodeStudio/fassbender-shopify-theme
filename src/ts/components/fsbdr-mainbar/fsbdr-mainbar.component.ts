import { Component } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { State } from "@ribajs/history";

interface Scope {
  assign: FsbdrMainbarComponent["assign"];
  open: FsbdrMainbarComponent["open"];
  close: FsbdrMainbarComponent["close"];
  menuOpen: boolean;
  filterOpen: boolean;
  dataset: any;
  [name: string]: any;
}

export class FsbdrMainbarComponent extends Component {
  public static tagName = "fsbdr-mainbar";

  protected autobind = true;

  public _debug = false;

  protected logoTop: HTMLElement | null = null;

  protected routerEvents = EventDispatcher.getInstance("main");

  static get observedAttributes() {
    return ["dataset", "filter"];
  }

  protected requiredAttributes() {
    return ["dataset"];
  }

  public scope: Scope = {
    assign: this.assign,
    open: this.open,
    close: this.close,
    menuOpen: false,
    filterOpen: true,
    dataset: {},
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(FsbdrMainbarComponent.observedAttributes);
  }

  protected addEventListeners() {
    this.routerEvents.on("newPageReady", this.onPageReady, this);
  }

  protected removeEventListeners() {
    this.routerEvents.off("newPageReady", this.onPageReady, this);
  }

  protected onPageReady(
    viewId: string,
    currentStatus: State,
    prevStatus: State,
    container: HTMLElement,
    newPageRawHTML: string,
    dataset: any,
    // isInit: boolean
  ) {
    this.scope.dataset = dataset;
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

  protected async beforeBind() {
    this.debug("beforeBind", this.scope);
    this.addEventListeners();
  }

  protected async afterBind() {
    this.logoTop = document.querySelector(".logo-text.logo-text-top");
    this.debug("afterBind", this.scope);
  }

  protected async attributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    await super.attributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    return null;
  }
}
