import Debug from 'debug';
import $ from 'jquery';
import tinybind from 'tinybind';
import { Utils } from '../Utils';

export { routeBinder } from './route.binder';
export { slideoutTogglerBinder } from './slideout-toggler.binder';
export { autoscrollBinder } from './autoscroll.binder';

const binders = tinybind.binders;
const debug = Debug('rivets:binders');

binders.html = (el: HTMLElement, value: string) => {
  const $el = $(el);
  if (!Utils.isString(value)) {
    value = $el.attr('rv-html');
  }
  debug('rv-html', $el, value);
  $(el).html(value);
};

binders['append-html'] = (el: HTMLElement, value: string) => {
  const $el = $(el);
  if (!Utils.isString(value)) {
    value = $el.attr('rv-append-html');
  }
  debug('rv-append-html', $el, value);
  const htmlNodes = $.parseHTML(value);
  $(el).append(htmlNodes);
};

binders.mailto = (el: HTMLElement, value: string) => {
  $(el).attr('href', 'mailto:' + value);
};

binders.tel = (el: HTMLElement, value: string) => {
  $(el).attr('href', 'tel:' + value);
};

binders['background-image'] = (el: HTMLElement, value: string) => {
  const $el = $(el);
  $el.css('background-image', 'url(' + value + ')');
};

binders['image-box'] = (el: HTMLElement, value: string) => {
  const $el = $(el);
  $el.addClass('image-box');
  if (value) {
      const ratioStrings = value.split(':');
      const ratios = new Array<number>();
      ratios[0] = Number(ratioStrings[0]);
      ratios[1] = Number(ratioStrings[1]);
      const heightInPercent = (ratios[1] / ratios[0] * 100);
      const ratioClass = 'ratio-' + ratios[0] + '-' + ratios[1];
      const style = 'padding-top: ' + heightInPercent + '%;';
      $el.addClass(ratioClass);
      $('head').append('<style>.image-box.' + ratioClass + ':before{' + style + '}</style>');
      debug('ratio', value, style);
  }
};

/**
 * class-[classname]
 *
 * Custom version of class-[classname]
 * Adds a class (whatever value is in place of [classname]) on the element when the value evaluates to true and removes that class if the value evaluates to false.
 * @see http://rivetsjs.com/docs/reference/#class-[classname]
 */
binders['class-*'] = function(el: HTMLElement, value: string) {
  const $el = $(el);
  debug(this.arg);
  const className = this.arg[0];
  // debug('class-*', className, value);
  if (value) {
    $el.addClass(className);
  } else {
    $el.removeClass(className);
  }
  return value;
};

binders['add-class'] = (el: HTMLElement, value: string) => {
  const $el = $(el);
  if (value) {
    $el.addClass(value);
  }
  return value;
};

binders['remove-class'] = (el: HTMLElement, value: string) => {
  const $el = $(el);
  if (value) {
    $el.removeClass(value);
  }
  return value;
};

binders['for-*-*'] = function(el: HTMLElement, value: any) {
  const $el = $(el);
  const start = Number(this.arg[0]);
  const end = Number(this.arg[1]);
  debug('start', start, 'end', end);
  const html = $el.html();
  for (let index = start; index < end; index++) {
    // $el.children().clone().appendTo($el);
    debug('index', index);
    // html += html;
  }
  debug('html', html);
  // $el.html('test');

  return value;
};

export { binders };
