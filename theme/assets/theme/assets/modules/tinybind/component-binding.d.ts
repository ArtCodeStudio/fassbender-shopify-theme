import { IOptionsParam } from './tinybind';
import { Binding, IFormatterObservers } from './binding';
import { View } from './view';
import { IComponent } from './component.service';
import { IObservers } from './observer';
export interface IBoundElement extends HTMLElement {
    _bound?: boolean;
}
export interface IFormattersObservers {
    [propertyName: string]: IFormatterObservers;
}
export interface IKeypaths {
    [propertyName: string]: string;
}
/**
 * component view encapsulated as a binding within it's parent view.
 */
export declare class ComponentBinding extends Binding {
    view: View;
    componentView?: View;
    el: IBoundElement;
    type: string;
    component: IComponent<any>;
    /**
     * static values (PRIMITIVE Attributes)
     */
    static: any;
    /**
     * keypath values (KEYPATH Attributes)
     */
    keypaths: IKeypaths;
    formattersObservers: IFormattersObservers;
    observers: IObservers;
    bindingPrefix: string;
    pipes: any;
    /**
     * Initializes a component binding for the specified view. The raw component
     * element is passed in along with the component type. Attributes and scope
     * inflections are determined based on the components defined attributes.
     *
     * @param view
     * @param el
     * @param type
     */
    constructor(view: View, el: HTMLElement, type: string);
    /**
     * Updates the values in model when the observer calls this function
     */
    sync(): void;
    /**
     * Intercepts `tinybind.Binding::update` since component bindings are not bound
     * to a particular model to update it's value.
     */
    update(): void;
    /**
     * Publishes the value currently set on the model back to the parent model.
     * You need to call this method manually in your component
     */
    publish(propertyName?: string, value?: any): void;
    /**
     * Returns an object map using the component's scope inflections.
     */
    locals(): any;
    /**
     * Returns a camel-cased version of the string. Used when translating an
     * element's attribute name into a property name for the component's scope.
     * TODO move to utils
     * @param string
     */
    camelCase(string: string): string;
    getMergedOptions(): IOptionsParam;
    /**
     * Intercepts `tinybind.Binding::bind` to build `this.componentView` with a localized
     * map of models from the root view. Bind `this.componentView` on subsequent calls.
     */
    bind(): void;
    parseTarget(): void;
    /**
     *
     * @param args parses the formatters in arguments
     * @param formatterIndex
     */
    parseFormatterArgumentsProperty(args: string[], formatterIndex: number, propertyName: string): string[];
    /**
     * Applies all the current formatters to the supplied value and returns the
     * formatted value.
     */
    formattedValues(value: any, propertyName: string): any;
    /**
     * Intercept `tinybind.Binding::unbind` to be called on `this.componentView`.
     */
    unbind(): void;
}
