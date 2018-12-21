import { EventDispatcher, getJSON, Utils, Debug, JQuery as $ } from '@ribajs/core';
import { TheDeveloperAppService } from './the-developer-app.service';

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

export interface ILocalVar {
  [name: string]: string | ILocalPluralization;
}

export interface ILocalPluralization {
  zero?: string;
  one?: string;
  two?: string;
  other?: string;
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
  public routerEvent = new EventDispatcher('main');

  public locals: any = {};

  public ready: boolean = false;

  /**
   * The current setted langcode
   */
  private currentLangcode: string;

  /**
   * The default theme langcode before any language was choosed
   */
  private readonly initalLangcode: string;

  private theme: ITheme;

  constructor(theme?: ITheme, autodetectLanguage: boolean = true) {
    if (!theme) {
      theme = (window as any).Shopify.theme;
    }

    this.theme = theme as ITheme;

    if (!this.theme) {
      throw new Error(`theme object is requred!`);
    }

    const initalLangcode = $('html').attr('lang');
    if (!initalLangcode) {
      throw new Error(`The lang attribute on the html element is requred to detect the default theme language: ${initalLangcode}`);
    }

    this.currentLangcode = initalLangcode;
    this.initalLangcode = initalLangcode;

    if (LocalsService.instance && LocalsService.instance[this.theme.id]) {
      return LocalsService.instance[this.theme.id];
    }

    // Detect browser language and switch to this language when available
    const browserLangcode = this.getBrowserLangcode();
    this.getAvailableLangcodes(this.theme.id)
    .then((availableLangcodes) => {
      let browserLangFound = false;
      for (const availableLangcodeObj of availableLangcodes) {
        if (availableLangcodeObj.code === browserLangcode) {
          browserLangFound = true;
        }
      }
      // ony switch language if autodetectLanguage is true and the browser language is not the default language
      if (autodetectLanguage && browserLangFound && browserLangcode !== this.currentLangcode) {
        this.setLangcode(browserLangcode, true);
      }
      return availableLangcodes;
    })
    .then((availableLangcodes) => {
      this.ready = true;
      // If the current langcode is not the inital langcode then translation is needed
      const translationNeeded = this.currentLangcode !== this.initalLangcode;
      this.event.trigger('ready', this.currentLangcode, translationNeeded);
    })
    .catch((error) => {
      console.error(error);
      this.ready = false;
      return error;
    });

    LocalsService.instance[this.theme.id] = this;
  }

  /**
   * Get translation by properties, e.g. `de.form.newsletter_label`
   * Properties object must include the language code, e.g. `de`.
   * @param properties properties, e.g. `['de', 'form', 'newsletter', 'label']`
   * @param themeID
   * @param force Set this to true if you want to force the request also if the service is not ready, you should use this only one the time
   */
  public async get(properties?: string[], vars?: ILocalVar, themeID?: number, force: boolean = false) {
    if (!this.ready && !force) {
      console.error('not ready');
      return;
    }
    return this.getAll(themeID)
    // extract properties
    .then((locals) => {
      if (properties && properties.length) {
        let local: any = Utils.clone(true, locals);
        for (const property of properties) {
          if (!property) {
            return;
          }
          if (local[property]) {
            local = local[property];
          } else {
            return null;
          }
        }
        return local;
      }
      return locals;
    })
    .then((local) => {
      if (local === null && properties) {
        console.warn(`WARNING translation missing: "${properties.join('.')}"`, local, properties, themeID);
      }
      return local;
    })
    // Replace variables in local string if vars are set
    .then((local) => {
      if (vars) {
        local = this.setTranslateStringPluralization(local, vars);
        local = this.setTranslateStringVars(local, vars);
      }
      return local;
    })
    .catch((error) => {
      console.error(error);
      this.ready = false;
      return error;
    });
  }

  /**
   * Get translation by properties, e.g. `form.newsletter_label`
   * Properties object must not include the language code.
   * @param properties properties, e.g. `[form', 'newsletter', 'label']`
   * @param themeID
   */
  public async getByCurrentLang(properties: string[] = [], vars?: ILocalVar, themeID?: number) {
    const langcode = this.getLangcode();
    if (!langcode) {
      throw new Error('Langcode not found in html tag');
    }
    return this.get([langcode, ...properties], vars, themeID);
  }

