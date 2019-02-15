import {
  RibaComponent,
  JQuery,
  Debug,
} from '@ribajs/core';

// import pugTemplate from './component-skeleton.component.pug';
import template from './component-skeleton.component.html';

interface IScope {
  hello?: string;
}

export class ComponentSkeletonComponent extends RibaComponent {

  public static tagName: string = 'rv-component-skeleton';

  protected autobind = true;

  static get observedAttributes() {
    return ['hello'];
  }

  protected $el: JQuery<HTMLElement>;
  protected debug = Debug('component:' + ComponentSkeletonComponent.tagName);

  protected scope: IScope = {
    hello: undefined,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = JQuery(this.el);
    this.debug('constructor', this);
    this.init(ComponentSkeletonComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes)
    .then((view) => {
      return view;
    });
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

  protected attributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    super.attributeChangedCallback(attributeName, oldValue, newValue, namespace);
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  // protected template() {
  //   let template: string | null = null;
  //   // Only set the component template if there no childs already
  //   if (this.el.hasChildNodes()) {
  //     this.debug('Do not template, because element has child nodes');
  //     return template;
  //   } else {
  //     template = pugTemplate(this.scope);
  //     this.debug('Use template', template);
  //     return template;
  //   }
  // }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      return null;
    } else {
      return template;
    }
  }
}
