// import '@babel/runtime-corejs2/regenerator/index'
// import '@babel/runtime-corejs2/core-js/promise.js';

// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill#Polyfill
(() => {

  if ( typeof (window as any).CustomEvent === 'function' ) {
    return false;
  }

  function CustomEvent( event: string, params: any ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    const evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = (window as any).Event.prototype;

  (window as any).CustomEvent = CustomEvent;
})();

import 'core-js/fn/string/starts-with.js';
import '@babel/runtime-corejs2/core-js/promise.js';
