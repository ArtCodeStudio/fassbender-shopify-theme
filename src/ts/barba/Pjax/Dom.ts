

/**
 * Object that is going to deal with DOM parsing/manipulation
 *
 * @namespace Barba.Pjax.Dom
 * @type {Object}
 */
var Dom = {
  /**
   * The name of the data attribute on the container
   *
   * @memberOf Barba.Pjax.Dom
   * @type {String}
   * @default
   */
  dataNamespace: 'namespace',

  /**
   * Id of the main wrapper
   *
   * @memberOf Barba.Pjax.Dom
   * @type {String}
   * @default
   */
  wrapperId: 'barba-wrapper',

  /**
   * Class name used to identify the containers
   *
   * @memberOf Barba.Pjax.Dom
   * @type {String}
   * @default
   */
  containerClass: 'barba-container',

  /**
   * Full HTML String of the current page.
   * By default is the innerHTML of the initial loaded page.
   *
   * Each time a new page is loaded, the value is the response of the xhr call.
   *
   * @memberOf Barba.Pjax.Dom
   * @type {String}
   */
  currentHTML: document.documentElement.innerHTML,

  /**
   * Parse the responseText obtained from the xhr call
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {String} responseText
   * @return {JQuery<HTMLElement>}
   */
  parseResponse: function(responseText: string): JQuery<HTMLElement> {
    this.currentHTML = responseText;
    var $wrapper = $( $.parseHTML(responseText) );
    var $title = $wrapper.filter('title');
    if ($title.length) {
      document.title = $title.text();
    }
    return this.getContainer($wrapper);
  },

  /**
   * Get the main barba wrapper by the ID `wrapperId`
   *
   * @memberOf Barba.Pjax.Dom
   * @return {JQuery<HTMLElement>} element
   */
  getWrapper: function(): JQuery<HTMLElement> {
    var $wrapper = $('#'+this.wrapperId);

    if (!$wrapper) {
      throw new Error('Barba.js: wrapper not found!');
    }

    return $wrapper;
  },

  /**
   * Get the container on the current DOM,
   * or from an HTMLElement passed via argument
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {HTMLElement} element
   * @return {HTMLElement}
   */
  getContainer: function($element: JQuery<HTMLElement>): JQuery<HTMLElement> {
    if (!$element) {
      $element = $(document.body);
    }
    if (!$element) {
      throw new Error('Barba.js: DOM not ready!');
    }
    var $container = this.parseContainer($element);
    if (!$container) {
      throw new Error('Barba.js: no container found');
    }
    return $container;
  },

  /**
   * Get the namespace of the container
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {HTMLElement} element
   * @return {String}
   */
  getNamespace: function($element: JQuery<HTMLElement>): string {
    if ($element && $element.data()) {
      return $element.data('namespace')
    }

    return null;
  },

  /**
   * Put the container on the page
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {HTMLElement} element
   */
  putContainer ($element: JQuery<HTMLElement>) {
    $element.css('visibility', 'hidden');

    var $wrapper = this.getWrapper();
    $wrapper.append($element);
  },

  /**
   * Get container selector
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param  {HTMLElement} element
   * @return {HTMLElement} element
   */
  parseContainer ($element: JQuery<HTMLElement>): JQuery<HTMLElement> {
    return $element.find('.' + this.containerClass);
  }
};

export { Dom };