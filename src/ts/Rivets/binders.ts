import * as Debug from 'debug';
import $ = require('jquery');
import { Utils } from '../Utils';

const binders: any = {};
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

export { binders };
