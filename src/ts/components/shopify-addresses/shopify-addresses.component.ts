import { Component, HttpService } from "@ribajs/core";
import { JQuery as $ } from "@ribajs/jquery";
import template from "./shopify-addresses.component.html";
import { hasChildNodesTrim } from "@ribajs/utils";

// TODO move to general validation component class we can extend from
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
  // form: {
  //   customer: {
  //     email: string;
  //     password: string;
  //   };
  // };

  editAddress: {
    [addressID: string]: {
      validation: ValidationObject;
    };
  };

  showFormId: string;

  createAddress: {
    validation: ValidationObject;
  };

  edit: ShopifyAddressesComponent["edit"];
  create: ShopifyAddressesComponent["create"];
  delete: ShopifyAddressesComponent["delete"];
}

export class ShopifyAddressesComponent extends Component {
  public static tagName = "rv-shopify-addresses";

  static get observedAttributes() {
    return [];
  }

  protected $el: JQuery<HTMLElement>;

  protected $editAddressForm: JQuery<HTMLFormElement> | null = null;
  protected $createAddressForm: JQuery<HTMLFormElement> | null = null;

  public scope: Scope = {
    createAddress: {
      validation: {
        valid: false,
      },
    },
    showFormId: "",
    editAddress: {},
    edit: this.edit,
    create: this.create,
    delete: this.delete,
  };

  constructor() {
    super();
    this.$el = $(this);
    console.warn("constructor", this);
    this.init(ShopifyAddressesComponent.observedAttributes);
  }

  public edit(id: string, event: Event) {
    console.warn("login", this.scope);

    const $form = this.$el.find(
      `form[action="/account/addresses/${id}]`
    ) as JQuery<HTMLFormElement>;

    if (!$form) {
      console.warn("No edit address form found");
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate($form, this.scope.editAddress[id].validation);

    if (this.scope.editAddress[id].validation.valid) {
      $form.submit();
    } else {
      console.warn("form not valid", this.scope);
    }
  }

  /**
   * Submit an new address
   */
  public create(event: Event) {
    if (!this.$createAddressForm) {
      console.warn("No create form found");
      return false;
    }

    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    this.validate(this.$createAddressForm, this.scope.createAddress.validation);

    if (this.scope.createAddress.validation.valid) {
      this.$createAddressForm.submit();
    } else {
      console.warn("form not valid", this.$createAddressForm);
    }
  }

  // https://help.shopify.com/en/api/reference/customers/customer_address
  // /account/addresses/{id}
  public delete(id: string) {
    HttpService.delete(`/account/addresses/${id}`, {}, "json")
      .then(() => {
        location.reload();
      })
      .catch((error: any) => {
        console.error("delete error", error);
        location.reload();
      });
  }

  protected initValidation() {
    this.$editAddressForm = this.$el.find(
      'form[action^="/account/addresses/"]'
    ) as JQuery<HTMLFormElement>;
    this.$editAddressForm.attr("novalidate", "");
    this.$editAddressForm.addClass("needs-validation");

    this.$createAddressForm = this.$el.find(
      'form[action="/account/addresses"]'
    ) as JQuery<HTMLFormElement>;
    this.$createAddressForm.attr("novalidate", "");
    this.$createAddressForm.addClass("needs-validation");
  }

  protected validate(
    $form: JQuery<HTMLFormElement>,
    validationScope: ValidationObject
  ) {
    $form.each((index: number, formEl) => {
      validationScope.valid = formEl.checkValidity();
    });
    $form.addClass("was-validated");
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
