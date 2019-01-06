import {
  Debug,
  Binder,
} from '@ribajs/core';
import { ILangcode, AI18nSwitcherComponent } from '@ribajs/i18n';
import { LocalesService } from '@ribajs/shopify-tda';

export class TdaI18nSwitcherComponent extends AI18nSwitcherComponent {

  public static tagName: string = 'tda-i18n-switcher';

  static get observedAttributes() {
    return [];
  }

  // protected $el: JQuery<HTMLElement>;

  protected localesService = new LocalesService();

  protected debug = Debug('component:' + TdaI18nSwitcherComponent.tagName);

  protected scope = {
    langcodes: <ILangcode[]> [],
    switch: this.switch,
    toggle: this.toggle,
    ready: <boolean> false,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.init(TdaI18nSwitcherComponent.observedAttributes);
  }

  /**
   * Switch to language by langcode
   * @param langcode
   * @param event
   */
  public switch(langcode: ILangcode, context: Binder<any>, event: Event) {
    return super.switch(langcode, context, event);
  }

  /**
   * Toggle language, makes only sense if you have only two languages
   * @param langcode
   * @param event
   */
  public toggle(context: Binder<any>, event: Event) {
    return super.toggle(context, event);
  }

  protected setLangcode(langcode: string) {
    this.debug('setLangcode', langcode);
    return super.setLangcode(langcode);
  }

  protected async beforeBind() {
    this.debug('beforeBind', this.scope);
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
  }

  protected requiredAttributes() {
    return [];
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    return null;
  }
}
