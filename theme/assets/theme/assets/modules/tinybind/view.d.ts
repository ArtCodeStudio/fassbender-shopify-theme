import { IViewOptions } from './tinybind';
import { Binder, ITwoWayBinder } from './binder.service';
import { Binding } from './binding';
import { IBoundElement } from './component-binding';
export declare type TBlock = boolean;
export interface IDataElement extends HTMLElement {
    data?: string;
}
/**
 * A collection of bindings built from a set of parent nodes.
 */
export declare class View {
    els: HTMLCollection | HTMLElement[] | Node[];
    models: any;
    options: IViewOptions;
    bindings: Binding[];
    componentView: View | null;
    static DECLARATION_SPLIT: RegExp;
    /**
     * The DOM elements and the model objects for binding are passed into the
     * constructor along with any local options that should be used throughout the
     * context of the view and it's bindings.
     * @param els
     * @param models
     * @param options
     */
    constructor(els: HTMLCollection | HTMLElement | Node, models: any, options: IViewOptions);
    static textBinder: ITwoWayBinder<string>;
    static bindingComparator: (a: Binding, b: Binding) => number;
    static parseNode(view: View, node: IDataElement): void;
    static parseDeclaration(declaration: string): {
        keypath: string;
        pipes: string[];
    };
    static create(binding: Binding, models: any, anchorEl: HTMLElement | Node | null): View;
    buildBinding(node: HTMLElement | Text, type: string | null, declaration: string, binder: Binder<any>, args: string[] | null): void;
    /**
     * Parses the DOM tree and builds `Binding` instances for every matched
     * binding declaration.
     */
    build(): void;
    traverse(node: IBoundElement): TBlock;
    /**
     * Binds all of the current bindings for this view.
     */
    bind(): void;
    /**
     * Unbinds all of the current bindings for this view.
     */
    unbind(): void;
    /**
     * Syncs up the view with the model by running the routines on all bindings.
     */
    sync(): void;
    /**
     * Publishes the input values from the view back to the model (reverse sync).
     */
    publish(): void;
    /**
     * Updates the view's models along with any affected bindings.
     * @param models
     */
    update(models?: any): void;
}
