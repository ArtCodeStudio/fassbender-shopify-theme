import Debug from 'debug';
import $ from 'jquery';
import {
  RibaComponent,
} from '../../../tinybind';
import { LocalsService, ILangcode } from '../../../services/locals.service';

interface IScope {
  translate: I18nComponent['translate'];
  path?: string;
  vars: {
    [name: string]: any;
  };
}

export class I18nComponent extends RibaComponent {

  public static tagName: string = 'rv-i18n';

  static get observedAttributes() {
    return ['path'];
  }

  protected $el: JQuery<HTMLElement>;

  protected localsService = new LocalsService();

  protected debug = Debug('component:' + I18nComponent.tagName);

  protected scope: IScope = {
    translate: this.translate,
    path: undefined,
    vars: {},
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.debug('constructor', this);

  }

  public translate(langcode: string) {
    this.debug('translate path', this.scope.path);
    if (!this.scope.path) {
      throw new Error('path attribute is required');
    }
    const properties = this.scope.path.split('.');
    this.debug('translate properties', properties, 'langcode', langcode);
    this.localsService.get([langcode, ...properties])
    .then((local) => {
      this.debug('translate', local);
      this.$el.html(local);
    });
  }

  protected async beforeBind() {
    this.debug('beforeBind');
    this.parseTemplate();
    return this.localsService.event.on('changed', (langcode: string) => {
      this.translate(langcode);
    });
    // const langCode = this.localsService.getLangcode() as string;
    // this.translate(langCode);
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
  }

  protected requiredAttributes() {
    return ['path'];
  }

  /**
   * Parse templates wich can be used to set variables on language strings
   */
  protected parseTemplate() {
    const templates = this.$el.find('template');
    templates.each((i, template) => {
      const name = template.getAttribute('name');
      if (name !== null) {
        this.scope.vars[name] = template.innerHTML.trim();
      }
    });
    this.debug('vars', this.scope.vars);
  }

  protected template() {
    // Only set the component template if there no childs already
    // if (this.el.hasChildNodes()) {
    // }
    return null;
  }
}
