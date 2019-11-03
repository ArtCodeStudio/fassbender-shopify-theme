import { Component, Debug } from '@ribajs/core';
import { JQuery as $ } from '@ribajs/jquery';
import template from './shopify-filter.component.html';

interface IScope {
  linklist: any;
  show: any;
  collectionUrl?: string;
  namespace?: string;
  type: any;
  storiesFilterBy: any;
  filter?: any;
  scrollTo: any;
}

/**
 * shopify-filter
 */
export class ShopifyFilterComponent extends Component {

  public static tagName: string = 'shopify-filter';

  protected debug = Debug('component:' + ShopifyFilterComponent.tagName);

  static get observedAttributes() {
    return ['collection-url', 'namespace', 'linklist', 'template', 'filter'];
  }

  protected scope: IScope = {
    linklist: window.model.system.linklists.filter,
    show: this.show,
    type: this.type,
    collectionUrl: undefined,
    storiesFilterBy: this.storiesFilterBy,
    scrollTo: this.scrollTo,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.debug('constructor', this);
    this.init(ShopifyFilterComponent.observedAttributes);
  }

  public show(filterHandle: string, namespace: string, shopifyTemplate: any, collectionUrl?: string): boolean {
    this.debug('show', filterHandle, namespace, shopifyTemplate);
    switch (filterHandle) {
      case 'stories':
        // return namespace === 'blog' || shopifyTemplate.template === 'article'; // TODO if the user is on a artice and wants to go back to the list view we need do do some additional work
        return namespace === 'blog';
      case 'account':
        return namespace === 'cart' || shopifyTemplate.directory === 'customers' || shopifyTemplate.template === 'page.returns-form' || shopifyTemplate.template === 'page.privacy-settings';
      case 'legal-area':
        return shopifyTemplate.template === 'page.legals';
      case 'store':
        return shopifyTemplate.template === 'collection' || shopifyTemplate.template === 'product';
      default:
        break;
    }
    return true;
  }

  public type(filterHandle: string): string {
    this.debug('type', filterHandle);
    switch (filterHandle) {
      case 'stories':
        return 'stories-filter';
      case 'legal-area':
        return 'scrollspy';
      default:
        return 'routes';
    }
  }

  public scrollTo(selector: string) {
    this.debug('scrollTo', selector);
    const offset = $(selector).offset();
    if (!offset) {
      console.warn(`Element with selector ${selector} not found`);
      return;
    }

    $('html, body').animate({
      scrollTop: offset.top,
      scrollLeft: offset.left,
    });
  }

  public storiesFilterBy(handle: string, tagName: string, _: any, event?: Event, scope?: any, el?: HTMLLabelElement) {
    tagName = tagName.replace('#', '');

    const self = this;

    // WORKAROUND because I can't check the middle radio button (wt..?!)
    if (el && el.parentNode) {
     const radioElement = (el.parentNode.childNodes[1] as HTMLInputElement);
     radioElement.checked = true;

     this.debug('checked', radioElement);
    }

    this.scope.filter[handle] = tagName;

    // TODO this as binder?
    $('.jumplink-article-list-item').each((i: number, curEl: HTMLElement) => {
      const $listItem = $(curEl);
      if (tagName === 'all') {
        $listItem.removeAttr('hidden');
        return;
      }

      const data = $listItem.data();
      if (this.indexOfIgnoreCase(data.tags, tagName) <= -1) {
        self.debug('hide', $listItem);
        // $listItem.hide();
        $listItem.attr('hidden', 'hidden');
      } else {
        self.debug('show', $listItem);
        // $listItem.show();
        $listItem.removeAttr('hidden');
      }
      self.debug('jumplink-article-list-item', data, $listItem);
    });

    // to data binding for filter
    this.publish('filter', this.scope.filter, null);

    this.debug('filterBy', handle, tagName);
  }

  protected requiredAttributes() {
    return ['namespace', 'template', 'filter'];
  }

  protected parsedAttributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    this.debug('parsedAttributeChangedCallback', attributeName, oldValue, newValue, namespace);
    if (attributeName === 'filter') {
      if (newValue) {
        for (const handle in newValue) {

          if (newValue.hasOwnProperty(handle)) {
            const tagName = newValue[handle];
            this.storiesFilterBy(handle, tagName, undefined, undefined, document.querySelectorAll(`label[for="${tagName}"]`)[0] as HTMLLabelElement);
          }
        }
      }

    }
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
    if (this.scope.filter) {
      for (const handle in this.scope.filter) {

        if (this.scope.filter.hasOwnProperty(handle)) {
          const tagName = this.scope.filter[handle];
          this.storiesFilterBy(handle, tagName, undefined, undefined, document.querySelectorAll(`label[for="${tagName}"]`)[0] as HTMLLabelElement);
        }
      }
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
