import Rivets = require('rivets');
import { IView } from 'rivets';
import { Utils } from '../Utils';
import { BarbaBaseTransition } from './BarbaBaseTransition';
import { binders } from './binders';

// use all custom binders
Rivets.binders = Utils.concat(false, Rivets.binders, binders);

export { Rivets, Utils, binders, IView, BarbaBaseTransition };
