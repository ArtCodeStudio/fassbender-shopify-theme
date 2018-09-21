import $ from 'jquery';
import Debug from 'debug';

/**
 * Object that is going to deal with DOM parsing/manipulation
 *
 * @namespace Barba.Pjax.Dom
 * @type {Object}
 */
class Dom {
  /**
   * The name of the data attribute on the container
   *
   * @default
   */
  public dataNamespace = 'namespace';

  /**
   * Class name used to identify the containers
   *
   * @default
   */
  public containerSelector: string;

  /**
   * Full HTML String of the current page.
   * By default is the innerHTML of the initial loaded page.
   *
   * Each time a new page is loaded, the value is the response of the xhr call.
   *
   */
  public currentHTML?: string;

  private _$wrapper: JQuery<HTMLElement>;

  private parseTitle: boolean;

  private debug = Debug('router:Dom');

  constructor($wrapper: JQuery<HTMLElement>, containerSelector = '[data-namespace]', parseTitle: boolean) {
    this._$wrapper = $wrapper;
    this.containerSelector = containerSelector;
    this.parseTitle = parseTitle;
  }

  /**
   * Parse the responseText obtained from the xhr call
   */
  public parseResponse(responseText: string): JQuery<HTMLElement> {
    this.currentHTML = responseText;
    const $newPage = $( $.parseHTML(responseText) );

    if (this.parseTitle === true) {
      const $title = $newPage.filter('title');
      if ($title.length) {
        document.title = $title.text();
      }
    }

    return this.getContainer(($newPage as any));
  }

  /**
   * Get the main barba wrapper by the ID `wrapperId`
   */
  public getWrapper(): JQuery<HTMLElement> {
    return this._$wrapper;
  }

  /**
   * Get the container on the current DOM,
   * or from an HTMLElement passed via argument
   */
  public getContainer($newPage?: JQuery<HTMLElement>): JQuery<HTMLElement> {
    if (!$newPage) {
      $newPage = $(document.body);
    }
    if (!$newPage) {
      throw new Error('[DOM] DOM not ready!');
    }
    const $container = this.parseContainer($newPage);
    if (!$container) {
      throw new Error('[DOM] No container found');
    }
    this.debug('getContainer', $container);
    return $container;
  }

  /**
   * Get the namespace of the container
   */
  public getNamespace($element: JQuery<HTMLElement>): string {
    if ($element && $element.data()) {
      return $element.data('namespace');
    } else {
      throw new Error('[DOM] Missing data-namespace attribute');
    }
  }

  /**
   * Put the container on the page
   */
  public putContainer($element: JQuery<HTMLElement>) {
    this.debug('putContainer', $element);
    $element.css('visibility', 'hidden');
    const $wrapper = this.getWrapper();
    $wrapper.append($element);
  }

  /**
   * Get container selector
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param element
   */
  public parseContainer($newPage: JQuery<HTMLElement>): JQuery<HTMLElement> {
    const $container = $newPage.find(this.containerSelector);
    if (!$container.length) {
      this.debug(`No container with selector "${this.containerSelector}" found!`, $newPage);
      throw new Error(`No container with selector "${this.containerSelector}" found!`);
    }
    return $container;
  }
}

export { Dom };
