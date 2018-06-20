import Debug from 'debug';
import $ from 'jquery';
import { ITwoWayBinder } from 'tinybind';
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
    bind(el) {
      debug('bind', this);
      this.data = {};
      this.data.$el = $(el);
      this.data.type = this.data.$el.prop('type');
      this.data.tagName = this.data.$el.prop('tagName');
      this.data.contenteditable = this.data.$el.attr('contenteditable') ? true : false;
      this.data.$el.on('change input keyup paste blur focus', () => {
        this.publish();
      });
    },

    unbind(el) {
      this.data.$el.off('change input keyup paste blur focus');
      delete this.data;
    },

    routine(el, newValue) {
      debug('routine newValue', newValue);
      if (Utils.isString(newValue)) {
        const oldValue = this.getValue(el);
        debug('routine', oldValue, newValue);
        if (oldValue !== newValue) {
          switch (this.data.tagName) {
            case 'INPUT':
              this.data.$el.val(newValue);
              break;
            case 'TEXTAREA':
              this.data.$el.val(newValue);
              break;
            default:
              // e.g. on contenteditable
              this.data.$el.html(newValue);
              break;
          }
        }
      }
    },

    getValue(el) {
      let val;
      switch (this.data.tagName) {
        case 'INPUT':
          switch (this.data.type) {
            case 'number':
            val = parseFloat(this.data.$el.val()) || 0;
            break;
            default:
              val = this.data.$el.val().toString();
              break;
          }
          break;
        case 'TEXTAREA':
          val = this.data.$el.val().toString();
          break;
        default:
          // e.g. on contenteditable
          val = this.data.$el.html();
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
