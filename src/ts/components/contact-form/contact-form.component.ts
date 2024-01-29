import { Utils } from "../../services/Utils";
import {
  stripHtml,
  stringIsPhoneNumber,
  stringHasOnlyNumbers,
  isString,
  isUndefined,
  isNumber,
} from "@ribajs/utils/src/type";
import { Component } from "@ribajs/core";
import { JQuery as $ } from "@ribajs/jquery";
import template from "./contact-form.component.html";
import { LocalesService } from "@ribajs/shopify-tda";
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

// TODO move to general validation component class we can extend from
export interface ValidationObject {
  valid: boolean;
  rules?: {
    [key: string]: ValidationRule;
  };
}

export class ContactFormComponent extends Component {
  public static tagName = "rv-contact-form";

  static get observedAttributes() {
    return [];
  }

  protected localsService = LocalesService.getSingleton();

  protected $form?: JQuery<HTMLFormElement>;

  public scope: any = {
    form: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    },
    validation: this.getValidationObject(),
    /** send form function */
    send: this.send,
    /** select all text function */
    selectAll: this.selectAll,
    /** form post request error message if form fails */
    error: "",
    /** form post request success message if form request was succes */
    success: "",
  };

  constructor() {
    super();
    this.init(ContactFormComponent.observedAttributes);
  }

  /**
   * Send the contact form using a form submit request with best shopify form support
   */
  public send(event: Event) {
    this.scope.form.firstName = stripHtml(this.scope.form.firstName);
    this.scope.form.lastName = stripHtml(this.scope.form.lastName);
    this.scope.form.phone = stripHtml(this.scope.form.phone);
    this.scope.form.email = stripHtml(this.scope.form.email);

    if (this.$form) {
      this.scope.validation = this.validate(
        this.scope.validation,
        this.scope.form,
        ["firstName", "lastName", "phone", "email", "message"],
        this.$form,
      );
    }

    if (!this.scope.validation.valid) {
      // stop automatic submit
      event.preventDefault();
      event.stopPropagation();
    }
  }

  public selectAll(event: JQuery.Event, scope: any, eventEl: HTMLInputElement) {
    Utils.selectAll(eventEl);
  }

  /**
   * validate form
   * @param validation object with the validation rules
   * @param the form with the values form the form
   * @param keys keys you want to validate
   */
  protected validate(
    validation: ValidationObject,
    formValues: any,
    keys: string[],
    $form: JQuery<HTMLFormElement>,
  ) {
    validation.valid = true;

    keys.forEach((key: string) => {
      if (!validation.rules) {
        return;
      }
      validation.rules[key].error = "";
      // value is requred
      if (validation.rules[key].required) {
        if (isString(formValues[key])) {
          if (formValues[key].length <= 0) {
            validation.valid = false;
            // validation.rules[key].error = 'This field is required';
            validation.rules[key].error = "forms.invalid.required";
          }
        }
        if (isUndefined(formValues[key])) {
          // validation.rules[key].error = 'This field is required';
          validation.rules[key].error = "forms.invalid.required";
        }
      }

      // validation for numbers
      if (isNumber(formValues[key])) {
        // maximum value for number
        if (isNumber(validation.rules[key].max)) {
          if (formValues[key] > (validation.rules[key].max as number)) {
            // validation.rules[key].error = 'The number must be a maximum of ' + validation.rules[key].max;
            validation.rules[key].error = "forms.invalid.required";
          }
        }

        // minimum value for number
        if (isNumber(validation.rules[key].min)) {
          if (formValues[key] < (validation.rules[key].min as number)) {
            // validation.rules[key].error = 'The number must be at least ' + validation.rules[key].min;
            validation.rules[key].error = "forms.invalid.min";
          }
        }
      }

      // validation for strings
      if (isString(formValues[key]) && formValues[key].length >= 1) {
        // maximum value for string length
        if (isNumber(validation.rules[key].maxlength)) {
          if (
            formValues[key].length > (validation.rules[key].maxlength as number)
          ) {
            // validation.rules[key].error = 'The number of characters must not exceed ' + validation.rules[key].maxlength;
            validation.rules[key].error = "forms.invalid.maxlength";
          }
        }

        // minimum value for string length
        if (isNumber(validation.rules[key].minlength)) {
          if (
            formValues[key].length < (validation.rules[key].minlength as number)
          ) {
            // validation.rules[key].error = 'The number of characters must be at least ' + validation.rules[key].minlength;
            validation.rules[key].error = "forms.invalid.minlength";
          }
        }

        // email
        if (validation.rules[key].isEmail) {
          if (formValues[key].indexOf("@") <= -1) {
            // validation.rules[key].error = 'This is not a valid email address';
            validation.rules[key].error = "forms.invalid.invalid_email";
          }

          if (formValues[key].indexOf(".") <= -1) {
            // validation.rules[key].error = 'This is not a valid email address';
            validation.rules[key].error = "forms.invalid.invalid_email";
          }
        }

        // phone number
        if (validation.rules[key].isPhone) {
          if (!stringIsPhoneNumber(formValues[key])) {
            // validation.rules[key].error = 'The phone number can only contain numbers, +, -, ) and (';
            validation.rules[key].error = "forms.invalid.invalid_phone";
          }
        }

        // only numbers
        if (validation.rules[key].onlyNumbers) {
          if (!stringHasOnlyNumbers(formValues[key])) {
            // validation.rules[key].error = 'The value may only contain numbers';
            validation.rules[key].error = "forms.invalid.only_numbers";
          }
        }
      }

      // is all valid?
      if (validation.rules[key].error.length) {
        validation.valid = false;
      }
    });

    /**
     * Run also the native browser validation
     * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/checkValidity
     */
    if (validation.valid) {
      validation.valid = $form[0].checkValidity();
    }

    $form.addClass("was-validated");
    return validation;
  }

  protected getValidationObject() {
    const validation: ValidationObject = {
      valid: true,
      rules: {
        firstName: {
          required: true,
          minlength: 3,
          error: "",
        },
        lastName: {
          required: true,
          minlength: 3,
          error: "",
        },
        email: {
          required: true,
          isEmail: true,
          minlength: 3,
          error: "",
        },
        phone: {
          required: false,
          isPhone: true,
          minlength: 4,
          error: "",
        },
        message: {
          required: true,
          minlength: 20,
          error: "",
        },
      },
    };
    return validation;
  }

  protected async beforeBind() {
    this.$form = $(this).find("form") as JQuery<HTMLFormElement>;

    // For custom style form validation, see https://getbootstrap.com/docs/4.1/components/forms/#custom-styles
    this.$form.addClass("needs-validation");
    this.$form.attr("novalidate", "");
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
