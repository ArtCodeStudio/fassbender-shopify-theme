import Debug from 'debug';
import { EventDispatcher, getJSON, Utils } from '../tinybind';
import { TheDeveloperAppService } from './the-developer-app.service';
import $ from 'jquery';

export interface ITheme {
  handle: 'null';
  id: number;
  name: string;
  role: 'main' | 'unpublished' | 'demo';
  style: {
    handle: null;
    id: null;
  };
  theme_store_id: null;
}

export interface ILangcode {
  code: string;
  active: boolean;
}

// TODO move to the-developer-app modul
export class LocalsService {
  public static baseUrl = TheDeveloperAppService.baseUrl + '/shopify/api/themes';
  public static instance: {[themeID: number]: LocalsService} = {};
  public debug = Debug('the-developer-app:i18n');
  public event = new EventDispatcher('i18n');

  public locals: any = {};
  private theme: ITheme;

  constructor(theme?: ITheme, autodetectLanguage: boolean = true) {
    if (!theme) {
      theme = (window as any).Shopify.theme;
    }

    this.theme = theme as ITheme;

    if (!this.theme) {
      throw new Error(`theme object is requred!`);
    }

    if (LocalsService.instance && LocalsService.instance[this.theme.id]) {
      return LocalsService.instance[this.theme.id];
    }

    // Detect browser language and switch to this language when available
    if (autodetectLanguage) {
      const browserLangcode = this.getBrowserLangcode();
      const currentLangcode = this.getLangcode();
      if (browserLangcode !== currentLangcode) {
        this.getAvailableLangcodes(this.theme.id)
        .then((availableLangcodes) => {
          let browserLangFound = false;
          for (const availableLangcodeObj of availableLangcodes) {
            if (availableLangcodeObj.code === browserLangcode) {
              browserLangFound = true;
            }
          }
          if (browserLangFound) {
            this.setLangcode(browserLangcode);
          }
        });
      }

    }

    LocalsService.instance[this.theme.id] = this;
  }

  public async getAll(themeID?: number) {
    if (!themeID) {
      themeID = this.theme.id;
    }

    if (!themeID) {
      throw new Error(`theme object is requred!`);
    }

    const url = `${LocalsService.baseUrl}/${themeID}/locales`;
    if (this.locals[themeID]) {
      return this.locals[themeID];
    }
    return getJSON(url)
    .then((locals) => {
      this.debug(`getJSON`, url, locals);
      this.locals[themeID as number] = locals;
      return this.locals[themeID as number];
    });
  }

  public async get(properties?: string[], themeID?: number) {
    return this.getAll(themeID)
    // extract properties
    .then((locals) => {
      if (properties && properties.length) {
        let local: any = Utils.clone(true, locals);
        this.debug('properties', properties);
        for (const property of properties) {
          if (!property) {
            return;
          }
          this.debug('property', property);
          if (local[property]) {
            local = local[property];
          } else {
            this.debug('null on', property);
            return null;
          }
        }
        return local;
      }
      return locals;
    });
  }

  public getBrowserLangcode() {
    const lang = navigator.language || (navigator as any).userLanguage;
    const simplified = lang.split('-')[0].toLowerCase();
    return simplified;
  }

  public getLangcode() {
    return $('html').attr('lang');
  }

  public setLangcode(langcode: string) {
    this.debug(`setLangcode: ${langcode}`);
    $('html').attr('lang', langcode);
    this.event.trigger('changed', langcode);
  }

  public async getAvailableLangcodes(themeID?: number) {
    const activeCode = this.getLangcode();
    return this.get(undefined, themeID)
    .then((locals) => {
      const langcodes: ILangcode[] = [];
      Object.keys(locals).forEach((langcode) => {
        langcodes.push({
          code: langcode,
          active: langcode === activeCode,
        });
      });
      return langcodes;
    });
  }

}
