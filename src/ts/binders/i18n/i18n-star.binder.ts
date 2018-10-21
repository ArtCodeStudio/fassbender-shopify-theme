import Debug from 'debug';
import { ITwoWayBinder, BinderWrapper, View } from '../../tinybind';
import { LocalsService } from '../../services/locals.service';
import $ from 'jquery';

/**
 *
 */
export const i18nStarBinderWrapper: BinderWrapper = () => {
  const name = 'i18n-*';
  const binder: ITwoWayBinder<string> = {
    block: true,
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

      this.customData.translate = (langcode: string) => {
        return this.customData.i18n.get([langcode, ...this.customData.properties])
        .then((local: string) => {
          this.customData.i18n.debug('set', local);
          local = this.customData.i18n.setTranslateStringVars(local, this.customData.vars);
          if (!local) {
            return local;
          }
          if (this.customData.attributeName === 'html') {
            this.customData.$el.html(local);
            return;
          }
          if (this.customData.attributeName === 'text') {
            this.customData.$el.text(local);
            return;
          }
          if (this.customData.attributeName === 'value') {
            // TODO support also: https://github.com/JumpLinkNetwork/tinybind/blob/master/src/binders/basic/value.binder.ts#L51
            if (this.customData.contenteditable) {
              el.innerHTML = local;
            } else {
              (el as HTMLInputElement).value = local;
            }
            return;
          }
          this.customData.$el.attr(this.customData.attributeName, local);
          return;
        });
      };

      // const langCode = i18n.getLangcode() as string;
      // translate(langCode);

      this.customData.i18n.event.on('changed', (langcode: string) => {
        this.customData.translate(langcode)
        .then(() => {
          if (this.customData.nested) {
            // this.customData.nested.unbind();
          } else {
            this.customData.nested = new View(el, this.view.models, this.view.options);
            this.customData.nested.bind();
          }
        });
      });

      this.customData.i18n.debug('ready');
    },

    routine(el: HTMLElement, translateMePathString: string) {
      this.customData.translateMePathString = translateMePathString;
      this.customData.properties = this.customData.translateMePathString.split('.');
      this.customData.i18n.debug('translateMePathString', this.customData.translateMePathString);
      this.customData.vars = this.customData.i18n.parseTemplateVars(this.customData.$el);
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
    },

  };

  return {
    binder,
    name,
  };
};
