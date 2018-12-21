import Debug from 'debug';
import $ from 'jquery';
import {
  RibaComponent,
} from '@ribajs/core';
import template from './switcher.component.html';
import { LocalsService, ILangcode } from '../../../services/locals.service';

interface IScope {
  langcodes: ILangcode[];
  switch: I18nSwitcherComponent['switch'];
}

export class I18nSwitcherComponent extends RibaComponent {

  public static tagName: string = 'rv-i18n-switcher';

  static get observedAttributes() {
    return [];
  }

  protected $el: JQuery<HTMLElement>;

  protected localsService = new LocalsService();

  protected debug = Debug('component:' + I18nSwitcherComponent.tagName);

  protected scope: IScope = {
    langcodes: [],
    switch: this.switch,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.debug('constructor', this);

    if (this.localsService.ready) {
      this.initOnReady(this.localsService.getLangcode());
    } else {
      this.localsService.event.on('ready', (langcode: string, translationNeeded: boolean) => {
        this.initOnReady(langcode);
      });
    }

  }

  public async initOnReady(langcode: string) {
    // set avaible langcodes
    return this.localsService.getAvailableLangcodes()
    .then((langcodes) => {
      this.scope.langcodes = langcodes;
      // set active langcodes
      this.scope.langcodes.forEach((langCode) => {
        langCode.active = langCode.code === langcode;
      });
      return this.init(I18nSwitcherComponent.observedAttributes);
    })
    .then(() => {
      this.localsService.event.on('changed', (changedLangcode: string, initial: boolean) => {
        // Activate localcode and disable the other
        this.scope.langcodes.forEach((langCode) => {
          langCode.active = langCode.code === changedLangcode;
        });
      });
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
  }

  public switch(langcode: ILangcode, _: any, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.debug('switch', langcode);
    if (!langcode.active) {
      this.localsService.setLangcode(langcode.code);
    }
  }

  protected async beforeBind() {
    this.debug('beforeBind');
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
  }

  protected requiredAttributes() {
    return [];
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
