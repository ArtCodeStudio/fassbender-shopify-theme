import { View } from './view';

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// The Rivets namespace.
class Rivets {
  
  // private
  static options: [
    'prefix',
    'templateDelimiters',
    'rootInterface',
    'preloadData',
    'handler',
    'executeFunctions'
  ];

  // private
  static extensions: [
    'binders',
    'formatters',
    'components',
    'adapters'
  ];

  // Global binders.
  public binders: {};

  // Global components.
  public components: {};

  // Global formatters.
  public formatters: {};

  // Global sightglass adapters.
  public adapters: {};

  // Default attribute prefix.
  public prefix: 'rv';

  // Default template delimiters.
  public static templateDelimiters: ['{', '}'];

  // Default sightglass root interface.
  public rootInterface: '.';

  // Preload data by default.
  public preloadData: true;

  // Execute functions in bindings. Defaultis false since rivets 0.9. Set to true to be backward compatible with rivets 0.8.
  public executeFunctions: false;

  // Alias for index in rv-each binder
  public iterationAlias(modelName) {
    return `%${modelName}%`;
  };

  // Default event handler.
  public static handler(context, ev, binding) {
    return this.call(context, ev, binding.view.models);
  };

  // Merges an object literal into the corresponding global options.
  public configure(options) {
    if (options == null) { options = {}; }
    for (let option in options) {
      const value = options[option];
      if (['binders', 'components', 'formatters', 'adapters'].includes(option)) {
        for (let key in value) {
          const descriptor = value[key];
          Rivets[option][key] = descriptor;
        }
      } else {
        Rivets[option] = value;
      }
    }

  };

  // Binds some data to a template / element. Returns a Rivets.View instance.
  public bind(el, models, options) {
    if (models == null) { models = {}; }
    if (options == null) { options = {}; }
    const view = new View(el, models, options);
    view.bind();
    return view;
  };

  // Initializes a new instance of a component on the specified element and
  // returns a Rivets.View instance.
  public init(component, el, data) {
    if (data == null) { data = {}; }
    if (el == null) { el = document.createElement('div'); }
    component = this.components[component];
    const template = component.template.call(this, el);
    if (template instanceof HTMLElement) {
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
      el.appendChild(template);
    } else {
      el.innerHTML = template;
    }
    const scope = component.initialize.call(this, el, data);

    const view = new View(el, scope, null);
    view.bind();
    return view;
  }
};

export { Rivets };