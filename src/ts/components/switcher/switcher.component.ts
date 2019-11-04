import {
  IBinder,
} from '@ribajs/core';
import { ILangcode, AI18nSwitcherComponent } from '@ribajs/i18n';
import { LocalesService } from '@ribajs/shopify-tda';

export class TdaI18nSwitcherComponent extends AI18nSwitcherComponent {

  public static tagName: string = 'tda-i18n-switcher';

  static get observedAttributes() {
    return [];
  }

  protected localesService = new LocalesService();

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
  public switch(langcode: ILangcode, context: IBinder<any>, event: Event) {
    return super.switch(langcode, context, event);
  }

  /**
   * Toggle language, makes only sense if you have only two languages
   * @param langcode
   * @param event
   */
  public toggle(context: IBinder<any>, event: Event) {
    return super.toggle(context, event);
  }

  protected setLangcode(langcode: string) {
    return super.setLangcode(langcode);
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
