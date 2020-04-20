import { Component } from "@ribajs/core";
import { JQuery as $ } from "@ribajs/jquery";

export class TabsComponent extends Component {
  public static tagName = "bs4-tabs";

  protected scope: any = {};

  private $el: JQuery<HTMLElement>;
  private $tabs: JQuery<HTMLElement>;
  private $tabPanes: JQuery<HTMLElement>;
  private $scrollable: JQuery<HTMLElement>;
  private tabsSameHeight = true;

  static get observedAttributes() {
    return [];
  }

  constructor(element?: HTMLElement) {
    super(element);
    console.warn("Depricated use tabs module from bs4 module");
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    this.$el = $(this.el);
    this.$tabs = this.$el.find(".nav-link");
    this.$tabPanes = this.$el.find(".tab-pane");
    this.$scrollable = this.$el.find("[scrollable]");

    this.$tabs.on("click", function (event) {
      event.preventDefault();
      const $tab = $(this);
      self.activate($tab);
    });

    this.$tabs.off("shown.bs.tab").on("shown.bs.tab", (event) => {
      const $tab = $(event.target);
      if (this.$scrollable.length) {
        const tabScrollPosition = $tab[0].getBoundingClientRect();
        const scrollLeftTo =
          this.$scrollable.scrollLeft() || 0 + tabScrollPosition.left;
        this.$scrollable.animate({ scrollLeft: scrollLeftTo }, "slow");
      }
    });

    this.activate(this.$tabs.first());

    if (this.tabsSameHeight) {
      $(window).on("resize", () => {
        this.setHeight();
      });
    }

    this.init(TabsComponent.observedAttributes);
  }

  /**
   * Make all tabs panes as height as the heighest tab pane
   */
  public setHeight() {
    let heigest = 0;
    this.$tabPanes.each(function () {
      const $tabPane = $(this);
      $tabPane.css("height", "auto");
      const height = $tabPane.height() || 0;
      if (height > heigest) {
        heigest = height;
      }
    });
    this.$tabPanes.each(function () {
      const $tabPane = $(this);
      $tabPane.css("height", heigest + "px");
    });
  }

  public deactivateAll() {
    this.$tabs.each(function () {
      const $tab = $(this);
      $tab.removeClass("active");
    });
    this.$tabPanes.each(function () {
      const $tabPane = $(this);
      $tabPane.removeClass("active show");
    });
  }

  public activate($tab: JQuery<HTMLElement>) {
    const target = $tab.attr("href");
    if (target) {
      const $target = this.$el.find(target);
      this.deactivateAll();
      $target.addClass("active");
      setTimeout(() => {
        $target.addClass("show");
        $tab.addClass("active");
        $target.trigger("shown.bs.tab");
        $tab.trigger("shown.bs.tab");
      }, 0);
    }
  }

  protected async afterBind(): Promise<any> {
    this.setHeight();
  }

  protected template() {
    return null;
  }
}
