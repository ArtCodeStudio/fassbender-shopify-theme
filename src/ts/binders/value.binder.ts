import Debug from 'debug';
import $ from 'jquery';
import { ITwoWayBinder } from '../tinybind';
import { Utils } from '../services/Utils';
import { BinderWrapper } from './binders.service';

/**
 * value for inpouts, textareas and contenteditables
 * TODO support select
 */
export const valueBinder: BinderWrapper = () => {
  const debug = Debug('binder:value');
  const name = 'value';
  const value: ITwoWayBinder<string> = {
    bind(el: HTMLElement) {
      debug('bind', this);
      this.customData = {};
      this.customData.$el = $(el);
      this.customData.type = this.customData.$el.prop('type');
      this.customData.tagName = this.customData.$el.prop('tagName');
      this.customData.contenteditable = this.customData.$el.attr('contenteditable') ? true : false;
      this.customData.$el.on('change input keyup paste blur focus', () => {
        this.publish();
      });
    },

    unbind(el: HTMLElement) {
      this.customData.$el.off('change input keyup paste blur focus');
      delete this.customData;
    },

    routine(el: HTMLInputElement, newValue: string) {
      debug('routine newValue', newValue);
      if (Utils.isString(newValue)) {
        const oldValue = this.getValue(el);
        debug('routine', oldValue, newValue);
        if (oldValue !== newValue) {
          switch (this.customData.tagName) {
            case 'INPUT':
              this.customData.$el.val(newValue);
              break;
            case 'TEXTAREA':
              this.customData.$el.val(newValue);
              break;
            default:
              // e.g. on contenteditable
              this.customData.$el.html(newValue);
              break;
          }
        }
      }
    },

    getValue(el: HTMLElement) {
      let val;
      switch (this.customData.tagName) {
        case 'INPUT':
          switch (this.customData.type) {
            case 'number':
            val = parseFloat(this.customData.$el.val()) || 0;
            break;
            default:
              val = this.customData.$el.val().toString();
              break;
          }
          break;
        case 'TEXTAREA':
          val = this.customData.$el.val().toString();
          break;
        default:
          // e.g. on contenteditable
          val = this.customData.$el.html();
          break;
      }
      debug('getValue', val);
      return val;
    },
    priority: 3000,
    publishes: true,
  };

  return {
    binder: value,
    name,
  };
};
