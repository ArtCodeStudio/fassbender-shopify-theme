import { Component } from "@ribajs/core";

export class FsbdrPaginationComponent extends Component {
  public static tagName = "fsbdr-pagination";

  static get observedAttributes() {
    return [];
  }

  public scope = {};

  protected autobind = true;

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(FsbdrPaginationComponent.observedAttributes);
  }

  protected template() {
    return null;
  }
}
