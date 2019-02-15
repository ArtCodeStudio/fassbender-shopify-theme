import {
  RibaComponent,
  JQuery,
  Debug,
  Binder,
} from '@ribajs/core';

import template from './fsbdr-mainbar.component.html';

interface IScope {
  assign: FsbdrMainbarComponent['assign'];
  open: FsbdrMainbarComponent['open'];
  close: FsbdrMainbarComponent['close'];
  menuOpen: boolean;
  [name: string]: any;
}

export class FsbdrMainbarComponent extends RibaComponent {

  public static tagName: string = 'fsbdr-mainbar';

  protected autobind = true;

  protected $logoTop: JQuery<HTMLElement>;

  static get observedAttributes() {
    return [];
  }

  protected $el: JQuery<HTMLElement>;
  protected debug = Debug('component:' + FsbdrMainbarComponent.tagName);

  protected scope: IScope = {
    assign: this.assign,
    open: this.open,
    close: this.close,
    menuOpen: false,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = JQuery(this.el);
    this.$logoTop = JQuery('.logo-text.logo-text-top');
    this.debug('constructor', this);
    this.init(FsbdrMainbarComponent.observedAttributes);
  }

  public assign(key: string, value: any, context: Binder<any>, event: Event) {
    // event.preventDefault();
    // event.stopPropagation();
    this.scope[key] = value;
  }

  public open() {
    this.scope.menuOpen = true;
    this.$logoTop.hide();
  }

  public close() {
    this.scope.menuOpen = false;
    this.$logoTop.show();
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
    this.$logoTop = JQuery('.logo-text.logo-text-top');
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
