import { Component, Debug } from '@ribajs/core';
import { JQuery as $ } from '@ribajs/jquery';
import template from './debug-bar.component.html';

export class DebugBarComponent extends Component {

  public static tagName: string = 'rv-debug-bar';

  protected debug = Debug('component:' + DebugBarComponent.tagName);

  static get observedAttributes() {
    return ['theme-name'];
  }

  protected scope: any = {
    hasPreviewBar: false,
    hasAdminBar: false,
    toggleBar: this.toggleBar,
    hide: this.hide,
    hidden: false,
  };

  protected autobind = true;

  protected $el: JQuery<HTMLElement>;

  protected $previewBar: JQuery<HTMLIFrameElement> | null = null;
  protected $adminBar: JQuery<HTMLIFrameElement> | null = null;

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);

    this.init(DebugBarComponent.observedAttributes);
  }

  public attributeChangedCallback(name: string, oldValue: any, newValue: any, namespace: string | null) {
    this.debug('attributeChangedCallback', name, oldValue, newValue, namespace);
    // injects the changed attributes to scope
    super.attributeChangedCallback(name, oldValue, newValue, namespace);
  }

  public hide() {
    this.scope.hidden = !this.scope.hidden;
  }

  public toggleBar(forceHide: boolean = false) {
    if (this.$previewBar && this.$previewBar.length > 0) {
      if (forceHide === true || this.elementIsVisable(this.$previewBar)) {
        this.debug('hide previewbar');
        this.$previewBar.attr('hidden', '');
        // this.$previewBar.hide();
      } else {
        this.debug('show previewbar');
        this.$previewBar.removeAttr('hidden');
        // this.$previewBar.show();
      }
    }

    if (this.$adminBar && this.$adminBar.length > 0) {
      if (forceHide === true || this.elementIsVisable(this.$adminBar)) {
        this.debug('hide adminbar');
        this.$adminBar.attr('hidden', '');
        // this.$adminBar.hide();
      } else {
        this.debug('show adminbar');
        this.$adminBar.removeAttr('hidden');
        // this.$adminBar.show();
      }
    }

  }

  protected elementIsVisable($el: JQuery<Element>) {
    return !this.elementIsHidden($el);
  }

  protected elementIsHidden($el: JQuery<Element>) {
    return $el.is(':hidden') || $el[0].hasAttribute('hidden') || $el.css('display') === 'none' || $el.css('visibility') === 'hidden';
  }

  protected async beforeBind(): Promise<any> {
    this.debug('beforeBind');
    this.$previewBar = $('#preview-bar-iframe') || null;
    this.$adminBar = $('#admin-bar-iframe') || null;

    if (this.$previewBar && this.$previewBar.length) {
      this.scope.hasPreviewBar = true;
      this.toggleBar(true);
    } else {
      this.$previewBar = null;
      this.scope.hasPreviewBar = false;
    }

    if (this.$adminBar && this.$adminBar.length) {
      this.scope.hasAdminBar = true;
      this.toggleBar(true);
    } else {
      this.$adminBar = null;
      this.scope.hasAdminBar = false;
    }
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
