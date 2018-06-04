import { Util } from './util';
import { View } from './view';
import * as jQuery from 'jquery';

/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Basic set of core binders that are included with Rivets.js.

// Sets the element's text value.
let binders: any = {};
binders.text = function(el, value) {
  if (el.textContent != null) {
    return el.textContent = (value != null) ? value : '';
  } else {
    return el.innerText = (value != null) ? value : '';
  }
};

// Sets the element's HTML content.
binders.html = (el, value) => el.innerHTML = (value != null) ? value : '';

// Shows the element when value is true.
binders.show = (el, value) => el.style.display = value ? '' : 'none';

// Hides the element when value is true (negated version of `show` binder).
binders.hide = (el, value) => el.style.display = value ? 'none' : '';

// Enables the element when value is true.
binders.enabled = (el, value) => el.disabled = !value;

// Disables the element when value is true (negated version of `enabled` binder).
binders.disabled = (el, value) => el.disabled = !!value;

// Checks a checkbox or radio input when the value is true. Also sets the model
// property when the input is checked or unchecked (two-way binder).
binders.checked = {
  publishes: true,
  priority: 2000,

  bind(el) {
    return Util.bindEvent(el, 'change', this.publish);
  },

  unbind(el) {
    return Util.unbindEvent(el, 'change', this.publish);
  },

  routine(el, value) {
    if (el.type === 'radio') {
      return el.checked = (el.value != null ? el.value.toString() : undefined) === (value != null ? value.toString() : undefined);
    } else {
      return el.checked = !!value;
    }
  }
};

// Unchecks a checkbox or radio input when the value is true (negated version of
// `checked` binder). Also sets the model property when the input is checked or
// unchecked (two-way binder).
binders.unchecked = {
  publishes: true,
  priority: 2000,

  bind(el) {
    return Util.bindEvent(el, 'change', this.publish);
  },

  unbind(el) {
    return Util.unbindEvent(el, 'change', this.publish);
  },

  routine(el, value) {
    if (el.type === 'radio') {
      return el.checked = (el.value != null ? el.value.toString() : undefined) !== (value != null ? value.toString() : undefined);
    } else {
      return el.checked = !value;
    }
  }
};

// Sets the element's value. Also sets the model property when the input changes
// (two-way binder).
binders.value = {
  publishes: true,
  priority: 3000,

  bind(el) {
    if ((el.tagName !== 'INPUT') || (el.type !== 'radio')) {
      this.event = el.tagName === 'SELECT' ? 'change' : 'input';
      return Util.bindEvent(el, this.event, this.publish);
    }
  },

  unbind(el) {
    if ((el.tagName !== 'INPUT') || (el.type !== 'radio')) {
      return Util.unbindEvent(el, this.event, this.publish);
    }
  },

  routine(el, value) {
    if ((el.tagName === 'INPUT') && (el.type === 'radio')) {
      return el.setAttribute('value', value);
    } else {
      el = jQuery(el);

      if ((value != null ? value.toString() : undefined) !== __guard__(el.val(), x => x.toString())) {
        return el.val((value != null) ? value : '');
      }
    }
  }
};

// Inserts and binds the element and it's child nodes into the DOM when true.
binders.if = {
  block: true,
  priority: 4000,

  bind(el) {
    if (this.marker == null) {
      const attr = [this.view.prefix, this.type].join('-').replace('--', '-');
      const declaration = el.getAttribute(attr);

      this.marker = document.createComment(` rivets: ${this.type} ${declaration} `);
      this.bound = false;

      el.removeAttribute(attr);
      el.parentNode.insertBefore(this.marker, el);
      return el.parentNode.removeChild(el);
    }
  },

  unbind() {
    if (this.nested) {
      this.nested.unbind();
      return this.bound = false;
    }
  },

  routine(el, value) {
    if (!!value === !this.bound) {
      if (value) {
        const models = {};
        for (let key in this.view.models) { const model = this.view.models[key]; models[key] = model; }

        (this.nested || (this.nested = new View(el, models, this.view.options()))).bind();
        this.marker.parentNode.insertBefore(el, this.marker.nextSibling);
        return this.bound = true;
      } else {
        el.parentNode.removeChild(el);
        this.nested.unbind();
        return this.bound = false;
      }
    }
  },

  update(models) {
    return (this.nested != null ? this.nested.update(models) : undefined);
  }
};

