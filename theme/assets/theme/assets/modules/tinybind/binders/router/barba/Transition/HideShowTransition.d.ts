import Debug from 'debug';
import { BaseTransition, ITransition } from './BaseTransition';
/**
 * Basic Transition object, wait for the new Container to be ready,
 * scroll top, and finish the transition (removing the old container and displaying the new one)
 *
 * @private
 * @namespace Barba.HideShowTransition
 * @augments Barba.BaseTransition
 */
declare class HideShowTransition extends BaseTransition implements ITransition {
    protected debug: Debug.IDebugger;
    start(): void;
    finish(): void;
}
export { HideShowTransition };
