import Debug from 'debug';
import $ from 'jquery';
import { Component, IBinder } from '@ribajs/core';
import template from './shopify-addresses.component.html';
import { Utils } from '../../services/Utils';

// TODO move to general validation component class we can extend from
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
  // form: {
  //   customer: {
  //     email: string;
  //     password: string;
  //   };
  // };

  editAddress: {
    [addressID: string]: {
      validation: IValidationObject;
    };
  };

  showFormId: string;

  createAddress: {
    validation: IValidationObject;
  };

  edit: ShopifyAddressesComponent['edit'];
  create: ShopifyAddressesComponent['create'];
  delete: ShopifyAddressesComponent['delete'];
}

export class ShopifyAddressesComponent extends Component {

  public static tagName: string = 'rv-shopify-addresses';

  static get observedAttributes() {
    return [];
  }

  protected $el: JQuery<HTMLElement>;

  protected $editAddressForm: JQuery<HTMLFormElement> | null = null;
  protected $createAddressForm: JQuery<HTMLFormElement> | null = null;

  protected debug = Debug('component:' + ShopifyAddressesComponent.tagName);

  protected scope: IScope = {
    createAddress: {
      validation: {
        valid: false,
      },
    },
    showFormId: '',
    editAddress: {},
    edit: this.edit,
    create: this.create,
    delete: this.delete,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.debug('constructor', this);
    this.init(ShopifyAddressesComponent.observedAttributes);
  }

  public edit(id: string, context: IBinder<any>, event: Event, scope: IScope, form: HTMLFormElement) {
    this.debug('login', this.scope);

    const $form = this.$el.find(`form[action="/account/addresses/${id}]`) as JQuery<HTMLFormElement>;

    if (!$form) {
      this.debug('No edit address form found');
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate($form, this.scope.editAddress[id].validation);

    if (this.scope.editAddress[id].validation.valid) {
      $form.submit();
    } else {
      this.debug('form not valid', this.scope);
    }
  }

  /**
   * Submit an new address
   */
  public create(context: IBinder<any>, event: Event) {
    this.debug('create', this.scope);

    if (!this.$createAddressForm) {
      this.debug('No create form found');
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate(this.$createAddressForm, this.scope.createAddress.validation);

    if (this.scope.createAddress.validation.valid) {
      this.$createAddressForm.submit();
    } else {
      this.debug('form not valid', this.$createAddressForm);
    }
  }

  // https://help.shopify.com/en/api/reference/customers/customer_address
  // /account/addresses/{id}
  public delete(id: string, context: IBinder<any>, event: Event, scope: IScope, form: HTMLFormElement) {
    Utils.delete(`/account/addresses/${id}`, {}, 'json')
    .then((response: any) => {
      this.debug('delete response', response);
      location.reload();
    })
    .catch((error: any) => {
      this.debug('delete error', error);
      location.reload();
    });
  }

  protected initValidation() {
    this.$editAddressForm = this.$el.find('form[action^="/account/addresses/"]') as JQuery<HTMLFormElement>;
    this.$editAddressForm.attr('novalidate', '');
    this.$editAddressForm.addClass('needs-validation');

    this.$createAddressForm = this.$el.find('form[action="/account/addresses"]')  as JQuery<HTMLFormElement>;
    this.$createAddressForm.attr('novalidate', '');
    this.$createAddressForm.addClass('needs-validation');

    this.debug('initValidation', this.$createAddressForm, this.$createAddressForm);
  }

  protected validate($form: JQuery<HTMLFormElement>, validationScope: IValidationObject) {
    $form.each((index: number, formEl) => {
      validationScope.valid = formEl.checkValidity();
    });
    $form.addClass('was-validated');
  }

  protected async beforeBind() {
    this.debug('beforeBind');
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
