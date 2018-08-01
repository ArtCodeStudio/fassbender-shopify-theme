import Debug from 'debug';
import $ from 'jquery';
import { ShopifySectionComponent, RibaComponent } from '../../tinybind';
import template from './contact-form.component.html';

export class ContactFormComponent extends RibaComponent {

  public static tagName: string = 'rv-contact-form';

  static get observedAttributes() {
    return [];
  }

  protected debug = Debug('component:' + ContactFormComponent.tagName);

  protected scope: any = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
    send: this.sendSubmit,
    selectAll: this.selectAll,
    error: '',
  };

  constructor(element?: HTMLElement) {
    super(element);
    const $el = $(this.el);

    this.init(ContactFormComponent.observedAttributes);
  }

  public sendPost() {
    this.debug('sendPost', this.scope);

    const contactData = {
      'contact[firstName]': this.scope.firstName,
      'contact[lastName]': this.scope.lastName,
      'contact[phone]': this.scope.phone,
      'contact[email]': this.scope.email,
      'contact[message]': this.scope.message,
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

  public sendSubmit() {
    this.debug('sendSubmit', this.scope);

    $('#contact_form').submit(( event ) => {
      this.debug('Handler for .submit() called.');
      // event.preventDefault();
    });
  }

  public selectAll(event: JQuery.Event<HTMLElement>, scope: any, eventEl: HTMLElement) {
    this.debug('selectAll');
    window.getSelection().selectAllChildren(eventEl);
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    return null;
  }
}
