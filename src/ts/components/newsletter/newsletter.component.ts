import { Component, Debug, IBinder } from '@ribajs/core';
import { JQuery as $ } from '@ribajs/jquery';
import template from './newsletter.component.html';
import { LocalesService } from '@ribajs/shopify-tda';
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

export class NewsletterComponent extends Component {

  public static tagName: string = 'rv-newsletter';

  static get observedAttributes() {
    return [];
  }

  protected debug = Debug('component:' + NewsletterComponent.tagName);

  protected localesService = new LocalesService();

  protected scope: IScope = {
    subscribe: this.subscribe,
    selectAll: this.selectAll,
    form: {
      fields: {
        email: '',
        name: '',
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
    this.init(NewsletterComponent.observedAttributes);
  }

  public subscribe(context: IBinder<any>, event: Event, scope: IScope, form: HTMLFormElement) {
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

  public selectAll(context: IBinder<any>, event: JQuery.Event, scope: any, eventEl: HTMLInputElement) {
    this.debug('selectAll', eventEl);
    Utils.selectAll(eventEl);
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
