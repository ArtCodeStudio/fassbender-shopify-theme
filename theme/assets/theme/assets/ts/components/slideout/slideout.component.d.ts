import { Dispatcher } from '../../../modules/tinybind/binders/router/barba/index';
import { IComponentWrapperResult } from '../../../modules/tinybind/index';
declare global {
    interface Window {
        model: any;
    }
}
/**
 * slideout
 * @see https://github.com/mango/slideout
 */
export declare const slideoutComponent: (dispatcher: Dispatcher) => IComponentWrapperResult<any>;
