import { Component, Binder } from "@ribajs/core";
import { JQuery as $ } from "@ribajs/jquery";
import template from "./newsletter.component.html";
import { LocalesService } from "@ribajs/shopify-tda";
import { Utils } from "../../services/Utils";

// TODO move to general validation component class we can extend from
export interface ValidationObject {
  fields: {
    [name: string]: string | number;
  };
  valid: boolean;
  error?: string;
}

interface Scope {
  subscribe: NewsletterComponent["subscribe"];
  selectAll: NewsletterComponent["selectAll"];
  form: ValidationObject;
}

export class NewsletterComponent extends Component {
  public static tagName = "rv-newsletter";

  static get observedAttributes() {
    return [];
  }

  protected localesService = new LocalesService();

  protected scope: Scope = {
    subscribe: this.subscribe,
    selectAll: this.selectAll,
    form: {
      fields: {
        email: "",
        name: "",
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

  public subscribe(event: Event) {
    // stop native submit
    event.preventDefault();
    event.stopPropagation();

    if (!this.$form) {
      console.warn("No form found");
      return false;
    }

    this.validate(this.$form, this.scope.form);

    if (this.scope.form.valid) {
      this.$form.submit();
    } else {
      console.warn("form not valid", this.scope);
    }
  }

  public selectAll(
    context: Binder<any>,
    event: JQuery.Event,
    scope: any,
    eventEl: HTMLInputElement
  ) {
    Utils.selectAll(eventEl);
  }

  protected initValidation() {
    this.$form = this.$el.find("form") as JQuery<HTMLFormElement>;
    this.$form.attr("novalidate", "");
    this.$form.addClass("needs-validation");
  }

  protected validate(
    $form: JQuery<HTMLFormElement>,
    validationScope: ValidationObject
  ) {
    $form.each((index: number, formEl) => {
      validationScope.valid = formEl.checkValidity();
      validationScope.error = formEl.validationMessage;
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
    if (this.el.hasChildNodes()) {
      return null;
    } else {
      return template;
    }
  }
}
