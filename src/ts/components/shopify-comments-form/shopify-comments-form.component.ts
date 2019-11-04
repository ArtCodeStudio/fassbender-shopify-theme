import { Component, IBinder } from '@ribajs/core';
import { JQuery as $ } from '@ribajs/jquery';
import template from './shopify-comments-form.component.html';

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
  post: ShopifyCommentsFormComponent['post'];
}

export class ShopifyCommentsFormComponent extends Component {

  public static tagName: string = 'rv-shopify-comments-form';

  static get observedAttributes() {
    return [];
  }

  protected $el: JQuery<HTMLElement>;

  protected $newCommentForm: JQuery<HTMLFormElement> | null = null;

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
    post: this.post,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.$el = $(this.el);
    this.init(ShopifyCommentsFormComponent.observedAttributes);
  }

  /**
   * Post comment
   */
  public post(context: IBinder<any>, event: Event) {
    if (!this.$newCommentForm) {
      console.error('No comment form found');
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate(this.$newCommentForm, this.scope.loginCustomer.validation);

    if (this.scope.loginCustomer.validation.valid) {
      this.$newCommentForm.submit();
    } else {
      console.warn('form not valid', this.scope.form);
    }
  }

  protected initValidation() {
    this.$newCommentForm = this.$el.find('#comment_form')  as JQuery<HTMLFormElement>;
    this.$newCommentForm.attr('novalidate', '');
    this.$newCommentForm.addClass('needs-validation');
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
