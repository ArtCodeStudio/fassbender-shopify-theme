import { BinderWrapper } from '../../modules/tinybind/index';
export interface IOptions {
    angle: 'vertical' | 'horizontal';
    direction: 1 | -1;
    jumps: number;
    delay: number;
    width?: string;
}
/**
 * Slideout click event to toggle the slideout
 */
export declare const autoscrollBinder: BinderWrapper;
