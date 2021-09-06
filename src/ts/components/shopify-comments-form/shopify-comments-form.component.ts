import { Component } from "@ribajs/core";
import template from "./shopify-comments-form.component.html";
import { hasChildNodesTrim } from "@ribajs/utils";

export interface ValidationRule {
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

export interface ValidationObject {
  valid: boolean;
  rules?: {
    [key: string]: ValidationRule;
  };
}

interface Scope {
  form: {
    customer: {
      email: string;
      password: string;
    };
  };
  loginCustomer: {
    validation: ValidationObject;
  };
  createCustomer: {
    validation: ValidationObject;
  };
  recoverCustomer: {
    validation: ValidationObject;
  };
  post: ShopifyCommentsFormComponent["post"];
}

export class ShopifyCommentsFormComponent extends Component {
  public static tagName = "rv-shopify-comments-form";

  static get observedAttributes() {
    return [];
  }

  // protected $el: JQuery<HTMLElement>;

  protected newCommentForm: HTMLFormElement | null = null;

  public scope: Scope = {
    form: {
      customer: {
        email: "",
        password: "",
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

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ShopifyCommentsFormComponent.observedAttributes);
  }

  /**
   * Post comment
   */
  public post(event: Event) {
    if (!this.newCommentForm) {
      console.error("No comment form found");
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate(this.newCommentForm, this.scope.loginCustomer.validation);

    if (this.scope.loginCustomer.validation.valid) {
      this.newCommentForm.submit();
    } else {
      console.warn("form not valid", this.scope.form);
    }
  }

  protected initValidation() {
    this.newCommentForm = document.getElementById(
      "comment_form"
    ) as HTMLFormElement;
    this.newCommentForm.attr("novalidate", "");
    this.newCommentForm.addClass("needs-validation");
  }

  protected validate(form: HTMLFormElement, validationScope: ValidationObject) {
    validationScope.valid = form.checkValidity();
    form.addClass("was-validated");
  }

  protected async afterBind() {
    this.initValidation();
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
