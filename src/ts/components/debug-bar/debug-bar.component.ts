import Debug from 'debug';
import $ from 'jquery';
import { RibaComponent } from '../../tinybind';
import template from './debug-bar.component.html';

export class DebugBarComponent extends RibaComponent {

  public static tagName: string = 'rv-debug-bar';

  protected debug = Debug('component:' + DebugBarComponent.tagName);

  static get observedAttributes() {
    return ['theme-name'];
  }

  protected scope: any = {
    hasPreviewBar: false,
    hasAdminBar: false,
    togglePreviewBar: this.togglePreviewBar,
    toggleAdminBar: this.toggleAdminBar,
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

  public togglePreviewBar(forceHide: boolean = false) {
    if (!this.$previewBar || this.$previewBar.length <= 0) {
      this.debug('No previewbar found');
      return;
    }

    if (forceHide === true || this.elementIsVisable(this.$previewBar)) {
      this.debug('hide previewbar');
      this.$previewBar.attr('hidden', '');
      this.$previewBar.hide();
    } else {
      this.debug('show previewbar');
      this.$previewBar.removeAttr('hidden');
      this.$previewBar.show();
    }
  }

  public toggleAdminBar(forceHide: boolean = false) {
    if (!this.$adminBar || this.$adminBar.length <= 0) {
      this.debug('No adminbar found');
      return;
    }

    if (forceHide === true || this.elementIsVisable(this.$adminBar)) {
      this.debug('hide adminbar');
      this.$adminBar.attr('hidden', '');
      this.$adminBar.hide();
    } else {
      this.debug('show adminbar');
      this.$adminBar.removeAttr('hidden');
      this.$adminBar.show();
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
      this.togglePreviewBar(true);
    } else {
      this.$previewBar = null;
      this.scope.hasPreviewBar = false;
    }

    if (this.$adminBar && this.$adminBar.length) {
      this.scope.hasAdminBar = true;
      this.toggleAdminBar(true);
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
