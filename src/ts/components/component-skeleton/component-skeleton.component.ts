import {
  Component,
} from '@ribajs/core';

// import pugTemplate from './component-skeleton.component.pug';
import template from './component-skeleton.component.html';

interface IScope {
  hello?: string;
}

export class ComponentSkeletonComponent extends Component {

  public static tagName: string = 'rv-component-skeleton';

  protected autobind = true;

  static get observedAttributes() {
    return ['hello'];
  }

  protected scope: IScope = {
    hello: undefined,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.init(ComponentSkeletonComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes)
    .then((view) => {
      return view;
    });
  }

  protected requiredAttributes() {
    return [];
  }

  protected attributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    super.attributeChangedCallback(attributeName, oldValue, newValue, namespace);
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
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
