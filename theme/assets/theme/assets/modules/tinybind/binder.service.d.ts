import { Binding } from './binding';
/**
 * One way binder interface
 */
export declare type IOneWayBinder<ValueType> = (this: Binding, element: HTMLElement, value: ValueType) => void;
/**
 * To way binder interface
 */
export interface ITwoWayBinder<ValueType> {
    routine: (this: Binding, element: HTMLElement, value: ValueType) => void;
    bind?: (this: Binding, element: HTMLElement) => void;
    unbind?: (this: Binding, element: HTMLElement) => void;
    update?: (this: Binding, model: any) => void;
    getValue?: (this: Binding, element: HTMLElement) => void;
    block?: boolean;
    function?: boolean;
    publishes?: boolean;
    priority?: number;
    /**
     * If you want to save custom data in this use this object
     */
    customData?: any;
}
/**
 * A binder can be a one way binder or a two way binder
 */
export declare type Binder<ValueType> = IOneWayBinder<ValueType> | ITwoWayBinder<ValueType>;
/**
 * A list of binders with any key name
 */
export interface IBinders<ValueType> {
    [name: string]: Binder<ValueType>;
}
/**
 * This wrapper i used to store the binder name in the name property
 */
export interface IBinderWrapperResult {
    name: string;
    binder: Binder<any>;
}
/**
 * This wrapper is used if you need to pass over some dependencies for your binder
 */
export declare type BinderWrapper = (...deps: any[]) => IBinderWrapperResult;
export declare class BindersService {
    private binders;
    private debug;
    /**
     *
     * @param binders
     */
    constructor(binders: IBinders<any>);
    /**
     * Regist a binder wrapper
     * @param binder
     * @param name
     */
    registWrapper(binderWrapper: IBinderWrapperResult, name?: string): IBinders<any>;
    /**
     * Regist a binder with his name
     * @param binder
     * @param name
     */
    regist(binder: Binder<any>, name?: string): IBinders<any>;
    /**
     * Regist a set of binders
     * @param binders
     */
    regists(binders: IBinders<any>): IBinders<any>;
}
