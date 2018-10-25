import Debug from 'debug';
import $ from '../../jquery';
import { RibaComponent } from '../../tinybind';
import template from './newsletter.component.html';
import { LocalsService } from '../../services/locals.service';
import { Utils } from '../../services/Utils';

// TODO move to general validation component class we can extend from
export interface IValidationObject {
  fields: {
    [name: string]: string | number;
  };
  valid: boolean;
  error?: string;
}

interface IScope {
  subscribe: NewsletterComponent['subscribe'];
  selectAll: NewsletterComponent['selectAll'];
  form: IValidationObject;
}

export class NewsletterComponent extends RibaComponent {

  public static tagName: string = 'rv-newsletter';

  static get observedAttributes() {
    return [];
  }

  protected debug = Debug('component:' + NewsletterComponent.tagName);

  protected localsService = new LocalsService();

  protected scope: IScope = {
    subscribe: this.subscribe,
    selectAll: this.selectAll,
    form: {
      fields: {
        email: '', // Setted with localService
        name: '', // Setted to default value with localService
      },
      valid: true,
      error: undefined,
    },
  };

  protected $el: JQuery<HTMLElement>;

  protected $form?: JQuery<HTMLFormElement>;

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.initTranslate();
    this.init(NewsletterComponent.observedAttributes);
  }

  public subscribe(event: Event, scope: IScope, form: HTMLFormElement) {
    this.debug('subscribe');

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    if (!this.$form) {
      this.debug('No form found');
      return false;
    }

    this.validate(this.$form, this.scope.form);

    if (this.scope.form.valid) {
      this.$form.submit();
    } else {
      this.debug('form not valid', this.scope);
    }

  }

  public selectAll(event: JQuery.Event<HTMLElement>, scope: any, eventEl: HTMLInputElement) {
    this.debug('selectAll', eventEl);
    Utils.selectAll(eventEl);
  }

  protected initTranslate() {
    this.localsService.event.on('changed', (langcode: string) => {
      this.translate(langcode);
    });
    if (this.localsService.ready) {
      this.translate(this.localsService.getLangcode());
    } else {
      this.localsService.event.on('ready', (langcode: string, translationNeeded: boolean) => {
        this.translate(langcode);
      });
    }
  }

  protected translate(langcode: string) {
    this.localsService.get([langcode, 'sections', 'newsletter'])
    .then((local) => {
      this.debug('changed local', local);
      if (this.$form) {
        this.$form.find('span[name="name"]').html(this.scope.form.fields.name.toString());
        this.$form.find('span[name="email"]').html(this.scope.form.fields.email.toString());
        this.$form.find('input[name="NAME"]').val(this.scope.form.fields.name.toString());
        this.$form.find('input[name="EMAIL"]').val(this.scope.form.fields.email.toString());
      }
      this.scope.form.fields.name = local.input_name_label;
      this.scope.form.fields.email = local.input_mail_label;
      return;
    })
    .catch((error) => {
      if (this.$form) {
        this.$form.find('span[name="name"]').html('Name');
        this.$form.find('span[name="email"]').html('Email');
        this.$form.find('input[name="NAME"]').val('Name');
        this.$form.find('input[name="EMAIL"]').val('Email');
      }
    });
  }

  protected initValidation() {
    this.$form = this.$el.find('form') as JQuery<HTMLFormElement>;
    this.$form.attr('novalidate', '');
    this.$form.addClass('needs-validation');

    this.debug('initValidation', this.$form);
  }

  protected validate($form: JQuery<HTMLFormElement>, validationScope: IValidationObject) {
    $form.each((index: number, formEl) => {
      const name = formEl.name;
      validationScope.valid = formEl.checkValidity();
      validationScope.error = formEl.validationMessage;
    });
    $form.addClass('was-validated');
    this.debug('validate', validationScope, $form[0]);
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
    this.initValidation();
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
