import Debug from 'debug';
import { IOneWayBinder, BinderWrapper } from '../../tinybind';
import { LocalsService } from '../../services/locals.service';
import $ from 'jquery';

/**
 *
 */
export const i18nBinderWrapper: BinderWrapper = () => {
  const name = 'i18n';
  const binder: IOneWayBinder<string> = (el: HTMLElement, translateMePathString: string) => {
    const i18n = new LocalsService();
    const $el = $(el);

    const langCode = i18n.getLangcode() as string;

    i18n.debug('translateMePathString', translateMePathString);
    const isHTMLString = translateMePathString.endsWith('html');

    const properties = translateMePathString.split('.');

    const translate = (langcode: string) => {
      i18n.get([langcode, ...properties])
      .then((local) => {
        i18n.debug('set', local);
        if (isHTMLString) {
          $el.html(local);
        } else {
          $el.text(local);
        }
      });
    };

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