// Removes and unbinds the element and it's child nodes into the DOM when true
// (negated version of `if` binder).
binders.unless = {
  block: true,
  priority: 4000,

  bind(el) {
    return binders.if.bind.call(this, el);
  },

  unbind() {
    return binders.if.unbind.call(this);
  },

  routine(el, value) {
    return binders.if.routine.call(this, el, !value);
  },

  update(models) {
    return binders.if.update.call(this, models);
  }
};

// Binds an event handler on the element.
binders['on-*'] = {
  function: true,
  priority: 1000,

  unbind(el) {
    if (this.handler) { return Util.unbindEvent(el, this.args[0], this.handler); }
  },

  routine(el, value) {
    if (this.handler) { Util.unbindEvent(el, this.args[0], this.handler); }
    return Util.bindEvent(el, this.args[0], (this.handler = this.eventHandler(value)));
  }
};

// Appends bound instances of the element in place for each item in the array.
binders['each-*'] = {
  block: true,
  priority: 4000,

  bind(el) {
    if (this.marker == null) {
      const attr = [this.view.prefix, this.type].join('-').replace('--', '-');
      this.marker = document.createComment(` rivets: ${this.type} `);
      this.iterated = [];

      el.removeAttribute(attr);
      el.parentNode.insertBefore(this.marker, el);
      el.parentNode.removeChild(el);
    } else {
      for (let view of Array.from(this.iterated)) {
        view.bind();
      }
    }
    
  },

  unbind(el) {
    if (this.iterated != null) { for (let view of Array.from(this.iterated)) { view.unbind(); } }
  },

  routine(el, collection) {
    let view;
    const modelName = this.args[0];
    collection = collection || [];

    if (this.iterated.length > collection.length) {
      for (let i of Array.from(Array(this.iterated.length - collection.length))) {
        view = this.iterated.pop();
        view.unbind();
        this.marker.parentNode.removeChild(view.els[0]);
      }
    }

    for (let index = 0; index < collection.length; index++) {
      let model = collection[index];
      const data = {index};
      data[Rivets.public.iterationAlias(modelName)] = index;
      data[modelName] = model;

      if ((this.iterated[index] == null)) {
        for (let key in this.view.models) {
          model = this.view.models[key];
          if (data[key] == null) { data[key] = model; }
        }

        const previous = this.iterated.length ?
          this.iterated[this.iterated.length - 1].els[0]
        :
          this.marker;

        const options = this.view.options();
        options.preloadData = true;

        const template = el.cloneNode(true);
        view = new View(template, data, options);
        view.bind();
        this.iterated.push(view);

        this.marker.parentNode.insertBefore(template, previous.nextSibling);
      } else if (this.iterated[index].models[modelName] !== model) {
        this.iterated[index].update(data);
      }
    }

    if (el.nodeName === 'OPTION') {
      for (let binding of Array.from(this.view.bindings)) {
        if ((binding.el === this.marker.parentNode) && (binding.type === 'value')) {
          binding.sync();
        }
      }
    }
  },

  update(models) {
    const data = {};

    for (let key in models) {
      const model = models[key];
      if (key !== this.args[0]) { data[key] = model; }
    }

    for (let view of Array.from(this.iterated)) { view.update(data); }
  }
};

// Adds or removes the class from the element when value is true or false.
binders['class-*'] = function(el, value) {
  const elClass = ` ${el.className} `;

  if (!value === (elClass.indexOf(` ${this.args[0]} `) !== -1)) {
    return el.className = value ?
      `${el.className} ${this.args[0]}`
    :
      elClass.replace(` ${this.args[0]} `, ' ').trim();
  }
};

// Sets the attribute on the element. If no binder above is matched it will fall
// back to using this binder.
binders['*'] = function(el, value) {
  if (value != null) {
    return el.setAttribute(this.type, value);
  } else {
    return el.removeAttribute(this.type);
  }
};

function __guard__(value, transform) {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}

export { binders };