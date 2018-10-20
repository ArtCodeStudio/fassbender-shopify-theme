import Debug from 'debug';
import { IOneWayBinder, BinderWrapper } from '../../tinybind';
import { LocalsService } from '../../services/locals.service';
import $ from 'jquery';

/**
 *
 */
export const i18nStarBinderWrapper: BinderWrapper = () => {
  const name = 'i18n-*';
  const binder: IOneWayBinder<string> = function(el: HTMLElement, translateMePathString: string) {
    const i18n = new LocalsService();
    const $el = $(el);
    const attributeName = this.args[0].toString();
    i18n.debug('translateMePathString', translateMePathString);

    const properties = translateMePathString.split('.');

    const translate = (langcode: string) => {
      i18n.get([langcode, ...properties])
      .then((local) => {
        i18n.debug('set', local);
        if (attributeName === 'html') {
          $el.html(local);
          return;
        }
        if (attributeName === 'text') {
          $el.text(local);
          return;
        }
        $el.attr(attributeName, local);
        return;
      });
    };

    // const langCode = i18n.getLangcode() as string;
    // translate(langCode);

    i18n.event.on('changed', (langcode: string) => {
      translate(langcode);
    });

    i18n.debug('ready');
  };
  return {
    binder,
    name,
  };
};
