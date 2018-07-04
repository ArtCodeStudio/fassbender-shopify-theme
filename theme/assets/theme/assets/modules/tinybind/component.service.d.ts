import { IBinders } from './binder.service';
import { IFormatters } from './formatter.service';
import { IComponent, IComponents } from './component.service';
import { IAdapters } from './adapter';
export declare type Scope = any;
export interface IComponent<ValueType> {
    template: (() => string) | (() => HTMLElement);
    initialize: (el: HTMLElement, data: ValueType) => Scope;
    binders?: IBinders<any>;
    formatters?: IFormatters;
    components?: IComponents;
    adapters?: IAdapters;
    prefix?: string;
    preloadData?: boolean;
    rootInterface?: string;
    templateDelimiters?: Array<string>;
    handler?: Function;
}
export interface IComponents {
    [name: string]: IComponent<any>;
}
export interface IComponentWrapperResult<ValueType> extends IComponent<ValueType> {
    name: string;
}
export declare type ComponentWrapper<ValueType> = (...deps: any[]) => IComponentWrapperResult<ValueType>;
export declare class ComponentService {
    private components;
    private debug;
    /**
     *
     * @param components
     */
    constructor(components: IComponents);
    /**
     * Regist a component wrapper
     * @param ComponentWrapper
     * @param name
     */
    registWrapper(ComponentWrapper: IComponentWrapperResult<any>, name?: string): IComponents;
    /**
     * Regist a component with his name
     * @param component
     * @param name
     */
    regist(component: IComponent<any>, name?: string): IComponents;
    /**
     * Regist a set of components
     * @param components
     */
    regists(components: IComponents): IComponents;
}
