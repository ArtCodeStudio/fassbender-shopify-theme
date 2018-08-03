import Debug from 'debug';
import $ from 'jquery';
import { Utils } from '../../services/Utils';
import { ShopifySectionComponent, RibaComponent } from '../../tinybind';
import template from './contact-form.component.html';

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
  rules: {
    [key: string]: IValidationRule;
  };
}

export class ContactFormComponent extends RibaComponent {

  public static tagName: string = 'rv-contact-form';

  static get observedAttributes() {
    return [];
  }

  protected debug = Debug('component:' + ContactFormComponent.tagName);

  protected scope: any = {
    from: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      message: '',
    },
    validation: this.getValidationObject(),
    /** send from function */
    send: this.sendSubmit,
    /** select all text function */
    selectAll: this.selectAll,
    /** form post request error message if form fails */
    error: '',
    /** form post request success message if form request was succes */
    success: '',
  };

  constructor(element?: HTMLElement) {
    super(element);
    const $el = $(this.el);

    this.init(ContactFormComponent.observedAttributes);
  }

  /**
   * Send contact form using jquery post request
   * Note this makes problems if shopify wants to show a captcha first so use the sendSubmit method instead
   */
  public sendPost() {
    this.debug('sendPost', this.scope);

    const contactData = {
      'contact[firstName]': this.scope.form.firstName,
      'contact[lastName]': this.scope.form.lastName,
      'contact[phone]': this.scope.form.phone,
      'contact[email]': this.scope.form.email,
      'contact[message]': this.scope.form.message,
      'utf8': '✓',
      'form_type': 'contact',
    };

    const jqxhr = $.post('/contact#contact_form', contactData)
    .done((responseHtmlString) => {
      const response = $(responseHtmlString);
      const success = $(responseHtmlString).find('#contact-form-success');
      const error = $(responseHtmlString).find('#contact-form-error');

      if (error.length) {
        this.scope.error = error.html();
      }

      if (success.length) {
        this.scope.success = success.html();
      }

      this.debug( 'second success', success, error );
    })
    .fail((jqXHR, textStatus, error) => {
      console.error( 'error', jqXHR, textStatus, error );
      this.scope.error = error;
    });
  }

  /**
   * Send the contact form using a form submit request with best shopify form support
   */
  public sendSubmit() {
    this.debug('sendSubmit', this.scope);

    // this.scope.validation = this.validate(this.scope.validation, this.scope.form, ['firstName', 'lastName', 'phone', 'email', 'message']);

    // if (this.scope.validation.valid) {
    $('#contact_form').submit(( event ) => {
      this.debug('Handler for .submit() called.');
      // event.preventDefault();
    });
    // }

  }

  public selectAll(event: JQuery.Event<HTMLElement>, scope: any, eventEl: HTMLElement) {
    this.debug('selectAll');
    window.getSelection().selectAllChildren(eventEl);
  }

    /**
     * validate form
     * @param validation object with the validation rules
     * @param the form with the values from the form
     * @param keys keys you want to validate
     */
    protected validate(validation: IValidationObject, form: any, keys: string[]) {
      validation.valid = true;
      keys.forEach((key: string) => {
          validation.rules[key].error = '';
          // value is requred
          if (validation.rules[key].required) {
            if (Utils.isString(form[key])) {
              if (form[key].length <= 0) {
                validation.rules[key].error = 'Dieses Feld ist erforderlich.';
              }
            }
            if (Utils.isUndefined(form[key])) {
              validation.rules[key].error = 'Dieses Feld ist erforderlich.';
            }
          }

          // validation for numbers
          if (Utils.isNumber(form[key])) {
            // maximum value for number
            if (Utils.isNumber(validation.rules[key].max)) {
              if (form[key] > (validation.rules[key].max as number)) {
                validation.rules[key].error = 'Die Anzahl darf nur maximal ' + validation.rules[key].max + ' betragen.';
              }
            }

            // minimum value for number
            if (Utils.isNumber(validation.rules[key].min)) {
              if (form[key] < (validation.rules[key].min as number)) {
                validation.rules[key].error = 'Die Anzahl darf nur mindestens ' + validation.rules[key].min + ' betragen.';
              }
            }
          }

          // validation for strings
          if (Utils.isString(form[key]) && form[key].length >= 1 ) {
            // maximum value for string length
            if (Utils.isNumber(validation.rules[key].maxlength)) {
              if (form[key].length > (validation.rules[key].maxlength as number)) {
                validation.rules[key].error = 'Die Anzahl der Zeichen darf nur maximal ' + validation.rules[key].maxlength + ' betragen.';
              }
            }

            // minimum value for string length
            if (Utils.isNumber(validation.rules[key].minlength)) {
                if (form[key].length < (validation.rules[key].minlength as number)) {
                  validation.rules[key].error = 'Die Anzahl der Zeichen muss mindestens ' + validation.rules[key].minlength + ' betragen.';
                }
            }

            // email
            if (validation.rules[key].isEmail) {
              if (form[key].indexOf('@') <= -1) {
                validation.rules[key].error = 'Die E-Mail muss ein @ enthalten.';
              }

              if (form[key].indexOf('.') <= -1) {
                validation.rules[key].error = 'Die E-Mail muss ein Punkt enthalten.';
              }
            }

            // phone number
            if (validation.rules[key].isPhone) {
              if (!Utils.stringIsPhoneNumber(form[key])) {
                validation.rules[key].error = 'Die Telefonnummer darf nur Zahlen, +, -, ( und ) enthalten.';
              }
            }

            // only numbers
            if (validation.rules[key].onlyNumbers) {
              if (!Utils.stringHasOnlyNumbers(form[key])) {
                validation.rules[key].error = 'Der Wert darf nur Nummern enthalten.';
              }
            }
          }

          // is all valid?
          if (validation.rules[key].error.length) {
            validation.valid = false;
          }
      });

      this.debug('validate', validation);
      return validation;
  }

  protected getValidationObject() {
    const validation: IValidationObject = {
      valid: true,
      rules: {
        firstName: {
          required: true,
          minlength: 3,
          error: '',
        },
        lastName: {
          required: true,
          minlength: 3,
          error: '',
        },
        email: {
          required: true,
          isEmail: true,
          minlength: 3,
          error: '',
        },
        phone: {
          required: false,
          isPhone: true,
          minlength: 4,
          error: '',
        },
        message: {
          required: true,
          minlength: 50,
          error: '',
        },
      },
    };
    return validation;
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    return null;
  }
}
