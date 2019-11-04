import { Component } from '@ribajs/core';
import { JQuery as $} from '@ribajs/jquery';
import template from './shopify-login-form.component.html';
import { Utils } from '../../services/Utils';

export interface IValidationRule {
  required: boolean;
  minlength?: number;
  maxlength?: number;
  max?: number;
  min?: number;
  error: string;
  isEmail?: boolean;
  isPhone?: boolean;
  onlyNumbers?: boolean;
}

export interface IValidationObject {
  valid: boolean;
  rules?: {
    [key: string]: IValidationRule;
  };
}

interface IScope {
  form: {
    customer: {
      email: string;
      password: string;
    };
  };
  loginCustomer: {
    validation: IValidationObject;
  };
  createCustomer: {
    validation: IValidationObject;
  };
  recoverCustomer: {
    validation: IValidationObject;
  };
  login: ShopifyLoginFormComponent['login'];
  create: ShopifyLoginFormComponent['create'];
  recover: ShopifyLoginFormComponent['recover'];
  recoverBack: ShopifyLoginFormComponent['recoverBack'];
}

export class ShopifyLoginFormComponent extends Component {

  public static tagName: string = 'rv-shopify-login-form';

  static get observedAttributes() {
    return [];
  }

  protected $el: JQuery<HTMLElement>;

  protected $loginCustomerForm: JQuery<HTMLFormElement> | null = null;
  protected $createCustomerForm: JQuery<HTMLFormElement> | null = null;
  protected $recoverCustomerForm: JQuery<HTMLFormElement> | null = null;

  protected scope: IScope = {
    form: {
      customer: {
        email: '',
        password: '',
      },
    },
    loginCustomer: {
      validation: {
        valid: false,
      },
    },
    createCustomer: {
      validation: {
        valid: false,
      },
    },
    recoverCustomer: {
      validation: {
        valid: false,
      },
    },
    login: this.login,
    create: this.create,
    recover: this.recover,
    recoverBack: this.recoverBack,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.init(ShopifyLoginFormComponent.observedAttributes);
  }

  /**
   * Login submit using the login form
   */
  public login(_: any, event: Event) {
    if (!this.$loginCustomerForm) {
      console.error('No login form found');
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate(this.$loginCustomerForm, this.scope.loginCustomer.validation);

    if (this.scope.loginCustomer.validation.valid) {
      this.$loginCustomerForm.submit();
    } else {
      console.warn('form not valid', this.scope.form);
    }
  }

  /**
   * Create an account submit using the login form
   */
  public create(_: any, event: Event) {
    if (!this.$createCustomerForm) {
      console.error('No create form found');
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate(this.$createCustomerForm, this.scope.createCustomer.validation);

    if (this.scope.createCustomer.validation.valid) {
      this.$createCustomerForm.submit();
    } else {
      console.warn('form not valid', this.scope.form);
    }
  }

  /**
   * Reset password submit using the (hidden) reset form
   * @param event
   */
  public recover(_: any, event: Event) {
    if (!this.$recoverCustomerForm) {
      console.error('No recover form found');
      return false;
    }

    if (!this.$loginCustomerForm) {
      console.error('No login form found');
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate(this.$recoverCustomerForm, this.scope.recoverCustomer.validation);

    if (this.scope.recoverCustomer.validation.valid) {
      this.$recoverCustomerForm.submit();
    } else {
      console.warn('form not valid', this.scope.form);
      this.$loginCustomerForm.parent().attr('hidden', '').hide();
      this.$recoverCustomerForm.parent().removeAttr('hidden').show();
    }
  }

  public recoverBack(_: any, event: Event) {

    if (!this.$recoverCustomerForm) {
      console.error('No recover form found');
      return false;
    }

    if (!this.$loginCustomerForm) {
      console.error('No login form found');
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.$loginCustomerForm.parent().removeAttr('hidden').show();
    this.$recoverCustomerForm.parent().attr('hidden', '').hide();
  }

  protected initValidation() {
    this.$createCustomerForm = this.$el.find('form[action="/account"]') as JQuery<HTMLFormElement>;
    this.$createCustomerForm.attr('novalidate', '');
    this.$createCustomerForm.addClass('needs-validation');

    this.$loginCustomerForm = this.$el.find('form[action="/account/login"]')  as JQuery<HTMLFormElement>;
    this.$loginCustomerForm.attr('novalidate', '');
    this.$loginCustomerForm.addClass('needs-validation');

    this.$recoverCustomerForm = this.$el.find('form[action="/account/recover"]') as JQuery<HTMLFormElement>;
    this.$recoverCustomerForm.attr('novalidate', '');
    this.$recoverCustomerForm.addClass('needs-validation');
  }

  protected validate($form: JQuery<HTMLFormElement>, validationScope: IValidationObject) {
    $form.each((index: number, formEl) => {
      validationScope.valid = formEl.checkValidity();
    });
    $form.addClass('was-validated');
  }

  protected async afterBind() {
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
