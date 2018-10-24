import Debug from 'debug';
import { ITwoWayBinder, BinderWrapper, View } from '../../tinybind';
import { LocalsService } from '../../services/locals.service';
import $ from 'jquery';
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
      this.customData.i18n = new LocalsService();
      this.customData.$el = $(el);
      this.customData.attributeName = this.args[0].toString();

      this.customData.translate = (langcode?: string) => {
        // If language service is not ready do nothing
        if (!this.customData.i18n.ready) {
          return;
        }
        if (!langcode) {
          langcode = this.customData.i18n.getLangcode();
        }
        return this.customData.i18n.get([langcode, ...this.customData.properties], this.customData.vars)
        .then((local: string) => {
          if (!local) {
            // console.warn(`translation missing: "${langcode}.${this.customData.properties.join('.')}"`, local);
            return local;
          }
          if (this.customData.attributeName === 'html') {
            this.customData.$el.html(local);
            return local;
          }
          if (this.customData.attributeName === 'text') {
            this.customData.$el.text(local);
            return local;
          }
          if (this.customData.attributeName === 'value') {
            // TODO support also: https://github.com/JumpLinkNetwork/tinybind/blob/master/src/binders/basic/value.binder.ts#L51
            if (this.customData.contenteditable) {
              el.innerHTML = local;
            } else {
              (el as HTMLInputElement).value = local;
            }
            return local;
          }
          this.customData.$el.attr(this.customData.attributeName, local);
          return local;
        })
        .then((local: string) => {
          if (this.customData.nested) {
            // this.customData.nested.unbind();
            this.customData.nested.update();
          }
          this.customData.nested = new View(el, this.view.models, this.view.options);
          this.customData.nested.bind();
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
      if (translateMePathString) {
        this.customData.translateMePathString = translateMePathString;
      }
      this.customData.properties = this.customData.translateMePathString.split('.');
      // this.customData.i18n.debug('translateMePathString', this.customData.translateMePathString);

      // parse templates to vars
      this.customData.vars = this.customData.i18n.parseTemplateVars(this.customData.$el);
      // parse data attributes to vars
      this.customData.vars = Utils.concat(true, this.customData.vars, this.customData.$el.data);
      // Translate if language is ready
      if (this.customData.i18n.ready) {
        this.customData.initOnReady(this.customData.i18n.getLangcode(), this.customData.i18n.currentLangcode !== this.customData.i18n.initalLangcode);
      } else {
        this.customData.i18n.event.on('ready', this.customData.initOnReady);
      }

    },

    update(models) {
      if (this.customData.nested) {
        this.customData.nested.update(models);
      }
    },

    unbind() {
      if ( this.customData.nested) {
        this.customData.nested.unbind();
        this.customData.bound = false;
      }
      this.customData.$el.off('binder-changed', this.customData.onAttributeChanged);
      this.customData.i18n.event.off('changed', this.customData.onLanguageChanged);
    },

  };

  return {
    binder,
    name,
  };
};
