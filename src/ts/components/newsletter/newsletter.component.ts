import Debug from 'debug';
import $ from 'jquery';
import { RibaComponent } from '../../tinybind';
import template from './newsletter.component.html';

declare global {
  // tslint:disable: interface-name
  interface Window { model: any; }
}

export class NewsletterComponent extends RibaComponent {

  public static tagName: string = 'rv-newsletter';

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

    this.bind();
  }

  public send() {
    this.debug('send');
  }

  public selectAll(event: JQuery.Event<HTMLElement>, scope: any, eventEl: HTMLElement) {
    this.debug('selectAll');
    window.getSelection().selectAllChildren(eventEl);
  }

  protected template() {
    return null; // template;
  }
}
