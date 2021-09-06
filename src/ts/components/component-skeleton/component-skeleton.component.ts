import { Component } from "@ribajs/core";

// import pugTemplate from './component-skeleton.component.pug';
import template from "./component-skeleton.component.html";

import { hasChildNodesTrim } from "@ribajs/utils";

interface Scope {
  hello?: string;
}

export class ComponentSkeletonComponent extends Component {
  public static tagName = "rv-component-skeleton";

  protected autobind = true;

  static get observedAttributes() {
    return ["hello"];
  }

  public scope: Scope = {
    hello: undefined,
  };

  constructor() {
    super();
    this.init(ComponentSkeletonComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected requiredAttributes() {
    return [];
  }

  protected async attributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.attributeChangedCallback(
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
