/*
 * decaffeinate suggestions:
 * DS001: Remove Babel/TypeScript constructor workaround
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Rivets.Binding
// --------------

// A single binding between a model attribute and a DOM element.
class Binding {
  // All information about the binding is passed into the constructor; the
  // containing view, the DOM node, the type of binding, the model object and the
  // keypath at which to listen for changes.
  constructor(view, el, type, keypath, options) {
    this.setBinder = this.setBinder.bind(this);
    this.observe = this.observe.bind(this);
    this.parseTarget = this.parseTarget.bind(this);
    this.parseFormatterArguments = this.parseFormatterArguments.bind(this);
    this.formattedValue = this.formattedValue.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.set = this.set.bind(this);
    this.sync = this.sync.bind(this);
    this.publish = this.publish.bind(this);
    this.bind = this.bind.bind(this);
    this.unbind = this.unbind.bind(this);
    this.update = this.update.bind(this);
    this.getValue = this.getValue.bind(this);
    this.view = view;
    this.el = el;
    this.type = type;
    this.keypath = keypath;
    if (options == null) { options = {}; }
    this.options = options;
    this.formatters = this.options.formatters || [];
    this.dependencies = [];
    this.formatterObservers = {};
    this.model = undefined;
    this.setBinder();
  }

  // Sets the binder to use when binding and syncing.
  setBinder() {
    if (!(this.binder = this.view.binders[this.type])) {
      for (let identifier in this.view.binders) {
        const value = this.view.binders[identifier];
        if ((identifier !== '*') && (identifier.indexOf('*') !== -1)) {
          const regexp = new RegExp(`^${identifier.replace(/\*/g, '.+')}$`);
          if (regexp.test(this.type)) {
            this.binder = value;
            this.args = new RegExp(`^${identifier.replace(/\*/g, '(.+)')}$`).exec(this.type);
            this.args.shift();
          }
        }
      }
    }

    if (!this.binder) { this.binder = this.view.binders['*']; }
    if (this.binder instanceof Function) { return this.binder = {routine: this.binder}; }
  }

  observe(obj, keypath, callback) {
    return Rivets.sightglass(obj, keypath, callback, {
      root: this.view.rootInterface,
      adapters: this.view.adapters
    }
    );
  }

  parseTarget() {
    const token = Rivets.TypeParser.parse(this.keypath);

    if (token.type === Rivets.TypeParser.types.primitive) {
      return this.value = token.value;
    } else {
      this.observer = this.observe(this.view.models, this.keypath, this.sync);
      return this.model = this.observer.target;
    }
  }

  parseFormatterArguments(args, formatterIndex) {
    let arg;
    args = ((() => {
      const result = [];
      for (arg of Array.from(args)) {         result.push(Rivets.TypeParser.parse(arg));
      }
      return result;
    })());
    const processedArgs = [];

    for (var ai = 0; ai < args.length; ai++) {
      arg = args[ai];
      processedArgs.push((() => {
        if (arg.type === Rivets.TypeParser.types.primitive) {
        return arg.value;
      } else {
        let observer;
        if (!this.formatterObservers[formatterIndex]) { this.formatterObservers[formatterIndex] = {}; }

        if (!(observer = this.formatterObservers[formatterIndex][ai])) {
          observer = this.observe(this.view.models, arg.value, this.sync);
          this.formatterObservers[formatterIndex][ai] = observer;
        }

        return observer.value();
      }
      
      })());
    }

    return processedArgs;
  }

  // Applies all the current formatters to the supplied value and returns the
  // formatted value.
  formattedValue(value) {
    for (let fi = 0; fi < this.formatters.length; fi++) {
      let formatter = this.formatters[fi];
      const args = formatter.match(/[^\s']+|'([^']|'[^\s])*'|"([^"]|"[^\s])*"/g);
      const id = args.shift();
      formatter = this.view.formatters[id];

      const processedArgs = this.parseFormatterArguments(args, fi);

      if ((formatter != null ? formatter.read : undefined) instanceof Function) {
        value = formatter.read.call(this.model, value, ...Array.from(processedArgs));
      } else if (formatter instanceof Function) {
        value = formatter.call(this.model, value, ...Array.from(processedArgs));
      }
    }

    return value;
  }

  // Returns an event handler for the binding around the supplied function.
  eventHandler(fn) {
    let binding;
    const { handler } = (binding = this).view;
    return function(ev) { return handler.call(fn, this, ev, binding); };
  }

  // Sets the value for the binding. This Basically just runs the binding routine
  // with the suplied value formatted.
  set(value) {
    // Since 0.9 : doesn't execute function unless backward compatibility is active
    value = (value instanceof Function && !this.binder.function && Rivets.public.executeFunctions) ?
      this.formattedValue(value.call(this.model))
    :
      this.formattedValue(value);

    return (this.binder.routine != null ? this.binder.routine.call(this, this.el, value) : undefined);
  }

  // Syncs up the view binding with the model.
  sync() {
    return this.set((() => {
      if (this.observer) {
      let observer;
      if (this.model !== this.observer.target) {
        for (observer of Array.from(this.dependencies)) { observer.unobserve(); }
        this.dependencies = [];

        if (((this.model = this.observer.target) != null) && (this.options.dependencies != null ? this.options.dependencies.length : undefined)) {
          for (let dependency of Array.from(this.options.dependencies)) {
            observer = this.observe(this.model, dependency, this.sync);
            this.dependencies.push(observer);
          }
        }
      }

      return this.observer.value();
    } else {
      return this.value;
    }
    
    })());
  }

  // Publishes the value currently set on the input element back to the model.
  publish() {
    if (this.observer) {
      let value = this.getValue(this.el);
      const lastformatterIndex = this.formatters.length - 1;

      const iterable = this.formatters.slice(0).reverse();
      for (let fiReversed = 0; fiReversed < iterable.length; fiReversed++) {
        const formatter = iterable[fiReversed];
        const fi = lastformatterIndex - fiReversed;
        const args = formatter.split(/\s+/);
        const id = args.shift();

        const processedArgs = this.parseFormatterArguments(args, fi);

        if (this.view.formatters[id] != null ? this.view.formatters[id].publish : undefined) {
          value = this.view.formatters[id].publish(value, ...Array.from(processedArgs));
        }
      }

      return this.observer.setValue(value);
    }
  }

  // Subscribes to the model for changes at the specified keypath. Bi-directional
  // routines will also listen for changes on the element to propagate them back
  // to the model.
  bind() {
    this.parseTarget();
    if (this.binder.bind != null) {
      this.binder.bind.call(this, this.el);
    }

    if ((this.model != null) && (this.options.dependencies != null ? this.options.dependencies.length : undefined)) {
      for (let dependency of Array.from(this.options.dependencies)) {
        const observer = this.observe(this.model, dependency, this.sync);
        this.dependencies.push(observer);
      }
    }

    if (this.view.preloadData) { return this.sync(); }
  }

  // Unsubscribes from the model and the element.
  unbind() {
    if (this.binder.unbind != null) {
      this.binder.unbind.call(this, this.el);
    }
    if (this.observer != null) {
      this.observer.unobserve();
    }

    for (var observer of Array.from(this.dependencies)) { observer.unobserve(); }
    this.dependencies = [];

    for (let fi in this.formatterObservers) {
      const args = this.formatterObservers[fi];
      for (let ai in args) { observer = args[ai]; observer.unobserve(); }
    }

    return this.formatterObservers = {};
  }

  // Updates the binding's model from what is currently set on the view. Unbinds
  // the old model first and then re-binds with the new model.
  update(models) {
    if (models == null) { models = {}; }
    this.model = this.observer != null ? this.observer.target : undefined;
    return (this.binder.update != null ? this.binder.update.call(this, models) : undefined);
  }

  // Returns elements value
  getValue(el) {
    if (this.binder && (this.binder.getValue != null)) {
      return this.binder.getValue.call(this, el);
    } else {
      return Rivets.Util.getInputValue(el);
    }
  }
};

// Rivets.ComponentBinding
// -----------------------

// A component view encapsulated as a binding within it's parent view.
Rivets.ComponentBinding = class ComponentBinding extends Rivets.Binding {
  // Initializes a component binding for the specified view. The raw component
  // element is passed in along with the component type. Attributes and scope
  // inflections are determined based on the components defined attributes.
  constructor(view, el, type) {
    {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) { super(); }
      let thisFn = (() => { return this; }).toString();
      let thisName = thisFn.slice(thisFn.indexOf('return') + 6 + 1, thisFn.indexOf(';')).trim();
      eval(`${thisName} = this;`);
    }
    this.locals = this.locals.bind(this);
    this.bind = this.bind.bind(this);
    this.unbind = this.unbind.bind(this);
    this.view = view;
    this.el = el;
    this.type = type;
    this.component = this.view.components[this.type];
    this.static = {};
    this.observers = {};
    this.upstreamObservers = {};

    const bindingRegExp = view.bindingRegExp();

    for (let attribute of Array.from(this.el.attributes || [])) {
      if (!bindingRegExp.test(attribute.name)) {
        const propertyName = this.camelCase(attribute.name);

        const token = Rivets.TypeParser.parse(attribute.value);

        if (Array.from(this.component.static != null ? this.component.static : []).includes(propertyName)) {
          this.static[propertyName] = attribute.value;
        } else if (token.type === Rivets.TypeParser.types.primitive) {
          this.static[propertyName] = token.value;
        } else {
          this.observers[propertyName] = attribute.value;
        }
      }
    }
  }

  // Intercepts `Rivets.Binding::sync` since component bindings are not bound to
  // a particular model to update it's value.
  sync() {}

  // Intercepts `Rivets.Binding::update` since component bindings are not bound
  // to a particular model to update it's value.
  update() {}

  // Intercepts `Rivets.Binding::publish` since component bindings are not bound
  // to a particular model to update it's value.
  publish() {}

  // Returns an object map using the component's scope inflections.
  locals() {
    let value;
    const result = {};

    for (var key in this.static) {
      value = this.static[key];
      result[key] = value;
    }

    for (key in this.observers) {
      const observer = this.observers[key];
      result[key] = observer.value();
    }

    return result;
  }

  // Returns a camel-cased version of the string. Used when translating an
  // element's attribute name into a property name for the component's scope.
  camelCase(string) {
    return string.replace(/-([a-z])/g, grouped => grouped[1].toUpperCase());
  }

  // Intercepts `Rivets.Binding::bind` to build `@componentView` with a localized
  // map of models from the root view. Bind `@componentView` on subsequent calls.
  bind() {
    let key;
    if (!this.bound) {
      for (key in this.observers) {
        const keypath = this.observers[key];
        this.observers[key] = this.observe(this.view.models, keypath, (key => { return () => {
          return this.componentView.models[key] = this.observers[key].value();
        }; }
        ).call(this, key)
        );
      }

      this.bound = true;
    }

    if (this.componentView != null) {
      this.componentView.bind();
    } else {
      this.el.innerHTML = this.component.template.call(this);
      const scope = this.component.initialize.call(this, this.el, this.locals());
      this.el._bound = true;

      const options = {};

      for (var option of Array.from(Rivets.extensions)) {
        var k, v;
        options[option] = {};
        if (this.component[option]) { for (k in this.component[option]) { v = this.component[option][k]; options[option][k] = v; } }
        for (k in this.view[option]) { v = this.view[option][k]; if (options[option][k] == null) { options[option][k] = v; } }
      }

      for (option of Array.from(Rivets.options)) {
        options[option] = this.component[option] != null ? this.component[option] : this.view[option];
      }

      this.componentView = new Rivets.View(Array.prototype.slice.call(this.el.childNodes), scope, options);
      this.componentView.bind();

      for (key in this.observers) {
        const observer = this.observers[key];
        this.upstreamObservers[key] = this.observe(this.componentView.models, key, ((key, observer) => () => {
          return observer.setValue(this.componentView.models[key]);
        }
        ).call(this, key, observer)
        );
      }
    }
  }

  // Intercept `Rivets.Binding::unbind` to be called on `@componentView`.
  unbind() {
    let observer;
    for (var key in this.upstreamObservers) {
      observer = this.upstreamObservers[key];
      observer.unobserve();
    }

    for (key in this.observers) {
      observer = this.observers[key];
      observer.unobserve();
    }

    return (this.componentView != null ? this.componentView.unbind.call(this) : undefined);
  }
};

// Rivets.TextBinding
// -----------------------

// A text node binding, defined internally to deal with text and element node
// differences while avoiding it being overwritten.
const Cls = (Rivets.TextBinding = class TextBinding extends Rivets.Binding {
  static initClass() {
  
    // A standard routine binder used for text node bindings.
    this.prototype.binder = {
      routine(node, value) {
        return node.data = value != null ? value : '';
      }
    };
  }
  // Initializes a text binding for the specified view and text node.
  constructor(view, el, type, keypath, options) {
    {
      // Hack: trick Babel/TypeScript into allowing this before super.
      if (false) { super(); }
      let thisFn = (() => { return this; }).toString();
      let thisName = thisFn.slice(thisFn.indexOf('return') + 6 + 1, thisFn.indexOf(';')).trim();
      eval(`${thisName} = this;`);
    }
    this.sync = this.sync.bind(this);
    this.view = view;
    this.el = el;
    this.type = type;
    this.keypath = keypath;
    if (options == null) { options = {}; }
    this.options = options;
    this.formatters = this.options.formatters || [];
    this.dependencies = [];
    this.formatterObservers = {};
  }

  // Wrap the call to `sync` in fat-arrow to avoid function context issues.
  sync() {
    return super.sync(...arguments);
  }
});
Cls.initClass();

export { Binding };