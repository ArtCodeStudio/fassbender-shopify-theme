declare module 'rivets' {
  // TODO: check if these are correct:
  export interface Options {
    // Attribute prefix in templates
    prefix?: string;

    //Preload templates with initial data on bind
    preloadData?: boolean;

    //Root sightglass interface for keypaths
    rootInterface?: string;

    // Template delimiters for text bindings
    templateDelimiters?: Array<string>

    // Augment the event handler of the on-* binder
    handler?: Function;
  }

  export interface Observer {
    unobserve: () => any
    value: () => any
  }

  export interface View extends Options {
    models: Object
    options: () => Options
    build(): void
    bind(): void
    unbind(): void
    addBinding(node: HTMLElement, type: Binder<any> | string, declaration: string): Binding
  }

  export interface Binding {
    view: View
    unbind: () => void
    observe: (obj: Object, keypath: string, callback: (newValue: any) => void) => Observer
    keypath: string
    args: string[]
    eventHandler: (handler: (event: Event) => void) => () => any
    binderData: any
  }

  export interface FunctionalBinder<ValueType> {
    (this: Binding, element: HTMLElement, value: ValueType): void
  }

  export interface Binder<ValueType> {
    routine?: (this: Binding, element: HTMLElement, value: ValueType) => void
    bind?: (this: Binding, element: HTMLElement) => void
    unbind?: (this: Binding, element: HTMLElement) => void
    update?: (this: Binding, model: ValueType) => void
    getValue?: (this: Binding, element: HTMLElement) => void
    block?: boolean
    function?: boolean
  }

  export interface Component {
    template?: string | (() => string) | (() => HTMLElement);
  }

  export interface Binders {
    [name: string]: Binder<any> | FunctionalBinder<any>;
  }

  export interface Rivets extends Options{
    // Global binders.
    binders: Binders;

    // Global components.
    components: Object;

    // Global formatters.
    formatters: Object;

    // Global sightglass adapters.
    adapters: Object;

    handler(context: any, ev: Event, biding: any): void;

    configure(options?: Options): void;

    // bind(element: HTMLElement, models: Object, options?: Object): View;
    // bind(element: JQuery, models: Object, options?: Object): View;
    bind(element: HTMLElement | Array<HTMLElement> | JQuery<HTMLElement>, models: any, options?: any): View;

    _: {
      sightglass: any
    }
  }

  export const rivets: Rivets

  // export default rivets
}