  public getBrowserLangcode() {
    const lang = navigator.language || (navigator as any).userLanguage;
    const simplified = lang.split('-')[0].toLowerCase();
    return simplified;
  }

  /**
   * Get the current langcode,
   * if lang was not choosed this is the langcode of the lang attribute of the html element.
   * If the language was changed this returns the changed language
   */
  public getLangcode() {
    return this.currentLangcode;
  }

  public getInitialLangcode() {
    return this.initalLangcode;
  }

  public setLangcode(langcode: string, initial: boolean = false) {
    if (this.currentLangcode !== langcode) {
      this.currentLangcode = langcode;
      $('html').attr('lang', langcode);
      this.event.trigger('changed', langcode, initial);
    }
  }

  public async getAvailableLangcodes(themeID?: number) {
    const activeCode = this.getLangcode();
    return this.get(undefined, undefined, themeID, true)
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

  /**
   * Parse templates wich can be used to set variables on language strings
   */
  public parseTemplateVars($el: JQuery<HTMLElement>): ILocalVar {
    const templates = $el.find('template');
    const vars: ILocalVar = {};
    templates.each((i, template) => {
      const name: string | null = template.getAttribute('name');
      if (name !== null) {
        vars[name] = template.innerHTML.trim();
      }
    });
    return vars;
  }

  /**
   * Parse templates wich have his own translations
   */
  public parseLocalVars($el: JQuery<HTMLElement>): ILocalVar {
    const templates = $el.find('template');
    const vars: ILocalVar = {};
    templates.each((i, template) => {
      const lang: string | null = template.getAttribute('lang');
      if (lang !== null) {
        vars[lang] = template.innerHTML.trim();
      }
    });
    return vars;
  }

  /**
   * Replace variables on translated string
   * @param translateString
   * @param vars
   */
  public setTranslateStringVars(translateString: string, vars: ILocalVar) {
    if (!translateString || typeof(translateString.match) !== 'function') {
      return translateString;
    }
    const matches = translateString.match(/{{\s*?[A-Za-z_-]+\s*?}}/gm);
    if (matches) {
      for (const match of matches) {
        if (match) {
          const varName = match.replace(/{{\s*|\s*}}/gm, '');
          // this.debug('varName', varName, 'match', match, 'content', vars[varName], 'translateString', translateString);
          if (typeof(vars[varName]) === 'string' || typeof(vars[varName]) === 'number') {
            translateString = translateString.replace(match, vars[varName] as string);
          }
        }
      }
    }
    return translateString;
  }

  /**
   * Get file with all languages
   * @param themeID
   */
  private async getAll(themeID?: number) {
    if (!themeID) {
      themeID = this.theme.id;
    }

    if (!themeID) {
      throw new Error(`theme object is requred!`);
    }

    let url = `${LocalsService.baseUrl}/${themeID}/locales`;
    if ((window as any).Shopify.shop) {
      url = url + `?shop=${(window as any).Shopify.shop}`;
    }
    if (this.locals[themeID]) {
      return this.locals[themeID];
    }
    return getJSON(url)
    .then((locals: any /** TODO any */) => {
      this.locals[themeID as number] = locals;
      return this.locals[themeID as number];
    });
  }

  /**
   * see https://help.shopify.com/en/themes/development/theme-store-requirements/internationalizing/translation-filter#pluralization-in-translation-keys
   * @param translateString
   * @param vars
   */
  private setTranslateStringPluralization(translateObj: ILocalPluralization | string, vars: ILocalVar) {
    if (vars.count && typeof(translateObj) === 'object' && translateObj !== null) {
      const count = Number(vars.count);
      if (count === 0) {
        if (translateObj.zero) {
          return translateObj.zero;
        }
      } else if (count === 1) {
        if (translateObj.one) {
          return translateObj.one;
        }
      } else if (count === 2) {
        if (translateObj.two) {
          return translateObj.two;
        }
      }
    }

    if (typeof(translateObj) === 'object' && translateObj !== null && translateObj.other) {
      return translateObj.other;
    }
    return translateObj as string;
  }

}
