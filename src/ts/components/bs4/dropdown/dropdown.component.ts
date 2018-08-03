import Debug from 'debug';
import { RibaComponent } from '../../../tinybind';
import { DropdownService } from './dropdown.service';
import $ from '../../../jquery';

export class DropdownComponent extends RibaComponent {

  public static tagName: string = 'bs4-dropdown';

  protected debug = Debug('component:bs4-dropdown');
  protected scope: any = {
    toggle: this.toggle,
  };

  private dropdownService: DropdownService;

  static get observedAttributes() {
    return [];
  }

  constructor(element?: HTMLElement) {
    super(element);
    const self = this;
    const $el = $(this.el);
    this.dropdownService = new DropdownService($el.find('.dropdown-toggle')[0] as HTMLButtonElement);
    this.init(DropdownComponent.observedAttributes);
  }

  public toggle(event: Event) {
    this.debug('toggle');
    event.preventDefault();
    event.stopPropagation();
    return this.dropdownService.toggle();
  }

  protected template() {
    return null;
  }
}
