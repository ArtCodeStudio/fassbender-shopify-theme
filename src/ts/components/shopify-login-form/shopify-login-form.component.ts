import Debug from 'debug';
import $ from 'jquery';
import { RibaComponent } from '../../tinybind';
import template from './shopify-login-form.component.html';
import { Utils } from '../../services/Utils';

interface IScope {
  form: {
    customer: {
      email: string;
      password: string;
    };
  };
  login: ShopifyLoginFormComponent['login'];
  recover: ShopifyLoginFormComponent['recover'];
}

export class ShopifyLoginFormComponent extends RibaComponent {

  public static tagName: string = 'rv-shopify-login-form';

  static get observedAttributes() {
    return [];
  }

  protected $el: JQuery<HTMLElement>;

  protected debug = Debug('component:' + ShopifyLoginFormComponent.tagName);

  protected scope: IScope = {
    form: {
      customer: {
        email: '',
        password: '',
      },
    },
    login: this.login,
    recover: this.recover,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.debug('constructor', this);
    this.init(ShopifyLoginFormComponent.observedAttributes);
  }

  /**
   * Login submit using the login form
   */
  public login(event: Event) {
    this.debug('login', this.scope.form);

    // this.scope.form.customer.email;
    // this.scope.form.customer.password;

    // if (this.$form) {
    //   this.scope.validation = this.validate(this.scope.validation, this.scope.form, ['firstName', 'lastName', 'phone', 'email', 'message'], this.$form);
    // }

    // if (!this.scope.validation.valid) {
    //   // stop automatic submit
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
  }

  /**
   * Reset password submit using the (hidden) reset form
   * @param event
   */
  public recover(event: Event) {
    const $recoverForm = this.$el.find('#recover-customer-password-hidden-form form');
    this.debug('recover', this.scope.form, $recoverForm);
    $recoverForm.submit();
    event.preventDefault();
    event.stopPropagation();
  }

  protected async beforeBind() {
    this.debug('beforeBind');
  }

  protected async afterBind() {
    this.debug('afterBind', this.scope);
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
