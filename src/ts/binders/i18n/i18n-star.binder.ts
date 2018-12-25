import Debug from 'debug';
import { ITwoWayBinder, BinderWrapper, View, JQuery as $ } from '@ribajs/core';
import { LocalesRestService } from '@ribajs/i18n';
import { Utils } from '../../services/Utils';

// see star.binder.ts
export interface IBinderAttributeChangedEvent {
  detail: {
    name: string;
    oldValue: string;
    newValue: string;
    namespace: null,
  };
}

/**
 *
 */
export const i18nStarBinderWrapper: BinderWrapper = () => {
  const name = 'i18n-*';
  const binder: ITwoWayBinder<string> = {
    block: false,
    priority: 0,
    bind(el: HTMLUnknownElement) {
      const getElementData = () => {
        const customData: any = {};
        customData.$el = $(el);
        customData.type = customData.$el.prop('type');
        customData.tagName = customData.$el.prop('tagName');
        customData.contenteditable = customData.$el.attr('contenteditable') ? true : false;
        customData.isRadio = customData.tagName === 'INPUT' && customData.type === 'radio';
        return customData;
      };
      this.customData = getElementData();
      this.customData.i18n = new LocalesRestService(`https://next.artandcode.studio/shopify/api/themes/${(window as any).Shopify.theme.id}/locales`);
      this.customData.vars = {};
      this.customData.translateMePathString = null;
      this.customData.properties = [];
      this.customData.attributeName = this.args[0].toString();

      this.customData.applyTranslation = (local: string) => {
        if (!local) {
          // console.warn(`translation missing: "${langcode}.${this.customData.properties.join('.')}"`, local);
        }
        if (this.customData.attributeName === 'html') {
          this.customData.$el.html(local);
        }
        if (this.customData.attributeName === 'text') {
          this.customData.$el.text(local);
        }
        if (this.customData.attributeName === 'value') {
          // TODO support also: https://github.com/JumpLinkNetwork/tinybind/blob/master/src/binders/basic/value.binder.ts#L51
          if (this.customData.contenteditable) {
            el.innerHTML = local;
          } else {
            (el as HTMLInputElement).value = local;
          }
        }
        this.customData.$el.attr(this.customData.attributeName, local);
      };

      this.customData.parseVars = (_el: HTMLElement) => {
        // parse templates to vars
        const newVars = this.customData.i18n.parseTemplateVars(this.customData.$el);
        this.customData.vars = Utils.concat(true, this.customData.vars, newVars);

        // parse data attributes to vars
        // Vanilla works better than jquery data function?
        this.customData.vars = Utils.concat(true, this.customData.vars, _el.dataset);
        this.customData.vars = Utils.concat(true, this.customData.vars, this.customData.$el.data());

        // Parse templates wich have his own translations
        this.customData.langVars = this.customData.i18n.parseLocalVars(this.customData.$el);
      };

      this.customData.translate = (langcode?: string) => {
        // If language service is not ready do nothing
        if (!this.customData.i18n.ready) {
          return;
        }
        if (!langcode) {
          langcode = this.customData.i18n.getLangcode();
        }

        if (!langcode) {
          console.error('Langcode is requred', langcode);
          return;
        }

        // translate by using the already translated language variable
        if (this.customData.langVars && this.customData.langVars[langcode]) {
          return this.customData.applyTranslation(this.customData.langVars[langcode]);
        }

        if (!this.customData.properties) {
          // get the default translation if available
          if (this.customData.langVars && this.customData.langVars.default) {
            return this.customData.applyTranslation(this.customData.langVars.default);
          }
        }

        // translate by properies, e.g. de.cart.add
        return this.customData.i18n.get([langcode, ...this.customData.properties], this.customData.vars)
        .then((local: string) => {
          if (local) {
            return this.customData.applyTranslation(local);
          }
          // get the default translation if available
          if (this.customData.langVars && this.customData.langVars.default) {
            return this.customData.applyTranslation(this.customData.langVars.default);
          }
        })
        .catch((error: Error) => {
          console.error(error);
        });
      };

      this.customData.onAttributeChanged = (data: IBinderAttributeChangedEvent) => {
        if (data.detail.name.startsWith('data-')) {
          const varName = data.detail.name.slice(5);
          const newVar: any = {};
          newVar[varName] = data.detail.newValue;
          this.customData.i18n.debug('binder-changed newVar', newVar);
          this.customData.vars = Utils.concat(true, this.customData.vars, newVar);
          this.customData.translate();
        }
      };

      this.customData.onLanguageChanged = (langcode: string, initial: boolean) => {
        // Do not translate on inital language change, we use the ready event for this
        if (!initial) {
          this.customData.translate(langcode);
        }
      };

      /**
       * Initial stuff wee need to do after the language service is ready
       */
      this.customData.initOnReady = (langcode: string, translationNeeded: boolean) => {
        // Translate on translation service ready if needed
        if (translationNeeded) {
          this.customData.translate(langcode);
        }

        // Translate if language changes
        this.customData.i18n.event.on('changed', this.customData.onLanguageChanged);

        // Translate if binder attribute event is changed
        this.customData.$el.on('binder-changed', this.customData.onAttributeChanged);
      };
    },

    routine(el: HTMLElement, translateMePathString?: string) {
      if (this.customData.translateMePathString === null) {

        // if this is the first vall of this function
        this.customData.translateMePathString = translateMePathString;
        if (translateMePathString) {
          this.customData.properties = this.customData.translateMePathString.split('.');
        }

        this.customData.parseVars(el);

        // Translate if language is ready
        if (this.customData.i18n.ready) {
          this.customData.initOnReady(this.customData.i18n.getLangcode(), this.customData.i18n.currentLangcode !== this.customData.i18n.initalLangcode);
        } else {
          this.customData.i18n.event.on('ready', this.customData.initOnReady);
        }
      } else if (this.customData.translateMePathString !== translateMePathString) {
        // If translate string was changed
        this.customData.translateMePathString = translateMePathString;
        this.customData.properties = this.customData.translateMePathString.split('.');
        this.customData.parseVars(el);
        this.customData.translate();
      }
    },

    unbind() {
      this.customData.$el.off('binder-changed', this.customData.onAttributeChanged);
      this.customData.i18n.event.off('changed', this.customData.onLanguageChanged);
    },

  };

  return {
    binder,
    name,
  };
};
