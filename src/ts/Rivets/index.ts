import Rivets from 'rivets';
import { Utils } from '../Utils';
import { binders } from './binders';

// use all custom binders
Rivets.binders = Utils.concat(false, Rivets.binders, binders);

export { Rivets, Utils, binders};
