import Debug from 'debug';
import { Binder, IBinders, Tinybind} from 'tinybind';

export interface IBinderWrapperResult {
  name: string;
  binder: Binder<any>;
}

export type BinderWrapper = (...deps: any[]) => IBinderWrapperResult;

export class BindersService {
  private tinybind: Tinybind;
  private debug = Debug('binders:binder-service');
  constructor(tinybind: Tinybind) {
    this.tinybind = tinybind;
  }

  public registWrapper(binderWrapper: IBinderWrapperResult, name?: string): IBinders {
    if (!name) {
      name = binderWrapper.name;
    }
    const binder = (binderWrapper as IBinderWrapperResult).binder;
    this.tinybind.binders[name] = binder;
    return this.tinybind.binders;
  }

  public regist(binder: Binder<any>, name?: string): IBinders {
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

}
