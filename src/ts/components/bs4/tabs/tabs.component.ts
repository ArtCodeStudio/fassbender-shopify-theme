import { Component } from "@ribajs/core";

export class TabsComponent extends Component {
  public static tagName = "bs4-tabs-deprecated";

  protected scope: any = {};

  private tabs: NodeListOf<HTMLAnchorElement>;
  private tabPanes: NodeListOf<HTMLElement>;
  private scrollable: HTMLElement | null;
  private tabsSameHeight = true;

  static get observedAttributes() {
    return [];
  }

  protected async beforeBind() {
    await super.beforeBind();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    this.tabs = this.el.querySelectorAll<HTMLAnchorElement>(".nav-link");
    this.tabPanes = this.el.querySelectorAll<HTMLElement>(".tab-pane");
    this.scrollable = this.el.querySelector<HTMLElement>("[scrollable]");

    for (const tab of this.tabs) {
      tab.addEventListener("click", (event: Event) => {
        event.preventDefault();
        this.activate(tab);
      });

      tab.addEventListener("shown.bs.tab", () => {
        if (this.scrollable) {
          const tabScrollPosition = tab.getBoundingClientRect();
          const scrollLeftTo =
            (this.scrollable.scrollLeft || 0) + tabScrollPosition.left;
          this.scrollable.scrollLeft = scrollLeftTo;
        }
      });
    }

    this.activate(this.tabs[0]);

    if (this.tabsSameHeight) {
      window.addEventListener(
        "resize",
        () => {
          this.setHeight();
        },
        { passive: true }
      );
    }
  }

  constructor(element?: HTMLElement) {
    super(element);
    console.warn("Depricated use tabs module from bs4 module");
    this.tabs = this.el.querySelectorAll<HTMLAnchorElement>(".nav-link");
    this.tabPanes = this.el.querySelectorAll<HTMLElement>(".tab-pane");
    this.scrollable = this.el.querySelector<HTMLElement>("[scrollable]");
    this.init(TabsComponent.observedAttributes);
  }

  /**
   * Make all tabs panes as height as the heighest tab pane
   */
  public setHeight() {
    let heigest = 0;
    for (const tabPane of this.tabPanes) {
      tabPane.style.height = "auto";
      const height = parseFloat(
        getComputedStyle(tabPane, null).height.replace("px", "")
      );
      if (height > heigest) {
        heigest = height;
      }
    }

    for (const tabPane of this.tabPanes) {
      tabPane.style.height = heigest + "px";
    }
    // this.tabPanes.each(function () {
    //   const tabPane = $(this);
    //   tabPane.css("height", "auto");
    //   const height = tabPane.height() || 0;
    //   if (height > heigest) {
    //     heigest = height;
    //   }
    // });
    // this.tabPanes.each(function () {
    //   const tabPane = $(this);
    //   tabPane.css("height", heigest + "px");
    // });
  }

  public deactivateAll() {
    for (const tab of this.tabs) {
      tab.classList.remove("active");
    }

    for (const tabPane of this.tabPanes) {
      tabPane.classList.remove("active");
      tabPane.classList.remove("show");
    }

    // this.tabs.each(function () {
    //   const tab = $(this);
    //   tab.removeClass("active");
    // });
    // this.tabPanes.each(function () {
    //   const tabPane = $(this);
    //   tabPane.removeClass("active show");
    // });
  }

  public activate(tab: HTMLAnchorElement) {
    const targetSelector = tab.getAttribute("href");
    if (targetSelector) {
      const targets = this.el.querySelectorAll(targetSelector);
      this.deactivateAll();
      for (const target of targets) {
        target.classList.add("active");
        setTimeout(() => {
          target.classList.add("show");
          tab.classList.add("active");
          target.dispatchEvent(new CustomEvent("shown.bs.tab"));
          tab.dispatchEvent(new CustomEvent("shown.bs.tab"));
        }, 0);
      }
    }
  }

  protected async afterBind(): Promise<any> {
    this.setHeight();
  }

  protected template() {
    return null;
  }
}
