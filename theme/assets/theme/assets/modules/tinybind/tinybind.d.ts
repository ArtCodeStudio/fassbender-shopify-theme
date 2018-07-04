import { parseTemplate, parseType } from './parsers';
import { IFormatters, FormatterService } from './formatter.service';
import { Binding } from './binding';
import { IBinders, BindersService } from './binder.service';
import { View } from './view';
import { IAdapters } from './adapter';
import { Root } from './observer';
import { IComponents, ComponentService } from './component.service';
interface IExtensions {
    binders: IBinders<any>;
    formatters: IFormatters;
    components: IComponents;
    adapters: IAdapters;
}
export interface IOptions {
    /** Attribute prefix in templates */
    prefix?: string;
    /** Preload templates with initial data on bind */
    preloadData?: boolean;
    /** Root sightglass interface for keypaths */
    rootInterface?: string;
    /** Template delimiters for text bindings */
    templateDelimiters?: Array<string>;
    /** Augment the event handler of the on-* binder */
    handler?: Function;
}
export declare interface IOptionsParam extends IExtensions, IOptions {
}
export declare interface IViewOptions extends IOptionsParam {
    starBinders: any;
    rootInterface: Root;
}
export declare class Tinybind {
    binderService: BindersService;
    componentService: ComponentService;
    formatterService: FormatterService;
    /** Global binders */
    binders: IBinders<any>;
    /** Global components. */
    components: IComponents;
    /** Global formatters. */
    formatters: IFormatters;
    /** Global (sightglass) adapters. */
    adapters: IAdapters;
    /** Default attribute prefix. */
    private _prefix;
    /** Default attribute full prefix. */
    private _fullPrefix;
    prefix: string;
    readonly fullPrefix: string;
    parseTemplate: typeof parseTemplate;
    parseType: typeof parseType;
    /** Default template delimiters. */
    templateDelimiters: string[];
    /** Default sightglass root interface. */
    rootInterface: string;
    /** Preload data by default. */
    preloadData: boolean;
    constructor();
    /**
     * Default event handler.
     */
    static handler(this: any, context: any, ev: Event, binding: Binding): void;
    /**
     * Sets the attribute on the element. If no binder above is matched it will fall
     * back to using this binder.
     */
    static fallbackBinder(this: Binding, el: HTMLElement, value: any): void;
    /**
     * Merges an object literal into the corresponding global options.
     * @param options
     */
    configure(options: any): void;
    /**
     * Initializes a new instance of a component on the specified element and
     * returns a tinybind.View instance.
     */
    init(componentKey: string, el: HTMLElement, data?: {}): View;
    /**
     * Binds some data to a template / element. Returns a tinybind.View instance.
     */
    bind(el: HTMLElement, models: any, options?: IOptionsParam): View;
}
declare const tinybind: Tinybind;
export { tinybind };
export default tinybind;
