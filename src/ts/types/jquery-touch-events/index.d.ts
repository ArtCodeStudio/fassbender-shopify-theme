/// <reference types="jquery" /> 

interface IJQueryTouchEvents {
  (jQuery: JQueryStatic): JQueryStatic;
}

declare module 'jquery-touch-events' {
  const jqueryTouchEvents: IJQueryTouchEvents;
  export default jqueryTouchEvents;
}