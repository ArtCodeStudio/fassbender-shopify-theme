import { Component } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { JQuery as $ } from "@ribajs/jquery";
import { Linklist } from "@ribajs/shopify";
import template from "./shopify-filter.component.html";
import { hasChildNodesTrim } from "@ribajs/utils";

interface DataTemplate {
  directory: string;
  template: string;
  name: string;
  suffix: string | null;
}

interface Scope {
  linklist: Linklist;
  show: any;
  collectionUrl?: string;
  namespace?: string;
  dataTemplate?: DataTemplate;
  filterOpen: boolean;
  filter?: any;
  type: ShopifyFilterComponent["type"];
  storiesFilterBy: ShopifyFilterComponent["storiesFilterBy"];
  toggleFilter: ShopifyFilterComponent["toggleFilter"];
  scrollTo: ShopifyFilterComponent["scrollTo"];
  anyIsVisable: ShopifyFilterComponent["anyIsVisable"];
}

// WORKAROUND
const show = (
  filterHandle: string,
  namespace?: string,
  dataTemplate?: DataTemplate,
) => {
  if (!dataTemplate || !namespace) {
    return false;
  }
  // this.debug("show", filterHandle, namespace, dataTemplate);
  switch (filterHandle) {
    case "stories":
      // return namespace === 'blog' || shopifyTemplate.template === 'article'; // TODO if the user is on a artice and wants to go back to the list view we need do do some additional work
      return namespace === "blog";
    case "account":
      return (
        namespace === "cart" ||
        dataTemplate.directory === "customers" ||
        dataTemplate.template === "page.returns-form" ||
        dataTemplate.template === "page.privacy-settings"
      );
    case "legal-area":
      return dataTemplate.template === "page.legals";
    case "store":
      return (
        dataTemplate.template === "collection" ||
        dataTemplate.template === "product"
      );
    default:
      break;
  }
  return true;
};

/**
 * shopify-filter
 */
export class ShopifyFilterComponent extends Component {
  public static tagName = "shopify-filter";

  public _debug = false;

  private dispatcher = new EventDispatcher("main");

  static get observedAttributes() {
    return [
      "collection-url",
      "namespace",
      "linklist",
      "data-template",
      "filter",
    ];
  }

  protected requiredAttributes() {
    return ["namespace", "filter"];
  }

  public scope: Scope = {
    // TODO use rv-parent for that
    linklist: window.model.system.linklists.filter,
    filterOpen: true,
    collectionUrl: undefined,
    show: this.show,
    type: this.type,
    toggleFilter: this.toggleFilter,
    storiesFilterBy: this.storiesFilterBy,
    scrollTo: this.scrollTo,
    anyIsVisable: this.anyIsVisable,
  };

  constructor() {
    super();
    this.init(ShopifyFilterComponent.observedAttributes);
  }

  public openFilter() {
    this.scope.filterOpen = true;
  }

  public closeFilter() {
    this.scope.filterOpen = false;
  }

  public toggleFilter() {
    if (this.scope.filterOpen) {
      return this.closeFilter();
    }
    return this.openFilter();
  }

  public anyIsVisable(
    linklist?: Linklist,
    namespace?: string,
    dataTemplate?: DataTemplate,
  ) {
    this.debug("anyIsVisable this", this);
    let visable = false;
    if (!linklist) {
      return false;
    }
    for (const link of linklist.links) {
      // TODO fix callFormatterHandler problem
      // visable = visable || this.show(link.handle, namespace, dataTemplate);
      visable = visable || show(link.handle, namespace, dataTemplate);
    }
    this.debug("anyIsVisable", visable);
    return visable;
  }

  public show(
    filterHandle: string,
    namespace?: string,
    dataTemplate?: DataTemplate,
  ): boolean {
    if (!dataTemplate || !namespace) {
      return false;
    }
    this.debug("show", filterHandle, namespace, dataTemplate);
    return show(filterHandle, namespace, dataTemplate);
  }

  public type(filterHandle: string): string {
    switch (filterHandle) {
      case "stories":
        return "stories-filter";
      case "legal-area":
        return "scrollspy";
      default:
        return "routes";
    }
  }

  // public scrollTo(selector: string) {
  //   const offset = $(selector).offset();
  //   if (!offset) {
  //     console.warn(`Element with selector ${selector} not found`);
  //     return;
  //   }

  //   $("html, body").animate({
  //     scrollTop: offset.top,
  //     scrollLeft: offset.left,
  //   });
  // }

  public storiesFilterBy(
    handle: string,
    tagName: string,
    event?: Event,
    scope?: any,
    el?: HTMLLabelElement,
  ) {
    tagName = tagName.replace("#", "");

    // const self = this;

    // WORKAROUND because I can't check the middle radio button (wt..?!)
    if (el && el.parentNode) {
      const radioElement = el.parentNode.childNodes[1] as HTMLInputElement;
      radioElement.checked = true;
    }

    this.scope.filter[handle] = tagName;

    // TODO this as binder?
    $(".jumplink-article-list-item").each((i: number, curEl: HTMLElement) => {
      const $listItem = $(curEl);
      if (tagName === "all") {
        $listItem.removeAttr("hidden");
        return;
      }

      const data = $listItem.data();
      if (this.indexOfIgnoreCase(data.tags, tagName) <= -1) {
        // $listItem.hide();
        $listItem.attr("hidden", "hidden");
      } else {
        // $listItem.show();
        $listItem.removeAttr("hidden");
      }
    });

    // to data binding for filter
    // this.publish("filter", this.scope.filter, null);
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
  ) {
    if (attributeName === "filter") {
      if (newValue) {
        for (const handle in newValue) {
          if (newValue[handle]) {
            const tagName = newValue[handle];
            this.storiesFilterBy(
              handle,
              tagName,
              undefined,
              undefined,
              document.querySelectorAll(
                `label[for="${tagName}"]`,
              )[0] as HTMLLabelElement,
            );
          }
        }
      }
    }
  }

  protected async afterBind() {
    this.debug("afterBind", this.scope);
    if (this.scope.filter) {
      for (const handle in this.scope.filter) {
        this.debug("filter handle", handle);
        if (this.scope.filter[handle]) {
          const tagName = this.scope.filter[handle];
          this.storiesFilterBy(
            handle,
            tagName,
            undefined,
            undefined,
            document.querySelectorAll(
              `label[for="${tagName}"]`,
            )[0] as HTMLLabelElement,
          );
        }
      }
    }

    this.dispatcher.on("newPageReady", this.onNewPage, this);

    this.onNewPage();
  }

  protected onNewPage() {
    const vw = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0,
    );
    // MD
    if (vw <= 991) {
      this.closeFilter();
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

  private indexOfIgnoreCase(arr: string[], value: string) {
    value = value.toLowerCase();
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
      const str = arr[i];
      if (str.toLowerCase() === value) {
        index = i;
      }
    }
    return index;
  }
}
