import { Component } from "@ribajs/core";
import { JQuery as $ } from "@ribajs/jquery";
import template from "./debug-bar.component.html";
import { hasChildNodesTrim } from "@ribajs/utils";

export class DebugBarComponent extends Component {
  public static tagName = "rv-debug-bar";

  static get observedAttributes() {
    return ["theme-name"];
  }

  public scope: any = {
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

  constructor() {
    super();
    this.$el = $(this);

    this.init(DebugBarComponent.observedAttributes);
  }

  public async attributeChangedCallback(
    name: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    // injects the changed attributes to scope
    await super.attributeChangedCallback(name, oldValue, newValue, namespace);
  }

  public hide() {
    this.scope.hidden = !this.scope.hidden;
  }

  public toggleBar(forceHide = false) {
    if (this.$previewBar && this.$previewBar.length > 0) {
      if (forceHide === true || this.elementIsVisable(this.$previewBar)) {
        this.$previewBar.attr("hidden", "");
        // this.$previewBar.hide();
      } else {
        this.$previewBar.removeAttr("hidden");
        // this.$previewBar.show();
      }
    }

    if (this.$adminBar && this.$adminBar.length > 0) {
      if (forceHide === true || this.elementIsVisable(this.$adminBar)) {
        this.$adminBar.attr("hidden", "");
        // this.$adminBar.hide();
      } else {
        this.$adminBar.removeAttr("hidden");
        // this.$adminBar.show();
      }
    }
  }

  protected elementIsVisable($el: JQuery<Element>) {
    return !this.elementIsHidden($el);
  }

  protected elementIsHidden($el: JQuery<Element>) {
    return (
      $el.is(":hidden") ||
      $el[0].hasAttribute("hidden") ||
      $el.css("display") === "none" ||
      $el.css("visibility") === "hidden"
    );
  }

  protected async beforeBind(): Promise<any> {
    this.$previewBar = $("#preview-bar-iframe") || null;
    this.$adminBar = $("#admin-bar-iframe") || null;

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
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
