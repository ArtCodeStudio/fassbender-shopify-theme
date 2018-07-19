import Debug from 'debug';
import $ from 'jquery';
import { ShopifySectionComponent, RibaComponent } from '../../tinybind';
import template from './newsletter.component.html';

export class NewsletterComponent extends RibaComponent {

  public static tagName: string = 'rv-newsletter';

  static get observedAttributes() {
    return [];
  }

  protected debug = Debug('component:' + NewsletterComponent.tagName);

  protected scope: any = {
    name: '',
    mail: '',
    send: this.send,
    selectAll: this.selectAll,
  };

  constructor(element?: HTMLElement) {
    super(element);
    const $el = $(this.el);

    this.init(NewsletterComponent.observedAttributes);
  }

  public send() {
    this.debug('send');
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
