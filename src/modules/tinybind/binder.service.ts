import Debug from 'debug';
import { Binding } from './binding';
import { ITinybind} from './tinybind';
/**
 * One way binder interface
 */
export type IOneWayBinder<ValueType> = (this: Binding, element: HTMLElement, value: ValueType) => void;

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
export type Binder<ValueType> = IOneWayBinder<ValueType> | ITwoWayBinder<ValueType>

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
export type BinderWrapper = (...deps: any[]) => IBinderWrapperResult;

export class BindersService {
  private tinybind: ITinybind;
  private debug = Debug('binders:binder-service');
  constructor(tinybind: ITinybind) {
    this.tinybind = tinybind;
  }

  /**
   * Regist a binder wrapper
   * @param binder
   * @param name 
   */
  public registWrapper(binderWrapper: IBinderWrapperResult, name?: string): IBinders<any> {
    if (!name) {
      name = binderWrapper.name;
    }
    const binder = (binderWrapper as IBinderWrapperResult).binder;
    this.tinybind.binders[name] = binder;
    return this.tinybind.binders;
  }

  /**
   * Regist a binder with his name
   * @param binder
   * @param name 
   */
  public regist(binder: Binder<any>, name?: string): IBinders<any> {
    if (!name) {
      if (binder.hasOwnProperty('constructor')) {
        name = binder.constructor.name;
      }

      if (binder.hasOwnProperty('name')) {
        name = (binder as any).name;
      }
    }

    this.debug('name', name, binder);

    if (!name) {
      throw new Error('name is required');
    }

    // if Binder<any>
    this.tinybind.binders[name] = binder;
    return this.tinybind.binders;
  }

  /**
   * Regist a set of binders
   * @param binders 
   */
  public regists(binders: IBinders<any>): IBinders<any> {
    for (const name in binders) {
      if (binders.hasOwnProperty(name)) {
        console.log('regists', name, binders[name]);
        this.regist(binders[name], name)
      }
    }
    return this.tinybind.binders;
  }

}