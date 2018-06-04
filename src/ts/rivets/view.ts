
import { Rivets } from './rivets';
import { TextTemplateParser } from './parsers';
/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * DS205: Consider reworking code to avoid use of IIFEs
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Rivets.View
// -----------

// A collection of bindings built from a set of parent nodes.
class View {
  els;
  models;
  bindings;

  // The DOM elements and the model objects for binding are passed into the
  // constructor along with any local options that should be used throughout the
  // context of the view and it's bindings.
  constructor(els, models, options?) {
    this.options = this.options.bind(this);
    this.bindingRegExp = this.bindingRegExp.bind(this);
    this.buildBinding = this.buildBinding.bind(this);
    this.build = this.build.bind(this);
    this.traverse = this.traverse.bind(this);
    this.select = this.select.bind(this);
    this.bind = this.bind.bind(this);
    this.unbind = this.unbind.bind(this);
    this.sync = this.sync.bind(this);
    this.publish = this.publish.bind(this);
    this.update = this.update.bind(this);
    this.els = els;
    this.models = models;

    if (options == null) { options = {}; }
    if (!this.els.jquery && !(this.els instanceof Array)) { this.els = [this.els]; }

    for (var option of Array.from(Rivets.extensions)) {
      var k, v;
      this[option] = {};
      if (options[option]) { for (k in options[option]) { v = options[option][k]; this[option][k] = v; } }
      for (k in Rivets[option]) { v = Rivets.public[option][k]; if (this[option][k] == null) { this[option][k] = v; } }
    }

    for (option of Array.from(Rivets.options)) {
      this[option] = options[option] != null ? options[option] : Rivets.public[option];
    }

    this.build();
  }

  options() {
    const options = {};

    for (let option of Array.from(Rivets.extensions.concat(Rivets.options))) {
      options[option] = this[option];
    }

    return options;
  }

  // Regular expression used to match binding attributes.
  bindingRegExp() {
    return new RegExp(`^${this.prefix}-`);
  }

  buildBinding(binding, node, type, declaration) {
    let dependencies;
    const options = {};

    const pipes = (Array.from(declaration.match(/((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$/g)).map((pipe) => pipe.trim()));
    const context = (Array.from(pipes.shift().split('<')).map((ctx) => ctx.trim()));
    const keypath = context.shift();

    options.formatters = pipes;

    if (dependencies = context.shift()) {
      options.dependencies = dependencies.split(/\s+/);
    }

    return this.bindings.push(new (Rivets[binding])(this, node, type, keypath, options));
  }

  // Parses the DOM tree and builds `Rivets.Binding` instances for every matched
  // binding declaration.
  build() {
    this.bindings = [];

    var parse = node => {
      let block;
      if (node.nodeType === 3) {
        let delimiters;
        const parser = TextTemplateParser;

        if (delimiters = Rivets.templateDelimiters) {
          let tokens;
          if ((tokens = parser.parse(node.data, delimiters)).length) {
            if ((tokens.length !== 1) || (tokens[0].type !== parser.types.text)) {
              for (let token of Array.from(tokens)) {
                const text = document.createTextNode(token.value);
                node.parentNode.insertBefore(text, node);

                if (token.type === 1) {
                  this.buildBinding('TextBinding', text, null, token.value);
                }
              }
              node.parentNode.removeChild(node);
            }
          }
        }
      } else if (node.nodeType === 1) {
        block = this.traverse(node);
      }

      if (!block) {
        for (let childNode of Array.from((Array.from(node.childNodes)))) { parse(childNode); }
      }
    };

    for (let el of Array.from(this.els)) { parse(el); }

    this.bindings.sort((a, b) => ((b.binder != null ? b.binder.priority : undefined) || 0) - ((a.binder != null ? a.binder.priority : undefined) || 0));

  }

  traverse(node) {
    let attributes, type, value;
    const bindingRegExp = this.bindingRegExp();
    let block = (node.nodeName === 'SCRIPT') || (node.nodeName === 'STYLE');

    for (var attribute of Array.from(node.attributes)) {
      if (bindingRegExp.test(attribute.name)) {
        var binder;
        type = attribute.name.replace(bindingRegExp, '');

        if (!(binder = this.binders[type])) {
          for (let identifier in this.binders) {
            value = this.binders[identifier];
            if ((identifier !== '*') && (identifier.indexOf('*') !== -1)) {
              const regexp = new RegExp(`^${identifier.replace(/\*/g, '.+')}$`);
              if (regexp.test(type)) {
                binder = value;
              }
            }
          }
        }

        if (!binder) { binder = this.binders['*']; }

        if (binder.block) {
          block = true;
          attributes = [attribute];
        }
      }
    }

    for (attribute of Array.from(attributes || node.attributes)) {
      if (bindingRegExp.test(attribute.name)) {
        type = attribute.name.replace(bindingRegExp, '');
        this.buildBinding('Binding', node, type, attribute.value);
      }
    }

    if (!block) {
      type = node.nodeName.toLowerCase();

      if (this.components[type] && !node._bound) {
        this.bindings.push(new Rivets.ComponentBinding(this, node, type));
        block = true;
      }
    }

    return block;
  }

  // Returns an array of bindings where the supplied function evaluates to true.
  select(fn) {
    return (() => {
      const result = [];
      for (let binding of Array.from(this.bindings)) {         if (fn(binding)) {
          result.push(binding);
        }
      }
      return result;
    })();
  }

  // Binds all of the current bindings for this view.
  bind() {
    for (let binding of Array.from(this.bindings)) { binding.bind(); }
  }

  // Unbinds all of the current bindings for this view.
  unbind() {
    for (let binding of Array.from(this.bindings)) { binding.unbind(); }
  }

  // Syncs up the view with the model by running the routines on all bindings.
  sync() {
    for (let binding of Array.from(this.bindings)) { if (typeof binding.sync === 'function') {
      binding.sync();
    } }
  }

  // Publishes the input values from the view back to the model (reverse sync).
  publish() {
    for (let binding of Array.from(this.select(b => b.binder != null ? b.binder.publishes : undefined))) { binding.publish(); }
  }

  // Updates the view's models along with any affected bindings.
  update(models) {
    if (models == null) { models = {}; }
    for (let key in models) { const model = models[key]; this.models[key] = model; }
    for (let binding of Array.from(this.bindings)) { if (typeof binding.update === 'function') {
      binding.update(models);
    } }
  }
};

export { View };