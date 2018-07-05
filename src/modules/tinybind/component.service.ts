import Debug from 'debug';
import { IBinders } from './binder.service';
import { IFormatters } from './formatter.service';
import { IComponent, IComponents } from './component.service';
import { IAdapters } from './adapter';

export type Scope = any;

export interface IComponent<ValueType> {
  template: (() => string) | (() => HTMLElement);
  initialize: (el: HTMLElement, data: ValueType) => Scope;

  // extension options
  binders?: IBinders<any>;
  formatters?: IFormatters;
  components?: IComponents;
  adapters?: IAdapters;

  // other options
  prefix?: string;
  preloadData?: boolean;
  rootInterface?: string;
  templateDelimiters?: Array<string>
  handler?: Function;
}

export interface IComponents {
  [name: string]: IComponent<any>;
}

export interface IComponentWrapperResult<ValueType> extends IComponent<ValueType> {
  name: string;
}

export type ComponentWrapper<ValueType> = (...deps: any[]) => IComponentWrapperResult<ValueType>;

export class ComponentService {
  private components: IComponents;
  private debug = Debug('components:ComponentService');

  /**
   * 
   * @param components 
   */
  constructor(components: IComponents) {
    this.components = components;
  }

  /**
   * Regist a component wrapper
   * @param ComponentWrapper
   * @param name 
   */
  public registWrapper(ComponentWrapper: IComponentWrapperResult<any>, name?: string): IComponents {
    if (!name) {
      name = ComponentWrapper.name;
    }
    const component = (ComponentWrapper as IComponentWrapperResult<any>);
    this.components[name] = component;
    return this.components;
  }

  /**
   * Regist a component with his name
   * @param component
   * @param name 
   */
  public regist(component: IComponent<any>, name?: string): IComponents {
    if (!name) {
      if (component.hasOwnProperty('constructor')) {
        name = component.constructor.name;
      }

      if (component.hasOwnProperty('name')) {
        name = (component as any).name;
      }
    }

    this.debug('name', name, component);

    if (!name) {
      throw new Error('[ComponentService] name is required');
    }

    this.components[name] = component;
    return this.components;
  }

  /**
   * Regist a set of components
   * @param components 
   */
  public regists(components: IComponents): IComponents {
    for (const name in components) {
      if (components.hasOwnProperty(name)) {
        this.regist(components[name], name)
      }
    }
    return this.components;
  }

}