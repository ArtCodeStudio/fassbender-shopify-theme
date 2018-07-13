import { View } from '../../view';
import { IBindable } from '../../binding';
import { times, getString } from '../../utils';
import { IBinders, ITwoWayBinder, IOneWayBinder } from '../../binder.service';

import { enabled } from './enabled.binder';
import { disabled } from './disabled.binder';
import { onStarBinderWrapper } from './on-star.binder';
import { valueBinder } from './value.binder';
import $ from 'jquery';

/**
 * Gets the basiic binders
 * @param jQuery Pass JQuery to basic binders to get JQuery support
 */
export const basicBindersWrapper = (jQuery: JQueryStatic) => {

  const binders: IBinders<any> = {
    /**
     * Binds an event handler on the element.
     */
    'on-*': onStarBinderWrapper(jQuery).binder,

    /**
     * Appends bound instances of the element in place for each item in the array.
     */
    'each-*': <ITwoWayBinder<any>> {
      block: true,

      priority: 4000,

      bind(el: HTMLElement) {
        if (!this.marker) {
          this.marker = document.createComment(` tinybind: ${this.type} `);
          this.customData = {
            iterated: <View[]> [],
          };
          if (!el.parentNode) {
            throw new Error('No parent node!');
          }
          el.parentNode.insertBefore(this.marker, el);
          el.parentNode.removeChild(el);
        } else {
          this.customData.iterated.forEach((view: View)  => {
            view.bind();
          });
        }
      },

      unbind(el) {
        if (this.customData.iterated) {
          this.customData.iterated.forEach((view: View) => {
            view.unbind();
          });
        }
      },

      routine(el, collection) {
        if (this.args === null) {
          throw new Error('args is null');
        }
        const modelName = this.args[0];
        collection = collection || [];

        // TODO support object keys to iterate over
        if (!Array.isArray(collection)) {
          throw new Error('each-' + modelName + ' needs an array to iterate over, but it is');
        }

        // if index name is seted by `index-property` use this name, otherwise `%[modelName]%`
        const indexProp = el.getAttribute('index-property') || this.getIterationAlias(modelName);

        collection.forEach((model, index) => {
          const scope: any = {$parent: this.view.models};
          scope[indexProp] = index;
          scope[modelName] = model;
          let view = this.customData.iterated[index];

          if (!view) {
            let previous: Comment | HTMLElement;

            if (this.customData.iterated.length) {
              previous = this.customData.iterated[this.customData.iterated.length - 1].els[0];
            } else if (this.marker) {
              previous = this.marker;
            } else {
              throw new Error('previous not defined');
            }

            view = View.create(this, scope, previous.nextSibling);
            this.customData.iterated.push(view);
          } else {
            if (view.models[modelName] !== model) {
              // search for a view that matches the model
              let matchIndex;
              let nextView;
              for (let nextIndex = index + 1; nextIndex < this.customData.iterated.length; nextIndex++) {
                nextView = this.customData.iterated[nextIndex];
                if (nextView.models[modelName] === model) {
                  matchIndex = nextIndex;
                  break;
                }
              }
              if (matchIndex !== undefined) {
                // model is in other position
                // todo: consider avoiding the splice here by setting a flag
                // profile performance before implementing such change
                this.customData.iterated.splice(matchIndex, 1);
                if (!this.marker || !this.marker.parentNode) {
                  throw new Error('Marker has no parent node');
                }
                this.marker.parentNode.insertBefore(nextView.els[0], view.els[0]);
                nextView.models[indexProp] = index;
              } else {
                // new model
                nextView = View.create(this, scope, view.els[0]);
              }
              this.customData.iterated.splice(index, 0, nextView);
            } else {
              view.models[indexProp] = index;
            }
          }
        });

        if (this.customData.iterated.length > collection.length) {
          times(this.customData.iterated.length - collection.length, () => {
            const view = this.customData.iterated.pop();
            view.unbind();
            if (!this.marker || !this.marker.parentNode) {
              throw new Error('Marker has no parent node');
            }
            this.marker.parentNode.removeChild(view.els[0]);
          });
        }

        if (el.nodeName === 'OPTION' && this.view.bindings) {
          this.view.bindings.forEach((binding: IBindable) => {
            if (this.marker && (binding.el === this.marker.parentNode) && (binding.type === 'value') && binding.sync) {
              binding.sync();
            }
          });
        }
      },

      update(models) {
        const data: any = {};
        // TODO: add test and fix if necessary
        Object.keys(models).forEach((key) => {
          if (this.args === null) {
            throw new Error('args is null');
          }
          if (key !== this.args[0]) {
            data[key] = models[key];
          }
        });

        this.customData.iterated.forEach((view: View) => {
          view.update(data);
        });
      },
    },

    /**
     * Adds or removes the class from the element when value is true or false.
     */
    'class-*': <IOneWayBinder<boolean>> function(el: HTMLElement, value: boolean) {
      if (this.args === null) {
        throw new Error('args is null');
      }
      const classList = el.className.split(' ').filter((ele) => ele !== '');
      const arg = this.args[0].trim();
      const idx = classList.indexOf(arg);
      if (idx === -1) {
        if (value) {
          el.className += ` ${arg}`;
        }
      } else if (!value) {
        el.className = classList.filter((_, i) => i !== idx).join(' ');
      }
    },

    /**
     * Sets the element's text value.
     */
    'text'(el: HTMLElement, value: string) {
      el.textContent = value != null ? value : '';
    },

    /**
     * Sets the element's HTML content.
     */
    'html'(el: HTMLElement, value: string) {
      el.innerHTML = value != null ? value : '';
    },

    /**
     * Shows the element when value is true.
     */
    'show': (el: HTMLElement, value: boolean) => {
      el.style.display = value ? '' : 'none';
    },

    /**
     * Hides the element when value is true (negated version of `show` binder).
     */
    'hide': (el: HTMLElement, value: boolean) => {
      el.style.display = value ? 'none' : '';
    },

    /**
     * Enables the element when value is true.
     */
    'enabled': enabled,

    /**
     * Disables the element when value is true (negated version of `enabled` binder).
     */
    'disabled': disabled,

    /**
     * Checks a checkbox or radio input when the value is true. Also sets the model
     * property when the input is checked or unchecked (two-way binder).
     */
    'checked': <ITwoWayBinder<any>> {
      publishes: true,
      priority: 2000,

      bind(el) {
        const self = this;
        this.customData = {};
        if (!this.customData.callback) {
          this.customData.callback = () => {
            self.publish();
          };
        }
        el.addEventListener('change', this.customData.callback);
      },

      unbind(el) {
        el.removeEventListener('change', this.customData.callback);
      },

      routine(el: HTMLSelectElement, value) {
        if (el.type === 'radio') {
          el.checked = getString(el.value) === getString(value);
        } else {
          el.checked = !!value;
        }
      },
    },

    /**
     * Sets the element's value. Also sets the model property when the input changes
     * (two-way binder).
     */
    'value': valueBinder,

    /**
     * Inserts and binds the element and it's child nodes into the DOM when true.
     */
    'if': <ITwoWayBinder<any>> {
      block: true,
      priority: 4000,

      bind(el: HTMLUnknownElement) {
        this.customData = {};
        if (!this.marker) {
          this.marker = document.createComment(' tinybind: ' + this.type + ' ' + this.keypath + ' ');
          this.customData.attached = false;
          if (!el.parentNode) {
            throw new Error('Element has no parent node');
          }
          el.parentNode.insertBefore(this.marker, el);
          el.parentNode.removeChild(el);
        } else if ( this.customData.bound === false &&  this.customData.nested) {
          this.customData.nested.bind();
        }
        this.customData.bound = true;
      },

      unbind() {
        if ( this.customData.nested) {
          this.customData.nested.unbind();
          this.customData.bound = false;
        }
      },

      routine(el: HTMLElement, value: boolean) {
        value = !!value;
        if (value !== this.customData.attached) {
          if (value) {

            if (! this.customData.nested) {
              this.customData.nested = new View(el, this.view.models, this.view.options);
              this.customData.nested.bind();
            }
            if (!this.marker || !this.marker.parentNode) {
              throw new Error('Marker has no parent node');
            }
            this.marker.parentNode.insertBefore(el, this.marker.nextSibling);
            this.customData.attached = true;
          } else {
            if (!el.parentNode) {
              throw new Error('Element has no parent node');
            }
            el.parentNode.removeChild(el);
            this.customData.attached = false;
          }
        }
      },

      update(models) {
        if ( this.customData.nested) {
          this.customData.nested.update(models);
        }
      },
    },
  };
  return binders;
};
