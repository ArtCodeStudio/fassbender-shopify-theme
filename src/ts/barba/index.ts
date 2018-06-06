//Promise polyfill https://github.com/taylorhakes/promise-polyfill
import Promise from 'promise-polyfill';

import { BaseTransition } from './Transition/BaseTransition';
import { BaseView } from './View';
import { BaseCache } from './Cache';
import { Dispatcher } from './Dispatcher';
import { HistoryManager, Pjax, Prefetch, IState } from './Pjax';
import { Utils } from './Utils';

declare global {
  interface Window { Promise: PromiseConstructor; }
}

if (typeof Promise !== 'function') {
  window.Promise = Promise;
}
 
 var Barba = {
   version: '1.0.0-jquery',
   BaseTransition: BaseTransition,
   BaseView: BaseView,
   BaseCache: BaseCache,
   Dispatcher: Dispatcher,
   HistoryManager: HistoryManager,
   Pjax: Pjax,
   Prefetch: Prefetch,
   Utils: Utils
 };
 
 export { Barba, IState };