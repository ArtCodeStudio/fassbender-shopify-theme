import Debug from 'debug';
import { Binder, IBinders, ITinybind} from '../tinybind';

export interface IBinderWrapperResult {
  name: string;
  binder: Binder<any>;
}

export type BinderWrapper = (...deps: any[]) => IBinderWrapperResult;

export class BindersService {
  private tinybind: ITinybind;
  private debug = Debug('binders:binder-service');
  constructor(tinybind: ITinybind) {
    this.tinybind = tinybind;
  }

  public registWrapper(binderWrapper: IBinderWrapperResult, name?: string): IBinders<any> {
    if (!name) {
      name = binderWrapper.name;
    }
    const binder = (binderWrapper as IBinderWrapperResult).binder;
    this.tinybind.binders[name] = binder;
    return this.tinybind.binders;
  }

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

}
