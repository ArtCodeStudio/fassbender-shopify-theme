/// <reference types="jquery" />
import Debug from 'debug';
import { BaseTransition, ITransition } from './BaseTransition';
declare global {
    interface Window {
        model: any;
    }
}
/**
 * Basic Transition object, wait for the new Container to be ready,
 * scroll top, and finish the transition (removing the old container and displaying the new one)
 *
 * @private
 */
declare class CustomTransition extends BaseTransition implements ITransition {
    protected debug: Debug.IDebugger;
    init($oldContainer: JQuery<HTMLElement>, newContainer: Promise<JQuery<HTMLElement>>): Promise<void>;
    start(): void;
    finish($container: JQuery<HTMLElement>): void;
}
export { CustomTransition };
