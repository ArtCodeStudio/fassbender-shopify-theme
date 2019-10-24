/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors.main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ts/binders/bs4/collapse-on-url.binder.ts":
/*!******************************************************!*\
  !*** ./src/ts/binders/bs4/collapse-on-url.binder.ts ***!
  \******************************************************/
/*! exports provided: collapseOnUrlBinder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collapseOnUrlBinder", function() { return collapseOnUrlBinder; });
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _collapse_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collapse.service */ "./src/ts/binders/bs4/collapse.service.ts");
/* harmony import */ var _services_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/Utils */ "./src/ts/services/Utils.ts");



/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */

var collapseOnUrlBinder = {
  name: 'bs4-collapse-on-url',
  routine: function routine(el, url) {
    var $el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_0__["JQuery"])(el);
    var collapseService = new _collapse_service__WEBPACK_IMPORTED_MODULE_1__["CollapseService"]($el);
    var dispatcher = new _ribajs_core__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]('main');

    var checkURL = function checkURL(urlToCheck) {
      if (urlToCheck && _services_Utils__WEBPACK_IMPORTED_MODULE_2__["Utils"].onRoute(urlToCheck)) {
        collapseService.hide();
        return true;
      } // collapseService.show();


      return false;
    };

    dispatcher.on('newPageReady', function () {
      return checkURL(url);
    });
  }
};

/***/ }),

/***/ "./src/ts/binders/bs4/collapse.binder.ts":
/*!***********************************************!*\
  !*** ./src/ts/binders/bs4/collapse.binder.ts ***!
  \***********************************************/
/*! exports provided: collapseBinder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "collapseBinder", function() { return collapseBinder; });
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _collapse_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collapse.service */ "./src/ts/binders/bs4/collapse.service.ts");


/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 */

var collapseBinder = {
  name: 'bs4-collapse',
  routine: function routine(el, targetSelector) {
    var $el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_0__["JQuery"])(el);
    var $target = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_0__["JQuery"])(targetSelector);
    var collapseService = new _collapse_service__WEBPACK_IMPORTED_MODULE_1__["CollapseService"]($target);

    var onStateChange = function onStateChange() {
      if (collapseService.isCollapsed()) {
        $el.addClass(_collapse_service__WEBPACK_IMPORTED_MODULE_1__["CollapseService"].CLASSNAME.COLLAPSED).attr('aria-expanded', 'false');
      } else {
        $el.removeClass(_collapse_service__WEBPACK_IMPORTED_MODULE_1__["CollapseService"].CLASSNAME.COLLAPSED).attr('aria-expanded', 'true');
      }
    };

    $target.on(_collapse_service__WEBPACK_IMPORTED_MODULE_1__["CollapseService"].EVENT.SHOWN, onStateChange);
    $target.on(_collapse_service__WEBPACK_IMPORTED_MODULE_1__["CollapseService"].EVENT.HIDDEN, onStateChange);
    $el.on('click', function (event) {
      event.preventDefault();
      collapseService.toggle();
    });
    onStateChange();
  }
};

/***/ }),

/***/ "./src/ts/binders/bs4/collapse.service.ts":
/*!************************************************!*\
  !*** ./src/ts/binders/bs4/collapse.service.ts ***!
  \************************************************/
/*! exports provided: CollapseService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CollapseService", function() { return CollapseService; });
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);




/**
 *
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */
var CollapseService =
/*#__PURE__*/
function () {
  function CollapseService($target) {
    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, CollapseService);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "$target", void 0);

    this.$target = $target;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(CollapseService, [{
    key: "show",
    value: function show() {
      this.$target.removeClass(CollapseService.CLASSNAME.COLLAPSE).addClass(CollapseService.CLASSNAME.SHOW).trigger(CollapseService.EVENT.SHOWN);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.$target.removeClass(CollapseService.CLASSNAME.SHOW).addClass(CollapseService.CLASSNAME.COLLAPSE).trigger(CollapseService.EVENT.HIDDEN);
    }
  }, {
    key: "isExpanded",
    value: function isExpanded() {
      return this.$target.hasClass(CollapseService.CLASSNAME.SHOW);
    }
  }, {
    key: "isCollapsed",
    value: function isCollapsed() {
      return !this.isExpanded();
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this.isCollapsed()) {
        this.show();
      } else {
        this.hide();
      }
    }
  }]);

  return CollapseService;
}();

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(CollapseService, "DATA_KEY", 'bs.collapse');

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(CollapseService, "EVENT_KEY", ".".concat(CollapseService.DATA_KEY));

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(CollapseService, "DATA_API_KEY", '.data-api');

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(CollapseService, "EVENT", {
  SHOW: "show".concat(CollapseService.EVENT_KEY),
  SHOWN: "shown".concat(CollapseService.EVENT_KEY),
  HIDE: "hide".concat(CollapseService.EVENT_KEY),
  HIDDEN: "hidden".concat(CollapseService.EVENT_KEY),
  CLICK_DATA_API: "click".concat(CollapseService.EVENT_KEY).concat(CollapseService.DATA_API_KEY)
});

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(CollapseService, "CLASSNAME", {
  SHOW: 'show',
  COLLAPSE: 'collapse',
  COLLAPSING: 'collapsing',
  COLLAPSED: 'collapsed'
});

/***/ }),

/***/ "./src/ts/binders/bs4/expan-on-url.binder.ts":
/*!***************************************************!*\
  !*** ./src/ts/binders/bs4/expan-on-url.binder.ts ***!
  \***************************************************/
/*! exports provided: expanOnUrlBinder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "expanOnUrlBinder", function() { return expanOnUrlBinder; });
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _collapse_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./collapse.service */ "./src/ts/binders/bs4/collapse.service.ts");
/* harmony import */ var _services_Utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/Utils */ "./src/ts/services/Utils.ts");



/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/collapse/
 * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/collapse.js
 */

var expanOnUrlBinder = {
  name: 'bs4-expan-on-url',
  routine: function routine(el, url) {
    var $el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_0__["JQuery"])(el);
    var collapseService = new _collapse_service__WEBPACK_IMPORTED_MODULE_1__["CollapseService"]($el);
    var dispatcher = new _ribajs_core__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]('main');

    var checkURL = function checkURL(urlToCheck) {
      if (urlToCheck && _services_Utils__WEBPACK_IMPORTED_MODULE_2__["Utils"].onRoute(urlToCheck)) {
        collapseService.show();
        return true;
      }

      collapseService.hide();
      return false;
    };

    dispatcher.on('newPageReady', function () {
      return checkURL(url);
    });
    checkURL(url);
  }
};

/***/ }),

/***/ "./src/ts/binders/bs4/scrollspy-star.binder.ts":
/*!*****************************************************!*\
  !*** ./src/ts/binders/bs4/scrollspy-star.binder.ts ***!
  \*****************************************************/
/*! exports provided: scrollspyStarBinder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollspyStarBinder", function() { return scrollspyStarBinder; });
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");

/**
 *
 * @see https://getbootstrap.com/docs/4.1/components/scrollspy/
 */

var scrollspyStarBinder = {
  name: 'bs4-scrollspy-*',
  routine: function routine(el, targetSelector) {
    var $el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_0__["JQuery"])(el);
    var nativeIDTargetSelector = targetSelector.replace('#', ''); // const dispatcher = new EventDispatcher('main');

    var target = document.getElementById(nativeIDTargetSelector);
    var $target = null;

    if (target) {
      $target = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_0__["JQuery"])(target);
    }

    var className = this.args[0];
    /**
     * Determine if an element is in the viewport
     * @param elem The element
     * @return Returns true if element is in the viewport
     */

    var isInViewport = function isInViewport(elem) {
      if (!elem) {
        return false;
      }

      var distance = elem.getBoundingClientRect();
      return distance.top + distance.height >= 0 && distance.bottom - distance.height <= 0;
    };

    var onScroll = function onScroll() {
      // reget element each scroll because it could be removed from the page using the router
      target = document.getElementById(nativeIDTargetSelector);

      if (target) {
        $target = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_0__["JQuery"])(nativeIDTargetSelector);
      } else {
        return;
      }

      if (isInViewport(target)) {
        $el.addClass(className);

        if ($el.is(':radio')) {
          $el.prop('checked', true);
        }
      } else {
        $el.removeClass(className);

        if ($el.is(':radio')) {
          $el.prop('checked', false);
        }
      }
    };

    Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_0__["JQuery"])(window).off('scroll', onScroll).on('scroll', onScroll);
    onScroll();
  }
};

/***/ }),

/***/ "./src/ts/binders/index.ts":
/*!*********************************!*\
  !*** ./src/ts/binders/index.ts ***!
  \*********************************/
/*! exports provided: backgroundImageBinder, backgroundColorStarBinder, opacityStarBinder, mailtoBinder, telBinder, scrollbarDragableBinder, scrollfixBinder, collapseBinder, expanOnUrlBinder, collapseOnUrlBinder, scrollspyStarBinder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_styles_binders__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/styles.binders */ "./src/ts/binders/styles/styles.binders.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "backgroundImageBinder", function() { return _styles_styles_binders__WEBPACK_IMPORTED_MODULE_0__["backgroundImageBinder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "backgroundColorStarBinder", function() { return _styles_styles_binders__WEBPACK_IMPORTED_MODULE_0__["backgroundColorStarBinder"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "opacityStarBinder", function() { return _styles_styles_binders__WEBPACK_IMPORTED_MODULE_0__["opacityStarBinder"]; });

/* harmony import */ var _mailto_binder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mailto.binder */ "./src/ts/binders/mailto.binder.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mailtoBinder", function() { return _mailto_binder__WEBPACK_IMPORTED_MODULE_1__["mailtoBinder"]; });

/* harmony import */ var _tel_binder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tel.binder */ "./src/ts/binders/tel.binder.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "telBinder", function() { return _tel_binder__WEBPACK_IMPORTED_MODULE_2__["telBinder"]; });

/* harmony import */ var _scrollbar_scrollbar_dragable_binder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scrollbar/scrollbar-dragable.binder */ "./src/ts/binders/scrollbar/scrollbar-dragable.binder.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scrollbarDragableBinder", function() { return _scrollbar_scrollbar_dragable_binder__WEBPACK_IMPORTED_MODULE_3__["scrollbarDragableBinder"]; });

/* harmony import */ var _scrollbar_scrollfix_binder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scrollbar/scrollfix.binder */ "./src/ts/binders/scrollbar/scrollfix.binder.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scrollfixBinder", function() { return _scrollbar_scrollfix_binder__WEBPACK_IMPORTED_MODULE_4__["scrollfixBinder"]; });

/* harmony import */ var _bs4_collapse_binder__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./bs4/collapse.binder */ "./src/ts/binders/bs4/collapse.binder.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "collapseBinder", function() { return _bs4_collapse_binder__WEBPACK_IMPORTED_MODULE_5__["collapseBinder"]; });

/* harmony import */ var _bs4_expan_on_url_binder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bs4/expan-on-url.binder */ "./src/ts/binders/bs4/expan-on-url.binder.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "expanOnUrlBinder", function() { return _bs4_expan_on_url_binder__WEBPACK_IMPORTED_MODULE_6__["expanOnUrlBinder"]; });

/* harmony import */ var _bs4_collapse_on_url_binder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./bs4/collapse-on-url.binder */ "./src/ts/binders/bs4/collapse-on-url.binder.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "collapseOnUrlBinder", function() { return _bs4_collapse_on_url_binder__WEBPACK_IMPORTED_MODULE_7__["collapseOnUrlBinder"]; });

/* harmony import */ var _bs4_scrollspy_star_binder__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./bs4/scrollspy-star.binder */ "./src/ts/binders/bs4/scrollspy-star.binder.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scrollspyStarBinder", function() { return _bs4_scrollspy_star_binder__WEBPACK_IMPORTED_MODULE_8__["scrollspyStarBinder"]; });

 // binders




 // import { i18nStarBinder } from './i18n/i18n-star.binder';






/***/ }),

/***/ "./src/ts/binders/mailto.binder.ts":
/*!*****************************************!*\
  !*** ./src/ts/binders/mailto.binder.ts ***!
  \*****************************************/
/*! exports provided: mailtoBinder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mailtoBinder", function() { return mailtoBinder; });
/**
 * mailto
 */
var mailtoBinder = {
  name: 'mailto',
  routine: function routine(el, value) {
    $(el).attr('href', 'mailto:' + value);
  }
};

/***/ }),

/***/ "./src/ts/binders/scrollbar/scrollbar-dragable.binder.ts":
/*!***************************************************************!*\
  !*** ./src/ts/binders/scrollbar/scrollbar-dragable.binder.ts ***!
  \***************************************************************/
/*! exports provided: Dragscroll, scrollbarDragableBinder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Dragscroll", function() { return Dragscroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollbarDragableBinder", function() { return scrollbarDragableBinder; });
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");




/**
 * Scroll an scrollable element by draging and moving your mouse.
 * inspired by https://github.com/asvd/dragscroll
 */

var Dragscroll =
/*#__PURE__*/
function () {
  function Dragscroll(el) {
    var detectGlobalMove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Dragscroll);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_3__["Debug"])('binders:scrollbar-dragable'));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "lastClientX", 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "lastClientY", 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "el", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2___default()(this, "pushed", false);

    this.el = el;
    el.removeEventListener('mousedown', this.md.bind(this), false);
    el.addEventListener('mousedown', this.md.bind(this), false); // Use global move if your element does not use the full width / height

    if (detectGlobalMove) {
      window.removeEventListener('mouseup', this.mu.bind(this), false);
      window.removeEventListener('mousemove', this.mm.bind(this), false);
      window.addEventListener('mouseup', this.mu.bind(this), false);
      window.addEventListener('mousemove', this.mm.bind(this), false);
    } else {
      el.removeEventListener('mouseup', this.mu.bind(this), false);
      el.removeEventListener('mousemove', this.mm.bind(this), false);
      el.addEventListener('mouseup', this.mu.bind(this), false);
      el.addEventListener('mousemove', this.mm.bind(this), false);
    }
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Dragscroll, [{
    key: "md",
    value: function md(e) {
      this.pushed = true;
      this.lastClientX = e.clientX;
      this.lastClientY = e.clientY;
      e.preventDefault();
    }
  }, {
    key: "mu",
    value: function mu(e) {
      this.pushed = false;
    }
  }, {
    key: "mm",
    value: function mm(e) {
      var newScrollX = 0;
      var newScrollY = 0;

      if (this.pushed) {
        this.el.scrollLeft -= newScrollX = -this.lastClientX + (this.lastClientX = e.clientX);
        this.el.scrollTop -= newScrollY = -this.lastClientY + (this.lastClientY = e.clientY);

        if (this.el === document.body) {
          if (document.documentElement) {
            this.el = document.documentElement;
          }

          this.el.scrollLeft -= newScrollX;
          this.el.scrollTop -= newScrollY;
        }
      }
    }
  }]);

  return Dragscroll;
}();
/**
 * dragscroll
 */

var scrollbarDragableBinder = {
  name: 'scrollbar-dragable',
  routine: function routine(el, value) {
    var dragscroll = new Dragscroll(el, true);
    dragscroll.debug('ready');
  }
};

/***/ }),

/***/ "./src/ts/binders/scrollbar/scrollfix.binder.ts":
/*!******************************************************!*\
  !*** ./src/ts/binders/scrollbar/scrollfix.binder.ts ***!
  \******************************************************/
/*! exports provided: scrollfixBinder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollfixBinder", function() { return scrollfixBinder; });
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");

var debug = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_0__["Debug"])('binder:rv-scrollfix');

var onWheel = function onWheel(event) {
  debug('onWheel');

  if (event.wheelDelta > 0 || event.detail < 0) {
    // scroll up
    debug('scroll up');
  } else {
    // scroll down
    debug('scroll down');
  }
};
/**
 * scrollfix passes scroll events to the body to fix scroll with mouse well over vimeo iframes
 * TODO not working yet
 * @see issue https://stackoverflow.com/questions/29344162/fullscreen-video-doesnt-allow-scrolling-on-firefox
 */


var scrollfixBinder = {
  name: 'scrollfix',
  routine: function routine(el, value) {
    debug('scrollfix', el);
    var $el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_0__["JQuery"])(el);
    $el.hover(function () {
      debug('over');
      document.addEventListener('wheel', onWheel);
      document.addEventListener('mousewheel', onWheel);
      document.addEventListener('DOMMouseScroll', onWheel);
    }, function () {
      debug('leave');
      document.removeEventListener('wheel', onWheel);
      document.removeEventListener('mousewheel', onWheel);
      document.removeEventListener('DOMMouseScroll', onWheel);
    });
  }
};

/***/ }),

/***/ "./src/ts/binders/styles/background-color-star.binder.ts":
/*!***************************************************************!*\
  !*** ./src/ts/binders/styles/background-color-star.binder.ts ***!
  \***************************************************************/
/*! exports provided: backgroundColorStarBinder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backgroundColorStarBinder", function() { return backgroundColorStarBinder; });
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");

var backgroundColorStarBinder = {
  name: 'background-color-*',
  routine: function routine(el, value) {
    var $el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_0__["JQuery"])(el);
    var color = this.args[0].toString() || 'transparent';

    if (value) {
      $el.css('background-color', color);
    } else {
      $el.css('background-color', '');
    }
  }
};

/***/ }),

/***/ "./src/ts/binders/styles/background-image.binder.ts":
/*!**********************************************************!*\
  !*** ./src/ts/binders/styles/background-image.binder.ts ***!
  \**********************************************************/
/*! exports provided: backgroundImageBinder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "backgroundImageBinder", function() { return backgroundImageBinder; });
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");

var backgroundImageBinder = {
  name: 'background-image',
  routine: function routine(el, value) {
    var $el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_0__["JQuery"])(el);

    if (value) {
      $el.css('background-image', 'url(' + value + ')');
    } else {
      $el.css('background-image', '');
    }
  }
};

/***/ }),

/***/ "./src/ts/binders/styles/opacity-star.binder.ts":
/*!******************************************************!*\
  !*** ./src/ts/binders/styles/opacity-star.binder.ts ***!
  \******************************************************/
/*! exports provided: opacityStarBinder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "opacityStarBinder", function() { return opacityStarBinder; });
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-float */ "./node_modules/@babel/runtime-corejs2/core-js/parse-float.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");


var opacityStarBinder = {
  name: 'opacity-*',
  routine: function routine(el, value) {
    var $el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_1__["JQuery"])(el);

    var opacity = _babel_runtime_corejs2_core_js_parse_float__WEBPACK_IMPORTED_MODULE_0___default()(this.args[0]);

    if (value) {
      $el.css('opacity', opacity);
    } else {
      $el.css('opacity', '');
    }
  }
};

/***/ }),

/***/ "./src/ts/binders/styles/styles.binders.ts":
/*!*************************************************!*\
  !*** ./src/ts/binders/styles/styles.binders.ts ***!
  \*************************************************/
/*! exports provided: backgroundImageBinder, backgroundColorStarBinder, opacityStarBinder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _background_image_binder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./background-image.binder */ "./src/ts/binders/styles/background-image.binder.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "backgroundImageBinder", function() { return _background_image_binder__WEBPACK_IMPORTED_MODULE_0__["backgroundImageBinder"]; });

/* harmony import */ var _background_color_star_binder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./background-color-star.binder */ "./src/ts/binders/styles/background-color-star.binder.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "backgroundColorStarBinder", function() { return _background_color_star_binder__WEBPACK_IMPORTED_MODULE_1__["backgroundColorStarBinder"]; });

/* harmony import */ var _opacity_star_binder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./opacity-star.binder */ "./src/ts/binders/styles/opacity-star.binder.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "opacityStarBinder", function() { return _opacity_star_binder__WEBPACK_IMPORTED_MODULE_2__["opacityStarBinder"]; });





/***/ }),

/***/ "./src/ts/binders/tel.binder.ts":
/*!**************************************!*\
  !*** ./src/ts/binders/tel.binder.ts ***!
  \**************************************/
/*! exports provided: telBinder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "telBinder", function() { return telBinder; });
/**
 * tel
 */
var telBinder = {
  name: 'tel',
  routine: function routine(el, value) {
    $(el).attr('href', 'tel:' + value);
  }
};

/***/ }),

/***/ "./src/ts/components/bs4/bs4.components.ts":
/*!*************************************************!*\
  !*** ./src/ts/components/bs4/bs4.components.ts ***!
  \*************************************************/
/*! exports provided: TabsComponent, DropdownComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tabs_tabs_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabs/tabs.component */ "./src/ts/components/bs4/tabs/tabs.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabsComponent", function() { return _tabs_tabs_component__WEBPACK_IMPORTED_MODULE_0__["TabsComponent"]; });

/* harmony import */ var _dropdown_dropdown_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dropdown/dropdown.component */ "./src/ts/components/bs4/dropdown/dropdown.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropdownComponent", function() { return _dropdown_dropdown_component__WEBPACK_IMPORTED_MODULE_1__["DropdownComponent"]; });




/***/ }),

/***/ "./src/ts/components/bs4/dropdown/dropdown.component.ts":
/*!**************************************************************!*\
  !*** ./src/ts/components/bs4/dropdown/dropdown.component.ts ***!
  \**************************************************************/
/*! exports provided: DropdownComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropdownComponent", function() { return DropdownComponent; });
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _dropdown_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dropdown.service */ "./src/ts/components/bs4/dropdown/dropdown.service.ts");









var DropdownComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(DropdownComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(DropdownComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function DropdownComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DropdownComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(DropdownComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_7__["Debug"])('component:bs4-dropdown'));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "scope", {
      toggle: _this.toggle
    });

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "dropdownService", void 0);

    var self = _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this);

    var $el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_7__["JQuery"])(_this.el);
    _this.dropdownService = new _dropdown_service__WEBPACK_IMPORTED_MODULE_8__["DropdownService"]($el.find('.dropdown-toggle')[0]);

    _this.init(DropdownComponent.observedAttributes);

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(DropdownComponent, [{
    key: "toggle",
    value: function toggle(context, event) {
      this.debug('toggle');
      event.preventDefault();
      event.stopPropagation();
      return this.dropdownService.toggle();
    }
  }, {
    key: "template",
    value: function template() {
      return null;
    }
  }]);

  return DropdownComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_7__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(DropdownComponent, "tagName", 'bs4-dropdown');

/***/ }),

/***/ "./src/ts/components/bs4/dropdown/dropdown.service.ts":
/*!************************************************************!*\
  !*** ./src/ts/components/bs4/dropdown/dropdown.service.ts ***!
  \************************************************************/
/*! exports provided: NAME, VERSION, DATA_KEY, EVENT_KEY, DATA_API_KEY, ESCAPE_KEYCODE, SPACE_KEYCODE, TAB_KEYCODE, ARROW_UP_KEYCODE, ARROW_DOWN_KEYCODE, RIGHT_MOUSE_BUTTON_WHICH, REGEXP_KEYDOWN, EVENT, CLASSNAME, SELECTOR, ATTACHMENTMAP, DEFAULT, DEFAULTTYPE, DropdownService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NAME", function() { return NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return VERSION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATA_KEY", function() { return DATA_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_KEY", function() { return EVENT_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATA_API_KEY", function() { return DATA_API_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ESCAPE_KEYCODE", function() { return ESCAPE_KEYCODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPACE_KEYCODE", function() { return SPACE_KEYCODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TAB_KEYCODE", function() { return TAB_KEYCODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ARROW_UP_KEYCODE", function() { return ARROW_UP_KEYCODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ARROW_DOWN_KEYCODE", function() { return ARROW_DOWN_KEYCODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RIGHT_MOUSE_BUTTON_WHICH", function() { return RIGHT_MOUSE_BUTTON_WHICH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGEXP_KEYDOWN", function() { return REGEXP_KEYDOWN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT", function() { return EVENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CLASSNAME", function() { return CLASSNAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SELECTOR", function() { return SELECTOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ATTACHMENTMAP", function() { return ATTACHMENTMAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT", function() { return DEFAULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULTTYPE", function() { return DEFAULTTYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DropdownService", function() { return DropdownService; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-properties */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-properties.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptors */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-symbols */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js");
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _services_Utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../services/Utils */ "./src/ts/services/Utils.ts");










function ownKeys(object, enumerableOnly) { var keys = _babel_runtime_corejs2_core_js_object_keys__WEBPACK_IMPORTED_MODULE_5___default()(object); if (_babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default.a) { var symbols = _babel_runtime_corejs2_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_4___default()(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(target, key, source[key]); }); } else if (_babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default.a) { _babel_runtime_corejs2_core_js_object_define_properties__WEBPACK_IMPORTED_MODULE_1___default()(target, _babel_runtime_corejs2_core_js_object_get_own_property_descriptors__WEBPACK_IMPORTED_MODULE_2___default()(source)); } else { ownKeys(source).forEach(function (key) { _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, key, _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_3___default()(source, key)); }); } } return target; }

 // /dist/umd/popper



/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.1.3): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * @see https://raw.githubusercontent.com/twbs/bootstrap/v4-dev/js/src/dropdown.js
 * --------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'dropdown';
var VERSION = '4.1.3';
var DATA_KEY = 'bs.dropdown';
var EVENT_KEY = ".".concat(DATA_KEY);
var DATA_API_KEY = '.data-api';
var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

var REGEXP_KEYDOWN = new RegExp("".concat(ARROW_UP_KEYCODE, "|").concat(ARROW_DOWN_KEYCODE, "|").concat(ESCAPE_KEYCODE));
var EVENT = {
  HIDE: "hide".concat(EVENT_KEY),
  HIDDEN: "hidden".concat(EVENT_KEY),
  SHOW: "show".concat(EVENT_KEY),
  SHOWN: "shown".concat(EVENT_KEY),
  CLICK: "click".concat(EVENT_KEY),
  CLICK_DATA_API: "click".concat(EVENT_KEY).concat(DATA_API_KEY),
  KEYDOWN_DATA_API: "keydown".concat(EVENT_KEY).concat(DATA_API_KEY),
  KEYUP_DATA_API: "keyup".concat(EVENT_KEY).concat(DATA_API_KEY)
};
var CLASSNAME = {
  DISABLED: 'disabled',
  SHOW: 'show',
  DROPUP: 'dropup',
  DROPRIGHT: 'dropright',
  DROPLEFT: 'dropleft',
  MENURIGHT: 'dropdown-menu-right',
  MENULEFT: 'dropdown-menu-left',
  POSITION_STATIC: 'position-static'
};
var SELECTOR = {
  DATA_TOGGLE: 'bs4-dropdown .dropdown-toggle',
  FORM_CHILD: '.dropdown form',
  MENU: '.dropdown-menu',
  NAVBAR_NAV: '.navbar-nav',
  VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
};
var ATTACHMENTMAP = {
  TOP: 'top-start',
  TOPEND: 'top-end',
  BOTTOM: 'bottom-start',
  BOTTOMEND: 'bottom-end',
  RIGHT: 'right-start',
  RIGHTEND: 'right-end',
  LEFT: 'left-start',
  LEFTEND: 'left-end'
};
var DEFAULT = {
  offset: 0,
  flip: true,
  boundary: 'scrollParent',
  reference: 'toggle',
  display: 'dynamic'
};
var DEFAULTTYPE = {
  offset: '(number|string|function)',
  flip: 'boolean',
  boundary: '(string|element)',
  reference: '(string|element)',
  display: 'string'
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var DropdownService =
/*#__PURE__*/
function () {
  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(DropdownService, null, [{
    key: "closeAll",
    // Static
    value: function closeAll() {
      var _this = this;

      var $menus = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])('.dropdown-menu.show');
      $menus.each(function (index, menu) {
        var $menu = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(menu);
        var $dropdown = $menu.closest('dropdown-menu.show');

        _this.close($menu[0], $menu, $dropdown);
      });
    }
  }, {
    key: "close",
    value: function close(triggerCloseElement, $menu, $dropdown) {
      var relatedTarget = {
        relatedTarget: triggerCloseElement
      };

      var $parent = DropdownService._getParentFromElement(triggerCloseElement);

      if ($menu && $menu.hasClass(CLASSNAME.SHOW)) {
        $menu.removeClass(CLASSNAME.SHOW);
      }

      if ($dropdown && $dropdown.hasClass(CLASSNAME.SHOW)) {
        $dropdown.removeClass(CLASSNAME.SHOW).removeClass(CLASSNAME.SHOW).trigger(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"].Event(EVENT.HIDDEN, relatedTarget));
      }

      if ($parent.hasClass(CLASSNAME.SHOW)) {
        $parent.removeClass(CLASSNAME.SHOW).trigger(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"].Event(EVENT.HIDDEN, relatedTarget));
      }
    }
  }, {
    key: "_clearMenus",
    value: function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(SELECTOR.DATA_TOGGLE).get());
      Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(SELECTOR.DATA_TOGGLE).each(function (i, element) {
        // for (let i = 0, len = toggles.length; i < len; i++) {
        var parent = DropdownService._getParentFromElement(element);

        var context = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(toggles[i]).data(DATA_KEY); // console.warn('_clearMenus parent', parent, context);

        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          // continue;
          return;
        }

        var dropdownMenu = parent.find(SELECTOR.MENU);

        if (!Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(parent).hasClass(CLASSNAME.SHOW)) {
          // continue;
          return;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && _ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"].contains(parent.get(0), event.target)) {
          // continue;
          return;
        }

        var hideEvent = _ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"].Event(EVENT.HIDE, relatedTarget);
        Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          // continue;
          return;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if (document.documentElement && 'ontouchstart' in document.documentElement) {
          Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(document.body).children().off('mouseover', 'null', _ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"].noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');
        dropdownMenu.removeClass(CLASSNAME.SHOW);
        parent.removeClass(CLASSNAME.SHOW).trigger(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"].Event(EVENT.HIDDEN, relatedTarget));
      });
    }
  }, {
    key: "_getParentFromElement",
    value: function _getParentFromElement(element) {
      return Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(element).parent(); // let parent;
      // const selector = Utils.getSelectorFromElement(element);
      // if (selector) {
      //   parent = document.querySelector(selector);
      // }
      // return parent || element.parentNode;
    }
  }, {
    key: "VERSION",
    // Getters
    get: function get() {
      return VERSION;
    }
  }, {
    key: "Default",
    get: function get() {
      return DEFAULT;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DEFAULTTYPE;
    }
  }]);

  function DropdownService(element, config) {
    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_6___default()(this, DropdownService);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(this, "_element", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(this, "_popper", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(this, "_config", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(this, "_menu", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(this, "_inNavbar", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(this, "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["Debug"])('service:DropdownService'));

    this._element = element;
    this._popper = null;
    this._config = this._getConfig(config);
    this._menu = this._getMenuElement();
    this._inNavbar = this._detectNavbar();
    Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(this._element).data(DATA_KEY, this._config);
    this.clouseOnClickOutsite(DropdownService._getParentFromElement(this._element));
  } // Public


  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(DropdownService, [{
    key: "close",
    value: function close() {
      return DropdownService.close(this._element, Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(this._menu));
    }
  }, {
    key: "show",
    value: function show() {
      var relatedTarget = {
        relatedTarget: this._element
      };

      var $parent = DropdownService._getParentFromElement(this._element);

      if (!Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(this._menu).hasClass(CLASSNAME.SHOW)) {
        Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(this._menu).addClass(CLASSNAME.SHOW);
      }

      if (!$parent.hasClass(CLASSNAME.SHOW)) {
        $parent.addClass(CLASSNAME.SHOW).trigger(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"].Event(EVENT.SHOWN, relatedTarget));
      }
    }
  }, {
    key: "toggle",
    value: function toggle() {
      if (this._element.disabled || Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(this._element).hasClass(CLASSNAME.DISABLED)) {
        return;
      }

      var parent = DropdownService._getParentFromElement(this._element);

      var isActive = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(this._menu).hasClass(CLASSNAME.SHOW);

      DropdownService._clearMenus();

      if (isActive) {
        this.close();
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = _ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"].Event(EVENT.SHOW, relatedTarget);
      Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      this.clouseOnClickOutsite(DropdownService._getParentFromElement(this._element)); // Disable totally Popper.js for Dropdown in Navbar

      if (!this._inNavbar) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof popper_js__WEBPACK_IMPORTED_MODULE_9__["default"] === 'undefined') {
          throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent.get(0);
        } else if (_services_Utils__WEBPACK_IMPORTED_MODULE_11__["Utils"].isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(parent).addClass(CLASSNAME.POSITION_STATIC);
        }

        this._popper = new popper_js__WEBPACK_IMPORTED_MODULE_9__["default"](referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if (document.documentElement && 'ontouchstart' in document.documentElement && Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(parent).closest(SELECTOR.NAVBAR_NAV).length === 0) {
        Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(document.body).children().on('mouseover', null, _ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"].noop);
      }

      this.clouseOnClickOutsite(DropdownService._getParentFromElement(this._element));

      this._element.focus();

      this._element.setAttribute('aria-expanded', 'true');

      Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(this._menu).toggleClass(CLASSNAME.SHOW);
      Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(parent).toggleClass(CLASSNAME.SHOW).trigger(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"].Event(EVENT.SHOWN, relatedTarget));
    }
  }, {
    key: "dispose",
    value: function dispose() {
      _ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"].removeData(this._element, DATA_KEY);
      Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(this._element).off(EVENT_KEY);
      delete this._element; // = null;

      delete this._menu; // = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    }
  }, {
    key: "update",
    value: function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private

    /**
     * @see https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element
     * @param selector
     */

  }, {
    key: "clouseOnClickOutsite",
    value: function clouseOnClickOutsite($element) {
      var _this2 = this;

      var outsideClickListener = function outsideClickListener(event) {
        if (!Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(event.target).closest($element.get(0)).length) {
          _this2.close();

          removeClickListener();
        }
      };

      var removeClickListener = function removeClickListener() {
        document.removeEventListener('click', outsideClickListener);
      };

      document.addEventListener('click', outsideClickListener);
    }
  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread({}, DropdownService.Default, {}, Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(this._element).data(), {}, config);
      _services_Utils__WEBPACK_IMPORTED_MODULE_11__["Utils"].typeCheckConfig(NAME, config, DropdownService.DefaultType);
      return config;
    }
  }, {
    key: "_getMenuElement",
    value: function _getMenuElement() {
      if (!this._menu) {
        var parent = DropdownService._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.find(SELECTOR.MENU).get(0);
        }
      }

      return this._menu;
    }
  }, {
    key: "_getPlacement",
    value: function _getPlacement() {
      var $parentDropdown = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(this._element.parentNode);
      var placement = ATTACHMENTMAP.BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(CLASSNAME.DROPUP)) {
        placement = ATTACHMENTMAP.TOP;

        if (Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(this._menu).hasClass(CLASSNAME.MENURIGHT)) {
          placement = ATTACHMENTMAP.TOPEND;
        }
      } else if ($parentDropdown.hasClass(CLASSNAME.DROPRIGHT)) {
        placement = ATTACHMENTMAP.RIGHT;
      } else if ($parentDropdown.hasClass(CLASSNAME.DROPLEFT)) {
        placement = ATTACHMENTMAP.LEFT;
      } else if (Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(this._menu).hasClass(CLASSNAME.MENURIGHT)) {
        placement = ATTACHMENTMAP.BOTTOMEND;
      }

      return placement;
    }
  }, {
    key: "_detectNavbar",
    value: function _detectNavbar() {
      return Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(this._element).closest('.navbar').length > 0;
    }
  }, {
    key: "_getPopperConfig",
    value: function _getPopperConfig() {
      var _this3 = this;

      var offsetConf = {};

      if (typeof this._config.offset === 'function') {
        offsetConf.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, {}, _this3._config.offset(data.offsets) || {});
          return data;
        };
      } else {
        offsetConf.offset = this._config.offset;
      }

      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: offsetConf,
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      }; // Disable Popper.js if we have a static display

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return popperConfig;
    }
  }]);

  return DropdownService;
}();

/***/ }),

/***/ "./src/ts/components/bs4/tabs/tabs.component.ts":
/*!******************************************************!*\
  !*** ./src/ts/components/bs4/tabs/tabs.component.ts ***!
  \******************************************************/
/*! exports provided: TabsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TabsComponent", function() { return TabsComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");










var TabsComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(TabsComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(TabsComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function TabsComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, TabsComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(TabsComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Debug"])('component:bs4-tabs'));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "scope", {});

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$el", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$tabs", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$tabPanes", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$scrollable", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "tabsSameHeight", true);

    console.warn('Depricated use tabs module from bs4 module');

    var self = _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this);

    _this.$el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(_this.el);
    _this.$tabs = _this.$el.find('.nav-link');
    _this.$tabPanes = _this.$el.find('.tab-pane');
    _this.$scrollable = _this.$el.find('[scrollable]');

    _this.debug('constructor', _this.$el, _this.$tabs, _this.$tabPanes);

    _this.$tabs.on('click', function (event) {
      event.preventDefault();
      var $tab = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(this);
      self.activate($tab);
    });

    _this.$tabs.off('shown.bs.tab').on('shown.bs.tab', function (event) {
      var $tab = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(event.target);

      if (_this.$scrollable.length) {
        var tabScrollPosition = $tab[0].getBoundingClientRect();
        var scrollLeftTo = _this.$scrollable.scrollLeft() || 0 + tabScrollPosition.left;

        _this.$scrollable.animate({
          scrollLeft: scrollLeftTo
        }, 'slow');
      }
    });

    _this.activate(_this.$tabs.first());

    if (_this.tabsSameHeight) {
      Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(window).on('resize', function () {
        _this.setHeight();
      });
    }

    _this.init(TabsComponent.observedAttributes);

    return _this;
  }
  /**
   * Make all tabs panes as height as the heighest tab pane
   */


  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(TabsComponent, [{
    key: "setHeight",
    value: function setHeight() {
      var heigest = 0;
      this.$tabPanes.each(function () {
        var $tabPane = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(this);
        $tabPane.css('height', 'auto');
        var height = $tabPane.height() || 0;

        if (height > heigest) {
          heigest = height;
        }
      });
      this.$tabPanes.each(function () {
        var $tabPane = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(this);
        $tabPane.css('height', heigest + 'px');
      });
    }
  }, {
    key: "deactivateAll",
    value: function deactivateAll() {
      this.$tabs.each(function () {
        var $tab = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(this);
        $tab.removeClass('active');
      });
      this.$tabPanes.each(function () {
        var $tabPane = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(this);
        $tabPane.removeClass('active show');
      });
    }
  }, {
    key: "activate",
    value: function activate($tab) {
      var target = $tab.attr('href');
      this.debug('activate', target, this.$el.find(target || ''));

      if (target) {
        var $target = this.$el.find(target);
        this.deactivateAll();
        $target.addClass('active');
        setTimeout(function () {
          $target.addClass('show');
          $tab.addClass('active');
          $target.trigger('shown.bs.tab');
          $tab.trigger('shown.bs.tab');
        }, 0);
      }
    }
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setHeight();

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "template",
    value: function template() {
      return null;
    }
  }]);

  return TabsComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(TabsComponent, "tagName", 'bs4-tabs');

/***/ }),

/***/ "./src/ts/components/contact-form/contact-form.component.html":
/*!********************************************************************!*\
  !*** ./src/ts/components/contact-form/contact-form.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/contact-form/contact-form.component.ts":
/*!******************************************************************!*\
  !*** ./src/ts/components/contact-form/contact-form.component.ts ***!
  \******************************************************************/
/*! exports provided: ContactFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactFormComponent", function() { return ContactFormComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _services_Utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/Utils */ "./src/ts/services/Utils.ts");
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _contact_form_component_html__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contact-form.component.html */ "./src/ts/components/contact-form/contact-form.component.html");
/* harmony import */ var _contact_form_component_html__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_contact_form_component_html__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ribajs/shopify-tda */ "./node_modules/@ribajs/shopify-tda/src/index.ts");












 // TODO move to general validation component class we can extend from

var ContactFormComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(ContactFormComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ContactFormComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function ContactFormComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ContactFormComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ContactFormComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["Debug"])('component:' + ContactFormComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "localsService", new _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_12__["LocalesService"]());

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$form", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "scope", {
      form: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''
      },
      validation: _this.getValidationObject(),

      /** send form function */
      send: _this.send,

      /** select all text function */
      selectAll: _this.selectAll,

      /** form post request error message if form fails */
      error: '',

      /** form post request success message if form request was succes */
      success: ''
    });

    _this.init(ContactFormComponent.observedAttributes);

    return _this;
  }
  /**
   * Send the contact form using a form submit request with best shopify form support
   */


  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ContactFormComponent, [{
    key: "send",
    value: function send(context, event) {
      this.debug('send', this.scope, event);
      this.scope.form.firstName = _services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stripHtml(this.scope.form.firstName);
      this.scope.form.lastName = _services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stripHtml(this.scope.form.lastName);
      this.scope.form.phone = _services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stripHtml(this.scope.form.phone);
      this.scope.form.email = _services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stripHtml(this.scope.form.email);

      if (this.$form) {
        this.scope.validation = this.validate(this.scope.validation, this.scope.form, ['firstName', 'lastName', 'phone', 'email', 'message'], this.$form);
      }

      if (!this.scope.validation.valid) {
        // stop automatic submit
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }, {
    key: "selectAll",
    value: function selectAll(context, event, scope, eventEl) {
      this.debug('selectAll');
      _services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].selectAll(eventEl);
    }
    /**
     * validate form
     * @param validation object with the validation rules
     * @param the form with the values form the form
     * @param keys keys you want to validate
     */

  }, {
    key: "validate",
    value: function validate(validation, formValues, keys, $form) {
      validation.valid = true;
      keys.forEach(function (key) {
        if (!validation.rules) {
          return;
        }

        validation.rules[key].error = ''; // value is requred

        if (validation.rules[key].required) {
          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isString(formValues[key])) {
            if (formValues[key].length <= 0) {
              validation.valid = false; // validation.rules[key].error = 'This field is required';

              validation.rules[key].error = 'forms.invalid.required';
            }
          }

          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isUndefined(formValues[key])) {
            // validation.rules[key].error = 'This field is required';
            validation.rules[key].error = 'forms.invalid.required';
          }
        } // validation for numbers


        if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isNumber(formValues[key])) {
          // maximum value for number
          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isNumber(validation.rules[key].max)) {
            if (formValues[key] > validation.rules[key].max) {
              // validation.rules[key].error = 'The number must be a maximum of ' + validation.rules[key].max;
              validation.rules[key].error = 'forms.invalid.required';
            }
          } // minimum value for number


          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isNumber(validation.rules[key].min)) {
            if (formValues[key] < validation.rules[key].min) {
              // validation.rules[key].error = 'The number must be at least ' + validation.rules[key].min;
              validation.rules[key].error = 'forms.invalid.min';
            }
          }
        } // validation for strings


        if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isString(formValues[key]) && formValues[key].length >= 1) {
          // maximum value for string length
          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isNumber(validation.rules[key].maxlength)) {
            if (formValues[key].length > validation.rules[key].maxlength) {
              // validation.rules[key].error = 'The number of characters must not exceed ' + validation.rules[key].maxlength;
              validation.rules[key].error = 'forms.invalid.maxlength';
            }
          } // minimum value for string length


          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isNumber(validation.rules[key].minlength)) {
            if (formValues[key].length < validation.rules[key].minlength) {
              // validation.rules[key].error = 'The number of characters must be at least ' + validation.rules[key].minlength;
              validation.rules[key].error = 'forms.invalid.minlength';
            }
          } // email


          if (validation.rules[key].isEmail) {
            if (formValues[key].indexOf('@') <= -1) {
              // validation.rules[key].error = 'This is not a valid email address';
              validation.rules[key].error = 'forms.invalid.invalid_email';
            }

            if (formValues[key].indexOf('.') <= -1) {
              // validation.rules[key].error = 'This is not a valid email address';
              validation.rules[key].error = 'forms.invalid.invalid_email';
            }
          } // phone number


          if (validation.rules[key].isPhone) {
            if (!_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stringIsPhoneNumber(formValues[key])) {
              // validation.rules[key].error = 'The phone number can only contain numbers, +, -, ) and (';
              validation.rules[key].error = 'forms.invalid.invalid_phone';
            }
          } // only numbers


          if (validation.rules[key].onlyNumbers) {
            if (!_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stringHasOnlyNumbers(formValues[key])) {
              // validation.rules[key].error = 'The value may only contain numbers';
              validation.rules[key].error = 'forms.invalid.only_numbers';
            }
          }
        } // is all valid?


        if (validation.rules[key].error.length) {
          validation.valid = false;
        }
      });
      /**
       * Run also the native browser validation
       * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/checkValidity
       */

      if (validation.valid) {
        validation.valid = $form[0].checkValidity();
      }

      $form.addClass('was-validated');
      this.debug('validate', validation);
      return validation;
    }
  }, {
    key: "getValidationObject",
    value: function getValidationObject() {
      var validation = {
        valid: true,
        rules: {
          firstName: {
            required: true,
            minlength: 3,
            error: ''
          },
          lastName: {
            required: true,
            minlength: 3,
            error: ''
          },
          email: {
            required: true,
            isEmail: true,
            minlength: 3,
            error: ''
          },
          phone: {
            required: false,
            isPhone: true,
            minlength: 4,
            error: ''
          },
          message: {
            required: true,
            minlength: 20,
            error: ''
          }
        }
      };
      return validation;
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('before');
                this.$form = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(this.el).find('form'); // For custom style form validation, see https://getbootstrap.com/docs/4.1/components/forms/#custom-styles

                this.$form.addClass('needs-validation');
                this.$form.attr('novalidate', '');

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _contact_form_component_html__WEBPACK_IMPORTED_MODULE_11___default.a;
      }
    }
  }]);

  return ContactFormComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(ContactFormComponent, "tagName", 'rv-contact-form');

/***/ }),

/***/ "./src/ts/components/cookie-banner/cookie-banner.component.html":
/*!**********************************************************************!*\
  !*** ./src/ts/components/cookie-banner/cookie-banner.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/cookie-banner/cookie-banner.component.ts":
/*!********************************************************************!*\
  !*** ./src/ts/components/cookie-banner/cookie-banner.component.ts ***!
  \********************************************************************/
/*! exports provided: CookieBannerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookieBannerComponent", function() { return CookieBannerComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _cookie_banner_component_html__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./cookie-banner.component.html */ "./src/ts/components/cookie-banner/cookie-banner.component.html");
/* harmony import */ var _cookie_banner_component_html__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_cookie_banner_component_html__WEBPACK_IMPORTED_MODULE_10__);











var CookieBannerComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(CookieBannerComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(CookieBannerComponent, [{
    key: "cookieAccepted",
    get: function get() {
      if (document.cookie.indexOf(this.cookieAcceptedString + '=true') > -1) {
        return true;
      }

      return false;
    },
    set: function set(accepted) {
      document.cookie = "".concat(this.cookieAcceptedString, "=").concat(accepted, "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/");
      this.scope.show = !accepted;
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['title', 'text', 'url', 'label'];
    }
  }]);

  function CookieBannerComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, CookieBannerComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(CookieBannerComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "cookieAcceptedString", 'cookieconsent_accepted');

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Debug"])('component:' + CookieBannerComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "scope", {
      accept: _this.accept,
      close: _this.close,
      show: false
    });

    _this.debug('constructor', _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));

    _this.scope.show = !_this.cookieAccepted;

    _this.init(CookieBannerComponent.observedAttributes);

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(CookieBannerComponent, [{
    key: "accept",
    value: function accept(context, event) {
      this.debug('accept');
      this.cookieAccepted = true;
    }
  }, {
    key: "close",
    value: function close(context, event) {
      this.debug('close');
      this.scope.show = false;
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind');

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('afterBind', this.scope);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _cookie_banner_component_html__WEBPACK_IMPORTED_MODULE_10___default.a;
      }
    }
  }]);

  return CookieBannerComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(CookieBannerComponent, "tagName", 'rv-cookie-banner');

/***/ }),

/***/ "./src/ts/components/debug-bar/debug-bar.component.html":
/*!**************************************************************!*\
  !*** ./src/ts/components/debug-bar/debug-bar.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<small rv-hide=hidden class=text-right rv-on-singletap=toggleBar rv-on-doubletap=hide> { themeName }<br/> <div> Device width: <span class=\"d-inline-block d-sm-none\">XS</span> <span class=\"d-none d-sm-inline-block d-md-none\">SM</span> <span class=\"d-none d-md-inline-block d-lg-none\">MD</span> <span class=\"d-none d-lg-inline-block d-xl-none\">LG</span> <span class=\"d-none d-xl-inline-block\">XL</span> </div> </small>";

/***/ }),

/***/ "./src/ts/components/debug-bar/debug-bar.component.ts":
/*!************************************************************!*\
  !*** ./src/ts/components/debug-bar/debug-bar.component.ts ***!
  \************************************************************/
/*! exports provided: DebugBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DebugBarComponent", function() { return DebugBarComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/get */ "./node_modules/@babel/runtime-corejs2/helpers/get.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _debug_bar_component_html__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./debug-bar.component.html */ "./src/ts/components/debug-bar/debug-bar.component.html");
/* harmony import */ var _debug_bar_component_html__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_debug_bar_component_html__WEBPACK_IMPORTED_MODULE_11__);












var DebugBarComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(DebugBarComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(DebugBarComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['theme-name'];
    }
  }]);

  function DebugBarComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, DebugBarComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(DebugBarComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["Debug"])('component:' + DebugBarComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "scope", {
      hasPreviewBar: false,
      hasAdminBar: false,
      toggleBar: _this.toggleBar,
      hide: _this.hide,
      hidden: false
    });

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "autobind", true);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "$el", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "$previewBar", null);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "$adminBar", null);

    _this.$el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(_this.el);

    _this.init(DebugBarComponent.observedAttributes);

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(DebugBarComponent, [{
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue, namespace) {
      this.debug('attributeChangedCallback', name, oldValue, newValue, namespace); // injects the changed attributes to scope

      _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(DebugBarComponent.prototype), "attributeChangedCallback", this).call(this, name, oldValue, newValue, namespace);
    }
  }, {
    key: "hide",
    value: function hide() {
      this.scope.hidden = !this.scope.hidden;
    }
  }, {
    key: "toggleBar",
    value: function toggleBar() {
      var forceHide = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.$previewBar && this.$previewBar.length > 0) {
        if (forceHide === true || this.elementIsVisable(this.$previewBar)) {
          this.debug('hide previewbar');
          this.$previewBar.attr('hidden', ''); // this.$previewBar.hide();
        } else {
          this.debug('show previewbar');
          this.$previewBar.removeAttr('hidden'); // this.$previewBar.show();
        }
      }

      if (this.$adminBar && this.$adminBar.length > 0) {
        if (forceHide === true || this.elementIsVisable(this.$adminBar)) {
          this.debug('hide adminbar');
          this.$adminBar.attr('hidden', ''); // this.$adminBar.hide();
        } else {
          this.debug('show adminbar');
          this.$adminBar.removeAttr('hidden'); // this.$adminBar.show();
        }
      }
    }
  }, {
    key: "elementIsVisable",
    value: function elementIsVisable($el) {
      return !this.elementIsHidden($el);
    }
  }, {
    key: "elementIsHidden",
    value: function elementIsHidden($el) {
      return $el.is(':hidden') || $el[0].hasAttribute('hidden') || $el.css('display') === 'none' || $el.css('visibility') === 'hidden';
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind');
                this.$previewBar = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])('#preview-bar-iframe') || null;
                this.$adminBar = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])('#admin-bar-iframe') || null;

                if (this.$previewBar && this.$previewBar.length) {
                  this.scope.hasPreviewBar = true;
                  this.toggleBar(true);
                } else {
                  this.$previewBar = null;
                  this.scope.hasPreviewBar = false;
                }

                if (this.$adminBar && this.$adminBar.length) {
                  this.scope.hasAdminBar = true;
                  this.toggleBar(true);
                } else {
                  this.$adminBar = null;
                  this.scope.hasAdminBar = false;
                }

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _debug_bar_component_html__WEBPACK_IMPORTED_MODULE_11___default.a;
      }
    }
  }]);

  return DebugBarComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(DebugBarComponent, "tagName", 'rv-debug-bar');

/***/ }),

/***/ "./src/ts/components/delete-data-form/delete-data-form.component.html":
/*!****************************************************************************!*\
  !*** ./src/ts/components/delete-data-form/delete-data-form.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/delete-data-form/delete-data-form.component.ts":
/*!**************************************************************************!*\
  !*** ./src/ts/components/delete-data-form/delete-data-form.component.ts ***!
  \**************************************************************************/
/*! exports provided: DeleteDataFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteDataFormComponent", function() { return DeleteDataFormComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _services_Utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/Utils */ "./src/ts/services/Utils.ts");
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _delete_data_form_component_html__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./delete-data-form.component.html */ "./src/ts/components/delete-data-form/delete-data-form.component.html");
/* harmony import */ var _delete_data_form_component_html__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_delete_data_form_component_html__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ribajs/shopify-tda */ "./node_modules/@ribajs/shopify-tda/src/index.ts");












 // TODO move to general validation component class we can extend from

var DeleteDataFormComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(DeleteDataFormComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(DeleteDataFormComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function DeleteDataFormComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, DeleteDataFormComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(DeleteDataFormComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["Debug"])('component:' + DeleteDataFormComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "localsService", new _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_12__["LocalesService"]());

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$form", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "scope", {
      form: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''
      },
      validation: _this.getValidationObject(),

      /** send form function */
      send: _this.send,

      /** select all text function */
      selectAll: _this.selectAll,

      /** form post request error message if form fails */
      error: '',

      /** form post request success message if form request was succes */
      success: ''
    });

    _this.init(DeleteDataFormComponent.observedAttributes);

    return _this;
  }
  /**
   * Send the contact form using a form submit request with best shopify form support
   */


  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(DeleteDataFormComponent, [{
    key: "send",
    value: function send(context, event) {
      this.debug('send', this.scope, event);
      this.scope.form.firstName = _services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stripHtml(this.scope.form.firstName);
      this.scope.form.lastName = _services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stripHtml(this.scope.form.lastName);
      this.scope.form.phone = _services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stripHtml(this.scope.form.phone);
      this.scope.form.email = _services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stripHtml(this.scope.form.email);

      if (this.$form) {
        this.scope.validation = this.validate(this.scope.validation, this.scope.form, ['firstName', 'lastName', 'phone', 'email', 'message'], this.$form);
      }

      if (!this.scope.validation.valid) {
        // stop automatic submit
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }, {
    key: "selectAll",
    value: function selectAll(context, event, scope, eventEl) {
      this.debug('selectAll');
      _services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].selectAll(eventEl);
    }
    /**
     * validate form
     * @param validation object with the validation rules
     * @param the form with the values form the form
     * @param keys keys you want to validate
     */

  }, {
    key: "validate",
    value: function validate(validation, formValues, keys, $form) {
      validation.valid = true;
      keys.forEach(function (key) {
        if (!validation.rules) {
          return;
        }

        validation.rules[key].error = ''; // value is requred

        if (validation.rules[key].required) {
          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isString(formValues[key])) {
            if (formValues[key].length <= 0) {
              validation.rules[key].error = 'This field is required';
            }
          }

          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isUndefined(formValues[key])) {
            validation.rules[key].error = 'This field is required';
          }
        } // validation for numbers


        if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isNumber(formValues[key])) {
          // maximum value for number
          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isNumber(validation.rules[key].max)) {
            if (formValues[key] > validation.rules[key].max) {
              validation.rules[key].error = 'The number must be a maximum of ' + validation.rules[key].max;
            }
          } // minimum value for number


          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isNumber(validation.rules[key].min)) {
            if (formValues[key] < validation.rules[key].min) {
              validation.rules[key].error = 'The number must be at least ' + validation.rules[key].min;
            }
          }
        } // validation for strings


        if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isString(formValues[key]) && formValues[key].length >= 1) {
          // maximum value for string length
          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isNumber(validation.rules[key].maxlength)) {
            if (formValues[key].length > validation.rules[key].maxlength) {
              validation.rules[key].error = 'The number of characters must not exceed ' + validation.rules[key].maxlength;
            }
          } // minimum value for string length


          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isNumber(validation.rules[key].minlength)) {
            if (formValues[key].length < validation.rules[key].minlength) {
              validation.rules[key].error = 'The number of characters must be at least ' + validation.rules[key].minlength;
            }
          } // email


          if (validation.rules[key].isEmail) {
            if (formValues[key].indexOf('@') <= -1) {
              validation.rules[key].error = 'This is not a valid email address';
            }

            if (formValues[key].indexOf('.') <= -1) {
              validation.rules[key].error = 'This is not a valid email address';
            }
          } // phone number


          if (validation.rules[key].isPhone) {
            if (!_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stringIsPhoneNumber(formValues[key])) {
              validation.rules[key].error = 'The phone number can only contain numbers, +, -, ) and (';
            }
          } // only numbers


          if (validation.rules[key].onlyNumbers) {
            if (!_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stringHasOnlyNumbers(formValues[key])) {
              validation.rules[key].error = 'The value may only contain numbers';
            }
          }
        } // is all valid?


        if (validation.rules[key].error.length) {
          validation.valid = false;
        }
      });
      /**
       * Run also the native browser validation
       * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/checkValidity
       */

      if (validation.valid) {
        validation.valid = $form[0].checkValidity();
      }

      $form.addClass('was-validated');
      this.debug('validate', validation);
      return validation;
    }
  }, {
    key: "getValidationObject",
    value: function getValidationObject() {
      var validation = {
        valid: true,
        rules: {
          firstName: {
            required: true,
            minlength: 3,
            error: ''
          },
          lastName: {
            required: true,
            minlength: 3,
            error: ''
          },
          email: {
            required: true,
            isEmail: true,
            minlength: 3,
            error: ''
          },
          phone: {
            required: false,
            isPhone: true,
            minlength: 4,
            error: ''
          },
          message: {
            required: true,
            minlength: 20,
            error: ''
          }
        }
      };
      return validation;
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('before');
                this.$form = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(this.el).find('form'); // For custom style form validation, see https://getbootstrap.com/docs/4.1/components/forms/#custom-styles

                this.$form.addClass('needs-validation');
                this.$form.attr('novalidate', '');

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _delete_data_form_component_html__WEBPACK_IMPORTED_MODULE_11___default.a;
      }
    }
  }]);

  return DeleteDataFormComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(DeleteDataFormComponent, "tagName", 'rv-delete-data-form');

/***/ }),

/***/ "./src/ts/components/fsbdr-mainbar/fsbdr-mainbar.component.html":
/*!**********************************************************************!*\
  !*** ./src/ts/components/fsbdr-mainbar/fsbdr-mainbar.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/fsbdr-mainbar/fsbdr-mainbar.component.ts":
/*!********************************************************************!*\
  !*** ./src/ts/components/fsbdr-mainbar/fsbdr-mainbar.component.ts ***!
  \********************************************************************/
/*! exports provided: FsbdrMainbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FsbdrMainbarComponent", function() { return FsbdrMainbarComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/get */ "./node_modules/@babel/runtime-corejs2/helpers/get.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _fsbdr_mainbar_component_html__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./fsbdr-mainbar.component.html */ "./src/ts/components/fsbdr-mainbar/fsbdr-mainbar.component.html");
/* harmony import */ var _fsbdr_mainbar_component_html__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_fsbdr_mainbar_component_html__WEBPACK_IMPORTED_MODULE_11__);












var FsbdrMainbarComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(FsbdrMainbarComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(FsbdrMainbarComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['dataset', 'filter'];
    }
  }]);

  function FsbdrMainbarComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, FsbdrMainbarComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(FsbdrMainbarComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "autobind", true);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "$logoTop", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "$el", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["Debug"])('component:' + FsbdrMainbarComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "scope", {
      assign: _this.assign,
      open: _this.open,
      close: _this.close,
      menuOpen: false
    });

    _this.$el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(_this.el);
    _this.$logoTop = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])('.logo-text.logo-text-top');

    _this.debug('constructor', _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));

    _this.init(FsbdrMainbarComponent.observedAttributes);

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(FsbdrMainbarComponent, [{
    key: "assign",
    value: function assign(key, value, context, event) {
      // event.preventDefault();
      // event.stopPropagation();
      this.scope[key] = value;
    }
  }, {
    key: "open",
    value: function open() {
      this.scope.menuOpen = true;
      this.$logoTop.hide();
    }
  }, {
    key: "close",
    value: function close() {
      this.scope.menuOpen = false;
      this.$logoTop.show();
    }
  }, {
    key: "init",
    value: function () {
      var _init = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(observedAttributes) {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(FsbdrMainbarComponent.prototype), "init", this).call(this, observedAttributes).then(function (view) {
                  return view;
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init(_x) {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('beforeBind');

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.debug('afterBind', this.scope);
                this.$logoTop = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])('.logo-text.logo-text-top');

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return ['dataset'];
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(FsbdrMainbarComponent.prototype), "attributeChangedCallback", this).call(this, attributeName, oldValue, newValue, namespace);
    } // deconstructor

  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(FsbdrMainbarComponent.prototype), "disconnectedCallback", this).call(this);
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _fsbdr_mainbar_component_html__WEBPACK_IMPORTED_MODULE_11___default.a;
      }
    }
  }]);

  return FsbdrMainbarComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(FsbdrMainbarComponent, "tagName", 'fsbdr-mainbar');

/***/ }),

/***/ "./src/ts/components/fsbdr-video/fsbdr-video.component.ts":
/*!****************************************************************!*\
  !*** ./src/ts/components/fsbdr-video/fsbdr-video.component.ts ***!
  \****************************************************************/
/*! exports provided: FsbdrVideoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FsbdrVideoComponent", function() { return FsbdrVideoComponent; });
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");








var FsbdrVideoComponent =
/*#__PURE__*/
function (_VideoComponent) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(FsbdrVideoComponent, _VideoComponent);

  function FsbdrVideoComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, FsbdrVideoComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(FsbdrVideoComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "autobind", true);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_7__["Debug"])('component:' + FsbdrVideoComponent.tagName));

    _this.debug('constructor', _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(FsbdrVideoComponent, [{
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return ['mp4Src'];
    }
  }]);

  return FsbdrVideoComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_7__["VideoComponent"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(FsbdrVideoComponent, "tagName", 'fsbdr-video');

/***/ }),

/***/ "./src/ts/components/icon/icon.component.html":
/*!****************************************************!*\
  !*** ./src/ts/components/icon/icon.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = " ";

/***/ }),

/***/ "./src/ts/components/icon/icon.component.ts":
/*!**************************************************!*\
  !*** ./src/ts/components/icon/icon.component.ts ***!
  \**************************************************/
/*! exports provided: IconComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IconComponent", function() { return IconComponent; });
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/get */ "./node_modules/@babel/runtime-corejs2/helpers/get.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _icon_component_html__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./icon.component.html */ "./src/ts/components/icon/icon.component.html");
/* harmony import */ var _icon_component_html__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_icon_component_html__WEBPACK_IMPORTED_MODULE_9__);










var IconComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(IconComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(IconComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['size', 'width', 'height', 'name', 'src', 'color', 'direction'];
    }
  }]);

  function IconComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, IconComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(IconComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_8__["Debug"])('component:' + IconComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "scope", {});

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "autobind", false);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2___default()(_this), "$el", void 0);

    _this.$el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_8__["JQuery"])(_this.el);

    _this.$el.attr('aria-hidden', 'true').attr('role', 'img').addClass('iconset'); // set default values
    // this.attributeChangedCallback('size', null, 32, null);


    _this.attributeChangedCallback('direction', null, 'top', null);

    _this.init(IconComponent.observedAttributes);

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_5___default()(IconComponent, [{
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue, namespace) {
      this.debug('attributeChangedCallback', name, oldValue, newValue, namespace); // injects the changed attributes to scope

      _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(IconComponent.prototype), "attributeChangedCallback", this).call(this, name, oldValue, newValue, namespace);

      if (name === 'src') {
        this.$el.load(newValue);
      }

      if (name === 'color') {
        this.$el.css({
          color: newValue
        }).removeClass(function (index, className) {
          return (className.match(/(^|\s)color-\S+/g) || []).join(' ');
        }).addClass("color-".concat(newValue));
      }

      if (name === 'size') {
        var size = newValue;
        this.debug('set size', this.$el);
        this.$el.css({
          height: size,
          width: size
        }).removeClass(function (index, className) {
          return (className.match(/(^|\s)size-\S+/g) || []).join(' ');
        }).addClass("size-".concat(size));
      }

      if (name === 'width') {
        var width = newValue;
        this.debug('set width', this.$el);
        this.$el.css({
          width: width
        }).removeClass(function (index, className) {
          return (className.match(/(^|\s)width-\S+/g) || []).join(' ');
        }).addClass("width-".concat(width));
      }

      if (name === 'height') {
        var height = newValue;
        this.debug('set height', this.$el);
        this.$el.css({
          height: height
        }).removeClass(function (index, className) {
          return (className.match(/(^|\s)height-\S+/g) || []).join(' ');
        }).addClass("height-".concat(height));
      }

      if (name === 'direction') {
        var direction = newValue;
        var classString = "direction-".concat(direction);

        if (direction === 'left') {
          classString += ' rotate-270';
        } else if (direction === 'left-top' || direction === 'left-up' || direction === 'top-left' || direction === 'up-left') {
          classString += ' rotate-315';
        } else if (direction === 'top' || direction === 'up') {
          classString += ' rotate-0';
        } else if (direction === 'top-right' || direction === 'up-right' || direction === 'right-top' || direction === 'right-up') {
          classString += ' rotate-45';
        } else if (direction === 'right') {
          classString += ' rotate-90';
        } else if (direction === 'right-bottom' || direction === 'right-down' || direction === 'bottom-right' || direction === 'down-right') {
          classString += ' rotate-135';
        } else if (direction === 'bottom' || direction === 'down') {
          classString += ' rotate-180';
        } else if (direction === 'left-bottom' || direction === 'left-down' || direction === 'bottom-left' || direction === 'down-left') {
          classString += ' rotate-225';
        }

        this.$el.css({
          height: newValue,
          width: newValue
        }).removeClass(function (index, className) {
          return (className.match(/(^|\s)direction-\S+/g) || []).join(' ');
        }).removeClass(function (index, className) {
          return (className.match(/(^|\s)rotate-\S+/g) || []).join(' ');
        }).addClass(classString);
      }
    }
  }, {
    key: "template",
    value: function template() {
      return _icon_component_html__WEBPACK_IMPORTED_MODULE_9___default.a;
    }
  }]);

  return IconComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_8__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_7___default()(IconComponent, "tagName", 'rv-icon');

/***/ }),

/***/ "./src/ts/components/index.ts":
/*!************************************!*\
  !*** ./src/ts/components/index.ts ***!
  \************************************/
/*! exports provided: ContactFormComponent, CookieBannerComponent, DebugBarComponent, DeleteDataFormComponent, FsbdrMainbarComponent, IconComponent, InstagramComponent, InstagramScrollbarComponent, NewsletterComponent, RevokeFormComponent, ShopifyLinklistComponent, ShopifyFilterComponent, ShopifyArticleItemComponent, ShopifyProductComponent, ShopifyProductItemComponent, TdaI18nSwitcherComponent, ShopifyCartComponent, ShopifyCartButtonComponent, ShopifyCommentsFormComponent, ShopifyLoginFormComponent, ShopifyAddressesComponent, ShareComponent, PrivacySettingsComponent, ProductScrollbarComponent, TabsComponent, DropdownComponent, FsbdrVideoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _contact_form_contact_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contact-form/contact-form.component */ "./src/ts/components/contact-form/contact-form.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContactFormComponent", function() { return _contact_form_contact_form_component__WEBPACK_IMPORTED_MODULE_0__["ContactFormComponent"]; });

/* harmony import */ var _cookie_banner_cookie_banner_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cookie-banner/cookie-banner.component */ "./src/ts/components/cookie-banner/cookie-banner.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CookieBannerComponent", function() { return _cookie_banner_cookie_banner_component__WEBPACK_IMPORTED_MODULE_1__["CookieBannerComponent"]; });

/* harmony import */ var _debug_bar_debug_bar_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./debug-bar/debug-bar.component */ "./src/ts/components/debug-bar/debug-bar.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DebugBarComponent", function() { return _debug_bar_debug_bar_component__WEBPACK_IMPORTED_MODULE_2__["DebugBarComponent"]; });

/* harmony import */ var _delete_data_form_delete_data_form_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./delete-data-form/delete-data-form.component */ "./src/ts/components/delete-data-form/delete-data-form.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DeleteDataFormComponent", function() { return _delete_data_form_delete_data_form_component__WEBPACK_IMPORTED_MODULE_3__["DeleteDataFormComponent"]; });

/* harmony import */ var _fsbdr_mainbar_fsbdr_mainbar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fsbdr-mainbar/fsbdr-mainbar.component */ "./src/ts/components/fsbdr-mainbar/fsbdr-mainbar.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FsbdrMainbarComponent", function() { return _fsbdr_mainbar_fsbdr_mainbar_component__WEBPACK_IMPORTED_MODULE_4__["FsbdrMainbarComponent"]; });

/* harmony import */ var _icon_icon_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./icon/icon.component */ "./src/ts/components/icon/icon.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "IconComponent", function() { return _icon_icon_component__WEBPACK_IMPORTED_MODULE_5__["IconComponent"]; });

/* harmony import */ var _instagram_instagram_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./instagram/instagram.component */ "./src/ts/components/instagram/instagram.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InstagramComponent", function() { return _instagram_instagram_component__WEBPACK_IMPORTED_MODULE_6__["InstagramComponent"]; });

/* harmony import */ var _instagram_scrollbar_instagram_scrollbar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./instagram-scrollbar/instagram-scrollbar.component */ "./src/ts/components/instagram-scrollbar/instagram-scrollbar.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "InstagramScrollbarComponent", function() { return _instagram_scrollbar_instagram_scrollbar_component__WEBPACK_IMPORTED_MODULE_7__["InstagramScrollbarComponent"]; });

/* harmony import */ var _newsletter_newsletter_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./newsletter/newsletter.component */ "./src/ts/components/newsletter/newsletter.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewsletterComponent", function() { return _newsletter_newsletter_component__WEBPACK_IMPORTED_MODULE_8__["NewsletterComponent"]; });

/* harmony import */ var _revoke_form_revoke_form_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./revoke-form/revoke-form.component */ "./src/ts/components/revoke-form/revoke-form.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RevokeFormComponent", function() { return _revoke_form_revoke_form_component__WEBPACK_IMPORTED_MODULE_9__["RevokeFormComponent"]; });

/* harmony import */ var _shopify_linklist_shopify_linklist_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shopify-linklist/shopify-linklist.component */ "./src/ts/components/shopify-linklist/shopify-linklist.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShopifyLinklistComponent", function() { return _shopify_linklist_shopify_linklist_component__WEBPACK_IMPORTED_MODULE_10__["ShopifyLinklistComponent"]; });

/* harmony import */ var _shopify_filter_shopify_filter_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shopify-filter/shopify-filter.component */ "./src/ts/components/shopify-filter/shopify-filter.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShopifyFilterComponent", function() { return _shopify_filter_shopify_filter_component__WEBPACK_IMPORTED_MODULE_11__["ShopifyFilterComponent"]; });

/* harmony import */ var _shopify_article_item_shopify_article_item_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./shopify-article-item/shopify-article-item.component */ "./src/ts/components/shopify-article-item/shopify-article-item.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShopifyArticleItemComponent", function() { return _shopify_article_item_shopify_article_item_component__WEBPACK_IMPORTED_MODULE_12__["ShopifyArticleItemComponent"]; });

/* harmony import */ var _shopify_product_shopify_product_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./shopify-product/shopify-product.component */ "./src/ts/components/shopify-product/shopify-product.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShopifyProductComponent", function() { return _shopify_product_shopify_product_component__WEBPACK_IMPORTED_MODULE_13__["ShopifyProductComponent"]; });

/* harmony import */ var _shopify_product_item_shopify_product_item_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shopify-product-item/shopify-product-item.component */ "./src/ts/components/shopify-product-item/shopify-product-item.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShopifyProductItemComponent", function() { return _shopify_product_item_shopify_product_item_component__WEBPACK_IMPORTED_MODULE_14__["ShopifyProductItemComponent"]; });

/* harmony import */ var _switcher_switcher_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./switcher/switcher.component */ "./src/ts/components/switcher/switcher.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TdaI18nSwitcherComponent", function() { return _switcher_switcher_component__WEBPACK_IMPORTED_MODULE_15__["TdaI18nSwitcherComponent"]; });

/* harmony import */ var _shopify_cart_shopify_cart_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./shopify-cart/shopify-cart.component */ "./src/ts/components/shopify-cart/shopify-cart.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShopifyCartComponent", function() { return _shopify_cart_shopify_cart_component__WEBPACK_IMPORTED_MODULE_16__["ShopifyCartComponent"]; });

/* harmony import */ var _shopify_cart_button_shopify_cart_button_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./shopify-cart-button/shopify-cart-button.component */ "./src/ts/components/shopify-cart-button/shopify-cart-button.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShopifyCartButtonComponent", function() { return _shopify_cart_button_shopify_cart_button_component__WEBPACK_IMPORTED_MODULE_17__["ShopifyCartButtonComponent"]; });

/* harmony import */ var _shopify_comments_form_shopify_comments_form_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./shopify-comments-form/shopify-comments-form.component */ "./src/ts/components/shopify-comments-form/shopify-comments-form.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShopifyCommentsFormComponent", function() { return _shopify_comments_form_shopify_comments_form_component__WEBPACK_IMPORTED_MODULE_18__["ShopifyCommentsFormComponent"]; });

/* harmony import */ var _shopify_login_form_shopify_login_form_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./shopify-login-form/shopify-login-form.component */ "./src/ts/components/shopify-login-form/shopify-login-form.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShopifyLoginFormComponent", function() { return _shopify_login_form_shopify_login_form_component__WEBPACK_IMPORTED_MODULE_19__["ShopifyLoginFormComponent"]; });

/* harmony import */ var _shopify_addresses_shopify_addresses_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./shopify-addresses/shopify-addresses.component */ "./src/ts/components/shopify-addresses/shopify-addresses.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShopifyAddressesComponent", function() { return _shopify_addresses_shopify_addresses_component__WEBPACK_IMPORTED_MODULE_20__["ShopifyAddressesComponent"]; });

/* harmony import */ var _share_share_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./share/share.component */ "./src/ts/components/share/share.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ShareComponent", function() { return _share_share_component__WEBPACK_IMPORTED_MODULE_21__["ShareComponent"]; });

/* harmony import */ var _privacy_settings_privacy_settings_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./privacy-settings/privacy-settings.component */ "./src/ts/components/privacy-settings/privacy-settings.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrivacySettingsComponent", function() { return _privacy_settings_privacy_settings_component__WEBPACK_IMPORTED_MODULE_22__["PrivacySettingsComponent"]; });

/* harmony import */ var _product_scrollbar_product_scrollbar_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./product-scrollbar/product-scrollbar.component */ "./src/ts/components/product-scrollbar/product-scrollbar.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ProductScrollbarComponent", function() { return _product_scrollbar_product_scrollbar_component__WEBPACK_IMPORTED_MODULE_23__["ProductScrollbarComponent"]; });

/* harmony import */ var _bs4_bs4_components__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./bs4/bs4.components */ "./src/ts/components/bs4/bs4.components.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TabsComponent", function() { return _bs4_bs4_components__WEBPACK_IMPORTED_MODULE_24__["TabsComponent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DropdownComponent", function() { return _bs4_bs4_components__WEBPACK_IMPORTED_MODULE_24__["DropdownComponent"]; });

/* harmony import */ var _fsbdr_video_fsbdr_video_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./fsbdr-video/fsbdr-video.component */ "./src/ts/components/fsbdr-video/fsbdr-video.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FsbdrVideoComponent", function() { return _fsbdr_video_fsbdr_video_component__WEBPACK_IMPORTED_MODULE_25__["FsbdrVideoComponent"]; });




























/***/ }),

/***/ "./src/ts/components/instagram-scrollbar/instagram-scrollbar.component.html":
/*!**********************************************************************************!*\
  !*** ./src/ts/components/instagram-scrollbar/instagram-scrollbar.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/instagram-scrollbar/instagram-scrollbar.component.ts":
/*!********************************************************************************!*\
  !*** ./src/ts/components/instagram-scrollbar/instagram-scrollbar.component.ts ***!
  \********************************************************************************/
/*! exports provided: InstagramScrollbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstagramScrollbarComponent", function() { return InstagramScrollbarComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _ribajs_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/router */ "./node_modules/@ribajs/router/src/index.ts");
/* harmony import */ var _services_Utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../services/Utils */ "./src/ts/services/Utils.ts");
/* harmony import */ var _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ribajs/shopify-tda */ "./node_modules/@ribajs/shopify-tda/src/index.ts");
/* harmony import */ var _instagram_scrollbar_component_html__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./instagram-scrollbar.component.html */ "./src/ts/components/instagram-scrollbar/instagram-scrollbar.component.html");
/* harmony import */ var _instagram_scrollbar_component_html__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_instagram_scrollbar_component_html__WEBPACK_IMPORTED_MODULE_13__);














var InstagramScrollbarComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(InstagramScrollbarComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(InstagramScrollbarComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['instagram-id', 'open-links', 'limit', 'open-url'];
    }
  }]);

  function InstagramScrollbarComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, InstagramScrollbarComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(InstagramScrollbarComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Debug"])('component:' + InstagramScrollbarComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "scope", {
      instagramId: undefined,
      openLinks: false,
      openUrl: '',
      limit: 0,
      onScroll: _this.onScroll,
      onTap: _this.onTap,
      media: undefined
    });

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$el", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "pjax", new _ribajs_router__WEBPACK_IMPORTED_MODULE_10__["Pjax"]('main'));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$scollWith", void 0);

    _this.$el = $(_this.el);
    _this.$scollWith = _this.$el.find('.title-row');

    _this.init(InstagramScrollbarComponent.observedAttributes);

    return _this;
  }
  /**
   * Just open the instagram url
   */


  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(InstagramScrollbarComponent, [{
    key: "onTap",
    value: function onTap(context, event, scope, eventEl) {
      if (this.scope.openUrl.length > 0) {
        this.pjax.goTo(this.scope.openUrl);
      }

      if (this.scope.openLinks) {
        var url = $(eventEl).first().data('url');
        this.pjax.goTo(url, true);
      }
    }
    /**
     * get instagram in the middle of the scrollbar elementinnerWidth
     * TODO not used
     */

  }, {
    key: "onScroll",
    value: function onScroll(context, event, scope, eventEl, binding) {
      var self = this;
      this.debug('onScroll', eventEl.scrollLeft, this.$scollWith);

      if (this.$scollWith) {
        var factor = 3;
        this.$scollWith.scrollLeft(eventEl.scrollLeft / factor);
      }
    }
    /**
     * Get width insite the scrollbar of the autoscolling title
     * TODO not used
     */

  }, {
    key: "getTitleWidth",
    value: function getTitleWidth() {
      if (!this.$scollWith) {
        return 0;
      }

      return this.$scollWith.find('.title-col')[0].clientWidth || 0;
    }
    /**
     * Get width insite the scrollbar of the dragablle / scrollable area
     */

  }, {
    key: "getInstagramWidth",
    value: function getInstagramWidth() {
      if (!this.scope.media) {
        return;
      }

      var width = _services_Utils__WEBPACK_IMPORTED_MODULE_11__["Utils"].getViewportDimensions().w / 3 * this.scope.media.data.length;
      return width;
    }
  }, {
    key: "loadMedia",
    value: function loadMedia() {
      var _this2 = this;

      if (!this.scope.instagramId) {
        throw new Error('instagram id is required!');
      }

      _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_12__["InstagramService"].loadMedia(this.scope.instagramId, this.scope.limit).then(function (response) {
        _this2.scope.media = response.media;

        _this2.debug('response', response);
      }).catch(function (error) {
        _this2.debug("Error: Can't load instagram media", error);
      });
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind', this.scope);
                return _context.abrupt("return", this.loadMedia());

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return ['instagramId', 'limit'];
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _instagram_scrollbar_component_html__WEBPACK_IMPORTED_MODULE_13___default.a;
      }
    }
  }]);

  return InstagramScrollbarComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(InstagramScrollbarComponent, "tagName", 'rv-instagram-scrollbar');

/***/ }),

/***/ "./src/ts/components/instagram/instagram.component.html":
/*!**************************************************************!*\
  !*** ./src/ts/components/instagram/instagram.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=row> <div class=\"col-4 px-0 content-box ratio-1-1\" rv-each-image=media.data rv-add-class=image.media_type> {% comment %} IMAGE {% endcomment %} <img lazyload=lazy class=\"content lazy\" rv-if=\"image.media_type | eq 'IMAGE'\" rv-src=image.media_url rv-alt=image.caption> {% comment %} CAROUSEL_ALBUM {% endcomment %} <img lazyload=lazy class=\"content lazy\" rv-if=\"image.media_type | eq 'CAROUSEL_ALBUM'\" rv-src=image.media_url rv-src=image.media_url rv-alt=image.caption> {% comment %} VIDEO {% endcomment %} <video class=\"content lazy\" rv-if=\"image.media_type | eq 'VIDEO'\" autoplay muted loop preload playsinline webkit-playsinline> <source rv-src=image.media_url type=video/mp4> Your browser does not support the video tag. </video> {% comment %} hover info {% endcomment %} <div class=\"content caption d-none d-md-flex align-items-center\" rv-text=image.caption></div> </div> </div> ";

/***/ }),

/***/ "./src/ts/components/instagram/instagram.component.ts":
/*!************************************************************!*\
  !*** ./src/ts/components/instagram/instagram.component.ts ***!
  \************************************************************/
/*! exports provided: InstagramComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstagramComponent", function() { return InstagramComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _ribajs_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ribajs/router */ "./node_modules/@ribajs/router/src/index.ts");
/* harmony import */ var _instagram_component_html__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./instagram.component.html */ "./src/ts/components/instagram/instagram.component.html");
/* harmony import */ var _instagram_component_html__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_instagram_component_html__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ribajs/shopify-tda */ "./node_modules/@ribajs/shopify-tda/src/index.ts");














var InstagramComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(InstagramComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(InstagramComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['instagram-id', 'open-links', 'limit'];
    }
  }]);

  function InstagramComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, InstagramComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(InstagramComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["Debug"])('component:' + InstagramComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "scope", {
      media: undefined,
      openLinks: false,
      limit: 0,
      instagramId: undefined,
      onTap: _this.onTap
    });

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_6___default()(_this), "pjax", new _ribajs_router__WEBPACK_IMPORTED_MODULE_11__["Pjax"]('main'));

    _this.init(InstagramComponent.observedAttributes);

    return _this;
  }
  /**
   * Just open the instagram url
   */


  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(InstagramComponent, [{
    key: "onTap",
    value: function onTap(context, event, scope, eventEl, binding) {
      if (!this.scope.openLinks) {
        return;
      }

      var url = $(eventEl).first().data('url');
      this.pjax.goTo(url, true);
    }
  }, {
    key: "loadMedia",
    value: function loadMedia() {
      var _this2 = this;

      if (!this.scope.instagramId) {
        return _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_2___default.a.reject();
      }

      _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_13__["InstagramService"].loadMedia(this.scope.instagramId, this.scope.limit).then(function (response) {
        _this2.scope.media = response.media;

        _this2.debug('response', response);
      }).catch(function (error) {
        _this2.debug("Error: Can't load instagram media", error);
      });
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind', this.scope);
                return _context.abrupt("return", this.loadMedia());

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return ['instagramId', 'limit'];
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _instagram_component_html__WEBPACK_IMPORTED_MODULE_12___default.a;
      }
    }
  }]);

  return InstagramComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(InstagramComponent, "tagName", 'rv-instagram');

/***/ }),

/***/ "./src/ts/components/newsletter/newsletter.component.html":
/*!****************************************************************!*\
  !*** ./src/ts/components/newsletter/newsletter.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/newsletter/newsletter.component.ts":
/*!**************************************************************!*\
  !*** ./src/ts/components/newsletter/newsletter.component.ts ***!
  \**************************************************************/
/*! exports provided: NewsletterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsletterComponent", function() { return NewsletterComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _newsletter_component_html__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./newsletter.component.html */ "./src/ts/components/newsletter/newsletter.component.html");
/* harmony import */ var _newsletter_component_html__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_newsletter_component_html__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ribajs/shopify-tda */ "./node_modules/@ribajs/shopify-tda/src/index.ts");
/* harmony import */ var _services_Utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../services/Utils */ "./src/ts/services/Utils.ts");












 // TODO move to general validation component class we can extend from

var NewsletterComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(NewsletterComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(NewsletterComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function NewsletterComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, NewsletterComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(NewsletterComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Debug"])('component:' + NewsletterComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "localesService", new _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_11__["LocalesService"]());

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "scope", {
      subscribe: _this.subscribe,
      selectAll: _this.selectAll,
      form: {
        fields: {
          email: '',
          name: ''
        },
        valid: true,
        error: undefined
      }
    });

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$el", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$form", void 0);

    _this.$el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(_this.el);

    _this.init(NewsletterComponent.observedAttributes);

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(NewsletterComponent, [{
    key: "subscribe",
    value: function subscribe(context, event, scope, form) {
      this.debug('subscribe'); // stop native submit

      event.preventDefault();
      event.stopPropagation();

      if (!this.$form) {
        this.debug('No form found');
        return false;
      }

      this.validate(this.$form, this.scope.form);

      if (this.scope.form.valid) {
        this.$form.submit();
      } else {
        this.debug('form not valid', this.scope);
      }
    }
  }, {
    key: "selectAll",
    value: function selectAll(context, event, scope, eventEl) {
      this.debug('selectAll', eventEl);
      _services_Utils__WEBPACK_IMPORTED_MODULE_12__["Utils"].selectAll(eventEl);
    }
  }, {
    key: "initValidation",
    value: function initValidation() {
      this.$form = this.$el.find('form');
      this.$form.attr('novalidate', '');
      this.$form.addClass('needs-validation');
      this.debug('initValidation', this.$form);
    }
  }, {
    key: "validate",
    value: function validate($form, validationScope) {
      $form.each(function (index, formEl) {
        var name = formEl.name;
        validationScope.valid = formEl.checkValidity();
        validationScope.error = formEl.validationMessage;
      });
      $form.addClass('was-validated');
      this.debug('validate', validationScope, $form[0]);
    }
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('afterBind', this.scope);
                this.initValidation();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _newsletter_component_html__WEBPACK_IMPORTED_MODULE_10___default.a;
      }
    }
  }]);

  return NewsletterComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(NewsletterComponent, "tagName", 'rv-newsletter');

/***/ }),

/***/ "./src/ts/components/privacy-settings/privacy-settings.component.html":
/*!****************************************************************************!*\
  !*** ./src/ts/components/privacy-settings/privacy-settings.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/privacy-settings/privacy-settings.component.ts":
/*!**************************************************************************!*\
  !*** ./src/ts/components/privacy-settings/privacy-settings.component.ts ***!
  \**************************************************************************/
/*! exports provided: PrivacySettingsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrivacySettingsComponent", function() { return PrivacySettingsComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/shopify */ "./node_modules/@ribajs/shopify/src/index.ts");
/* harmony import */ var _privacy_settings_component_html__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./privacy-settings.component.html */ "./src/ts/components/privacy-settings/privacy-settings.component.html");
/* harmony import */ var _privacy_settings_component_html__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_privacy_settings_component_html__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _services_tracking_services__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../services/tracking.services */ "./src/ts/services/tracking.services.ts");
/* harmony import */ var _services_Utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../services/Utils */ "./src/ts/services/Utils.ts");














// see also TrackingService
var PrivacySettingsComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(PrivacySettingsComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(PrivacySettingsComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function PrivacySettingsComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, PrivacySettingsComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(PrivacySettingsComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$el", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Debug"])('component:' + PrivacySettingsComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "scope", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "trackingService", void 0);

    _this.$el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(_this.el);
    _this.scope = {
      theTradeDesk: window.model.system.themeSettings.theTradeDesk,
      googleAnalytics: window.model.system.themeSettings.googleAnalytics,
      pinterestTag: window.model.system.themeSettings.pinterestTag,
      facebookPixel: {
        enabled: true
      },
      cookies: {
        enabled: true
      },
      shopifyAnalytics: {
        enabled: true
      },
      hostname: window.location.hostname,
      onCookiesStorageChanged: _this.onCookiesStorageChanged,
      onTheTradeDeskChanged: _this.onTheTradeDeskChanged,
      onGoogleAnalyticsChanged: _this.onGoogleAnalyticsChanged,
      onFacebookPixelChanged: _this.onFacebookPixelChanged,
      onPinterestTagChanged: _this.onPinterestTagChanged,
      onClearDataClicked: _this.onClearDataClicked,
      doNotTrack: navigator.doNotTrack === '1'
    };
    _this.trackingService = new _services_tracking_services__WEBPACK_IMPORTED_MODULE_12__["TrackingService"]({
      theTradeDesk: _this.scope.theTradeDesk,
      googleAnalytics: _this.scope.googleAnalytics,
      pinterestTag: _this.scope.pinterestTag
    });
    _this.scope.googleAnalytics.enabled = !_this.trackingService.googleAnalyticsDisabled;
    _this.scope.theTradeDesk.enabled = !_this.trackingService.theTradeDeskDisabled;
    _this.scope.facebookPixel.enabled = !_this.trackingService.facebookPixelDisabled;
    _this.scope.pinterestTag.enabled = !_this.trackingService.pinterestTagDisabled;

    _this.init(PrivacySettingsComponent.observedAttributes);

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(PrivacySettingsComponent, [{
    key: "onClearDataClicked",
    value: function onClearDataClicked(context, event) {
      var _this2 = this;

      this.debug('onClearDataClicked', this.scope.cookies.enabled);
      _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__["ShopifyCartService"].clear().then(function () {
        return _services_Utils__WEBPACK_IMPORTED_MODULE_13__["Utils"].get('/account/logout');
      }).then(function () {
        return _this2.trackingService.removeCookies([_this2.trackingService.theTradeDeskDisableStr, _this2.trackingService.googleAnalyticsDisableStr, _this2.trackingService.facebookPixelDisableStr
        /*, 'cookieconsent_accepted'*/
        ]);
      }).then(function () {
        location.reload();
      }).catch(function (error) {
        console.error(error);
      });
      event.preventDefault();
    }
  }, {
    key: "onCookiesStorageChanged",
    value: function onCookiesStorageChanged() {
      this.debug('onCookiesStorageChanged', this.scope.cookies.enabled);

      if (!this.scope.cookies.enabled) {
        this.trackingService.removeCookies();
      }

      this.trackingService.cookieStorageDisabled = !this.scope.cookies.enabled;
    }
  }, {
    key: "onGoogleAnalyticsChanged",
    value: function onGoogleAnalyticsChanged() {
      this.debug('onGoogleAnalyticsChanged', this.scope.googleAnalytics.enabled);
      this.trackingService.googleAnalyticsDisabled = !this.scope.googleAnalytics.enabled;
    }
  }, {
    key: "onTheTradeDeskChanged",
    value: function onTheTradeDeskChanged() {
      this.debug('onTheTradeDeskChanged', this.scope.theTradeDesk.enabled);
      this.trackingService.theTradeDeskDisabled = !this.scope.theTradeDesk.enabled;
    }
  }, {
    key: "onFacebookPixelChanged",
    value: function onFacebookPixelChanged() {
      this.debug('onFacebookPixelChanged', this.scope.facebookPixel.enabled);
      this.trackingService.facebookPixelDisabled = !this.scope.facebookPixel.enabled;
    }
  }, {
    key: "onPinterestTagChanged",
    value: function onPinterestTagChanged() {
      this.debug('onPinterestTagChanged', this.scope.pinterestTag.enabled);
      this.trackingService.pinterestTagDisabled = !this.scope.pinterestTag.enabled;
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind');

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('afterBind', this.scope);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _privacy_settings_component_html__WEBPACK_IMPORTED_MODULE_11___default.a;
      }
    }
  }]);

  return PrivacySettingsComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(PrivacySettingsComponent, "tagName", 'rv-privacy-settings');

/***/ }),

/***/ "./src/ts/components/product-scrollbar/product-scrollbar.component.ts":
/*!****************************************************************************!*\
  !*** ./src/ts/components/product-scrollbar/product-scrollbar.component.ts ***!
  \****************************************************************************/
/*! exports provided: ProductScrollbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductScrollbarComponent", function() { return ProductScrollbarComponent; });
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _ribajs_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ribajs/router */ "./node_modules/@ribajs/router/src/index.ts");









var ProductScrollbarComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ProductScrollbarComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(ProductScrollbarComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function ProductScrollbarComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ProductScrollbarComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(ProductScrollbarComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_7__["Debug"])('component:' + +ProductScrollbarComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "scope", {
      onScroll: _this.onScroll,
      onProductTap: _this.onProductTap,
      onProductMouseenter: _this.onProductMouseenter,
      title: ''
    });

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "pjax", new _ribajs_router__WEBPACK_IMPORTED_MODULE_8__["Pjax"]('main'));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "prefetch", new _ribajs_router__WEBPACK_IMPORTED_MODULE_8__["Prefetch"]());

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "$products", void 0);

    var $el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_7__["JQuery"])(_this.el);
    _this.$products = $el.find('.content-box');

    _this.init(ProductScrollbarComponent.observedAttributes);

    return _this;
  }
  /**
   * Just open the product url
   */


  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(ProductScrollbarComponent, [{
    key: "onProductTap",
    value: function onProductTap(context, event, scope, eventEl, binding) {
      var url = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_7__["JQuery"])(eventEl).data('url');
      this.pjax.goTo(url);
    }
    /**
     * Preload product on mouse over
     */

  }, {
    key: "onProductMouseenter",
    value: function onProductMouseenter(context, event, scope, eventEl, binding) {
      this.debug('onProductMouseenter');
      var url = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_7__["JQuery"])(eventEl).data('url');
      this.prefetch.onLinkEnter(event, url);
    }
    /**
     * get product in the middle of the scrollbar element
     */

  }, {
    key: "onScroll",
    value: function onScroll(context, event, scope, eventEl, binding) {
      var _this2 = this;

      var self = this;
      this.debug('onScroll', this.scope);

      if (this.$products) {
        this.$products.each(function (index) {
          if (self.$products) {
            var product = self.$products.get(index);
            var productData = product.dataset;
            var parentRect = eventEl.getBoundingClientRect();
            var elementRect = product.getBoundingClientRect();
            var elementMiddle = elementRect.width / 2;
            /** centerX is 0 if the product is in the middle */

            var centerX = elementRect.left - (parentRect.width / 2 - elementMiddle);
            var offset = elementMiddle;

            if (centerX > offset * -1 && centerX < offset) {
              _this2.scope.title = productData.title;
            }
          }
        });
      }
    }
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
    /**
     * Default custom Element method
     * Invoked when the custom element is first connected to the document's DOM.
     */

  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this.$products = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_7__["JQuery"])(this).find('.content-box');
    }
  }, {
    key: "template",
    value: function template() {
      return null;
    }
  }]);

  return ProductScrollbarComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_7__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(ProductScrollbarComponent, "tagName", 'rv-product-scrollbar');

/***/ }),

/***/ "./src/ts/components/revoke-form/revoke-form.component.html":
/*!******************************************************************!*\
  !*** ./src/ts/components/revoke-form/revoke-form.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/revoke-form/revoke-form.component.ts":
/*!****************************************************************!*\
  !*** ./src/ts/components/revoke-form/revoke-form.component.ts ***!
  \****************************************************************/
/*! exports provided: RevokeFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RevokeFormComponent", function() { return RevokeFormComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _services_Utils__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../services/Utils */ "./src/ts/services/Utils.ts");
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _revoke_form_component_html__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./revoke-form.component.html */ "./src/ts/components/revoke-form/revoke-form.component.html");
/* harmony import */ var _revoke_form_component_html__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_revoke_form_component_html__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ribajs/shopify-tda */ "./node_modules/@ribajs/shopify-tda/src/index.ts");












 // TODO move to general validation component class we can extend from

var RevokeFormComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(RevokeFormComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(RevokeFormComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function RevokeFormComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, RevokeFormComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(RevokeFormComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["Debug"])('component:' + RevokeFormComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "localesService", new _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_12__["LocalesService"]());

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$form", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "scope", {
      form: {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: ''
      },
      validation: _this.getValidationObject(),

      /** send form function */
      send: _this.send,

      /** select all text function */
      selectAll: _this.selectAll,

      /** form post request error message if form fails */
      error: '',

      /** form post request success message if form request was succes */
      success: ''
    });

    _this.init(RevokeFormComponent.observedAttributes);

    return _this;
  }
  /**
   * Send the contact form using a form submit request with best shopify form support
   */


  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(RevokeFormComponent, [{
    key: "send",
    value: function send(context, event) {
      this.debug('send', this.scope, event);
      this.scope.form.firstName = _services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stripHtml(this.scope.form.firstName);
      this.scope.form.lastName = _services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stripHtml(this.scope.form.lastName);
      this.scope.form.phone = _services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stripHtml(this.scope.form.phone);
      this.scope.form.email = _services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stripHtml(this.scope.form.email);

      if (this.$form) {
        this.scope.validation = this.validate(this.scope.validation, this.scope.form, ['firstName', 'lastName', 'phone', 'email', 'message'], this.$form);
      }

      if (!this.scope.validation.valid) {
        // stop automatic submit
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }, {
    key: "selectAll",
    value: function selectAll(context, event, scope, eventEl) {
      this.debug('selectAll');
      _services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].selectAll(eventEl);
    }
    /**
     * validate form
     * @param validation object with the validation rules
     * @param the form with the values form the form
     * @param keys keys you want to validate
     */

  }, {
    key: "validate",
    value: function validate(validation, formValues, keys, $form) {
      validation.valid = true;
      keys.forEach(function (key) {
        if (!validation.rules) {
          return;
        }

        validation.rules[key].error = ''; // value is requred

        if (validation.rules[key].required) {
          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isString(formValues[key])) {
            if (formValues[key].length <= 0) {
              validation.rules[key].error = 'This field is required';
            }
          }

          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isUndefined(formValues[key])) {
            validation.rules[key].error = 'This field is required';
          }
        } // validation for numbers


        if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isNumber(formValues[key])) {
          // maximum value for number
          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isNumber(validation.rules[key].max)) {
            if (formValues[key] > validation.rules[key].max) {
              validation.rules[key].error = 'The number must be a maximum of ' + validation.rules[key].max;
            }
          } // minimum value for number


          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isNumber(validation.rules[key].min)) {
            if (formValues[key] < validation.rules[key].min) {
              validation.rules[key].error = 'The number must be at least ' + validation.rules[key].min;
            }
          }
        } // validation for strings


        if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isString(formValues[key]) && formValues[key].length >= 1) {
          // maximum value for string length
          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isNumber(validation.rules[key].maxlength)) {
            if (formValues[key].length > validation.rules[key].maxlength) {
              validation.rules[key].error = 'The number of characters must not exceed ' + validation.rules[key].maxlength;
            }
          } // minimum value for string length


          if (_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].isNumber(validation.rules[key].minlength)) {
            if (formValues[key].length < validation.rules[key].minlength) {
              validation.rules[key].error = 'The number of characters must be at least ' + validation.rules[key].minlength;
            }
          } // email


          if (validation.rules[key].isEmail) {
            if (formValues[key].indexOf('@') <= -1) {
              validation.rules[key].error = 'This is not a valid email address';
            }

            if (formValues[key].indexOf('.') <= -1) {
              validation.rules[key].error = 'This is not a valid email address';
            }
          } // phone number


          if (validation.rules[key].isPhone) {
            if (!_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stringIsPhoneNumber(formValues[key])) {
              validation.rules[key].error = 'The phone number can only contain numbers, +, -, ) and (';
            }
          } // only numbers


          if (validation.rules[key].onlyNumbers) {
            if (!_services_Utils__WEBPACK_IMPORTED_MODULE_9__["Utils"].stringHasOnlyNumbers(formValues[key])) {
              validation.rules[key].error = 'The value may only contain numbers';
            }
          }
        } // is all valid?


        if (validation.rules[key].error.length) {
          validation.valid = false;
        }
      });
      /**
       * Run also the native browser validation
       * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/checkValidity
       */

      if (validation.valid) {
        validation.valid = $form[0].checkValidity();
      }

      $form.addClass('was-validated');
      this.debug('validate', validation);
      return validation;
    }
  }, {
    key: "getValidationObject",
    value: function getValidationObject() {
      var validation = {
        valid: true,
        rules: {
          firstName: {
            required: true,
            minlength: 3,
            error: ''
          },
          lastName: {
            required: true,
            minlength: 3,
            error: ''
          },
          email: {
            required: true,
            isEmail: true,
            minlength: 3,
            error: ''
          },
          phone: {
            required: false,
            isPhone: true,
            minlength: 4,
            error: ''
          },
          message: {
            required: true,
            minlength: 20,
            error: ''
          }
        }
      };
      return validation;
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('before');
                this.$form = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["JQuery"])(this.el).find('form'); // For custom style form validation, see https://getbootstrap.com/docs/4.1/components/forms/#custom-styles

                this.$form.addClass('needs-validation');
                this.$form.attr('novalidate', '');

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _revoke_form_component_html__WEBPACK_IMPORTED_MODULE_11___default.a;
      }
    }
  }]);

  return RevokeFormComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(RevokeFormComponent, "tagName", 'rv-revoke-form');

/***/ }),

/***/ "./src/ts/components/share/share.component.html":
/*!******************************************************!*\
  !*** ./src/ts/components/share/share.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<span class=share-label rv-show=isNative rv-i18n-text=labelI18n></span> <div class=web-share style=display:none> <div class=\"web-share-container web-share-grid\"> <div class=web-share-title>SHARE VIA</div> <a class=\"web-share-item web-share-whatsapp\" data-action=share/whatsapp/share target=_blank rv-href=shareUrls.whatsapp> <div class=web-share-icon-whatsapp></div> <div class=web-share-item-desc>Whatsapp</div> </a> <a class=\"web-share-item web-share-facebook\" rv-href=shareUrls.facebook> <div class=web-share-icon-facebook></div> <div class=web-share-item-desc>Facebook</div> </a> <a class=\"web-share-item web-share-telegram\" target=_blank rv-href=shareUrls.telegram> <div class=web-share-icon-telegram></div> <div class=web-share-item-desc>Telegram</div> </a> <a class=\"web-share-item web-share-email\" rv-href=shareUrls.email> <div class=web-share-icon-email></div> <div class=web-share-item-desc>Email</div> </a> <a class=\"web-share-item web-share-sms\" rv-href=shareUrls.sms> <div class=web-share-icon-sms></div> <div class=web-share-item-desc>SMS</div> </a> <a class=\"web-share-item web-share-copy\"> <div class=web-share-icon-copy></div> <div class=web-share-item-desc>Copy</div> </a> </div> <div class=\"web-share-container web-share-cancel\">Cancel</div> </div>";

/***/ }),

/***/ "./src/ts/components/share/share.component.ts":
/*!****************************************************!*\
  !*** ./src/ts/components/share/share.component.ts ***!
  \****************************************************/
/*! exports provided: ShareComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShareComponent", function() { return ShareComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/toConsumableArray.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _share_component_html__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./share.component.html */ "./src/ts/components/share/share.component.html");
/* harmony import */ var _share_component_html__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_share_component_html__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _bs4_dropdown_dropdown_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../bs4/dropdown/dropdown.service */ "./src/ts/components/bs4/dropdown/dropdown.service.ts");
/* harmony import */ var _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ribajs/shopify-tda */ "./node_modules/@ribajs/shopify-tda/src/index.ts");
















/**
 * Component to share the a link
 * Inspired by:
 *  * https://github.com/nimiq/web-share-shim
 *  * http://webintents.org/
 *  * http://chriswren.github.io/native-social-interactions/
 *  * https://www.sharethis.com/platform/share-buttons/
 *
 * TODO Fallback share if native share is not avabile
 */
var ShareComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_9___default()(ShareComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_8___default()(ShareComponent, [{
    key: "shareUrls",
    get: function get() {
      var fbid = null;
      this.scope.url = this.scope.url;
      this.scope.text = this.scope.text;
      this.scope.title = this.scope.title;
      var body = encodeURIComponent("".concat(this.scope.text, "\n\n").concat(this.scope.url));
      var url = encodeURIComponent(this.scope.url);
      var redirectUri = encodeURIComponent(this.scope.url);
      var urls = {
        whatsapp: this.scope.isDesktop ? "https://api.whatsapp.com/send?text=".concat(body) : "whatsapp://send?text=".concat(body),
        telegram: this.scope.isDesktop ? "https://telegram.me/share/url?url=".concat(url, "&text=").concat(body) : "tg://msg?text=".concat(body),
        facebook: this.scope.isDesktop ? "https://www.facebook.com/dialog/share?app_id=".concat(fbid, "&display=popup&href=").concat(url, "&redirect_uri=").concat(redirectUri, "&quote=").concat(body) : "fb-messenger://share/?message=".concat(body),
        email: "mailto:?subject=".concat(this.scope.title, "&body=").concat(body),
        sms: "sms:?body=".concat(body)
      };
      return urls;
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['title', 'text', 'text-i18n', 'url', 'label', 'label-i18n'];
    }
  }]);

  function ShareComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_4___default()(this, ShareComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(ShareComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this), "$el", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_11__["Debug"])('component:' + ShareComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this), "localesService", new _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_14__["LocalesService"]());

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this), "dropdownService", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this), "scope", {
      title: Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_11__["JQuery"])(document).find('title').text(),
      text: 'Look at this! 🤩',
      // 👀
      textI18n: undefined,
      url: window.location.href,
      label: 'Share',
      labelI18n: undefined,
      share: _this.share,
      isAndroid: navigator.userAgent.match(/Android/i) !== null,
      isIos: navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null,
      isDesktop: false,
      shareUrls: {},
      isNative: typeof navigator.share === 'function'
    });

    _this.$el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_11__["JQuery"])(_this.el);
    _this.dropdownService = new _bs4_dropdown_dropdown_service__WEBPACK_IMPORTED_MODULE_13__["DropdownService"](_this.$el.find('.dropdown-toggle')[0]);

    _this.debug('constructor', _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_7___default()(_this));

    _this.$el.on('click', function (event) {
      _this.share(null, event);
    });

    _this.init(ShareComponent.observedAttributes);

    _this.scope.isDesktop = !(_this.scope.isIos || _this.scope.isAndroid); // on those two support "mobile deep links", so HTTP based fallback for all others.

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_8___default()(ShareComponent, [{
    key: "share",
    value: function share(context, event) {
      var _this2 = this;

      this.debug('share', this.scope);
      event.preventDefault();
      event.stopPropagation(); // return this.dropdownService.toggle();

      if (this.scope.isNative) {
        return navigator.share({
          title: this.scope.title,
          text: "".concat(this.scope.text, "\r\n\r\n"),
          url: this.scope.url || window.location.href
        });
      } else {
        return new _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_3___default.a(function (resolve, reject) {
          resolve(); // TODO open menu

          _this2.toggle(null, event);
        });
      }
    }
  }, {
    key: "toggle",
    value: function toggle(_, event) {
      this.debug('toggle');
    }
  }, {
    key: "closeDropdowns",
    value: function closeDropdowns() {
      this.debug('closeDropdowns');
      _bs4_dropdown_dropdown_service__WEBPACK_IMPORTED_MODULE_13__["DropdownService"].closeAll();
    }
  }, {
    key: "initTranslate",
    value: function initTranslate() {
      var _this3 = this;

      this.localesService.event.on('changed', function (langcode) {
        _this3.translate(langcode);
      });

      if (this.localesService.ready) {
        var langcode = this.localesService.getLangcode();

        if (langcode) {
          this.translate(langcode);
        }
      } else {
        this.localesService.event.on('ready', function (langcode, translationNeeded) {
          _this3.translate(langcode);
        });
      }
    }
  }, {
    key: "translate",
    value: function translate(langcode) {
      var _this4 = this;

      if (!this.scope.textI18n) {
        return;
      }

      this.localesService.get([langcode].concat(_babel_runtime_corejs2_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2___default()(this.scope.textI18n.split('.')))).then(function (local) {
        _this4.debug('changed local', local);

        _this4.scope.text = local;
        return;
      }).catch(function (error) {
        console.error(error);
      });
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind');
                this.initTranslate(); // const $whatsapp = this.$el.find('.web-share-whatsapp');
                // const $facebook = this.$el.find('.web-share-facebook');
                // const $telegram = this.$el.find('.web-share-telegram');
                // const $email    = this.$el.find('.web-share-email');
                // const $sms      = this.$el.find('.web-share-sms');
                // const $copy     = this.$el.find('.web-share-copy');

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('afterBind', this.scope);
                this.scope.shareUrls = this.shareUrls;

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return ['title', 'text', 'url', 'label'];
    }
  }, {
    key: "template",
    value: function template() {
      return _share_component_html__WEBPACK_IMPORTED_MODULE_12___default.a;
    }
  }]);

  return ShareComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_11__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(ShareComponent, "tagName", 'rv-share');

/***/ }),

/***/ "./src/ts/components/shopify-addresses/shopify-addresses.component.html":
/*!******************************************************************************!*\
  !*** ./src/ts/components/shopify-addresses/shopify-addresses.component.html ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/shopify-addresses/shopify-addresses.component.ts":
/*!****************************************************************************!*\
  !*** ./src/ts/components/shopify-addresses/shopify-addresses.component.ts ***!
  \****************************************************************************/
/*! exports provided: ShopifyAddressesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopifyAddressesComponent", function() { return ShopifyAddressesComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _shopify_addresses_component_html__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shopify-addresses.component.html */ "./src/ts/components/shopify-addresses/shopify-addresses.component.html");
/* harmony import */ var _shopify_addresses_component_html__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_shopify_addresses_component_html__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _services_Utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../services/Utils */ "./src/ts/services/Utils.ts");











 // TODO move to general validation component class we can extend from

var ShopifyAddressesComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(ShopifyAddressesComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyAddressesComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function ShopifyAddressesComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ShopifyAddressesComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ShopifyAddressesComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$el", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$editAddressForm", null);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$createAddressForm", null);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Debug"])('component:' + ShopifyAddressesComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "scope", {
      createAddress: {
        validation: {
          valid: false
        }
      },
      showFormId: '',
      editAddress: {},
      edit: _this.edit,
      create: _this.create,
      delete: _this.delete
    });

    _this.$el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(_this.el);

    _this.debug('constructor', _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));

    _this.init(ShopifyAddressesComponent.observedAttributes);

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyAddressesComponent, [{
    key: "edit",
    value: function edit(id, context, event, scope, form) {
      this.debug('login', this.scope);
      var $form = this.$el.find("form[action=\"/account/addresses/".concat(id, "]"));

      if (!$form) {
        this.debug('No edit address form found');
        return false;
      } // stop native submit


      event.preventDefault();
      event.stopPropagation();
      this.validate($form, this.scope.editAddress[id].validation);

      if (this.scope.editAddress[id].validation.valid) {
        $form.submit();
      } else {
        this.debug('form not valid', this.scope);
      }
    }
    /**
     * Submit an new address
     */

  }, {
    key: "create",
    value: function create(context, event) {
      this.debug('create', this.scope);

      if (!this.$createAddressForm) {
        this.debug('No create form found');
        return false;
      } // stop native submit


      event.preventDefault();
      event.stopPropagation();
      this.validate(this.$createAddressForm, this.scope.createAddress.validation);

      if (this.scope.createAddress.validation.valid) {
        this.$createAddressForm.submit();
      } else {
        this.debug('form not valid', this.$createAddressForm);
      }
    } // https://help.shopify.com/en/api/reference/customers/customer_address
    // /account/addresses/{id}

  }, {
    key: "delete",
    value: function _delete(id, context, event, scope, form) {
      var _this2 = this;

      _services_Utils__WEBPACK_IMPORTED_MODULE_11__["Utils"].delete("/account/addresses/".concat(id), {}, 'json').then(function (response) {
        _this2.debug('delete response', response);

        location.reload();
      }).catch(function (error) {
        _this2.debug('delete error', error);

        location.reload();
      });
    }
  }, {
    key: "initValidation",
    value: function initValidation() {
      this.$editAddressForm = this.$el.find('form[action^="/account/addresses/"]');
      this.$editAddressForm.attr('novalidate', '');
      this.$editAddressForm.addClass('needs-validation');
      this.$createAddressForm = this.$el.find('form[action="/account/addresses"]');
      this.$createAddressForm.attr('novalidate', '');
      this.$createAddressForm.addClass('needs-validation');
      this.debug('initValidation', this.$createAddressForm, this.$createAddressForm);
    }
  }, {
    key: "validate",
    value: function validate($form, validationScope) {
      $form.each(function (index, formEl) {
        validationScope.valid = formEl.checkValidity();
      });
      $form.addClass('was-validated');
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind');

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('afterBind', this.scope);
                this.initValidation();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _shopify_addresses_component_html__WEBPACK_IMPORTED_MODULE_10___default.a;
      }
    }
  }]);

  return ShopifyAddressesComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(ShopifyAddressesComponent, "tagName", 'rv-shopify-addresses');

/***/ }),

/***/ "./src/ts/components/shopify-article-item/shopify-article-item.component.html":
/*!************************************************************************************!*\
  !*** ./src/ts/components/shopify-article-item/shopify-article-item.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/shopify-article-item/shopify-article-item.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/ts/components/shopify-article-item/shopify-article-item.component.ts ***!
  \**********************************************************************************/
/*! exports provided: ShopifyArticleItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopifyArticleItemComponent", function() { return ShopifyArticleItemComponent; });
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _shopify_article_item_component_html__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shopify-article-item.component.html */ "./src/ts/components/shopify-article-item/shopify-article-item.component.html");
/* harmony import */ var _shopify_article_item_component_html__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_shopify_article_item_component_html__WEBPACK_IMPORTED_MODULE_8__);









var ShopifyArticleItemComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ShopifyArticleItemComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(ShopifyArticleItemComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function ShopifyArticleItemComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, ShopifyArticleItemComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(ShopifyArticleItemComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_7__["Debug"])('component:' + ShopifyArticleItemComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this), "scope", {});

    var $el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_7__["JQuery"])(_this.el);

    _this.debug('constructor', _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3___default()(_this));

    _this.init(ShopifyArticleItemComponent.observedAttributes);

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_4___default()(ShopifyArticleItemComponent, [{
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _shopify_article_item_component_html__WEBPACK_IMPORTED_MODULE_8___default.a;
      }
    }
  }]);

  return ShopifyArticleItemComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_7__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyArticleItemComponent, "tagName", 'rv-shopify-article-item');

/***/ }),

/***/ "./src/ts/components/shopify-cart-button/shopify-cart-button.component.html":
/*!**********************************************************************************!*\
  !*** ./src/ts/components/shopify-cart-button/shopify-cart-button.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/shopify-cart-button/shopify-cart-button.component.ts":
/*!********************************************************************************!*\
  !*** ./src/ts/components/shopify-cart-button/shopify-cart-button.component.ts ***!
  \********************************************************************************/
/*! exports provided: ShopifyCartButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopifyCartButtonComponent", function() { return ShopifyCartButtonComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _ribajs_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/router */ "./node_modules/@ribajs/router/src/index.ts");
/* harmony import */ var _ribajs_shopify__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ribajs/shopify */ "./node_modules/@ribajs/shopify/src/index.ts");
/* harmony import */ var _services_Utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../services/Utils */ "./src/ts/services/Utils.ts");
/* harmony import */ var _shopify_cart_button_component_html__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./shopify-cart-button.component.html */ "./src/ts/components/shopify-cart-button/shopify-cart-button.component.html");
/* harmony import */ var _shopify_cart_button_component_html__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_shopify_cart_button_component_html__WEBPACK_IMPORTED_MODULE_13__);














var ShopifyCartButtonComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(ShopifyCartButtonComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyCartButtonComponent, [{
    key: "cart",
    set: function set(cart) {
      var _this2 = this;

      this.scope.cartItemCount = cart.item_count;
      this.scope.startAddAnimation = true;
      setTimeout(function () {
        _this2.scope.startAddAnimation = false;
      }, 3000);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function ShopifyCartButtonComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ShopifyCartButtonComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ShopifyCartButtonComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$el", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Debug"])('component:' + ShopifyCartButtonComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "scope", {
      cartItemCount: 0,
      toggle: _this.toggle,
      pending: false,
      startAddAnimation: false
    });

    _this.$el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(_this.el);

    _this.debug('constructor', _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));

    _this.init(ShopifyCartButtonComponent.observedAttributes);

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyCartButtonComponent, [{
    key: "toggle",
    value: function toggle(context, event) {
      this.debug('toggle');
      event.preventDefault();
      event.stopPropagation();

      if (_services_Utils__WEBPACK_IMPORTED_MODULE_12__["Utils"].onRoute(ShopifyCartButtonComponent.cartUrl)) {
        this.debug('already on this site');
        window.history.back();
      } else {
        if (ShopifyCartButtonComponent.cartUrl) {
          var pjax = _ribajs_router__WEBPACK_IMPORTED_MODULE_10__["Pjax"].getInstance('main');
          pjax.goTo(ShopifyCartButtonComponent.cartUrl, false);
        }
      }
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this3 = this;

        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind');
                _ribajs_shopify__WEBPACK_IMPORTED_MODULE_11__["ShopifyCartService"].shopifyCartEventDispatcher.on('ShopifyCart:request:start', function () {
                  _this3.debug('ShopifyCartButton:request:start');

                  _this3.scope.pending = true;
                });
                _ribajs_shopify__WEBPACK_IMPORTED_MODULE_11__["ShopifyCartService"].shopifyCartEventDispatcher.on('ShopifyCart:request:complete', function (cart) {
                  _this3.debug('ShopifyCartButton:request:complete', cart);

                  if (cart) {
                    _this3.cart = cart;
                  }

                  _this3.scope.pending = false;
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var _this4 = this;

        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('afterBind', this.scope);
                return _context2.abrupt("return", _ribajs_shopify__WEBPACK_IMPORTED_MODULE_11__["ShopifyCartService"].get().catch(function (error) {
                  _this4.debug(error);
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _shopify_cart_button_component_html__WEBPACK_IMPORTED_MODULE_13___default.a;
      }
    }
  }]);

  return ShopifyCartButtonComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(ShopifyCartButtonComponent, "tagName", 'rv-shopify-cart-button');

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(ShopifyCartButtonComponent, "cartUrl", '/cart');

/***/ }),

/***/ "./src/ts/components/shopify-cart/shopify-cart.component.html":
/*!********************************************************************!*\
  !*** ./src/ts/components/shopify-cart/shopify-cart.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/shopify-cart/shopify-cart.component.ts":
/*!******************************************************************!*\
  !*** ./src/ts/components/shopify-cart/shopify-cart.component.ts ***!
  \******************************************************************/
/*! exports provided: ShopifyCartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopifyCartComponent", function() { return ShopifyCartComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/shopify */ "./node_modules/@ribajs/shopify/src/index.ts");
/* harmony import */ var _shopify_cart_component_html__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shopify-cart.component.html */ "./src/ts/components/shopify-cart/shopify-cart.component.html");
/* harmony import */ var _shopify_cart_component_html__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_shopify_cart_component_html__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _bs4_dropdown_dropdown_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../bs4/dropdown/dropdown.service */ "./src/ts/components/bs4/dropdown/dropdown.service.ts");













var ShopifyCartComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(ShopifyCartComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyCartComponent, [{
    key: "cart",
    set: function set(cart) {
      var _this2 = this;

      // TODO check if cart values are changed
      this.scope.cart = cart;
      this.scope.startAddAnimation = true;
      setTimeout(function () {
        _this2.scope.startAddAnimation = false;
      }, 3000);

      if (this.scope.shippingAddress && this.scope.estimateShippingRate) {
        _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__["ShopifyCartService"].getShippingRates(this.scope.shippingAddress, true, {
          triggerOnChange: false,
          triggerOnComplete: false,
          triggerOnStart: false
        }).then(function (shippingRates) {
          _this2.debug('Get shipping rate', shippingRates);

          _this2.scope.shippingRates = shippingRates;
        });
      }
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['shipping-address', 'estimate-shipping-rate'];
    }
  }]);

  function ShopifyCartComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ShopifyCartComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ShopifyCartComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$el", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Debug"])('component:' + ShopifyCartComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "dropdownService", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "scope", {
      cart: _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__["ShopifyCartService"].cart,
      shippingAddress: null,
      estimateShippingRate: false,
      shippingRates: [],
      toggle: _this.toggle,
      remove: _this.removeCart,
      increase: _this.increase,
      decrease: _this.decrease,
      closeDropdowns: _this.closeDropdowns,
      pending: false,
      startAddAnimation: false
    });

    _this.$el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(_this.el);
    _this.dropdownService = new _bs4_dropdown_dropdown_service__WEBPACK_IMPORTED_MODULE_12__["DropdownService"](_this.$el.find('.dropdown-toggle')[0]);

    _this.debug('constructor', _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));

    _this.init(ShopifyCartComponent.observedAttributes);

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyCartComponent, [{
    key: "toggle",
    value: function toggle(context, event) {
      this.debug('toggle');
      event.preventDefault();
      event.stopPropagation();
      return this.dropdownService.toggle();
    }
  }, {
    key: "removeCart",
    value: function removeCart(lineItem, lineIndex) {
      var _this3 = this;

      this.debug('remove', lineItem, lineIndex);
      _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__["ShopifyCartService"].change(lineItem.variant_id, 0).then(function (cart) {
        _this3.debug('removed', cart);

        _this3.cart = cart;
      });
    }
  }, {
    key: "increase",
    value: function increase(lineItem, lineIndex) {
      var _this4 = this;

      this.debug('increase', lineItem, lineIndex);
      lineItem.quantity++;
      _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__["ShopifyCartService"].change(lineItem.variant_id, lineItem.quantity).then(function (cart) {
        _this4.debug('increased', cart); // this.cart = cart;

      });
    }
  }, {
    key: "decrease",
    value: function decrease(lineItem, lineIndex) {
      var _this5 = this;

      this.debug('decrease', lineItem, lineIndex);
      lineItem.quantity--;

      if (lineItem.quantity < 0) {
        lineItem.quantity = 0;
      }

      _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__["ShopifyCartService"].change(lineItem.variant_id, lineItem.quantity).then(function (cart) {
        _this5.debug('decreased', cart);
      });
    }
  }, {
    key: "closeDropdowns",
    value: function closeDropdowns() {
      this.debug('closeDropdowns');
      _bs4_dropdown_dropdown_service__WEBPACK_IMPORTED_MODULE_12__["DropdownService"].closeAll();
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this6 = this;

        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind');
                _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__["ShopifyCartService"].shopifyCartEventDispatcher.on('ShopifyCart:request:start', function () {
                  _this6.debug('ShopifyCart:request:start');

                  _this6.scope.pending = true;
                });
                _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__["ShopifyCartService"].shopifyCartEventDispatcher.on('ShopifyCart:request:complete', function (cart) {
                  _this6.debug('ShopifyCart:request:complete', cart);

                  if (cart) {
                    _this6.cart = cart;
                  }

                  _this6.scope.pending = false;
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('afterBind', this.scope);
                return _context2.abrupt("return", _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__["ShopifyCartService"].get().catch(function (error) {
                  console.error(error);
                }));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _shopify_cart_component_html__WEBPACK_IMPORTED_MODULE_11___default.a;
      }
    }
  }]);

  return ShopifyCartComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(ShopifyCartComponent, "tagName", 'rv-shopify-cart');

/***/ }),

/***/ "./src/ts/components/shopify-comments-form/shopify-comments-form.component.html":
/*!**************************************************************************************!*\
  !*** ./src/ts/components/shopify-comments-form/shopify-comments-form.component.html ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/shopify-comments-form/shopify-comments-form.component.ts":
/*!************************************************************************************!*\
  !*** ./src/ts/components/shopify-comments-form/shopify-comments-form.component.ts ***!
  \************************************************************************************/
/*! exports provided: ShopifyCommentsFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopifyCommentsFormComponent", function() { return ShopifyCommentsFormComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _shopify_comments_form_component_html__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shopify-comments-form.component.html */ "./src/ts/components/shopify-comments-form/shopify-comments-form.component.html");
/* harmony import */ var _shopify_comments_form_component_html__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_shopify_comments_form_component_html__WEBPACK_IMPORTED_MODULE_10__);











var ShopifyCommentsFormComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(ShopifyCommentsFormComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyCommentsFormComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function ShopifyCommentsFormComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ShopifyCommentsFormComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ShopifyCommentsFormComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$el", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$newCommentForm", null);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Debug"])('component:' + ShopifyCommentsFormComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "scope", {
      form: {
        customer: {
          email: '',
          password: ''
        }
      },
      loginCustomer: {
        validation: {
          valid: false
        }
      },
      createCustomer: {
        validation: {
          valid: false
        }
      },
      recoverCustomer: {
        validation: {
          valid: false
        }
      },
      post: _this.post
    });

    _this.$el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(_this.el);

    _this.debug('constructor', _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));

    _this.init(ShopifyCommentsFormComponent.observedAttributes);

    return _this;
  }
  /**
   * Post comment
   */


  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyCommentsFormComponent, [{
    key: "post",
    value: function post(context, event) {
      this.debug('post', this.scope.form);

      if (!this.$newCommentForm) {
        console.error('No comment form found');
        return false;
      } // stop native submit


      event.preventDefault();
      event.stopPropagation();
      this.validate(this.$newCommentForm, this.scope.loginCustomer.validation);

      if (this.scope.loginCustomer.validation.valid) {
        this.$newCommentForm.submit();
      } else {
        this.debug('form not valid', this.scope.form);
      }
    }
  }, {
    key: "initValidation",
    value: function initValidation() {
      this.$newCommentForm = this.$el.find('#comment_form');
      this.$newCommentForm.attr('novalidate', '');
      this.$newCommentForm.addClass('needs-validation');
      this.debug('initValidation', this.$newCommentForm);
    }
  }, {
    key: "validate",
    value: function validate($form, validationScope) {
      $form.each(function (index, formEl) {
        validationScope.valid = formEl.checkValidity();
      });
      $form.addClass('was-validated');
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind');

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('afterBind', this.scope);
                this.initValidation();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _shopify_comments_form_component_html__WEBPACK_IMPORTED_MODULE_10___default.a;
      }
    }
  }]);

  return ShopifyCommentsFormComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(ShopifyCommentsFormComponent, "tagName", 'rv-shopify-comments-form');

/***/ }),

/***/ "./src/ts/components/shopify-filter/shopify-filter.component.html":
/*!************************************************************************!*\
  !*** ./src/ts/components/shopify-filter/shopify-filter.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/shopify-filter/shopify-filter.component.ts":
/*!**********************************************************************!*\
  !*** ./src/ts/components/shopify-filter/shopify-filter.component.ts ***!
  \**********************************************************************/
/*! exports provided: ShopifyFilterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopifyFilterComponent", function() { return ShopifyFilterComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _shopify_filter_component_html__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shopify-filter.component.html */ "./src/ts/components/shopify-filter/shopify-filter.component.html");
/* harmony import */ var _shopify_filter_component_html__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_shopify_filter_component_html__WEBPACK_IMPORTED_MODULE_10__);












/**
 * shopify-filter
 */
var ShopifyFilterComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(ShopifyFilterComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyFilterComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['collection-url', 'namespace', 'linklist', 'template', 'filter'];
    }
  }]);

  function ShopifyFilterComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ShopifyFilterComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ShopifyFilterComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Debug"])('component:' + ShopifyFilterComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "scope", {
      linklist: window.model.system.linklists.filter,
      show: _this.show,
      type: _this.type,
      collectionUrl: undefined,
      storiesFilterBy: _this.storiesFilterBy,
      scrollTo: _this.scrollTo
    });

    _this.debug('constructor', _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));

    _this.init(ShopifyFilterComponent.observedAttributes);

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyFilterComponent, [{
    key: "show",
    value: function show(filterHandle, namespace, shopifyTemplate, collectionUrl) {
      this.debug('show', filterHandle, namespace, shopifyTemplate);

      switch (filterHandle) {
        case 'stories':
          // return namespace === 'blog' || shopifyTemplate.template === 'article'; // TODO if the user is on a artice and wants to go back to the list view we need do do some additional work
          return namespace === 'blog';

        case 'account':
          return namespace === 'cart' || shopifyTemplate.directory === 'customers' || shopifyTemplate.template === 'page.returns-form' || shopifyTemplate.template === 'page.privacy-settings';

        case 'legal-area':
          return shopifyTemplate.template === 'page.legals';

        case 'store':
          return shopifyTemplate.template === 'collection' || shopifyTemplate.template === 'product';

        default:
          break;
      }

      return true;
    }
  }, {
    key: "type",
    value: function type(filterHandle) {
      this.debug('type', filterHandle);

      switch (filterHandle) {
        case 'stories':
          return 'stories-filter';

        case 'legal-area':
          return 'scrollspy';

        default:
          return 'routes';
      }
    }
  }, {
    key: "scrollTo",
    value: function scrollTo(selector) {
      this.debug('scrollTo', selector);
      var offset = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(selector).offset();

      if (!offset) {
        console.warn("Element with selector ".concat(selector, " not found"));
        return;
      }

      Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])('html, body').animate({
        scrollTop: offset.top,
        scrollLeft: offset.left
      });
    }
  }, {
    key: "storiesFilterBy",
    value: function storiesFilterBy(handle, tagName, _, event, scope, el) {
      var _this2 = this;

      tagName = tagName.replace('#', '');
      var self = this; // WORKAROUND because I can't check the middle radio button (wt..?!)

      if (el && el.parentNode) {
        var radioElement = el.parentNode.childNodes[1];
        radioElement.checked = true;
        this.debug('checked', radioElement);
      }

      this.scope.filter[handle] = tagName; // TODO this as binder?

      Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])('.jumplink-article-list-item').each(function (i, curEl) {
        var $listItem = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(curEl);

        if (tagName === 'all') {
          $listItem.removeAttr('hidden');
          return;
        }

        var data = $listItem.data();

        if (_this2.indexOfIgnoreCase(data.tags, tagName) <= -1) {
          self.debug('hide', $listItem); // $listItem.hide();

          $listItem.attr('hidden', 'hidden');
        } else {
          self.debug('show', $listItem); // $listItem.show();

          $listItem.removeAttr('hidden');
        }

        self.debug('jumplink-article-list-item', data, $listItem);
      }); // to data binding for filter

      this.publish('filter', this.scope.filter, null);
      this.debug('filterBy', handle, tagName);
    }
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return ['namespace', 'template', 'filter'];
    }
  }, {
    key: "parsedAttributeChangedCallback",
    value: function parsedAttributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      this.debug('parsedAttributeChangedCallback', attributeName, oldValue, newValue, namespace);

      if (attributeName === 'filter') {
        if (newValue) {
          for (var handle in newValue) {
            if (newValue.hasOwnProperty(handle)) {
              var tagName = newValue[handle];
              this.storiesFilterBy(handle, tagName, undefined, undefined, document.querySelectorAll("label[for=\"".concat(tagName, "\"]"))[0]);
            }
          }
        }
      }
    }
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var handle, tagName;
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('afterBind', this.scope);

                if (this.scope.filter) {
                  for (handle in this.scope.filter) {
                    if (this.scope.filter.hasOwnProperty(handle)) {
                      tagName = this.scope.filter[handle];
                      this.storiesFilterBy(handle, tagName, undefined, undefined, document.querySelectorAll("label[for=\"".concat(tagName, "\"]"))[0]);
                    }
                  }
                }

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _shopify_filter_component_html__WEBPACK_IMPORTED_MODULE_10___default.a;
      }
    }
  }, {
    key: "indexOfIgnoreCase",
    value: function indexOfIgnoreCase(arr, value) {
      value = value.toLowerCase();
      var index = -1;

      for (var i = 0; i < arr.length; i++) {
        var str = arr[i];

        if (str.toLowerCase() === value) {
          index = i;
        }
      }

      return index;
    }
  }]);

  return ShopifyFilterComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(ShopifyFilterComponent, "tagName", 'shopify-filter');

/***/ }),

/***/ "./src/ts/components/shopify-linklist/shopify-linklist.component.html":
/*!****************************************************************************!*\
  !*** ./src/ts/components/shopify-linklist/shopify-linklist.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=nav rv-add-class=linklist.handle rv-class-nav-pills=pills rv-class-flex-column=vertical rv-class-flex-row=\"vertical | not\"> <div class=\"nav-item nav-item-level-1\" rv-each-link=linklist.links rv-route-class-active=link.url> <a rv-if=\"link.collapseable | not\" class=nav-link rv-parent-route-class-active=link.url rv-route=link.url rv-href=link.url> <span rv-i18n-text=\"link.title | handleize | prepend 'menus.'\">{link.title}</span> </a> <button rv-if=link.collapseable class=\"btn nav-link\" rv-on-click=\"toggle | args link\"> <span rv-i18n-text=\"link.title | handleize | prepend 'menus.'\">{link.title}</span> </button> <div class=\"nav-item nav-item-level-2\" rv-hide=link.collapsed rv-each-sublink=link.links rv-route-class-active=sublink.url> <a class=nav-link rv-route-class-active=sublink.url rv-route=sublink.url rv-href=sublink.url> <span rv-i18n-text=\"sublink.title | handleize | prepend 'menus.'\">{sublink.title}</span> </a> <div class=\"nav-item nav-item-level-3\" rv-each-subsublink=sublink.links rv-route-class-active=subsublink.url> <a class=nav-link rv-route-class-active=subsublink.url rv-route=subsublink.url rv-href=subsublink.url> <span rv-i18n-text=\"subsublink.title | handleize | prepend 'menus.'\">{subsublink.title}</span> </a> </div> </div> </div> </nav> ";

/***/ }),

/***/ "./src/ts/components/shopify-linklist/shopify-linklist.component.ts":
/*!**************************************************************************!*\
  !*** ./src/ts/components/shopify-linklist/shopify-linklist.component.ts ***!
  \**************************************************************************/
/*! exports provided: ShopifyLinklistComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopifyLinklistComponent", function() { return ShopifyLinklistComponent; });
/* harmony import */ var _babel_runtime_corejs2_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/get-iterator */ "./node_modules/@babel/runtime-corejs2/core-js/get-iterator.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/get */ "./node_modules/@babel/runtime-corejs2/helpers/get.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _shopify_linklist_component_html__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./shopify-linklist.component.html */ "./src/ts/components/shopify-linklist/shopify-linklist.component.html");
/* harmony import */ var _shopify_linklist_component_html__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_shopify_linklist_component_html__WEBPACK_IMPORTED_MODULE_12__);














/**
 * shopify-filter
 */
var ShopifyLinklistComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_9___default()(ShopifyLinklistComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_8___default()(ShopifyLinklistComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return ['name', 'linklist', 'pills', 'vertical'];
    }
  }]);

  function ShopifyLinklistComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3___default()(this, ShopifyLinklistComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyLinklistComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_11__["Debug"])('component:' + ShopifyLinklistComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "scope", {
      toggle: _this.toggle
    });

    _this.init(ShopifyLinklistComponent.observedAttributes);

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_8___default()(ShopifyLinklistComponent, [{
    key: "toggle",
    value: function toggle(link) {
      this.debug('toggle', link);
      link.collapsed = !link.collapsed;
    }
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue, namespace) {
      // injects the changed attributes to scope
      _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyLinklistComponent.prototype), "attributeChangedCallback", this).call(this, name, oldValue, newValue, namespace); // set linklist by name


      if (name === 'name') {
        this.scope.linklist = window.model.system.linklists[newValue];
      }
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyLinklistComponent.prototype), "beforeBind", this).call(this);

                this.transformLinklist();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "transformLinklist",
    value: function transformLinklist() {
      this.debug('current linklist', this.scope.linklist);

      if (this.scope.linklist) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _babel_runtime_corejs2_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default()(this.scope.linklist.links), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var link = _step.value;

            if (link.url === '#collapse') {
              link.collapseable = true;
              link.collapsed = true;
            } else {
              link.collapseable = false;
              link.collapsed = true;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return ['linklist'];
    }
    /**
     * Only set the component template if there no childs already
     */

  }, {
    key: "template",
    value: function template() {
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _shopify_linklist_component_html__WEBPACK_IMPORTED_MODULE_12___default.a;
      }
    }
  }]);

  return ShopifyLinklistComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_11__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_10___default()(ShopifyLinklistComponent, "tagName", 'shopify-linklist');

/***/ }),

/***/ "./src/ts/components/shopify-login-form/shopify-login-form.component.html":
/*!********************************************************************************!*\
  !*** ./src/ts/components/shopify-login-form/shopify-login-form.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/shopify-login-form/shopify-login-form.component.ts":
/*!******************************************************************************!*\
  !*** ./src/ts/components/shopify-login-form/shopify-login-form.component.ts ***!
  \******************************************************************************/
/*! exports provided: ShopifyLoginFormComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopifyLoginFormComponent", function() { return ShopifyLoginFormComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _shopify_login_form_component_html__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shopify-login-form.component.html */ "./src/ts/components/shopify-login-form/shopify-login-form.component.html");
/* harmony import */ var _shopify_login_form_component_html__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_shopify_login_form_component_html__WEBPACK_IMPORTED_MODULE_10__);











var ShopifyLoginFormComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(ShopifyLoginFormComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyLoginFormComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    }
  }]);

  function ShopifyLoginFormComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ShopifyLoginFormComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ShopifyLoginFormComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$el", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$loginCustomerForm", null);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$createCustomerForm", null);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$recoverCustomerForm", null);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Debug"])('component:' + ShopifyLoginFormComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "scope", {
      form: {
        customer: {
          email: '',
          password: ''
        }
      },
      loginCustomer: {
        validation: {
          valid: false
        }
      },
      createCustomer: {
        validation: {
          valid: false
        }
      },
      recoverCustomer: {
        validation: {
          valid: false
        }
      },
      login: _this.login,
      create: _this.create,
      recover: _this.recover,
      recoverBack: _this.recoverBack
    });

    _this.$el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(_this.el);

    _this.debug('constructor', _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));

    _this.init(ShopifyLoginFormComponent.observedAttributes);

    return _this;
  }
  /**
   * Login submit using the login form
   */


  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyLoginFormComponent, [{
    key: "login",
    value: function login(_, event) {
      this.debug('login', this.scope.form);

      if (!this.$loginCustomerForm) {
        console.error('No login form found');
        return false;
      } // stop native submit


      event.preventDefault();
      event.stopPropagation();
      this.validate(this.$loginCustomerForm, this.scope.loginCustomer.validation);

      if (this.scope.loginCustomer.validation.valid) {
        this.$loginCustomerForm.submit();
      } else {
        this.debug('form not valid', this.scope.form);
      }
    }
    /**
     * Create an account submit using the login form
     */

  }, {
    key: "create",
    value: function create(_, event) {
      this.debug('create', this.scope.form);

      if (!this.$createCustomerForm) {
        console.error('No create form found');
        return false;
      } // stop native submit


      event.preventDefault();
      event.stopPropagation();
      this.validate(this.$createCustomerForm, this.scope.createCustomer.validation);

      if (this.scope.createCustomer.validation.valid) {
        this.$createCustomerForm.submit();
      } else {
        this.debug('form not valid', this.scope.form);
      }
    }
    /**
     * Reset password submit using the (hidden) reset form
     * @param event
     */

  }, {
    key: "recover",
    value: function recover(_, event) {
      this.debug('recover', this.scope.form, this.$recoverCustomerForm);

      if (!this.$recoverCustomerForm) {
        console.error('No recover form found');
        return false;
      }

      if (!this.$loginCustomerForm) {
        console.error('No login form found');
        return false;
      } // stop native submit


      event.preventDefault();
      event.stopPropagation();
      this.validate(this.$recoverCustomerForm, this.scope.recoverCustomer.validation);

      if (this.scope.recoverCustomer.validation.valid) {
        this.$recoverCustomerForm.submit();
      } else {
        this.debug('form not valid', this.scope.form);
        this.$loginCustomerForm.parent().attr('hidden', '').hide();
        this.$recoverCustomerForm.parent().removeAttr('hidden').show();
      }
    }
  }, {
    key: "recoverBack",
    value: function recoverBack(_, event) {
      if (!this.$recoverCustomerForm) {
        console.error('No recover form found');
        return false;
      }

      if (!this.$loginCustomerForm) {
        console.error('No login form found');
        return false;
      } // stop native submit


      event.preventDefault();
      event.stopPropagation();
      this.$loginCustomerForm.parent().removeAttr('hidden').show();
      this.$recoverCustomerForm.parent().attr('hidden', '').hide();
    }
  }, {
    key: "initValidation",
    value: function initValidation() {
      this.$createCustomerForm = this.$el.find('form[action="/account"]');
      this.$createCustomerForm.attr('novalidate', '');
      this.$createCustomerForm.addClass('needs-validation');
      this.$loginCustomerForm = this.$el.find('form[action="/account/login"]');
      this.$loginCustomerForm.attr('novalidate', '');
      this.$loginCustomerForm.addClass('needs-validation');
      this.$recoverCustomerForm = this.$el.find('form[action="/account/recover"]');
      this.$recoverCustomerForm.attr('novalidate', '');
      this.$recoverCustomerForm.addClass('needs-validation');
      this.debug('initValidation', this.$createCustomerForm, this.$loginCustomerForm, this.$recoverCustomerForm);
    }
  }, {
    key: "validate",
    value: function validate($form, validationScope) {
      $form.each(function (index, formEl) {
        validationScope.valid = formEl.checkValidity();
      });
      $form.addClass('was-validated');
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind');

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('afterBind', this.scope);
                this.initValidation();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _shopify_login_form_component_html__WEBPACK_IMPORTED_MODULE_10___default.a;
      }
    }
  }]);

  return ShopifyLoginFormComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(ShopifyLoginFormComponent, "tagName", 'rv-shopify-login-form');

/***/ }),

/***/ "./src/ts/components/shopify-product-item/shopify-product-item.component.html":
/*!************************************************************************************!*\
  !*** ./src/ts/components/shopify-product-item/shopify-product-item.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/shopify-product-item/shopify-product-item.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/ts/components/shopify-product-item/shopify-product-item.component.ts ***!
  \**********************************************************************************/
/*! exports provided: ShopifyProductItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopifyProductItemComponent", function() { return ShopifyProductItemComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/get */ "./node_modules/@babel/runtime-corejs2/helpers/get.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _ribajs_shopify__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ribajs/shopify */ "./node_modules/@ribajs/shopify/src/index.ts");
/* harmony import */ var _shopify_product_item_component_html__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./shopify-product-item.component.html */ "./src/ts/components/shopify-product-item/shopify-product-item.component.html");
/* harmony import */ var _shopify_product_item_component_html__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_shopify_product_item_component_html__WEBPACK_IMPORTED_MODULE_12__);














/**
 * TODO minify this, create a general product service instead of extend from ShopifyProductItemComponent
 * or create a product list for all products
 * or just get the attributes we need like the options
 * or render the most with liquid
 */
var ShopifyProductItemComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(ShopifyProductItemComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(ShopifyProductItemComponent, [{
    key: "available",

    /**
     * available is only true if the variant is available and the user has clicked on an option
     */
    set: function set(available) {
      this.scope.available = available && this.optionChoosed;
    }
  }, {
    key: "showMenu",
    set: function set(show) {
      this.scope.showDetailMenu = show;
    },
    get: function get() {
      return this.scope.showDetailMenu;
    }
  }, {
    key: "product",
    set: function set(product) {
      this.debug('set product', product);

      if (product) {
        this.scope.product = _ribajs_shopify__WEBPACK_IMPORTED_MODULE_11__["ShopifyProductService"].prepair(product);
        this.scope.colorOption = _ribajs_shopify__WEBPACK_IMPORTED_MODULE_11__["ShopifyProductService"].getOption(this.scope.product, 'color');
        this.scope.sizeOption = _ribajs_shopify__WEBPACK_IMPORTED_MODULE_11__["ShopifyProductService"].getOption(this.scope.product, 'size'); // set the first variant to the selected one

        this.variant = this.scope.product ? this.scope.product.variants[0] : null;
      }
    },
    get: function get() {
      return this.scope.product;
    }
  }, {
    key: "variant",
    set: function set(variant) {
      if (variant === null) {
        this.debug('Error: Variant ist null');
        return;
      }

      this.debug('set variant', variant);
      this.scope.variant = variant;

      if (this.scope.variant) {
        this.selectedOptions = this.scope.variant.options.slice();
        this.debug('set selectedOptions', this.selectedOptions);
        this.available = this.scope.variant.available;
        this.activateOptions();
      }
    },
    get: function get() {
      return this.scope.variant;
    }
  }], [{
    key: "observedAttributes",

    /**
     * handle is the product handle to get the product json object
     * extras are product data wich is only avaiable over liquid and not over the product json object
     */
    get: function get() {
      return ['handle', 'extras'];
    }
  }]);

  function ShopifyProductItemComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ShopifyProductItemComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ShopifyProductItemComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "autobind", true);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["Debug"])('component:' + ShopifyProductItemComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "scope", {
      handle: null,
      product: null,
      variant: null,
      quantity: 1,
      showDetailMenu: false,
      // showAddToCartButton: false,
      chooseOption: _this.chooseOption,
      addToCart: _this.addToCart,
      toggleDetailMenu: _this.toggleDetailMenu,
      decrease: _this.decrease,
      increase: _this.increase,
      colorOption: null,
      sizeOption: null,

      /**
       * If the variant is available, used to disable the add to cart button
       */
      available: false
    });

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "selectedOptions", []);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "optionChoosed", false);

    _this.debug('constructor', _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));

    _this.init(ShopifyProductItemComponent.observedAttributes);

    _this.el.addEventListener('mouseleave', function (event) {
      _this.showMenu = false;
    }, false);

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(ShopifyProductItemComponent, [{
    key: "chooseOption",
    value: function chooseOption(optionValue, position1, optionName, context, event, scope, el) {
      optionValue = optionValue.toString();

      if (!this.scope.product) {
        throw new Error('Product not set!');
      } // this.debug('chooseOption', '\noptionValue', JSON.stringify(optionValue), '\nposition1', position1, '\noptionName', optionName, '\ncontext', context, '\nevent', event, '\nscope', scope, '\nel', el );


      this.selectedOptions[position1 - 1] = optionValue.toString();
      var variant = _ribajs_shopify__WEBPACK_IMPORTED_MODULE_11__["ShopifyProductService"].getVariantOfOptions(this.scope.product, this.selectedOptions);

      if (variant) {
        // Option choosed so enable add to cart button
        this.optionChoosed = true;
        this.variant = variant;
      }

      event.stopPropagation();
    }
  }, {
    key: "addToCart",
    value: function addToCart() {
      var _this2 = this;

      if (!this.variant) {
        this.debug('Variant not selected');
        return;
      }

      this.debug('addToCart', this.variant.id, this.scope.quantity);
      _ribajs_shopify__WEBPACK_IMPORTED_MODULE_11__["ShopifyCartService"].add(this.variant.id, this.scope.quantity).then(function (response)
      /** TODO not any */
      {
        _this2.debug('addToCart response', response);
      }).catch(function (error) {
        _this2.debug('addToCart error', error);
      });
    }
  }, {
    key: "toggleDetailMenu",
    value: function toggleDetailMenu() {
      this.debug('toggleDetailMenu');
      this.showMenu = !this.showMenu;
    }
  }, {
    key: "increase",
    value: function increase() {
      this.debug('increase', this.scope.quantity);
      this.scope.quantity++;
    }
  }, {
    key: "decrease",
    value: function decrease() {
      this.debug('decrease', this.scope.quantity);
      this.scope.quantity--;

      if (this.scope.quantity <= 0) {
        this.scope.quantity = 1;
      }
    } // deconstructor

  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ShopifyProductItemComponent.prototype), "disconnectedCallback", this).call(this);
    }
    /**
     * Workaround because `rv-class-active="isOptionActive | call size"` is not updating if selectedOptions changes
     * @param optionValue
     * @param optionName
     */

  }, {
    key: "activateOption",
    value: function activateOption(optionValue, optionName) {
      optionValue = optionValue.toString().replace('#', '');
      this.debug('activateOption', ".option-".concat(optionName.toLowerCase(), "-").concat(optionValue));
      var allOptions = this.el.querySelectorAll(".option-".concat(optionName.toLocaleLowerCase()));
      allOptions.forEach(function (el) {
        el.classList.remove('active');
      });
      var activeOptions = this.el.querySelectorAll(".option-".concat(optionName.toLocaleLowerCase(), "-").concat(optionValue));
      activeOptions.forEach(function (el) {
        el.classList.add('active');
      });
    }
    /**
     * Activate option by selected options (scope.selectedOptions)
     * This method sets the active class to the options elements
     */

  }, {
    key: "activateOptions",
    value: function activateOptions() {
      for (var position0 in this.selectedOptions) {
        if (this.selectedOptions[position0]) {
          var optionValue = this.selectedOptions[position0];

          if (this.scope.product) {
            this.debug('activateOptions', this.scope.product.options[position0]);
            var optionName = this.scope.product.options[position0].name; // Only activate size if it was clicked by the user

            if (optionName === 'size') {
              if (this.optionChoosed) {
                this.activateOption(optionValue, optionName);
              }
            } else {
              this.activateOption(optionValue, optionName);
            }
          }
        }
      }
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this3 = this;

        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind');

                if (!(this.scope.handle === null)) {
                  _context.next = 3;
                  break;
                }

                throw new Error('Product handle not set');

              case 3:
                return _context.abrupt("return", _ribajs_shopify__WEBPACK_IMPORTED_MODULE_11__["ShopifyProductService"].get(this.scope.handle).then(function (product) {
                  _this3.product = product;
                  return product;
                }));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('afterBind', this.scope);
                this.activateOptions();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return ['handle'];
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _shopify_product_item_component_html__WEBPACK_IMPORTED_MODULE_12___default.a;
      }
    }
  }]);

  return ShopifyProductItemComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["Component"]
/*ShopifyProductItemComponent*/
);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(ShopifyProductItemComponent, "tagName", 'rv-shopify-product-item');

/***/ }),

/***/ "./src/ts/components/shopify-product/shopify-product.component.html":
/*!**************************************************************************!*\
  !*** ./src/ts/components/shopify-product/shopify-product.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "";

/***/ }),

/***/ "./src/ts/components/shopify-product/shopify-product.component.ts":
/*!************************************************************************!*\
  !*** ./src/ts/components/shopify-product/shopify-product.component.ts ***!
  \************************************************************************/
/*! exports provided: ShopifyProductComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShopifyProductComponent", function() { return ShopifyProductComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/shopify */ "./node_modules/@ribajs/shopify/src/index.ts");
/* harmony import */ var _shopify_product_component_html__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shopify-product.component.html */ "./src/ts/components/shopify-product/shopify-product.component.html");
/* harmony import */ var _shopify_product_component_html__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_shopify_product_component_html__WEBPACK_IMPORTED_MODULE_11__);












var IMAGES_PER_ROW = 2;
var ShopifyProductComponent =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_7___default()(ShopifyProductComponent, _Component);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyProductComponent, [{
    key: "product",
    set: function set(product) {
      this.debug('set product', product);

      if (product) {
        this.scope.product = _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__["ShopifyProductService"].prepair(product); // this.selectedOptions = new Array(this.scope.product.options.length);

        this.colorOption = _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__["ShopifyProductService"].getOption(this.scope.product, 'color'); // set the first variant to the selected one

        this.variant = this.scope.product ? this.scope.product.variants[0] : null;
      }
    },
    get: function get() {
      return this.scope.product;
    }
  }, {
    key: "variant",
    set: function set(variant) {
      if (variant === null) {
        this.debug('Error: Variant ist null');
        return;
      }

      this.debug('set variant', variant);
      this.scope.variant = this.prepairVariant(variant);

      if (this.scope.variant) {
        this.selectedOptions = this.scope.variant.options.slice();
        this.debug('set selectedOptions', this.selectedOptions);
        this.available = this.scope.variant.available;
        this.activateOptions();
      }
    },
    get: function get() {
      return this.scope.variant;
    }
    /**
     * available is only true if the variant is available and the user has clicked on an option
     */

  }, {
    key: "available",
    set: function set(available) {
      this.scope.available = available && this.optionChoosed;
    }
  }], [{
    key: "observedAttributes",

    /**
     * handle is the product handle to get the product json object
     * extras are product data wich is only avaiable over liquid and not over the product json object
     */
    get: function get() {
      return ['handle', 'extras'];
    }
  }]);

  function ShopifyProductComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ShopifyProductComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ShopifyProductComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "autobind", true);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "$el", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Debug"])('component:' + ShopifyProductComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "scope", {
      handle: null,
      product: null,
      variant: null,
      quantity: 1,
      showDetailMenu: false,
      // showAddToCartButton: false,
      chooseOption: _this.chooseOption,
      addToCart: _this.addToCart,
      toggleDetailMenu: _this.toggleDetailMenu,
      decrease: _this.decrease,
      increase: _this.increase,

      /**
       * If the variant is available, used to disable the add to cart button
       */
      available: false
    });

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "colorOption", null);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "selectedOptions", []);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this), "optionChoosed", false);

    _this.$el = Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["JQuery"])(_this.el);

    _this.debug('constructor', _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5___default()(_this));

    _this.init(ShopifyProductComponent.observedAttributes);

    return _this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_6___default()(ShopifyProductComponent, [{
    key: "chooseOption",
    value: function chooseOption(optionValue, position1, optionName, _, event, scope, el) {
      if (!this.scope.product) {
        throw new Error('Product not set!');
      }

      optionValue = optionValue.toString();
      this.selectedOptions[position1 - 1] = optionValue.toString();
      var variant = _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__["ShopifyProductService"].getVariantOfOptions(this.scope.product, this.selectedOptions);
      this.debug('chooseOption', optionValue, 'position1', position1, 'selectedOptions', this.selectedOptions, 'variant', variant);

      if (variant) {
        // Option choosed so enable add to cart button
        this.optionChoosed = true;
        this.variant = variant;
      }

      event.stopPropagation();
    }
  }, {
    key: "addToCart",
    value: function addToCart() {
      var _this2 = this;

      if (!this.variant) {
        this.debug('Variant not selected');
        return;
      }

      this.debug('addToCart', this.variant.id, this.scope.quantity);
      _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__["ShopifyCartService"].add(this.variant.id, this.scope.quantity).then(function (response) {
        _this2.debug('addToCart response', response);
      }).catch(function (error) {
        _this2.debug('addToCart error', error);
      });
    }
  }, {
    key: "toggleDetailMenu",
    value: function toggleDetailMenu() {
      this.debug('toggleDetailMenu');
      this.scope.showDetailMenu = !this.scope.showDetailMenu;
    }
  }, {
    key: "increase",
    value: function increase() {
      this.debug('increase', this.scope.quantity);
      this.scope.quantity++;
    }
  }, {
    key: "decrease",
    value: function decrease() {
      this.debug('decrease', this.scope.quantity);
      this.scope.quantity--;

      if (this.scope.quantity <= 0) {
        this.scope.quantity = 1;
      }
    }
    /**
     * Workaround because `rv-class-active="isOptionActive | call size"` is not updating if selectedOptions changes
     * @param optionValue
     * @param optionName
     */

  }, {
    key: "activateOption",
    value: function activateOption(optionValue, optionName) {
      optionValue = optionValue.toString().replace('#', '');
      this.debug('activateOption', ".option-".concat(optionName.toLowerCase(), "-").concat(optionValue));
      this.$el.find(".option-".concat(optionName.toLocaleLowerCase())).removeClass('active');
      this.$el.find(".option-".concat(optionName.toLocaleLowerCase(), "-").concat(optionValue)).addClass('active');
    }
    /**
     * Activate option by selected options (scope.selectedOptions)
     * This method sets the active class to the options elements
     */

  }, {
    key: "activateOptions",
    value: function activateOptions() {
      for (var position0 in this.selectedOptions) {
        if (this.selectedOptions[position0]) {
          var optionValue = this.selectedOptions[position0];

          if (this.scope.product) {
            this.debug('activateOptions', this.scope.product.options[position0]);
            var optionName = this.scope.product.options[position0].name; // Only activate size if it was clicked by the user

            if (optionName === 'size') {
              if (this.optionChoosed) {
                this.activateOption(optionValue, optionName);
              }
            } else {
              this.activateOption(optionValue, optionName);
            }
          }
        }
      }
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _this3 = this;

        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind');

                if (!(this.scope.handle === null)) {
                  _context.next = 3;
                  break;
                }

                throw new Error('Product handle not set');

              case 3:
                return _context.abrupt("return", _ribajs_shopify__WEBPACK_IMPORTED_MODULE_10__["ShopifyProductService"].get(this.scope.handle).then(function (product) {
                  _this3.product = product;
                }));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('afterBind', this.scope);
                this.activateOptions();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return ['handle'];
    }
  }, {
    key: "template",
    value: function template() {
      // Only set the component template if there no childs already
      if (this.el.hasChildNodes()) {
        return null;
      } else {
        return _shopify_product_component_html__WEBPACK_IMPORTED_MODULE_11___default.a;
      }
    }
    /**
     * custom version of images.indexOf but compares without protocol and query strin in url
     * @param images
     * @param findImage
     */

  }, {
    key: "indexOfUrl",
    value: function indexOfUrl(images, findImage) {
      var index = -1;
      var clearFindImage = findImage.split('?')[0] // remove query string
      .replace(/(^\w+:|^)\/\//, '//'); // remove protocol

      images.forEach(function (image, i) {
        var clearImage = image.split('?')[0] // remove query string
        .replace(/(^\w+:|^)\/\//, '//'); // remove protocol

        if (clearImage === clearFindImage) {
          index = i;
        }
      });
      return index;
    }
    /**
     * Get images wich are not linked to any variant
     */

  }, {
    key: "getGeneralImages",
    value: function getGeneralImages() {
      var _this4 = this;

      var optionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'color';
      optionName = optionName.toLowerCase(); // this.debug('getImages');

      var generalImages = [];

      if (this.scope.product) {
        // add images without optionName in filename
        this.scope.product.images.forEach(function (image, index) {
          if (!(image.toLowerCase().indexOf("".concat(optionName, "-")) !== -1)) {
            generalImages.push(image);
          }
        }); // remove variant images from copied array

        this.scope.product.variants.forEach(function (variant) {
          var index = -1;

          if (variant.featured_image !== null && variant.featured_image.src) {
            index = _this4.indexOfUrl(generalImages, variant.featured_image.src);
          }

          if (index >= 0) {
            generalImages.splice(index, 1);
          }
        });
      } // this.debug('getGeneralImages', generalImages);


      return generalImages;
    }
    /**
     * Get options images (without featured image) filtered by filename.
     * Shopify only supports one image per variant, with this function more images for each variant are possible.
     * The image filename must include {optionName}-{optionValue} for that.
     */

  }, {
    key: "getOptionImages",
    value: function getOptionImages(option, optionValue) {
      optionValue = optionValue.toLowerCase().replace('#', '_');
      var optionName = option.name.toLowerCase(); // this.debug('getOptionImages', optionName, optionValue);

      var optionImages = [];

      if (this.scope.product) {
        this.scope.product.images.forEach(function (image, index) {
          // this.debug(`check ${optionName}-${optionValue} in`, image);
          if (image.toLowerCase().indexOf("".concat(optionName, "-").concat(optionValue)) !== -1) {
            optionImages.push(image);
          }
        });
      }

      return optionImages;
    }
    /**
     * Get featured images of variant, use the first option image or the featured product image as fallback
     */

  }, {
    key: "getFeaturedImage",
    value: function getFeaturedImage(variant) {
      if (variant.featured_image !== null) {
        variant.featured_image.src = variant.featured_image.src.replace(/(^\w+:|^)\/\//, '//'); // remove protocol

        return variant.featured_image;
      }

      var fallbackImageSrc = '';

      if (variant.images && variant.images.length > 0) {
        fallbackImageSrc = variant.images[0];
      } else if (this.scope.product) {
        fallbackImageSrc = this.scope.product.featured_image;
      } // remove protocol for normalisation


      fallbackImageSrc = fallbackImageSrc.replace(/(^\w+:|^)\/\//, '//'); // If variant has no image use the default product image

      if (this.scope.product) {
        var featuredImage = {
          src: fallbackImageSrc,
          position: 0,
          product_id: this.scope.product.id,
          variant_ids: [],
          alt: this.scope.product.title,
          created_at: this.scope.product.created_at,
          height: 0,
          width: 0,
          id: 0,
          updated_at: this.scope.product.created_at
        };
        return featuredImage;
      }

      throw new Error('image not found');
    }
    /**
     * Get image rows,
     * Always two pictures side by side.
     * If the last picture would stood alone then 3 pictures next to each other.
     * @param images
     */

  }, {
    key: "getImageRows",
    value: function getImageRows(images) {
      var leftoverPictureCount = images.length % IMAGES_PER_ROW;
      var rowLength = Math.floor(images.length / IMAGES_PER_ROW);
      var rows = new Array(rowLength);

      for (var index = 0; index < rows.length; index++) {
        rows[index] = {
          class: 'col-12 col-md px-0',
          images: [],
          sizes: '(min-width: 768px) 50vw, 100vw'
        };
      }

      var imageIndex = 0;

      for (var rowIndex = 0; rowIndex < rowLength; rowIndex++) {
        var currentRow = rows[rowIndex]; // Append IMAGES_PER_ROW images to the row

        for (var rowImageIndex = 0; rowImageIndex < IMAGES_PER_ROW; rowImageIndex++, imageIndex++) {
          var rowImage = images[imageIndex];
          currentRow.images.push(rowImage);
        } // Append the leftover pictures to the last row


        if (rowIndex === rowLength - 1) {
          currentRow.sizes = '(min-width: 768px) 33vw, 100vw';

          for (var _rowImageIndex = 0; _rowImageIndex < leftoverPictureCount; _rowImageIndex++, imageIndex++) {
            var _rowImage = images[imageIndex];
            currentRow.images.push(_rowImage);
          }
        }
      }

      return rows;
    }
    /**
     * prepair variant, e.g. fix missing image etc
     * @param variant
     */

  }, {
    key: "prepairVariant",
    value: function prepairVariant(variant) {
      if (variant === null) {
        this.debug('Error: Variant is null!');
        return null;
      }

      if (this.colorOption) {
        variant.images = this.getOptionImages(this.colorOption, variant.options[this.colorOption.position - 1]);
      } else {
        this.debug('Warn: colorOption not defined');
        variant.images = [];
      }

      variant.featured_image = this.getFeaturedImage(variant);

      if (variant.images) {
        // Remove featured image so that it does not appear twice
        var i = this.indexOfUrl(variant.images, variant.featured_image.src);

        if (i >= 0) {
          variant.images.splice(i, 1);
        } // add gerneal images


        variant.images = variant.images.concat(this.getGeneralImages());
        variant.imageRows = this.getImageRows(variant.images);
      }

      return variant;
    }
  }]);

  return ShopifyProductComponent;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_9__["Component"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(ShopifyProductComponent, "tagName", 'rv-shopify-product');

/***/ }),

/***/ "./src/ts/components/switcher/switcher.component.ts":
/*!**********************************************************!*\
  !*** ./src/ts/components/switcher/switcher.component.ts ***!
  \**********************************************************/
/*! exports provided: TdaI18nSwitcherComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TdaI18nSwitcherComponent", function() { return TdaI18nSwitcherComponent; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/get */ "./node_modules/@babel/runtime-corejs2/helpers/get.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _ribajs_i18n__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ribajs/i18n */ "./node_modules/@ribajs/i18n/src/index.ts");
/* harmony import */ var _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ribajs/shopify-tda */ "./node_modules/@ribajs/shopify-tda/src/index.ts");













var TdaI18nSwitcherComponent =
/*#__PURE__*/
function (_AI18nSwitcherCompone) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_8___default()(TdaI18nSwitcherComponent, _AI18nSwitcherCompone);

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(TdaI18nSwitcherComponent, null, [{
    key: "observedAttributes",
    get: function get() {
      return [];
    } // protected $el: JQuery<HTMLElement>;

  }]);

  function TdaI18nSwitcherComponent(element) {
    var _this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, TdaI18nSwitcherComponent);

    _this = _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(TdaI18nSwitcherComponent).call(this, element));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "localesService", new _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_12__["LocalesService"]());

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_10__["Debug"])('component:' + TdaI18nSwitcherComponent.tagName));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(_babel_runtime_corejs2_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "scope", {
      langcodes: [],
      switch: _this.switch,
      toggle: _this.toggle,
      ready: false
    });

    _this.init(TdaI18nSwitcherComponent.observedAttributes);

    return _this;
  }
  /**
   * Switch to language by langcode
   * @param langcode
   * @param event
   */


  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_7___default()(TdaI18nSwitcherComponent, [{
    key: "switch",
    value: function _switch(langcode, context, event) {
      return _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(TdaI18nSwitcherComponent.prototype), "switch", this).call(this, langcode, context, event);
    }
    /**
     * Toggle language, makes only sense if you have only two languages
     * @param langcode
     * @param event
     */

  }, {
    key: "toggle",
    value: function toggle(context, event) {
      return _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(TdaI18nSwitcherComponent.prototype), "toggle", this).call(this, context, event);
    }
  }, {
    key: "setLangcode",
    value: function setLangcode(langcode) {
      this.debug('setLangcode', langcode);
      return _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(TdaI18nSwitcherComponent.prototype), "setLangcode", this).call(this, langcode);
    }
  }, {
    key: "beforeBind",
    value: function () {
      var _beforeBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.debug('beforeBind', this.scope);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function beforeBind() {
        return _beforeBind.apply(this, arguments);
      }

      return beforeBind;
    }()
  }, {
    key: "afterBind",
    value: function () {
      var _afterBind = _babel_runtime_corejs2_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.debug('afterBind', this.scope);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function afterBind() {
        return _afterBind.apply(this, arguments);
      }

      return afterBind;
    }()
  }, {
    key: "requiredAttributes",
    value: function requiredAttributes() {
      return [];
    }
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      _babel_runtime_corejs2_helpers_get__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(TdaI18nSwitcherComponent.prototype), "disconnectedCallback", this).call(this);
    }
  }, {
    key: "template",
    value: function template() {
      return null;
    }
  }]);

  return TdaI18nSwitcherComponent;
}(_ribajs_i18n__WEBPACK_IMPORTED_MODULE_11__["AI18nSwitcherComponent"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_9___default()(TdaI18nSwitcherComponent, "tagName", 'tda-i18n-switcher');

/***/ }),

/***/ "./src/ts/main.ts":
/*!************************!*\
  !*** ./src/ts/main.ts ***!
  \************************/
/*! exports provided: Main */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Main", function() { return Main; });
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");
/* harmony import */ var _ribajs_shopify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ribajs/shopify */ "./node_modules/@ribajs/shopify/src/index.ts");
/* harmony import */ var _ribajs_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ribajs/router */ "./node_modules/@ribajs/router/src/index.ts");
/* harmony import */ var _ribajs_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ribajs/i18n */ "./node_modules/@ribajs/i18n/src/index.ts");
/* harmony import */ var _services_tracking_services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/tracking.services */ "./src/ts/services/tracking.services.ts");
/* harmony import */ var _binders_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./binders/index */ "./src/ts/binders/index.ts");
/* harmony import */ var _components_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/index */ "./src/ts/components/index.ts");
/* harmony import */ var _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ribajs/shopify-tda */ "./node_modules/@ribajs/shopify-tda/src/index.ts");











/* tslint:disable:max-classes-per-file */
var TTDUniversalPixelApiWrapper = function TTDUniversalPixelApiWrapper() {
  _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, TTDUniversalPixelApiWrapper);
};

var Main = // private dispatcher = new EventDispatcher('main');
function Main() {
  _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, Main);

  _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "view", void 0);

  _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_2__["Debug"])('app:main'));

  _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "riba", new _ribajs_core__WEBPACK_IMPORTED_MODULE_2__["Riba"]());

  _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(this, "localesService", new _ribajs_shopify_tda__WEBPACK_IMPORTED_MODULE_9__["LocalesService"]());

  this.debug('init the main application');
  window.model.year = new Date().getFullYear();
  window.model.filter = {
    stories: 'all'
  }; // Regist custom components

  this.riba.module.regist({
    components: _components_index__WEBPACK_IMPORTED_MODULE_8__,
    binders: _binders_index__WEBPACK_IMPORTED_MODULE_7__
  });
  this.riba.module.regist(_ribajs_core__WEBPACK_IMPORTED_MODULE_2__["coreModule"]);
  this.riba.module.regist(_ribajs_router__WEBPACK_IMPORTED_MODULE_4__["default"]);
  this.riba.module.regist(_ribajs_shopify__WEBPACK_IMPORTED_MODULE_3__["default"]);
  this.riba.module.regist(Object(_ribajs_i18n__WEBPACK_IMPORTED_MODULE_5__["default"])(this.localesService));

  window.model.assign = function (key, value, context, event) {
    // event.preventDefault();
    // event.stopPropagation();
    this[key] = value;
  };

  window.model.globalToggle = function (key, context, event) {
    this[key] = !!!this[key];
    event.preventDefault();
    event.stopPropagation();
  };

  window.model.system.shopify = window.Shopify;
  this.view = this.riba.bind(Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_2__["JQuery"])('body')[0], window.model);
};
var tracking = new _services_tracking_services__WEBPACK_IMPORTED_MODULE_6__["TrackingService"]({
  googleAnalytics: window.model.system.themeSettings.googleAnalytics,
  theTradeDesk: window.model.system.themeSettings.theTradeDesk,
  pinterestTag: window.model.system.themeSettings.pinterestTag
});
Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_2__["JQuery"])(function ($) {
  var main = new Main();
});
window.$ = _ribajs_core__WEBPACK_IMPORTED_MODULE_2__["JQuery"];
window.JQuery = _ribajs_core__WEBPACK_IMPORTED_MODULE_2__["JQuery"];

/***/ }),

/***/ "./src/ts/services/Utils.ts":
/*!**********************************!*\
  !*** ./src/ts/services/Utils.ts ***!
  \**********************************/
/*! exports provided: Utils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Utils", function() { return Utils; });
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");







/**
 * Just an Class with some helpful functions
 *
 * @export
 * @class Utils
 */

var Utils =
/*#__PURE__*/
function (_tinybindUtils) {
  _babel_runtime_corejs2_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(Utils, _tinybindUtils);

  function Utils() {
    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Utils);

    return _babel_runtime_corejs2_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_corejs2_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Utils).apply(this, arguments));
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Utils, [{
    key: "eventTarget",

    /**
     * Which HTML element is the target of the event
     * @see https://gist.github.com/electricg/4435259
     */
    value: function eventTarget(e) {
      var targ;
      var $targ;
      e = e || window.event;

      if (e.target) {
        targ = e.target;
      } else if (e.srcElement) {
        targ = e.srcElement;
      } // defeat Safari bug


      if (targ.nodeType === 3) {
        targ = targ.parentNode;
      }

      $targ = $(targ);
      return $targ;
    }
    /**
     * Get the mouse / touch position relative to the document
     * @see http://www.quirksmode.org/js/events_properties.html
     */

  }, {
    key: "eventPositionDocument",
    value: function eventPositionDocument(e) {
      var posx = 0;
      var posy = 0;

      if (!e) {
        e = window.event;
      }

      if (document.documentElement === null) {
        throw new Error('document.documentElement is null');
      }

      if (e) {
        if (e.originalEvent) {
          e = e.originalEvent;
        }
      }

      if (e && e.changedTouches) {
        e = e;

        if (e.changedTouches && e.changedTouches[0] && (e.changedTouches[0].pageX || e.changedTouches[0].pageY)) {
          posx = e.changedTouches[0].pageX;
          posy = e.changedTouches[0].pageY;
        } else if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
        } else if (e.touches && e.changedTouches[0] && (e.changedTouches[0].clientX || e.changedTouches[0].clientY)) {
          posx = e.changedTouches[0].clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          posy = e.changedTouches[0].clientY + document.body.scrollTop + document.documentElement.scrollTop;
        } else if (e.clientX || e.clientY) {
          posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
      }

      return {
        x: posx,
        y: posy
      };
    }
    /**
     * Get the position of an element relative to document
     */

  }, {
    key: "getElementPosition",
    value: function getElementPosition(selector) {
      var $el = $(selector);
      var pageYScroll = window.pageYOffset || (document.documentElement ? document.documentElement.scrollTop : 0);
      var pageXScroll = window.pageXOffset || (document.documentElement ? document.documentElement.scrollLeft : 0); // optionally get horizontal scroll
      // get position of element relative to viewport

      var rect = $el[0].getBoundingClientRect();
      var result = {
        'x': rect.left + pageXScroll,
        'fixed-x': rect.left,
        'y': rect.top + pageYScroll,
        'fixed-y': rect.top,
        'w': rect.width,
        'h': rect.height,
        '$element': $el
      };
      return result;
    }
    /**
     * Get the position of an element relative to another element e.g. his parent element
     * E.g. used in rv-tabs to get the scrollpostion of an element insite a scrollable element to scroll the active tab to left
     */

  }, {
    key: "getElementPositionInElement",
    value: function getElementPositionInElement(selector, parentSelector) {
      var elementPos = this.getElementPosition(selector);
      var parentElementPos = this.getElementPosition(parentSelector);
      var result = {
        'x': elementPos.x - parentElementPos.x,
        'y': elementPos.y - parentElementPos.y,
        'fixed-x': elementPos['fixed-x'] - parentElementPos['fixed-x'],
        'fixed-y': elementPos['fixed-y'] - parentElementPos['fixed-y'],
        'w': elementPos.w,
        'h': elementPos.h,
        '$element': elementPos.$element,
        '$parent': parentElementPos.$element,
        'elementPos': elementPos,
        'parentPos': parentElementPos
      };
      return result;
    }
    /**
     * Mouse position relative to the element  (not working on IE7 and below)
     * @see https://gist.github.com/electricg/4435259
     */

  }, {
    key: "mousePositionElement",
    value: function mousePositionElement(e, target) {
      var mousePosDoc = this.eventPositionDocument(e); // if target not set try to get target from event

      if (!target) {
        target = this.eventTarget(e);
      }

      var targetPos = this.getElementPosition(target);
      var posx = mousePosDoc.x - targetPos.x;
      var posy = mousePosDoc.y - targetPos.y;
      return {
        x: posx,
        y: posy,
        element: target
      };
    }
    /**
     * Mouse position relative to the element in percent (not working on IE7 and below)
     * @see https://gist.github.com/electricg/4435259
     */

  }, {
    key: "mousePositionElementInPercent",
    value: function mousePositionElementInPercent(e, target) {
      var mousePosDoc = this.eventPositionDocument(e); // if target not set try to get target from event

      if (!target) {
        target = this.eventTarget(e);
      }

      var width = target[0].offsetWidth;
      var height = target[0].offsetHeight;
      var targetPos = this.getElementPosition(target);
      var posx = mousePosDoc.x - targetPos.x;
      var posy = mousePosDoc.y - targetPos.y;
      return {
        x: posx,
        y: posy,
        left: posx / width,
        // percent value
        top: posy / height,
        // percent value
        w: width,
        h: height,
        element: target
      };
    }
  }], [{
    key: "toType",

    /**
     * Shoutout AngusCroll (https://goo.gl/pxwQGp)
     * @param obj
     */
    value: function toType(obj) {
      var matches = {}.toString.call(obj).match(/\s([a-z]+)/i);
      return matches ? matches[1].toLowerCase() : null;
    }
    /**
     *
     * @see https://github.com/twbs/bootstrap/blob/v4-dev/js/src/util.js#L124
     */

  }, {
    key: "isElement",
    value: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    }
    /**
     *
     * @param componentName
     * @param config
     * @param configTypes
     */

  }, {
    key: "typeCheckConfig",
    value: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Utils.isElement(value) ? 'element' : Utils.toType(value);

          if (!valueType || !new RegExp(expectedTypes).test(valueType)) {
            throw new Error("".concat(componentName.toUpperCase(), ": ") + "Option \"".concat(property, "\" provided type \"").concat(valueType, "\" ") + "but expected type \"".concat(expectedTypes, "\"."));
          }
        }
      }
    }
  }, {
    key: "getSelectorFromElement",
    value: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        selector = element.getAttribute('href') || '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    }
  }, {
    key: "stringHasOnlyNumbers",
    value: function stringHasOnlyNumbers(str) {
      return /^\d+$/.test(str);
    }
  }, {
    key: "selectAll",

    /**
     * Select all of an contenteditable or input element
     * @param element The element you want to select
     */
    value: function selectAll(element) {
      // need setTimeout for safari
      setTimeout(function () {
        if (typeof element.selectionStart !== 'undefined') {
          element.selectionStart = 0;
          element.selectionEnd = 999;
        }

        if (typeof element.select === 'function') {
          element.select();
        }

        if (typeof element.setSelectionRange === 'function') {
          element.setSelectionRange(0, 999);
        }

        if (window.getSelection) {
          var range = document.createRange();
          range.selectNodeContents(element);
          var selection = window.getSelection();

          if (!selection) {
            console.warn('No selection found!');
            return;
          }

          selection.removeAllRanges();
          selection.addRange(range);
          selection.selectAllChildren(element);
        }

        if (document.body.createTextRange) {
          var _range = document.body.createTextRange(); // Creates TextRange object


          _range.moveToElementText(element); // sets Range


          _range.select(); // make selection.

        }

        if (document.execCommand) {
          document.execCommand('selectAll', false, undefined);
        }
      }, 0);
    }
  }]);

  return Utils;
}(_ribajs_core__WEBPACK_IMPORTED_MODULE_6__["Utils"]);

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(Utils, "stripHtml", function (html) {
  var tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
});

/***/ }),

/***/ "./src/ts/services/tracking.services.ts":
/*!**********************************************!*\
  !*** ./src/ts/services/tracking.services.ts ***!
  \**********************************************/
/*! exports provided: TrackingService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrackingService", function() { return TrackingService; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ribajs_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ribajs/core */ "./node_modules/@ribajs/core/src/index.ts");






// see also PrivacySettingsComponent
var TrackingService =
/*#__PURE__*/
function () {
  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(TrackingService, [{
    key: "theTradeDeskDisabled",
    // Original document.cookie function to hold them if we block all cookies
    get: function get() {
      if (document.cookie.indexOf(this.theTradeDeskDisableStr + '=true') > -1) {
        return true;
      }

      return false;
    },
    set: function set(disabled) {
      document.cookie = "".concat(this.theTradeDeskDisableStr, "=").concat(disabled, "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/");
      window[this.theTradeDeskDisableStr] = disabled;
      this.theTradeDesk.enabled = !disabled;
    }
  }, {
    key: "googleAnalyticsDisabled",
    get: function get() {
      if (document.cookie.indexOf(this.googleAnalyticsDisableStr + '=true') > -1) {
        return true;
      }

      return false;
    },
    set: function set(disabled) {
      document.cookie = "".concat(this.googleAnalyticsDisableStr, "=").concat(disabled, "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/"); // see https://developers.google.com/analytics/devguides/collection/analyticsjs/user-opt-out

      window[this.googleAnalyticsDisableStr] = disabled;
      this.googleAnalytics.enabled = !disabled; // be sure that ga is disabled by overwrite the function

      if (disabled) {
        window._ga = window.ga;

        window.ga = function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          console.warn('ga is disabled, ignore', args);
        };
      } else {
        if (window._ga) {
          window.ga = window._ga;
        }
      }
    }
  }, {
    key: "facebookPixelDisabled",
    get: function get() {
      if (document.cookie.indexOf(this.facebookPixelDisableStr + '=true') > -1) {
        return true;
      }

      return false;
    },
    set: function set(disabled) {
      document.cookie = "".concat(this.facebookPixelDisableStr, "=").concat(disabled, "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/"); // see https://www.tba-berlin.de/blog/dsgvo-optout/

      window[this.facebookPixelDisableStr] = disabled;
      this.facebookPixel.enabled = !disabled; // be sure that fbq is disabled by overwrite the function

      if (disabled) {
        window._fbq = window.fbq;

        window.fbq = function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          console.warn('fbp is disabled, ignore', args);
        };
      } else {
        if (window._fbq) {
          window.fbq = window._fbq;
        }
      }
    }
  }, {
    key: "pinterestTagDisabled",
    get: function get() {
      if (document.cookie.indexOf(this.pinterestTagDisableStr + '=true') > -1) {
        return true;
      }

      return false;
    },
    set: function set(disabled) {
      document.cookie = "".concat(this.pinterestTagDisableStr, "=").concat(disabled, "; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/"); // see https://www.tba-berlin.de/blog/dsgvo-optout/

      window[this.pinterestTagDisableStr] = disabled;
      this.pinterestTag.enabled = !disabled; // be sure that pintrk is disabled by overwrite the function

      if (disabled) {
        window._pintrk = window.pintrk;

        window.pintrk = function () {
          console.warn('pinterest is disabled, ignore', window.pintrk);
        };
      } else {
        if (window._pintrk) {
          window.pintrk = window._pintrk;
        }
      }
    }
  }, {
    key: "cookieStorageDisabled",
    set: function set(disabled) {
      if (disabled) {
        this.blockCookies();
      } else {
        this.unblockCookies();
      }
    }
  }]);

  function TrackingService(settings) {
    var _this = this;

    _babel_runtime_corejs2_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, TrackingService);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "shopifyCartEventDispatcher", new _ribajs_core__WEBPACK_IMPORTED_MODULE_5__["EventDispatcher"]('ShopifyCart'));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "theTradeDeskDisableStr", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "googleAnalyticsDisableStr", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "facebookPixelDisableStr", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "pinterestTagDisableStr", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "theTradeDesk", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "googleAnalytics", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "facebookPixel", {});

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "pinterestTag", void 0);

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "debug", Object(_ribajs_core__WEBPACK_IMPORTED_MODULE_5__["Debug"])('app:TrackingService'));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "dispatcher", new _ribajs_core__WEBPACK_IMPORTED_MODULE_5__["EventDispatcher"]('main'));

    _babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(this, "_cookie", void 0);

    this.theTradeDesk = settings.theTradeDesk;
    this.googleAnalytics = settings.googleAnalytics;
    this.pinterestTag = settings.pinterestTag;
    this.debug('settings', settings);
    this.googleAnalyticsDisableStr = 'ga-disable-' + this.googleAnalytics.trackingId;
    this.theTradeDeskDisableStr = 'TTDOptOut';
    this.facebookPixelDisableStr = 'fb-pixel-is-disabled';
    this.pinterestTagDisableStr = 'pinterest-tag-is-disabled';
    this.checkDisableTrackingCookies();
    /**
     * store original cookie getter and setter to make it possible to revert the block
     */

    this._cookie = {
      get: undefined,
      set: undefined
    };

    if (document.__lookupGetter__ && document.__lookupGetter__('cookie')) {
      this._cookie.get = document.__lookupGetter__('cookie');
    }

    if (document.__lookupSetter__ && document.__lookupSetter__('cookie')) {
      this._cookie.set = document.__lookupSetter__('cookie');
    }

    if (_babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_1___default.a && _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_1___default()(document, 'cookie') && _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_1___default()(document, 'cookie').get) {
      this._cookie.get = _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_1___default()(document, 'cookie').get;
    }

    if (_babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_1___default.a && _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_1___default()(document, 'cookie') && _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_1___default()(document, 'cookie').set) {
      this._cookie.set = _babel_runtime_corejs2_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_1___default()(document, 'cookie').set;
    }

    if (TrackingService.instance) {
      return TrackingService.instance;
    }

    this.debug('google analytics disabled: ', window[this.googleAnalyticsDisableStr]);
    this.debug('the trade desk disabled: ', window[this.theTradeDeskDisableStr]);
    this.debug('facebook pixel disabled: ', window[this.facebookPixelDisableStr]);
    this.debug('pinterest tag disabled: ', window[this.pinterestTagDisableStr]);
    this.dispatcher.on('newPageReady', function (viewId, currentStatus, prevStatus, $container, newPageRawHTML, dataset, isFirstPageLoad) {
      _this.trackingCallback(currentStatus, prevStatus, $container, newPageRawHTML, dataset, isFirstPageLoad);
    });
    this.shopifyCartEventDispatcher.on('ShopifyCart:add', function (data) {
      if (navigator.doNotTrack === '1') {
        _this.debug('The user wishs no tracking');

        return;
      }

      if (_this.pinterestTag && _this.pinterestTag.enabled && window.pintrk) {
        window.pintrk('track', 'addtocart');

        _this.debug('pinterest addtocart tracked!');
      }
    });
    TrackingService.instance = this;
  }

  _babel_runtime_corejs2_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(TrackingService, [{
    key: "checkDisableTrackingCookies",
    value: function checkDisableTrackingCookies() {
      this.theTradeDeskDisabled = this.theTradeDeskDisabled || navigator.doNotTrack === '1';
      this.googleAnalyticsDisabled = this.googleAnalyticsDisabled || navigator.doNotTrack === '1';
      this.facebookPixelDisabled = this.facebookPixelDisabled || navigator.doNotTrack === '1';
      this.pinterestTagDisabled = this.pinterestTagDisabled || navigator.doNotTrack === '1';
    }
    /**
     * Block the possebillity to store cookies
     * @see https://stackoverflow.com/a/41606174/1465919
     */

  }, {
    key: "blockCookies",
    value: function blockCookies() {
      if (!document.__defineGetter__) {
        _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(document, 'cookie', {
          get: function get() {
            console.warn('Cookies are blocked, do nothing');
            return '';
          },
          set: function set(value) {
            console.warn('Cookies are blocked, do nothing. value:', value);
            return true;
          }
        });
      } else {
        document.__defineGetter__('cookie', function () {
          console.warn('Cookies are blocked, do nothing');
          return '';
        });

        document.__defineSetter__('cookie', function (value) {
          console.warn('Cookies are blocked, do nothing. value:', value);
        });
      }
    }
    /**
     * Unblock cookies, restore the original function
     */

  }, {
    key: "unblockCookies",
    value: function unblockCookies() {
      if (this._cookie && this._cookie.get && this._cookie.set) {
        if (!document.__defineGetter__) {
          _babel_runtime_corejs2_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(document, 'cookie', {
            get: this._cookie.get,
            set: this._cookie.set
          });
        } else {
          document.__defineGetter__('cookie', this._cookie.get);

          document.__defineSetter__('cookie', this._cookie.set);
        }
      }
    }
    /**
     * Method to get the keys for each cookie name
     */

  }, {
    key: "getCookieKeys",
    value: function getCookieKeys() {
      // Separate key value pairs
      var cookies = document.cookie.split(';');
      var keys = [];

      for (var i = 0; i < cookies.length; i++) {
        var cookieEntry = cookies[i].split('='); //  first part of the split string holds the key ...

        keys.push(cookieEntry[0].trim());
      }

      return keys;
    }
    /**
     * delete cookie by name
     */

  }, {
    key: "deleteCookie",
    value: function deleteCookie(name) {
      this.debug('deleteCookie', "\"".concat(name, "\""));
      document.cookie = "".concat(name, "=; expires=").concat(new Date(0).toUTCString(), "; Max-Age=-99999999; path=/");
    }
    /**
     * Remove cookies on the server
     */

  }, {
    key: "deleteCookieOnServer",
    value: function deleteCookieOnServer() {
      this.debug('deleteCookieOnServer not implemented yet');
    }
    /**
     * Remove all browser cookies, please note this do not remove the cookies setted by shopify on the server
     * @see https://snippetlib.com/jquery/remove_cookies
     */

  }, {
    key: "removeCookies",
    value: function removeCookies() {
      var ignore = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var cookieKeys = this.getCookieKeys();
      this.debug('cookieKeys', cookieKeys);
      this.debug('ignore', ignore); // delete all cookies

      for (var i = 0; i < cookieKeys.length; i++) {
        var cookieKey = cookieKeys[i];

        if (ignore.indexOf(cookieKey) !== -1) {
          this.debug('ignore cookie', cookieKey);
        } else {
          this.deleteCookie(cookieKey);
        }
      }

      this.deleteCookie(''); // remove cookie without name

      this.deleteCookieOnServer();
    }
  }, {
    key: "trackingCallback",
    value: function trackingCallback(currentStatus, prevStatus, $container, newPageRawHTML, dataset, isFirstPageLoad) {
      var self = this;

      if (navigator.doNotTrack === '1') {
        this.debug('The user wishs no tracking');
        return;
      } // self.debug('trackingCallback', viewId, currentStatus, prevStatus, dataset, isFirstPageLoad);


      if (self.theTradeDesk.enabled && window[this.theTradeDeskDisableStr] !== true) {
        if (typeof window.ttd_dom_ready === 'function') {
          window.ttd_dom_ready(function () {
            // self.debug('TTDUniversalPixelApi', (window as any).TTDUniversalPixelApi);
            if (typeof window.TTDUniversalPixelApi === 'function') {
              var universalPixelApi = new window.TTDUniversalPixelApi();
              universalPixelApi.init(self.theTradeDesk.adv, [self.theTradeDesk.tagId[1]], self.theTradeDesk.baseSrc);
              self.debug('ttd tracked!', universalPixelApi.getVersion());
            }
          });
        }
      } else {
        this.debug('theTradeDesk is disabled');
      }

      window.dataLayer = window.dataLayer || [];

      function gtag() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        window.dataLayer.push(arguments);
      }

      if (self.googleAnalytics.enabled && window[this.googleAnalyticsDisableStr] !== true) {
        if (isFirstPageLoad) {// this is already tracked by the shopify event listener code
        } else {
          // if never framework  Website-Tag (gtag.js) for google analytics is used:
          gtag('event', 'page_view', {
            // tslint:disable-next-line:object-literal-key-quotes
            'send_to': self.googleAnalytics.trackingId // object-literal-key-quotes

          });

          if (window.ga) {
            window.ga('send', 'pageview');
          }
        }
      } else {
        this.debug('googleAnalytics is disabled');
      }

      if (self.pinterestTag && self.pinterestTag.enabled && !isFirstPageLoad && window.pintrk) {
        window.pintrk('track', 'pagevisit');
        self.debug('pinterest pagevisit tracked!');
      }
    }
  }]);

  return TrackingService;
}();

_babel_runtime_corejs2_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(TrackingService, "instance", void 0);

/***/ }),

/***/ 0:
/*!******************************!*\
  !*** multi ./src/ts/main.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/ts/main.ts */"./src/ts/main.ts");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2JpbmRlcnMvYnM0L2NvbGxhcHNlLW9uLXVybC5iaW5kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2JpbmRlcnMvYnM0L2NvbGxhcHNlLmJpbmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvYmluZGVycy9iczQvY29sbGFwc2Uuc2VydmljZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvYmluZGVycy9iczQvZXhwYW4tb24tdXJsLmJpbmRlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvYmluZGVycy9iczQvc2Nyb2xsc3B5LXN0YXIuYmluZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy90cy9iaW5kZXJzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy90cy9iaW5kZXJzL21haWx0by5iaW5kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2JpbmRlcnMvc2Nyb2xsYmFyL3Njcm9sbGJhci1kcmFnYWJsZS5iaW5kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2JpbmRlcnMvc2Nyb2xsYmFyL3Njcm9sbGZpeC5iaW5kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2JpbmRlcnMvc3R5bGVzL2JhY2tncm91bmQtY29sb3Itc3Rhci5iaW5kZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2JpbmRlcnMvc3R5bGVzL2JhY2tncm91bmQtaW1hZ2UuYmluZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy90cy9iaW5kZXJzL3N0eWxlcy9vcGFjaXR5LXN0YXIuYmluZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy90cy9iaW5kZXJzL3N0eWxlcy9zdHlsZXMuYmluZGVycy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvYmluZGVycy90ZWwuYmluZGVyLnRzIiwid2VicGFjazovLy8uL3NyYy90cy9jb21wb25lbnRzL2JzNC9iczQuY29tcG9uZW50cy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9iczQvZHJvcGRvd24vZHJvcGRvd24uY29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy90cy9jb21wb25lbnRzL2JzNC9kcm9wZG93bi9kcm9wZG93bi5zZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy90cy9jb21wb25lbnRzL2JzNC90YWJzL3RhYnMuY29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy90cy9jb21wb25lbnRzL2NvbnRhY3QtZm9ybS9jb250YWN0LWZvcm0uY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvY29udGFjdC1mb3JtL2NvbnRhY3QtZm9ybS5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvY29va2llLWJhbm5lci9jb29raWUtYmFubmVyLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL3NyYy90cy9jb21wb25lbnRzL2Nvb2tpZS1iYW5uZXIvY29va2llLWJhbm5lci5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvZGVidWctYmFyL2RlYnVnLWJhci5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9kZWJ1Zy1iYXIvZGVidWctYmFyLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9kZWxldGUtZGF0YS1mb3JtL2RlbGV0ZS1kYXRhLWZvcm0uY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvZGVsZXRlLWRhdGEtZm9ybS9kZWxldGUtZGF0YS1mb3JtLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9mc2Jkci1tYWluYmFyL2ZzYmRyLW1haW5iYXIuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvZnNiZHItbWFpbmJhci9mc2Jkci1tYWluYmFyLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9mc2Jkci12aWRlby9mc2Jkci12aWRlby5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvaWNvbi9pY29uLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL3NyYy90cy9jb21wb25lbnRzL2ljb24vaWNvbi5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvaW5zdGFncmFtLXNjcm9sbGJhci9pbnN0YWdyYW0tc2Nyb2xsYmFyLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL3NyYy90cy9jb21wb25lbnRzL2luc3RhZ3JhbS1zY3JvbGxiYXIvaW5zdGFncmFtLXNjcm9sbGJhci5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvaW5zdGFncmFtL2luc3RhZ3JhbS5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9pbnN0YWdyYW0vaW5zdGFncmFtLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9uZXdzbGV0dGVyL25ld3NsZXR0ZXIuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvbmV3c2xldHRlci9uZXdzbGV0dGVyLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9wcml2YWN5LXNldHRpbmdzL3ByaXZhY3ktc2V0dGluZ3MuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvcHJpdmFjeS1zZXR0aW5ncy9wcml2YWN5LXNldHRpbmdzLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9wcm9kdWN0LXNjcm9sbGJhci9wcm9kdWN0LXNjcm9sbGJhci5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvcmV2b2tlLWZvcm0vcmV2b2tlLWZvcm0uY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvcmV2b2tlLWZvcm0vcmV2b2tlLWZvcm0uY29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy90cy9jb21wb25lbnRzL3NoYXJlL3NoYXJlLmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL3NyYy90cy9jb21wb25lbnRzL3NoYXJlL3NoYXJlLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9zaG9waWZ5LWFkZHJlc3Nlcy9zaG9waWZ5LWFkZHJlc3Nlcy5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9zaG9waWZ5LWFkZHJlc3Nlcy9zaG9waWZ5LWFkZHJlc3Nlcy5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvc2hvcGlmeS1hcnRpY2xlLWl0ZW0vc2hvcGlmeS1hcnRpY2xlLWl0ZW0uY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvc2hvcGlmeS1hcnRpY2xlLWl0ZW0vc2hvcGlmeS1hcnRpY2xlLWl0ZW0uY29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy90cy9jb21wb25lbnRzL3Nob3BpZnktY2FydC1idXR0b24vc2hvcGlmeS1jYXJ0LWJ1dHRvbi5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9zaG9waWZ5LWNhcnQtYnV0dG9uL3Nob3BpZnktY2FydC1idXR0b24uY29tcG9uZW50LnRzIiwid2VicGFjazovLy8uL3NyYy90cy9jb21wb25lbnRzL3Nob3BpZnktY2FydC9zaG9waWZ5LWNhcnQuY29tcG9uZW50Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvc2hvcGlmeS1jYXJ0L3Nob3BpZnktY2FydC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvc2hvcGlmeS1jb21tZW50cy1mb3JtL3Nob3BpZnktY29tbWVudHMtZm9ybS5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9zaG9waWZ5LWNvbW1lbnRzLWZvcm0vc2hvcGlmeS1jb21tZW50cy1mb3JtLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9zaG9waWZ5LWZpbHRlci9zaG9waWZ5LWZpbHRlci5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9zaG9waWZ5LWZpbHRlci9zaG9waWZ5LWZpbHRlci5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvc2hvcGlmeS1saW5rbGlzdC9zaG9waWZ5LWxpbmtsaXN0LmNvbXBvbmVudC5odG1sIiwid2VicGFjazovLy8uL3NyYy90cy9jb21wb25lbnRzL3Nob3BpZnktbGlua2xpc3Qvc2hvcGlmeS1saW5rbGlzdC5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvc2hvcGlmeS1sb2dpbi1mb3JtL3Nob3BpZnktbG9naW4tZm9ybS5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9zaG9waWZ5LWxvZ2luLWZvcm0vc2hvcGlmeS1sb2dpbi1mb3JtLmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9zaG9waWZ5LXByb2R1Y3QtaXRlbS9zaG9waWZ5LXByb2R1Y3QtaXRlbS5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9zaG9waWZ5LXByb2R1Y3QtaXRlbS9zaG9waWZ5LXByb2R1Y3QtaXRlbS5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL2NvbXBvbmVudHMvc2hvcGlmeS1wcm9kdWN0L3Nob3BpZnktcHJvZHVjdC5jb21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9zaG9waWZ5LXByb2R1Y3Qvc2hvcGlmeS1wcm9kdWN0LmNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdHMvY29tcG9uZW50cy9zd2l0Y2hlci9zd2l0Y2hlci5jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RzL3NlcnZpY2VzL1V0aWxzLnRzIiwid2VicGFjazovLy8uL3NyYy90cy9zZXJ2aWNlcy90cmFja2luZy5zZXJ2aWNlcy50cyJdLCJuYW1lcyI6WyJjb2xsYXBzZU9uVXJsQmluZGVyIiwibmFtZSIsInJvdXRpbmUiLCJlbCIsInVybCIsIiRlbCIsIiQiLCJjb2xsYXBzZVNlcnZpY2UiLCJDb2xsYXBzZVNlcnZpY2UiLCJkaXNwYXRjaGVyIiwiRXZlbnREaXNwYXRjaGVyIiwiY2hlY2tVUkwiLCJ1cmxUb0NoZWNrIiwiVXRpbHMiLCJvblJvdXRlIiwiaGlkZSIsIm9uIiwiY29sbGFwc2VCaW5kZXIiLCJ0YXJnZXRTZWxlY3RvciIsIiR0YXJnZXQiLCJvblN0YXRlQ2hhbmdlIiwiaXNDb2xsYXBzZWQiLCJhZGRDbGFzcyIsIkNMQVNTTkFNRSIsIkNPTExBUFNFRCIsImF0dHIiLCJyZW1vdmVDbGFzcyIsIkVWRU5UIiwiU0hPV04iLCJISURERU4iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidG9nZ2xlIiwiQ09MTEFQU0UiLCJTSE9XIiwidHJpZ2dlciIsImhhc0NsYXNzIiwiaXNFeHBhbmRlZCIsInNob3ciLCJEQVRBX0tFWSIsIkVWRU5UX0tFWSIsIkhJREUiLCJDTElDS19EQVRBX0FQSSIsIkRBVEFfQVBJX0tFWSIsIkNPTExBUFNJTkciLCJleHBhbk9uVXJsQmluZGVyIiwic2Nyb2xsc3B5U3RhckJpbmRlciIsIm5hdGl2ZUlEVGFyZ2V0U2VsZWN0b3IiLCJyZXBsYWNlIiwidGFyZ2V0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNsYXNzTmFtZSIsImFyZ3MiLCJpc0luVmlld3BvcnQiLCJlbGVtIiwiZGlzdGFuY2UiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0b3AiLCJoZWlnaHQiLCJib3R0b20iLCJvblNjcm9sbCIsImlzIiwicHJvcCIsIndpbmRvdyIsIm9mZiIsIm1haWx0b0JpbmRlciIsInZhbHVlIiwiRHJhZ3Njcm9sbCIsImRldGVjdEdsb2JhbE1vdmUiLCJEZWJ1ZyIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJtZCIsImJpbmQiLCJhZGRFdmVudExpc3RlbmVyIiwibXUiLCJtbSIsImUiLCJwdXNoZWQiLCJsYXN0Q2xpZW50WCIsImNsaWVudFgiLCJsYXN0Q2xpZW50WSIsImNsaWVudFkiLCJuZXdTY3JvbGxYIiwibmV3U2Nyb2xsWSIsInNjcm9sbExlZnQiLCJzY3JvbGxUb3AiLCJib2R5IiwiZG9jdW1lbnRFbGVtZW50Iiwic2Nyb2xsYmFyRHJhZ2FibGVCaW5kZXIiLCJkcmFnc2Nyb2xsIiwiZGVidWciLCJvbldoZWVsIiwid2hlZWxEZWx0YSIsImRldGFpbCIsInNjcm9sbGZpeEJpbmRlciIsIkpRdWVyeSIsImhvdmVyIiwiYmFja2dyb3VuZENvbG9yU3RhckJpbmRlciIsImNvbG9yIiwidG9TdHJpbmciLCJjc3MiLCJiYWNrZ3JvdW5kSW1hZ2VCaW5kZXIiLCJvcGFjaXR5U3RhckJpbmRlciIsIm9wYWNpdHkiLCJ0ZWxCaW5kZXIiLCJEcm9wZG93bkNvbXBvbmVudCIsImVsZW1lbnQiLCJzZWxmIiwiZHJvcGRvd25TZXJ2aWNlIiwiRHJvcGRvd25TZXJ2aWNlIiwiZmluZCIsImluaXQiLCJvYnNlcnZlZEF0dHJpYnV0ZXMiLCJjb250ZXh0Iiwic3RvcFByb3BhZ2F0aW9uIiwiQ29tcG9uZW50IiwiTkFNRSIsIlZFUlNJT04iLCJFU0NBUEVfS0VZQ09ERSIsIlNQQUNFX0tFWUNPREUiLCJUQUJfS0VZQ09ERSIsIkFSUk9XX1VQX0tFWUNPREUiLCJBUlJPV19ET1dOX0tFWUNPREUiLCJSSUdIVF9NT1VTRV9CVVRUT05fV0hJQ0giLCJSRUdFWFBfS0VZRE9XTiIsIlJlZ0V4cCIsIkNMSUNLIiwiS0VZRE9XTl9EQVRBX0FQSSIsIktFWVVQX0RBVEFfQVBJIiwiRElTQUJMRUQiLCJEUk9QVVAiLCJEUk9QUklHSFQiLCJEUk9QTEVGVCIsIk1FTlVSSUdIVCIsIk1FTlVMRUZUIiwiUE9TSVRJT05fU1RBVElDIiwiU0VMRUNUT1IiLCJEQVRBX1RPR0dMRSIsIkZPUk1fQ0hJTEQiLCJNRU5VIiwiTkFWQkFSX05BViIsIlZJU0lCTEVfSVRFTVMiLCJBVFRBQ0hNRU5UTUFQIiwiVE9QIiwiVE9QRU5EIiwiQk9UVE9NIiwiQk9UVE9NRU5EIiwiUklHSFQiLCJSSUdIVEVORCIsIkxFRlQiLCJMRUZURU5EIiwiREVGQVVMVCIsIm9mZnNldCIsImZsaXAiLCJib3VuZGFyeSIsInJlZmVyZW5jZSIsImRpc3BsYXkiLCJERUZBVUxUVFlQRSIsIiRtZW51cyIsImVhY2giLCJpbmRleCIsIm1lbnUiLCIkbWVudSIsIiRkcm9wZG93biIsImNsb3Nlc3QiLCJjbG9zZSIsInRyaWdnZXJDbG9zZUVsZW1lbnQiLCJyZWxhdGVkVGFyZ2V0IiwiJHBhcmVudCIsIl9nZXRQYXJlbnRGcm9tRWxlbWVudCIsIkV2ZW50Iiwid2hpY2giLCJ0eXBlIiwidG9nZ2xlcyIsInNsaWNlIiwiY2FsbCIsImdldCIsImkiLCJwYXJlbnQiLCJkYXRhIiwiY2xpY2tFdmVudCIsImRyb3Bkb3duTWVudSIsInRlc3QiLCJ0YWdOYW1lIiwiY29udGFpbnMiLCJoaWRlRXZlbnQiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJjaGlsZHJlbiIsIm5vb3AiLCJzZXRBdHRyaWJ1dGUiLCJjb25maWciLCJfZWxlbWVudCIsIl9wb3BwZXIiLCJfY29uZmlnIiwiX2dldENvbmZpZyIsIl9tZW51IiwiX2dldE1lbnVFbGVtZW50IiwiX2luTmF2YmFyIiwiX2RldGVjdE5hdmJhciIsImNsb3VzZU9uQ2xpY2tPdXRzaXRlIiwiZGlzYWJsZWQiLCJpc0FjdGl2ZSIsIl9jbGVhck1lbnVzIiwic2hvd0V2ZW50IiwiUG9wcGVyIiwiVHlwZUVycm9yIiwicmVmZXJlbmNlRWxlbWVudCIsImlzRWxlbWVudCIsImpxdWVyeSIsIl9nZXRQb3BwZXJDb25maWciLCJsZW5ndGgiLCJmb2N1cyIsInRvZ2dsZUNsYXNzIiwicmVtb3ZlRGF0YSIsImRlc3Ryb3kiLCJzY2hlZHVsZVVwZGF0ZSIsIiRlbGVtZW50Iiwib3V0c2lkZUNsaWNrTGlzdGVuZXIiLCJyZW1vdmVDbGlja0xpc3RlbmVyIiwiRGVmYXVsdCIsInR5cGVDaGVja0NvbmZpZyIsIkRlZmF1bHRUeXBlIiwiJHBhcmVudERyb3Bkb3duIiwicGFyZW50Tm9kZSIsInBsYWNlbWVudCIsIm9mZnNldENvbmYiLCJmbiIsIm9mZnNldHMiLCJwb3BwZXJDb25maWciLCJfZ2V0UGxhY2VtZW50IiwibW9kaWZpZXJzIiwiZW5hYmxlZCIsInByZXZlbnRPdmVyZmxvdyIsImJvdW5kYXJpZXNFbGVtZW50IiwiYXBwbHlTdHlsZSIsIlRhYnNDb21wb25lbnQiLCJjb25zb2xlIiwid2FybiIsIiR0YWJzIiwiJHRhYlBhbmVzIiwiJHNjcm9sbGFibGUiLCIkdGFiIiwiYWN0aXZhdGUiLCJ0YWJTY3JvbGxQb3NpdGlvbiIsInNjcm9sbExlZnRUbyIsImxlZnQiLCJhbmltYXRlIiwiZmlyc3QiLCJ0YWJzU2FtZUhlaWdodCIsInNldEhlaWdodCIsImhlaWdlc3QiLCIkdGFiUGFuZSIsImRlYWN0aXZhdGVBbGwiLCJzZXRUaW1lb3V0IiwiQ29udGFjdEZvcm1Db21wb25lbnQiLCJMb2NhbGVzU2VydmljZSIsImZvcm0iLCJmaXJzdE5hbWUiLCJsYXN0TmFtZSIsInBob25lIiwiZW1haWwiLCJtZXNzYWdlIiwidmFsaWRhdGlvbiIsImdldFZhbGlkYXRpb25PYmplY3QiLCJzZW5kIiwic2VsZWN0QWxsIiwiZXJyb3IiLCJzdWNjZXNzIiwic2NvcGUiLCJzdHJpcEh0bWwiLCIkZm9ybSIsInZhbGlkYXRlIiwidmFsaWQiLCJldmVudEVsIiwiZm9ybVZhbHVlcyIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwicnVsZXMiLCJyZXF1aXJlZCIsImlzU3RyaW5nIiwiaXNVbmRlZmluZWQiLCJpc051bWJlciIsIm1heCIsIm1pbiIsIm1heGxlbmd0aCIsIm1pbmxlbmd0aCIsImlzRW1haWwiLCJpbmRleE9mIiwiaXNQaG9uZSIsInN0cmluZ0lzUGhvbmVOdW1iZXIiLCJvbmx5TnVtYmVycyIsInN0cmluZ0hhc09ubHlOdW1iZXJzIiwiY2hlY2tWYWxpZGl0eSIsImhhc0NoaWxkTm9kZXMiLCJ0ZW1wbGF0ZSIsIkNvb2tpZUJhbm5lckNvbXBvbmVudCIsImNvb2tpZSIsImNvb2tpZUFjY2VwdGVkU3RyaW5nIiwiYWNjZXB0ZWQiLCJhY2NlcHQiLCJjb29raWVBY2NlcHRlZCIsIkRlYnVnQmFyQ29tcG9uZW50IiwiaGFzUHJldmlld0JhciIsImhhc0FkbWluQmFyIiwidG9nZ2xlQmFyIiwiaGlkZGVuIiwib2xkVmFsdWUiLCJuZXdWYWx1ZSIsIm5hbWVzcGFjZSIsImZvcmNlSGlkZSIsIiRwcmV2aWV3QmFyIiwiZWxlbWVudElzVmlzYWJsZSIsInJlbW92ZUF0dHIiLCIkYWRtaW5CYXIiLCJlbGVtZW50SXNIaWRkZW4iLCJoYXNBdHRyaWJ1dGUiLCJEZWxldGVEYXRhRm9ybUNvbXBvbmVudCIsIkZzYmRyTWFpbmJhckNvbXBvbmVudCIsImFzc2lnbiIsIm9wZW4iLCJtZW51T3BlbiIsIiRsb2dvVG9wIiwidGhlbiIsInZpZXciLCJhdHRyaWJ1dGVOYW1lIiwiRnNiZHJWaWRlb0NvbXBvbmVudCIsIlZpZGVvQ29tcG9uZW50IiwiSWNvbkNvbXBvbmVudCIsImF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayIsImxvYWQiLCJtYXRjaCIsImpvaW4iLCJzaXplIiwid2lkdGgiLCJkaXJlY3Rpb24iLCJjbGFzc1N0cmluZyIsIkluc3RhZ3JhbVNjcm9sbGJhckNvbXBvbmVudCIsImluc3RhZ3JhbUlkIiwidW5kZWZpbmVkIiwib3BlbkxpbmtzIiwib3BlblVybCIsImxpbWl0Iiwib25UYXAiLCJtZWRpYSIsIlBqYXgiLCIkc2NvbGxXaXRoIiwicGpheCIsImdvVG8iLCJiaW5kaW5nIiwiZmFjdG9yIiwiY2xpZW50V2lkdGgiLCJnZXRWaWV3cG9ydERpbWVuc2lvbnMiLCJ3IiwiRXJyb3IiLCJJbnN0YWdyYW1TZXJ2aWNlIiwibG9hZE1lZGlhIiwicmVzcG9uc2UiLCJjYXRjaCIsIkluc3RhZ3JhbUNvbXBvbmVudCIsInJlamVjdCIsIk5ld3NsZXR0ZXJDb21wb25lbnQiLCJzdWJzY3JpYmUiLCJmaWVsZHMiLCJzdWJtaXQiLCJ2YWxpZGF0aW9uU2NvcGUiLCJmb3JtRWwiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsImluaXRWYWxpZGF0aW9uIiwiUHJpdmFjeVNldHRpbmdzQ29tcG9uZW50IiwidGhlVHJhZGVEZXNrIiwibW9kZWwiLCJzeXN0ZW0iLCJ0aGVtZVNldHRpbmdzIiwiZ29vZ2xlQW5hbHl0aWNzIiwicGludGVyZXN0VGFnIiwiZmFjZWJvb2tQaXhlbCIsImNvb2tpZXMiLCJzaG9waWZ5QW5hbHl0aWNzIiwiaG9zdG5hbWUiLCJsb2NhdGlvbiIsIm9uQ29va2llc1N0b3JhZ2VDaGFuZ2VkIiwib25UaGVUcmFkZURlc2tDaGFuZ2VkIiwib25Hb29nbGVBbmFseXRpY3NDaGFuZ2VkIiwib25GYWNlYm9va1BpeGVsQ2hhbmdlZCIsIm9uUGludGVyZXN0VGFnQ2hhbmdlZCIsIm9uQ2xlYXJEYXRhQ2xpY2tlZCIsImRvTm90VHJhY2siLCJuYXZpZ2F0b3IiLCJ0cmFja2luZ1NlcnZpY2UiLCJUcmFja2luZ1NlcnZpY2UiLCJnb29nbGVBbmFseXRpY3NEaXNhYmxlZCIsInRoZVRyYWRlRGVza0Rpc2FibGVkIiwiZmFjZWJvb2tQaXhlbERpc2FibGVkIiwicGludGVyZXN0VGFnRGlzYWJsZWQiLCJTaG9waWZ5Q2FydFNlcnZpY2UiLCJjbGVhciIsInJlbW92ZUNvb2tpZXMiLCJ0aGVUcmFkZURlc2tEaXNhYmxlU3RyIiwiZ29vZ2xlQW5hbHl0aWNzRGlzYWJsZVN0ciIsImZhY2Vib29rUGl4ZWxEaXNhYmxlU3RyIiwicmVsb2FkIiwiY29va2llU3RvcmFnZURpc2FibGVkIiwiUHJvZHVjdFNjcm9sbGJhckNvbXBvbmVudCIsIm9uUHJvZHVjdFRhcCIsIm9uUHJvZHVjdE1vdXNlZW50ZXIiLCJ0aXRsZSIsIlByZWZldGNoIiwiJHByb2R1Y3RzIiwicHJlZmV0Y2giLCJvbkxpbmtFbnRlciIsInByb2R1Y3QiLCJwcm9kdWN0RGF0YSIsImRhdGFzZXQiLCJwYXJlbnRSZWN0IiwiZWxlbWVudFJlY3QiLCJlbGVtZW50TWlkZGxlIiwiY2VudGVyWCIsIlJldm9rZUZvcm1Db21wb25lbnQiLCJTaGFyZUNvbXBvbmVudCIsImZiaWQiLCJ0ZXh0IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicmVkaXJlY3RVcmkiLCJ1cmxzIiwid2hhdHNhcHAiLCJpc0Rlc2t0b3AiLCJ0ZWxlZ3JhbSIsImZhY2Vib29rIiwic21zIiwidGV4dEkxOG4iLCJocmVmIiwibGFiZWwiLCJsYWJlbEkxOG4iLCJzaGFyZSIsImlzQW5kcm9pZCIsInVzZXJBZ2VudCIsImlzSW9zIiwic2hhcmVVcmxzIiwiaXNOYXRpdmUiLCJyZXNvbHZlIiwiXyIsImNsb3NlQWxsIiwibG9jYWxlc1NlcnZpY2UiLCJsYW5nY29kZSIsInRyYW5zbGF0ZSIsInJlYWR5IiwiZ2V0TGFuZ2NvZGUiLCJ0cmFuc2xhdGlvbk5lZWRlZCIsInNwbGl0IiwibG9jYWwiLCJpbml0VHJhbnNsYXRlIiwiU2hvcGlmeUFkZHJlc3Nlc0NvbXBvbmVudCIsImNyZWF0ZUFkZHJlc3MiLCJzaG93Rm9ybUlkIiwiZWRpdEFkZHJlc3MiLCJlZGl0IiwiY3JlYXRlIiwiZGVsZXRlIiwiaWQiLCIkY3JlYXRlQWRkcmVzc0Zvcm0iLCIkZWRpdEFkZHJlc3NGb3JtIiwiU2hvcGlmeUFydGljbGVJdGVtQ29tcG9uZW50IiwiU2hvcGlmeUNhcnRCdXR0b25Db21wb25lbnQiLCJjYXJ0IiwiY2FydEl0ZW1Db3VudCIsIml0ZW1fY291bnQiLCJzdGFydEFkZEFuaW1hdGlvbiIsInBlbmRpbmciLCJjYXJ0VXJsIiwiaGlzdG9yeSIsImJhY2siLCJnZXRJbnN0YW5jZSIsInNob3BpZnlDYXJ0RXZlbnREaXNwYXRjaGVyIiwiU2hvcGlmeUNhcnRDb21wb25lbnQiLCJzaGlwcGluZ0FkZHJlc3MiLCJlc3RpbWF0ZVNoaXBwaW5nUmF0ZSIsImdldFNoaXBwaW5nUmF0ZXMiLCJ0cmlnZ2VyT25DaGFuZ2UiLCJ0cmlnZ2VyT25Db21wbGV0ZSIsInRyaWdnZXJPblN0YXJ0Iiwic2hpcHBpbmdSYXRlcyIsInJlbW92ZSIsInJlbW92ZUNhcnQiLCJpbmNyZWFzZSIsImRlY3JlYXNlIiwiY2xvc2VEcm9wZG93bnMiLCJsaW5lSXRlbSIsImxpbmVJbmRleCIsImNoYW5nZSIsInZhcmlhbnRfaWQiLCJxdWFudGl0eSIsIlNob3BpZnlDb21tZW50c0Zvcm1Db21wb25lbnQiLCJjdXN0b21lciIsInBhc3N3b3JkIiwibG9naW5DdXN0b21lciIsImNyZWF0ZUN1c3RvbWVyIiwicmVjb3ZlckN1c3RvbWVyIiwicG9zdCIsIiRuZXdDb21tZW50Rm9ybSIsIlNob3BpZnlGaWx0ZXJDb21wb25lbnQiLCJsaW5rbGlzdCIsImxpbmtsaXN0cyIsImZpbHRlciIsImNvbGxlY3Rpb25VcmwiLCJzdG9yaWVzRmlsdGVyQnkiLCJzY3JvbGxUbyIsImZpbHRlckhhbmRsZSIsInNob3BpZnlUZW1wbGF0ZSIsImRpcmVjdG9yeSIsInNlbGVjdG9yIiwiaGFuZGxlIiwicmFkaW9FbGVtZW50IiwiY2hpbGROb2RlcyIsImNoZWNrZWQiLCJjdXJFbCIsIiRsaXN0SXRlbSIsImluZGV4T2ZJZ25vcmVDYXNlIiwidGFncyIsInB1Ymxpc2giLCJoYXNPd25Qcm9wZXJ0eSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJhcnIiLCJ0b0xvd2VyQ2FzZSIsInN0ciIsIlNob3BpZnlMaW5rbGlzdENvbXBvbmVudCIsImxpbmsiLCJjb2xsYXBzZWQiLCJ0cmFuc2Zvcm1MaW5rbGlzdCIsImxpbmtzIiwiY29sbGFwc2VhYmxlIiwiU2hvcGlmeUxvZ2luRm9ybUNvbXBvbmVudCIsImxvZ2luIiwicmVjb3ZlciIsInJlY292ZXJCYWNrIiwiJGxvZ2luQ3VzdG9tZXJGb3JtIiwiJGNyZWF0ZUN1c3RvbWVyRm9ybSIsIiRyZWNvdmVyQ3VzdG9tZXJGb3JtIiwiU2hvcGlmeVByb2R1Y3RJdGVtQ29tcG9uZW50IiwiYXZhaWxhYmxlIiwib3B0aW9uQ2hvb3NlZCIsInNob3dEZXRhaWxNZW51IiwiU2hvcGlmeVByb2R1Y3RTZXJ2aWNlIiwicHJlcGFpciIsImNvbG9yT3B0aW9uIiwiZ2V0T3B0aW9uIiwic2l6ZU9wdGlvbiIsInZhcmlhbnQiLCJ2YXJpYW50cyIsInNlbGVjdGVkT3B0aW9ucyIsIm9wdGlvbnMiLCJhY3RpdmF0ZU9wdGlvbnMiLCJjaG9vc2VPcHRpb24iLCJhZGRUb0NhcnQiLCJ0b2dnbGVEZXRhaWxNZW51Iiwic2hvd01lbnUiLCJvcHRpb25WYWx1ZSIsInBvc2l0aW9uMSIsIm9wdGlvbk5hbWUiLCJnZXRWYXJpYW50T2ZPcHRpb25zIiwiYWRkIiwiYWxsT3B0aW9ucyIsInRvTG9jYWxlTG93ZXJDYXNlIiwiY2xhc3NMaXN0IiwiYWN0aXZlT3B0aW9ucyIsInBvc2l0aW9uMCIsImFjdGl2YXRlT3B0aW9uIiwiSU1BR0VTX1BFUl9ST1ciLCJTaG9waWZ5UHJvZHVjdENvbXBvbmVudCIsInByZXBhaXJWYXJpYW50IiwiaW1hZ2VzIiwiZmluZEltYWdlIiwiY2xlYXJGaW5kSW1hZ2UiLCJpbWFnZSIsImNsZWFySW1hZ2UiLCJnZW5lcmFsSW1hZ2VzIiwiaW5jbHVkZXMiLCJwdXNoIiwiZmVhdHVyZWRfaW1hZ2UiLCJzcmMiLCJpbmRleE9mVXJsIiwic3BsaWNlIiwib3B0aW9uIiwib3B0aW9uSW1hZ2VzIiwiZmFsbGJhY2tJbWFnZVNyYyIsImZlYXR1cmVkSW1hZ2UiLCJwb3NpdGlvbiIsInByb2R1Y3RfaWQiLCJ2YXJpYW50X2lkcyIsImFsdCIsImNyZWF0ZWRfYXQiLCJ1cGRhdGVkX2F0IiwibGVmdG92ZXJQaWN0dXJlQ291bnQiLCJyb3dMZW5ndGgiLCJNYXRoIiwiZmxvb3IiLCJyb3dzIiwiQXJyYXkiLCJjbGFzcyIsInNpemVzIiwiaW1hZ2VJbmRleCIsInJvd0luZGV4IiwiY3VycmVudFJvdyIsInJvd0ltYWdlSW5kZXgiLCJyb3dJbWFnZSIsImdldE9wdGlvbkltYWdlcyIsImdldEZlYXR1cmVkSW1hZ2UiLCJjb25jYXQiLCJnZXRHZW5lcmFsSW1hZ2VzIiwiaW1hZ2VSb3dzIiwiZ2V0SW1hZ2VSb3dzIiwiVGRhSTE4blN3aXRjaGVyQ29tcG9uZW50IiwibGFuZ2NvZGVzIiwic3dpdGNoIiwiQUkxOG5Td2l0Y2hlckNvbXBvbmVudCIsIlRURFVuaXZlcnNhbFBpeGVsQXBpV3JhcHBlciIsIk1haW4iLCJSaWJhIiwieWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInN0b3JpZXMiLCJyaWJhIiwibW9kdWxlIiwicmVnaXN0IiwiY29tcG9uZW50cyIsIkN1c3RvbUNvbXBvbmVudHMiLCJiaW5kZXJzIiwiY3VzdG9tQmluZGVycyIsImNvcmVNb2R1bGUiLCJyb3V0ZXJNb2R1bGUiLCJzaG9waWZ5TW9kdWxlIiwiaTE4bk1vZHVsZSIsImdsb2JhbFRvZ2dsZSIsInNob3BpZnkiLCJTaG9waWZ5IiwidHJhY2tpbmciLCJtYWluIiwidGFyZyIsIiR0YXJnIiwic3JjRWxlbWVudCIsIm5vZGVUeXBlIiwicG9zeCIsInBvc3kiLCJvcmlnaW5hbEV2ZW50IiwiY2hhbmdlZFRvdWNoZXMiLCJwYWdlWCIsInBhZ2VZIiwidG91Y2hlcyIsIngiLCJ5IiwicGFnZVlTY3JvbGwiLCJwYWdlWU9mZnNldCIsInBhZ2VYU2Nyb2xsIiwicGFnZVhPZmZzZXQiLCJyZWN0IiwicmVzdWx0IiwicGFyZW50U2VsZWN0b3IiLCJlbGVtZW50UG9zIiwiZ2V0RWxlbWVudFBvc2l0aW9uIiwicGFyZW50RWxlbWVudFBvcyIsImgiLCJtb3VzZVBvc0RvYyIsImV2ZW50UG9zaXRpb25Eb2N1bWVudCIsImV2ZW50VGFyZ2V0IiwidGFyZ2V0UG9zIiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJvYmoiLCJtYXRjaGVzIiwiY29tcG9uZW50TmFtZSIsImNvbmZpZ1R5cGVzIiwicHJvcGVydHkiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJleHBlY3RlZFR5cGVzIiwidmFsdWVUeXBlIiwidG9UeXBlIiwidG9VcHBlckNhc2UiLCJnZXRBdHRyaWJ1dGUiLCJxdWVyeVNlbGVjdG9yIiwiZXJyIiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzZWxlY3QiLCJzZXRTZWxlY3Rpb25SYW5nZSIsImdldFNlbGVjdGlvbiIsInJhbmdlIiwiY3JlYXRlUmFuZ2UiLCJzZWxlY3ROb2RlQ29udGVudHMiLCJzZWxlY3Rpb24iLCJyZW1vdmVBbGxSYW5nZXMiLCJhZGRSYW5nZSIsInNlbGVjdEFsbENoaWxkcmVuIiwiY3JlYXRlVGV4dFJhbmdlIiwibW92ZVRvRWxlbWVudFRleHQiLCJleGVjQ29tbWFuZCIsInRpbnliaW5kVXRpbHMiLCJodG1sIiwidG1wIiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsInRleHRDb250ZW50IiwiaW5uZXJUZXh0IiwiX2dhIiwiZ2EiLCJfZmJxIiwiZmJxIiwicGludGVyZXN0VGFnRGlzYWJsZVN0ciIsIl9waW50cmsiLCJwaW50cmsiLCJibG9ja0Nvb2tpZXMiLCJ1bmJsb2NrQ29va2llcyIsInNldHRpbmdzIiwidHJhY2tpbmdJZCIsImNoZWNrRGlzYWJsZVRyYWNraW5nQ29va2llcyIsIl9jb29raWUiLCJzZXQiLCJfX2xvb2t1cEdldHRlcl9fIiwiX19sb29rdXBTZXR0ZXJfXyIsImluc3RhbmNlIiwidmlld0lkIiwiY3VycmVudFN0YXR1cyIsInByZXZTdGF0dXMiLCIkY29udGFpbmVyIiwibmV3UGFnZVJhd0hUTUwiLCJpc0ZpcnN0UGFnZUxvYWQiLCJ0cmFja2luZ0NhbGxiYWNrIiwiX19kZWZpbmVHZXR0ZXJfXyIsIl9fZGVmaW5lU2V0dGVyX18iLCJjb29raWVFbnRyeSIsInRyaW0iLCJ0b1VUQ1N0cmluZyIsImlnbm9yZSIsImNvb2tpZUtleXMiLCJnZXRDb29raWVLZXlzIiwiY29va2llS2V5IiwiZGVsZXRlQ29va2llIiwiZGVsZXRlQ29va2llT25TZXJ2ZXIiLCJ0dGRfZG9tX3JlYWR5IiwiVFREVW5pdmVyc2FsUGl4ZWxBcGkiLCJ1bml2ZXJzYWxQaXhlbEFwaSIsImFkdiIsInRhZ0lkIiwiYmFzZVNyYyIsImdldFZlcnNpb24iLCJkYXRhTGF5ZXIiLCJndGFnIiwiYXJndW1lbnRzIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSxRQUFRLG9CQUFvQjtRQUM1QjtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLGlCQUFpQiw0QkFBNEI7UUFDN0M7UUFDQTtRQUNBLGtCQUFrQiwyQkFBMkI7UUFDN0M7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtR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QVg7QUFDRDtBQUVGO0FBN1ZIOztBQUFBO0FBQUE7O3FGQUFhNFMsZSIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xuIFx0ZnVuY3Rpb24gd2VicGFja0pzb25wQ2FsbGJhY2soZGF0YSkge1xuIFx0XHR2YXIgY2h1bmtJZHMgPSBkYXRhWzBdO1xuIFx0XHR2YXIgbW9yZU1vZHVsZXMgPSBkYXRhWzFdO1xuIFx0XHR2YXIgZXhlY3V0ZU1vZHVsZXMgPSBkYXRhWzJdO1xuXG4gXHRcdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuIFx0XHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcbiBcdFx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMCwgcmVzb2x2ZXMgPSBbXTtcbiBcdFx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG4gXHRcdFx0XHRyZXNvbHZlcy5wdXNoKGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSk7XG4gXHRcdFx0fVxuIFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IDA7XG4gXHRcdH1cbiBcdFx0Zm9yKG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZihwYXJlbnRKc29ucEZ1bmN0aW9uKSBwYXJlbnRKc29ucEZ1bmN0aW9uKGRhdGEpO1xuXG4gXHRcdHdoaWxlKHJlc29sdmVzLmxlbmd0aCkge1xuIFx0XHRcdHJlc29sdmVzLnNoaWZ0KCkoKTtcbiBcdFx0fVxuXG4gXHRcdC8vIGFkZCBlbnRyeSBtb2R1bGVzIGZyb20gbG9hZGVkIGNodW5rIHRvIGRlZmVycmVkIGxpc3RcbiBcdFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2guYXBwbHkoZGVmZXJyZWRNb2R1bGVzLCBleGVjdXRlTW9kdWxlcyB8fCBbXSk7XG5cbiBcdFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiBhbGwgY2h1bmtzIHJlYWR5XG4gXHRcdHJldHVybiBjaGVja0RlZmVycmVkTW9kdWxlcygpO1xuIFx0fTtcbiBcdGZ1bmN0aW9uIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCkge1xuIFx0XHR2YXIgcmVzdWx0O1xuIFx0XHRmb3IodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGRlZmVycmVkTW9kdWxlID0gZGVmZXJyZWRNb2R1bGVzW2ldO1xuIFx0XHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuIFx0XHRcdGZvcih2YXIgaiA9IDE7IGogPCBkZWZlcnJlZE1vZHVsZS5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0dmFyIGRlcElkID0gZGVmZXJyZWRNb2R1bGVbal07XG4gXHRcdFx0XHRpZihpbnN0YWxsZWRDaHVua3NbZGVwSWRdICE9PSAwKSBmdWxmaWxsZWQgPSBmYWxzZTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYoZnVsZmlsbGVkKSB7XG4gXHRcdFx0XHRkZWZlcnJlZE1vZHVsZXMuc3BsaWNlKGktLSwgMSk7XG4gXHRcdFx0XHRyZXN1bHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IGRlZmVycmVkTW9kdWxlWzBdKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHRyZXR1cm4gcmVzdWx0O1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJtYWluXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBcIl0gfHwgW107XG4gXHR2YXIgb2xkSnNvbnBGdW5jdGlvbiA9IGpzb25wQXJyYXkucHVzaC5iaW5kKGpzb25wQXJyYXkpO1xuIFx0anNvbnBBcnJheS5wdXNoID0gd2VicGFja0pzb25wQ2FsbGJhY2s7XG4gXHRqc29ucEFycmF5ID0ganNvbnBBcnJheS5zbGljZSgpO1xuIFx0Zm9yKHZhciBpID0gMDsgaSA8IGpzb25wQXJyYXkubGVuZ3RoOyBpKyspIHdlYnBhY2tKc29ucENhbGxiYWNrKGpzb25wQXJyYXlbaV0pO1xuIFx0dmFyIHBhcmVudEpzb25wRnVuY3Rpb24gPSBvbGRKc29ucEZ1bmN0aW9uO1xuXG5cbiBcdC8vIGFkZCBlbnRyeSBtb2R1bGUgdG8gZGVmZXJyZWQgbGlzdFxuIFx0ZGVmZXJyZWRNb2R1bGVzLnB1c2goWzAsXCJ2ZW5kb3JzLm1haW5cIl0pO1xuIFx0Ly8gcnVuIGRlZmVycmVkIG1vZHVsZXMgd2hlbiByZWFkeVxuIFx0cmV0dXJuIGNoZWNrRGVmZXJyZWRNb2R1bGVzKCk7XG4iLCJpbXBvcnQgeyBJQmluZGVyLCBFdmVudERpc3BhdGNoZXIsIEpRdWVyeSBhcyAkIH0gZnJvbSAnQHJpYmFqcy9jb3JlJztcbmltcG9ydCB7IENvbGxhcHNlU2VydmljZSB9IGZyb20gJy4vY29sbGFwc2Uuc2VydmljZSc7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL1V0aWxzJztcblxuLyoqXG4gKlxuICogQHNlZSBodHRwczovL2dldGJvb3RzdHJhcC5jb20vZG9jcy80LjEvY29tcG9uZW50cy9jb2xsYXBzZS9cbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvdjQtZGV2L2pzL3NyYy9jb2xsYXBzZS5qc1xuICovXG5leHBvcnQgY29uc3QgY29sbGFwc2VPblVybEJpbmRlcjogSUJpbmRlcjxzdHJpbmc+ID0ge1xuICBuYW1lOiAnYnM0LWNvbGxhcHNlLW9uLXVybCcsXG4gIHJvdXRpbmUoZWw6IEhUTUxFbGVtZW50LCB1cmw6IHN0cmluZykge1xuICAgIGNvbnN0ICRlbCA9ICQoZWwpO1xuICAgIGNvbnN0IGNvbGxhcHNlU2VydmljZSA9IG5ldyBDb2xsYXBzZVNlcnZpY2UoJGVsKTtcbiAgICBjb25zdCBkaXNwYXRjaGVyID0gbmV3IEV2ZW50RGlzcGF0Y2hlcignbWFpbicpO1xuXG4gICAgY29uc3QgY2hlY2tVUkwgPSAodXJsVG9DaGVjaz86IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHVybFRvQ2hlY2sgJiYgVXRpbHMub25Sb3V0ZSh1cmxUb0NoZWNrKSkge1xuICAgICAgICBjb2xsYXBzZVNlcnZpY2UuaGlkZSgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIGNvbGxhcHNlU2VydmljZS5zaG93KCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIGRpc3BhdGNoZXIub24oJ25ld1BhZ2VSZWFkeScsICgpID0+IGNoZWNrVVJMKHVybCkpO1xuXG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgSUJpbmRlciwgSlF1ZXJ5IGFzICQgfSBmcm9tICdAcmliYWpzL2NvcmUnO1xuaW1wb3J0IHsgQ29sbGFwc2VTZXJ2aWNlIH0gZnJvbSAnLi9jb2xsYXBzZS5zZXJ2aWNlJztcblxuLyoqXG4gKlxuICogQHNlZSBodHRwczovL2dldGJvb3RzdHJhcC5jb20vZG9jcy80LjEvY29tcG9uZW50cy9jb2xsYXBzZS9cbiAqL1xuZXhwb3J0IGNvbnN0IGNvbGxhcHNlQmluZGVyOiBJQmluZGVyPHN0cmluZz4gPSB7XG4gIG5hbWU6ICdiczQtY29sbGFwc2UnLFxuICByb3V0aW5lKGVsOiBIVE1MRWxlbWVudCwgdGFyZ2V0U2VsZWN0b3I6IHN0cmluZykge1xuICAgIGNvbnN0ICRlbCA9ICQoZWwpO1xuICAgIGNvbnN0ICR0YXJnZXQgPSAkKHRhcmdldFNlbGVjdG9yKTtcblxuICAgIGNvbnN0IGNvbGxhcHNlU2VydmljZSA9IG5ldyBDb2xsYXBzZVNlcnZpY2UoJHRhcmdldCk7XG5cbiAgICBjb25zdCBvblN0YXRlQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgaWYgKGNvbGxhcHNlU2VydmljZS5pc0NvbGxhcHNlZCgpKSB7XG4gICAgICAgICRlbFxuICAgICAgICAuYWRkQ2xhc3MoQ29sbGFwc2VTZXJ2aWNlLkNMQVNTTkFNRS5DT0xMQVBTRUQpXG4gICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkZWxcbiAgICAgICAgLnJlbW92ZUNsYXNzKENvbGxhcHNlU2VydmljZS5DTEFTU05BTUUuQ09MTEFQU0VEKVxuICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgICR0YXJnZXQub24oQ29sbGFwc2VTZXJ2aWNlLkVWRU5ULlNIT1dOLCBvblN0YXRlQ2hhbmdlKTtcblxuICAgICR0YXJnZXQub24oQ29sbGFwc2VTZXJ2aWNlLkVWRU5ULkhJRERFTiwgb25TdGF0ZUNoYW5nZSk7XG5cbiAgICAkZWwub24oJ2NsaWNrJywgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29sbGFwc2VTZXJ2aWNlLnRvZ2dsZSgpO1xuICAgIH0pO1xuXG4gICAgb25TdGF0ZUNoYW5nZSgpO1xuXG4gIH0sXG59O1xuIiwiLyoqXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi92NC1kZXYvanMvc3JjL2NvbGxhcHNlLmpzXG4gKi9cbmV4cG9ydCBjbGFzcyBDb2xsYXBzZVNlcnZpY2Uge1xuXG4gIHB1YmxpYyBzdGF0aWMgREFUQV9LRVkgICAgICAgICAgICA9ICdicy5jb2xsYXBzZSc7XG4gIHB1YmxpYyBzdGF0aWMgRVZFTlRfS0VZICAgICAgICAgICA9IGAuJHtDb2xsYXBzZVNlcnZpY2UuREFUQV9LRVl9YDtcbiAgcHVibGljIHN0YXRpYyBEQVRBX0FQSV9LRVkgICAgICAgID0gJy5kYXRhLWFwaSc7XG5cbiAgcHVibGljIHN0YXRpYyBFVkVOVCA9IHtcbiAgICBTSE9XICAgICAgICAgICA6IGBzaG93JHtDb2xsYXBzZVNlcnZpY2UuRVZFTlRfS0VZfWAsXG4gICAgU0hPV04gICAgICAgICAgOiBgc2hvd24ke0NvbGxhcHNlU2VydmljZS5FVkVOVF9LRVl9YCxcbiAgICBISURFICAgICAgICAgICA6IGBoaWRlJHtDb2xsYXBzZVNlcnZpY2UuRVZFTlRfS0VZfWAsXG4gICAgSElEREVOICAgICAgICAgOiBgaGlkZGVuJHtDb2xsYXBzZVNlcnZpY2UuRVZFTlRfS0VZfWAsXG4gICAgQ0xJQ0tfREFUQV9BUEkgOiBgY2xpY2ske0NvbGxhcHNlU2VydmljZS5FVkVOVF9LRVl9JHtDb2xsYXBzZVNlcnZpY2UuREFUQV9BUElfS0VZfWAsXG4gIH07XG5cbiAgcHVibGljIHN0YXRpYyBDTEFTU05BTUUgPSB7XG4gICAgU0hPVyAgICAgICA6ICdzaG93JyxcbiAgICBDT0xMQVBTRSAgIDogJ2NvbGxhcHNlJyxcbiAgICBDT0xMQVBTSU5HIDogJ2NvbGxhcHNpbmcnLFxuICAgIENPTExBUFNFRCAgOiAnY29sbGFwc2VkJyxcbiAgfTtcblxuICBwcml2YXRlICR0YXJnZXQ6IEpRdWVyeTxIVE1MRWxlbWVudD47XG5cbiAgY29uc3RydWN0b3IoJHRhcmdldDogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xuICAgIHRoaXMuJHRhcmdldCA9ICR0YXJnZXQ7XG4gIH1cblxuICBwdWJsaWMgc2hvdygpIHtcbiAgICB0aGlzLiR0YXJnZXRcbiAgICAucmVtb3ZlQ2xhc3MoQ29sbGFwc2VTZXJ2aWNlLkNMQVNTTkFNRS5DT0xMQVBTRSlcbiAgICAuYWRkQ2xhc3MoQ29sbGFwc2VTZXJ2aWNlLkNMQVNTTkFNRS5TSE9XKVxuICAgIC50cmlnZ2VyKENvbGxhcHNlU2VydmljZS5FVkVOVC5TSE9XTik7XG4gIH1cblxuICBwdWJsaWMgaGlkZSgpIHtcbiAgICB0aGlzLiR0YXJnZXRcbiAgICAucmVtb3ZlQ2xhc3MoQ29sbGFwc2VTZXJ2aWNlLkNMQVNTTkFNRS5TSE9XKVxuICAgIC5hZGRDbGFzcyhDb2xsYXBzZVNlcnZpY2UuQ0xBU1NOQU1FLkNPTExBUFNFKVxuICAgIC50cmlnZ2VyKENvbGxhcHNlU2VydmljZS5FVkVOVC5ISURERU4pO1xuICB9XG5cbiAgcHVibGljIGlzRXhwYW5kZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuJHRhcmdldC5oYXNDbGFzcyhDb2xsYXBzZVNlcnZpY2UuQ0xBU1NOQU1FLlNIT1cpO1xuICB9XG5cbiAgcHVibGljIGlzQ29sbGFwc2VkKCkge1xuICAgIHJldHVybiAhdGhpcy5pc0V4cGFuZGVkKCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlKCkge1xuICAgIGlmICh0aGlzLmlzQ29sbGFwc2VkKCkpIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IElCaW5kZXIsIEV2ZW50RGlzcGF0Y2hlciwgSlF1ZXJ5IGFzICQgfSBmcm9tICdAcmliYWpzL2NvcmUnO1xuaW1wb3J0IHsgQ29sbGFwc2VTZXJ2aWNlIH0gZnJvbSAnLi9jb2xsYXBzZS5zZXJ2aWNlJztcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvVXRpbHMnO1xuXG4vKipcbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS9kb2NzLzQuMS9jb21wb25lbnRzL2NvbGxhcHNlL1xuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi92NC1kZXYvanMvc3JjL2NvbGxhcHNlLmpzXG4gKi9cbmV4cG9ydCBjb25zdCBleHBhbk9uVXJsQmluZGVyOiBJQmluZGVyPHN0cmluZz4gPSB7XG4gIG5hbWU6ICdiczQtZXhwYW4tb24tdXJsJyxcbiAgcm91dGluZShlbDogSFRNTEVsZW1lbnQsIHVybDogc3RyaW5nKSB7XG4gICAgY29uc3QgJGVsID0gJChlbCk7XG4gICAgY29uc3QgY29sbGFwc2VTZXJ2aWNlID0gbmV3IENvbGxhcHNlU2VydmljZSgkZWwpO1xuICAgIGNvbnN0IGRpc3BhdGNoZXIgPSBuZXcgRXZlbnREaXNwYXRjaGVyKCdtYWluJyk7XG5cbiAgICBjb25zdCBjaGVja1VSTCA9ICh1cmxUb0NoZWNrPzogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAodXJsVG9DaGVjayAmJiBVdGlscy5vblJvdXRlKHVybFRvQ2hlY2spKSB7XG4gICAgICAgIGNvbGxhcHNlU2VydmljZS5zaG93KCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgY29sbGFwc2VTZXJ2aWNlLmhpZGUoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgZGlzcGF0Y2hlci5vbignbmV3UGFnZVJlYWR5JywgKCkgPT4gY2hlY2tVUkwodXJsKSk7XG5cbiAgICBjaGVja1VSTCh1cmwpO1xuXG4gIH0sXG59O1xuIiwiaW1wb3J0IHsgSUJpbmRlciwgSlF1ZXJ5IGFzICQgfSBmcm9tICdAcmliYWpzL2NvcmUnO1xuXG4vKipcbiAqXG4gKiBAc2VlIGh0dHBzOi8vZ2V0Ym9vdHN0cmFwLmNvbS9kb2NzLzQuMS9jb21wb25lbnRzL3Njcm9sbHNweS9cbiAqL1xuZXhwb3J0IGNvbnN0IHNjcm9sbHNweVN0YXJCaW5kZXI6IElCaW5kZXI8c3RyaW5nPiA9IHtcbiAgbmFtZTogJ2JzNC1zY3JvbGxzcHktKicsXG4gIHJvdXRpbmUoZWw6IEhUTUxFbGVtZW50LCB0YXJnZXRTZWxlY3Rvcjogc3RyaW5nKSB7XG4gICAgY29uc3QgJGVsID0gJChlbCk7XG4gICAgY29uc3QgbmF0aXZlSURUYXJnZXRTZWxlY3RvciA9IHRhcmdldFNlbGVjdG9yLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgLy8gY29uc3QgZGlzcGF0Y2hlciA9IG5ldyBFdmVudERpc3BhdGNoZXIoJ21haW4nKTtcbiAgICBsZXQgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmF0aXZlSURUYXJnZXRTZWxlY3Rvcik7XG4gICAgbGV0ICR0YXJnZXQ6IEpRdWVyeTxFbGVtZW50PiB8IG51bGwgPSBudWxsO1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICR0YXJnZXQgPSAkKHRhcmdldCk7XG4gICAgfVxuICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMuYXJnc1swXSBhcyBzdHJpbmc7XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgYW4gZWxlbWVudCBpcyBpbiB0aGUgdmlld3BvcnRcbiAgICAgKiBAcGFyYW0gZWxlbSBUaGUgZWxlbWVudFxuICAgICAqIEByZXR1cm4gUmV0dXJucyB0cnVlIGlmIGVsZW1lbnQgaXMgaW4gdGhlIHZpZXdwb3J0XG4gICAgICovXG4gICAgY29uc3QgaXNJblZpZXdwb3J0ID0gKGVsZW06IEVsZW1lbnQgKTogYm9vbGVhbiA9PiB7XG4gICAgICBpZiAoIWVsZW0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY29uc3QgZGlzdGFuY2UgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgZGlzdGFuY2UudG9wICsgZGlzdGFuY2UuaGVpZ2h0ID49IDAgJiYgZGlzdGFuY2UuYm90dG9tIC0gZGlzdGFuY2UuaGVpZ2h0IDw9IDBcbiAgICAgICk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uU2Nyb2xsID0gKCkgPT4ge1xuICAgICAgLy8gcmVnZXQgZWxlbWVudCBlYWNoIHNjcm9sbCBiZWNhdXNlIGl0IGNvdWxkIGJlIHJlbW92ZWQgZnJvbSB0aGUgcGFnZSB1c2luZyB0aGUgcm91dGVyXG4gICAgICB0YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYXRpdmVJRFRhcmdldFNlbGVjdG9yKTtcbiAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgJHRhcmdldCA9ICQobmF0aXZlSURUYXJnZXRTZWxlY3Rvcik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0luVmlld3BvcnQodGFyZ2V0KSkge1xuICAgICAgICAkZWwuYWRkQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICAgICAgaWYgKCRlbC5pcygnOnJhZGlvJykpIHtcbiAgICAgICAgICAkZWwucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkZWwucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcbiAgICAgICAgaWYgKCRlbC5pcygnOnJhZGlvJykpIHtcbiAgICAgICAgICAkZWwucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAkKHdpbmRvdykub2ZmKCdzY3JvbGwnLCBvblNjcm9sbCkub24oJ3Njcm9sbCcsIG9uU2Nyb2xsKTtcbiAgICBvblNjcm9sbCgpO1xuICB9LFxufTtcbiIsImV4cG9ydCAqIGZyb20gJy4vc3R5bGVzL3N0eWxlcy5iaW5kZXJzJztcblxuLy8gYmluZGVyc1xuZXhwb3J0IHsgbWFpbHRvQmluZGVyIH0gZnJvbSAnLi9tYWlsdG8uYmluZGVyJztcbmV4cG9ydCB7IHRlbEJpbmRlciB9IGZyb20gJy4vdGVsLmJpbmRlcic7XG5leHBvcnQgeyBzY3JvbGxiYXJEcmFnYWJsZUJpbmRlciB9IGZyb20gJy4vc2Nyb2xsYmFyL3Njcm9sbGJhci1kcmFnYWJsZS5iaW5kZXInO1xuZXhwb3J0IHsgc2Nyb2xsZml4QmluZGVyIH0gZnJvbSAnLi9zY3JvbGxiYXIvc2Nyb2xsZml4LmJpbmRlcic7XG4vLyBpbXBvcnQgeyBpMThuU3RhckJpbmRlciB9IGZyb20gJy4vaTE4bi9pMThuLXN0YXIuYmluZGVyJztcblxuZXhwb3J0IHsgY29sbGFwc2VCaW5kZXIgfSBmcm9tICcuL2JzNC9jb2xsYXBzZS5iaW5kZXInO1xuZXhwb3J0IHsgZXhwYW5PblVybEJpbmRlciB9IGZyb20gJy4vYnM0L2V4cGFuLW9uLXVybC5iaW5kZXInO1xuZXhwb3J0IHsgY29sbGFwc2VPblVybEJpbmRlciB9IGZyb20gJy4vYnM0L2NvbGxhcHNlLW9uLXVybC5iaW5kZXInO1xuZXhwb3J0IHsgc2Nyb2xsc3B5U3RhckJpbmRlciB9IGZyb20gJy4vYnM0L3Njcm9sbHNweS1zdGFyLmJpbmRlcic7XG4iLCJpbXBvcnQgeyBJQmluZGVyIH0gZnJvbSAnQHJpYmFqcy9jb3JlJztcblxuLyoqXG4gKiBtYWlsdG9cbiAqL1xuZXhwb3J0IGNvbnN0IG1haWx0b0JpbmRlcjogSUJpbmRlcjxzdHJpbmc+ID0ge1xuICBuYW1lOiAnbWFpbHRvJyxcbiAgcm91dGluZShlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBhbnkpIHtcbiAgICAkKGVsKS5hdHRyKCdocmVmJywgJ21haWx0bzonICsgdmFsdWUpO1xuICB9LFxufTtcbiIsImltcG9ydCB7IERlYnVnLCBJQmluZGVyIH0gZnJvbSAnQHJpYmFqcy9jb3JlJztcblxuLyoqXG4gKiBTY3JvbGwgYW4gc2Nyb2xsYWJsZSBlbGVtZW50IGJ5IGRyYWdpbmcgYW5kIG1vdmluZyB5b3VyIG1vdXNlLlxuICogaW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2FzdmQvZHJhZ3Njcm9sbFxuICovXG5leHBvcnQgY2xhc3MgRHJhZ3Njcm9sbCB7XG4gIHB1YmxpYyBkZWJ1ZyA9IERlYnVnKCdiaW5kZXJzOnNjcm9sbGJhci1kcmFnYWJsZScpO1xuICBwcml2YXRlIGxhc3RDbGllbnRYID0gMDtcbiAgcHJpdmF0ZSBsYXN0Q2xpZW50WSA9IDA7XG4gIHByaXZhdGUgZWw6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIHB1c2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGVsOiBIVE1MRWxlbWVudCwgZGV0ZWN0R2xvYmFsTW92ZSA9IHRydWUpIHtcbiAgICB0aGlzLmVsID0gZWw7XG5cbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1kLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm1kLmJpbmQodGhpcyksIGZhbHNlKTtcblxuICAgIC8vIFVzZSBnbG9iYWwgbW92ZSBpZiB5b3VyIGVsZW1lbnQgZG9lcyBub3QgdXNlIHRoZSBmdWxsIHdpZHRoIC8gaGVpZ2h0XG4gICAgaWYgKGRldGVjdEdsb2JhbE1vdmUpIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tdS5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tbS5iaW5kKHRoaXMpLCBmYWxzZSk7XG5cbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tdS5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5tbS5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm11LmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubW0uYmluZCh0aGlzKSwgZmFsc2UpO1xuXG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5tdS5iaW5kKHRoaXMpLCBmYWxzZSk7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLm1tLmJpbmQodGhpcyksIGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1kIDxFdmVudExpc3RlbmVyPihlOiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5wdXNoZWQgPSB0cnVlO1xuICAgIHRoaXMubGFzdENsaWVudFggPSBlLmNsaWVudFg7XG4gICAgdGhpcy5sYXN0Q2xpZW50WSA9IGUuY2xpZW50WTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBwcml2YXRlIG11IDxFdmVudExpc3RlbmVyPihlOiBNb3VzZUV2ZW50KSB7XG4gICAgdGhpcy5wdXNoZWQgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgbW0gPEV2ZW50TGlzdGVuZXI+KGU6IE1vdXNlRXZlbnQpIHtcbiAgICBsZXQgbmV3U2Nyb2xsWCA9IDA7XG4gICAgbGV0IG5ld1Njcm9sbFkgPSAwO1xuICAgIGlmICh0aGlzLnB1c2hlZCkge1xuICAgICAgdGhpcy5lbC5zY3JvbGxMZWZ0IC09IG5ld1Njcm9sbFggPSAoLSB0aGlzLmxhc3RDbGllbnRYICsgKHRoaXMubGFzdENsaWVudFggPSBlLmNsaWVudFgpKTtcbiAgICAgIHRoaXMuZWwuc2Nyb2xsVG9wIC09IG5ld1Njcm9sbFkgPSAoLSB0aGlzLmxhc3RDbGllbnRZICsgKHRoaXMubGFzdENsaWVudFkgPSBlLmNsaWVudFkpKTtcbiAgICAgIGlmICh0aGlzLmVsID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgICB0aGlzLmVsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZWwuc2Nyb2xsTGVmdCAtPSBuZXdTY3JvbGxYO1xuICAgICAgICB0aGlzLmVsLnNjcm9sbFRvcCAtPSBuZXdTY3JvbGxZO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGRyYWdzY3JvbGxcbiAqL1xuZXhwb3J0IGNvbnN0IHNjcm9sbGJhckRyYWdhYmxlQmluZGVyOiBJQmluZGVyPHN0cmluZz4gPSB7XG4gIG5hbWU6ICdzY3JvbGxiYXItZHJhZ2FibGUnLFxuICByb3V0aW5lKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGFueSkge1xuICAgIGNvbnN0IGRyYWdzY3JvbGwgPSBuZXcgRHJhZ3Njcm9sbChlbCwgdHJ1ZSk7XG4gICAgZHJhZ3Njcm9sbC5kZWJ1ZygncmVhZHknKTtcbiAgfSxcbn07XG4iLCJpbXBvcnQgeyBEZWJ1ZywgSUJpbmRlciwgSlF1ZXJ5IH0gZnJvbSAnQHJpYmFqcy9jb3JlJztcblxuY29uc3QgZGVidWcgPSBEZWJ1ZygnYmluZGVyOnJ2LXNjcm9sbGZpeCcpO1xuXG5jb25zdCBvbldoZWVsID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICBkZWJ1Zygnb25XaGVlbCcpO1xuICBpZiAoKGV2ZW50IGFzIGFueSkud2hlZWxEZWx0YSA+IDAgfHwgKGV2ZW50IGFzIFdoZWVsRXZlbnQpLmRldGFpbCA8IDApIHtcbiAgICAvLyBzY3JvbGwgdXBcbiAgICBkZWJ1Zygnc2Nyb2xsIHVwJyk7XG4gIH0gZWxzZSB7XG4gICAgLy8gc2Nyb2xsIGRvd25cbiAgICBkZWJ1Zygnc2Nyb2xsIGRvd24nKTtcbiAgfVxufTtcblxuLyoqXG4gKiBzY3JvbGxmaXggcGFzc2VzIHNjcm9sbCBldmVudHMgdG8gdGhlIGJvZHkgdG8gZml4IHNjcm9sbCB3aXRoIG1vdXNlIHdlbGwgb3ZlciB2aW1lbyBpZnJhbWVzXG4gKiBUT0RPIG5vdCB3b3JraW5nIHlldFxuICogQHNlZSBpc3N1ZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yOTM0NDE2Mi9mdWxsc2NyZWVuLXZpZGVvLWRvZXNudC1hbGxvdy1zY3JvbGxpbmctb24tZmlyZWZveFxuICovXG5leHBvcnQgY29uc3Qgc2Nyb2xsZml4QmluZGVyOiBJQmluZGVyPGFueT4gPSB7XG4gIG5hbWU6ICdzY3JvbGxmaXgnLFxuICByb3V0aW5lKGVsOiBIVE1MRWxlbWVudCwgdmFsdWU6IGFueSkge1xuXG4gICAgZGVidWcoJ3Njcm9sbGZpeCcsIGVsKTtcbiAgICBjb25zdCAkZWwgPSBKUXVlcnkoZWwpO1xuXG4gICAgJGVsLmhvdmVyKCgpID0+IHtcbiAgICAgIGRlYnVnKCdvdmVyJyk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3aGVlbCcsIG9uV2hlZWwpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V3aGVlbCcsIG9uV2hlZWwpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NTW91c2VTY3JvbGwnLCBvbldoZWVsKTtcbiAgICB9LCAoKSA9PiB7XG4gICAgICBkZWJ1ZygnbGVhdmUnKTtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3doZWVsJywgb25XaGVlbCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXdoZWVsJywgb25XaGVlbCk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdET01Nb3VzZVNjcm9sbCcsIG9uV2hlZWwpO1xuICAgIH0pO1xuICB9LFxufTtcbiIsImltcG9ydCB7IElCaW5kZXIsIEpRdWVyeSBhcyAkIH0gZnJvbSAnQHJpYmFqcy9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGJhY2tncm91bmRDb2xvclN0YXJCaW5kZXI6IElCaW5kZXI8c3RyaW5nPiA9IHtcbiAgbmFtZTogJ2JhY2tncm91bmQtY29sb3ItKicsXG4gIHJvdXRpbmUoZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgJGVsID0gJChlbCk7XG4gICAgY29uc3QgY29sb3IgPSAgdGhpcy5hcmdzWzBdLnRvU3RyaW5nKCkgfHwgJ3RyYW5zcGFyZW50JztcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgICRlbC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCBjb2xvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgICRlbC5jc3MoJ2JhY2tncm91bmQtY29sb3InLCAnJyk7XG4gICAgfVxuICB9LFxufTtcbiIsImltcG9ydCB7IElCaW5kZXIsIEpRdWVyeSBhcyAkIH0gZnJvbSAnQHJpYmFqcy9jb3JlJztcblxuZXhwb3J0IGNvbnN0IGJhY2tncm91bmRJbWFnZUJpbmRlcjogSUJpbmRlcjxzdHJpbmc+ID0ge1xuICBuYW1lOiAnYmFja2dyb3VuZC1pbWFnZScsXG4gIHJvdXRpbmUoZWw6IEhUTUxFbGVtZW50LCB2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgJGVsID0gJChlbCk7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICAkZWwuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybCgnICsgdmFsdWUgKyAnKScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkZWwuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJycpO1xuICAgIH1cbiAgfSxcbn07XG4iLCJpbXBvcnQgeyBJQmluZGVyLCBKUXVlcnkgYXMgJCB9IGZyb20gJ0ByaWJhanMvY29yZSc7XG5cbmV4cG9ydCBjb25zdCBvcGFjaXR5U3RhckJpbmRlcjogSUJpbmRlcjxzdHJpbmc+ID0ge1xuICBuYW1lOiAnb3BhY2l0eS0qJyxcbiAgcm91dGluZShlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBzdHJpbmcpIHtcbiAgICBjb25zdCAkZWwgPSAkKGVsKTtcbiAgICBjb25zdCBvcGFjaXR5ID0gIHBhcnNlRmxvYXQodGhpcy5hcmdzWzBdIGFzIHN0cmluZyk7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICAkZWwuY3NzKCdvcGFjaXR5Jywgb3BhY2l0eSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICRlbC5jc3MoJ29wYWNpdHknLCAnJyk7XG4gICAgfVxuICB9LFxufTtcbiIsImV4cG9ydCB7IGJhY2tncm91bmRJbWFnZUJpbmRlciB9IGZyb20gJy4vYmFja2dyb3VuZC1pbWFnZS5iaW5kZXInO1xuZXhwb3J0IHsgYmFja2dyb3VuZENvbG9yU3RhckJpbmRlciB9IGZyb20gJy4vYmFja2dyb3VuZC1jb2xvci1zdGFyLmJpbmRlcic7XG5leHBvcnQgeyBvcGFjaXR5U3RhckJpbmRlciB9IGZyb20gJy4vb3BhY2l0eS1zdGFyLmJpbmRlcic7XG4iLCJpbXBvcnQgeyBJQmluZGVyIH0gZnJvbSAnQHJpYmFqcy9jb3JlJztcblxuLyoqXG4gKiB0ZWxcbiAqL1xuZXhwb3J0IGNvbnN0IHRlbEJpbmRlcjogSUJpbmRlcjxzdHJpbmc+ID0ge1xuICBuYW1lOiAndGVsJyxcbiAgcm91dGluZShlbDogSFRNTEVsZW1lbnQsIHZhbHVlOiBhbnkpIHtcbiAgICAkKGVsKS5hdHRyKCdocmVmJywgJ3RlbDonICsgdmFsdWUpO1xuICB9LFxufTtcbiIsImV4cG9ydCB7IFRhYnNDb21wb25lbnQgfSBmcm9tICcuL3RhYnMvdGFicy5jb21wb25lbnQnO1xuZXhwb3J0IHsgRHJvcGRvd25Db21wb25lbnQgfSBmcm9tICcuL2Ryb3Bkb3duL2Ryb3Bkb3duLmNvbXBvbmVudCc7XG4iLCJpbXBvcnQgeyBJQmluZGVyLCBDb21wb25lbnQsIERlYnVnLCBKUXVlcnkgYXMgJCB9IGZyb20gJ0ByaWJhanMvY29yZSc7XG5pbXBvcnQgeyBEcm9wZG93blNlcnZpY2UgfSBmcm9tICcuL2Ryb3Bkb3duLnNlcnZpY2UnO1xuXG5leHBvcnQgY2xhc3MgRHJvcGRvd25Db21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHB1YmxpYyBzdGF0aWMgdGFnTmFtZTogc3RyaW5nID0gJ2JzNC1kcm9wZG93bic7XG5cbiAgcHJvdGVjdGVkIGRlYnVnID0gRGVidWcoJ2NvbXBvbmVudDpiczQtZHJvcGRvd24nKTtcbiAgcHJvdGVjdGVkIHNjb3BlOiBhbnkgPSB7XG4gICAgdG9nZ2xlOiB0aGlzLnRvZ2dsZSxcbiAgfTtcblxuICBwcml2YXRlIGRyb3Bkb3duU2VydmljZTogRHJvcGRvd25TZXJ2aWNlO1xuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ/OiBIVE1MRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGNvbnN0ICRlbCA9ICQodGhpcy5lbCk7XG4gICAgdGhpcy5kcm9wZG93blNlcnZpY2UgPSBuZXcgRHJvcGRvd25TZXJ2aWNlKCRlbC5maW5kKCcuZHJvcGRvd24tdG9nZ2xlJylbMF0gYXMgSFRNTEJ1dHRvbkVsZW1lbnQpO1xuICAgIHRoaXMuaW5pdChEcm9wZG93bkNvbXBvbmVudC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZShjb250ZXh0OiBJQmluZGVyPGFueT4sIGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuZGVidWcoJ3RvZ2dsZScpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgcmV0dXJuIHRoaXMuZHJvcGRvd25TZXJ2aWNlLnRvZ2dsZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgUG9wcGVyIGZyb20gJ3BvcHBlci5qcyc7IC8vIC9kaXN0L3VtZC9wb3BwZXJcbmltcG9ydCB7IERlYnVnLCBKUXVlcnkgYXMgJCB9IGZyb20gJ0ByaWJhanMvY29yZSc7XG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJy4uLy4uLy4uL3NlcnZpY2VzL1V0aWxzJztcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4xLjMpOiBkcm9wZG93bi5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIEBzZWUgaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL3R3YnMvYm9vdHN0cmFwL3Y0LWRldi9qcy9zcmMvZHJvcGRvd24uanNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvbnN0YW50c1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuZXhwb3J0IGNvbnN0IE5BTUUgICAgICAgICAgICAgICAgICAgICA9ICdkcm9wZG93bic7XG5leHBvcnQgY29uc3QgVkVSU0lPTiAgICAgICAgICAgICAgICAgID0gJzQuMS4zJztcbmV4cG9ydCBjb25zdCBEQVRBX0tFWSAgICAgICAgICAgICAgICAgPSAnYnMuZHJvcGRvd24nO1xuZXhwb3J0IGNvbnN0IEVWRU5UX0tFWSAgICAgICAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gO1xuZXhwb3J0IGNvbnN0IERBVEFfQVBJX0tFWSAgICAgICAgICAgICA9ICcuZGF0YS1hcGknO1xuZXhwb3J0IGNvbnN0IEVTQ0FQRV9LRVlDT0RFICAgICAgICAgICA9IDI3OyAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciBFc2NhcGUgKEVzYykga2V5XG5leHBvcnQgY29uc3QgU1BBQ0VfS0VZQ09ERSAgICAgICAgICAgID0gMzI7IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIHNwYWNlIGtleVxuZXhwb3J0IGNvbnN0IFRBQl9LRVlDT0RFICAgICAgICAgICAgICA9IDk7IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIHRhYiBrZXlcbmV4cG9ydCBjb25zdCBBUlJPV19VUF9LRVlDT0RFICAgICAgICAgPSAzODsgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgdXAgYXJyb3cga2V5XG5leHBvcnQgY29uc3QgQVJST1dfRE9XTl9LRVlDT0RFICAgICAgID0gNDA7IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIGRvd24gYXJyb3cga2V5XG5leHBvcnQgY29uc3QgUklHSFRfTU9VU0VfQlVUVE9OX1dISUNIID0gMzsgLy8gTW91c2VFdmVudC53aGljaCB2YWx1ZSBmb3IgdGhlIHJpZ2h0IGJ1dHRvbiAoYXNzdW1pbmcgYSByaWdodC1oYW5kZWQgbW91c2UpXG5leHBvcnQgY29uc3QgUkVHRVhQX0tFWURPV04gICAgICAgICAgID0gbmV3IFJlZ0V4cChgJHtBUlJPV19VUF9LRVlDT0RFfXwke0FSUk9XX0RPV05fS0VZQ09ERX18JHtFU0NBUEVfS0VZQ09ERX1gKTtcblxuZXhwb3J0IGNvbnN0IEVWRU5UID0ge1xuICBISURFICAgICAgICAgICAgIDogYGhpZGUke0VWRU5UX0tFWX1gLFxuICBISURERU4gICAgICAgICAgIDogYGhpZGRlbiR7RVZFTlRfS0VZfWAsXG4gIFNIT1cgICAgICAgICAgICAgOiBgc2hvdyR7RVZFTlRfS0VZfWAsXG4gIFNIT1dOICAgICAgICAgICAgOiBgc2hvd24ke0VWRU5UX0tFWX1gLFxuICBDTElDSyAgICAgICAgICAgIDogYGNsaWNrJHtFVkVOVF9LRVl9YCxcbiAgQ0xJQ0tfREFUQV9BUEkgICA6IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWAsXG4gIEtFWURPV05fREFUQV9BUEkgOiBga2V5ZG93biR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWAsXG4gIEtFWVVQX0RBVEFfQVBJICAgOiBga2V5dXAke0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gLFxufTtcblxuZXhwb3J0IGNvbnN0IENMQVNTTkFNRSA9IHtcbiAgRElTQUJMRUQgIDogJ2Rpc2FibGVkJyxcbiAgU0hPVyAgICAgIDogJ3Nob3cnLFxuICBEUk9QVVAgICAgOiAnZHJvcHVwJyxcbiAgRFJPUFJJR0hUIDogJ2Ryb3ByaWdodCcsXG4gIERST1BMRUZUICA6ICdkcm9wbGVmdCcsXG4gIE1FTlVSSUdIVCA6ICdkcm9wZG93bi1tZW51LXJpZ2h0JyxcbiAgTUVOVUxFRlQgIDogJ2Ryb3Bkb3duLW1lbnUtbGVmdCcsXG4gIFBPU0lUSU9OX1NUQVRJQyA6ICdwb3NpdGlvbi1zdGF0aWMnLFxufTtcblxuZXhwb3J0IGNvbnN0IFNFTEVDVE9SID0ge1xuICBEQVRBX1RPR0dMRSAgIDogJ2JzNC1kcm9wZG93biAuZHJvcGRvd24tdG9nZ2xlJyxcbiAgRk9STV9DSElMRCAgICA6ICcuZHJvcGRvd24gZm9ybScsXG4gIE1FTlUgICAgICAgICAgOiAnLmRyb3Bkb3duLW1lbnUnLFxuICBOQVZCQVJfTkFWICAgIDogJy5uYXZiYXItbmF2JyxcbiAgVklTSUJMRV9JVEVNUyA6ICcuZHJvcGRvd24tbWVudSAuZHJvcGRvd24taXRlbTpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKScsXG59O1xuXG5leHBvcnQgY29uc3QgQVRUQUNITUVOVE1BUCA9IHtcbiAgVE9QICAgICAgIDogJ3RvcC1zdGFydCcsXG4gIFRPUEVORCAgICA6ICd0b3AtZW5kJyxcbiAgQk9UVE9NICAgIDogJ2JvdHRvbS1zdGFydCcsXG4gIEJPVFRPTUVORCA6ICdib3R0b20tZW5kJyxcbiAgUklHSFQgICAgIDogJ3JpZ2h0LXN0YXJ0JyxcbiAgUklHSFRFTkQgIDogJ3JpZ2h0LWVuZCcsXG4gIExFRlQgICAgICA6ICdsZWZ0LXN0YXJ0JyxcbiAgTEVGVEVORCAgIDogJ2xlZnQtZW5kJyxcbn07XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUID0ge1xuICBvZmZzZXQgICAgICA6IDAsXG4gIGZsaXAgICAgICAgIDogdHJ1ZSxcbiAgYm91bmRhcnkgICAgOiAnc2Nyb2xsUGFyZW50JyxcbiAgcmVmZXJlbmNlICAgOiAndG9nZ2xlJyxcbiAgZGlzcGxheSAgICAgOiAnZHluYW1pYycsXG59O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVFRZUEUgPSB7XG4gIG9mZnNldCAgICAgIDogJyhudW1iZXJ8c3RyaW5nfGZ1bmN0aW9uKScsXG4gIGZsaXAgICAgICAgIDogJ2Jvb2xlYW4nLFxuICBib3VuZGFyeSAgICA6ICcoc3RyaW5nfGVsZW1lbnQpJyxcbiAgcmVmZXJlbmNlICAgOiAnKHN0cmluZ3xlbGVtZW50KScsXG4gIGRpc3BsYXkgICAgIDogJ3N0cmluZycsXG59O1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3MgRGVmaW5pdGlvblxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cbmV4cG9ydCBjbGFzcyBEcm9wZG93blNlcnZpY2Uge1xuXG4gIC8vIEdldHRlcnNcblxuICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgcmV0dXJuIFZFUlNJT047XG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgcmV0dXJuIERFRkFVTFQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgIHJldHVybiBERUZBVUxUVFlQRTtcbiAgfVxuXG4gIC8vIFN0YXRpY1xuXG4gIHB1YmxpYyBzdGF0aWMgY2xvc2VBbGwoKSB7XG4gICAgY29uc3QgJG1lbnVzID0gJCgnLmRyb3Bkb3duLW1lbnUuc2hvdycpO1xuICAgICRtZW51cy5lYWNoKChpbmRleCwgbWVudSkgPT4ge1xuICAgICAgY29uc3QgJG1lbnUgPSAkKG1lbnUpO1xuICAgICAgY29uc3QgJGRyb3Bkb3duID0gJG1lbnUuY2xvc2VzdCgnZHJvcGRvd24tbWVudS5zaG93Jyk7XG4gICAgICB0aGlzLmNsb3NlKCRtZW51WzBdLCAkbWVudSwgJGRyb3Bkb3duKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY2xvc2UodHJpZ2dlckNsb3NlRWxlbWVudDogRWxlbWVudCwgJG1lbnU6IEpRdWVyeTxFbGVtZW50PiwgJGRyb3Bkb3duPzogSlF1ZXJ5PEVsZW1lbnQ+KSB7XG4gICAgY29uc3QgcmVsYXRlZFRhcmdldCA9IHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRyaWdnZXJDbG9zZUVsZW1lbnQsXG4gICAgfTtcblxuICAgIGNvbnN0ICRwYXJlbnQgPSBEcm9wZG93blNlcnZpY2UuX2dldFBhcmVudEZyb21FbGVtZW50KHRyaWdnZXJDbG9zZUVsZW1lbnQpO1xuXG4gICAgaWYgKCRtZW51ICYmICRtZW51Lmhhc0NsYXNzKENMQVNTTkFNRS5TSE9XKSkge1xuICAgICAgJG1lbnUucmVtb3ZlQ2xhc3MoQ0xBU1NOQU1FLlNIT1cpO1xuICAgIH1cblxuICAgIGlmICgkZHJvcGRvd24gJiYgJGRyb3Bkb3duLmhhc0NsYXNzKENMQVNTTkFNRS5TSE9XKSkge1xuICAgICAgJGRyb3Bkb3duLnJlbW92ZUNsYXNzKENMQVNTTkFNRS5TSE9XKVxuICAgICAgLnJlbW92ZUNsYXNzKENMQVNTTkFNRS5TSE9XKVxuICAgICAgLnRyaWdnZXIoJC5FdmVudChFVkVOVC5ISURERU4sIHJlbGF0ZWRUYXJnZXQpKTtcbiAgICB9XG5cbiAgICBpZiAoJHBhcmVudC5oYXNDbGFzcyhDTEFTU05BTUUuU0hPVykpIHtcbiAgICAgICRwYXJlbnRcbiAgICAgIC5yZW1vdmVDbGFzcyhDTEFTU05BTUUuU0hPVylcbiAgICAgIC50cmlnZ2VyKCQuRXZlbnQoRVZFTlQuSElEREVOLCByZWxhdGVkVGFyZ2V0KSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBfY2xlYXJNZW51cyhldmVudD86IEpRdWVyeS5FdmVudCB8IEV2ZW50KSB7XG4gICAgaWYgKGV2ZW50ICYmICgoZXZlbnQgYXMgSlF1ZXJ5LkV2ZW50KS53aGljaCA9PT0gUklHSFRfTU9VU0VfQlVUVE9OX1dISUNIIHx8XG4gICAgICBldmVudC50eXBlID09PSAna2V5dXAnICYmIChldmVudCBhcyBKUXVlcnkuRXZlbnQpLndoaWNoICE9PSBUQUJfS0VZQ09ERSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0b2dnbGVzID0gW10uc2xpY2UuY2FsbCgkKFNFTEVDVE9SLkRBVEFfVE9HR0xFKS5nZXQoKSkgYXMgdW5rbm93biBhcyBIVE1MVW5rbm93bkVsZW1lbnRbXTtcblxuICAgICQoU0VMRUNUT1IuREFUQV9UT0dHTEUpLmVhY2goKGksIGVsZW1lbnQpID0+IHtcbiAgICAvLyBmb3IgKGxldCBpID0gMCwgbGVuID0gdG9nZ2xlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgcGFyZW50ID0gRHJvcGRvd25TZXJ2aWNlLl9nZXRQYXJlbnRGcm9tRWxlbWVudChlbGVtZW50KTtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSAkKHRvZ2dsZXNbaV0pLmRhdGEoREFUQV9LRVkpO1xuICAgICAgLy8gY29uc29sZS53YXJuKCdfY2xlYXJNZW51cyBwYXJlbnQnLCBwYXJlbnQsIGNvbnRleHQpO1xuICAgICAgY29uc3QgcmVsYXRlZFRhcmdldDogYW55ID0ge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiB0b2dnbGVzW2ldLFxuICAgICAgfTtcblxuICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgICAgcmVsYXRlZFRhcmdldC5jbGlja0V2ZW50ID0gZXZlbnQ7XG4gICAgICB9XG5cbiAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAvLyBjb250aW51ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkcm9wZG93bk1lbnUgPSBwYXJlbnQuZmluZChTRUxFQ1RPUi5NRU5VKTtcbiAgICAgIGlmICghJChwYXJlbnQpLmhhc0NsYXNzKENMQVNTTkFNRS5TSE9XKSkge1xuICAgICAgICAvLyBjb250aW51ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdjbGljaycgJiZcbiAgICAgICAgICAvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KCgoZXZlbnQgYXMgRXZlbnQpLnRhcmdldCBhcyBFbGVtZW50KS50YWdOYW1lKSB8fCBldmVudC50eXBlID09PSAna2V5dXAnICYmIChldmVudCBhcyBKUXVlcnkuRXZlbnQpLndoaWNoID09PSBUQUJfS0VZQ09ERSkgJiZcbiAgICAgICAgICAkLmNvbnRhaW5zKHBhcmVudC5nZXQoMCksIChldmVudCBhcyBFdmVudCkudGFyZ2V0IGFzIEVsZW1lbnQpKSB7XG4gICAgICAgIC8vIGNvbnRpbnVlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGhpZGVFdmVudCA9ICQuRXZlbnQoRVZFTlQuSElERSwgcmVsYXRlZFRhcmdldCk7XG4gICAgICAkKHBhcmVudCkudHJpZ2dlcihoaWRlRXZlbnQpO1xuICAgICAgaWYgKGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgICAvLyBjb250aW51ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgcmVtb3ZlIHRoZSBleHRyYVxuICAgICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB3ZSBhZGRlZCBmb3IgaU9TIHN1cHBvcnRcbiAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICQoZG9jdW1lbnQuYm9keSkuY2hpbGRyZW4oKS5vZmYoJ21vdXNlb3ZlcicsICdudWxsJywgJC5ub29wKTtcbiAgICAgIH1cblxuICAgICAgdG9nZ2xlc1tpXS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcblxuICAgICAgZHJvcGRvd25NZW51LnJlbW92ZUNsYXNzKENMQVNTTkFNRS5TSE9XKTtcbiAgICAgIHBhcmVudFxuICAgICAgICAucmVtb3ZlQ2xhc3MoQ0xBU1NOQU1FLlNIT1cpXG4gICAgICAgIC50cmlnZ2VyKCQuRXZlbnQoRVZFTlQuSElEREVOLCByZWxhdGVkVGFyZ2V0KSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIF9nZXRQYXJlbnRGcm9tRWxlbWVudChlbGVtZW50OiBFbGVtZW50KSB7XG4gICAgcmV0dXJuICQoZWxlbWVudCkucGFyZW50KCk7XG4gICAgLy8gbGV0IHBhcmVudDtcbiAgICAvLyBjb25zdCBzZWxlY3RvciA9IFV0aWxzLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbWVudCk7XG5cbiAgICAvLyBpZiAoc2VsZWN0b3IpIHtcbiAgICAvLyAgIHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIC8vIH1cblxuICAgIC8vIHJldHVybiBwYXJlbnQgfHwgZWxlbWVudC5wYXJlbnROb2RlO1xuICB9XG5cbiAgcHJpdmF0ZSBfZWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBIVE1MQW5jaG9yRWxlbWVudDtcbiAgcHJpdmF0ZSBfcG9wcGVyOiBhbnkgLyogUG9wcGVyICovIHwgbnVsbDsgLy8gVE9ETyBQb3BwZXIgbmFtY2VzcGFjZSBlcnJvclxuICBwcml2YXRlIF9jb25maWc6IGFueTsgLy8gVE9ET1xuICBwcml2YXRlIF9tZW51OiBFbGVtZW50O1xuICBwcml2YXRlIF9pbk5hdmJhcjogYm9vbGVhbjtcblxuICBwcml2YXRlIGRlYnVnID0gRGVidWcoJ3NlcnZpY2U6RHJvcGRvd25TZXJ2aWNlJyk7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogSFRNTEJ1dHRvbkVsZW1lbnQgfCBIVE1MQW5jaG9yRWxlbWVudCwgY29uZmlnPzogYW55KSB7XG4gICAgdGhpcy5fZWxlbWVudCAgPSBlbGVtZW50O1xuICAgIHRoaXMuX3BvcHBlciAgID0gbnVsbDtcbiAgICB0aGlzLl9jb25maWcgICA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpO1xuICAgIHRoaXMuX21lbnUgICAgID0gdGhpcy5fZ2V0TWVudUVsZW1lbnQoKTtcbiAgICB0aGlzLl9pbk5hdmJhciA9IHRoaXMuX2RldGVjdE5hdmJhcigpO1xuXG4gICAgJCh0aGlzLl9lbGVtZW50KS5kYXRhKERBVEFfS0VZLCB0aGlzLl9jb25maWcpO1xuXG4gICAgdGhpcy5jbG91c2VPbkNsaWNrT3V0c2l0ZShEcm9wZG93blNlcnZpY2UuX2dldFBhcmVudEZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpKTtcbiAgfVxuXG4gIC8vIFB1YmxpY1xuXG4gIHB1YmxpYyBjbG9zZSgpIHtcbiAgICByZXR1cm4gRHJvcGRvd25TZXJ2aWNlLmNsb3NlKHRoaXMuX2VsZW1lbnQsICQodGhpcy5fbWVudSkpO1xuICB9XG5cbiAgcHVibGljIHNob3coKSB7XG5cbiAgICBjb25zdCByZWxhdGVkVGFyZ2V0ID0ge1xuICAgICAgcmVsYXRlZFRhcmdldDogdGhpcy5fZWxlbWVudCxcbiAgICB9O1xuXG4gICAgY29uc3QgJHBhcmVudCA9IERyb3Bkb3duU2VydmljZS5fZ2V0UGFyZW50RnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudCk7XG5cbiAgICBpZiAoISQodGhpcy5fbWVudSkuaGFzQ2xhc3MoQ0xBU1NOQU1FLlNIT1cpKSB7XG4gICAgICAkKHRoaXMuX21lbnUpLmFkZENsYXNzKENMQVNTTkFNRS5TSE9XKTtcbiAgICB9XG5cbiAgICBpZiAoISRwYXJlbnQuaGFzQ2xhc3MoQ0xBU1NOQU1FLlNIT1cpKSB7XG4gICAgICAkcGFyZW50XG4gICAgICAuYWRkQ2xhc3MoQ0xBU1NOQU1FLlNIT1cpXG4gICAgICAudHJpZ2dlcigkLkV2ZW50KEVWRU5ULlNIT1dOLCByZWxhdGVkVGFyZ2V0KSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRvZ2dsZSgpIHtcbiAgICBpZiAoKHRoaXMuX2VsZW1lbnQgYXMgSFRNTEJ1dHRvbkVsZW1lbnQpLmRpc2FibGVkIHx8ICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ0xBU1NOQU1FLkRJU0FCTEVEKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcmVudCAgID0gRHJvcGRvd25TZXJ2aWNlLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KTtcbiAgICBjb25zdCBpc0FjdGl2ZSA9ICQodGhpcy5fbWVudSkuaGFzQ2xhc3MoQ0xBU1NOQU1FLlNIT1cpO1xuXG4gICAgRHJvcGRvd25TZXJ2aWNlLl9jbGVhck1lbnVzKCk7XG5cbiAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByZWxhdGVkVGFyZ2V0ID0ge1xuICAgICAgcmVsYXRlZFRhcmdldDogdGhpcy5fZWxlbWVudCxcbiAgICB9O1xuICAgIGNvbnN0IHNob3dFdmVudCA9ICQuRXZlbnQoRVZFTlQuU0hPVywgcmVsYXRlZFRhcmdldCk7XG5cbiAgICAkKHBhcmVudCkudHJpZ2dlcihzaG93RXZlbnQpO1xuXG4gICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY2xvdXNlT25DbGlja091dHNpdGUoRHJvcGRvd25TZXJ2aWNlLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KSk7XG5cbiAgICAvLyBEaXNhYmxlIHRvdGFsbHkgUG9wcGVyLmpzIGZvciBEcm9wZG93biBpbiBOYXZiYXJcbiAgICBpZiAoIXRoaXMuX2luTmF2YmFyKSB7XG4gICAgICAvKipcbiAgICAgICAqIENoZWNrIGZvciBQb3BwZXIgZGVwZW5kZW5jeVxuICAgICAgICogUG9wcGVyIC0gaHR0cHM6Ly9wb3BwZXIuanMub3JnXG4gICAgICAgKi9cbiAgICAgIGlmICh0eXBlb2YgUG9wcGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb290c3RyYXAgZHJvcGRvd24gcmVxdWlyZSBQb3BwZXIuanMgKGh0dHBzOi8vcG9wcGVyLmpzLm9yZyknKTtcbiAgICAgIH1cblxuICAgICAgbGV0IHJlZmVyZW5jZUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50IGFzIEhUTUxFbGVtZW50O1xuXG4gICAgICBpZiAodGhpcy5fY29uZmlnLnJlZmVyZW5jZSA9PT0gJ3BhcmVudCcpIHtcbiAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHBhcmVudC5nZXQoMCkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICB9IGVsc2UgaWYgKFV0aWxzLmlzRWxlbWVudCh0aGlzLl9jb25maWcucmVmZXJlbmNlKSkge1xuICAgICAgICByZWZlcmVuY2VFbGVtZW50ID0gdGhpcy5fY29uZmlnLnJlZmVyZW5jZTtcblxuICAgICAgICAvLyBDaGVjayBpZiBpdCdzIGpRdWVyeSBlbGVtZW50XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fY29uZmlnLnJlZmVyZW5jZS5qcXVlcnkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcmVmZXJlbmNlRWxlbWVudCA9IHRoaXMuX2NvbmZpZy5yZWZlcmVuY2VbMF07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgYm91bmRhcnkgaXMgbm90IGBzY3JvbGxQYXJlbnRgLCB0aGVuIHNldCBwb3NpdGlvbiB0byBgc3RhdGljYFxuICAgICAgLy8gdG8gYWxsb3cgdGhlIG1lbnUgdG8gXCJlc2NhcGVcIiB0aGUgc2Nyb2xsIHBhcmVudCdzIGJvdW5kYXJpZXNcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvMjQyNTFcbiAgICAgIGlmICh0aGlzLl9jb25maWcuYm91bmRhcnkgIT09ICdzY3JvbGxQYXJlbnQnKSB7XG4gICAgICAgICQocGFyZW50KS5hZGRDbGFzcyhDTEFTU05BTUUuUE9TSVRJT05fU1RBVElDKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX3BvcHBlciA9IG5ldyBQb3BwZXIocmVmZXJlbmNlRWxlbWVudCwgdGhpcy5fbWVudSBhcyBIVE1MRWxlbWVudCwgdGhpcy5fZ2V0UG9wcGVyQ29uZmlnKCkpO1xuICAgIH1cblxuICAgIC8vIElmIHRoaXMgaXMgYSB0b3VjaC1lbmFibGVkIGRldmljZSB3ZSBhZGQgZXh0cmFcbiAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHRvIHRoZSBib2R5J3MgaW1tZWRpYXRlIGNoaWxkcmVuO1xuICAgIC8vIG9ubHkgbmVlZGVkIGJlY2F1c2Ugb2YgYnJva2VuIGV2ZW50IGRlbGVnYXRpb24gb24gaU9TXG4gICAgLy8gaHR0cHM6Ly93d3cucXVpcmtzbW9kZS5vcmcvYmxvZy9hcmNoaXZlcy8yMDE0LzAyL21vdXNlX2V2ZW50X2J1Yi5odG1sXG4gICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiAnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiZcbiAgICAgICAgJChwYXJlbnQpLmNsb3Nlc3QoU0VMRUNUT1IuTkFWQkFSX05BVikubGVuZ3RoID09PSAwKSB7XG4gICAgICAkKGRvY3VtZW50LmJvZHkpLmNoaWxkcmVuKCkub24oJ21vdXNlb3ZlcicsIG51bGwsICQubm9vcCk7XG4gICAgfVxuXG4gICAgdGhpcy5jbG91c2VPbkNsaWNrT3V0c2l0ZShEcm9wZG93blNlcnZpY2UuX2dldFBhcmVudEZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpKTtcblxuICAgIHRoaXMuX2VsZW1lbnQuZm9jdXMoKTtcbiAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XG5cbiAgICAkKHRoaXMuX21lbnUpLnRvZ2dsZUNsYXNzKENMQVNTTkFNRS5TSE9XKTtcbiAgICAkKHBhcmVudClcbiAgICAgIC50b2dnbGVDbGFzcyhDTEFTU05BTUUuU0hPVylcbiAgICAgIC50cmlnZ2VyKCQuRXZlbnQoRVZFTlQuU0hPV04sIHJlbGF0ZWRUYXJnZXQpKTtcbiAgfVxuXG4gIHB1YmxpYyBkaXNwb3NlKCkge1xuICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSk7XG4gICAgJCh0aGlzLl9lbGVtZW50KS5vZmYoRVZFTlRfS0VZKTtcbiAgICBkZWxldGUgdGhpcy5fZWxlbWVudDsgLy8gPSBudWxsO1xuICAgIGRlbGV0ZSB0aGlzLl9tZW51OyAvLyA9IG51bGw7XG4gICAgaWYgKHRoaXMuX3BvcHBlciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fcG9wcGVyLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMuX3BvcHBlciA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpIHtcbiAgICB0aGlzLl9pbk5hdmJhciA9IHRoaXMuX2RldGVjdE5hdmJhcigpO1xuICAgIGlmICh0aGlzLl9wb3BwZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3BvcHBlci5zY2hlZHVsZVVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFByaXZhdGVcblxuICAvKipcbiAgICogQHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNTI5NzUvaG93LWRvLWktZGV0ZWN0LWEtY2xpY2stb3V0c2lkZS1hbi1lbGVtZW50XG4gICAqIEBwYXJhbSBzZWxlY3RvclxuICAgKi9cbiAgcHJpdmF0ZSBjbG91c2VPbkNsaWNrT3V0c2l0ZSgkZWxlbWVudDogSlF1ZXJ5PEVsZW1lbnQ+KSB7XG4gICAgY29uc3Qgb3V0c2lkZUNsaWNrTGlzdGVuZXIgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICBpZiAoISQoZXZlbnQudGFyZ2V0IGFzIGFueSkuY2xvc2VzdCgkZWxlbWVudC5nZXQoMCkpLmxlbmd0aCkge1xuICAgICAgICB0aGlzLmNsb3NlKCk7XG4gICAgICAgIHJlbW92ZUNsaWNrTGlzdGVuZXIoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3QgcmVtb3ZlQ2xpY2tMaXN0ZW5lciA9ICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3V0c2lkZUNsaWNrTGlzdGVuZXIpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG91dHNpZGVDbGlja0xpc3RlbmVyKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldENvbmZpZyhjb25maWc/OiBhbnkpIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAuLi5Ecm9wZG93blNlcnZpY2UuRGVmYXVsdCxcbiAgICAgIC4uLiQodGhpcy5fZWxlbWVudCkuZGF0YSgpLFxuICAgICAgLi4uY29uZmlnLFxuICAgIH07XG5cbiAgICBVdGlscy50eXBlQ2hlY2tDb25maWcoXG4gICAgICBOQU1FLFxuICAgICAgY29uZmlnLFxuICAgICAgRHJvcGRvd25TZXJ2aWNlLkRlZmF1bHRUeXBlLFxuICAgICk7XG5cbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TWVudUVsZW1lbnQoKSB7XG4gICAgaWYgKCF0aGlzLl9tZW51KSB7XG4gICAgICBjb25zdCBwYXJlbnQgPSBEcm9wZG93blNlcnZpY2UuX2dldFBhcmVudEZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpO1xuICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICB0aGlzLl9tZW51ID0gcGFyZW50LmZpbmQoU0VMRUNUT1IuTUVOVSkuZ2V0KDApO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fbWVudTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFBsYWNlbWVudCgpIHtcbiAgICBjb25zdCAkcGFyZW50RHJvcGRvd24gPSAkKHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZSBhcyBhbnkpO1xuICAgIGxldCBwbGFjZW1lbnQgPSBBVFRBQ0hNRU5UTUFQLkJPVFRPTTtcblxuICAgIC8vIEhhbmRsZSBkcm9wdXBcbiAgICBpZiAoJHBhcmVudERyb3Bkb3duLmhhc0NsYXNzKENMQVNTTkFNRS5EUk9QVVApKSB7XG4gICAgICBwbGFjZW1lbnQgPSBBVFRBQ0hNRU5UTUFQLlRPUDtcbiAgICAgIGlmICgkKHRoaXMuX21lbnUpLmhhc0NsYXNzKENMQVNTTkFNRS5NRU5VUklHSFQpKSB7XG4gICAgICAgIHBsYWNlbWVudCA9IEFUVEFDSE1FTlRNQVAuVE9QRU5EO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoJHBhcmVudERyb3Bkb3duLmhhc0NsYXNzKENMQVNTTkFNRS5EUk9QUklHSFQpKSB7XG4gICAgICBwbGFjZW1lbnQgPSBBVFRBQ0hNRU5UTUFQLlJJR0hUO1xuICAgIH0gZWxzZSBpZiAoJHBhcmVudERyb3Bkb3duLmhhc0NsYXNzKENMQVNTTkFNRS5EUk9QTEVGVCkpIHtcbiAgICAgIHBsYWNlbWVudCA9IEFUVEFDSE1FTlRNQVAuTEVGVDtcbiAgICB9IGVsc2UgaWYgKCQodGhpcy5fbWVudSkuaGFzQ2xhc3MoQ0xBU1NOQU1FLk1FTlVSSUdIVCkpIHtcbiAgICAgIHBsYWNlbWVudCA9IEFUVEFDSE1FTlRNQVAuQk9UVE9NRU5EO1xuICAgIH1cbiAgICByZXR1cm4gcGxhY2VtZW50O1xuICB9XG5cbiAgcHJpdmF0ZSBfZGV0ZWN0TmF2YmFyKCkge1xuICAgIHJldHVybiAkKHRoaXMuX2VsZW1lbnQpLmNsb3Nlc3QoJy5uYXZiYXInKS5sZW5ndGggPiAwO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UG9wcGVyQ29uZmlnKCkge1xuICAgIGNvbnN0IG9mZnNldENvbmY6IGFueSA9IHt9O1xuICAgIGlmICh0eXBlb2YgdGhpcy5fY29uZmlnLm9mZnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb2Zmc2V0Q29uZi5mbiA9IChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgZGF0YS5vZmZzZXRzID0ge1xuICAgICAgICAgIC4uLmRhdGEub2Zmc2V0cyxcbiAgICAgICAgICAuLi50aGlzLl9jb25maWcub2Zmc2V0KGRhdGEub2Zmc2V0cykgfHwge30sXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2Zmc2V0Q29uZi5vZmZzZXQgPSB0aGlzLl9jb25maWcub2Zmc2V0O1xuICAgIH1cblxuICAgIGNvbnN0IHBvcHBlckNvbmZpZyA9IHtcbiAgICAgIHBsYWNlbWVudDogdGhpcy5fZ2V0UGxhY2VtZW50KCkgYXMgYW55LFxuICAgICAgbW9kaWZpZXJzOiB7XG4gICAgICAgIG9mZnNldDogb2Zmc2V0Q29uZixcbiAgICAgICAgZmxpcDoge1xuICAgICAgICAgIGVuYWJsZWQ6IHRoaXMuX2NvbmZpZy5mbGlwLFxuICAgICAgICB9LFxuICAgICAgICBwcmV2ZW50T3ZlcmZsb3c6IHtcbiAgICAgICAgICBib3VuZGFyaWVzRWxlbWVudDogdGhpcy5fY29uZmlnLmJvdW5kYXJ5LFxuICAgICAgICB9LFxuICAgICAgfSBhcyBhbnksXG4gICAgfTtcblxuICAgIC8vIERpc2FibGUgUG9wcGVyLmpzIGlmIHdlIGhhdmUgYSBzdGF0aWMgZGlzcGxheVxuICAgIGlmICh0aGlzLl9jb25maWcuZGlzcGxheSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgIHBvcHBlckNvbmZpZy5tb2RpZmllcnMuYXBwbHlTdHlsZSA9IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gcG9wcGVyQ29uZmlnO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgRGVidWcsIEpRdWVyeSBhcyAkIH0gZnJvbSAnQHJpYmFqcy9jb3JlJztcblxuZXhwb3J0IGNsYXNzIFRhYnNDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHB1YmxpYyBzdGF0aWMgdGFnTmFtZTogc3RyaW5nID0gJ2JzNC10YWJzJztcblxuICBwcm90ZWN0ZWQgZGVidWcgPSBEZWJ1ZygnY29tcG9uZW50OmJzNC10YWJzJyk7XG4gIHByb3RlY3RlZCBzY29wZTogYW55ID0ge307XG5cbiAgcHJpdmF0ZSAkZWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XG4gIHByaXZhdGUgJHRhYnM6IEpRdWVyeTxIVE1MRWxlbWVudD47XG4gIHByaXZhdGUgJHRhYlBhbmVzOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xuICBwcml2YXRlICRzY3JvbGxhYmxlOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xuICBwcml2YXRlIHRhYnNTYW1lSGVpZ2h0ID0gdHJ1ZTtcblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlbGVtZW50PzogSFRNTEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICBjb25zb2xlLndhcm4oJ0RlcHJpY2F0ZWQgdXNlIHRhYnMgbW9kdWxlIGZyb20gYnM0IG1vZHVsZScpO1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuJGVsID0gJCh0aGlzLmVsKTtcbiAgICB0aGlzLiR0YWJzID0gdGhpcy4kZWwuZmluZCgnLm5hdi1saW5rJyk7XG4gICAgdGhpcy4kdGFiUGFuZXMgPSB0aGlzLiRlbC5maW5kKCcudGFiLXBhbmUnKTtcbiAgICB0aGlzLiRzY3JvbGxhYmxlID0gdGhpcy4kZWwuZmluZCgnW3Njcm9sbGFibGVdJyk7XG5cbiAgICB0aGlzLmRlYnVnKCdjb25zdHJ1Y3RvcicsIHRoaXMuJGVsLCB0aGlzLiR0YWJzLCB0aGlzLiR0YWJQYW5lcyk7XG5cbiAgICB0aGlzLiR0YWJzLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29uc3QgJHRhYiA9ICQodGhpcyk7XG4gICAgICBzZWxmLmFjdGl2YXRlKCR0YWIpO1xuICAgIH0pO1xuXG4gICAgdGhpcy4kdGFicy5vZmYoJ3Nob3duLmJzLnRhYicpLm9uKCdzaG93bi5icy50YWInLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0ICR0YWIgPSAkKGV2ZW50LnRhcmdldCk7XG4gICAgICBpZiAodGhpcy4kc2Nyb2xsYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgdGFiU2Nyb2xsUG9zaXRpb24gPSAkdGFiWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBzY3JvbGxMZWZ0VG8gPSB0aGlzLiRzY3JvbGxhYmxlLnNjcm9sbExlZnQoKSB8fCAwICsgdGFiU2Nyb2xsUG9zaXRpb24ubGVmdDtcbiAgICAgICAgdGhpcy4kc2Nyb2xsYWJsZS5hbmltYXRlKHsgc2Nyb2xsTGVmdDogc2Nyb2xsTGVmdFRvfSwgJ3Nsb3cnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWN0aXZhdGUodGhpcy4kdGFicy5maXJzdCgpKTtcblxuICAgIGlmICh0aGlzLnRhYnNTYW1lSGVpZ2h0KSB7XG4gICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsICgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRIZWlnaHQoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuaW5pdChUYWJzQ29tcG9uZW50Lm9ic2VydmVkQXR0cmlidXRlcyk7XG4gIH1cblxuICAvKipcbiAgICogTWFrZSBhbGwgdGFicyBwYW5lcyBhcyBoZWlnaHQgYXMgdGhlIGhlaWdoZXN0IHRhYiBwYW5lXG4gICAqL1xuICBwdWJsaWMgc2V0SGVpZ2h0KCkge1xuICAgIGxldCBoZWlnZXN0ID0gMDtcbiAgICB0aGlzLiR0YWJQYW5lcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgJHRhYlBhbmUgPSAkKHRoaXMpO1xuICAgICAgJHRhYlBhbmUuY3NzKCdoZWlnaHQnLCAnYXV0bycpO1xuICAgICAgY29uc3QgaGVpZ2h0ID0gJHRhYlBhbmUuaGVpZ2h0KCkgfHwgMDtcbiAgICAgIGlmIChoZWlnaHQgPiBoZWlnZXN0KSB7XG4gICAgICAgIGhlaWdlc3QgPSBoZWlnaHQ7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy4kdGFiUGFuZXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0ICR0YWJQYW5lID0gJCh0aGlzKTtcbiAgICAgICR0YWJQYW5lLmNzcygnaGVpZ2h0JywgaGVpZ2VzdCArICdweCcpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGRlYWN0aXZhdGVBbGwoKSB7XG4gICAgdGhpcy4kdGFicy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgJHRhYiA9ICQodGhpcyk7XG4gICAgICAkdGFiLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICB9KTtcbiAgICB0aGlzLiR0YWJQYW5lcy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgJHRhYlBhbmUgPSAkKHRoaXMpO1xuICAgICAgJHRhYlBhbmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZSBzaG93Jyk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYWN0aXZhdGUoJHRhYjogSlF1ZXJ5PEhUTUxFbGVtZW50Pikge1xuICAgIGNvbnN0IHRhcmdldCA9ICR0YWIuYXR0cignaHJlZicpO1xuICAgIHRoaXMuZGVidWcoJ2FjdGl2YXRlJywgdGFyZ2V0LCB0aGlzLiRlbC5maW5kKHRhcmdldCB8fCAnJykpO1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIGNvbnN0ICR0YXJnZXQgPSB0aGlzLiRlbC5maW5kKHRhcmdldCk7XG4gICAgICB0aGlzLmRlYWN0aXZhdGVBbGwoKTtcbiAgICAgICR0YXJnZXQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgJHRhcmdldC5hZGRDbGFzcygnc2hvdycpO1xuICAgICAgICAgICR0YWIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICR0YXJnZXQudHJpZ2dlcignc2hvd24uYnMudGFiJyk7XG4gICAgICAgICAgJHRhYi50cmlnZ2VyKCdzaG93bi5icy50YWInKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBhZnRlckJpbmQoKTogUHJvbWlzZTxhbnk+IHtcbiAgICB0aGlzLnNldEhlaWdodCgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHRlbXBsYXRlKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiXCI7IiwiaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgeyBDb21wb25lbnQsIERlYnVnLCBJQmluZGVyLCBKUXVlcnkgYXMgJCB9IGZyb20gJ0ByaWJhanMvY29yZSc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9jb250YWN0LWZvcm0uY29tcG9uZW50Lmh0bWwnO1xuaW1wb3J0IHsgTG9jYWxlc1NlcnZpY2UgfSBmcm9tICdAcmliYWpzL3Nob3BpZnktdGRhJztcblxuLy8gVE9ETyBtb3ZlIHRvIGdlbmVyYWwgdmFsaWRhdGlvbiBjb21wb25lbnQgY2xhc3Mgd2UgY2FuIGV4dGVuZCBmcm9tXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uUnVsZSB7XG4gIHJlcXVpcmVkOiBib29sZWFuO1xuICBtaW5sZW5ndGg/OiBudW1iZXI7XG4gIG1heGxlbmd0aD86IG51bWJlcjtcbiAgbWF4PzogbnVtYmVyO1xuICBtaW4/OiBudW1iZXI7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGlzRW1haWw/OiBib29sZWFuO1xuICBpc1Bob25lPzogYm9vbGVhbjtcbiAgb25seU51bWJlcnM/OiBib29sZWFuO1xufVxuXG4vLyBUT0RPIG1vdmUgdG8gZ2VuZXJhbCB2YWxpZGF0aW9uIGNvbXBvbmVudCBjbGFzcyB3ZSBjYW4gZXh0ZW5kIGZyb21cbmV4cG9ydCBpbnRlcmZhY2UgSVZhbGlkYXRpb25PYmplY3Qge1xuICB2YWxpZDogYm9vbGVhbjtcbiAgcnVsZXM/OiB7XG4gICAgW2tleTogc3RyaW5nXTogSVZhbGlkYXRpb25SdWxlO1xuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgQ29udGFjdEZvcm1Db21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHB1YmxpYyBzdGF0aWMgdGFnTmFtZTogc3RyaW5nID0gJ3J2LWNvbnRhY3QtZm9ybSc7XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRlYnVnID0gRGVidWcoJ2NvbXBvbmVudDonICsgQ29udGFjdEZvcm1Db21wb25lbnQudGFnTmFtZSk7XG5cbiAgcHJvdGVjdGVkIGxvY2Fsc1NlcnZpY2UgPSBuZXcgTG9jYWxlc1NlcnZpY2UoKTtcblxuICBwcm90ZWN0ZWQgJGZvcm0/OiBKUXVlcnk8SFRNTEZvcm1FbGVtZW50PjtcblxuICBwcm90ZWN0ZWQgc2NvcGU6IGFueSA9IHtcbiAgICBmb3JtOiB7XG4gICAgICBmaXJzdE5hbWU6ICcnLFxuICAgICAgbGFzdE5hbWU6ICcnLFxuICAgICAgcGhvbmU6ICcnLFxuICAgICAgZW1haWw6ICcnLFxuICAgICAgbWVzc2FnZTogJycsXG4gICAgfSxcbiAgICB2YWxpZGF0aW9uOiB0aGlzLmdldFZhbGlkYXRpb25PYmplY3QoKSxcbiAgICAvKiogc2VuZCBmb3JtIGZ1bmN0aW9uICovXG4gICAgc2VuZDogdGhpcy5zZW5kLFxuICAgIC8qKiBzZWxlY3QgYWxsIHRleHQgZnVuY3Rpb24gKi9cbiAgICBzZWxlY3RBbGw6IHRoaXMuc2VsZWN0QWxsLFxuICAgIC8qKiBmb3JtIHBvc3QgcmVxdWVzdCBlcnJvciBtZXNzYWdlIGlmIGZvcm0gZmFpbHMgKi9cbiAgICBlcnJvcjogJycsXG4gICAgLyoqIGZvcm0gcG9zdCByZXF1ZXN0IHN1Y2Nlc3MgbWVzc2FnZSBpZiBmb3JtIHJlcXVlc3Qgd2FzIHN1Y2NlcyAqL1xuICAgIHN1Y2Nlc3M6ICcnLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ/OiBIVE1MRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMuaW5pdChDb250YWN0Rm9ybUNvbXBvbmVudC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgdGhlIGNvbnRhY3QgZm9ybSB1c2luZyBhIGZvcm0gc3VibWl0IHJlcXVlc3Qgd2l0aCBiZXN0IHNob3BpZnkgZm9ybSBzdXBwb3J0XG4gICAqL1xuICBwdWJsaWMgc2VuZChjb250ZXh0OiBJQmluZGVyPGFueT4sIGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuZGVidWcoJ3NlbmQnLCB0aGlzLnNjb3BlLCBldmVudCk7XG5cbiAgICB0aGlzLnNjb3BlLmZvcm0uZmlyc3ROYW1lID0gVXRpbHMuc3RyaXBIdG1sKHRoaXMuc2NvcGUuZm9ybS5maXJzdE5hbWUpO1xuICAgIHRoaXMuc2NvcGUuZm9ybS5sYXN0TmFtZSA9IFV0aWxzLnN0cmlwSHRtbCh0aGlzLnNjb3BlLmZvcm0ubGFzdE5hbWUpO1xuICAgIHRoaXMuc2NvcGUuZm9ybS5waG9uZSA9IFV0aWxzLnN0cmlwSHRtbCh0aGlzLnNjb3BlLmZvcm0ucGhvbmUpO1xuICAgIHRoaXMuc2NvcGUuZm9ybS5lbWFpbCA9IFV0aWxzLnN0cmlwSHRtbCh0aGlzLnNjb3BlLmZvcm0uZW1haWwpO1xuXG4gICAgaWYgKHRoaXMuJGZvcm0pIHtcbiAgICAgIHRoaXMuc2NvcGUudmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUodGhpcy5zY29wZS52YWxpZGF0aW9uLCB0aGlzLnNjb3BlLmZvcm0sIFsnZmlyc3ROYW1lJywgJ2xhc3ROYW1lJywgJ3Bob25lJywgJ2VtYWlsJywgJ21lc3NhZ2UnXSwgdGhpcy4kZm9ybSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnNjb3BlLnZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgIC8vIHN0b3AgYXV0b21hdGljIHN1Ym1pdFxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICB9XG5cbiAgcHVibGljIHNlbGVjdEFsbChjb250ZXh0OiBJQmluZGVyPGFueT4sIGV2ZW50OiBKUXVlcnkuRXZlbnQsIHNjb3BlOiBhbnksIGV2ZW50RWw6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICB0aGlzLmRlYnVnKCdzZWxlY3RBbGwnKTtcbiAgICBVdGlscy5zZWxlY3RBbGwoZXZlbnRFbCk7XG4gIH1cblxuICAvKipcbiAgICogdmFsaWRhdGUgZm9ybVxuICAgKiBAcGFyYW0gdmFsaWRhdGlvbiBvYmplY3Qgd2l0aCB0aGUgdmFsaWRhdGlvbiBydWxlc1xuICAgKiBAcGFyYW0gdGhlIGZvcm0gd2l0aCB0aGUgdmFsdWVzIGZvcm0gdGhlIGZvcm1cbiAgICogQHBhcmFtIGtleXMga2V5cyB5b3Ugd2FudCB0byB2YWxpZGF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIHZhbGlkYXRlKHZhbGlkYXRpb246IElWYWxpZGF0aW9uT2JqZWN0LCBmb3JtVmFsdWVzOiBhbnksIGtleXM6IHN0cmluZ1tdLCAkZm9ybTogSlF1ZXJ5PEhUTUxGb3JtRWxlbWVudD4pIHtcbiAgICB2YWxpZGF0aW9uLnZhbGlkID0gdHJ1ZTtcblxuICAgIGtleXMuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICghdmFsaWRhdGlvbi5ydWxlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnJztcbiAgICAgIC8vIHZhbHVlIGlzIHJlcXVyZWRcbiAgICAgIGlmICh2YWxpZGF0aW9uLnJ1bGVzW2tleV0ucmVxdWlyZWQpIHtcbiAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKGZvcm1WYWx1ZXNba2V5XSkpIHtcbiAgICAgICAgICBpZiAoZm9ybVZhbHVlc1trZXldLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAvLyB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZCc7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnZm9ybXMuaW52YWxpZC5yZXF1aXJlZCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChVdGlscy5pc1VuZGVmaW5lZChmb3JtVmFsdWVzW2tleV0pKSB7XG4gICAgICAgICAgLy8gdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQnO1xuICAgICAgICAgIHZhbGlkYXRpb24ucnVsZXNba2V5XS5lcnJvciA9ICdmb3Jtcy5pbnZhbGlkLnJlcXVpcmVkJztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZGF0aW9uIGZvciBudW1iZXJzXG4gICAgICBpZiAoVXRpbHMuaXNOdW1iZXIoZm9ybVZhbHVlc1trZXldKSkge1xuICAgICAgICAvLyBtYXhpbXVtIHZhbHVlIGZvciBudW1iZXJcbiAgICAgICAgaWYgKFV0aWxzLmlzTnVtYmVyKHZhbGlkYXRpb24ucnVsZXNba2V5XS5tYXgpKSB7XG4gICAgICAgICAgaWYgKGZvcm1WYWx1ZXNba2V5XSA+ICh2YWxpZGF0aW9uLnJ1bGVzW2tleV0ubWF4IGFzIG51bWJlcikpIHtcbiAgICAgICAgICAgIC8vIHZhbGlkYXRpb24ucnVsZXNba2V5XS5lcnJvciA9ICdUaGUgbnVtYmVyIG11c3QgYmUgYSBtYXhpbXVtIG9mICcgKyB2YWxpZGF0aW9uLnJ1bGVzW2tleV0ubWF4O1xuICAgICAgICAgICAgdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ2Zvcm1zLmludmFsaWQucmVxdWlyZWQnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1pbmltdW0gdmFsdWUgZm9yIG51bWJlclxuICAgICAgICBpZiAoVXRpbHMuaXNOdW1iZXIodmFsaWRhdGlvbi5ydWxlc1trZXldLm1pbikpIHtcbiAgICAgICAgICBpZiAoZm9ybVZhbHVlc1trZXldIDwgKHZhbGlkYXRpb24ucnVsZXNba2V5XS5taW4gYXMgbnVtYmVyKSkge1xuICAgICAgICAgICAgLy8gdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ1RoZSBudW1iZXIgbXVzdCBiZSBhdCBsZWFzdCAnICsgdmFsaWRhdGlvbi5ydWxlc1trZXldLm1pbjtcbiAgICAgICAgICAgIHZhbGlkYXRpb24ucnVsZXNba2V5XS5lcnJvciA9ICdmb3Jtcy5pbnZhbGlkLm1pbic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkYXRpb24gZm9yIHN0cmluZ3NcbiAgICAgIGlmIChVdGlscy5pc1N0cmluZyhmb3JtVmFsdWVzW2tleV0pICYmIGZvcm1WYWx1ZXNba2V5XS5sZW5ndGggPj0gMSApIHtcbiAgICAgICAgLy8gbWF4aW11bSB2YWx1ZSBmb3Igc3RyaW5nIGxlbmd0aFxuICAgICAgICBpZiAoVXRpbHMuaXNOdW1iZXIodmFsaWRhdGlvbi5ydWxlc1trZXldLm1heGxlbmd0aCkpIHtcbiAgICAgICAgICBpZiAoZm9ybVZhbHVlc1trZXldLmxlbmd0aCA+ICh2YWxpZGF0aW9uLnJ1bGVzW2tleV0ubWF4bGVuZ3RoIGFzIG51bWJlcikpIHtcbiAgICAgICAgICAgIC8vIHZhbGlkYXRpb24ucnVsZXNba2V5XS5lcnJvciA9ICdUaGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgbXVzdCBub3QgZXhjZWVkICcgKyB2YWxpZGF0aW9uLnJ1bGVzW2tleV0ubWF4bGVuZ3RoO1xuICAgICAgICAgICAgdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ2Zvcm1zLmludmFsaWQubWF4bGVuZ3RoJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtaW5pbXVtIHZhbHVlIGZvciBzdHJpbmcgbGVuZ3RoXG4gICAgICAgIGlmIChVdGlscy5pc051bWJlcih2YWxpZGF0aW9uLnJ1bGVzW2tleV0ubWlubGVuZ3RoKSkge1xuICAgICAgICAgIGlmIChmb3JtVmFsdWVzW2tleV0ubGVuZ3RoIDwgKHZhbGlkYXRpb24ucnVsZXNba2V5XS5taW5sZW5ndGggYXMgbnVtYmVyKSkge1xuICAgICAgICAgICAgLy8gdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ1RoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBtdXN0IGJlIGF0IGxlYXN0ICcgKyB2YWxpZGF0aW9uLnJ1bGVzW2tleV0ubWlubGVuZ3RoO1xuICAgICAgICAgICAgdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ2Zvcm1zLmludmFsaWQubWlubGVuZ3RoJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbWFpbFxuICAgICAgICBpZiAodmFsaWRhdGlvbi5ydWxlc1trZXldLmlzRW1haWwpIHtcbiAgICAgICAgICBpZiAoZm9ybVZhbHVlc1trZXldLmluZGV4T2YoJ0AnKSA8PSAtMSkge1xuICAgICAgICAgICAgLy8gdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ1RoaXMgaXMgbm90IGEgdmFsaWQgZW1haWwgYWRkcmVzcyc7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnZm9ybXMuaW52YWxpZC5pbnZhbGlkX2VtYWlsJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZm9ybVZhbHVlc1trZXldLmluZGV4T2YoJy4nKSA8PSAtMSkge1xuICAgICAgICAgICAgLy8gdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ1RoaXMgaXMgbm90IGEgdmFsaWQgZW1haWwgYWRkcmVzcyc7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnZm9ybXMuaW52YWxpZC5pbnZhbGlkX2VtYWlsJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwaG9uZSBudW1iZXJcbiAgICAgICAgaWYgKHZhbGlkYXRpb24ucnVsZXNba2V5XS5pc1Bob25lKSB7XG4gICAgICAgICAgaWYgKCFVdGlscy5zdHJpbmdJc1Bob25lTnVtYmVyKGZvcm1WYWx1ZXNba2V5XSkpIHtcbiAgICAgICAgICAgIC8vIHZhbGlkYXRpb24ucnVsZXNba2V5XS5lcnJvciA9ICdUaGUgcGhvbmUgbnVtYmVyIGNhbiBvbmx5IGNvbnRhaW4gbnVtYmVycywgKywgLSwgKSBhbmQgKCc7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnZm9ybXMuaW52YWxpZC5pbnZhbGlkX3Bob25lJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBvbmx5IG51bWJlcnNcbiAgICAgICAgaWYgKHZhbGlkYXRpb24ucnVsZXNba2V5XS5vbmx5TnVtYmVycykge1xuICAgICAgICAgIGlmICghVXRpbHMuc3RyaW5nSGFzT25seU51bWJlcnMoZm9ybVZhbHVlc1trZXldKSkge1xuICAgICAgICAgICAgLy8gdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ1RoZSB2YWx1ZSBtYXkgb25seSBjb250YWluIG51bWJlcnMnO1xuICAgICAgICAgICAgdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ2Zvcm1zLmludmFsaWQub25seV9udW1iZXJzJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gaXMgYWxsIHZhbGlkP1xuICAgICAgaWYgKHZhbGlkYXRpb24ucnVsZXNba2V5XS5lcnJvci5sZW5ndGgpIHtcbiAgICAgICAgdmFsaWRhdGlvbi52YWxpZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUnVuIGFsc28gdGhlIG5hdGl2ZSBicm93c2VyIHZhbGlkYXRpb25cbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IVE1MU2VsZWN0RWxlbWVudC9jaGVja1ZhbGlkaXR5XG4gICAgICovXG4gICAgaWYgKHZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgIHZhbGlkYXRpb24udmFsaWQgPSAkZm9ybVswXS5jaGVja1ZhbGlkaXR5KCk7XG4gICAgfVxuXG4gICAgJGZvcm0uYWRkQ2xhc3MoJ3dhcy12YWxpZGF0ZWQnKTtcbiAgICB0aGlzLmRlYnVnKCd2YWxpZGF0ZScsIHZhbGlkYXRpb24pO1xuICAgIHJldHVybiB2YWxpZGF0aW9uO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFZhbGlkYXRpb25PYmplY3QoKSB7XG4gICAgY29uc3QgdmFsaWRhdGlvbjogSVZhbGlkYXRpb25PYmplY3QgPSB7XG4gICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgIHJ1bGVzOiB7XG4gICAgICAgIGZpcnN0TmFtZToge1xuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIG1pbmxlbmd0aDogMyxcbiAgICAgICAgICBlcnJvcjogJycsXG4gICAgICAgIH0sXG4gICAgICAgIGxhc3ROYW1lOiB7XG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgbWlubGVuZ3RoOiAzLFxuICAgICAgICAgIGVycm9yOiAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICBpc0VtYWlsOiB0cnVlLFxuICAgICAgICAgIG1pbmxlbmd0aDogMyxcbiAgICAgICAgICBlcnJvcjogJycsXG4gICAgICAgIH0sXG4gICAgICAgIHBob25lOiB7XG4gICAgICAgICAgcmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICAgIGlzUGhvbmU6IHRydWUsXG4gICAgICAgICAgbWlubGVuZ3RoOiA0LFxuICAgICAgICAgIGVycm9yOiAnJyxcbiAgICAgICAgfSxcbiAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIG1pbmxlbmd0aDogMjAsXG4gICAgICAgICAgZXJyb3I6ICcnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiB2YWxpZGF0aW9uO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGJlZm9yZUJpbmQoKSB7XG4gICAgdGhpcy5kZWJ1ZygnYmVmb3JlJyk7XG4gICAgdGhpcy4kZm9ybSA9ICQodGhpcy5lbCkuZmluZCgnZm9ybScpIGFzIEpRdWVyeTxIVE1MRm9ybUVsZW1lbnQ+O1xuXG4gICAgLy8gRm9yIGN1c3RvbSBzdHlsZSBmb3JtIHZhbGlkYXRpb24sIHNlZSBodHRwczovL2dldGJvb3RzdHJhcC5jb20vZG9jcy80LjEvY29tcG9uZW50cy9mb3Jtcy8jY3VzdG9tLXN0eWxlc1xuICAgIHRoaXMuJGZvcm0uYWRkQ2xhc3MoJ25lZWRzLXZhbGlkYXRpb24nKTtcbiAgICB0aGlzLiRmb3JtLmF0dHIoJ25vdmFsaWRhdGUnLCAnJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVxdWlyZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByb3RlY3RlZCB0ZW1wbGF0ZSgpIHtcbiAgICAvLyBPbmx5IHNldCB0aGUgY29tcG9uZW50IHRlbXBsYXRlIGlmIHRoZXJlIG5vIGNoaWxkcyBhbHJlYWR5XG4gICAgaWYgKHRoaXMuZWwuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIlwiOyIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgRGVidWcsXG4gIElCaW5kZXIsXG59IGZyb20gJ0ByaWJhanMvY29yZSc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9jb29raWUtYmFubmVyLmNvbXBvbmVudC5odG1sJztcblxuaW50ZXJmYWNlIElTY29wZSB7XG4gIGFjY2VwdDogQ29va2llQmFubmVyQ29tcG9uZW50WydhY2NlcHQnXTtcbiAgY2xvc2U6IENvb2tpZUJhbm5lckNvbXBvbmVudFsnY2xvc2UnXTtcbiAgc2hvdzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIENvb2tpZUJhbm5lckNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyB0YWdOYW1lOiBzdHJpbmcgPSAncnYtY29va2llLWJhbm5lcic7XG5cbiAgcHJvdGVjdGVkIGNvb2tpZUFjY2VwdGVkU3RyaW5nID0gJ2Nvb2tpZWNvbnNlbnRfYWNjZXB0ZWQnO1xuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ3RpdGxlJywgJ3RleHQnLCAndXJsJywgJ2xhYmVsJ107XG4gIH1cblxuICBwcm90ZWN0ZWQgZGVidWcgPSBEZWJ1ZygnY29tcG9uZW50OicgKyBDb29raWVCYW5uZXJDb21wb25lbnQudGFnTmFtZSk7XG5cbiAgcHJvdGVjdGVkIHNjb3BlOiBJU2NvcGUgPSB7XG4gICAgYWNjZXB0OiB0aGlzLmFjY2VwdCxcbiAgICBjbG9zZTogdGhpcy5jbG9zZSxcbiAgICBzaG93OiBmYWxzZSxcbiAgfTtcblxuICBwcm90ZWN0ZWQgZ2V0IGNvb2tpZUFjY2VwdGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmIChkb2N1bWVudC5jb29raWUuaW5kZXhPZih0aGlzLmNvb2tpZUFjY2VwdGVkU3RyaW5nICsgJz10cnVlJykgPiAtMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXQgY29va2llQWNjZXB0ZWQoYWNjZXB0ZWQ6IGJvb2xlYW4pIHtcbiAgICBkb2N1bWVudC5jb29raWUgPSBgJHt0aGlzLmNvb2tpZUFjY2VwdGVkU3RyaW5nfT0ke2FjY2VwdGVkfTsgZXhwaXJlcz1UaHUsIDMxIERlYyAyMDk5IDIzOjU5OjU5IFVUQzsgcGF0aD0vYDtcbiAgICB0aGlzLnNjb3BlLnNob3cgPSAhYWNjZXB0ZWQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlbGVtZW50PzogSFRNTEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLmRlYnVnKCdjb25zdHJ1Y3RvcicsIHRoaXMpO1xuICAgIHRoaXMuc2NvcGUuc2hvdyA9ICF0aGlzLmNvb2tpZUFjY2VwdGVkO1xuICAgIHRoaXMuaW5pdChDb29raWVCYW5uZXJDb21wb25lbnQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhY2NlcHQoY29udGV4dDogSUJpbmRlcjxhbnk+LCBldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLmRlYnVnKCdhY2NlcHQnKTtcbiAgICB0aGlzLmNvb2tpZUFjY2VwdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBjbG9zZShjb250ZXh0OiBJQmluZGVyPGFueT4sIGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuZGVidWcoJ2Nsb3NlJyk7XG4gICAgdGhpcy5zY29wZS5zaG93ID0gZmFsc2U7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYmVmb3JlQmluZCgpIHtcbiAgICB0aGlzLmRlYnVnKCdiZWZvcmVCaW5kJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYWZ0ZXJCaW5kKCkge1xuICAgIHRoaXMuZGVidWcoJ2FmdGVyQmluZCcsIHRoaXMuc2NvcGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlcXVpcmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcm90ZWN0ZWQgdGVtcGxhdGUoKSB7XG4gICAgLy8gT25seSBzZXQgdGhlIGNvbXBvbmVudCB0ZW1wbGF0ZSBpZiB0aGVyZSBubyBjaGlsZHMgYWxyZWFkeVxuICAgIGlmICh0aGlzLmVsLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c21hbGwgcnYtaGlkZT1oaWRkZW4gY2xhc3M9dGV4dC1yaWdodCBydi1vbi1zaW5nbGV0YXA9dG9nZ2xlQmFyIHJ2LW9uLWRvdWJsZXRhcD1oaWRlPiB7IHRoZW1lTmFtZSB9PGJyLz4gPGRpdj4gRGV2aWNlIHdpZHRoOiA8c3BhbiBjbGFzcz1cXFwiZC1pbmxpbmUtYmxvY2sgZC1zbS1ub25lXFxcIj5YUzwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcImQtbm9uZSBkLXNtLWlubGluZS1ibG9jayBkLW1kLW5vbmVcXFwiPlNNPC9zcGFuPiA8c3BhbiBjbGFzcz1cXFwiZC1ub25lIGQtbWQtaW5saW5lLWJsb2NrIGQtbGctbm9uZVxcXCI+TUQ8L3NwYW4+IDxzcGFuIGNsYXNzPVxcXCJkLW5vbmUgZC1sZy1pbmxpbmUtYmxvY2sgZC14bC1ub25lXFxcIj5MRzwvc3Bhbj4gPHNwYW4gY2xhc3M9XFxcImQtbm9uZSBkLXhsLWlubGluZS1ibG9ja1xcXCI+WEw8L3NwYW4+IDwvZGl2PiA8L3NtYWxsPlwiOyIsImltcG9ydCB7IENvbXBvbmVudCwgRGVidWcsIEpRdWVyeSBhcyAkIH0gZnJvbSAnQHJpYmFqcy9jb3JlJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL2RlYnVnLWJhci5jb21wb25lbnQuaHRtbCc7XG5cbmV4cG9ydCBjbGFzcyBEZWJ1Z0JhckNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyB0YWdOYW1lOiBzdHJpbmcgPSAncnYtZGVidWctYmFyJztcblxuICBwcm90ZWN0ZWQgZGVidWcgPSBEZWJ1ZygnY29tcG9uZW50OicgKyBEZWJ1Z0JhckNvbXBvbmVudC50YWdOYW1lKTtcblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWyd0aGVtZS1uYW1lJ107XG4gIH1cblxuICBwcm90ZWN0ZWQgc2NvcGU6IGFueSA9IHtcbiAgICBoYXNQcmV2aWV3QmFyOiBmYWxzZSxcbiAgICBoYXNBZG1pbkJhcjogZmFsc2UsXG4gICAgdG9nZ2xlQmFyOiB0aGlzLnRvZ2dsZUJhcixcbiAgICBoaWRlOiB0aGlzLmhpZGUsXG4gICAgaGlkZGVuOiBmYWxzZSxcbiAgfTtcblxuICBwcm90ZWN0ZWQgYXV0b2JpbmQgPSB0cnVlO1xuXG4gIHByb3RlY3RlZCAkZWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XG5cbiAgcHJvdGVjdGVkICRwcmV2aWV3QmFyOiBKUXVlcnk8SFRNTElGcmFtZUVsZW1lbnQ+IHwgbnVsbCA9IG51bGw7XG4gIHByb3RlY3RlZCAkYWRtaW5CYXI6IEpRdWVyeTxIVE1MSUZyYW1lRWxlbWVudD4gfCBudWxsID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50PzogSFRNTEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLiRlbCA9ICQodGhpcy5lbCk7XG5cbiAgICB0aGlzLmluaXQoRGVidWdCYXJDb21wb25lbnQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZTogc3RyaW5nLCBvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55LCBuYW1lc3BhY2U6IHN0cmluZyB8IG51bGwpIHtcbiAgICB0aGlzLmRlYnVnKCdhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2snLCBuYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUsIG5hbWVzcGFjZSk7XG4gICAgLy8gaW5qZWN0cyB0aGUgY2hhbmdlZCBhdHRyaWJ1dGVzIHRvIHNjb3BlXG4gICAgc3VwZXIuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlKCkge1xuICAgIHRoaXMuc2NvcGUuaGlkZGVuID0gIXRoaXMuc2NvcGUuaGlkZGVuO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUJhcihmb3JjZUhpZGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIGlmICh0aGlzLiRwcmV2aWV3QmFyICYmIHRoaXMuJHByZXZpZXdCYXIubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKGZvcmNlSGlkZSA9PT0gdHJ1ZSB8fCB0aGlzLmVsZW1lbnRJc1Zpc2FibGUodGhpcy4kcHJldmlld0JhcikpIHtcbiAgICAgICAgdGhpcy5kZWJ1ZygnaGlkZSBwcmV2aWV3YmFyJyk7XG4gICAgICAgIHRoaXMuJHByZXZpZXdCYXIuYXR0cignaGlkZGVuJywgJycpO1xuICAgICAgICAvLyB0aGlzLiRwcmV2aWV3QmFyLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ3Nob3cgcHJldmlld2JhcicpO1xuICAgICAgICB0aGlzLiRwcmV2aWV3QmFyLnJlbW92ZUF0dHIoJ2hpZGRlbicpO1xuICAgICAgICAvLyB0aGlzLiRwcmV2aWV3QmFyLnNob3coKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy4kYWRtaW5CYXIgJiYgdGhpcy4kYWRtaW5CYXIubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKGZvcmNlSGlkZSA9PT0gdHJ1ZSB8fCB0aGlzLmVsZW1lbnRJc1Zpc2FibGUodGhpcy4kYWRtaW5CYXIpKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ2hpZGUgYWRtaW5iYXInKTtcbiAgICAgICAgdGhpcy4kYWRtaW5CYXIuYXR0cignaGlkZGVuJywgJycpO1xuICAgICAgICAvLyB0aGlzLiRhZG1pbkJhci5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlYnVnKCdzaG93IGFkbWluYmFyJyk7XG4gICAgICAgIHRoaXMuJGFkbWluQmFyLnJlbW92ZUF0dHIoJ2hpZGRlbicpO1xuICAgICAgICAvLyB0aGlzLiRhZG1pbkJhci5zaG93KCk7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICBwcm90ZWN0ZWQgZWxlbWVudElzVmlzYWJsZSgkZWw6IEpRdWVyeTxFbGVtZW50Pikge1xuICAgIHJldHVybiAhdGhpcy5lbGVtZW50SXNIaWRkZW4oJGVsKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBlbGVtZW50SXNIaWRkZW4oJGVsOiBKUXVlcnk8RWxlbWVudD4pIHtcbiAgICByZXR1cm4gJGVsLmlzKCc6aGlkZGVuJykgfHwgJGVsWzBdLmhhc0F0dHJpYnV0ZSgnaGlkZGVuJykgfHwgJGVsLmNzcygnZGlzcGxheScpID09PSAnbm9uZScgfHwgJGVsLmNzcygndmlzaWJpbGl0eScpID09PSAnaGlkZGVuJztcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBiZWZvcmVCaW5kKCk6IFByb21pc2U8YW55PiB7XG4gICAgdGhpcy5kZWJ1ZygnYmVmb3JlQmluZCcpO1xuICAgIHRoaXMuJHByZXZpZXdCYXIgPSAkKCcjcHJldmlldy1iYXItaWZyYW1lJykgfHwgbnVsbDtcbiAgICB0aGlzLiRhZG1pbkJhciA9ICQoJyNhZG1pbi1iYXItaWZyYW1lJykgfHwgbnVsbDtcblxuICAgIGlmICh0aGlzLiRwcmV2aWV3QmFyICYmIHRoaXMuJHByZXZpZXdCYXIubGVuZ3RoKSB7XG4gICAgICB0aGlzLnNjb3BlLmhhc1ByZXZpZXdCYXIgPSB0cnVlO1xuICAgICAgdGhpcy50b2dnbGVCYXIodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJHByZXZpZXdCYXIgPSBudWxsO1xuICAgICAgdGhpcy5zY29wZS5oYXNQcmV2aWV3QmFyID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuJGFkbWluQmFyICYmIHRoaXMuJGFkbWluQmFyLmxlbmd0aCkge1xuICAgICAgdGhpcy5zY29wZS5oYXNBZG1pbkJhciA9IHRydWU7XG4gICAgICB0aGlzLnRvZ2dsZUJhcih0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kYWRtaW5CYXIgPSBudWxsO1xuICAgICAgdGhpcy5zY29wZS5oYXNBZG1pbkJhciA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCB0ZW1wbGF0ZSgpIHtcbiAgICAvLyBPbmx5IHNldCB0aGUgY29tcG9uZW50IHRlbXBsYXRlIGlmIHRoZXJlIG5vIGNoaWxkcyBhbHJlYWR5XG4gICAgaWYgKHRoaXMuZWwuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIlwiOyIsImltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBEZWJ1ZywgSlF1ZXJ5IGFzICQsIElCaW5kZXIgfSBmcm9tICdAcmliYWpzL2NvcmUnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vZGVsZXRlLWRhdGEtZm9ybS5jb21wb25lbnQuaHRtbCc7XG5pbXBvcnQgeyBMb2NhbGVzU2VydmljZSB9IGZyb20gJ0ByaWJhanMvc2hvcGlmeS10ZGEnO1xuXG4vLyBUT0RPIG1vdmUgdG8gZ2VuZXJhbCB2YWxpZGF0aW9uIGNvbXBvbmVudCBjbGFzcyB3ZSBjYW4gZXh0ZW5kIGZyb21cbmV4cG9ydCBpbnRlcmZhY2UgSVZhbGlkYXRpb25SdWxlIHtcbiAgcmVxdWlyZWQ6IGJvb2xlYW47XG4gIG1pbmxlbmd0aD86IG51bWJlcjtcbiAgbWF4bGVuZ3RoPzogbnVtYmVyO1xuICBtYXg/OiBudW1iZXI7XG4gIG1pbj86IG51bWJlcjtcbiAgZXJyb3I6IHN0cmluZztcbiAgaXNFbWFpbD86IGJvb2xlYW47XG4gIGlzUGhvbmU/OiBib29sZWFuO1xuICBvbmx5TnVtYmVycz86IGJvb2xlYW47XG59XG5cbi8vIFRPRE8gbW92ZSB0byBnZW5lcmFsIHZhbGlkYXRpb24gY29tcG9uZW50IGNsYXNzIHdlIGNhbiBleHRlbmQgZnJvbVxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvbk9iamVjdCB7XG4gIHZhbGlkOiBib29sZWFuO1xuICBydWxlcz86IHtcbiAgICBba2V5OiBzdHJpbmddOiBJVmFsaWRhdGlvblJ1bGU7XG4gIH07XG59XG5cbmV4cG9ydCBjbGFzcyBEZWxldGVEYXRhRm9ybUNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyB0YWdOYW1lOiBzdHJpbmcgPSAncnYtZGVsZXRlLWRhdGEtZm9ybSc7XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRlYnVnID0gRGVidWcoJ2NvbXBvbmVudDonICsgRGVsZXRlRGF0YUZvcm1Db21wb25lbnQudGFnTmFtZSk7XG5cbiAgcHJvdGVjdGVkIGxvY2Fsc1NlcnZpY2UgPSBuZXcgTG9jYWxlc1NlcnZpY2UoKTtcblxuICBwcm90ZWN0ZWQgJGZvcm0/OiBKUXVlcnk8SFRNTEZvcm1FbGVtZW50PjtcblxuICBwcm90ZWN0ZWQgc2NvcGU6IGFueSA9IHtcbiAgICBmb3JtOiB7XG4gICAgICBmaXJzdE5hbWU6ICcnLFxuICAgICAgbGFzdE5hbWU6ICcnLFxuICAgICAgcGhvbmU6ICcnLFxuICAgICAgZW1haWw6ICcnLFxuICAgICAgbWVzc2FnZTogJycsXG4gICAgfSxcbiAgICB2YWxpZGF0aW9uOiB0aGlzLmdldFZhbGlkYXRpb25PYmplY3QoKSxcbiAgICAvKiogc2VuZCBmb3JtIGZ1bmN0aW9uICovXG4gICAgc2VuZDogdGhpcy5zZW5kLFxuICAgIC8qKiBzZWxlY3QgYWxsIHRleHQgZnVuY3Rpb24gKi9cbiAgICBzZWxlY3RBbGw6IHRoaXMuc2VsZWN0QWxsLFxuICAgIC8qKiBmb3JtIHBvc3QgcmVxdWVzdCBlcnJvciBtZXNzYWdlIGlmIGZvcm0gZmFpbHMgKi9cbiAgICBlcnJvcjogJycsXG4gICAgLyoqIGZvcm0gcG9zdCByZXF1ZXN0IHN1Y2Nlc3MgbWVzc2FnZSBpZiBmb3JtIHJlcXVlc3Qgd2FzIHN1Y2NlcyAqL1xuICAgIHN1Y2Nlc3M6ICcnLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ/OiBIVE1MRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMuaW5pdChEZWxldGVEYXRhRm9ybUNvbXBvbmVudC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgdGhlIGNvbnRhY3QgZm9ybSB1c2luZyBhIGZvcm0gc3VibWl0IHJlcXVlc3Qgd2l0aCBiZXN0IHNob3BpZnkgZm9ybSBzdXBwb3J0XG4gICAqL1xuICBwdWJsaWMgc2VuZChjb250ZXh0OiBJQmluZGVyPGFueT4sIGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuZGVidWcoJ3NlbmQnLCB0aGlzLnNjb3BlLCBldmVudCk7XG5cbiAgICB0aGlzLnNjb3BlLmZvcm0uZmlyc3ROYW1lID0gVXRpbHMuc3RyaXBIdG1sKHRoaXMuc2NvcGUuZm9ybS5maXJzdE5hbWUpO1xuICAgIHRoaXMuc2NvcGUuZm9ybS5sYXN0TmFtZSA9IFV0aWxzLnN0cmlwSHRtbCh0aGlzLnNjb3BlLmZvcm0ubGFzdE5hbWUpO1xuICAgIHRoaXMuc2NvcGUuZm9ybS5waG9uZSA9IFV0aWxzLnN0cmlwSHRtbCh0aGlzLnNjb3BlLmZvcm0ucGhvbmUpO1xuICAgIHRoaXMuc2NvcGUuZm9ybS5lbWFpbCA9IFV0aWxzLnN0cmlwSHRtbCh0aGlzLnNjb3BlLmZvcm0uZW1haWwpO1xuXG4gICAgaWYgKHRoaXMuJGZvcm0pIHtcbiAgICAgIHRoaXMuc2NvcGUudmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUodGhpcy5zY29wZS52YWxpZGF0aW9uLCB0aGlzLnNjb3BlLmZvcm0sIFsnZmlyc3ROYW1lJywgJ2xhc3ROYW1lJywgJ3Bob25lJywgJ2VtYWlsJywgJ21lc3NhZ2UnXSwgdGhpcy4kZm9ybSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnNjb3BlLnZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgIC8vIHN0b3AgYXV0b21hdGljIHN1Ym1pdFxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICB9XG5cbiAgcHVibGljIHNlbGVjdEFsbChjb250ZXh0OiBJQmluZGVyPGFueT4sIGV2ZW50OiBKUXVlcnkuRXZlbnQsIHNjb3BlOiBhbnksIGV2ZW50RWw6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICB0aGlzLmRlYnVnKCdzZWxlY3RBbGwnKTtcbiAgICBVdGlscy5zZWxlY3RBbGwoZXZlbnRFbCk7XG4gIH1cblxuICAvKipcbiAgICogdmFsaWRhdGUgZm9ybVxuICAgKiBAcGFyYW0gdmFsaWRhdGlvbiBvYmplY3Qgd2l0aCB0aGUgdmFsaWRhdGlvbiBydWxlc1xuICAgKiBAcGFyYW0gdGhlIGZvcm0gd2l0aCB0aGUgdmFsdWVzIGZvcm0gdGhlIGZvcm1cbiAgICogQHBhcmFtIGtleXMga2V5cyB5b3Ugd2FudCB0byB2YWxpZGF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIHZhbGlkYXRlKHZhbGlkYXRpb246IElWYWxpZGF0aW9uT2JqZWN0LCBmb3JtVmFsdWVzOiBhbnksIGtleXM6IHN0cmluZ1tdLCAkZm9ybTogSlF1ZXJ5PEhUTUxGb3JtRWxlbWVudD4pIHtcbiAgICB2YWxpZGF0aW9uLnZhbGlkID0gdHJ1ZTtcblxuICAgIGtleXMuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICghdmFsaWRhdGlvbi5ydWxlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnJztcbiAgICAgIC8vIHZhbHVlIGlzIHJlcXVyZWRcbiAgICAgIGlmICh2YWxpZGF0aW9uLnJ1bGVzW2tleV0ucmVxdWlyZWQpIHtcbiAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKGZvcm1WYWx1ZXNba2V5XSkpIHtcbiAgICAgICAgICBpZiAoZm9ybVZhbHVlc1trZXldLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChVdGlscy5pc1VuZGVmaW5lZChmb3JtVmFsdWVzW2tleV0pKSB7XG4gICAgICAgICAgdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkYXRpb24gZm9yIG51bWJlcnNcbiAgICAgIGlmIChVdGlscy5pc051bWJlcihmb3JtVmFsdWVzW2tleV0pKSB7XG4gICAgICAgIC8vIG1heGltdW0gdmFsdWUgZm9yIG51bWJlclxuICAgICAgICBpZiAoVXRpbHMuaXNOdW1iZXIodmFsaWRhdGlvbi5ydWxlc1trZXldLm1heCkpIHtcbiAgICAgICAgICBpZiAoZm9ybVZhbHVlc1trZXldID4gKHZhbGlkYXRpb24ucnVsZXNba2V5XS5tYXggYXMgbnVtYmVyKSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ1RoZSBudW1iZXIgbXVzdCBiZSBhIG1heGltdW0gb2YgJyArIHZhbGlkYXRpb24ucnVsZXNba2V5XS5tYXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWluaW11bSB2YWx1ZSBmb3IgbnVtYmVyXG4gICAgICAgIGlmIChVdGlscy5pc051bWJlcih2YWxpZGF0aW9uLnJ1bGVzW2tleV0ubWluKSkge1xuICAgICAgICAgIGlmIChmb3JtVmFsdWVzW2tleV0gPCAodmFsaWRhdGlvbi5ydWxlc1trZXldLm1pbiBhcyBudW1iZXIpKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnVGhlIG51bWJlciBtdXN0IGJlIGF0IGxlYXN0ICcgKyB2YWxpZGF0aW9uLnJ1bGVzW2tleV0ubWluO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZGF0aW9uIGZvciBzdHJpbmdzXG4gICAgICBpZiAoVXRpbHMuaXNTdHJpbmcoZm9ybVZhbHVlc1trZXldKSAmJiBmb3JtVmFsdWVzW2tleV0ubGVuZ3RoID49IDEgKSB7XG4gICAgICAgIC8vIG1heGltdW0gdmFsdWUgZm9yIHN0cmluZyBsZW5ndGhcbiAgICAgICAgaWYgKFV0aWxzLmlzTnVtYmVyKHZhbGlkYXRpb24ucnVsZXNba2V5XS5tYXhsZW5ndGgpKSB7XG4gICAgICAgICAgaWYgKGZvcm1WYWx1ZXNba2V5XS5sZW5ndGggPiAodmFsaWRhdGlvbi5ydWxlc1trZXldLm1heGxlbmd0aCBhcyBudW1iZXIpKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnVGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIG11c3Qgbm90IGV4Y2VlZCAnICsgdmFsaWRhdGlvbi5ydWxlc1trZXldLm1heGxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtaW5pbXVtIHZhbHVlIGZvciBzdHJpbmcgbGVuZ3RoXG4gICAgICAgIGlmIChVdGlscy5pc051bWJlcih2YWxpZGF0aW9uLnJ1bGVzW2tleV0ubWlubGVuZ3RoKSkge1xuICAgICAgICAgIGlmIChmb3JtVmFsdWVzW2tleV0ubGVuZ3RoIDwgKHZhbGlkYXRpb24ucnVsZXNba2V5XS5taW5sZW5ndGggYXMgbnVtYmVyKSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ1RoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBtdXN0IGJlIGF0IGxlYXN0ICcgKyB2YWxpZGF0aW9uLnJ1bGVzW2tleV0ubWlubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVtYWlsXG4gICAgICAgIGlmICh2YWxpZGF0aW9uLnJ1bGVzW2tleV0uaXNFbWFpbCkge1xuICAgICAgICAgIGlmIChmb3JtVmFsdWVzW2tleV0uaW5kZXhPZignQCcpIDw9IC0xKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnVGhpcyBpcyBub3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZm9ybVZhbHVlc1trZXldLmluZGV4T2YoJy4nKSA8PSAtMSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ1RoaXMgaXMgbm90IGEgdmFsaWQgZW1haWwgYWRkcmVzcyc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGhvbmUgbnVtYmVyXG4gICAgICAgIGlmICh2YWxpZGF0aW9uLnJ1bGVzW2tleV0uaXNQaG9uZSkge1xuICAgICAgICAgIGlmICghVXRpbHMuc3RyaW5nSXNQaG9uZU51bWJlcihmb3JtVmFsdWVzW2tleV0pKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnVGhlIHBob25lIG51bWJlciBjYW4gb25seSBjb250YWluIG51bWJlcnMsICssIC0sICkgYW5kICgnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9ubHkgbnVtYmVyc1xuICAgICAgICBpZiAodmFsaWRhdGlvbi5ydWxlc1trZXldLm9ubHlOdW1iZXJzKSB7XG4gICAgICAgICAgaWYgKCFVdGlscy5zdHJpbmdIYXNPbmx5TnVtYmVycyhmb3JtVmFsdWVzW2tleV0pKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnVGhlIHZhbHVlIG1heSBvbmx5IGNvbnRhaW4gbnVtYmVycyc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGlzIGFsbCB2YWxpZD9cbiAgICAgIGlmICh2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IubGVuZ3RoKSB7XG4gICAgICAgIHZhbGlkYXRpb24udmFsaWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJ1biBhbHNvIHRoZSBuYXRpdmUgYnJvd3NlciB2YWxpZGF0aW9uXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTFNlbGVjdEVsZW1lbnQvY2hlY2tWYWxpZGl0eVxuICAgICAqL1xuICAgIGlmICh2YWxpZGF0aW9uLnZhbGlkKSB7XG4gICAgICB2YWxpZGF0aW9uLnZhbGlkID0gJGZvcm1bMF0uY2hlY2tWYWxpZGl0eSgpO1xuICAgIH1cblxuICAgICRmb3JtLmFkZENsYXNzKCd3YXMtdmFsaWRhdGVkJyk7XG4gICAgdGhpcy5kZWJ1ZygndmFsaWRhdGUnLCB2YWxpZGF0aW9uKTtcbiAgICByZXR1cm4gdmFsaWRhdGlvbjtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRWYWxpZGF0aW9uT2JqZWN0KCkge1xuICAgIGNvbnN0IHZhbGlkYXRpb246IElWYWxpZGF0aW9uT2JqZWN0ID0ge1xuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICBydWxlczoge1xuICAgICAgICBmaXJzdE5hbWU6IHtcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICBtaW5sZW5ndGg6IDMsXG4gICAgICAgICAgZXJyb3I6ICcnLFxuICAgICAgICB9LFxuICAgICAgICBsYXN0TmFtZToge1xuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIG1pbmxlbmd0aDogMyxcbiAgICAgICAgICBlcnJvcjogJycsXG4gICAgICAgIH0sXG4gICAgICAgIGVtYWlsOiB7XG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgaXNFbWFpbDogdHJ1ZSxcbiAgICAgICAgICBtaW5sZW5ndGg6IDMsXG4gICAgICAgICAgZXJyb3I6ICcnLFxuICAgICAgICB9LFxuICAgICAgICBwaG9uZToge1xuICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICBpc1Bob25lOiB0cnVlLFxuICAgICAgICAgIG1pbmxlbmd0aDogNCxcbiAgICAgICAgICBlcnJvcjogJycsXG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICBtaW5sZW5ndGg6IDIwLFxuICAgICAgICAgIGVycm9yOiAnJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gdmFsaWRhdGlvbjtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBiZWZvcmVCaW5kKCkge1xuICAgIHRoaXMuZGVidWcoJ2JlZm9yZScpO1xuICAgIHRoaXMuJGZvcm0gPSAkKHRoaXMuZWwpLmZpbmQoJ2Zvcm0nKSBhcyBKUXVlcnk8SFRNTEZvcm1FbGVtZW50PjtcblxuICAgIC8vIEZvciBjdXN0b20gc3R5bGUgZm9ybSB2YWxpZGF0aW9uLCBzZWUgaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvNC4xL2NvbXBvbmVudHMvZm9ybXMvI2N1c3RvbS1zdHlsZXNcbiAgICB0aGlzLiRmb3JtLmFkZENsYXNzKCduZWVkcy12YWxpZGF0aW9uJyk7XG4gICAgdGhpcy4kZm9ybS5hdHRyKCdub3ZhbGlkYXRlJywgJycpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlcXVpcmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcm90ZWN0ZWQgdGVtcGxhdGUoKSB7XG4gICAgLy8gT25seSBzZXQgdGhlIGNvbXBvbmVudCB0ZW1wbGF0ZSBpZiB0aGVyZSBubyBjaGlsZHMgYWxyZWFkeVxuICAgIGlmICh0aGlzLmVsLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gXCJcIjsiLCJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIEpRdWVyeSxcbiAgRGVidWcsXG4gIElCaW5kZXIsXG59IGZyb20gJ0ByaWJhanMvY29yZSc7XG5cbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL2ZzYmRyLW1haW5iYXIuY29tcG9uZW50Lmh0bWwnO1xuXG5pbnRlcmZhY2UgSVNjb3BlIHtcbiAgYXNzaWduOiBGc2Jkck1haW5iYXJDb21wb25lbnRbJ2Fzc2lnbiddO1xuICBvcGVuOiBGc2Jkck1haW5iYXJDb21wb25lbnRbJ29wZW4nXTtcbiAgY2xvc2U6IEZzYmRyTWFpbmJhckNvbXBvbmVudFsnY2xvc2UnXTtcbiAgbWVudU9wZW46IGJvb2xlYW47XG4gIFtuYW1lOiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBGc2Jkck1haW5iYXJDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHB1YmxpYyBzdGF0aWMgdGFnTmFtZTogc3RyaW5nID0gJ2ZzYmRyLW1haW5iYXInO1xuXG4gIHByb3RlY3RlZCBhdXRvYmluZCA9IHRydWU7XG5cbiAgcHJvdGVjdGVkICRsb2dvVG9wOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ2RhdGFzZXQnLCAnZmlsdGVyJ107XG4gIH1cblxuICBwcm90ZWN0ZWQgJGVsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xuICBwcm90ZWN0ZWQgZGVidWcgPSBEZWJ1ZygnY29tcG9uZW50OicgKyBGc2Jkck1haW5iYXJDb21wb25lbnQudGFnTmFtZSk7XG5cbiAgcHJvdGVjdGVkIHNjb3BlOiBJU2NvcGUgPSB7XG4gICAgYXNzaWduOiB0aGlzLmFzc2lnbixcbiAgICBvcGVuOiB0aGlzLm9wZW4sXG4gICAgY2xvc2U6IHRoaXMuY2xvc2UsXG4gICAgbWVudU9wZW46IGZhbHNlLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ/OiBIVE1MRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMuJGVsID0gSlF1ZXJ5KHRoaXMuZWwpO1xuICAgIHRoaXMuJGxvZ29Ub3AgPSBKUXVlcnkoJy5sb2dvLXRleHQubG9nby10ZXh0LXRvcCcpO1xuICAgIHRoaXMuZGVidWcoJ2NvbnN0cnVjdG9yJywgdGhpcyk7XG4gICAgdGhpcy5pbml0KEZzYmRyTWFpbmJhckNvbXBvbmVudC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgcHVibGljIGFzc2lnbihrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgY29udGV4dDogSUJpbmRlcjxhbnk+LCBldmVudDogRXZlbnQpIHtcbiAgICAvLyBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHRoaXMuc2NvcGVba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcHVibGljIG9wZW4oKSB7XG4gICAgdGhpcy5zY29wZS5tZW51T3BlbiA9IHRydWU7XG4gICAgdGhpcy4kbG9nb1RvcC5oaWRlKCk7XG4gIH1cblxuICBwdWJsaWMgY2xvc2UoKSB7XG4gICAgdGhpcy5zY29wZS5tZW51T3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuJGxvZ29Ub3Auc2hvdygpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGluaXQob2JzZXJ2ZWRBdHRyaWJ1dGVzOiBzdHJpbmdbXSkge1xuICAgIHJldHVybiBzdXBlci5pbml0KG9ic2VydmVkQXR0cmlidXRlcylcbiAgICAudGhlbigodmlldykgPT4ge1xuICAgICAgcmV0dXJuIHZpZXc7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYmVmb3JlQmluZCgpIHtcbiAgICB0aGlzLmRlYnVnKCdiZWZvcmVCaW5kJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYWZ0ZXJCaW5kKCkge1xuICAgIHRoaXMuZGVidWcoJ2FmdGVyQmluZCcsIHRoaXMuc2NvcGUpO1xuICAgIHRoaXMuJGxvZ29Ub3AgPSBKUXVlcnkoJy5sb2dvLXRleHQubG9nby10ZXh0LXRvcCcpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlcXVpcmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydkYXRhc2V0J107XG4gIH1cblxuICBwcm90ZWN0ZWQgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHJpYnV0ZU5hbWU6IHN0cmluZywgb2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSwgbmFtZXNwYWNlOiBzdHJpbmcgfCBudWxsKSB7XG4gICAgc3VwZXIuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHJpYnV0ZU5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIC8vIGRlY29uc3RydWN0b3JcbiAgcHJvdGVjdGVkIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdGVtcGxhdGUoKSB7XG4gICAgLy8gT25seSBzZXQgdGhlIGNvbXBvbmVudCB0ZW1wbGF0ZSBpZiB0aGVyZSBubyBjaGlsZHMgYWxyZWFkeVxuICAgIGlmICh0aGlzLmVsLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFZpZGVvQ29tcG9uZW50LFxuICBEZWJ1Zyxcbn0gZnJvbSAnQHJpYmFqcy9jb3JlJztcblxuaW50ZXJmYWNlIElTY29wZSB7XG4gIGhlbGxvPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgRnNiZHJWaWRlb0NvbXBvbmVudCBleHRlbmRzIFZpZGVvQ29tcG9uZW50IHtcblxuICBwdWJsaWMgc3RhdGljIHRhZ05hbWU6IHN0cmluZyA9ICdmc2Jkci12aWRlbyc7XG5cbiAgcHJvdGVjdGVkIGF1dG9iaW5kID0gdHJ1ZTtcblxuICBwcm90ZWN0ZWQgZGVidWcgPSBEZWJ1ZygnY29tcG9uZW50OicgKyBGc2JkclZpZGVvQ29tcG9uZW50LnRhZ05hbWUpO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ/OiBIVE1MRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMuZGVidWcoJ2NvbnN0cnVjdG9yJywgdGhpcyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVxdWlyZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ21wNFNyYyddO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiIFwiOyIsImltcG9ydCB7IENvbXBvbmVudCwgRGVidWcsIEpRdWVyeSBhcyAkIH0gZnJvbSAnQHJpYmFqcy9jb3JlJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL2ljb24uY29tcG9uZW50Lmh0bWwnO1xuXG5leHBvcnQgY2xhc3MgSWNvbkNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyB0YWdOYW1lOiBzdHJpbmcgPSAncnYtaWNvbic7XG5cbiAgcHJvdGVjdGVkIGRlYnVnID0gRGVidWcoJ2NvbXBvbmVudDonICsgSWNvbkNvbXBvbmVudC50YWdOYW1lKTtcblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydzaXplJywgJ3dpZHRoJywgJ2hlaWdodCcsICduYW1lJywgJ3NyYycsICdjb2xvcicsICdkaXJlY3Rpb24nXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBzY29wZTogYW55ID0ge307XG5cbiAgcHJvdGVjdGVkIGF1dG9iaW5kID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkICRlbDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50PzogSFRNTEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLiRlbCA9ICQodGhpcy5lbCk7XG4gICAgdGhpcy4kZWxcbiAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gICAgLmF0dHIoJ3JvbGUnLCAnaW1nJylcbiAgICAuYWRkQ2xhc3MoJ2ljb25zZXQnKTtcblxuICAgIC8vIHNldCBkZWZhdWx0IHZhbHVlc1xuICAgIC8vIHRoaXMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKCdzaXplJywgbnVsbCwgMzIsIG51bGwpO1xuICAgIHRoaXMuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKCdkaXJlY3Rpb24nLCBudWxsLCAndG9wJywgbnVsbCk7XG5cbiAgICB0aGlzLmluaXQoSWNvbkNvbXBvbmVudC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgcHVibGljIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhuYW1lOiBzdHJpbmcsIG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnksIG5hbWVzcGFjZTogc3RyaW5nIHwgbnVsbCkge1xuICAgIHRoaXMuZGVidWcoJ2F0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjaycsIG5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSwgbmFtZXNwYWNlKTtcbiAgICAvLyBpbmplY3RzIHRoZSBjaGFuZ2VkIGF0dHJpYnV0ZXMgdG8gc2NvcGVcbiAgICBzdXBlci5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBuYW1lc3BhY2UpO1xuXG4gICAgaWYgKG5hbWUgPT09ICdzcmMnKSB7XG4gICAgICB0aGlzLiRlbFxuICAgICAgLmxvYWQobmV3VmFsdWUpO1xuICAgIH1cblxuICAgIGlmIChuYW1lID09PSAnY29sb3InKSB7XG4gICAgICB0aGlzLiRlbFxuICAgICAgLmNzcyh7Y29sb3I6IG5ld1ZhbHVlfSlcbiAgICAgIC5yZW1vdmVDbGFzcyAoKGluZGV4LCBjbGFzc05hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIChjbGFzc05hbWUubWF0Y2ggKC8oXnxcXHMpY29sb3ItXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xuICAgICAgfSlcbiAgICAgIC5hZGRDbGFzcyhgY29sb3ItJHtuZXdWYWx1ZX1gKTtcbiAgICB9XG5cbiAgICBpZiAobmFtZSA9PT0gJ3NpemUnKSB7XG4gICAgICBjb25zdCBzaXplID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLmRlYnVnKCdzZXQgc2l6ZScsIHRoaXMuJGVsKTtcbiAgICAgIHRoaXMuJGVsXG4gICAgICAuY3NzKHtoZWlnaHQ6IHNpemUsIHdpZHRoOiBzaXplfSlcbiAgICAgIC5yZW1vdmVDbGFzcygoaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gKGNsYXNzTmFtZS5tYXRjaCAoLyhefFxccylzaXplLVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcbiAgICAgIH0pXG4gICAgICAuYWRkQ2xhc3MoYHNpemUtJHtzaXplfWApO1xuICAgIH1cblxuICAgIGlmIChuYW1lID09PSAnd2lkdGgnKSB7XG4gICAgICBjb25zdCB3aWR0aCA9IG5ld1ZhbHVlO1xuICAgICAgdGhpcy5kZWJ1Zygnc2V0IHdpZHRoJywgdGhpcy4kZWwpO1xuICAgICAgdGhpcy4kZWxcbiAgICAgIC5jc3Moe3dpZHRofSlcbiAgICAgIC5yZW1vdmVDbGFzcygoaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gKGNsYXNzTmFtZS5tYXRjaCAoLyhefFxccyl3aWR0aC1cXFMrL2cpIHx8IFtdKS5qb2luKCcgJyk7XG4gICAgICB9KVxuICAgICAgLmFkZENsYXNzKGB3aWR0aC0ke3dpZHRofWApO1xuICAgIH1cblxuICAgIGlmIChuYW1lID09PSAnaGVpZ2h0Jykge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLmRlYnVnKCdzZXQgaGVpZ2h0JywgdGhpcy4kZWwpO1xuICAgICAgdGhpcy4kZWxcbiAgICAgIC5jc3Moe2hlaWdodH0pXG4gICAgICAucmVtb3ZlQ2xhc3MoKGluZGV4LCBjbGFzc05hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIChjbGFzc05hbWUubWF0Y2ggKC8oXnxcXHMpaGVpZ2h0LVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcbiAgICAgIH0pXG4gICAgICAuYWRkQ2xhc3MoYGhlaWdodC0ke2hlaWdodH1gKTtcbiAgICB9XG5cbiAgICBpZiAobmFtZSA9PT0gJ2RpcmVjdGlvbicpIHtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IG5ld1ZhbHVlO1xuICAgICAgbGV0IGNsYXNzU3RyaW5nID0gYGRpcmVjdGlvbi0ke2RpcmVjdGlvbn1gO1xuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2xlZnQnICkge1xuICAgICAgICBjbGFzc1N0cmluZyArPSAnIHJvdGF0ZS0yNzAnO1xuICAgICAgfSBlbHNlIGlmICggZGlyZWN0aW9uID09PSAnbGVmdC10b3AnIHx8IGRpcmVjdGlvbiA9PT0gJ2xlZnQtdXAnIHx8IGRpcmVjdGlvbiA9PT0gJ3RvcC1sZWZ0JyB8fCBkaXJlY3Rpb24gPT09ICd1cC1sZWZ0JyApIHtcbiAgICAgICAgY2xhc3NTdHJpbmcgKz0gJyByb3RhdGUtMzE1JyA7XG4gICAgICB9IGVsc2UgaWYgKCBkaXJlY3Rpb24gPT09ICd0b3AnIHx8IGRpcmVjdGlvbiA9PT0gJ3VwJyApIHtcbiAgICAgICAgY2xhc3NTdHJpbmcgKz0gJyByb3RhdGUtMCc7XG4gICAgICB9IGVsc2UgaWYgKCBkaXJlY3Rpb24gPT09ICd0b3AtcmlnaHQnIHx8IGRpcmVjdGlvbiA9PT0gJ3VwLXJpZ2h0JyB8fCBkaXJlY3Rpb24gPT09ICdyaWdodC10b3AnIHx8IGRpcmVjdGlvbiA9PT0gJ3JpZ2h0LXVwJykge1xuICAgICAgICBjbGFzc1N0cmluZyArPSAnIHJvdGF0ZS00NSc7XG4gICAgICB9IGVsc2UgaWYgKCBkaXJlY3Rpb24gPT09ICdyaWdodCcgKSB7XG4gICAgICAgIGNsYXNzU3RyaW5nICs9ICcgcm90YXRlLTkwJztcbiAgICAgIH0gZWxzZSBpZiAoIGRpcmVjdGlvbiA9PT0gJ3JpZ2h0LWJvdHRvbScgfHwgZGlyZWN0aW9uID09PSAncmlnaHQtZG93bicgfHwgZGlyZWN0aW9uID09PSAnYm90dG9tLXJpZ2h0JyB8fCBkaXJlY3Rpb24gPT09ICdkb3duLXJpZ2h0JyApIHtcbiAgICAgICAgY2xhc3NTdHJpbmcgKz0gJyByb3RhdGUtMTM1JztcbiAgICAgIH0gZWxzZSBpZiAoIGRpcmVjdGlvbiA9PT0gJ2JvdHRvbScgfHwgZGlyZWN0aW9uID09PSAnZG93bicgKSB7XG4gICAgICAgIGNsYXNzU3RyaW5nICs9ICcgcm90YXRlLTE4MCc7XG4gICAgICB9IGVsc2UgaWYgKCBkaXJlY3Rpb24gPT09ICdsZWZ0LWJvdHRvbScgfHwgZGlyZWN0aW9uID09PSAnbGVmdC1kb3duJyB8fCBkaXJlY3Rpb24gPT09ICdib3R0b20tbGVmdCcgfHwgZGlyZWN0aW9uID09PSAnZG93bi1sZWZ0JyApIHtcbiAgICAgICAgY2xhc3NTdHJpbmcgKz0gJyByb3RhdGUtMjI1JztcbiAgICAgIH1cbiAgICAgIHRoaXMuJGVsXG4gICAgICAuY3NzKHtoZWlnaHQ6IG5ld1ZhbHVlLCB3aWR0aDogbmV3VmFsdWV9KVxuICAgICAgLnJlbW92ZUNsYXNzKChpbmRleCwgY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgIHJldHVybiAoY2xhc3NOYW1lLm1hdGNoICgvKF58XFxzKWRpcmVjdGlvbi1cXFMrL2cpIHx8IFtdKS5qb2luKCcgJyk7XG4gICAgICB9KVxuICAgICAgLnJlbW92ZUNsYXNzKChpbmRleCwgY2xhc3NOYW1lKSA9PiB7XG4gICAgICAgIHJldHVybiAoY2xhc3NOYW1lLm1hdGNoICgvKF58XFxzKXJvdGF0ZS1cXFMrL2cpIHx8IFtdKS5qb2luKCcgJyk7XG4gICAgICB9KVxuICAgICAgLmFkZENsYXNzKGNsYXNzU3RyaW5nKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9XG59XG4iLCJcbmV4cG9ydCB7IENvbnRhY3RGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9jb250YWN0LWZvcm0vY29udGFjdC1mb3JtLmNvbXBvbmVudCc7XG5leHBvcnQgeyBDb29raWVCYW5uZXJDb21wb25lbnQgfSBmcm9tICcuL2Nvb2tpZS1iYW5uZXIvY29va2llLWJhbm5lci5jb21wb25lbnQnO1xuZXhwb3J0IHsgRGVidWdCYXJDb21wb25lbnQgfSBmcm9tICcuL2RlYnVnLWJhci9kZWJ1Zy1iYXIuY29tcG9uZW50JztcbmV4cG9ydCB7IERlbGV0ZURhdGFGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9kZWxldGUtZGF0YS1mb3JtL2RlbGV0ZS1kYXRhLWZvcm0uY29tcG9uZW50JztcbmV4cG9ydCB7IEZzYmRyTWFpbmJhckNvbXBvbmVudCB9IGZyb20gJy4vZnNiZHItbWFpbmJhci9mc2Jkci1tYWluYmFyLmNvbXBvbmVudCc7XG5leHBvcnQgeyBJY29uQ29tcG9uZW50IH0gZnJvbSAnLi9pY29uL2ljb24uY29tcG9uZW50JztcbmV4cG9ydCB7IEluc3RhZ3JhbUNvbXBvbmVudCB9IGZyb20gJy4vaW5zdGFncmFtL2luc3RhZ3JhbS5jb21wb25lbnQnO1xuZXhwb3J0IHsgSW5zdGFncmFtU2Nyb2xsYmFyQ29tcG9uZW50IH0gZnJvbSAnLi9pbnN0YWdyYW0tc2Nyb2xsYmFyL2luc3RhZ3JhbS1zY3JvbGxiYXIuY29tcG9uZW50JztcbmV4cG9ydCB7IE5ld3NsZXR0ZXJDb21wb25lbnQgfSBmcm9tICcuL25ld3NsZXR0ZXIvbmV3c2xldHRlci5jb21wb25lbnQnO1xuZXhwb3J0IHsgUmV2b2tlRm9ybUNvbXBvbmVudCB9IGZyb20gJy4vcmV2b2tlLWZvcm0vcmV2b2tlLWZvcm0uY29tcG9uZW50JztcbmV4cG9ydCB7IFNob3BpZnlMaW5rbGlzdENvbXBvbmVudCB9IGZyb20gJy4vc2hvcGlmeS1saW5rbGlzdC9zaG9waWZ5LWxpbmtsaXN0LmNvbXBvbmVudCc7XG5leHBvcnQgeyBTaG9waWZ5RmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi9zaG9waWZ5LWZpbHRlci9zaG9waWZ5LWZpbHRlci5jb21wb25lbnQnO1xuZXhwb3J0IHsgU2hvcGlmeUFydGljbGVJdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9zaG9waWZ5LWFydGljbGUtaXRlbS9zaG9waWZ5LWFydGljbGUtaXRlbS5jb21wb25lbnQnO1xuZXhwb3J0IHsgU2hvcGlmeVByb2R1Y3RDb21wb25lbnQgfSBmcm9tICcuL3Nob3BpZnktcHJvZHVjdC9zaG9waWZ5LXByb2R1Y3QuY29tcG9uZW50JztcbmV4cG9ydCB7IFNob3BpZnlQcm9kdWN0SXRlbUNvbXBvbmVudCB9IGZyb20gJy4vc2hvcGlmeS1wcm9kdWN0LWl0ZW0vc2hvcGlmeS1wcm9kdWN0LWl0ZW0uY29tcG9uZW50JztcbmV4cG9ydCB7IFRkYUkxOG5Td2l0Y2hlckNvbXBvbmVudCB9IGZyb20gJy4vc3dpdGNoZXIvc3dpdGNoZXIuY29tcG9uZW50JztcbmV4cG9ydCB7IFNob3BpZnlDYXJ0Q29tcG9uZW50IH0gZnJvbSAnLi9zaG9waWZ5LWNhcnQvc2hvcGlmeS1jYXJ0LmNvbXBvbmVudCc7XG5leHBvcnQgeyBTaG9waWZ5Q2FydEJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vc2hvcGlmeS1jYXJ0LWJ1dHRvbi9zaG9waWZ5LWNhcnQtYnV0dG9uLmNvbXBvbmVudCc7XG5leHBvcnQgeyBTaG9waWZ5Q29tbWVudHNGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9zaG9waWZ5LWNvbW1lbnRzLWZvcm0vc2hvcGlmeS1jb21tZW50cy1mb3JtLmNvbXBvbmVudCc7XG5leHBvcnQgeyBTaG9waWZ5TG9naW5Gb3JtQ29tcG9uZW50IH0gZnJvbSAnLi9zaG9waWZ5LWxvZ2luLWZvcm0vc2hvcGlmeS1sb2dpbi1mb3JtLmNvbXBvbmVudCc7XG5leHBvcnQgeyBTaG9waWZ5QWRkcmVzc2VzQ29tcG9uZW50IH0gZnJvbSAnLi9zaG9waWZ5LWFkZHJlc3Nlcy9zaG9waWZ5LWFkZHJlc3Nlcy5jb21wb25lbnQnO1xuZXhwb3J0IHsgU2hhcmVDb21wb25lbnQgfSBmcm9tICcuL3NoYXJlL3NoYXJlLmNvbXBvbmVudCc7XG5leHBvcnQgeyBQcml2YWN5U2V0dGluZ3NDb21wb25lbnQgfSBmcm9tICcuL3ByaXZhY3ktc2V0dGluZ3MvcHJpdmFjeS1zZXR0aW5ncy5jb21wb25lbnQnO1xuZXhwb3J0IHsgUHJvZHVjdFNjcm9sbGJhckNvbXBvbmVudCB9IGZyb20gJy4vcHJvZHVjdC1zY3JvbGxiYXIvcHJvZHVjdC1zY3JvbGxiYXIuY29tcG9uZW50JztcbmV4cG9ydCAqIGZyb20gJy4vYnM0L2JzNC5jb21wb25lbnRzJztcbmV4cG9ydCB7IEZzYmRyVmlkZW9Db21wb25lbnQgfSBmcm9tICcuL2ZzYmRyLXZpZGVvL2ZzYmRyLXZpZGVvLmNvbXBvbmVudCc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiXCI7IiwiaW1wb3J0IHsgQmluZGluZywgRGVidWcsIElCaW5kZXIsIENvbXBvbmVudCB9IGZyb20gJ0ByaWJhanMvY29yZSc7XG5pbXBvcnQgeyBQamF4IH0gZnJvbSAnQHJpYmFqcy9yb3V0ZXInO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgeyBJSW5zdGFncmFtTWVkaWEsIElJbnN0YWdyYW1SZXNwb25zZSwgSW5zdGFncmFtU2VydmljZSB9IGZyb20gJ0ByaWJhanMvc2hvcGlmeS10ZGEnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vaW5zdGFncmFtLXNjcm9sbGJhci5jb21wb25lbnQuaHRtbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNjb3BlIHtcbiAgaW5zdGFncmFtSWQ/OiBzdHJpbmc7XG4gIG9wZW5MaW5rczogYm9vbGVhbjtcbiAgb3BlblVybDogc3RyaW5nO1xuICBsaW1pdDogbnVtYmVyO1xuICBvblNjcm9sbDogSW5zdGFncmFtU2Nyb2xsYmFyQ29tcG9uZW50WydvblNjcm9sbCddO1xuICBvblRhcDogSW5zdGFncmFtU2Nyb2xsYmFyQ29tcG9uZW50WydvblRhcCddO1xuICBtZWRpYT86IElJbnN0YWdyYW1NZWRpYTtcbn1cblxuZXhwb3J0IGNsYXNzIEluc3RhZ3JhbVNjcm9sbGJhckNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyB0YWdOYW1lOiBzdHJpbmcgPSAncnYtaW5zdGFncmFtLXNjcm9sbGJhcic7XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsnaW5zdGFncmFtLWlkJywgJ29wZW4tbGlua3MnLCAnbGltaXQnLCAnb3Blbi11cmwnXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkZWJ1ZyA9IERlYnVnKCdjb21wb25lbnQ6JyArIEluc3RhZ3JhbVNjcm9sbGJhckNvbXBvbmVudC50YWdOYW1lKTtcblxuICBwcm90ZWN0ZWQgc2NvcGU6IElTY29wZSA9IHtcbiAgICBpbnN0YWdyYW1JZDogdW5kZWZpbmVkLFxuICAgIG9wZW5MaW5rczogZmFsc2UsXG4gICAgb3BlblVybDogJycsXG4gICAgbGltaXQ6IDAsXG4gICAgb25TY3JvbGw6IHRoaXMub25TY3JvbGwsXG4gICAgb25UYXA6IHRoaXMub25UYXAsXG4gICAgbWVkaWE6IHVuZGVmaW5lZCxcbiAgfTtcblxuICBwcm90ZWN0ZWQgJGVsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xuICBwcml2YXRlIHBqYXggPSBuZXcgUGpheCgnbWFpbicpO1xuICBwcml2YXRlICRzY29sbFdpdGg/OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ/OiBIVE1MRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMuJGVsID0gJCh0aGlzLmVsKTtcbiAgICB0aGlzLiRzY29sbFdpdGggPSB0aGlzLiRlbC5maW5kKCcudGl0bGUtcm93Jyk7XG4gICAgdGhpcy5pbml0KEluc3RhZ3JhbVNjcm9sbGJhckNvbXBvbmVudC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEp1c3Qgb3BlbiB0aGUgaW5zdGFncmFtIHVybFxuICAgKi9cbiAgcHVibGljIG9uVGFwKGNvbnRleHQ6IElCaW5kZXI8YW55PiwgZXZlbnQ6IEpRdWVyeS5FdmVudCwgc2NvcGU6IGFueSwgZXZlbnRFbDogSFRNTEVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5zY29wZS5vcGVuVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMucGpheC5nb1RvKHRoaXMuc2NvcGUub3BlblVybCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNjb3BlLm9wZW5MaW5rcykge1xuICAgICAgY29uc3QgdXJsID0gJChldmVudEVsKS5maXJzdCgpLmRhdGEoJ3VybCcpO1xuICAgICAgdGhpcy5wamF4LmdvVG8odXJsLCB0cnVlKTtcbiAgICB9XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBnZXQgaW5zdGFncmFtIGluIHRoZSBtaWRkbGUgb2YgdGhlIHNjcm9sbGJhciBlbGVtZW50aW5uZXJXaWR0aFxuICAgKiBUT0RPIG5vdCB1c2VkXG4gICAqL1xuICBwdWJsaWMgb25TY3JvbGwoY29udGV4dDogSUJpbmRlcjxhbnk+LCBldmVudDogSlF1ZXJ5LkV2ZW50LCBzY29wZTogYW55LCBldmVudEVsOiBIVE1MRWxlbWVudCwgYmluZGluZzogQmluZGluZykge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuZGVidWcoJ29uU2Nyb2xsJywgZXZlbnRFbC5zY3JvbGxMZWZ0LCB0aGlzLiRzY29sbFdpdGgpO1xuICAgIGlmICh0aGlzLiRzY29sbFdpdGgpIHtcbiAgICAgIGNvbnN0IGZhY3RvciA9IDM7XG4gICAgICB0aGlzLiRzY29sbFdpdGguc2Nyb2xsTGVmdChldmVudEVsLnNjcm9sbExlZnQgLyBmYWN0b3IpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgd2lkdGggaW5zaXRlIHRoZSBzY3JvbGxiYXIgb2YgdGhlIGF1dG9zY29sbGluZyB0aXRsZVxuICAgKiBUT0RPIG5vdCB1c2VkXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0VGl0bGVXaWR0aCgpIHtcbiAgICBpZiAoIXRoaXMuJHNjb2xsV2l0aCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLiRzY29sbFdpdGguZmluZCgnLnRpdGxlLWNvbCcpWzBdLmNsaWVudFdpZHRoIHx8IDA7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHdpZHRoIGluc2l0ZSB0aGUgc2Nyb2xsYmFyIG9mIHRoZSBkcmFnYWJsbGUgLyBzY3JvbGxhYmxlIGFyZWFcbiAgICovXG4gIHByb3RlY3RlZCBnZXRJbnN0YWdyYW1XaWR0aCgpIHtcbiAgICBpZiAoIXRoaXMuc2NvcGUubWVkaWEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgd2lkdGggPSAoVXRpbHMuZ2V0Vmlld3BvcnREaW1lbnNpb25zKCkudyAvIDMpICogKHRoaXMuc2NvcGUubWVkaWEuZGF0YS5sZW5ndGgpO1xuICAgIHJldHVybiB3aWR0aDtcbiAgfVxuXG4gIHByb3RlY3RlZCBsb2FkTWVkaWEoKSB7XG4gICAgaWYgKCF0aGlzLnNjb3BlLmluc3RhZ3JhbUlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2luc3RhZ3JhbSBpZCBpcyByZXF1aXJlZCEnKTtcbiAgICB9XG4gICAgSW5zdGFncmFtU2VydmljZS5sb2FkTWVkaWEodGhpcy5zY29wZS5pbnN0YWdyYW1JZCwgdGhpcy5zY29wZS5saW1pdClcbiAgICAudGhlbigocmVzcG9uc2U6IElJbnN0YWdyYW1SZXNwb25zZSkgPT4ge1xuICAgICAgdGhpcy5zY29wZS5tZWRpYSA9IHJlc3BvbnNlLm1lZGlhO1xuICAgICAgdGhpcy5kZWJ1ZygncmVzcG9uc2UnLCByZXNwb25zZSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICB0aGlzLmRlYnVnKGBFcnJvcjogQ2FuJ3QgbG9hZCBpbnN0YWdyYW0gbWVkaWFgLCBlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYmVmb3JlQmluZCgpIHtcbiAgICB0aGlzLmRlYnVnKCdiZWZvcmVCaW5kJywgdGhpcy5zY29wZSk7XG4gICAgcmV0dXJuIHRoaXMubG9hZE1lZGlhKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVxdWlyZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ2luc3RhZ3JhbUlkJywgJ2xpbWl0J107XG4gIH1cblxuICBwcm90ZWN0ZWQgdGVtcGxhdGUoKSB7XG4gICAgLy8gT25seSBzZXQgdGhlIGNvbXBvbmVudCB0ZW1wbGF0ZSBpZiB0aGVyZSBubyBjaGlsZHMgYWxyZWFkeVxuICAgIGlmICh0aGlzLmVsLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG4gIH1cblxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9cm93PiA8ZGl2IGNsYXNzPVxcXCJjb2wtNCBweC0wIGNvbnRlbnQtYm94IHJhdGlvLTEtMVxcXCIgcnYtZWFjaC1pbWFnZT1tZWRpYS5kYXRhIHJ2LWFkZC1jbGFzcz1pbWFnZS5tZWRpYV90eXBlPiB7JSBjb21tZW50ICV9IElNQUdFIHslIGVuZGNvbW1lbnQgJX0gPGltZyBsYXp5bG9hZD1sYXp5IGNsYXNzPVxcXCJjb250ZW50IGxhenlcXFwiIHJ2LWlmPVxcXCJpbWFnZS5tZWRpYV90eXBlIHwgZXEgJ0lNQUdFJ1xcXCIgcnYtc3JjPWltYWdlLm1lZGlhX3VybCBydi1hbHQ9aW1hZ2UuY2FwdGlvbj4geyUgY29tbWVudCAlfSBDQVJPVVNFTF9BTEJVTSB7JSBlbmRjb21tZW50ICV9IDxpbWcgbGF6eWxvYWQ9bGF6eSBjbGFzcz1cXFwiY29udGVudCBsYXp5XFxcIiBydi1pZj1cXFwiaW1hZ2UubWVkaWFfdHlwZSB8IGVxICdDQVJPVVNFTF9BTEJVTSdcXFwiIHJ2LXNyYz1pbWFnZS5tZWRpYV91cmwgcnYtc3JjPWltYWdlLm1lZGlhX3VybCBydi1hbHQ9aW1hZ2UuY2FwdGlvbj4geyUgY29tbWVudCAlfSBWSURFTyB7JSBlbmRjb21tZW50ICV9IDx2aWRlbyBjbGFzcz1cXFwiY29udGVudCBsYXp5XFxcIiBydi1pZj1cXFwiaW1hZ2UubWVkaWFfdHlwZSB8IGVxICdWSURFTydcXFwiIGF1dG9wbGF5IG11dGVkIGxvb3AgcHJlbG9hZCBwbGF5c2lubGluZSB3ZWJraXQtcGxheXNpbmxpbmU+IDxzb3VyY2UgcnYtc3JjPWltYWdlLm1lZGlhX3VybCB0eXBlPXZpZGVvL21wND4gWW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdGhlIHZpZGVvIHRhZy4gPC92aWRlbz4geyUgY29tbWVudCAlfSBob3ZlciBpbmZvIHslIGVuZGNvbW1lbnQgJX0gPGRpdiBjbGFzcz1cXFwiY29udGVudCBjYXB0aW9uIGQtbm9uZSBkLW1kLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXFxcIiBydi10ZXh0PWltYWdlLmNhcHRpb24+PC9kaXY+IDwvZGl2PiA8L2Rpdj4gXCI7IiwiaW1wb3J0IHsgQmluZGluZywgRGVidWcsIENvbXBvbmVudCwgSUJpbmRlciB9IGZyb20gJ0ByaWJhanMvY29yZSc7XG5pbXBvcnQgeyBQamF4IH0gZnJvbSAnQHJpYmFqcy9yb3V0ZXInO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vaW5zdGFncmFtLmNvbXBvbmVudC5odG1sJztcbmltcG9ydCB7IElJbnN0YWdyYW1NZWRpYSwgSUluc3RhZ3JhbVJlc3BvbnNlLCBJbnN0YWdyYW1TZXJ2aWNlIH0gZnJvbSAnQHJpYmFqcy9zaG9waWZ5LXRkYSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNjb3BlIHtcbiAgbWVkaWE/OiBJSW5zdGFncmFtTWVkaWE7XG4gIGluc3RhZ3JhbUlkPzogc3RyaW5nO1xuICBvcGVuTGlua3M6IGJvb2xlYW47XG4gIGxpbWl0OiBudW1iZXI7XG4gIG9uVGFwOiBJbnN0YWdyYW1Db21wb25lbnRbJ29uVGFwJ107XG59XG5cbmV4cG9ydCBjbGFzcyBJbnN0YWdyYW1Db21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHB1YmxpYyBzdGF0aWMgdGFnTmFtZTogc3RyaW5nID0gJ3J2LWluc3RhZ3JhbSc7XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsnaW5zdGFncmFtLWlkJywgJ29wZW4tbGlua3MnLCAnbGltaXQnXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkZWJ1ZyA9IERlYnVnKCdjb21wb25lbnQ6JyArIEluc3RhZ3JhbUNvbXBvbmVudC50YWdOYW1lKTtcblxuICBwcm90ZWN0ZWQgc2NvcGU6IElTY29wZSA9IHtcbiAgICBtZWRpYTogdW5kZWZpbmVkLFxuICAgIG9wZW5MaW5rczogZmFsc2UsXG4gICAgbGltaXQ6IDAsXG4gICAgaW5zdGFncmFtSWQ6IHVuZGVmaW5lZCxcbiAgICBvblRhcDogdGhpcy5vblRhcCxcbiAgfTtcblxuICBwcml2YXRlIHBqYXggPSBuZXcgUGpheCgnbWFpbicpO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ/OiBIVE1MRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMuaW5pdChJbnN0YWdyYW1Db21wb25lbnQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBKdXN0IG9wZW4gdGhlIGluc3RhZ3JhbSB1cmxcbiAgICovXG4gIHB1YmxpYyBvblRhcChjb250ZXh0OiBJQmluZGVyPGFueT4sIGV2ZW50OiBKUXVlcnkuRXZlbnQsIHNjb3BlOiBhbnksIGV2ZW50RWw6IEhUTUxFbGVtZW50LCBiaW5kaW5nOiBCaW5kaW5nKSB7XG4gICAgaWYgKCF0aGlzLnNjb3BlLm9wZW5MaW5rcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB1cmwgPSAkKGV2ZW50RWwpLmZpcnN0KCkuZGF0YSgndXJsJyk7XG4gICAgdGhpcy5wamF4LmdvVG8odXJsLCB0cnVlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBsb2FkTWVkaWEoKSB7XG4gICAgaWYgKCF0aGlzLnNjb3BlLmluc3RhZ3JhbUlkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICB9XG4gICAgSW5zdGFncmFtU2VydmljZS5sb2FkTWVkaWEodGhpcy5zY29wZS5pbnN0YWdyYW1JZCwgdGhpcy5zY29wZS5saW1pdClcbiAgICAudGhlbigocmVzcG9uc2U6IElJbnN0YWdyYW1SZXNwb25zZSkgPT4ge1xuICAgICAgdGhpcy5zY29wZS5tZWRpYSA9IHJlc3BvbnNlLm1lZGlhO1xuICAgICAgdGhpcy5kZWJ1ZygncmVzcG9uc2UnLCByZXNwb25zZSk7XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgdGhpcy5kZWJ1ZyhgRXJyb3I6IENhbid0IGxvYWQgaW5zdGFncmFtIG1lZGlhYCwgZXJyb3IpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGJlZm9yZUJpbmQoKSB7XG4gICAgdGhpcy5kZWJ1ZygnYmVmb3JlQmluZCcsIHRoaXMuc2NvcGUpO1xuICAgIHJldHVybiB0aGlzLmxvYWRNZWRpYSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlcXVpcmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydpbnN0YWdyYW1JZCcsICdsaW1pdCddO1xuICB9XG5cbiAgcHJvdGVjdGVkIHRlbXBsYXRlKCkge1xuICAgIC8vIE9ubHkgc2V0IHRoZSBjb21wb25lbnQgdGVtcGxhdGUgaWYgdGhlcmUgbm8gY2hpbGRzIGFscmVhZHlcbiAgICBpZiAodGhpcy5lbC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiXCI7IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBKUXVlcnkgYXMgJCwgRGVidWcsIElCaW5kZXIgfSBmcm9tICdAcmliYWpzL2NvcmUnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vbmV3c2xldHRlci5jb21wb25lbnQuaHRtbCc7XG5pbXBvcnQgeyBMb2NhbGVzU2VydmljZSB9IGZyb20gJ0ByaWJhanMvc2hvcGlmeS10ZGEnO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9VdGlscyc7XG5cbi8vIFRPRE8gbW92ZSB0byBnZW5lcmFsIHZhbGlkYXRpb24gY29tcG9uZW50IGNsYXNzIHdlIGNhbiBleHRlbmQgZnJvbVxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvbk9iamVjdCB7XG4gIGZpZWxkczoge1xuICAgIFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXI7XG4gIH07XG4gIHZhbGlkOiBib29sZWFuO1xuICBlcnJvcj86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElTY29wZSB7XG4gIHN1YnNjcmliZTogTmV3c2xldHRlckNvbXBvbmVudFsnc3Vic2NyaWJlJ107XG4gIHNlbGVjdEFsbDogTmV3c2xldHRlckNvbXBvbmVudFsnc2VsZWN0QWxsJ107XG4gIGZvcm06IElWYWxpZGF0aW9uT2JqZWN0O1xufVxuXG5leHBvcnQgY2xhc3MgTmV3c2xldHRlckNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyB0YWdOYW1lOiBzdHJpbmcgPSAncnYtbmV3c2xldHRlcic7XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRlYnVnID0gRGVidWcoJ2NvbXBvbmVudDonICsgTmV3c2xldHRlckNvbXBvbmVudC50YWdOYW1lKTtcblxuICBwcm90ZWN0ZWQgbG9jYWxlc1NlcnZpY2UgPSBuZXcgTG9jYWxlc1NlcnZpY2UoKTtcblxuICBwcm90ZWN0ZWQgc2NvcGU6IElTY29wZSA9IHtcbiAgICBzdWJzY3JpYmU6IHRoaXMuc3Vic2NyaWJlLFxuICAgIHNlbGVjdEFsbDogdGhpcy5zZWxlY3RBbGwsXG4gICAgZm9ybToge1xuICAgICAgZmllbGRzOiB7XG4gICAgICAgIGVtYWlsOiAnJyxcbiAgICAgICAgbmFtZTogJycsXG4gICAgICB9LFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICBlcnJvcjogdW5kZWZpbmVkLFxuICAgIH0sXG4gIH07XG5cbiAgcHJvdGVjdGVkICRlbDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcblxuICBwcm90ZWN0ZWQgJGZvcm0/OiBKUXVlcnk8SFRNTEZvcm1FbGVtZW50PjtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50PzogSFRNTEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLiRlbCA9ICQodGhpcy5lbCk7XG4gICAgdGhpcy5pbml0KE5ld3NsZXR0ZXJDb21wb25lbnQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBzdWJzY3JpYmUoY29udGV4dDogSUJpbmRlcjxhbnk+LCBldmVudDogRXZlbnQsIHNjb3BlOiBJU2NvcGUsIGZvcm06IEhUTUxGb3JtRWxlbWVudCkge1xuICAgIHRoaXMuZGVidWcoJ3N1YnNjcmliZScpO1xuXG4gICAgLy8gc3RvcCBuYXRpdmUgc3VibWl0XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmICghdGhpcy4kZm9ybSkge1xuICAgICAgdGhpcy5kZWJ1ZygnTm8gZm9ybSBmb3VuZCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMudmFsaWRhdGUodGhpcy4kZm9ybSwgdGhpcy5zY29wZS5mb3JtKTtcblxuICAgIGlmICh0aGlzLnNjb3BlLmZvcm0udmFsaWQpIHtcbiAgICAgIHRoaXMuJGZvcm0uc3VibWl0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVidWcoJ2Zvcm0gbm90IHZhbGlkJywgdGhpcy5zY29wZSk7XG4gICAgfVxuXG4gIH1cblxuICBwdWJsaWMgc2VsZWN0QWxsKGNvbnRleHQ6IElCaW5kZXI8YW55PiwgZXZlbnQ6IEpRdWVyeS5FdmVudCwgc2NvcGU6IGFueSwgZXZlbnRFbDogSFRNTElucHV0RWxlbWVudCkge1xuICAgIHRoaXMuZGVidWcoJ3NlbGVjdEFsbCcsIGV2ZW50RWwpO1xuICAgIFV0aWxzLnNlbGVjdEFsbChldmVudEVsKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBpbml0VmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLiRmb3JtID0gdGhpcy4kZWwuZmluZCgnZm9ybScpIGFzIEpRdWVyeTxIVE1MRm9ybUVsZW1lbnQ+O1xuICAgIHRoaXMuJGZvcm0uYXR0cignbm92YWxpZGF0ZScsICcnKTtcbiAgICB0aGlzLiRmb3JtLmFkZENsYXNzKCduZWVkcy12YWxpZGF0aW9uJyk7XG5cbiAgICB0aGlzLmRlYnVnKCdpbml0VmFsaWRhdGlvbicsIHRoaXMuJGZvcm0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHZhbGlkYXRlKCRmb3JtOiBKUXVlcnk8SFRNTEZvcm1FbGVtZW50PiwgdmFsaWRhdGlvblNjb3BlOiBJVmFsaWRhdGlvbk9iamVjdCkge1xuICAgICRmb3JtLmVhY2goKGluZGV4OiBudW1iZXIsIGZvcm1FbCkgPT4ge1xuICAgICAgY29uc3QgbmFtZSA9IGZvcm1FbC5uYW1lO1xuICAgICAgdmFsaWRhdGlvblNjb3BlLnZhbGlkID0gZm9ybUVsLmNoZWNrVmFsaWRpdHkoKTtcbiAgICAgIHZhbGlkYXRpb25TY29wZS5lcnJvciA9IGZvcm1FbC52YWxpZGF0aW9uTWVzc2FnZTtcbiAgICB9KTtcbiAgICAkZm9ybS5hZGRDbGFzcygnd2FzLXZhbGlkYXRlZCcpO1xuICAgIHRoaXMuZGVidWcoJ3ZhbGlkYXRlJywgdmFsaWRhdGlvblNjb3BlLCAkZm9ybVswXSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYWZ0ZXJCaW5kKCkge1xuICAgIHRoaXMuZGVidWcoJ2FmdGVyQmluZCcsIHRoaXMuc2NvcGUpO1xuICAgIHRoaXMuaW5pdFZhbGlkYXRpb24oKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZXF1aXJlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJvdGVjdGVkIHRlbXBsYXRlKCkge1xuICAgIC8vIE9ubHkgc2V0IHRoZSBjb21wb25lbnQgdGVtcGxhdGUgaWYgdGhlcmUgbm8gY2hpbGRzIGFscmVhZHlcbiAgICBpZiAodGhpcy5lbC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiXCI7IiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBKUXVlcnkgYXMgJCxcbiAgRGVidWcsXG4gIElCaW5kZXIsXG59IGZyb20gJ0ByaWJhanMvY29yZSc7XG5pbXBvcnQge1xuICBTaG9waWZ5Q2FydFNlcnZpY2UsXG59IGZyb20gJ0ByaWJhanMvc2hvcGlmeSc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9wcml2YWN5LXNldHRpbmdzLmNvbXBvbmVudC5odG1sJztcbmltcG9ydCB7IFRyYWNraW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3RyYWNraW5nLnNlcnZpY2VzJztcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvVXRpbHMnO1xuXG5pbnRlcmZhY2UgSVNjb3BlIHtcbiAgdGhlVHJhZGVEZXNrOiB7XG4gICAgZW5hYmxlZDogYm9vbGVhbjtcbiAgICBhZHY6IHN0cmluZztcbiAgICB0YWdJZDogc3RyaW5nO1xuICAgIGJhc2VTcmM6IHN0cmluZztcbiAgfTtcbiAgZ29vZ2xlQW5hbHl0aWNzOiB7XG4gICAgZW5hYmxlZDogYm9vbGVhbjtcbiAgICB0cmFja2luZ0lkOiBzdHJpbmc7XG4gIH07XG4gIHBpbnRlcmVzdFRhZzoge1xuICAgIGVuYWJsZWQ6IGJvb2xlYW47XG4gICAgdHJhY2tpbmdJZDogc3RyaW5nO1xuICB9O1xuICBmYWNlYm9va1BpeGVsOiB7XG4gICAgZW5hYmxlZDogYm9vbGVhbjtcbiAgfTtcbiAgY29va2llczoge1xuICAgIGVuYWJsZWQ6IGJvb2xlYW47XG4gIH07XG4gIHNob3BpZnlBbmFseXRpY3M6IHtcbiAgICBlbmFibGVkOiBib29sZWFuO1xuICB9O1xuICBob3N0bmFtZTogc3RyaW5nO1xuICBvbkNvb2tpZXNTdG9yYWdlQ2hhbmdlZDogUHJpdmFjeVNldHRpbmdzQ29tcG9uZW50WydvbkNvb2tpZXNTdG9yYWdlQ2hhbmdlZCddO1xuICBvblRoZVRyYWRlRGVza0NoYW5nZWQ6IFByaXZhY3lTZXR0aW5nc0NvbXBvbmVudFsnb25UaGVUcmFkZURlc2tDaGFuZ2VkJ107XG4gIG9uR29vZ2xlQW5hbHl0aWNzQ2hhbmdlZDogUHJpdmFjeVNldHRpbmdzQ29tcG9uZW50Wydvbkdvb2dsZUFuYWx5dGljc0NoYW5nZWQnXTtcbiAgb25GYWNlYm9va1BpeGVsQ2hhbmdlZDogUHJpdmFjeVNldHRpbmdzQ29tcG9uZW50WydvbkZhY2Vib29rUGl4ZWxDaGFuZ2VkJ107XG4gIG9uUGludGVyZXN0VGFnQ2hhbmdlZDogUHJpdmFjeVNldHRpbmdzQ29tcG9uZW50WydvblBpbnRlcmVzdFRhZ0NoYW5nZWQnXTtcbiAgb25DbGVhckRhdGFDbGlja2VkOiBQcml2YWN5U2V0dGluZ3NDb21wb25lbnRbJ29uQ2xlYXJEYXRhQ2xpY2tlZCddO1xuICAvKipcbiAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTmF2aWdhdG9yL2RvTm90VHJhY2tcbiAgICovXG4gIGRvTm90VHJhY2s6IGJvb2xlYW47XG59XG5cbi8vIHNlZSBhbHNvIFRyYWNraW5nU2VydmljZVxuZXhwb3J0IGNsYXNzIFByaXZhY3lTZXR0aW5nc0NvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyB0YWdOYW1lOiBzdHJpbmcgPSAncnYtcHJpdmFjeS1zZXR0aW5ncyc7XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJvdGVjdGVkICRlbDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcblxuICBwcm90ZWN0ZWQgZGVidWcgPSBEZWJ1ZygnY29tcG9uZW50OicgKyBQcml2YWN5U2V0dGluZ3NDb21wb25lbnQudGFnTmFtZSk7XG5cbiAgcHJvdGVjdGVkIHNjb3BlOiBJU2NvcGU7XG5cbiAgcHJvdGVjdGVkIHRyYWNraW5nU2VydmljZTogVHJhY2tpbmdTZXJ2aWNlO1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ/OiBIVE1MRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMuJGVsID0gJCh0aGlzLmVsKTtcblxuICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICB0aGVUcmFkZURlc2s6IHdpbmRvdy5tb2RlbC5zeXN0ZW0udGhlbWVTZXR0aW5ncy50aGVUcmFkZURlc2ssXG4gICAgICBnb29nbGVBbmFseXRpY3M6IHdpbmRvdy5tb2RlbC5zeXN0ZW0udGhlbWVTZXR0aW5ncy5nb29nbGVBbmFseXRpY3MsXG4gICAgICBwaW50ZXJlc3RUYWc6IHdpbmRvdy5tb2RlbC5zeXN0ZW0udGhlbWVTZXR0aW5ncy5waW50ZXJlc3RUYWcsXG4gICAgICBmYWNlYm9va1BpeGVsOiB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICB9LFxuICAgICAgY29va2llczoge1xuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHNob3BpZnlBbmFseXRpY3M6IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBob3N0bmFtZTogd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lLFxuICAgICAgb25Db29raWVzU3RvcmFnZUNoYW5nZWQ6IHRoaXMub25Db29raWVzU3RvcmFnZUNoYW5nZWQsXG4gICAgICBvblRoZVRyYWRlRGVza0NoYW5nZWQ6IHRoaXMub25UaGVUcmFkZURlc2tDaGFuZ2VkLFxuICAgICAgb25Hb29nbGVBbmFseXRpY3NDaGFuZ2VkOiB0aGlzLm9uR29vZ2xlQW5hbHl0aWNzQ2hhbmdlZCxcbiAgICAgIG9uRmFjZWJvb2tQaXhlbENoYW5nZWQ6IHRoaXMub25GYWNlYm9va1BpeGVsQ2hhbmdlZCxcbiAgICAgIG9uUGludGVyZXN0VGFnQ2hhbmdlZDogdGhpcy5vblBpbnRlcmVzdFRhZ0NoYW5nZWQsXG4gICAgICBvbkNsZWFyRGF0YUNsaWNrZWQ6IHRoaXMub25DbGVhckRhdGFDbGlja2VkLFxuICAgICAgZG9Ob3RUcmFjazogbmF2aWdhdG9yLmRvTm90VHJhY2sgPT09ICcxJyxcbiAgICB9O1xuXG4gICAgdGhpcy50cmFja2luZ1NlcnZpY2UgPSBuZXcgVHJhY2tpbmdTZXJ2aWNlKHtcbiAgICAgIHRoZVRyYWRlRGVzazogdGhpcy5zY29wZS50aGVUcmFkZURlc2ssXG4gICAgICBnb29nbGVBbmFseXRpY3M6IHRoaXMuc2NvcGUuZ29vZ2xlQW5hbHl0aWNzLFxuICAgICAgcGludGVyZXN0VGFnOiB0aGlzLnNjb3BlLnBpbnRlcmVzdFRhZyxcbiAgICB9KTtcblxuICAgIHRoaXMuc2NvcGUuZ29vZ2xlQW5hbHl0aWNzLmVuYWJsZWQgPSAhdGhpcy50cmFja2luZ1NlcnZpY2UuZ29vZ2xlQW5hbHl0aWNzRGlzYWJsZWQ7XG4gICAgdGhpcy5zY29wZS50aGVUcmFkZURlc2suZW5hYmxlZCA9ICF0aGlzLnRyYWNraW5nU2VydmljZS50aGVUcmFkZURlc2tEaXNhYmxlZDtcbiAgICB0aGlzLnNjb3BlLmZhY2Vib29rUGl4ZWwuZW5hYmxlZCA9ICF0aGlzLnRyYWNraW5nU2VydmljZS5mYWNlYm9va1BpeGVsRGlzYWJsZWQ7XG4gICAgdGhpcy5zY29wZS5waW50ZXJlc3RUYWcuZW5hYmxlZCA9ICF0aGlzLnRyYWNraW5nU2VydmljZS5waW50ZXJlc3RUYWdEaXNhYmxlZDtcblxuICAgIHRoaXMuaW5pdChQcml2YWN5U2V0dGluZ3NDb21wb25lbnQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNsZWFyRGF0YUNsaWNrZWQoY29udGV4dDogSUJpbmRlcjxhbnk+LCBldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLmRlYnVnKCdvbkNsZWFyRGF0YUNsaWNrZWQnLCB0aGlzLnNjb3BlLmNvb2tpZXMuZW5hYmxlZCk7XG4gICAgU2hvcGlmeUNhcnRTZXJ2aWNlLmNsZWFyKClcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gVXRpbHMuZ2V0KCcvYWNjb3VudC9sb2dvdXQnKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnRyYWNraW5nU2VydmljZS5yZW1vdmVDb29raWVzKFt0aGlzLnRyYWNraW5nU2VydmljZS50aGVUcmFkZURlc2tEaXNhYmxlU3RyLCB0aGlzLnRyYWNraW5nU2VydmljZS5nb29nbGVBbmFseXRpY3NEaXNhYmxlU3RyLCB0aGlzLnRyYWNraW5nU2VydmljZS5mYWNlYm9va1BpeGVsRGlzYWJsZVN0ciAvKiwgJ2Nvb2tpZWNvbnNlbnRfYWNjZXB0ZWQnKi9dKTtcbiAgICB9KVxuICAgIC50aGVuKCgpID0+IHtcbiAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH0pXG4gICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIH0pO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBwdWJsaWMgb25Db29raWVzU3RvcmFnZUNoYW5nZWQoKSB7XG4gICAgdGhpcy5kZWJ1Zygnb25Db29raWVzU3RvcmFnZUNoYW5nZWQnLCB0aGlzLnNjb3BlLmNvb2tpZXMuZW5hYmxlZCk7XG4gICAgaWYgKCF0aGlzLnNjb3BlLmNvb2tpZXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy50cmFja2luZ1NlcnZpY2UucmVtb3ZlQ29va2llcygpO1xuICAgIH1cbiAgICB0aGlzLnRyYWNraW5nU2VydmljZS5jb29raWVTdG9yYWdlRGlzYWJsZWQgPSAhdGhpcy5zY29wZS5jb29raWVzLmVuYWJsZWQ7XG4gIH1cblxuICBwdWJsaWMgb25Hb29nbGVBbmFseXRpY3NDaGFuZ2VkKCkge1xuICAgIHRoaXMuZGVidWcoJ29uR29vZ2xlQW5hbHl0aWNzQ2hhbmdlZCcsIHRoaXMuc2NvcGUuZ29vZ2xlQW5hbHl0aWNzLmVuYWJsZWQpO1xuICAgIHRoaXMudHJhY2tpbmdTZXJ2aWNlLmdvb2dsZUFuYWx5dGljc0Rpc2FibGVkID0gIXRoaXMuc2NvcGUuZ29vZ2xlQW5hbHl0aWNzLmVuYWJsZWQ7XG4gIH1cblxuICBwdWJsaWMgb25UaGVUcmFkZURlc2tDaGFuZ2VkKCkge1xuICAgIHRoaXMuZGVidWcoJ29uVGhlVHJhZGVEZXNrQ2hhbmdlZCcsIHRoaXMuc2NvcGUudGhlVHJhZGVEZXNrLmVuYWJsZWQpO1xuICAgIHRoaXMudHJhY2tpbmdTZXJ2aWNlLnRoZVRyYWRlRGVza0Rpc2FibGVkID0gIXRoaXMuc2NvcGUudGhlVHJhZGVEZXNrLmVuYWJsZWQ7XG4gIH1cblxuICBwdWJsaWMgb25GYWNlYm9va1BpeGVsQ2hhbmdlZCgpIHtcbiAgICB0aGlzLmRlYnVnKCdvbkZhY2Vib29rUGl4ZWxDaGFuZ2VkJywgdGhpcy5zY29wZS5mYWNlYm9va1BpeGVsLmVuYWJsZWQpO1xuICAgIHRoaXMudHJhY2tpbmdTZXJ2aWNlLmZhY2Vib29rUGl4ZWxEaXNhYmxlZCA9ICF0aGlzLnNjb3BlLmZhY2Vib29rUGl4ZWwuZW5hYmxlZDtcbiAgfVxuXG4gIHB1YmxpYyBvblBpbnRlcmVzdFRhZ0NoYW5nZWQoKSB7XG4gICAgdGhpcy5kZWJ1Zygnb25QaW50ZXJlc3RUYWdDaGFuZ2VkJywgdGhpcy5zY29wZS5waW50ZXJlc3RUYWcuZW5hYmxlZCk7XG4gICAgdGhpcy50cmFja2luZ1NlcnZpY2UucGludGVyZXN0VGFnRGlzYWJsZWQgPSAhdGhpcy5zY29wZS5waW50ZXJlc3RUYWcuZW5hYmxlZDtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBiZWZvcmVCaW5kKCkge1xuICAgIHRoaXMuZGVidWcoJ2JlZm9yZUJpbmQnKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBhZnRlckJpbmQoKSB7XG4gICAgdGhpcy5kZWJ1ZygnYWZ0ZXJCaW5kJywgdGhpcy5zY29wZSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVxdWlyZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByb3RlY3RlZCB0ZW1wbGF0ZSgpIHtcbiAgICAvLyBPbmx5IHNldCB0aGUgY29tcG9uZW50IHRlbXBsYXRlIGlmIHRoZXJlIG5vIGNoaWxkcyBhbHJlYWR5XG4gICAgaWYgKHRoaXMuZWwuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgRGVidWcsIEpRdWVyeSBhcyAkLCBCaW5kaW5nLCBJQmluZGVyLCBDb21wb25lbnQgfSBmcm9tICdAcmliYWpzL2NvcmUnO1xuaW1wb3J0IHsgUGpheCwgUHJlZmV0Y2ggfSBmcm9tICdAcmliYWpzL3JvdXRlcic7XG5cbmV4cG9ydCBjbGFzcyBQcm9kdWN0U2Nyb2xsYmFyQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBwdWJsaWMgc3RhdGljIHRhZ05hbWU6IHN0cmluZyA9ICdydi1wcm9kdWN0LXNjcm9sbGJhcic7XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRlYnVnID0gRGVidWcoJ2NvbXBvbmVudDonICsgICsgUHJvZHVjdFNjcm9sbGJhckNvbXBvbmVudC50YWdOYW1lKTtcblxuICBwcm90ZWN0ZWQgc2NvcGU6IGFueSA9IHtcbiAgICBvblNjcm9sbDogdGhpcy5vblNjcm9sbCxcbiAgICBvblByb2R1Y3RUYXA6IHRoaXMub25Qcm9kdWN0VGFwLFxuICAgIG9uUHJvZHVjdE1vdXNlZW50ZXI6IHRoaXMub25Qcm9kdWN0TW91c2VlbnRlcixcbiAgICB0aXRsZTogJycsXG4gIH07XG5cbiAgLy8gcHJpdmF0ZSBtb2RlbDogYW55ID0ge307XG4gIHByaXZhdGUgcGpheCA9IG5ldyBQamF4KCdtYWluJyk7XG4gIHByaXZhdGUgcHJlZmV0Y2ggPSBuZXcgUHJlZmV0Y2goKTtcbiAgcHJpdmF0ZSAkcHJvZHVjdHM/OiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ/OiBIVE1MRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIGNvbnN0ICRlbCA9ICQodGhpcy5lbCk7XG4gICAgdGhpcy4kcHJvZHVjdHMgPSAkZWwuZmluZCgnLmNvbnRlbnQtYm94Jyk7XG4gICAgdGhpcy5pbml0KFByb2R1Y3RTY3JvbGxiYXJDb21wb25lbnQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBKdXN0IG9wZW4gdGhlIHByb2R1Y3QgdXJsXG4gICAqL1xuICBwdWJsaWMgb25Qcm9kdWN0VGFwKGNvbnRleHQ6IElCaW5kZXI8YW55PiwgZXZlbnQ6IEpRdWVyeS5FdmVudCwgc2NvcGU6IGFueSwgZXZlbnRFbDogSFRNTEVsZW1lbnQsIGJpbmRpbmc6IEJpbmRpbmcpIHtcbiAgICBjb25zdCB1cmwgPSAkKGV2ZW50RWwpLmRhdGEoJ3VybCcpO1xuICAgIHRoaXMucGpheC5nb1RvKHVybCk7XG4gIH1cblxuICAvKipcbiAgICogUHJlbG9hZCBwcm9kdWN0IG9uIG1vdXNlIG92ZXJcbiAgICovXG4gIHB1YmxpYyBvblByb2R1Y3RNb3VzZWVudGVyKGNvbnRleHQ6IElCaW5kZXI8YW55PiwgZXZlbnQ6IEpRdWVyeS5FdmVudCwgc2NvcGU6IGFueSwgZXZlbnRFbDogSFRNTEVsZW1lbnQsIGJpbmRpbmc6IEJpbmRpbmcpIHtcbiAgICB0aGlzLmRlYnVnKCdvblByb2R1Y3RNb3VzZWVudGVyJyk7XG4gICAgY29uc3QgdXJsID0gJChldmVudEVsKS5kYXRhKCd1cmwnKTtcbiAgICB0aGlzLnByZWZldGNoLm9uTGlua0VudGVyKGV2ZW50LCB1cmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIGdldCBwcm9kdWN0IGluIHRoZSBtaWRkbGUgb2YgdGhlIHNjcm9sbGJhciBlbGVtZW50XG4gICAqL1xuICBwdWJsaWMgb25TY3JvbGwoY29udGV4dDogSUJpbmRlcjxhbnk+LCBldmVudDogSlF1ZXJ5LkV2ZW50LCBzY29wZTogYW55LCBldmVudEVsOiBIVE1MRWxlbWVudCwgYmluZGluZzogQmluZGluZykge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuZGVidWcoJ29uU2Nyb2xsJywgdGhpcy5zY29wZSk7XG4gICAgaWYgKHRoaXMuJHByb2R1Y3RzKSB7XG4gICAgICB0aGlzLiRwcm9kdWN0cy5lYWNoKChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIGlmIChzZWxmLiRwcm9kdWN0cykge1xuICAgICAgICAgIGNvbnN0IHByb2R1Y3QgPSBzZWxmLiRwcm9kdWN0cy5nZXQoaW5kZXgpO1xuICAgICAgICAgIGNvbnN0IHByb2R1Y3REYXRhID0gcHJvZHVjdC5kYXRhc2V0O1xuICAgICAgICAgIGNvbnN0IHBhcmVudFJlY3QgPSBldmVudEVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgIGNvbnN0IGVsZW1lbnRSZWN0ID0gcHJvZHVjdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBjb25zdCBlbGVtZW50TWlkZGxlID0gKGVsZW1lbnRSZWN0LndpZHRoIC8gMik7XG4gICAgICAgICAgLyoqIGNlbnRlclggaXMgMCBpZiB0aGUgcHJvZHVjdCBpcyBpbiB0aGUgbWlkZGxlICovXG4gICAgICAgICAgY29uc3QgY2VudGVyWCA9IGVsZW1lbnRSZWN0LmxlZnQgLSAoKHBhcmVudFJlY3Qud2lkdGggLyAyKSAtIGVsZW1lbnRNaWRkbGUpO1xuICAgICAgICAgIGNvbnN0IG9mZnNldCA9IGVsZW1lbnRNaWRkbGU7XG5cbiAgICAgICAgICBpZiAoY2VudGVyWCA+IChvZmZzZXQgKiAtMSkgJiYgY2VudGVyWCA8IG9mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5zY29wZS50aXRsZSA9IHByb2R1Y3REYXRhLnRpdGxlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHJlcXVpcmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICAvKipcbiAgICogRGVmYXVsdCBjdXN0b20gRWxlbWVudCBtZXRob2RcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjdXN0b20gZWxlbWVudCBpcyBmaXJzdCBjb25uZWN0ZWQgdG8gdGhlIGRvY3VtZW50J3MgRE9NLlxuICAgKi9cbiAgcHJvdGVjdGVkIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuJHByb2R1Y3RzID0gJCgodGhpcyBhcyBhbnkpKS5maW5kKCcuY29udGVudC1ib3gnKTtcbiAgfVxuXG4gIHByb3RlY3RlZCB0ZW1wbGF0ZSgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIlwiOyIsImltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJQmluZGVyLCBEZWJ1ZywgSlF1ZXJ5IGFzICQgfSBmcm9tICdAcmliYWpzL2NvcmUnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vcmV2b2tlLWZvcm0uY29tcG9uZW50Lmh0bWwnO1xuaW1wb3J0IHsgTG9jYWxlc1NlcnZpY2UgfSBmcm9tICdAcmliYWpzL3Nob3BpZnktdGRhJztcblxuLy8gVE9ETyBtb3ZlIHRvIGdlbmVyYWwgdmFsaWRhdGlvbiBjb21wb25lbnQgY2xhc3Mgd2UgY2FuIGV4dGVuZCBmcm9tXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uUnVsZSB7XG4gIHJlcXVpcmVkOiBib29sZWFuO1xuICBtaW5sZW5ndGg/OiBudW1iZXI7XG4gIG1heGxlbmd0aD86IG51bWJlcjtcbiAgbWF4PzogbnVtYmVyO1xuICBtaW4/OiBudW1iZXI7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGlzRW1haWw/OiBib29sZWFuO1xuICBpc1Bob25lPzogYm9vbGVhbjtcbiAgb25seU51bWJlcnM/OiBib29sZWFuO1xufVxuXG4vLyBUT0RPIG1vdmUgdG8gZ2VuZXJhbCB2YWxpZGF0aW9uIGNvbXBvbmVudCBjbGFzcyB3ZSBjYW4gZXh0ZW5kIGZyb21cbmV4cG9ydCBpbnRlcmZhY2UgSVZhbGlkYXRpb25PYmplY3Qge1xuICB2YWxpZDogYm9vbGVhbjtcbiAgcnVsZXM/OiB7XG4gICAgW2tleTogc3RyaW5nXTogSVZhbGlkYXRpb25SdWxlO1xuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgUmV2b2tlRm9ybUNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyB0YWdOYW1lOiBzdHJpbmcgPSAncnYtcmV2b2tlLWZvcm0nO1xuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkZWJ1ZyA9IERlYnVnKCdjb21wb25lbnQ6JyArIFJldm9rZUZvcm1Db21wb25lbnQudGFnTmFtZSk7XG5cbiAgcHJvdGVjdGVkIGxvY2FsZXNTZXJ2aWNlID0gbmV3IExvY2FsZXNTZXJ2aWNlKCk7XG5cbiAgcHJvdGVjdGVkICRmb3JtPzogSlF1ZXJ5PEhUTUxGb3JtRWxlbWVudD47XG5cbiAgcHJvdGVjdGVkIHNjb3BlOiBhbnkgPSB7XG4gICAgZm9ybToge1xuICAgICAgZmlyc3ROYW1lOiAnJyxcbiAgICAgIGxhc3ROYW1lOiAnJyxcbiAgICAgIHBob25lOiAnJyxcbiAgICAgIGVtYWlsOiAnJyxcbiAgICAgIG1lc3NhZ2U6ICcnLFxuICAgIH0sXG4gICAgdmFsaWRhdGlvbjogdGhpcy5nZXRWYWxpZGF0aW9uT2JqZWN0KCksXG4gICAgLyoqIHNlbmQgZm9ybSBmdW5jdGlvbiAqL1xuICAgIHNlbmQ6IHRoaXMuc2VuZCxcbiAgICAvKiogc2VsZWN0IGFsbCB0ZXh0IGZ1bmN0aW9uICovXG4gICAgc2VsZWN0QWxsOiB0aGlzLnNlbGVjdEFsbCxcbiAgICAvKiogZm9ybSBwb3N0IHJlcXVlc3QgZXJyb3IgbWVzc2FnZSBpZiBmb3JtIGZhaWxzICovXG4gICAgZXJyb3I6ICcnLFxuICAgIC8qKiBmb3JtIHBvc3QgcmVxdWVzdCBzdWNjZXNzIG1lc3NhZ2UgaWYgZm9ybSByZXF1ZXN0IHdhcyBzdWNjZXMgKi9cbiAgICBzdWNjZXNzOiAnJyxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50PzogSFRNTEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLmluaXQoUmV2b2tlRm9ybUNvbXBvbmVudC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgdGhlIGNvbnRhY3QgZm9ybSB1c2luZyBhIGZvcm0gc3VibWl0IHJlcXVlc3Qgd2l0aCBiZXN0IHNob3BpZnkgZm9ybSBzdXBwb3J0XG4gICAqL1xuICBwdWJsaWMgc2VuZChjb250ZXh0OiBJQmluZGVyPGFueT4sIGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuZGVidWcoJ3NlbmQnLCB0aGlzLnNjb3BlLCBldmVudCk7XG5cbiAgICB0aGlzLnNjb3BlLmZvcm0uZmlyc3ROYW1lID0gVXRpbHMuc3RyaXBIdG1sKHRoaXMuc2NvcGUuZm9ybS5maXJzdE5hbWUpO1xuICAgIHRoaXMuc2NvcGUuZm9ybS5sYXN0TmFtZSA9IFV0aWxzLnN0cmlwSHRtbCh0aGlzLnNjb3BlLmZvcm0ubGFzdE5hbWUpO1xuICAgIHRoaXMuc2NvcGUuZm9ybS5waG9uZSA9IFV0aWxzLnN0cmlwSHRtbCh0aGlzLnNjb3BlLmZvcm0ucGhvbmUpO1xuICAgIHRoaXMuc2NvcGUuZm9ybS5lbWFpbCA9IFV0aWxzLnN0cmlwSHRtbCh0aGlzLnNjb3BlLmZvcm0uZW1haWwpO1xuXG4gICAgaWYgKHRoaXMuJGZvcm0pIHtcbiAgICAgIHRoaXMuc2NvcGUudmFsaWRhdGlvbiA9IHRoaXMudmFsaWRhdGUodGhpcy5zY29wZS52YWxpZGF0aW9uLCB0aGlzLnNjb3BlLmZvcm0sIFsnZmlyc3ROYW1lJywgJ2xhc3ROYW1lJywgJ3Bob25lJywgJ2VtYWlsJywgJ21lc3NhZ2UnXSwgdGhpcy4kZm9ybSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnNjb3BlLnZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgIC8vIHN0b3AgYXV0b21hdGljIHN1Ym1pdFxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cblxuICB9XG5cbiAgcHVibGljIHNlbGVjdEFsbChjb250ZXh0OiBJQmluZGVyPGFueT4sIGV2ZW50OiBKUXVlcnkuRXZlbnQsIHNjb3BlOiBhbnksIGV2ZW50RWw6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICB0aGlzLmRlYnVnKCdzZWxlY3RBbGwnKTtcbiAgICBVdGlscy5zZWxlY3RBbGwoZXZlbnRFbCk7XG4gIH1cblxuICAvKipcbiAgICogdmFsaWRhdGUgZm9ybVxuICAgKiBAcGFyYW0gdmFsaWRhdGlvbiBvYmplY3Qgd2l0aCB0aGUgdmFsaWRhdGlvbiBydWxlc1xuICAgKiBAcGFyYW0gdGhlIGZvcm0gd2l0aCB0aGUgdmFsdWVzIGZvcm0gdGhlIGZvcm1cbiAgICogQHBhcmFtIGtleXMga2V5cyB5b3Ugd2FudCB0byB2YWxpZGF0ZVxuICAgKi9cbiAgcHJvdGVjdGVkIHZhbGlkYXRlKHZhbGlkYXRpb246IElWYWxpZGF0aW9uT2JqZWN0LCBmb3JtVmFsdWVzOiBhbnksIGtleXM6IHN0cmluZ1tdLCAkZm9ybTogSlF1ZXJ5PEhUTUxGb3JtRWxlbWVudD4pIHtcbiAgICB2YWxpZGF0aW9uLnZhbGlkID0gdHJ1ZTtcblxuICAgIGtleXMuZm9yRWFjaCgoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICghdmFsaWRhdGlvbi5ydWxlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnJztcbiAgICAgIC8vIHZhbHVlIGlzIHJlcXVyZWRcbiAgICAgIGlmICh2YWxpZGF0aW9uLnJ1bGVzW2tleV0ucmVxdWlyZWQpIHtcbiAgICAgICAgaWYgKFV0aWxzLmlzU3RyaW5nKGZvcm1WYWx1ZXNba2V5XSkpIHtcbiAgICAgICAgICBpZiAoZm9ybVZhbHVlc1trZXldLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZCc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChVdGlscy5pc1VuZGVmaW5lZChmb3JtVmFsdWVzW2tleV0pKSB7XG4gICAgICAgICAgdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkYXRpb24gZm9yIG51bWJlcnNcbiAgICAgIGlmIChVdGlscy5pc051bWJlcihmb3JtVmFsdWVzW2tleV0pKSB7XG4gICAgICAgIC8vIG1heGltdW0gdmFsdWUgZm9yIG51bWJlclxuICAgICAgICBpZiAoVXRpbHMuaXNOdW1iZXIodmFsaWRhdGlvbi5ydWxlc1trZXldLm1heCkpIHtcbiAgICAgICAgICBpZiAoZm9ybVZhbHVlc1trZXldID4gKHZhbGlkYXRpb24ucnVsZXNba2V5XS5tYXggYXMgbnVtYmVyKSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ1RoZSBudW1iZXIgbXVzdCBiZSBhIG1heGltdW0gb2YgJyArIHZhbGlkYXRpb24ucnVsZXNba2V5XS5tYXg7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gbWluaW11bSB2YWx1ZSBmb3IgbnVtYmVyXG4gICAgICAgIGlmIChVdGlscy5pc051bWJlcih2YWxpZGF0aW9uLnJ1bGVzW2tleV0ubWluKSkge1xuICAgICAgICAgIGlmIChmb3JtVmFsdWVzW2tleV0gPCAodmFsaWRhdGlvbi5ydWxlc1trZXldLm1pbiBhcyBudW1iZXIpKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnVGhlIG51bWJlciBtdXN0IGJlIGF0IGxlYXN0ICcgKyB2YWxpZGF0aW9uLnJ1bGVzW2tleV0ubWluO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZGF0aW9uIGZvciBzdHJpbmdzXG4gICAgICBpZiAoVXRpbHMuaXNTdHJpbmcoZm9ybVZhbHVlc1trZXldKSAmJiBmb3JtVmFsdWVzW2tleV0ubGVuZ3RoID49IDEgKSB7XG4gICAgICAgIC8vIG1heGltdW0gdmFsdWUgZm9yIHN0cmluZyBsZW5ndGhcbiAgICAgICAgaWYgKFV0aWxzLmlzTnVtYmVyKHZhbGlkYXRpb24ucnVsZXNba2V5XS5tYXhsZW5ndGgpKSB7XG4gICAgICAgICAgaWYgKGZvcm1WYWx1ZXNba2V5XS5sZW5ndGggPiAodmFsaWRhdGlvbi5ydWxlc1trZXldLm1heGxlbmd0aCBhcyBudW1iZXIpKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnVGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIG11c3Qgbm90IGV4Y2VlZCAnICsgdmFsaWRhdGlvbi5ydWxlc1trZXldLm1heGxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBtaW5pbXVtIHZhbHVlIGZvciBzdHJpbmcgbGVuZ3RoXG4gICAgICAgIGlmIChVdGlscy5pc051bWJlcih2YWxpZGF0aW9uLnJ1bGVzW2tleV0ubWlubGVuZ3RoKSkge1xuICAgICAgICAgIGlmIChmb3JtVmFsdWVzW2tleV0ubGVuZ3RoIDwgKHZhbGlkYXRpb24ucnVsZXNba2V5XS5taW5sZW5ndGggYXMgbnVtYmVyKSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ1RoZSBudW1iZXIgb2YgY2hhcmFjdGVycyBtdXN0IGJlIGF0IGxlYXN0ICcgKyB2YWxpZGF0aW9uLnJ1bGVzW2tleV0ubWlubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVtYWlsXG4gICAgICAgIGlmICh2YWxpZGF0aW9uLnJ1bGVzW2tleV0uaXNFbWFpbCkge1xuICAgICAgICAgIGlmIChmb3JtVmFsdWVzW2tleV0uaW5kZXhPZignQCcpIDw9IC0xKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnVGhpcyBpcyBub3QgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZm9ybVZhbHVlc1trZXldLmluZGV4T2YoJy4nKSA8PSAtMSkge1xuICAgICAgICAgICAgdmFsaWRhdGlvbi5ydWxlc1trZXldLmVycm9yID0gJ1RoaXMgaXMgbm90IGEgdmFsaWQgZW1haWwgYWRkcmVzcyc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGhvbmUgbnVtYmVyXG4gICAgICAgIGlmICh2YWxpZGF0aW9uLnJ1bGVzW2tleV0uaXNQaG9uZSkge1xuICAgICAgICAgIGlmICghVXRpbHMuc3RyaW5nSXNQaG9uZU51bWJlcihmb3JtVmFsdWVzW2tleV0pKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnVGhlIHBob25lIG51bWJlciBjYW4gb25seSBjb250YWluIG51bWJlcnMsICssIC0sICkgYW5kICgnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG9ubHkgbnVtYmVyc1xuICAgICAgICBpZiAodmFsaWRhdGlvbi5ydWxlc1trZXldLm9ubHlOdW1iZXJzKSB7XG4gICAgICAgICAgaWYgKCFVdGlscy5zdHJpbmdIYXNPbmx5TnVtYmVycyhmb3JtVmFsdWVzW2tleV0pKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IgPSAnVGhlIHZhbHVlIG1heSBvbmx5IGNvbnRhaW4gbnVtYmVycyc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGlzIGFsbCB2YWxpZD9cbiAgICAgIGlmICh2YWxpZGF0aW9uLnJ1bGVzW2tleV0uZXJyb3IubGVuZ3RoKSB7XG4gICAgICAgIHZhbGlkYXRpb24udmFsaWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJ1biBhbHNvIHRoZSBuYXRpdmUgYnJvd3NlciB2YWxpZGF0aW9uXG4gICAgICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTFNlbGVjdEVsZW1lbnQvY2hlY2tWYWxpZGl0eVxuICAgICAqL1xuICAgIGlmICh2YWxpZGF0aW9uLnZhbGlkKSB7XG4gICAgICB2YWxpZGF0aW9uLnZhbGlkID0gJGZvcm1bMF0uY2hlY2tWYWxpZGl0eSgpO1xuICAgIH1cblxuICAgICRmb3JtLmFkZENsYXNzKCd3YXMtdmFsaWRhdGVkJyk7XG4gICAgdGhpcy5kZWJ1ZygndmFsaWRhdGUnLCB2YWxpZGF0aW9uKTtcbiAgICByZXR1cm4gdmFsaWRhdGlvbjtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRWYWxpZGF0aW9uT2JqZWN0KCkge1xuICAgIGNvbnN0IHZhbGlkYXRpb246IElWYWxpZGF0aW9uT2JqZWN0ID0ge1xuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgICBydWxlczoge1xuICAgICAgICBmaXJzdE5hbWU6IHtcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICBtaW5sZW5ndGg6IDMsXG4gICAgICAgICAgZXJyb3I6ICcnLFxuICAgICAgICB9LFxuICAgICAgICBsYXN0TmFtZToge1xuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgIG1pbmxlbmd0aDogMyxcbiAgICAgICAgICBlcnJvcjogJycsXG4gICAgICAgIH0sXG4gICAgICAgIGVtYWlsOiB7XG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgaXNFbWFpbDogdHJ1ZSxcbiAgICAgICAgICBtaW5sZW5ndGg6IDMsXG4gICAgICAgICAgZXJyb3I6ICcnLFxuICAgICAgICB9LFxuICAgICAgICBwaG9uZToge1xuICAgICAgICAgIHJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgICBpc1Bob25lOiB0cnVlLFxuICAgICAgICAgIG1pbmxlbmd0aDogNCxcbiAgICAgICAgICBlcnJvcjogJycsXG4gICAgICAgIH0sXG4gICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICBtaW5sZW5ndGg6IDIwLFxuICAgICAgICAgIGVycm9yOiAnJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gdmFsaWRhdGlvbjtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBiZWZvcmVCaW5kKCkge1xuICAgIHRoaXMuZGVidWcoJ2JlZm9yZScpO1xuICAgIHRoaXMuJGZvcm0gPSAkKHRoaXMuZWwpLmZpbmQoJ2Zvcm0nKSBhcyBKUXVlcnk8SFRNTEZvcm1FbGVtZW50PjtcblxuICAgIC8vIEZvciBjdXN0b20gc3R5bGUgZm9ybSB2YWxpZGF0aW9uLCBzZWUgaHR0cHM6Ly9nZXRib290c3RyYXAuY29tL2RvY3MvNC4xL2NvbXBvbmVudHMvZm9ybXMvI2N1c3RvbS1zdHlsZXNcbiAgICB0aGlzLiRmb3JtLmFkZENsYXNzKCduZWVkcy12YWxpZGF0aW9uJyk7XG4gICAgdGhpcy4kZm9ybS5hdHRyKCdub3ZhbGlkYXRlJywgJycpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlcXVpcmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcm90ZWN0ZWQgdGVtcGxhdGUoKSB7XG4gICAgLy8gT25seSBzZXQgdGhlIGNvbXBvbmVudCB0ZW1wbGF0ZSBpZiB0aGVyZSBubyBjaGlsZHMgYWxyZWFkeVxuICAgIGlmICh0aGlzLmVsLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8c3BhbiBjbGFzcz1zaGFyZS1sYWJlbCBydi1zaG93PWlzTmF0aXZlIHJ2LWkxOG4tdGV4dD1sYWJlbEkxOG4+PC9zcGFuPiA8ZGl2IGNsYXNzPXdlYi1zaGFyZSBzdHlsZT1kaXNwbGF5Om5vbmU+IDxkaXYgY2xhc3M9XFxcIndlYi1zaGFyZS1jb250YWluZXIgd2ViLXNoYXJlLWdyaWRcXFwiPiA8ZGl2IGNsYXNzPXdlYi1zaGFyZS10aXRsZT5TSEFSRSBWSUE8L2Rpdj4gPGEgY2xhc3M9XFxcIndlYi1zaGFyZS1pdGVtIHdlYi1zaGFyZS13aGF0c2FwcFxcXCIgZGF0YS1hY3Rpb249c2hhcmUvd2hhdHNhcHAvc2hhcmUgdGFyZ2V0PV9ibGFuayBydi1ocmVmPXNoYXJlVXJscy53aGF0c2FwcD4gPGRpdiBjbGFzcz13ZWItc2hhcmUtaWNvbi13aGF0c2FwcD48L2Rpdj4gPGRpdiBjbGFzcz13ZWItc2hhcmUtaXRlbS1kZXNjPldoYXRzYXBwPC9kaXY+IDwvYT4gPGEgY2xhc3M9XFxcIndlYi1zaGFyZS1pdGVtIHdlYi1zaGFyZS1mYWNlYm9va1xcXCIgcnYtaHJlZj1zaGFyZVVybHMuZmFjZWJvb2s+IDxkaXYgY2xhc3M9d2ViLXNoYXJlLWljb24tZmFjZWJvb2s+PC9kaXY+IDxkaXYgY2xhc3M9d2ViLXNoYXJlLWl0ZW0tZGVzYz5GYWNlYm9vazwvZGl2PiA8L2E+IDxhIGNsYXNzPVxcXCJ3ZWItc2hhcmUtaXRlbSB3ZWItc2hhcmUtdGVsZWdyYW1cXFwiIHRhcmdldD1fYmxhbmsgcnYtaHJlZj1zaGFyZVVybHMudGVsZWdyYW0+IDxkaXYgY2xhc3M9d2ViLXNoYXJlLWljb24tdGVsZWdyYW0+PC9kaXY+IDxkaXYgY2xhc3M9d2ViLXNoYXJlLWl0ZW0tZGVzYz5UZWxlZ3JhbTwvZGl2PiA8L2E+IDxhIGNsYXNzPVxcXCJ3ZWItc2hhcmUtaXRlbSB3ZWItc2hhcmUtZW1haWxcXFwiIHJ2LWhyZWY9c2hhcmVVcmxzLmVtYWlsPiA8ZGl2IGNsYXNzPXdlYi1zaGFyZS1pY29uLWVtYWlsPjwvZGl2PiA8ZGl2IGNsYXNzPXdlYi1zaGFyZS1pdGVtLWRlc2M+RW1haWw8L2Rpdj4gPC9hPiA8YSBjbGFzcz1cXFwid2ViLXNoYXJlLWl0ZW0gd2ViLXNoYXJlLXNtc1xcXCIgcnYtaHJlZj1zaGFyZVVybHMuc21zPiA8ZGl2IGNsYXNzPXdlYi1zaGFyZS1pY29uLXNtcz48L2Rpdj4gPGRpdiBjbGFzcz13ZWItc2hhcmUtaXRlbS1kZXNjPlNNUzwvZGl2PiA8L2E+IDxhIGNsYXNzPVxcXCJ3ZWItc2hhcmUtaXRlbSB3ZWItc2hhcmUtY29weVxcXCI+IDxkaXYgY2xhc3M9d2ViLXNoYXJlLWljb24tY29weT48L2Rpdj4gPGRpdiBjbGFzcz13ZWItc2hhcmUtaXRlbS1kZXNjPkNvcHk8L2Rpdj4gPC9hPiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwid2ViLXNoYXJlLWNvbnRhaW5lciB3ZWItc2hhcmUtY2FuY2VsXFxcIj5DYW5jZWw8L2Rpdj4gPC9kaXY+XCI7IiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBEZWJ1ZyxcbiAgSlF1ZXJ5IGFzICQsXG4gIElCaW5kZXIsXG59IGZyb20gJ0ByaWJhanMvY29yZSc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9zaGFyZS5jb21wb25lbnQuaHRtbCc7XG5pbXBvcnQgeyBEcm9wZG93blNlcnZpY2UgfSBmcm9tICcuLi9iczQvZHJvcGRvd24vZHJvcGRvd24uc2VydmljZSc7XG5pbXBvcnQgeyBMb2NhbGVzU2VydmljZSB9IGZyb20gJ0ByaWJhanMvc2hvcGlmeS10ZGEnO1xuXG5pbnRlcmZhY2UgSVNjb3BlIHtcbiAgdGl0bGU6IHN0cmluZztcbiAgdGV4dDogc3RyaW5nO1xuICB0ZXh0STE4bj86IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIGxhYmVsSTE4bj86IHN0cmluZztcbiAgc2hhcmU6IFNoYXJlQ29tcG9uZW50WydzaGFyZSddO1xuICAvKiogdHJ1ZSBpZiB0aGUgYnJvd3NlciBydW5zIG9uIEFuZHJvaWQgKi9cbiAgaXNBbmRyb2lkOiBib29sZWFuO1xuICAvKiogdHJ1ZSBpZiB0aGUgYnJvd3NlciBydW5zIG9uIGlPUyAqL1xuICBpc0lvczogYm9vbGVhbjtcbiAgLyoqIHRydWUgaWYgdGhlIGJyb3dzZXIgcnVucyBvbiBhIGRlc2t0b3AgY29tcHV0ZXIgKi9cbiAgaXNEZXNrdG9wOiBib29sZWFuO1xuICAvKiogb2JqZWN0IHdpdGggc2hhcmUgdXJscyBsaWtlIHdoYXRzYXBwLCB0ZWxlZ3JhbSwgaW5zdGFncmFtIGV0YyB1c2VkIGlmIHRoZSBuYXRpdmUgc2hhcmUgaXMgbm9pdCBhdmFpbGFibGUgKi9cbiAgc2hhcmVVcmxzOiBhbnk7XG4gIC8qKiB0cnVlIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIG5hdGl2ZSBzaGFyZSAqL1xuICBpc05hdGl2ZTogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIElOYXZpZ2F0b3JTaGFyZVBhcmFtIHtcbiAgdXJsOiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZztcbn1cblxuZGVjbGFyZSBnbG9iYWwge1xuICAvLyB0c2xpbnQ6ZGlzYWJsZTogaW50ZXJmYWNlLW5hbWVcbiAgaW50ZXJmYWNlIE5hdmlnYXRvciB7IHNoYXJlOiAoZGF0YTogSU5hdmlnYXRvclNoYXJlUGFyYW0pID0+IFByb21pc2U8YW55PjsgfVxufVxuXG4vKipcbiAqIENvbXBvbmVudCB0byBzaGFyZSB0aGUgYSBsaW5rXG4gKiBJbnNwaXJlZCBieTpcbiAqICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9uaW1pcS93ZWItc2hhcmUtc2hpbVxuICogICogaHR0cDovL3dlYmludGVudHMub3JnL1xuICogICogaHR0cDovL2Nocmlzd3Jlbi5naXRodWIuaW8vbmF0aXZlLXNvY2lhbC1pbnRlcmFjdGlvbnMvXG4gKiAgKiBodHRwczovL3d3dy5zaGFyZXRoaXMuY29tL3BsYXRmb3JtL3NoYXJlLWJ1dHRvbnMvXG4gKlxuICogVE9ETyBGYWxsYmFjayBzaGFyZSBpZiBuYXRpdmUgc2hhcmUgaXMgbm90IGF2YWJpbGVcbiAqL1xuZXhwb3J0IGNsYXNzIFNoYXJlQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBwdWJsaWMgc3RhdGljIHRhZ05hbWU6IHN0cmluZyA9ICdydi1zaGFyZSc7XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsndGl0bGUnLCAndGV4dCcsICd0ZXh0LWkxOG4nLCAndXJsJywgJ2xhYmVsJywgJ2xhYmVsLWkxOG4nXTtcbiAgfVxuXG4gIHByb3RlY3RlZCAkZWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XG5cbiAgcHJvdGVjdGVkIGRlYnVnID0gRGVidWcoJ2NvbXBvbmVudDonICsgU2hhcmVDb21wb25lbnQudGFnTmFtZSk7XG5cbiAgcHJvdGVjdGVkIGxvY2FsZXNTZXJ2aWNlID0gbmV3IExvY2FsZXNTZXJ2aWNlKCk7XG5cbiAgcHJvdGVjdGVkIGRyb3Bkb3duU2VydmljZTogRHJvcGRvd25TZXJ2aWNlO1xuXG4gIHByb3RlY3RlZCBnZXQgc2hhcmVVcmxzKCkge1xuICAgIGNvbnN0IGZiaWQgPSBudWxsO1xuICAgIHRoaXMuc2NvcGUudXJsID0gdGhpcy5zY29wZS51cmw7XG4gICAgdGhpcy5zY29wZS50ZXh0ID0gdGhpcy5zY29wZS50ZXh0O1xuICAgIHRoaXMuc2NvcGUudGl0bGUgPSB0aGlzLnNjb3BlLnRpdGxlO1xuICAgIGNvbnN0IGJvZHkgPSBlbmNvZGVVUklDb21wb25lbnQoYCR7dGhpcy5zY29wZS50ZXh0fVxcblxcbiR7dGhpcy5zY29wZS51cmx9YCk7XG4gICAgY29uc3QgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KHRoaXMuc2NvcGUudXJsKTtcbiAgICBjb25zdCByZWRpcmVjdFVyaSA9IGVuY29kZVVSSUNvbXBvbmVudCh0aGlzLnNjb3BlLnVybCk7XG4gICAgY29uc3QgdXJscyA9IHtcbiAgICAgIHdoYXRzYXBwOiB0aGlzLnNjb3BlLmlzRGVza3RvcCA/IGBodHRwczovL2FwaS53aGF0c2FwcC5jb20vc2VuZD90ZXh0PSR7Ym9keX1gIDogYHdoYXRzYXBwOi8vc2VuZD90ZXh0PSR7Ym9keX1gLFxuICAgICAgdGVsZWdyYW06IHRoaXMuc2NvcGUuaXNEZXNrdG9wID8gYGh0dHBzOi8vdGVsZWdyYW0ubWUvc2hhcmUvdXJsP3VybD0ke3VybH0mdGV4dD0ke2JvZHl9YCA6IGB0ZzovL21zZz90ZXh0PSR7Ym9keX1gLFxuICAgICAgZmFjZWJvb2s6IHRoaXMuc2NvcGUuaXNEZXNrdG9wID8gYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9kaWFsb2cvc2hhcmU/YXBwX2lkPSR7ZmJpZH0mZGlzcGxheT1wb3B1cCZocmVmPSR7dXJsfSZyZWRpcmVjdF91cmk9JHtyZWRpcmVjdFVyaX0mcXVvdGU9JHtib2R5fWAgOiBgZmItbWVzc2VuZ2VyOi8vc2hhcmUvP21lc3NhZ2U9JHtib2R5fWAsXG4gICAgICBlbWFpbDogYG1haWx0bzo/c3ViamVjdD0ke3RoaXMuc2NvcGUudGl0bGV9JmJvZHk9JHtib2R5fWAsXG4gICAgICBzbXM6IGBzbXM6P2JvZHk9JHtib2R5fWAsXG4gICAgfTtcblxuICAgIHJldHVybiB1cmxzO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNjb3BlOiBJU2NvcGUgPSB7XG4gICAgdGl0bGU6ICQoZG9jdW1lbnQpLmZpbmQoJ3RpdGxlJykudGV4dCgpLFxuICAgIHRleHQ6ICdMb29rIGF0IHRoaXMhIPCfpKknLCAvLyDwn5GAXG4gICAgdGV4dEkxOG46IHVuZGVmaW5lZCxcbiAgICB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgIGxhYmVsOiAnU2hhcmUnLFxuICAgIGxhYmVsSTE4bjogdW5kZWZpbmVkLFxuICAgIHNoYXJlOiB0aGlzLnNoYXJlLFxuICAgIGlzQW5kcm9pZDogbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKSAhPT0gbnVsbCxcbiAgICBpc0lvczogbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVBob25lfGlQYWR8aVBvZC9pKSAhPT0gbnVsbCxcbiAgICBpc0Rlc2t0b3A6IGZhbHNlLFxuICAgIHNoYXJlVXJsczoge30sXG4gICAgaXNOYXRpdmU6IHR5cGVvZihuYXZpZ2F0b3Iuc2hhcmUpID09PSAnZnVuY3Rpb24nLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ/OiBIVE1MRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMuJGVsID0gJCh0aGlzLmVsKTtcbiAgICB0aGlzLmRyb3Bkb3duU2VydmljZSA9IG5ldyBEcm9wZG93blNlcnZpY2UodGhpcy4kZWwuZmluZCgnLmRyb3Bkb3duLXRvZ2dsZScpWzBdIGFzIEhUTUxCdXR0b25FbGVtZW50KTtcbiAgICB0aGlzLmRlYnVnKCdjb25zdHJ1Y3RvcicsIHRoaXMpO1xuICAgIHRoaXMuJGVsLm9uKCdjbGljaycsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5zaGFyZShudWxsLCBldmVudCk7XG4gICAgfSk7XG4gICAgdGhpcy5pbml0KFNoYXJlQ29tcG9uZW50Lm9ic2VydmVkQXR0cmlidXRlcyk7XG4gICAgdGhpcy5zY29wZS5pc0Rlc2t0b3AgPSAhKHRoaXMuc2NvcGUuaXNJb3MgfHwgdGhpcy5zY29wZS5pc0FuZHJvaWQpOyAvLyBvbiB0aG9zZSB0d28gc3VwcG9ydCBcIm1vYmlsZSBkZWVwIGxpbmtzXCIsIHNvIEhUVFAgYmFzZWQgZmFsbGJhY2sgZm9yIGFsbCBvdGhlcnMuXG4gIH1cblxuICBwdWJsaWMgc2hhcmUoY29udGV4dDogSUJpbmRlcjxhbnk+IHwgbnVsbCwgZXZlbnQ6IEV2ZW50IHwgSlF1ZXJ5LkV2ZW50KTogUHJvbWlzZTxhbnk+IHtcbiAgICB0aGlzLmRlYnVnKCdzaGFyZScsIHRoaXMuc2NvcGUpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgLy8gcmV0dXJuIHRoaXMuZHJvcGRvd25TZXJ2aWNlLnRvZ2dsZSgpO1xuICAgIGlmICh0aGlzLnNjb3BlLmlzTmF0aXZlKSB7XG4gICAgICByZXR1cm4gbmF2aWdhdG9yLnNoYXJlKHtcbiAgICAgICAgdGl0bGU6IHRoaXMuc2NvcGUudGl0bGUsXG4gICAgICAgIHRleHQ6IGAke3RoaXMuc2NvcGUudGV4dH1cXHJcXG5cXHJcXG5gLFxuICAgICAgICB1cmw6IHRoaXMuc2NvcGUudXJsIHx8IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgLy8gVE9ETyBvcGVuIG1lbnVcbiAgICAgICAgdGhpcy50b2dnbGUobnVsbCwgZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHRvZ2dsZShfOiBhbnksIGV2ZW50OiBFdmVudCB8IEpRdWVyeS5FdmVudCkge1xuICAgIHRoaXMuZGVidWcoJ3RvZ2dsZScpO1xuICB9XG5cbiAgcHVibGljIGNsb3NlRHJvcGRvd25zKCkge1xuICAgIHRoaXMuZGVidWcoJ2Nsb3NlRHJvcGRvd25zJyk7XG4gICAgRHJvcGRvd25TZXJ2aWNlLmNsb3NlQWxsKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5pdFRyYW5zbGF0ZSgpIHtcbiAgICB0aGlzLmxvY2FsZXNTZXJ2aWNlLmV2ZW50Lm9uKCdjaGFuZ2VkJywgKGxhbmdjb2RlOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMudHJhbnNsYXRlKGxhbmdjb2RlKTtcbiAgICB9KTtcbiAgICBpZiAodGhpcy5sb2NhbGVzU2VydmljZS5yZWFkeSkge1xuICAgICAgY29uc3QgbGFuZ2NvZGUgPSB0aGlzLmxvY2FsZXNTZXJ2aWNlLmdldExhbmdjb2RlKCk7XG4gICAgICBpZiAobGFuZ2NvZGUpIHtcbiAgICAgICAgdGhpcy50cmFuc2xhdGUobGFuZ2NvZGUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxvY2FsZXNTZXJ2aWNlLmV2ZW50Lm9uKCdyZWFkeScsIChsYW5nY29kZTogc3RyaW5nLCB0cmFuc2xhdGlvbk5lZWRlZDogYm9vbGVhbikgPT4ge1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZShsYW5nY29kZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgdHJhbnNsYXRlKGxhbmdjb2RlOiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMuc2NvcGUudGV4dEkxOG4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmxvY2FsZXNTZXJ2aWNlLmdldChbbGFuZ2NvZGUsIC4uLnRoaXMuc2NvcGUudGV4dEkxOG4uc3BsaXQoJy4nKV0pXG4gICAgLnRoZW4oKGxvY2FsKSA9PiB7XG4gICAgICB0aGlzLmRlYnVnKCdjaGFuZ2VkIGxvY2FsJywgbG9jYWwpO1xuICAgICAgdGhpcy5zY29wZS50ZXh0ID0gbG9jYWw7XG4gICAgICByZXR1cm47XG4gICAgfSlcbiAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYmVmb3JlQmluZCgpIHtcbiAgICB0aGlzLmRlYnVnKCdiZWZvcmVCaW5kJyk7XG4gICAgdGhpcy5pbml0VHJhbnNsYXRlKCk7XG4gICAgLy8gY29uc3QgJHdoYXRzYXBwID0gdGhpcy4kZWwuZmluZCgnLndlYi1zaGFyZS13aGF0c2FwcCcpO1xuICAgIC8vIGNvbnN0ICRmYWNlYm9vayA9IHRoaXMuJGVsLmZpbmQoJy53ZWItc2hhcmUtZmFjZWJvb2snKTtcbiAgICAvLyBjb25zdCAkdGVsZWdyYW0gPSB0aGlzLiRlbC5maW5kKCcud2ViLXNoYXJlLXRlbGVncmFtJyk7XG4gICAgLy8gY29uc3QgJGVtYWlsICAgID0gdGhpcy4kZWwuZmluZCgnLndlYi1zaGFyZS1lbWFpbCcpO1xuICAgIC8vIGNvbnN0ICRzbXMgICAgICA9IHRoaXMuJGVsLmZpbmQoJy53ZWItc2hhcmUtc21zJyk7XG4gICAgLy8gY29uc3QgJGNvcHkgICAgID0gdGhpcy4kZWwuZmluZCgnLndlYi1zaGFyZS1jb3B5Jyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYWZ0ZXJCaW5kKCkge1xuICAgIHRoaXMuZGVidWcoJ2FmdGVyQmluZCcsIHRoaXMuc2NvcGUpO1xuICAgIHRoaXMuc2NvcGUuc2hhcmVVcmxzID0gdGhpcy5zaGFyZVVybHM7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVxdWlyZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ3RpdGxlJywgJ3RleHQnLCAndXJsJywgJ2xhYmVsJ107XG4gIH1cblxuICBwcm90ZWN0ZWQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiXCI7IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBEZWJ1ZywgSlF1ZXJ5IGFzICQsIElCaW5kZXIgfSBmcm9tICdAcmliYWpzL2NvcmUnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vc2hvcGlmeS1hZGRyZXNzZXMuY29tcG9uZW50Lmh0bWwnO1xuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9VdGlscyc7XG5cbi8vIFRPRE8gbW92ZSB0byBnZW5lcmFsIHZhbGlkYXRpb24gY29tcG9uZW50IGNsYXNzIHdlIGNhbiBleHRlbmQgZnJvbVxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvblJ1bGUge1xuICByZXF1aXJlZDogYm9vbGVhbjtcbiAgbWlubGVuZ3RoPzogbnVtYmVyO1xuICBtYXhsZW5ndGg/OiBudW1iZXI7XG4gIG1heD86IG51bWJlcjtcbiAgbWluPzogbnVtYmVyO1xuICBlcnJvcjogc3RyaW5nO1xuICBpc0VtYWlsPzogYm9vbGVhbjtcbiAgaXNQaG9uZT86IGJvb2xlYW47XG4gIG9ubHlOdW1iZXJzPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdGlvbk9iamVjdCB7XG4gIHZhbGlkOiBib29sZWFuO1xuICBydWxlcz86IHtcbiAgICBba2V5OiBzdHJpbmddOiBJVmFsaWRhdGlvblJ1bGU7XG4gIH07XG59XG5cbmludGVyZmFjZSBJU2NvcGUge1xuICAvLyBmb3JtOiB7XG4gIC8vICAgY3VzdG9tZXI6IHtcbiAgLy8gICAgIGVtYWlsOiBzdHJpbmc7XG4gIC8vICAgICBwYXNzd29yZDogc3RyaW5nO1xuICAvLyAgIH07XG4gIC8vIH07XG5cbiAgZWRpdEFkZHJlc3M6IHtcbiAgICBbYWRkcmVzc0lEOiBzdHJpbmddOiB7XG4gICAgICB2YWxpZGF0aW9uOiBJVmFsaWRhdGlvbk9iamVjdDtcbiAgICB9O1xuICB9O1xuXG4gIHNob3dGb3JtSWQ6IHN0cmluZztcblxuICBjcmVhdGVBZGRyZXNzOiB7XG4gICAgdmFsaWRhdGlvbjogSVZhbGlkYXRpb25PYmplY3Q7XG4gIH07XG5cbiAgZWRpdDogU2hvcGlmeUFkZHJlc3Nlc0NvbXBvbmVudFsnZWRpdCddO1xuICBjcmVhdGU6IFNob3BpZnlBZGRyZXNzZXNDb21wb25lbnRbJ2NyZWF0ZSddO1xuICBkZWxldGU6IFNob3BpZnlBZGRyZXNzZXNDb21wb25lbnRbJ2RlbGV0ZSddO1xufVxuXG5leHBvcnQgY2xhc3MgU2hvcGlmeUFkZHJlc3Nlc0NvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyB0YWdOYW1lOiBzdHJpbmcgPSAncnYtc2hvcGlmeS1hZGRyZXNzZXMnO1xuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByb3RlY3RlZCAkZWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XG5cbiAgcHJvdGVjdGVkICRlZGl0QWRkcmVzc0Zvcm06IEpRdWVyeTxIVE1MRm9ybUVsZW1lbnQ+IHwgbnVsbCA9IG51bGw7XG4gIHByb3RlY3RlZCAkY3JlYXRlQWRkcmVzc0Zvcm06IEpRdWVyeTxIVE1MRm9ybUVsZW1lbnQ+IHwgbnVsbCA9IG51bGw7XG5cbiAgcHJvdGVjdGVkIGRlYnVnID0gRGVidWcoJ2NvbXBvbmVudDonICsgU2hvcGlmeUFkZHJlc3Nlc0NvbXBvbmVudC50YWdOYW1lKTtcblxuICBwcm90ZWN0ZWQgc2NvcGU6IElTY29wZSA9IHtcbiAgICBjcmVhdGVBZGRyZXNzOiB7XG4gICAgICB2YWxpZGF0aW9uOiB7XG4gICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzaG93Rm9ybUlkOiAnJyxcbiAgICBlZGl0QWRkcmVzczoge30sXG4gICAgZWRpdDogdGhpcy5lZGl0LFxuICAgIGNyZWF0ZTogdGhpcy5jcmVhdGUsXG4gICAgZGVsZXRlOiB0aGlzLmRlbGV0ZSxcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50PzogSFRNTEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLiRlbCA9ICQodGhpcy5lbCk7XG4gICAgdGhpcy5kZWJ1ZygnY29uc3RydWN0b3InLCB0aGlzKTtcbiAgICB0aGlzLmluaXQoU2hvcGlmeUFkZHJlc3Nlc0NvbXBvbmVudC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgcHVibGljIGVkaXQoaWQ6IHN0cmluZywgY29udGV4dDogSUJpbmRlcjxhbnk+LCBldmVudDogRXZlbnQsIHNjb3BlOiBJU2NvcGUsIGZvcm06IEhUTUxGb3JtRWxlbWVudCkge1xuICAgIHRoaXMuZGVidWcoJ2xvZ2luJywgdGhpcy5zY29wZSk7XG5cbiAgICBjb25zdCAkZm9ybSA9IHRoaXMuJGVsLmZpbmQoYGZvcm1bYWN0aW9uPVwiL2FjY291bnQvYWRkcmVzc2VzLyR7aWR9XWApIGFzIEpRdWVyeTxIVE1MRm9ybUVsZW1lbnQ+O1xuXG4gICAgaWYgKCEkZm9ybSkge1xuICAgICAgdGhpcy5kZWJ1ZygnTm8gZWRpdCBhZGRyZXNzIGZvcm0gZm91bmQnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBzdG9wIG5hdGl2ZSBzdWJtaXRcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy52YWxpZGF0ZSgkZm9ybSwgdGhpcy5zY29wZS5lZGl0QWRkcmVzc1tpZF0udmFsaWRhdGlvbik7XG5cbiAgICBpZiAodGhpcy5zY29wZS5lZGl0QWRkcmVzc1tpZF0udmFsaWRhdGlvbi52YWxpZCkge1xuICAgICAgJGZvcm0uc3VibWl0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVidWcoJ2Zvcm0gbm90IHZhbGlkJywgdGhpcy5zY29wZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN1Ym1pdCBhbiBuZXcgYWRkcmVzc1xuICAgKi9cbiAgcHVibGljIGNyZWF0ZShjb250ZXh0OiBJQmluZGVyPGFueT4sIGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuZGVidWcoJ2NyZWF0ZScsIHRoaXMuc2NvcGUpO1xuXG4gICAgaWYgKCF0aGlzLiRjcmVhdGVBZGRyZXNzRm9ybSkge1xuICAgICAgdGhpcy5kZWJ1ZygnTm8gY3JlYXRlIGZvcm0gZm91bmQnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBzdG9wIG5hdGl2ZSBzdWJtaXRcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy52YWxpZGF0ZSh0aGlzLiRjcmVhdGVBZGRyZXNzRm9ybSwgdGhpcy5zY29wZS5jcmVhdGVBZGRyZXNzLnZhbGlkYXRpb24pO1xuXG4gICAgaWYgKHRoaXMuc2NvcGUuY3JlYXRlQWRkcmVzcy52YWxpZGF0aW9uLnZhbGlkKSB7XG4gICAgICB0aGlzLiRjcmVhdGVBZGRyZXNzRm9ybS5zdWJtaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWJ1ZygnZm9ybSBub3QgdmFsaWQnLCB0aGlzLiRjcmVhdGVBZGRyZXNzRm9ybSk7XG4gICAgfVxuICB9XG5cbiAgLy8gaHR0cHM6Ly9oZWxwLnNob3BpZnkuY29tL2VuL2FwaS9yZWZlcmVuY2UvY3VzdG9tZXJzL2N1c3RvbWVyX2FkZHJlc3NcbiAgLy8gL2FjY291bnQvYWRkcmVzc2VzL3tpZH1cbiAgcHVibGljIGRlbGV0ZShpZDogc3RyaW5nLCBjb250ZXh0OiBJQmluZGVyPGFueT4sIGV2ZW50OiBFdmVudCwgc2NvcGU6IElTY29wZSwgZm9ybTogSFRNTEZvcm1FbGVtZW50KSB7XG4gICAgVXRpbHMuZGVsZXRlKGAvYWNjb3VudC9hZGRyZXNzZXMvJHtpZH1gLCB7fSwgJ2pzb24nKVxuICAgIC50aGVuKChyZXNwb25zZTogYW55KSA9PiB7XG4gICAgICB0aGlzLmRlYnVnKCdkZWxldGUgcmVzcG9uc2UnLCByZXNwb25zZSk7XG4gICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3I6IGFueSkgPT4ge1xuICAgICAgdGhpcy5kZWJ1ZygnZGVsZXRlIGVycm9yJywgZXJyb3IpO1xuICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgaW5pdFZhbGlkYXRpb24oKSB7XG4gICAgdGhpcy4kZWRpdEFkZHJlc3NGb3JtID0gdGhpcy4kZWwuZmluZCgnZm9ybVthY3Rpb25ePVwiL2FjY291bnQvYWRkcmVzc2VzL1wiXScpIGFzIEpRdWVyeTxIVE1MRm9ybUVsZW1lbnQ+O1xuICAgIHRoaXMuJGVkaXRBZGRyZXNzRm9ybS5hdHRyKCdub3ZhbGlkYXRlJywgJycpO1xuICAgIHRoaXMuJGVkaXRBZGRyZXNzRm9ybS5hZGRDbGFzcygnbmVlZHMtdmFsaWRhdGlvbicpO1xuXG4gICAgdGhpcy4kY3JlYXRlQWRkcmVzc0Zvcm0gPSB0aGlzLiRlbC5maW5kKCdmb3JtW2FjdGlvbj1cIi9hY2NvdW50L2FkZHJlc3Nlc1wiXScpICBhcyBKUXVlcnk8SFRNTEZvcm1FbGVtZW50PjtcbiAgICB0aGlzLiRjcmVhdGVBZGRyZXNzRm9ybS5hdHRyKCdub3ZhbGlkYXRlJywgJycpO1xuICAgIHRoaXMuJGNyZWF0ZUFkZHJlc3NGb3JtLmFkZENsYXNzKCduZWVkcy12YWxpZGF0aW9uJyk7XG5cbiAgICB0aGlzLmRlYnVnKCdpbml0VmFsaWRhdGlvbicsIHRoaXMuJGNyZWF0ZUFkZHJlc3NGb3JtLCB0aGlzLiRjcmVhdGVBZGRyZXNzRm9ybSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdmFsaWRhdGUoJGZvcm06IEpRdWVyeTxIVE1MRm9ybUVsZW1lbnQ+LCB2YWxpZGF0aW9uU2NvcGU6IElWYWxpZGF0aW9uT2JqZWN0KSB7XG4gICAgJGZvcm0uZWFjaCgoaW5kZXg6IG51bWJlciwgZm9ybUVsKSA9PiB7XG4gICAgICB2YWxpZGF0aW9uU2NvcGUudmFsaWQgPSBmb3JtRWwuY2hlY2tWYWxpZGl0eSgpO1xuICAgIH0pO1xuICAgICRmb3JtLmFkZENsYXNzKCd3YXMtdmFsaWRhdGVkJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYmVmb3JlQmluZCgpIHtcbiAgICB0aGlzLmRlYnVnKCdiZWZvcmVCaW5kJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYWZ0ZXJCaW5kKCkge1xuICAgIHRoaXMuZGVidWcoJ2FmdGVyQmluZCcsIHRoaXMuc2NvcGUpO1xuICAgIHRoaXMuaW5pdFZhbGlkYXRpb24oKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZXF1aXJlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJvdGVjdGVkIHRlbXBsYXRlKCkge1xuICAgICAvLyBPbmx5IHNldCB0aGUgY29tcG9uZW50IHRlbXBsYXRlIGlmIHRoZXJlIG5vIGNoaWxkcyBhbHJlYWR5XG4gICAgaWYgKHRoaXMuZWwuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIlwiOyIsImltcG9ydCB7IENvbXBvbmVudCwgRGVidWcsIEpRdWVyeSBhcyAkIH0gZnJvbSAnQHJpYmFqcy9jb3JlJztcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuL3Nob3BpZnktYXJ0aWNsZS1pdGVtLmNvbXBvbmVudC5odG1sJztcblxuZXhwb3J0IGNsYXNzIFNob3BpZnlBcnRpY2xlSXRlbUNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyB0YWdOYW1lOiBzdHJpbmcgPSAncnYtc2hvcGlmeS1hcnRpY2xlLWl0ZW0nO1xuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkZWJ1ZyA9IERlYnVnKCdjb21wb25lbnQ6JyArIFNob3BpZnlBcnRpY2xlSXRlbUNvbXBvbmVudC50YWdOYW1lKTtcblxuICBwcm90ZWN0ZWQgc2NvcGU6IGFueSA9IHtcbiAgfTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50PzogSFRNTEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICBjb25zdCAkZWwgPSAkKHRoaXMuZWwpO1xuICAgIHRoaXMuZGVidWcoJ2NvbnN0cnVjdG9yJywgdGhpcyk7XG4gICAgdGhpcy5pbml0KFNob3BpZnlBcnRpY2xlSXRlbUNvbXBvbmVudC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlcXVpcmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcm90ZWN0ZWQgdGVtcGxhdGUoKSB7XG4gICAgIC8vIE9ubHkgc2V0IHRoZSBjb21wb25lbnQgdGVtcGxhdGUgaWYgdGhlcmUgbm8gY2hpbGRzIGFscmVhZHlcbiAgICBpZiAodGhpcy5lbC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiXCI7IiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBKUXVlcnkgYXMgJCxcbiAgRGVidWcsXG4gIElCaW5kZXIsXG59IGZyb20gJ0ByaWJhanMvY29yZSc7XG5pbXBvcnQge1xuICBQamF4LFxufSBmcm9tICdAcmliYWpzL3JvdXRlcic7XG5pbXBvcnQge1xuICBTaG9waWZ5Q2FydFNlcnZpY2UsXG4gIElTaG9waWZ5Q2FydE9iamVjdCxcbn0gZnJvbSAnQHJpYmFqcy9zaG9waWZ5JztcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vc2hvcGlmeS1jYXJ0LWJ1dHRvbi5jb21wb25lbnQuaHRtbCc7XG5cbmludGVyZmFjZSBJU2NvcGUge1xuICBjYXJ0SXRlbUNvdW50OiBudW1iZXI7XG4gIHRvZ2dsZTogU2hvcGlmeUNhcnRCdXR0b25Db21wb25lbnRbJ3RvZ2dsZSddO1xuICBwZW5kaW5nOiBib29sZWFuO1xuICBzdGFydEFkZEFuaW1hdGlvbjogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFNob3BpZnlDYXJ0QnV0dG9uQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBwdWJsaWMgc3RhdGljIHRhZ05hbWU6IHN0cmluZyA9ICdydi1zaG9waWZ5LWNhcnQtYnV0dG9uJztcblxuICBwdWJsaWMgc3RhdGljIGNhcnRVcmw6IHN0cmluZyA9ICcvY2FydCc7XG5cbiAgc3RhdGljIGdldCBvYnNlcnZlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJvdGVjdGVkICRlbDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcblxuICBwcm90ZWN0ZWQgZGVidWcgPSBEZWJ1ZygnY29tcG9uZW50OicgKyBTaG9waWZ5Q2FydEJ1dHRvbkNvbXBvbmVudC50YWdOYW1lKTtcblxuICBwcm90ZWN0ZWQgc2NvcGU6IElTY29wZSA9IHtcbiAgICBjYXJ0SXRlbUNvdW50OiAwLFxuICAgIHRvZ2dsZTogdGhpcy50b2dnbGUsXG4gICAgcGVuZGluZzogZmFsc2UsXG4gICAgc3RhcnRBZGRBbmltYXRpb246IGZhbHNlLFxuICB9O1xuXG4gIHByb3RlY3RlZCBzZXQgY2FydChjYXJ0OiBJU2hvcGlmeUNhcnRPYmplY3QpIHtcbiAgICB0aGlzLnNjb3BlLmNhcnRJdGVtQ291bnQgPSBjYXJ0Lml0ZW1fY291bnQ7XG4gICAgdGhpcy5zY29wZS5zdGFydEFkZEFuaW1hdGlvbiA9IHRydWU7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNjb3BlLnN0YXJ0QWRkQW5pbWF0aW9uID0gZmFsc2U7XG4gICAgfSwgMzAwMCk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlbGVtZW50PzogSFRNTEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLiRlbCA9ICQodGhpcy5lbCk7XG4gICAgdGhpcy5kZWJ1ZygnY29uc3RydWN0b3InLCB0aGlzKTtcbiAgICB0aGlzLmluaXQoU2hvcGlmeUNhcnRCdXR0b25Db21wb25lbnQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGUoY29udGV4dDogSUJpbmRlcjxhbnk+LCBldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLmRlYnVnKCd0b2dnbGUnKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgaWYgKFV0aWxzLm9uUm91dGUoU2hvcGlmeUNhcnRCdXR0b25Db21wb25lbnQuY2FydFVybCkpIHtcbiAgICAgIHRoaXMuZGVidWcoJ2FscmVhZHkgb24gdGhpcyBzaXRlJyk7XG4gICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChTaG9waWZ5Q2FydEJ1dHRvbkNvbXBvbmVudC5jYXJ0VXJsKSB7XG4gICAgICAgIGNvbnN0IHBqYXggPSBQamF4LmdldEluc3RhbmNlKCdtYWluJyk7XG4gICAgICAgIHBqYXguZ29UbyhTaG9waWZ5Q2FydEJ1dHRvbkNvbXBvbmVudC5jYXJ0VXJsLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuXG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYmVmb3JlQmluZCgpIHtcbiAgICB0aGlzLmRlYnVnKCdiZWZvcmVCaW5kJyk7XG5cbiAgICBTaG9waWZ5Q2FydFNlcnZpY2Uuc2hvcGlmeUNhcnRFdmVudERpc3BhdGNoZXIub24oJ1Nob3BpZnlDYXJ0OnJlcXVlc3Q6c3RhcnQnLCAoKSA9PiB7XG4gICAgICB0aGlzLmRlYnVnKCdTaG9waWZ5Q2FydEJ1dHRvbjpyZXF1ZXN0OnN0YXJ0Jyk7XG4gICAgICB0aGlzLnNjb3BlLnBlbmRpbmcgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgU2hvcGlmeUNhcnRTZXJ2aWNlLnNob3BpZnlDYXJ0RXZlbnREaXNwYXRjaGVyLm9uKCdTaG9waWZ5Q2FydDpyZXF1ZXN0OmNvbXBsZXRlJywgKGNhcnQ6IElTaG9waWZ5Q2FydE9iamVjdCkgPT4ge1xuICAgICAgdGhpcy5kZWJ1ZygnU2hvcGlmeUNhcnRCdXR0b246cmVxdWVzdDpjb21wbGV0ZScsIGNhcnQpO1xuICAgICAgaWYgKGNhcnQpIHtcbiAgICAgICAgdGhpcy5jYXJ0ID0gY2FydDtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2NvcGUucGVuZGluZyA9IGZhbHNlO1xuICAgIH0pO1xuXG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYWZ0ZXJCaW5kKCkge1xuICAgIHRoaXMuZGVidWcoJ2FmdGVyQmluZCcsIHRoaXMuc2NvcGUpO1xuXG4gICAgcmV0dXJuIFNob3BpZnlDYXJ0U2VydmljZS5nZXQoKVxuICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICB0aGlzLmRlYnVnKGVycm9yKTtcbiAgICB9KTtcblxuICB9XG5cbiAgcHJvdGVjdGVkIHJlcXVpcmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcm90ZWN0ZWQgdGVtcGxhdGUoKSB7XG4gICAgIC8vIE9ubHkgc2V0IHRoZSBjb21wb25lbnQgdGVtcGxhdGUgaWYgdGhlcmUgbm8gY2hpbGRzIGFscmVhZHlcbiAgICBpZiAodGhpcy5lbC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiXCI7IiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBKUXVlcnkgYXMgJCxcbiAgRGVidWcsXG4gIElCaW5kZXIsXG59IGZyb20gJ0ByaWJhanMvY29yZSc7XG5pbXBvcnQge1xuICBTaG9waWZ5Q2FydFNlcnZpY2UsXG4gIElTaG9waWZ5Q2FydExpbmVJdGVtLFxuICBJU2hvcGlmeUNhcnRPYmplY3QsXG4gIElTaG9waWZ5Q3VzdG9tZXJBZGRyZXNzLFxuICBJU2hvcGlmeVNoaXBwaW5nUmF0ZXMsXG4gIElTaG9waWZ5U2hpcHBpbmdSYXRlc05vcm1hbGl6ZWQsXG59IGZyb20gJ0ByaWJhanMvc2hvcGlmeSc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9zaG9waWZ5LWNhcnQuY29tcG9uZW50Lmh0bWwnO1xuaW1wb3J0IHsgRHJvcGRvd25TZXJ2aWNlIH0gZnJvbSAnLi4vYnM0L2Ryb3Bkb3duL2Ryb3Bkb3duLnNlcnZpY2UnO1xuXG5pbnRlcmZhY2UgSVNjb3BlIHtcbiAgY2FydDogSVNob3BpZnlDYXJ0T2JqZWN0IHwgbnVsbDtcbiAgc2hpcHBpbmdBZGRyZXNzOiBJU2hvcGlmeUN1c3RvbWVyQWRkcmVzcyB8IG51bGw7XG4gIGVzdGltYXRlU2hpcHBpbmdSYXRlOiBib29sZWFuO1xuICBzaGlwcGluZ1JhdGVzOiBJU2hvcGlmeVNoaXBwaW5nUmF0ZXNOb3JtYWxpemVkO1xuICB0b2dnbGU6IFNob3BpZnlDYXJ0Q29tcG9uZW50Wyd0b2dnbGUnXTtcbiAgcmVtb3ZlOiBTaG9waWZ5Q2FydENvbXBvbmVudFsncmVtb3ZlQ2FydCddO1xuICBpbmNyZWFzZTogU2hvcGlmeUNhcnRDb21wb25lbnRbJ2luY3JlYXNlJ107XG4gIGRlY3JlYXNlOiBTaG9waWZ5Q2FydENvbXBvbmVudFsnZGVjcmVhc2UnXTtcbiAgY2xvc2VEcm9wZG93bnM6IFNob3BpZnlDYXJ0Q29tcG9uZW50WydjbG9zZURyb3Bkb3ducyddO1xuICBwZW5kaW5nOiBib29sZWFuO1xuICBzdGFydEFkZEFuaW1hdGlvbjogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFNob3BpZnlDYXJ0Q29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBwdWJsaWMgc3RhdGljIHRhZ05hbWU6IHN0cmluZyA9ICdydi1zaG9waWZ5LWNhcnQnO1xuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ3NoaXBwaW5nLWFkZHJlc3MnLCAnZXN0aW1hdGUtc2hpcHBpbmctcmF0ZSddO1xuICB9XG5cbiAgcHJvdGVjdGVkICRlbDogSlF1ZXJ5PEhUTUxFbGVtZW50PjtcblxuICBwcm90ZWN0ZWQgZGVidWcgPSBEZWJ1ZygnY29tcG9uZW50OicgKyBTaG9waWZ5Q2FydENvbXBvbmVudC50YWdOYW1lKTtcblxuICBwcm90ZWN0ZWQgZHJvcGRvd25TZXJ2aWNlOiBEcm9wZG93blNlcnZpY2U7XG5cbiAgcHJvdGVjdGVkIHNjb3BlOiBJU2NvcGUgPSB7XG4gICAgY2FydDogU2hvcGlmeUNhcnRTZXJ2aWNlLmNhcnQsXG4gICAgc2hpcHBpbmdBZGRyZXNzOiBudWxsLFxuICAgIGVzdGltYXRlU2hpcHBpbmdSYXRlOiBmYWxzZSxcbiAgICBzaGlwcGluZ1JhdGVzOiBbXSxcbiAgICB0b2dnbGU6IHRoaXMudG9nZ2xlLFxuICAgIHJlbW92ZTogdGhpcy5yZW1vdmVDYXJ0LFxuICAgIGluY3JlYXNlOiB0aGlzLmluY3JlYXNlLFxuICAgIGRlY3JlYXNlOiB0aGlzLmRlY3JlYXNlLFxuICAgIGNsb3NlRHJvcGRvd25zOiB0aGlzLmNsb3NlRHJvcGRvd25zLFxuICAgIHBlbmRpbmc6IGZhbHNlLFxuICAgIHN0YXJ0QWRkQW5pbWF0aW9uOiBmYWxzZSxcbiAgfTtcblxuICBwcm90ZWN0ZWQgc2V0IGNhcnQoY2FydDogYW55KSB7XG4gICAgLy8gVE9ETyBjaGVjayBpZiBjYXJ0IHZhbHVlcyBhcmUgY2hhbmdlZFxuICAgIHRoaXMuc2NvcGUuY2FydCA9IGNhcnQ7XG5cbiAgICB0aGlzLnNjb3BlLnN0YXJ0QWRkQW5pbWF0aW9uID0gdHJ1ZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2NvcGUuc3RhcnRBZGRBbmltYXRpb24gPSBmYWxzZTtcbiAgICB9LCAzMDAwKTtcblxuICAgIGlmICh0aGlzLnNjb3BlLnNoaXBwaW5nQWRkcmVzcyAmJiB0aGlzLnNjb3BlLmVzdGltYXRlU2hpcHBpbmdSYXRlKSB7XG4gICAgICBTaG9waWZ5Q2FydFNlcnZpY2UuZ2V0U2hpcHBpbmdSYXRlcyh0aGlzLnNjb3BlLnNoaXBwaW5nQWRkcmVzcywgdHJ1ZSwge1xuICAgICAgICB0cmlnZ2VyT25DaGFuZ2U6IGZhbHNlLFxuICAgICAgICB0cmlnZ2VyT25Db21wbGV0ZTogZmFsc2UsXG4gICAgICAgIHRyaWdnZXJPblN0YXJ0OiBmYWxzZSxcbiAgICAgIH0pXG4gICAgICAudGhlbigoc2hpcHBpbmdSYXRlczogSVNob3BpZnlTaGlwcGluZ1JhdGVzIHwgSVNob3BpZnlTaGlwcGluZ1JhdGVzTm9ybWFsaXplZCkgPT4ge1xuICAgICAgICB0aGlzLmRlYnVnKCdHZXQgc2hpcHBpbmcgcmF0ZScsIHNoaXBwaW5nUmF0ZXMpO1xuICAgICAgICB0aGlzLnNjb3BlLnNoaXBwaW5nUmF0ZXMgPSBzaGlwcGluZ1JhdGVzIGFzIElTaG9waWZ5U2hpcHBpbmdSYXRlc05vcm1hbGl6ZWQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlbGVtZW50PzogSFRNTEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLiRlbCA9ICQodGhpcy5lbCk7XG4gICAgdGhpcy5kcm9wZG93blNlcnZpY2UgPSBuZXcgRHJvcGRvd25TZXJ2aWNlKHRoaXMuJGVsLmZpbmQoJy5kcm9wZG93bi10b2dnbGUnKVswXSBhcyBIVE1MQnV0dG9uRWxlbWVudCk7XG4gICAgdGhpcy5kZWJ1ZygnY29uc3RydWN0b3InLCB0aGlzKTtcbiAgICB0aGlzLmluaXQoU2hvcGlmeUNhcnRDb21wb25lbnQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGUoY29udGV4dDogSUJpbmRlcjxhbnk+LCBldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLmRlYnVnKCd0b2dnbGUnKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHJldHVybiB0aGlzLmRyb3Bkb3duU2VydmljZS50b2dnbGUoKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVDYXJ0KGxpbmVJdGVtOiBJU2hvcGlmeUNhcnRMaW5lSXRlbSwgbGluZUluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmRlYnVnKCdyZW1vdmUnLCBsaW5lSXRlbSwgbGluZUluZGV4KTtcbiAgICBTaG9waWZ5Q2FydFNlcnZpY2UuY2hhbmdlKGxpbmVJdGVtLnZhcmlhbnRfaWQsIDApXG4gICAgLnRoZW4oKGNhcnQ6IElTaG9waWZ5Q2FydE9iamVjdCkgPT4ge1xuICAgICAgdGhpcy5kZWJ1ZygncmVtb3ZlZCcsIGNhcnQpO1xuICAgICAgdGhpcy5jYXJ0ID0gY2FydDtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpbmNyZWFzZShsaW5lSXRlbTogSVNob3BpZnlDYXJ0TGluZUl0ZW0sIGxpbmVJbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5kZWJ1ZygnaW5jcmVhc2UnLCBsaW5lSXRlbSwgbGluZUluZGV4KTtcbiAgICBsaW5lSXRlbS5xdWFudGl0eSsrO1xuICAgIFNob3BpZnlDYXJ0U2VydmljZS5jaGFuZ2UobGluZUl0ZW0udmFyaWFudF9pZCwgbGluZUl0ZW0ucXVhbnRpdHkpXG4gICAgLnRoZW4oKGNhcnQ6IElTaG9waWZ5Q2FydE9iamVjdCkgPT4ge1xuICAgICAgdGhpcy5kZWJ1ZygnaW5jcmVhc2VkJywgY2FydCk7XG4gICAgICAvLyB0aGlzLmNhcnQgPSBjYXJ0O1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGRlY3JlYXNlKGxpbmVJdGVtOiBJU2hvcGlmeUNhcnRMaW5lSXRlbSwgbGluZUluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLmRlYnVnKCdkZWNyZWFzZScsIGxpbmVJdGVtLCBsaW5lSW5kZXgpO1xuICAgIGxpbmVJdGVtLnF1YW50aXR5LS07XG4gICAgaWYgKGxpbmVJdGVtLnF1YW50aXR5IDwgMCkge1xuICAgICAgbGluZUl0ZW0ucXVhbnRpdHkgPSAwO1xuICAgIH1cbiAgICBTaG9waWZ5Q2FydFNlcnZpY2UuY2hhbmdlKGxpbmVJdGVtLnZhcmlhbnRfaWQsIGxpbmVJdGVtLnF1YW50aXR5KVxuICAgIC50aGVuKChjYXJ0OiBJU2hvcGlmeUNhcnRPYmplY3QpID0+IHtcbiAgICAgIHRoaXMuZGVidWcoJ2RlY3JlYXNlZCcsIGNhcnQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGNsb3NlRHJvcGRvd25zKCkge1xuICAgIHRoaXMuZGVidWcoJ2Nsb3NlRHJvcGRvd25zJyk7XG4gICAgRHJvcGRvd25TZXJ2aWNlLmNsb3NlQWxsKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYmVmb3JlQmluZCgpIHtcbiAgICB0aGlzLmRlYnVnKCdiZWZvcmVCaW5kJyk7XG5cbiAgICBTaG9waWZ5Q2FydFNlcnZpY2Uuc2hvcGlmeUNhcnRFdmVudERpc3BhdGNoZXIub24oJ1Nob3BpZnlDYXJ0OnJlcXVlc3Q6c3RhcnQnLCAoKSA9PiB7XG4gICAgICB0aGlzLmRlYnVnKCdTaG9waWZ5Q2FydDpyZXF1ZXN0OnN0YXJ0Jyk7XG4gICAgICB0aGlzLnNjb3BlLnBlbmRpbmcgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgU2hvcGlmeUNhcnRTZXJ2aWNlLnNob3BpZnlDYXJ0RXZlbnREaXNwYXRjaGVyLm9uKCdTaG9waWZ5Q2FydDpyZXF1ZXN0OmNvbXBsZXRlJywgKGNhcnQ6IElTaG9waWZ5Q2FydE9iamVjdCkgPT4ge1xuICAgICAgdGhpcy5kZWJ1ZygnU2hvcGlmeUNhcnQ6cmVxdWVzdDpjb21wbGV0ZScsIGNhcnQpO1xuICAgICAgaWYgKGNhcnQpIHtcbiAgICAgICAgdGhpcy5jYXJ0ID0gY2FydDtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2NvcGUucGVuZGluZyA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGFmdGVyQmluZCgpIHtcbiAgICB0aGlzLmRlYnVnKCdhZnRlckJpbmQnLCB0aGlzLnNjb3BlKTtcblxuICAgIHJldHVybiBTaG9waWZ5Q2FydFNlcnZpY2UuZ2V0KClcbiAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVxdWlyZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByb3RlY3RlZCB0ZW1wbGF0ZSgpIHtcbiAgICAgLy8gT25seSBzZXQgdGhlIGNvbXBvbmVudCB0ZW1wbGF0ZSBpZiB0aGVyZSBubyBjaGlsZHMgYWxyZWFkeVxuICAgIGlmICh0aGlzLmVsLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gXCJcIjsiLCJpbXBvcnQgeyBDb21wb25lbnQsIERlYnVnLCBKUXVlcnkgYXMgJCwgSUJpbmRlciB9IGZyb20gJ0ByaWJhanMvY29yZSc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9zaG9waWZ5LWNvbW1lbnRzLWZvcm0uY29tcG9uZW50Lmh0bWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uUnVsZSB7XG4gIHJlcXVpcmVkOiBib29sZWFuO1xuICBtaW5sZW5ndGg/OiBudW1iZXI7XG4gIG1heGxlbmd0aD86IG51bWJlcjtcbiAgbWF4PzogbnVtYmVyO1xuICBtaW4/OiBudW1iZXI7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGlzRW1haWw/OiBib29sZWFuO1xuICBpc1Bob25lPzogYm9vbGVhbjtcbiAgb25seU51bWJlcnM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uT2JqZWN0IHtcbiAgdmFsaWQ6IGJvb2xlYW47XG4gIHJ1bGVzPzoge1xuICAgIFtrZXk6IHN0cmluZ106IElWYWxpZGF0aW9uUnVsZTtcbiAgfTtcbn1cblxuaW50ZXJmYWNlIElTY29wZSB7XG4gIGZvcm06IHtcbiAgICBjdXN0b21lcjoge1xuICAgICAgZW1haWw6IHN0cmluZztcbiAgICAgIHBhc3N3b3JkOiBzdHJpbmc7XG4gICAgfTtcbiAgfTtcbiAgbG9naW5DdXN0b21lcjoge1xuICAgIHZhbGlkYXRpb246IElWYWxpZGF0aW9uT2JqZWN0O1xuICB9O1xuICBjcmVhdGVDdXN0b21lcjoge1xuICAgIHZhbGlkYXRpb246IElWYWxpZGF0aW9uT2JqZWN0O1xuICB9O1xuICByZWNvdmVyQ3VzdG9tZXI6IHtcbiAgICB2YWxpZGF0aW9uOiBJVmFsaWRhdGlvbk9iamVjdDtcbiAgfTtcbiAgcG9zdDogU2hvcGlmeUNvbW1lbnRzRm9ybUNvbXBvbmVudFsncG9zdCddO1xufVxuXG5leHBvcnQgY2xhc3MgU2hvcGlmeUNvbW1lbnRzRm9ybUNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyB0YWdOYW1lOiBzdHJpbmcgPSAncnYtc2hvcGlmeS1jb21tZW50cy1mb3JtJztcblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBwcm90ZWN0ZWQgJGVsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xuXG4gIHByb3RlY3RlZCAkbmV3Q29tbWVudEZvcm06IEpRdWVyeTxIVE1MRm9ybUVsZW1lbnQ+IHwgbnVsbCA9IG51bGw7XG5cbiAgcHJvdGVjdGVkIGRlYnVnID0gRGVidWcoJ2NvbXBvbmVudDonICsgU2hvcGlmeUNvbW1lbnRzRm9ybUNvbXBvbmVudC50YWdOYW1lKTtcblxuICBwcm90ZWN0ZWQgc2NvcGU6IElTY29wZSA9IHtcbiAgICBmb3JtOiB7XG4gICAgICBjdXN0b21lcjoge1xuICAgICAgICBlbWFpbDogJycsXG4gICAgICAgIHBhc3N3b3JkOiAnJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBsb2dpbkN1c3RvbWVyOiB7XG4gICAgICB2YWxpZGF0aW9uOiB7XG4gICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjcmVhdGVDdXN0b21lcjoge1xuICAgICAgdmFsaWRhdGlvbjoge1xuICAgICAgICB2YWxpZDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVjb3ZlckN1c3RvbWVyOiB7XG4gICAgICB2YWxpZGF0aW9uOiB7XG4gICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBwb3N0OiB0aGlzLnBvc3QsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudD86IEhUTUxFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy4kZWwgPSAkKHRoaXMuZWwpO1xuICAgIHRoaXMuZGVidWcoJ2NvbnN0cnVjdG9yJywgdGhpcyk7XG4gICAgdGhpcy5pbml0KFNob3BpZnlDb21tZW50c0Zvcm1Db21wb25lbnQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQb3N0IGNvbW1lbnRcbiAgICovXG4gIHB1YmxpYyBwb3N0KGNvbnRleHQ6IElCaW5kZXI8YW55PiwgZXZlbnQ6IEV2ZW50KSB7XG4gICAgdGhpcy5kZWJ1ZygncG9zdCcsIHRoaXMuc2NvcGUuZm9ybSk7XG5cbiAgICBpZiAoIXRoaXMuJG5ld0NvbW1lbnRGb3JtKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdObyBjb21tZW50IGZvcm0gZm91bmQnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBzdG9wIG5hdGl2ZSBzdWJtaXRcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy52YWxpZGF0ZSh0aGlzLiRuZXdDb21tZW50Rm9ybSwgdGhpcy5zY29wZS5sb2dpbkN1c3RvbWVyLnZhbGlkYXRpb24pO1xuXG4gICAgaWYgKHRoaXMuc2NvcGUubG9naW5DdXN0b21lci52YWxpZGF0aW9uLnZhbGlkKSB7XG4gICAgICB0aGlzLiRuZXdDb21tZW50Rm9ybS5zdWJtaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWJ1ZygnZm9ybSBub3QgdmFsaWQnLCB0aGlzLnNjb3BlLmZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBpbml0VmFsaWRhdGlvbigpIHtcbiAgICB0aGlzLiRuZXdDb21tZW50Rm9ybSA9IHRoaXMuJGVsLmZpbmQoJyNjb21tZW50X2Zvcm0nKSAgYXMgSlF1ZXJ5PEhUTUxGb3JtRWxlbWVudD47XG4gICAgdGhpcy4kbmV3Q29tbWVudEZvcm0uYXR0cignbm92YWxpZGF0ZScsICcnKTtcbiAgICB0aGlzLiRuZXdDb21tZW50Rm9ybS5hZGRDbGFzcygnbmVlZHMtdmFsaWRhdGlvbicpO1xuICAgIHRoaXMuZGVidWcoJ2luaXRWYWxpZGF0aW9uJywgdGhpcy4kbmV3Q29tbWVudEZvcm0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHZhbGlkYXRlKCRmb3JtOiBKUXVlcnk8SFRNTEZvcm1FbGVtZW50PiwgdmFsaWRhdGlvblNjb3BlOiBJVmFsaWRhdGlvbk9iamVjdCkge1xuICAgICRmb3JtLmVhY2goKGluZGV4OiBudW1iZXIsIGZvcm1FbCkgPT4ge1xuICAgICAgdmFsaWRhdGlvblNjb3BlLnZhbGlkID0gZm9ybUVsLmNoZWNrVmFsaWRpdHkoKTtcbiAgICB9KTtcbiAgICAkZm9ybS5hZGRDbGFzcygnd2FzLXZhbGlkYXRlZCcpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGJlZm9yZUJpbmQoKSB7XG4gICAgdGhpcy5kZWJ1ZygnYmVmb3JlQmluZCcpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGFmdGVyQmluZCgpIHtcbiAgICB0aGlzLmRlYnVnKCdhZnRlckJpbmQnLCB0aGlzLnNjb3BlKTtcbiAgICB0aGlzLmluaXRWYWxpZGF0aW9uKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVxdWlyZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByb3RlY3RlZCB0ZW1wbGF0ZSgpIHtcbiAgICAgLy8gT25seSBzZXQgdGhlIGNvbXBvbmVudCB0ZW1wbGF0ZSBpZiB0aGVyZSBubyBjaGlsZHMgYWxyZWFkeVxuICAgIGlmICh0aGlzLmVsLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gXCJcIjsiLCJpbXBvcnQgeyBDb21wb25lbnQsIERlYnVnLCBKUXVlcnkgYXMgJCB9IGZyb20gJ0ByaWJhanMvY29yZSc7XG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi9zaG9waWZ5LWZpbHRlci5jb21wb25lbnQuaHRtbCc7XG5cbmludGVyZmFjZSBJU2NvcGUge1xuICBsaW5rbGlzdDogYW55O1xuICBzaG93OiBhbnk7XG4gIGNvbGxlY3Rpb25Vcmw/OiBzdHJpbmc7XG4gIG5hbWVzcGFjZT86IHN0cmluZztcbiAgdHlwZTogYW55O1xuICBzdG9yaWVzRmlsdGVyQnk6IGFueTtcbiAgZmlsdGVyPzogYW55O1xuICBzY3JvbGxUbzogYW55O1xufVxuXG4vKipcbiAqIHNob3BpZnktZmlsdGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBTaG9waWZ5RmlsdGVyQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBwdWJsaWMgc3RhdGljIHRhZ05hbWU6IHN0cmluZyA9ICdzaG9waWZ5LWZpbHRlcic7XG5cbiAgcHJvdGVjdGVkIGRlYnVnID0gRGVidWcoJ2NvbXBvbmVudDonICsgU2hvcGlmeUZpbHRlckNvbXBvbmVudC50YWdOYW1lKTtcblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydjb2xsZWN0aW9uLXVybCcsICduYW1lc3BhY2UnLCAnbGlua2xpc3QnLCAndGVtcGxhdGUnLCAnZmlsdGVyJ107XG4gIH1cblxuICBwcm90ZWN0ZWQgc2NvcGU6IElTY29wZSA9IHtcbiAgICBsaW5rbGlzdDogd2luZG93Lm1vZGVsLnN5c3RlbS5saW5rbGlzdHMuZmlsdGVyLFxuICAgIHNob3c6IHRoaXMuc2hvdyxcbiAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgY29sbGVjdGlvblVybDogdW5kZWZpbmVkLFxuICAgIHN0b3JpZXNGaWx0ZXJCeTogdGhpcy5zdG9yaWVzRmlsdGVyQnksXG4gICAgc2Nyb2xsVG86IHRoaXMuc2Nyb2xsVG8sXG4gIH07XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudD86IEhUTUxFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5kZWJ1ZygnY29uc3RydWN0b3InLCB0aGlzKTtcbiAgICB0aGlzLmluaXQoU2hvcGlmeUZpbHRlckNvbXBvbmVudC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgcHVibGljIHNob3coZmlsdGVySGFuZGxlOiBzdHJpbmcsIG5hbWVzcGFjZTogc3RyaW5nLCBzaG9waWZ5VGVtcGxhdGU6IGFueSwgY29sbGVjdGlvblVybD86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHRoaXMuZGVidWcoJ3Nob3cnLCBmaWx0ZXJIYW5kbGUsIG5hbWVzcGFjZSwgc2hvcGlmeVRlbXBsYXRlKTtcbiAgICBzd2l0Y2ggKGZpbHRlckhhbmRsZSkge1xuICAgICAgY2FzZSAnc3Rvcmllcyc6XG4gICAgICAgIC8vIHJldHVybiBuYW1lc3BhY2UgPT09ICdibG9nJyB8fCBzaG9waWZ5VGVtcGxhdGUudGVtcGxhdGUgPT09ICdhcnRpY2xlJzsgLy8gVE9ETyBpZiB0aGUgdXNlciBpcyBvbiBhIGFydGljZSBhbmQgd2FudHMgdG8gZ28gYmFjayB0byB0aGUgbGlzdCB2aWV3IHdlIG5lZWQgZG8gZG8gc29tZSBhZGRpdGlvbmFsIHdvcmtcbiAgICAgICAgcmV0dXJuIG5hbWVzcGFjZSA9PT0gJ2Jsb2cnO1xuICAgICAgY2FzZSAnYWNjb3VudCc6XG4gICAgICAgIHJldHVybiBuYW1lc3BhY2UgPT09ICdjYXJ0JyB8fCBzaG9waWZ5VGVtcGxhdGUuZGlyZWN0b3J5ID09PSAnY3VzdG9tZXJzJyB8fCBzaG9waWZ5VGVtcGxhdGUudGVtcGxhdGUgPT09ICdwYWdlLnJldHVybnMtZm9ybScgfHwgc2hvcGlmeVRlbXBsYXRlLnRlbXBsYXRlID09PSAncGFnZS5wcml2YWN5LXNldHRpbmdzJztcbiAgICAgIGNhc2UgJ2xlZ2FsLWFyZWEnOlxuICAgICAgICByZXR1cm4gc2hvcGlmeVRlbXBsYXRlLnRlbXBsYXRlID09PSAncGFnZS5sZWdhbHMnO1xuICAgICAgY2FzZSAnc3RvcmUnOlxuICAgICAgICByZXR1cm4gc2hvcGlmeVRlbXBsYXRlLnRlbXBsYXRlID09PSAnY29sbGVjdGlvbicgfHwgc2hvcGlmeVRlbXBsYXRlLnRlbXBsYXRlID09PSAncHJvZHVjdCc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgdHlwZShmaWx0ZXJIYW5kbGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdGhpcy5kZWJ1ZygndHlwZScsIGZpbHRlckhhbmRsZSk7XG4gICAgc3dpdGNoIChmaWx0ZXJIYW5kbGUpIHtcbiAgICAgIGNhc2UgJ3N0b3JpZXMnOlxuICAgICAgICByZXR1cm4gJ3N0b3JpZXMtZmlsdGVyJztcbiAgICAgIGNhc2UgJ2xlZ2FsLWFyZWEnOlxuICAgICAgICByZXR1cm4gJ3Njcm9sbHNweSc7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gJ3JvdXRlcyc7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHNjcm9sbFRvKHNlbGVjdG9yOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRlYnVnKCdzY3JvbGxUbycsIHNlbGVjdG9yKTtcbiAgICBjb25zdCBvZmZzZXQgPSAkKHNlbGVjdG9yKS5vZmZzZXQoKTtcbiAgICBpZiAoIW9mZnNldCkge1xuICAgICAgY29uc29sZS53YXJuKGBFbGVtZW50IHdpdGggc2VsZWN0b3IgJHtzZWxlY3Rvcn0gbm90IGZvdW5kYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgc2Nyb2xsVG9wOiBvZmZzZXQudG9wLFxuICAgICAgc2Nyb2xsTGVmdDogb2Zmc2V0LmxlZnQsXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc3Rvcmllc0ZpbHRlckJ5KGhhbmRsZTogc3RyaW5nLCB0YWdOYW1lOiBzdHJpbmcsIF86IGFueSwgZXZlbnQ/OiBFdmVudCwgc2NvcGU/OiBhbnksIGVsPzogSFRNTExhYmVsRWxlbWVudCkge1xuICAgIHRhZ05hbWUgPSB0YWdOYW1lLnJlcGxhY2UoJyMnLCAnJyk7XG5cbiAgICBjb25zdCBzZWxmID0gdGhpcztcblxuICAgIC8vIFdPUktBUk9VTkQgYmVjYXVzZSBJIGNhbid0IGNoZWNrIHRoZSBtaWRkbGUgcmFkaW8gYnV0dG9uICh3dC4uPyEpXG4gICAgaWYgKGVsICYmIGVsLnBhcmVudE5vZGUpIHtcbiAgICAgY29uc3QgcmFkaW9FbGVtZW50ID0gKGVsLnBhcmVudE5vZGUuY2hpbGROb2Rlc1sxXSBhcyBIVE1MSW5wdXRFbGVtZW50KTtcbiAgICAgcmFkaW9FbGVtZW50LmNoZWNrZWQgPSB0cnVlO1xuXG4gICAgIHRoaXMuZGVidWcoJ2NoZWNrZWQnLCByYWRpb0VsZW1lbnQpO1xuICAgIH1cblxuICAgIHRoaXMuc2NvcGUuZmlsdGVyW2hhbmRsZV0gPSB0YWdOYW1lO1xuXG4gICAgLy8gVE9ETyB0aGlzIGFzIGJpbmRlcj9cbiAgICAkKCcuanVtcGxpbmstYXJ0aWNsZS1saXN0LWl0ZW0nKS5lYWNoKChpOiBudW1iZXIsIGN1ckVsOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgJGxpc3RJdGVtID0gJChjdXJFbCk7XG4gICAgICBpZiAodGFnTmFtZSA9PT0gJ2FsbCcpIHtcbiAgICAgICAgJGxpc3RJdGVtLnJlbW92ZUF0dHIoJ2hpZGRlbicpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGEgPSAkbGlzdEl0ZW0uZGF0YSgpO1xuICAgICAgaWYgKHRoaXMuaW5kZXhPZklnbm9yZUNhc2UoZGF0YS50YWdzLCB0YWdOYW1lKSA8PSAtMSkge1xuICAgICAgICBzZWxmLmRlYnVnKCdoaWRlJywgJGxpc3RJdGVtKTtcbiAgICAgICAgLy8gJGxpc3RJdGVtLmhpZGUoKTtcbiAgICAgICAgJGxpc3RJdGVtLmF0dHIoJ2hpZGRlbicsICdoaWRkZW4nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuZGVidWcoJ3Nob3cnLCAkbGlzdEl0ZW0pO1xuICAgICAgICAvLyAkbGlzdEl0ZW0uc2hvdygpO1xuICAgICAgICAkbGlzdEl0ZW0ucmVtb3ZlQXR0cignaGlkZGVuJyk7XG4gICAgICB9XG4gICAgICBzZWxmLmRlYnVnKCdqdW1wbGluay1hcnRpY2xlLWxpc3QtaXRlbScsIGRhdGEsICRsaXN0SXRlbSk7XG4gICAgfSk7XG5cbiAgICAvLyB0byBkYXRhIGJpbmRpbmcgZm9yIGZpbHRlclxuICAgIHRoaXMucHVibGlzaCgnZmlsdGVyJywgdGhpcy5zY29wZS5maWx0ZXIsIG51bGwpO1xuXG4gICAgdGhpcy5kZWJ1ZygnZmlsdGVyQnknLCBoYW5kbGUsIHRhZ05hbWUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHJlcXVpcmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWyduYW1lc3BhY2UnLCAndGVtcGxhdGUnLCAnZmlsdGVyJ107XG4gIH1cblxuICBwcm90ZWN0ZWQgcGFyc2VkQXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKGF0dHJpYnV0ZU5hbWU6IHN0cmluZywgb2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSwgbmFtZXNwYWNlOiBzdHJpbmcgfCBudWxsKSB7XG4gICAgdGhpcy5kZWJ1ZygncGFyc2VkQXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrJywgYXR0cmlidXRlTmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBuYW1lc3BhY2UpO1xuICAgIGlmIChhdHRyaWJ1dGVOYW1lID09PSAnZmlsdGVyJykge1xuICAgICAgaWYgKG5ld1ZhbHVlKSB7XG4gICAgICAgIGZvciAoY29uc3QgaGFuZGxlIGluIG5ld1ZhbHVlKSB7XG5cbiAgICAgICAgICBpZiAobmV3VmFsdWUuaGFzT3duUHJvcGVydHkoaGFuZGxlKSkge1xuICAgICAgICAgICAgY29uc3QgdGFnTmFtZSA9IG5ld1ZhbHVlW2hhbmRsZV07XG4gICAgICAgICAgICB0aGlzLnN0b3JpZXNGaWx0ZXJCeShoYW5kbGUsIHRhZ05hbWUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBsYWJlbFtmb3I9XCIke3RhZ05hbWV9XCJdYClbMF0gYXMgSFRNTExhYmVsRWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYWZ0ZXJCaW5kKCkge1xuICAgIHRoaXMuZGVidWcoJ2FmdGVyQmluZCcsIHRoaXMuc2NvcGUpO1xuICAgIGlmICh0aGlzLnNjb3BlLmZpbHRlcikge1xuICAgICAgZm9yIChjb25zdCBoYW5kbGUgaW4gdGhpcy5zY29wZS5maWx0ZXIpIHtcblxuICAgICAgICBpZiAodGhpcy5zY29wZS5maWx0ZXIuaGFzT3duUHJvcGVydHkoaGFuZGxlKSkge1xuICAgICAgICAgIGNvbnN0IHRhZ05hbWUgPSB0aGlzLnNjb3BlLmZpbHRlcltoYW5kbGVdO1xuICAgICAgICAgIHRoaXMuc3Rvcmllc0ZpbHRlckJ5KGhhbmRsZSwgdGFnTmFtZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYGxhYmVsW2Zvcj1cIiR7dGFnTmFtZX1cIl1gKVswXSBhcyBIVE1MTGFiZWxFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCB0ZW1wbGF0ZSgpIHtcbiAgICAvLyBPbmx5IHNldCB0aGUgY29tcG9uZW50IHRlbXBsYXRlIGlmIHRoZXJlIG5vIGNoaWxkcyBhbHJlYWR5XG4gICAgaWYgKHRoaXMuZWwuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaW5kZXhPZklnbm9yZUNhc2UoYXJyOiBzdHJpbmdbXSwgdmFsdWU6IHN0cmluZykge1xuICAgIHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICBsZXQgaW5kZXggPSAtMTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc3RyID0gYXJyW2ldO1xuICAgICAgaWYgKHN0ci50b0xvd2VyQ2FzZSgpID09PSB2YWx1ZSkge1xuICAgICAgICBpbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPG5hdiBjbGFzcz1uYXYgcnYtYWRkLWNsYXNzPWxpbmtsaXN0LmhhbmRsZSBydi1jbGFzcy1uYXYtcGlsbHM9cGlsbHMgcnYtY2xhc3MtZmxleC1jb2x1bW49dmVydGljYWwgcnYtY2xhc3MtZmxleC1yb3c9XFxcInZlcnRpY2FsIHwgbm90XFxcIj4gPGRpdiBjbGFzcz1cXFwibmF2LWl0ZW0gbmF2LWl0ZW0tbGV2ZWwtMVxcXCIgcnYtZWFjaC1saW5rPWxpbmtsaXN0LmxpbmtzIHJ2LXJvdXRlLWNsYXNzLWFjdGl2ZT1saW5rLnVybD4gPGEgcnYtaWY9XFxcImxpbmsuY29sbGFwc2VhYmxlIHwgbm90XFxcIiBjbGFzcz1uYXYtbGluayBydi1wYXJlbnQtcm91dGUtY2xhc3MtYWN0aXZlPWxpbmsudXJsIHJ2LXJvdXRlPWxpbmsudXJsIHJ2LWhyZWY9bGluay51cmw+IDxzcGFuIHJ2LWkxOG4tdGV4dD1cXFwibGluay50aXRsZSB8IGhhbmRsZWl6ZSB8IHByZXBlbmQgJ21lbnVzLidcXFwiPntsaW5rLnRpdGxlfTwvc3Bhbj4gPC9hPiA8YnV0dG9uIHJ2LWlmPWxpbmsuY29sbGFwc2VhYmxlIGNsYXNzPVxcXCJidG4gbmF2LWxpbmtcXFwiIHJ2LW9uLWNsaWNrPVxcXCJ0b2dnbGUgfCBhcmdzIGxpbmtcXFwiPiA8c3BhbiBydi1pMThuLXRleHQ9XFxcImxpbmsudGl0bGUgfCBoYW5kbGVpemUgfCBwcmVwZW5kICdtZW51cy4nXFxcIj57bGluay50aXRsZX08L3NwYW4+IDwvYnV0dG9uPiA8ZGl2IGNsYXNzPVxcXCJuYXYtaXRlbSBuYXYtaXRlbS1sZXZlbC0yXFxcIiBydi1oaWRlPWxpbmsuY29sbGFwc2VkIHJ2LWVhY2gtc3VibGluaz1saW5rLmxpbmtzIHJ2LXJvdXRlLWNsYXNzLWFjdGl2ZT1zdWJsaW5rLnVybD4gPGEgY2xhc3M9bmF2LWxpbmsgcnYtcm91dGUtY2xhc3MtYWN0aXZlPXN1YmxpbmsudXJsIHJ2LXJvdXRlPXN1YmxpbmsudXJsIHJ2LWhyZWY9c3VibGluay51cmw+IDxzcGFuIHJ2LWkxOG4tdGV4dD1cXFwic3VibGluay50aXRsZSB8IGhhbmRsZWl6ZSB8IHByZXBlbmQgJ21lbnVzLidcXFwiPntzdWJsaW5rLnRpdGxlfTwvc3Bhbj4gPC9hPiA8ZGl2IGNsYXNzPVxcXCJuYXYtaXRlbSBuYXYtaXRlbS1sZXZlbC0zXFxcIiBydi1lYWNoLXN1YnN1Ymxpbms9c3VibGluay5saW5rcyBydi1yb3V0ZS1jbGFzcy1hY3RpdmU9c3Vic3VibGluay51cmw+IDxhIGNsYXNzPW5hdi1saW5rIHJ2LXJvdXRlLWNsYXNzLWFjdGl2ZT1zdWJzdWJsaW5rLnVybCBydi1yb3V0ZT1zdWJzdWJsaW5rLnVybCBydi1ocmVmPXN1YnN1YmxpbmsudXJsPiA8c3BhbiBydi1pMThuLXRleHQ9XFxcInN1YnN1YmxpbmsudGl0bGUgfCBoYW5kbGVpemUgfCBwcmVwZW5kICdtZW51cy4nXFxcIj57c3Vic3VibGluay50aXRsZX08L3NwYW4+IDwvYT4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPC9uYXY+IFwiOyIsImltcG9ydCB7IENvbXBvbmVudCwgRGVidWcgfSBmcm9tICdAcmliYWpzL2NvcmUnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vc2hvcGlmeS1saW5rbGlzdC5jb21wb25lbnQuaHRtbCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlua2xpc3RMaW5rIHtcbiAgYWN0aXZlOiBib29sZWFuO1xuICBjaGlsZF9hY3RpdmU6IGJvb2xlYW47XG4gIGhhbmRsZTogc3RyaW5nO1xuICBsZXZlbDogbnVtYmVyO1xuICBsZXZlbHM6IG51bWJlcjtcbiAgbGlua3M6IExpbmtsaXN0TGlua1tdO1xuICB0aXRsZTogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xuXG4gIC8vIGN1c3RvbVxuICBjb2xsYXBzZWFibGU/OiBib29sZWFuO1xuICBjb2xsYXBzZWQ/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIExpbmtsaXN0IHtcbiAgaGFuZGxlOiBzdHJpbmc7XG4gIGlkOiBzdHJpbmcgfCBudWxsO1xuICBsZXZlbHM6IG51bWJlcjtcbiAgbGlua3M6IExpbmtsaXN0TGlua1tdO1xuICB0aXRsZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNjb3BlIHtcbiAgbGlua2xpc3Q/OiBMaW5rbGlzdDtcbiAgdG9nZ2xlOiBTaG9waWZ5TGlua2xpc3RDb21wb25lbnRbJ3RvZ2dsZSddO1xufVxuXG4vKipcbiAqIHNob3BpZnktZmlsdGVyXG4gKi9cbmV4cG9ydCBjbGFzcyBTaG9waWZ5TGlua2xpc3RDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHB1YmxpYyBzdGF0aWMgdGFnTmFtZTogc3RyaW5nID0gJ3Nob3BpZnktbGlua2xpc3QnO1xuXG4gIHByb3RlY3RlZCBkZWJ1ZyA9IERlYnVnKCdjb21wb25lbnQ6JyArIFNob3BpZnlMaW5rbGlzdENvbXBvbmVudC50YWdOYW1lKTtcblxuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWyduYW1lJywgJ2xpbmtsaXN0JywgJ3BpbGxzJywgJ3ZlcnRpY2FsJ107XG4gIH1cblxuICBwcm90ZWN0ZWQgc2NvcGU6IFNjb3BlID0ge1xuICAgIHRvZ2dsZTogdGhpcy50b2dnbGUsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudD86IEhUTUxFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5pbml0KFNob3BpZnlMaW5rbGlzdENvbXBvbmVudC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZShsaW5rOiBMaW5rbGlzdExpbmspIHtcbiAgICB0aGlzLmRlYnVnKCd0b2dnbGUnLCBsaW5rKTtcbiAgICBsaW5rLmNvbGxhcHNlZCA9ICFsaW5rLmNvbGxhcHNlZDtcbiAgfVxuXG4gIHB1YmxpYyBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZTogc3RyaW5nLCBvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55LCBuYW1lc3BhY2U6IHN0cmluZyB8IG51bGwpIHtcbiAgICAvLyBpbmplY3RzIHRoZSBjaGFuZ2VkIGF0dHJpYnV0ZXMgdG8gc2NvcGVcbiAgICBzdXBlci5hdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2sobmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlLCBuYW1lc3BhY2UpO1xuXG4gICAgLy8gc2V0IGxpbmtsaXN0IGJ5IG5hbWVcbiAgICBpZiAobmFtZSA9PT0gJ25hbWUnKSB7XG4gICAgICB0aGlzLnNjb3BlLmxpbmtsaXN0ID0gd2luZG93Lm1vZGVsLnN5c3RlbS5saW5rbGlzdHNbbmV3VmFsdWVdO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBiZWZvcmVCaW5kKCk6IFByb21pc2U8YW55PiB7XG4gICAgc3VwZXIuYmVmb3JlQmluZCgpO1xuICAgIHRoaXMudHJhbnNmb3JtTGlua2xpc3QoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCB0cmFuc2Zvcm1MaW5rbGlzdCgpIHtcbiAgICB0aGlzLmRlYnVnKCdjdXJyZW50IGxpbmtsaXN0JywgdGhpcy5zY29wZS5saW5rbGlzdCk7XG4gICAgaWYgKHRoaXMuc2NvcGUubGlua2xpc3QpIHtcbiAgICAgIGZvciAoY29uc3QgbGluayBvZiB0aGlzLnNjb3BlLmxpbmtsaXN0LmxpbmtzKSB7XG4gICAgICAgIGlmIChsaW5rLnVybCA9PT0gJyNjb2xsYXBzZScpIHtcbiAgICAgICAgICBsaW5rLmNvbGxhcHNlYWJsZSA9IHRydWU7XG4gICAgICAgICAgbGluay5jb2xsYXBzZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpbmsuY29sbGFwc2VhYmxlID0gZmFsc2U7XG4gICAgICAgICAgbGluay5jb2xsYXBzZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHJlcXVpcmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydsaW5rbGlzdCddO1xuICB9XG5cbiAgLyoqXG4gICAqIE9ubHkgc2V0IHRoZSBjb21wb25lbnQgdGVtcGxhdGUgaWYgdGhlcmUgbm8gY2hpbGRzIGFscmVhZHlcbiAgICovXG4gIHByb3RlY3RlZCB0ZW1wbGF0ZSgpIHtcbiAgICBpZiAodGhpcy5lbC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiXCI7IiwiaW1wb3J0IHsgQ29tcG9uZW50LCBEZWJ1ZywgSlF1ZXJ5IGFzICQgfSBmcm9tICdAcmliYWpzL2NvcmUnO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vc2hvcGlmeS1sb2dpbi1mb3JtLmNvbXBvbmVudC5odG1sJztcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvVXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uUnVsZSB7XG4gIHJlcXVpcmVkOiBib29sZWFuO1xuICBtaW5sZW5ndGg/OiBudW1iZXI7XG4gIG1heGxlbmd0aD86IG51bWJlcjtcbiAgbWF4PzogbnVtYmVyO1xuICBtaW4/OiBudW1iZXI7XG4gIGVycm9yOiBzdHJpbmc7XG4gIGlzRW1haWw/OiBib29sZWFuO1xuICBpc1Bob25lPzogYm9vbGVhbjtcbiAgb25seU51bWJlcnM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0aW9uT2JqZWN0IHtcbiAgdmFsaWQ6IGJvb2xlYW47XG4gIHJ1bGVzPzoge1xuICAgIFtrZXk6IHN0cmluZ106IElWYWxpZGF0aW9uUnVsZTtcbiAgfTtcbn1cblxuaW50ZXJmYWNlIElTY29wZSB7XG4gIGZvcm06IHtcbiAgICBjdXN0b21lcjoge1xuICAgICAgZW1haWw6IHN0cmluZztcbiAgICAgIHBhc3N3b3JkOiBzdHJpbmc7XG4gICAgfTtcbiAgfTtcbiAgbG9naW5DdXN0b21lcjoge1xuICAgIHZhbGlkYXRpb246IElWYWxpZGF0aW9uT2JqZWN0O1xuICB9O1xuICBjcmVhdGVDdXN0b21lcjoge1xuICAgIHZhbGlkYXRpb246IElWYWxpZGF0aW9uT2JqZWN0O1xuICB9O1xuICByZWNvdmVyQ3VzdG9tZXI6IHtcbiAgICB2YWxpZGF0aW9uOiBJVmFsaWRhdGlvbk9iamVjdDtcbiAgfTtcbiAgbG9naW46IFNob3BpZnlMb2dpbkZvcm1Db21wb25lbnRbJ2xvZ2luJ107XG4gIGNyZWF0ZTogU2hvcGlmeUxvZ2luRm9ybUNvbXBvbmVudFsnY3JlYXRlJ107XG4gIHJlY292ZXI6IFNob3BpZnlMb2dpbkZvcm1Db21wb25lbnRbJ3JlY292ZXInXTtcbiAgcmVjb3ZlckJhY2s6IFNob3BpZnlMb2dpbkZvcm1Db21wb25lbnRbJ3JlY292ZXJCYWNrJ107XG59XG5cbmV4cG9ydCBjbGFzcyBTaG9waWZ5TG9naW5Gb3JtQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBwdWJsaWMgc3RhdGljIHRhZ05hbWU6IHN0cmluZyA9ICdydi1zaG9waWZ5LWxvZ2luLWZvcm0nO1xuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHByb3RlY3RlZCAkZWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XG5cbiAgcHJvdGVjdGVkICRsb2dpbkN1c3RvbWVyRm9ybTogSlF1ZXJ5PEhUTUxGb3JtRWxlbWVudD4gfCBudWxsID0gbnVsbDtcbiAgcHJvdGVjdGVkICRjcmVhdGVDdXN0b21lckZvcm06IEpRdWVyeTxIVE1MRm9ybUVsZW1lbnQ+IHwgbnVsbCA9IG51bGw7XG4gIHByb3RlY3RlZCAkcmVjb3ZlckN1c3RvbWVyRm9ybTogSlF1ZXJ5PEhUTUxGb3JtRWxlbWVudD4gfCBudWxsID0gbnVsbDtcblxuICBwcm90ZWN0ZWQgZGVidWcgPSBEZWJ1ZygnY29tcG9uZW50OicgKyBTaG9waWZ5TG9naW5Gb3JtQ29tcG9uZW50LnRhZ05hbWUpO1xuXG4gIHByb3RlY3RlZCBzY29wZTogSVNjb3BlID0ge1xuICAgIGZvcm06IHtcbiAgICAgIGN1c3RvbWVyOiB7XG4gICAgICAgIGVtYWlsOiAnJyxcbiAgICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGxvZ2luQ3VzdG9tZXI6IHtcbiAgICAgIHZhbGlkYXRpb246IHtcbiAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNyZWF0ZUN1c3RvbWVyOiB7XG4gICAgICB2YWxpZGF0aW9uOiB7XG4gICAgICAgIHZhbGlkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICByZWNvdmVyQ3VzdG9tZXI6IHtcbiAgICAgIHZhbGlkYXRpb246IHtcbiAgICAgICAgdmFsaWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGxvZ2luOiB0aGlzLmxvZ2luLFxuICAgIGNyZWF0ZTogdGhpcy5jcmVhdGUsXG4gICAgcmVjb3ZlcjogdGhpcy5yZWNvdmVyLFxuICAgIHJlY292ZXJCYWNrOiB0aGlzLnJlY292ZXJCYWNrLFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ/OiBIVE1MRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMuJGVsID0gJCh0aGlzLmVsKTtcbiAgICB0aGlzLmRlYnVnKCdjb25zdHJ1Y3RvcicsIHRoaXMpO1xuICAgIHRoaXMuaW5pdChTaG9waWZ5TG9naW5Gb3JtQ29tcG9uZW50Lm9ic2VydmVkQXR0cmlidXRlcyk7XG4gIH1cblxuICAvKipcbiAgICogTG9naW4gc3VibWl0IHVzaW5nIHRoZSBsb2dpbiBmb3JtXG4gICAqL1xuICBwdWJsaWMgbG9naW4oXzogYW55LCBldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLmRlYnVnKCdsb2dpbicsIHRoaXMuc2NvcGUuZm9ybSk7XG5cbiAgICBpZiAoIXRoaXMuJGxvZ2luQ3VzdG9tZXJGb3JtKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdObyBsb2dpbiBmb3JtIGZvdW5kJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gc3RvcCBuYXRpdmUgc3VibWl0XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMudmFsaWRhdGUodGhpcy4kbG9naW5DdXN0b21lckZvcm0sIHRoaXMuc2NvcGUubG9naW5DdXN0b21lci52YWxpZGF0aW9uKTtcblxuICAgIGlmICh0aGlzLnNjb3BlLmxvZ2luQ3VzdG9tZXIudmFsaWRhdGlvbi52YWxpZCkge1xuICAgICAgdGhpcy4kbG9naW5DdXN0b21lckZvcm0uc3VibWl0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVidWcoJ2Zvcm0gbm90IHZhbGlkJywgdGhpcy5zY29wZS5mb3JtKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIGFjY291bnQgc3VibWl0IHVzaW5nIHRoZSBsb2dpbiBmb3JtXG4gICAqL1xuICBwdWJsaWMgY3JlYXRlKF86IGFueSwgZXZlbnQ6IEV2ZW50KSB7XG4gICAgdGhpcy5kZWJ1ZygnY3JlYXRlJywgdGhpcy5zY29wZS5mb3JtKTtcblxuICAgIGlmICghdGhpcy4kY3JlYXRlQ3VzdG9tZXJGb3JtKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdObyBjcmVhdGUgZm9ybSBmb3VuZCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIHN0b3AgbmF0aXZlIHN1Ym1pdFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLnZhbGlkYXRlKHRoaXMuJGNyZWF0ZUN1c3RvbWVyRm9ybSwgdGhpcy5zY29wZS5jcmVhdGVDdXN0b21lci52YWxpZGF0aW9uKTtcblxuICAgIGlmICh0aGlzLnNjb3BlLmNyZWF0ZUN1c3RvbWVyLnZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgIHRoaXMuJGNyZWF0ZUN1c3RvbWVyRm9ybS5zdWJtaXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWJ1ZygnZm9ybSBub3QgdmFsaWQnLCB0aGlzLnNjb3BlLmZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCBwYXNzd29yZCBzdWJtaXQgdXNpbmcgdGhlIChoaWRkZW4pIHJlc2V0IGZvcm1cbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBwdWJsaWMgcmVjb3ZlcihfOiBhbnksIGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuZGVidWcoJ3JlY292ZXInLCB0aGlzLnNjb3BlLmZvcm0sIHRoaXMuJHJlY292ZXJDdXN0b21lckZvcm0pO1xuICAgIGlmICghdGhpcy4kcmVjb3ZlckN1c3RvbWVyRm9ybSkge1xuICAgICAgY29uc29sZS5lcnJvcignTm8gcmVjb3ZlciBmb3JtIGZvdW5kJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLiRsb2dpbkN1c3RvbWVyRm9ybSkge1xuICAgICAgY29uc29sZS5lcnJvcignTm8gbG9naW4gZm9ybSBmb3VuZCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIHN0b3AgbmF0aXZlIHN1Ym1pdFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLnZhbGlkYXRlKHRoaXMuJHJlY292ZXJDdXN0b21lckZvcm0sIHRoaXMuc2NvcGUucmVjb3ZlckN1c3RvbWVyLnZhbGlkYXRpb24pO1xuXG4gICAgaWYgKHRoaXMuc2NvcGUucmVjb3ZlckN1c3RvbWVyLnZhbGlkYXRpb24udmFsaWQpIHtcbiAgICAgIHRoaXMuJHJlY292ZXJDdXN0b21lckZvcm0uc3VibWl0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVidWcoJ2Zvcm0gbm90IHZhbGlkJywgdGhpcy5zY29wZS5mb3JtKTtcbiAgICAgIHRoaXMuJGxvZ2luQ3VzdG9tZXJGb3JtLnBhcmVudCgpLmF0dHIoJ2hpZGRlbicsICcnKS5oaWRlKCk7XG4gICAgICB0aGlzLiRyZWNvdmVyQ3VzdG9tZXJGb3JtLnBhcmVudCgpLnJlbW92ZUF0dHIoJ2hpZGRlbicpLnNob3coKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVjb3ZlckJhY2soXzogYW55LCBldmVudDogRXZlbnQpIHtcblxuICAgIGlmICghdGhpcy4kcmVjb3ZlckN1c3RvbWVyRm9ybSkge1xuICAgICAgY29uc29sZS5lcnJvcignTm8gcmVjb3ZlciBmb3JtIGZvdW5kJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLiRsb2dpbkN1c3RvbWVyRm9ybSkge1xuICAgICAgY29uc29sZS5lcnJvcignTm8gbG9naW4gZm9ybSBmb3VuZCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIHN0b3AgbmF0aXZlIHN1Ym1pdFxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLiRsb2dpbkN1c3RvbWVyRm9ybS5wYXJlbnQoKS5yZW1vdmVBdHRyKCdoaWRkZW4nKS5zaG93KCk7XG4gICAgdGhpcy4kcmVjb3ZlckN1c3RvbWVyRm9ybS5wYXJlbnQoKS5hdHRyKCdoaWRkZW4nLCAnJykuaGlkZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGluaXRWYWxpZGF0aW9uKCkge1xuICAgIHRoaXMuJGNyZWF0ZUN1c3RvbWVyRm9ybSA9IHRoaXMuJGVsLmZpbmQoJ2Zvcm1bYWN0aW9uPVwiL2FjY291bnRcIl0nKSBhcyBKUXVlcnk8SFRNTEZvcm1FbGVtZW50PjtcbiAgICB0aGlzLiRjcmVhdGVDdXN0b21lckZvcm0uYXR0cignbm92YWxpZGF0ZScsICcnKTtcbiAgICB0aGlzLiRjcmVhdGVDdXN0b21lckZvcm0uYWRkQ2xhc3MoJ25lZWRzLXZhbGlkYXRpb24nKTtcblxuICAgIHRoaXMuJGxvZ2luQ3VzdG9tZXJGb3JtID0gdGhpcy4kZWwuZmluZCgnZm9ybVthY3Rpb249XCIvYWNjb3VudC9sb2dpblwiXScpICBhcyBKUXVlcnk8SFRNTEZvcm1FbGVtZW50PjtcbiAgICB0aGlzLiRsb2dpbkN1c3RvbWVyRm9ybS5hdHRyKCdub3ZhbGlkYXRlJywgJycpO1xuICAgIHRoaXMuJGxvZ2luQ3VzdG9tZXJGb3JtLmFkZENsYXNzKCduZWVkcy12YWxpZGF0aW9uJyk7XG5cbiAgICB0aGlzLiRyZWNvdmVyQ3VzdG9tZXJGb3JtID0gdGhpcy4kZWwuZmluZCgnZm9ybVthY3Rpb249XCIvYWNjb3VudC9yZWNvdmVyXCJdJykgYXMgSlF1ZXJ5PEhUTUxGb3JtRWxlbWVudD47XG4gICAgdGhpcy4kcmVjb3ZlckN1c3RvbWVyRm9ybS5hdHRyKCdub3ZhbGlkYXRlJywgJycpO1xuICAgIHRoaXMuJHJlY292ZXJDdXN0b21lckZvcm0uYWRkQ2xhc3MoJ25lZWRzLXZhbGlkYXRpb24nKTtcblxuICAgIHRoaXMuZGVidWcoJ2luaXRWYWxpZGF0aW9uJywgdGhpcy4kY3JlYXRlQ3VzdG9tZXJGb3JtLCB0aGlzLiRsb2dpbkN1c3RvbWVyRm9ybSwgdGhpcy4kcmVjb3ZlckN1c3RvbWVyRm9ybSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdmFsaWRhdGUoJGZvcm06IEpRdWVyeTxIVE1MRm9ybUVsZW1lbnQ+LCB2YWxpZGF0aW9uU2NvcGU6IElWYWxpZGF0aW9uT2JqZWN0KSB7XG4gICAgJGZvcm0uZWFjaCgoaW5kZXg6IG51bWJlciwgZm9ybUVsKSA9PiB7XG4gICAgICB2YWxpZGF0aW9uU2NvcGUudmFsaWQgPSBmb3JtRWwuY2hlY2tWYWxpZGl0eSgpO1xuICAgIH0pO1xuICAgICRmb3JtLmFkZENsYXNzKCd3YXMtdmFsaWRhdGVkJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYmVmb3JlQmluZCgpIHtcbiAgICB0aGlzLmRlYnVnKCdiZWZvcmVCaW5kJyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYWZ0ZXJCaW5kKCkge1xuICAgIHRoaXMuZGVidWcoJ2FmdGVyQmluZCcsIHRoaXMuc2NvcGUpO1xuICAgIHRoaXMuaW5pdFZhbGlkYXRpb24oKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZXF1aXJlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJvdGVjdGVkIHRlbXBsYXRlKCkge1xuICAgICAvLyBPbmx5IHNldCB0aGUgY29tcG9uZW50IHRlbXBsYXRlIGlmIHRoZXJlIG5vIGNoaWxkcyBhbHJlYWR5XG4gICAgaWYgKHRoaXMuZWwuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcIlwiOyIsImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSUJpbmRlcixcbiAgRGVidWcsXG59IGZyb20gJ0ByaWJhanMvY29yZSc7XG5pbXBvcnQge1xuICBJU2hvcGlmeVByb2R1Y3RWYXJpYW50LFxuICBJU2hvcGlmeVByb2R1Y3QsXG4gIElTaG9waWZ5UHJvZHVjdFZhcmlhbnRPcHRpb24sXG4gIFNob3BpZnlDYXJ0U2VydmljZSxcbiAgU2hvcGlmeVByb2R1Y3RTZXJ2aWNlLFxufSBmcm9tICdAcmliYWpzL3Nob3BpZnknO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vc2hvcGlmeS1wcm9kdWN0LWl0ZW0uY29tcG9uZW50Lmh0bWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIElTY29wZSB7XG4gIGhhbmRsZTogc3RyaW5nIHwgbnVsbDtcbiAgcHJvZHVjdDogSVNob3BpZnlQcm9kdWN0ICB8IG51bGw7XG4gIHZhcmlhbnQ6IElTaG9waWZ5UHJvZHVjdFZhcmlhbnQgfCBudWxsO1xuICBxdWFudGl0eTogbnVtYmVyO1xuICBzaG93RGV0YWlsTWVudTogYm9vbGVhbjtcbiAgLy8gc2hvd0FkZFRvQ2FydEJ1dHRvbjogYm9vbGVhbjtcbiAgY2hvb3NlT3B0aW9uOiBTaG9waWZ5UHJvZHVjdEl0ZW1Db21wb25lbnRbJ2Nob29zZU9wdGlvbiddO1xuICBhZGRUb0NhcnQ6IFNob3BpZnlQcm9kdWN0SXRlbUNvbXBvbmVudFsnYWRkVG9DYXJ0J107XG4gIHRvZ2dsZURldGFpbE1lbnU6IFNob3BpZnlQcm9kdWN0SXRlbUNvbXBvbmVudFsndG9nZ2xlRGV0YWlsTWVudSddO1xuICBkZWNyZWFzZTogU2hvcGlmeVByb2R1Y3RJdGVtQ29tcG9uZW50WydkZWNyZWFzZSddO1xuICBpbmNyZWFzZTogU2hvcGlmeVByb2R1Y3RJdGVtQ29tcG9uZW50WydpbmNyZWFzZSddO1xuICAkcGFyZW50PzogYW55O1xuICBjb2xvck9wdGlvbjogSVNob3BpZnlQcm9kdWN0VmFyaWFudE9wdGlvbiB8IG51bGw7XG4gIHNpemVPcHRpb246IElTaG9waWZ5UHJvZHVjdFZhcmlhbnRPcHRpb24gfCBudWxsO1xuICBhdmFpbGFibGU6IGJvb2xlYW47XG59XG5cbi8qKlxuICogVE9ETyBtaW5pZnkgdGhpcywgY3JlYXRlIGEgZ2VuZXJhbCBwcm9kdWN0IHNlcnZpY2UgaW5zdGVhZCBvZiBleHRlbmQgZnJvbSBTaG9waWZ5UHJvZHVjdEl0ZW1Db21wb25lbnRcbiAqIG9yIGNyZWF0ZSBhIHByb2R1Y3QgbGlzdCBmb3IgYWxsIHByb2R1Y3RzXG4gKiBvciBqdXN0IGdldCB0aGUgYXR0cmlidXRlcyB3ZSBuZWVkIGxpa2UgdGhlIG9wdGlvbnNcbiAqIG9yIHJlbmRlciB0aGUgbW9zdCB3aXRoIGxpcXVpZFxuICovXG5leHBvcnQgY2xhc3MgU2hvcGlmeVByb2R1Y3RJdGVtQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IC8qU2hvcGlmeVByb2R1Y3RJdGVtQ29tcG9uZW50Ki8ge1xuXG4gIHB1YmxpYyBzdGF0aWMgdGFnTmFtZTogc3RyaW5nID0gJ3J2LXNob3BpZnktcHJvZHVjdC1pdGVtJztcblxuICBwcm90ZWN0ZWQgYXV0b2JpbmQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBoYW5kbGUgaXMgdGhlIHByb2R1Y3QgaGFuZGxlIHRvIGdldCB0aGUgcHJvZHVjdCBqc29uIG9iamVjdFxuICAgKiBleHRyYXMgYXJlIHByb2R1Y3QgZGF0YSB3aWNoIGlzIG9ubHkgYXZhaWFibGUgb3ZlciBsaXF1aWQgYW5kIG5vdCBvdmVyIHRoZSBwcm9kdWN0IGpzb24gb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydoYW5kbGUnLCAnZXh0cmFzJ107XG4gIH1cblxuICBwcm90ZWN0ZWQgZGVidWcgPSBEZWJ1ZygnY29tcG9uZW50OicgKyBTaG9waWZ5UHJvZHVjdEl0ZW1Db21wb25lbnQudGFnTmFtZSk7XG5cbiAgcHJvdGVjdGVkIHNjb3BlOiBJU2NvcGUgPSB7XG4gICAgaGFuZGxlOiBudWxsLFxuICAgIHByb2R1Y3Q6IG51bGwsXG4gICAgdmFyaWFudDogbnVsbCxcbiAgICBxdWFudGl0eTogMSxcbiAgICBzaG93RGV0YWlsTWVudTogZmFsc2UsXG4gICAgLy8gc2hvd0FkZFRvQ2FydEJ1dHRvbjogZmFsc2UsXG4gICAgY2hvb3NlT3B0aW9uOiB0aGlzLmNob29zZU9wdGlvbixcbiAgICBhZGRUb0NhcnQ6IHRoaXMuYWRkVG9DYXJ0LFxuICAgIHRvZ2dsZURldGFpbE1lbnU6IHRoaXMudG9nZ2xlRGV0YWlsTWVudSxcbiAgICBkZWNyZWFzZTogdGhpcy5kZWNyZWFzZSxcbiAgICBpbmNyZWFzZTogdGhpcy5pbmNyZWFzZSxcbiAgICBjb2xvck9wdGlvbjogbnVsbCxcbiAgICBzaXplT3B0aW9uOiBudWxsLFxuICAgIC8qKlxuICAgICAqIElmIHRoZSB2YXJpYW50IGlzIGF2YWlsYWJsZSwgdXNlZCB0byBkaXNhYmxlIHRoZSBhZGQgdG8gY2FydCBidXR0b25cbiAgICAgKi9cbiAgICBhdmFpbGFibGU6IGZhbHNlLFxuICB9O1xuXG4gIC8qKlxuICAgKiBBcnJheSB3aXRoIGFsbCBzZWxlY3RlZCBwcm9kdWN0IG9wdGlvbnNcbiAgICovXG4gIHByaXZhdGUgc2VsZWN0ZWRPcHRpb25zOiBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBJcyB0cnVlIGlmIHRoZSB1c2VyIGhhcyBjaG9vc2VkIGFuIG9wdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBvcHRpb25DaG9vc2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgLyoqXG4gICAqIGF2YWlsYWJsZSBpcyBvbmx5IHRydWUgaWYgdGhlIHZhcmlhbnQgaXMgYXZhaWxhYmxlIGFuZCB0aGUgdXNlciBoYXMgY2xpY2tlZCBvbiBhbiBvcHRpb25cbiAgICovXG4gIHByb3RlY3RlZCBzZXQgYXZhaWxhYmxlKGF2YWlsYWJsZTogYm9vbGVhbikge1xuICAgIHRoaXMuc2NvcGUuYXZhaWxhYmxlID0gKGF2YWlsYWJsZSAmJiB0aGlzLm9wdGlvbkNob29zZWQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldCBzaG93TWVudShzaG93OiBib29sZWFuKSB7XG4gICAgdGhpcy5zY29wZS5zaG93RGV0YWlsTWVudSA9IHNob3c7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IHNob3dNZW51KCkge1xuICAgIHJldHVybiB0aGlzLnNjb3BlLnNob3dEZXRhaWxNZW51O1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldCBwcm9kdWN0KHByb2R1Y3Q6IElTaG9waWZ5UHJvZHVjdCB8IG51bGwpIHtcbiAgICB0aGlzLmRlYnVnKCdzZXQgcHJvZHVjdCcsIHByb2R1Y3QpO1xuICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICB0aGlzLnNjb3BlLnByb2R1Y3QgPSBTaG9waWZ5UHJvZHVjdFNlcnZpY2UucHJlcGFpcihwcm9kdWN0KTtcblxuICAgICAgdGhpcy5zY29wZS5jb2xvck9wdGlvbiA9IFNob3BpZnlQcm9kdWN0U2VydmljZS5nZXRPcHRpb24odGhpcy5zY29wZS5wcm9kdWN0LCAnY29sb3InKTtcbiAgICAgIHRoaXMuc2NvcGUuc2l6ZU9wdGlvbiA9IFNob3BpZnlQcm9kdWN0U2VydmljZS5nZXRPcHRpb24odGhpcy5zY29wZS5wcm9kdWN0LCAnc2l6ZScpO1xuXG4gICAgICAvLyBzZXQgdGhlIGZpcnN0IHZhcmlhbnQgdG8gdGhlIHNlbGVjdGVkIG9uZVxuICAgICAgdGhpcy52YXJpYW50ID0gdGhpcy5zY29wZS5wcm9kdWN0ID8gdGhpcy5zY29wZS5wcm9kdWN0LnZhcmlhbnRzWzBdIDogbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IHByb2R1Y3QoKTogSVNob3BpZnlQcm9kdWN0IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuc2NvcGUucHJvZHVjdDtcbiAgfVxuXG4gIHByb3RlY3RlZCBzZXQgdmFyaWFudCh2YXJpYW50OiBJU2hvcGlmeVByb2R1Y3RWYXJpYW50IHwgbnVsbCkge1xuICAgIGlmICh2YXJpYW50ID09PSBudWxsKSB7XG4gICAgICB0aGlzLmRlYnVnKCdFcnJvcjogVmFyaWFudCBpc3QgbnVsbCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRlYnVnKCdzZXQgdmFyaWFudCcsIHZhcmlhbnQpO1xuICAgIHRoaXMuc2NvcGUudmFyaWFudCA9IHZhcmlhbnQ7XG4gICAgaWYgKHRoaXMuc2NvcGUudmFyaWFudCkge1xuICAgICAgdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSB0aGlzLnNjb3BlLnZhcmlhbnQub3B0aW9ucy5zbGljZSgpO1xuICAgICAgdGhpcy5kZWJ1Zygnc2V0IHNlbGVjdGVkT3B0aW9ucycsIHRoaXMuc2VsZWN0ZWRPcHRpb25zKTtcbiAgICAgIHRoaXMuYXZhaWxhYmxlID0gdGhpcy5zY29wZS52YXJpYW50LmF2YWlsYWJsZTtcbiAgICAgIHRoaXMuYWN0aXZhdGVPcHRpb25zKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldCB2YXJpYW50KCkge1xuICAgIHJldHVybiB0aGlzLnNjb3BlLnZhcmlhbnQ7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihlbGVtZW50PzogSFRNTEVsZW1lbnQpIHtcbiAgICBzdXBlcihlbGVtZW50KTtcbiAgICB0aGlzLmRlYnVnKCdjb25zdHJ1Y3RvcicsIHRoaXMpO1xuICAgIHRoaXMuaW5pdChTaG9waWZ5UHJvZHVjdEl0ZW1Db21wb25lbnQub2JzZXJ2ZWRBdHRyaWJ1dGVzKTtcbiAgICB0aGlzLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICB0aGlzLnNob3dNZW51ID0gZmFsc2U7XG4gICAgfSwgZmFsc2UpO1xuICB9XG5cbiAgcHVibGljIGNob29zZU9wdGlvbihvcHRpb25WYWx1ZTogc3RyaW5nIHwgbnVtYmVyLCBwb3NpdGlvbjE6IG51bWJlciwgb3B0aW9uTmFtZTogc3RyaW5nLCBjb250ZXh0OiBJQmluZGVyPGFueT4sIGV2ZW50OiBNb3VzZUV2ZW50LCBzY29wZTogYW55LCBlbDogSFRNTEVsZW1lbnQpIHtcbiAgICBvcHRpb25WYWx1ZSA9IG9wdGlvblZhbHVlLnRvU3RyaW5nKCk7XG5cbiAgICBpZiAoIXRoaXMuc2NvcGUucHJvZHVjdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9kdWN0IG5vdCBzZXQhJyk7XG4gICAgfVxuXG4gICAgLy8gdGhpcy5kZWJ1ZygnY2hvb3NlT3B0aW9uJywgJ1xcbm9wdGlvblZhbHVlJywgSlNPTi5zdHJpbmdpZnkob3B0aW9uVmFsdWUpLCAnXFxucG9zaXRpb24xJywgcG9zaXRpb24xLCAnXFxub3B0aW9uTmFtZScsIG9wdGlvbk5hbWUsICdcXG5jb250ZXh0JywgY29udGV4dCwgJ1xcbmV2ZW50JywgZXZlbnQsICdcXG5zY29wZScsIHNjb3BlLCAnXFxuZWwnLCBlbCApO1xuXG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbnNbKHBvc2l0aW9uMSAtIDEpXSA9IG9wdGlvblZhbHVlLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgdmFyaWFudCA9IFNob3BpZnlQcm9kdWN0U2VydmljZS5nZXRWYXJpYW50T2ZPcHRpb25zKHRoaXMuc2NvcGUucHJvZHVjdCwgdGhpcy5zZWxlY3RlZE9wdGlvbnMpO1xuICAgIGlmICh2YXJpYW50KSB7XG4gICAgICAvLyBPcHRpb24gY2hvb3NlZCBzbyBlbmFibGUgYWRkIHRvIGNhcnQgYnV0dG9uXG4gICAgICB0aGlzLm9wdGlvbkNob29zZWQgPSB0cnVlO1xuXG4gICAgICB0aGlzLnZhcmlhbnQgPSB2YXJpYW50IGFzIElTaG9waWZ5UHJvZHVjdFZhcmlhbnQ7XG4gICAgfVxuXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBwdWJsaWMgYWRkVG9DYXJ0KCkge1xuICAgIGlmICghdGhpcy52YXJpYW50KSB7XG4gICAgICB0aGlzLmRlYnVnKCdWYXJpYW50IG5vdCBzZWxlY3RlZCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmRlYnVnKCdhZGRUb0NhcnQnLCB0aGlzLnZhcmlhbnQuaWQsIHRoaXMuc2NvcGUucXVhbnRpdHkpO1xuICAgIFNob3BpZnlDYXJ0U2VydmljZS5hZGQodGhpcy52YXJpYW50LmlkLCB0aGlzLnNjb3BlLnF1YW50aXR5KVxuICAgIC50aGVuKChyZXNwb25zZTogYW55IC8qKiBUT0RPIG5vdCBhbnkgKi8pID0+IHtcbiAgICAgIHRoaXMuZGVidWcoJ2FkZFRvQ2FydCByZXNwb25zZScsIHJlc3BvbnNlKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICB0aGlzLmRlYnVnKCdhZGRUb0NhcnQgZXJyb3InLCBlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlRGV0YWlsTWVudSgpIHtcbiAgICB0aGlzLmRlYnVnKCd0b2dnbGVEZXRhaWxNZW51Jyk7XG4gICAgdGhpcy5zaG93TWVudSA9ICF0aGlzLnNob3dNZW51O1xuICB9XG5cbiAgcHVibGljIGluY3JlYXNlKCkge1xuICAgIHRoaXMuZGVidWcoJ2luY3JlYXNlJywgdGhpcy5zY29wZS5xdWFudGl0eSk7XG4gICAgdGhpcy5zY29wZS5xdWFudGl0eSsrO1xuICB9XG5cbiAgcHVibGljIGRlY3JlYXNlKCkge1xuICAgIHRoaXMuZGVidWcoJ2RlY3JlYXNlJywgdGhpcy5zY29wZS5xdWFudGl0eSk7XG4gICAgdGhpcy5zY29wZS5xdWFudGl0eS0tO1xuICAgIGlmICh0aGlzLnNjb3BlLnF1YW50aXR5IDw9IDApIHtcbiAgICAgIHRoaXMuc2NvcGUucXVhbnRpdHkgPSAxO1xuICAgIH1cbiAgfVxuXG4gIC8vIGRlY29uc3RydWN0b3JcbiAgcHJvdGVjdGVkIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCk7XG4gIH1cblxuICAvKipcbiAgICogV29ya2Fyb3VuZCBiZWNhdXNlIGBydi1jbGFzcy1hY3RpdmU9XCJpc09wdGlvbkFjdGl2ZSB8IGNhbGwgc2l6ZVwiYCBpcyBub3QgdXBkYXRpbmcgaWYgc2VsZWN0ZWRPcHRpb25zIGNoYW5nZXNcbiAgICogQHBhcmFtIG9wdGlvblZhbHVlXG4gICAqIEBwYXJhbSBvcHRpb25OYW1lXG4gICAqL1xuICBwcm90ZWN0ZWQgYWN0aXZhdGVPcHRpb24ob3B0aW9uVmFsdWU6IHN0cmluZywgb3B0aW9uTmFtZTogc3RyaW5nKSB7XG4gICAgb3B0aW9uVmFsdWUgPSBvcHRpb25WYWx1ZS50b1N0cmluZygpLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgdGhpcy5kZWJ1ZygnYWN0aXZhdGVPcHRpb24nLCBgLm9wdGlvbi0ke29wdGlvbk5hbWUudG9Mb3dlckNhc2UoKX0tJHtvcHRpb25WYWx1ZX1gKTtcbiAgICBjb25zdCBhbGxPcHRpb25zID0gdGhpcy5lbC5xdWVyeVNlbGVjdG9yQWxsKGAub3B0aW9uLSR7b3B0aW9uTmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpfWApO1xuICAgIGFsbE9wdGlvbnMuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgIH0pO1xuICAgIGNvbnN0IGFjdGl2ZU9wdGlvbnMgPSB0aGlzLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoYC5vcHRpb24tJHtvcHRpb25OYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCl9LSR7b3B0aW9uVmFsdWV9YCk7XG4gICAgYWN0aXZlT3B0aW9ucy5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQWN0aXZhdGUgb3B0aW9uIGJ5IHNlbGVjdGVkIG9wdGlvbnMgKHNjb3BlLnNlbGVjdGVkT3B0aW9ucylcbiAgICogVGhpcyBtZXRob2Qgc2V0cyB0aGUgYWN0aXZlIGNsYXNzIHRvIHRoZSBvcHRpb25zIGVsZW1lbnRzXG4gICAqL1xuICBwcm90ZWN0ZWQgYWN0aXZhdGVPcHRpb25zKCkge1xuICAgIGZvciAoY29uc3QgcG9zaXRpb24wIGluIHRoaXMuc2VsZWN0ZWRPcHRpb25zKSB7XG4gICAgICBpZiAodGhpcy5zZWxlY3RlZE9wdGlvbnNbcG9zaXRpb24wXSkge1xuICAgICAgICBjb25zdCBvcHRpb25WYWx1ZSA9IHRoaXMuc2VsZWN0ZWRPcHRpb25zW3Bvc2l0aW9uMF07XG4gICAgICAgIGlmICh0aGlzLnNjb3BlLnByb2R1Y3QpIHtcbiAgICAgICAgICB0aGlzLmRlYnVnKCdhY3RpdmF0ZU9wdGlvbnMnLCB0aGlzLnNjb3BlLnByb2R1Y3Qub3B0aW9uc1twb3NpdGlvbjBdKTtcbiAgICAgICAgICBjb25zdCBvcHRpb25OYW1lID0gdGhpcy5zY29wZS5wcm9kdWN0Lm9wdGlvbnNbcG9zaXRpb24wXS5uYW1lO1xuICAgICAgICAgIC8vIE9ubHkgYWN0aXZhdGUgc2l6ZSBpZiBpdCB3YXMgY2xpY2tlZCBieSB0aGUgdXNlclxuICAgICAgICAgIGlmIChvcHRpb25OYW1lID09PSAnc2l6ZScpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbkNob29zZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZU9wdGlvbihvcHRpb25WYWx1ZSwgb3B0aW9uTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVPcHRpb24ob3B0aW9uVmFsdWUsIG9wdGlvbk5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBiZWZvcmVCaW5kKCkge1xuICAgIHRoaXMuZGVidWcoJ2JlZm9yZUJpbmQnKTtcbiAgICBpZiAodGhpcy5zY29wZS5oYW5kbGUgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZHVjdCBoYW5kbGUgbm90IHNldCcpO1xuICAgIH1cbiAgICByZXR1cm4gU2hvcGlmeVByb2R1Y3RTZXJ2aWNlLmdldCh0aGlzLnNjb3BlLmhhbmRsZSlcbiAgICAudGhlbigocHJvZHVjdDogSVNob3BpZnlQcm9kdWN0KSA9PiB7XG4gICAgICB0aGlzLnByb2R1Y3QgPSBwcm9kdWN0O1xuICAgICAgcmV0dXJuIHByb2R1Y3Q7XG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYWZ0ZXJCaW5kKCkge1xuICAgIHRoaXMuZGVidWcoJ2FmdGVyQmluZCcsIHRoaXMuc2NvcGUpO1xuICAgIHRoaXMuYWN0aXZhdGVPcHRpb25zKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVxdWlyZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbJ2hhbmRsZSddO1xuICB9XG5cbiAgcHJvdGVjdGVkIHRlbXBsYXRlKCkge1xuICAgIC8vIE9ubHkgc2V0IHRoZSBjb21wb25lbnQgdGVtcGxhdGUgaWYgdGhlcmUgbm8gY2hpbGRzIGFscmVhZHlcbiAgIGlmICh0aGlzLmVsLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICByZXR1cm4gbnVsbDtcbiAgIH0gZWxzZSB7XG4gICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgIH1cbiB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiXCI7IiwiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBKUXVlcnkgYXMgJCxcbiAgRGVidWcsXG59IGZyb20gJ0ByaWJhanMvY29yZSc7XG5pbXBvcnQge1xuICBJU2hvcGlmeVByb2R1Y3RWYXJpYW50LFxuICBJU2hvcGlmeVByb2R1Y3QsXG4gIElTaG9waWZ5UHJvZHVjdFZhcmlhbnRPcHRpb24sXG4gIFNob3BpZnlDYXJ0U2VydmljZSxcbiAgU2hvcGlmeVByb2R1Y3RTZXJ2aWNlLFxufSBmcm9tICdAcmliYWpzL3Nob3BpZnknO1xuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4vc2hvcGlmeS1wcm9kdWN0LmNvbXBvbmVudC5odG1sJztcblxuY29uc3QgSU1BR0VTX1BFUl9ST1cgPSAyO1xuXG5leHBvcnQgaW50ZXJmYWNlIEltYWdlUm93IHtcbiAgY2xhc3M6IHN0cmluZztcbiAgaW1hZ2VzOiBzdHJpbmdbXTtcbiAgc2l6ZXM6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJUHJlcGFpcmVkUHJvZHVjdFZhcmlhbnQgZXh0ZW5kcyBJU2hvcGlmeVByb2R1Y3RWYXJpYW50IHtcbiAgaW1hZ2VzPzogc3RyaW5nW107XG4gIGltYWdlUm93cz86IEltYWdlUm93W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNjb3BlIHtcbiAgaGFuZGxlOiBzdHJpbmcgfCBudWxsO1xuICBwcm9kdWN0OiBJU2hvcGlmeVByb2R1Y3QgIHwgbnVsbDtcbiAgdmFyaWFudDogSVByZXBhaXJlZFByb2R1Y3RWYXJpYW50IHwgbnVsbDtcbiAgcXVhbnRpdHk6IG51bWJlcjtcbiAgc2hvd0RldGFpbE1lbnU6IGJvb2xlYW47XG4gIC8vIHNob3dBZGRUb0NhcnRCdXR0b246IGJvb2xlYW47XG4gIGNob29zZU9wdGlvbjogU2hvcGlmeVByb2R1Y3RDb21wb25lbnRbJ2Nob29zZU9wdGlvbiddO1xuICBhZGRUb0NhcnQ6IFNob3BpZnlQcm9kdWN0Q29tcG9uZW50WydhZGRUb0NhcnQnXTtcbiAgdG9nZ2xlRGV0YWlsTWVudTogU2hvcGlmeVByb2R1Y3RDb21wb25lbnRbJ3RvZ2dsZURldGFpbE1lbnUnXTtcbiAgZGVjcmVhc2U6IFNob3BpZnlQcm9kdWN0Q29tcG9uZW50WydkZWNyZWFzZSddO1xuICBpbmNyZWFzZTogU2hvcGlmeVByb2R1Y3RDb21wb25lbnRbJ2luY3JlYXNlJ107XG4gICRwYXJlbnQ/OiBhbnk7XG4gIC8qKlxuICAgKiBJZiB0aGUgdmFyaWFudCBpcyBhdmFpbGFibGUsIHVzZWQgdG8gZGlzYWJsZSB0aGUgYWRkIHRvIGNhcnQgYnV0dG9uXG4gICAqL1xuICBhdmFpbGFibGU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBjbGFzcyBTaG9waWZ5UHJvZHVjdENvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyB0YWdOYW1lOiBzdHJpbmcgPSAncnYtc2hvcGlmeS1wcm9kdWN0JztcblxuICBwcm90ZWN0ZWQgYXV0b2JpbmQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBoYW5kbGUgaXMgdGhlIHByb2R1Y3QgaGFuZGxlIHRvIGdldCB0aGUgcHJvZHVjdCBqc29uIG9iamVjdFxuICAgKiBleHRyYXMgYXJlIHByb2R1Y3QgZGF0YSB3aWNoIGlzIG9ubHkgYXZhaWFibGUgb3ZlciBsaXF1aWQgYW5kIG5vdCBvdmVyIHRoZSBwcm9kdWN0IGpzb24gb2JqZWN0XG4gICAqL1xuICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICByZXR1cm4gWydoYW5kbGUnLCAnZXh0cmFzJ107XG4gIH1cblxuICBwcm90ZWN0ZWQgJGVsOiBKUXVlcnk8SFRNTEVsZW1lbnQ+O1xuXG4gIHByb3RlY3RlZCBkZWJ1ZyA9IERlYnVnKCdjb21wb25lbnQ6JyArIFNob3BpZnlQcm9kdWN0Q29tcG9uZW50LnRhZ05hbWUpO1xuXG4gIHByb3RlY3RlZCBzY29wZTogSVNjb3BlID0ge1xuICAgIGhhbmRsZTogbnVsbCxcbiAgICBwcm9kdWN0OiBudWxsLFxuICAgIHZhcmlhbnQ6IG51bGwsXG4gICAgcXVhbnRpdHk6IDEsXG4gICAgc2hvd0RldGFpbE1lbnU6IGZhbHNlLFxuICAgIC8vIHNob3dBZGRUb0NhcnRCdXR0b246IGZhbHNlLFxuICAgIGNob29zZU9wdGlvbjogdGhpcy5jaG9vc2VPcHRpb24sXG4gICAgYWRkVG9DYXJ0OiB0aGlzLmFkZFRvQ2FydCxcbiAgICB0b2dnbGVEZXRhaWxNZW51OiB0aGlzLnRvZ2dsZURldGFpbE1lbnUsXG4gICAgZGVjcmVhc2U6IHRoaXMuZGVjcmVhc2UsXG4gICAgaW5jcmVhc2U6IHRoaXMuaW5jcmVhc2UsXG4gICAgLyoqXG4gICAgICogSWYgdGhlIHZhcmlhbnQgaXMgYXZhaWxhYmxlLCB1c2VkIHRvIGRpc2FibGUgdGhlIGFkZCB0byBjYXJ0IGJ1dHRvblxuICAgICAqL1xuICAgIGF2YWlsYWJsZTogZmFsc2UsXG4gIH07XG5cbiAgcHJpdmF0ZSBjb2xvck9wdGlvbjogSVNob3BpZnlQcm9kdWN0VmFyaWFudE9wdGlvbiB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgc2VsZWN0ZWRPcHRpb25zOiBzdHJpbmdbXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBJcyB0cnVlIGlmIHRoZSB1c2VyIGhhcyBjaG9vc2VkIGFuIG9wdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBvcHRpb25DaG9vc2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJvdGVjdGVkIHNldCBwcm9kdWN0KHByb2R1Y3Q6IElTaG9waWZ5UHJvZHVjdCB8IG51bGwpIHtcbiAgICB0aGlzLmRlYnVnKCdzZXQgcHJvZHVjdCcsIHByb2R1Y3QpO1xuICAgIGlmIChwcm9kdWN0KSB7XG4gICAgICB0aGlzLnNjb3BlLnByb2R1Y3QgPSBTaG9waWZ5UHJvZHVjdFNlcnZpY2UucHJlcGFpcihwcm9kdWN0KTtcblxuICAgICAgLy8gdGhpcy5zZWxlY3RlZE9wdGlvbnMgPSBuZXcgQXJyYXkodGhpcy5zY29wZS5wcm9kdWN0Lm9wdGlvbnMubGVuZ3RoKTtcblxuICAgICAgdGhpcy5jb2xvck9wdGlvbiA9IFNob3BpZnlQcm9kdWN0U2VydmljZS5nZXRPcHRpb24odGhpcy5zY29wZS5wcm9kdWN0LCAnY29sb3InKTtcbiAgICAgIC8vIHNldCB0aGUgZmlyc3QgdmFyaWFudCB0byB0aGUgc2VsZWN0ZWQgb25lXG4gICAgICB0aGlzLnZhcmlhbnQgPSB0aGlzLnNjb3BlLnByb2R1Y3QgPyB0aGlzLnNjb3BlLnByb2R1Y3QudmFyaWFudHNbMF0gOiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgcHJvZHVjdCgpOiBJU2hvcGlmeVByb2R1Y3QgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5zY29wZS5wcm9kdWN0O1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldCB2YXJpYW50KHZhcmlhbnQ6IElTaG9waWZ5UHJvZHVjdFZhcmlhbnQgfCBudWxsKSB7XG4gICAgaWYgKHZhcmlhbnQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuZGVidWcoJ0Vycm9yOiBWYXJpYW50IGlzdCBudWxsJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGVidWcoJ3NldCB2YXJpYW50JywgdmFyaWFudCk7XG4gICAgdGhpcy5zY29wZS52YXJpYW50ID0gdGhpcy5wcmVwYWlyVmFyaWFudCh2YXJpYW50KTtcbiAgICBpZiAodGhpcy5zY29wZS52YXJpYW50KSB7XG4gICAgICB0aGlzLnNlbGVjdGVkT3B0aW9ucyA9IHRoaXMuc2NvcGUudmFyaWFudC5vcHRpb25zLnNsaWNlKCk7XG4gICAgICB0aGlzLmRlYnVnKCdzZXQgc2VsZWN0ZWRPcHRpb25zJywgdGhpcy5zZWxlY3RlZE9wdGlvbnMpO1xuICAgICAgdGhpcy5hdmFpbGFibGUgPSB0aGlzLnNjb3BlLnZhcmlhbnQuYXZhaWxhYmxlO1xuICAgICAgdGhpcy5hY3RpdmF0ZU9wdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IHZhcmlhbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2NvcGUudmFyaWFudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBhdmFpbGFibGUgaXMgb25seSB0cnVlIGlmIHRoZSB2YXJpYW50IGlzIGF2YWlsYWJsZSBhbmQgdGhlIHVzZXIgaGFzIGNsaWNrZWQgb24gYW4gb3B0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgc2V0IGF2YWlsYWJsZShhdmFpbGFibGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnNjb3BlLmF2YWlsYWJsZSA9IChhdmFpbGFibGUgJiYgdGhpcy5vcHRpb25DaG9vc2VkKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQ/OiBIVE1MRWxlbWVudCkge1xuICAgIHN1cGVyKGVsZW1lbnQpO1xuICAgIHRoaXMuJGVsID0gJCh0aGlzLmVsKTtcbiAgICB0aGlzLmRlYnVnKCdjb25zdHJ1Y3RvcicsIHRoaXMpO1xuICAgIHRoaXMuaW5pdChTaG9waWZ5UHJvZHVjdENvbXBvbmVudC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgcHVibGljIGNob29zZU9wdGlvbihvcHRpb25WYWx1ZTogc3RyaW5nIHwgbnVtYmVyLCBwb3NpdGlvbjE6IG51bWJlciwgb3B0aW9uTmFtZTogc3RyaW5nLCBfOiBhbnksIGV2ZW50OiBNb3VzZUV2ZW50LCBzY29wZTogYW55LCBlbDogSFRNTEVsZW1lbnQpIHtcbiAgICBpZiAoIXRoaXMuc2NvcGUucHJvZHVjdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9kdWN0IG5vdCBzZXQhJyk7XG4gICAgfVxuXG4gICAgb3B0aW9uVmFsdWUgPSBvcHRpb25WYWx1ZS50b1N0cmluZygpO1xuXG4gICAgdGhpcy5zZWxlY3RlZE9wdGlvbnNbKHBvc2l0aW9uMSAtIDEpXSA9IG9wdGlvblZhbHVlLnRvU3RyaW5nKCk7XG5cbiAgICBjb25zdCB2YXJpYW50ID0gU2hvcGlmeVByb2R1Y3RTZXJ2aWNlLmdldFZhcmlhbnRPZk9wdGlvbnModGhpcy5zY29wZS5wcm9kdWN0LCB0aGlzLnNlbGVjdGVkT3B0aW9ucyk7XG5cbiAgICB0aGlzLmRlYnVnKCdjaG9vc2VPcHRpb24nLCBvcHRpb25WYWx1ZSwgJ3Bvc2l0aW9uMScsIHBvc2l0aW9uMSwgJ3NlbGVjdGVkT3B0aW9ucycsIHRoaXMuc2VsZWN0ZWRPcHRpb25zLCAndmFyaWFudCcsIHZhcmlhbnQpO1xuXG4gICAgaWYgKHZhcmlhbnQpIHtcbiAgICAgIC8vIE9wdGlvbiBjaG9vc2VkIHNvIGVuYWJsZSBhZGQgdG8gY2FydCBidXR0b25cbiAgICAgIHRoaXMub3B0aW9uQ2hvb3NlZCA9IHRydWU7XG5cbiAgICAgIHRoaXMudmFyaWFudCA9IHZhcmlhbnQgYXMgSVNob3BpZnlQcm9kdWN0VmFyaWFudDtcbiAgICB9XG5cbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRUb0NhcnQoKSB7XG4gICAgaWYgKCF0aGlzLnZhcmlhbnQpIHtcbiAgICAgIHRoaXMuZGVidWcoJ1ZhcmlhbnQgbm90IHNlbGVjdGVkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGVidWcoJ2FkZFRvQ2FydCcsIHRoaXMudmFyaWFudC5pZCwgdGhpcy5zY29wZS5xdWFudGl0eSk7XG4gICAgU2hvcGlmeUNhcnRTZXJ2aWNlLmFkZCh0aGlzLnZhcmlhbnQuaWQsIHRoaXMuc2NvcGUucXVhbnRpdHkpXG4gICAgLnRoZW4oKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgICAgIHRoaXMuZGVidWcoJ2FkZFRvQ2FydCByZXNwb25zZScsIHJlc3BvbnNlKTtcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICB0aGlzLmRlYnVnKCdhZGRUb0NhcnQgZXJyb3InLCBlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlRGV0YWlsTWVudSgpIHtcbiAgICB0aGlzLmRlYnVnKCd0b2dnbGVEZXRhaWxNZW51Jyk7XG4gICAgdGhpcy5zY29wZS5zaG93RGV0YWlsTWVudSA9ICF0aGlzLnNjb3BlLnNob3dEZXRhaWxNZW51O1xuICB9XG5cbiAgcHVibGljIGluY3JlYXNlKCkge1xuICAgIHRoaXMuZGVidWcoJ2luY3JlYXNlJywgdGhpcy5zY29wZS5xdWFudGl0eSk7XG4gICAgdGhpcy5zY29wZS5xdWFudGl0eSsrO1xuICB9XG5cbiAgcHVibGljIGRlY3JlYXNlKCkge1xuICAgIHRoaXMuZGVidWcoJ2RlY3JlYXNlJywgdGhpcy5zY29wZS5xdWFudGl0eSk7XG4gICAgdGhpcy5zY29wZS5xdWFudGl0eS0tO1xuICAgIGlmICh0aGlzLnNjb3BlLnF1YW50aXR5IDw9IDApIHtcbiAgICAgIHRoaXMuc2NvcGUucXVhbnRpdHkgPSAxO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBXb3JrYXJvdW5kIGJlY2F1c2UgYHJ2LWNsYXNzLWFjdGl2ZT1cImlzT3B0aW9uQWN0aXZlIHwgY2FsbCBzaXplXCJgIGlzIG5vdCB1cGRhdGluZyBpZiBzZWxlY3RlZE9wdGlvbnMgY2hhbmdlc1xuICAgKiBAcGFyYW0gb3B0aW9uVmFsdWVcbiAgICogQHBhcmFtIG9wdGlvbk5hbWVcbiAgICovXG4gIHByb3RlY3RlZCBhY3RpdmF0ZU9wdGlvbihvcHRpb25WYWx1ZTogc3RyaW5nLCBvcHRpb25OYW1lOiBzdHJpbmcpIHtcbiAgICBvcHRpb25WYWx1ZSA9IG9wdGlvblZhbHVlLnRvU3RyaW5nKCkucmVwbGFjZSgnIycsICcnKTtcbiAgICB0aGlzLmRlYnVnKCdhY3RpdmF0ZU9wdGlvbicsIGAub3B0aW9uLSR7b3B0aW9uTmFtZS50b0xvd2VyQ2FzZSgpfS0ke29wdGlvblZhbHVlfWApO1xuICAgIHRoaXMuJGVsLmZpbmQoYC5vcHRpb24tJHtvcHRpb25OYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCl9YCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHRoaXMuJGVsLmZpbmQoYC5vcHRpb24tJHtvcHRpb25OYW1lLnRvTG9jYWxlTG93ZXJDYXNlKCl9LSR7b3B0aW9uVmFsdWV9YCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFjdGl2YXRlIG9wdGlvbiBieSBzZWxlY3RlZCBvcHRpb25zIChzY29wZS5zZWxlY3RlZE9wdGlvbnMpXG4gICAqIFRoaXMgbWV0aG9kIHNldHMgdGhlIGFjdGl2ZSBjbGFzcyB0byB0aGUgb3B0aW9ucyBlbGVtZW50c1xuICAgKi9cbiAgcHJvdGVjdGVkIGFjdGl2YXRlT3B0aW9ucygpIHtcbiAgICBmb3IgKGNvbnN0IHBvc2l0aW9uMCBpbiB0aGlzLnNlbGVjdGVkT3B0aW9ucykge1xuICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRPcHRpb25zW3Bvc2l0aW9uMF0pIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uVmFsdWUgPSB0aGlzLnNlbGVjdGVkT3B0aW9uc1twb3NpdGlvbjBdO1xuICAgICAgICBpZiAodGhpcy5zY29wZS5wcm9kdWN0KSB7XG4gICAgICAgICAgdGhpcy5kZWJ1ZygnYWN0aXZhdGVPcHRpb25zJywgdGhpcy5zY29wZS5wcm9kdWN0Lm9wdGlvbnNbcG9zaXRpb24wXSk7XG4gICAgICAgICAgY29uc3Qgb3B0aW9uTmFtZSA9IHRoaXMuc2NvcGUucHJvZHVjdC5vcHRpb25zW3Bvc2l0aW9uMF0ubmFtZTtcbiAgICAgICAgICAvLyBPbmx5IGFjdGl2YXRlIHNpemUgaWYgaXQgd2FzIGNsaWNrZWQgYnkgdGhlIHVzZXJcbiAgICAgICAgICBpZiAob3B0aW9uTmFtZSA9PT0gJ3NpemUnKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25DaG9vc2VkKSB7XG4gICAgICAgICAgICAgIHRoaXMuYWN0aXZhdGVPcHRpb24ob3B0aW9uVmFsdWUsIG9wdGlvbk5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2YXRlT3B0aW9uKG9wdGlvblZhbHVlLCBvcHRpb25OYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgYmVmb3JlQmluZCgpIHtcbiAgICB0aGlzLmRlYnVnKCdiZWZvcmVCaW5kJyk7XG4gICAgaWYgKHRoaXMuc2NvcGUuaGFuZGxlID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Byb2R1Y3QgaGFuZGxlIG5vdCBzZXQnKTtcbiAgICB9XG4gICAgcmV0dXJuIFNob3BpZnlQcm9kdWN0U2VydmljZS5nZXQodGhpcy5zY29wZS5oYW5kbGUpXG4gICAgLnRoZW4oKHByb2R1Y3Q6IElTaG9waWZ5UHJvZHVjdCkgPT4ge1xuICAgICAgdGhpcy5wcm9kdWN0ID0gcHJvZHVjdDtcbiAgICB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBhZnRlckJpbmQoKSB7XG4gICAgdGhpcy5kZWJ1ZygnYWZ0ZXJCaW5kJywgdGhpcy5zY29wZSk7XG4gICAgdGhpcy5hY3RpdmF0ZU9wdGlvbnMoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZXF1aXJlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFsnaGFuZGxlJ107XG4gIH1cblxuICBwcm90ZWN0ZWQgdGVtcGxhdGUoKSB7XG4gICAgIC8vIE9ubHkgc2V0IHRoZSBjb21wb25lbnQgdGVtcGxhdGUgaWYgdGhlcmUgbm8gY2hpbGRzIGFscmVhZHlcbiAgICBpZiAodGhpcy5lbC5oYXNDaGlsZE5vZGVzKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIGN1c3RvbSB2ZXJzaW9uIG9mIGltYWdlcy5pbmRleE9mIGJ1dCBjb21wYXJlcyB3aXRob3V0IHByb3RvY29sIGFuZCBxdWVyeSBzdHJpbiBpbiB1cmxcbiAgICogQHBhcmFtIGltYWdlc1xuICAgKiBAcGFyYW0gZmluZEltYWdlXG4gICAqL1xuICBwcml2YXRlIGluZGV4T2ZVcmwoaW1hZ2VzOiBzdHJpbmdbXSwgZmluZEltYWdlOiBzdHJpbmcpIHtcbiAgICBsZXQgaW5kZXggPSAtMTtcbiAgICBjb25zdCBjbGVhckZpbmRJbWFnZSA9IGZpbmRJbWFnZVxuICAgIC5zcGxpdCgnPycpWzBdIC8vIHJlbW92ZSBxdWVyeSBzdHJpbmdcbiAgICAucmVwbGFjZSgvKF5cXHcrOnxeKVxcL1xcLy8sICcvLycpOyAvLyByZW1vdmUgcHJvdG9jb2xcbiAgICBpbWFnZXMuZm9yRWFjaCgoaW1hZ2UsIGkpID0+IHtcbiAgICAgIGNvbnN0IGNsZWFySW1hZ2UgPSBpbWFnZVxuICAgICAgLnNwbGl0KCc/JylbMF0gLy8gcmVtb3ZlIHF1ZXJ5IHN0cmluZ1xuICAgICAgLnJlcGxhY2UoLyheXFx3Kzp8XilcXC9cXC8vLCAnLy8nKTsgLy8gcmVtb3ZlIHByb3RvY29sXG4gICAgICBpZiAoY2xlYXJJbWFnZSA9PT0gY2xlYXJGaW5kSW1hZ2UpIHtcbiAgICAgICAgaW5kZXggPSBpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgaW1hZ2VzIHdpY2ggYXJlIG5vdCBsaW5rZWQgdG8gYW55IHZhcmlhbnRcbiAgICovXG4gIHByaXZhdGUgZ2V0R2VuZXJhbEltYWdlcyhvcHRpb25OYW1lID0gJ2NvbG9yJykge1xuICAgIG9wdGlvbk5hbWUgPSBvcHRpb25OYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgLy8gdGhpcy5kZWJ1ZygnZ2V0SW1hZ2VzJyk7XG4gICAgY29uc3QgZ2VuZXJhbEltYWdlczogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAodGhpcy5zY29wZS5wcm9kdWN0KSB7XG4gICAgICAvLyBhZGQgaW1hZ2VzIHdpdGhvdXQgb3B0aW9uTmFtZSBpbiBmaWxlbmFtZVxuICAgICAgdGhpcy5zY29wZS5wcm9kdWN0LmltYWdlcy5mb3JFYWNoKChpbWFnZTogc3RyaW5nLCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoIWltYWdlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoYCR7b3B0aW9uTmFtZX0tYCkpIHtcbiAgICAgICAgICBnZW5lcmFsSW1hZ2VzLnB1c2goaW1hZ2UpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIHJlbW92ZSB2YXJpYW50IGltYWdlcyBmcm9tIGNvcGllZCBhcnJheVxuICAgICAgdGhpcy5zY29wZS5wcm9kdWN0LnZhcmlhbnRzLmZvckVhY2goKHZhcmlhbnQ6IElTaG9waWZ5UHJvZHVjdFZhcmlhbnQpID0+IHtcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgIGlmICh2YXJpYW50LmZlYXR1cmVkX2ltYWdlICE9PSBudWxsICYmIHZhcmlhbnQuZmVhdHVyZWRfaW1hZ2Uuc3JjKSB7XG4gICAgICAgICAgaW5kZXggPSB0aGlzLmluZGV4T2ZVcmwoZ2VuZXJhbEltYWdlcywgdmFyaWFudC5mZWF0dXJlZF9pbWFnZS5zcmMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgZ2VuZXJhbEltYWdlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB0aGlzLmRlYnVnKCdnZXRHZW5lcmFsSW1hZ2VzJywgZ2VuZXJhbEltYWdlcyk7XG5cbiAgICByZXR1cm4gZ2VuZXJhbEltYWdlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgb3B0aW9ucyBpbWFnZXMgKHdpdGhvdXQgZmVhdHVyZWQgaW1hZ2UpIGZpbHRlcmVkIGJ5IGZpbGVuYW1lLlxuICAgKiBTaG9waWZ5IG9ubHkgc3VwcG9ydHMgb25lIGltYWdlIHBlciB2YXJpYW50LCB3aXRoIHRoaXMgZnVuY3Rpb24gbW9yZSBpbWFnZXMgZm9yIGVhY2ggdmFyaWFudCBhcmUgcG9zc2libGUuXG4gICAqIFRoZSBpbWFnZSBmaWxlbmFtZSBtdXN0IGluY2x1ZGUge29wdGlvbk5hbWV9LXtvcHRpb25WYWx1ZX0gZm9yIHRoYXQuXG4gICAqL1xuICBwcml2YXRlIGdldE9wdGlvbkltYWdlcyhvcHRpb246IElTaG9waWZ5UHJvZHVjdFZhcmlhbnRPcHRpb24sIG9wdGlvblZhbHVlOiBzdHJpbmcpIHtcbiAgICBvcHRpb25WYWx1ZSA9IG9wdGlvblZhbHVlLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnIycsICdfJyk7XG4gICAgY29uc3Qgb3B0aW9uTmFtZSA9IG9wdGlvbi5uYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgLy8gdGhpcy5kZWJ1ZygnZ2V0T3B0aW9uSW1hZ2VzJywgb3B0aW9uTmFtZSwgb3B0aW9uVmFsdWUpO1xuICAgIGNvbnN0IG9wdGlvbkltYWdlczogc3RyaW5nW10gPSBbXTtcbiAgICBpZiAodGhpcy5zY29wZS5wcm9kdWN0KSB7XG4gICAgICB0aGlzLnNjb3BlLnByb2R1Y3QuaW1hZ2VzLmZvckVhY2goKGltYWdlOiBzdHJpbmcsIGluZGV4KSA9PiB7XG4gICAgICAgIC8vIHRoaXMuZGVidWcoYGNoZWNrICR7b3B0aW9uTmFtZX0tJHtvcHRpb25WYWx1ZX0gaW5gLCBpbWFnZSk7XG4gICAgICAgIGlmIChpbWFnZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGAke29wdGlvbk5hbWV9LSR7b3B0aW9uVmFsdWV9YCkpIHtcbiAgICAgICAgICBvcHRpb25JbWFnZXMucHVzaChpbWFnZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25JbWFnZXM7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGZlYXR1cmVkIGltYWdlcyBvZiB2YXJpYW50LCB1c2UgdGhlIGZpcnN0IG9wdGlvbiBpbWFnZSBvciB0aGUgZmVhdHVyZWQgcHJvZHVjdCBpbWFnZSBhcyBmYWxsYmFja1xuICAgKi9cbiAgcHJpdmF0ZSBnZXRGZWF0dXJlZEltYWdlKHZhcmlhbnQ6IElQcmVwYWlyZWRQcm9kdWN0VmFyaWFudCkge1xuICAgIGlmICh2YXJpYW50LmZlYXR1cmVkX2ltYWdlICE9PSBudWxsKSB7XG4gICAgICB2YXJpYW50LmZlYXR1cmVkX2ltYWdlLnNyYyA9IHZhcmlhbnQuZmVhdHVyZWRfaW1hZ2Uuc3JjXG4gICAgICAucmVwbGFjZSgvKF5cXHcrOnxeKVxcL1xcLy8sICcvLycpOyAvLyByZW1vdmUgcHJvdG9jb2xcbiAgICAgIHJldHVybiB2YXJpYW50LmZlYXR1cmVkX2ltYWdlO1xuICAgIH1cblxuICAgIGxldCBmYWxsYmFja0ltYWdlU3JjID0gJyc7XG5cbiAgICBpZiAodmFyaWFudC5pbWFnZXMgJiYgdmFyaWFudC5pbWFnZXMubGVuZ3RoID4gMCkge1xuICAgICAgZmFsbGJhY2tJbWFnZVNyYyA9IHZhcmlhbnQuaW1hZ2VzWzBdO1xuICAgIH0gZWxzZSBpZiAodGhpcy5zY29wZS5wcm9kdWN0KSB7XG4gICAgICBmYWxsYmFja0ltYWdlU3JjID0gIHRoaXMuc2NvcGUucHJvZHVjdC5mZWF0dXJlZF9pbWFnZTtcbiAgICB9XG5cbiAgICAvLyByZW1vdmUgcHJvdG9jb2wgZm9yIG5vcm1hbGlzYXRpb25cbiAgICBmYWxsYmFja0ltYWdlU3JjID0gZmFsbGJhY2tJbWFnZVNyYy5yZXBsYWNlKC8oXlxcdys6fF4pXFwvXFwvLywgJy8vJyk7XG5cbiAgICAvLyBJZiB2YXJpYW50IGhhcyBubyBpbWFnZSB1c2UgdGhlIGRlZmF1bHQgcHJvZHVjdCBpbWFnZVxuICAgIGlmICh0aGlzLnNjb3BlLnByb2R1Y3QpIHtcbiAgICAgIGNvbnN0IGZlYXR1cmVkSW1hZ2UgPSB7XG4gICAgICAgIHNyYzogZmFsbGJhY2tJbWFnZVNyYyxcbiAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgIHByb2R1Y3RfaWQ6IHRoaXMuc2NvcGUucHJvZHVjdC5pZCxcbiAgICAgICAgdmFyaWFudF9pZHM6IFtdLFxuICAgICAgICBhbHQ6IHRoaXMuc2NvcGUucHJvZHVjdC50aXRsZSxcbiAgICAgICAgY3JlYXRlZF9hdDogdGhpcy5zY29wZS5wcm9kdWN0LmNyZWF0ZWRfYXQsXG4gICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIGlkOiAwLFxuICAgICAgICB1cGRhdGVkX2F0OiB0aGlzLnNjb3BlLnByb2R1Y3QuY3JlYXRlZF9hdCxcbiAgICAgIH07XG4gICAgICByZXR1cm4gZmVhdHVyZWRJbWFnZTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ltYWdlIG5vdCBmb3VuZCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBpbWFnZSByb3dzLFxuICAgKiBBbHdheXMgdHdvIHBpY3R1cmVzIHNpZGUgYnkgc2lkZS5cbiAgICogSWYgdGhlIGxhc3QgcGljdHVyZSB3b3VsZCBzdG9vZCBhbG9uZSB0aGVuIDMgcGljdHVyZXMgbmV4dCB0byBlYWNoIG90aGVyLlxuICAgKiBAcGFyYW0gaW1hZ2VzXG4gICAqL1xuICBwcml2YXRlIGdldEltYWdlUm93cyhpbWFnZXM6IHN0cmluZ1tdKSB7XG4gICAgY29uc3QgbGVmdG92ZXJQaWN0dXJlQ291bnQgPSAoaW1hZ2VzLmxlbmd0aCAlIElNQUdFU19QRVJfUk9XKTtcbiAgICBjb25zdCByb3dMZW5ndGggPSBNYXRoLmZsb29yKGltYWdlcy5sZW5ndGggLyBJTUFHRVNfUEVSX1JPVyk7XG4gICAgY29uc3Qgcm93czogQXJyYXk8SW1hZ2VSb3c+ID0gbmV3IEFycmF5KHJvd0xlbmd0aCk7XG4gICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHJvd3MubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICByb3dzW2luZGV4XSA9IHtcbiAgICAgICAgY2xhc3M6ICdjb2wtMTIgY29sLW1kIHB4LTAnLFxuICAgICAgICBpbWFnZXM6IFtdLFxuICAgICAgICBzaXplczogJyhtaW4td2lkdGg6IDc2OHB4KSA1MHZ3LCAxMDB2dycsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGxldCBpbWFnZUluZGV4ID0gMDtcbiAgICBmb3IgKGxldCByb3dJbmRleCA9IDA7IHJvd0luZGV4IDwgcm93TGVuZ3RoOyByb3dJbmRleCsrKSB7XG4gICAgICBjb25zdCBjdXJyZW50Um93ID0gcm93c1tyb3dJbmRleF07XG4gICAgICAvLyBBcHBlbmQgSU1BR0VTX1BFUl9ST1cgaW1hZ2VzIHRvIHRoZSByb3dcbiAgICAgIGZvciAobGV0IHJvd0ltYWdlSW5kZXggPSAwOyByb3dJbWFnZUluZGV4IDwgSU1BR0VTX1BFUl9ST1c7IHJvd0ltYWdlSW5kZXgrKywgaW1hZ2VJbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IHJvd0ltYWdlID0gaW1hZ2VzW2ltYWdlSW5kZXhdO1xuICAgICAgICBjdXJyZW50Um93LmltYWdlcy5wdXNoKHJvd0ltYWdlKTtcbiAgICAgIH1cbiAgICAgIC8vIEFwcGVuZCB0aGUgbGVmdG92ZXIgcGljdHVyZXMgdG8gdGhlIGxhc3Qgcm93XG4gICAgICBpZiAocm93SW5kZXggPT09IHJvd0xlbmd0aCAtIDEpIHtcbiAgICAgICAgY3VycmVudFJvdy5zaXplcyA9ICcobWluLXdpZHRoOiA3NjhweCkgMzN2dywgMTAwdncnO1xuICAgICAgICBmb3IgKGxldCByb3dJbWFnZUluZGV4ID0gMDsgcm93SW1hZ2VJbmRleCA8IGxlZnRvdmVyUGljdHVyZUNvdW50OyByb3dJbWFnZUluZGV4KyssIGltYWdlSW5kZXgrKykge1xuICAgICAgICAgIGNvbnN0IHJvd0ltYWdlID0gaW1hZ2VzW2ltYWdlSW5kZXhdO1xuICAgICAgICAgIGN1cnJlbnRSb3cuaW1hZ2VzLnB1c2gocm93SW1hZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgLyoqXG4gICAqIHByZXBhaXIgdmFyaWFudCwgZS5nLiBmaXggbWlzc2luZyBpbWFnZSBldGNcbiAgICogQHBhcmFtIHZhcmlhbnRcbiAgICovXG4gIHByaXZhdGUgcHJlcGFpclZhcmlhbnQodmFyaWFudDogSVByZXBhaXJlZFByb2R1Y3RWYXJpYW50KSB7XG4gICAgaWYgKHZhcmlhbnQgPT09IG51bGwpIHtcbiAgICAgIHRoaXMuZGVidWcoJ0Vycm9yOiBWYXJpYW50IGlzIG51bGwhJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb2xvck9wdGlvbikge1xuICAgICAgdmFyaWFudC5pbWFnZXMgPSB0aGlzLmdldE9wdGlvbkltYWdlcyh0aGlzLmNvbG9yT3B0aW9uLCB2YXJpYW50Lm9wdGlvbnNbdGhpcy5jb2xvck9wdGlvbi5wb3NpdGlvbiAtIDFdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWJ1ZygnV2FybjogY29sb3JPcHRpb24gbm90IGRlZmluZWQnKTtcbiAgICAgIHZhcmlhbnQuaW1hZ2VzID0gW107XG4gICAgfVxuXG4gICAgdmFyaWFudC5mZWF0dXJlZF9pbWFnZSA9IHRoaXMuZ2V0RmVhdHVyZWRJbWFnZSh2YXJpYW50KTtcblxuICAgIGlmICh2YXJpYW50LmltYWdlcykge1xuICAgICAgLy8gUmVtb3ZlIGZlYXR1cmVkIGltYWdlIHNvIHRoYXQgaXQgZG9lcyBub3QgYXBwZWFyIHR3aWNlXG4gICAgICBjb25zdCBpID0gdGhpcy5pbmRleE9mVXJsKHZhcmlhbnQuaW1hZ2VzLCB2YXJpYW50LmZlYXR1cmVkX2ltYWdlLnNyYyk7XG4gICAgICBpZiAoaSA+PSAwKSB7XG4gICAgICAgIHZhcmlhbnQuaW1hZ2VzLnNwbGljZShpLCAxKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWRkIGdlcm5lYWwgaW1hZ2VzXG4gICAgICB2YXJpYW50LmltYWdlcyA9IHZhcmlhbnQuaW1hZ2VzLmNvbmNhdCh0aGlzLmdldEdlbmVyYWxJbWFnZXMoKSk7XG5cbiAgICAgIHZhcmlhbnQuaW1hZ2VSb3dzID0gdGhpcy5nZXRJbWFnZVJvd3ModmFyaWFudC5pbWFnZXMpO1xuICAgIH1cblxuICAgIHJldHVybiB2YXJpYW50O1xuICB9XG59XG4iLCJpbXBvcnQge1xuICBEZWJ1ZyxcbiAgSUJpbmRlcixcbn0gZnJvbSAnQHJpYmFqcy9jb3JlJztcbmltcG9ydCB7IElMYW5nY29kZSwgQUkxOG5Td2l0Y2hlckNvbXBvbmVudCB9IGZyb20gJ0ByaWJhanMvaTE4bic7XG5pbXBvcnQgeyBMb2NhbGVzU2VydmljZSB9IGZyb20gJ0ByaWJhanMvc2hvcGlmeS10ZGEnO1xuXG5leHBvcnQgY2xhc3MgVGRhSTE4blN3aXRjaGVyQ29tcG9uZW50IGV4dGVuZHMgQUkxOG5Td2l0Y2hlckNvbXBvbmVudCB7XG5cbiAgcHVibGljIHN0YXRpYyB0YWdOYW1lOiBzdHJpbmcgPSAndGRhLWkxOG4tc3dpdGNoZXInO1xuXG4gIHN0YXRpYyBnZXQgb2JzZXJ2ZWRBdHRyaWJ1dGVzKCkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIC8vIHByb3RlY3RlZCAkZWw6IEpRdWVyeTxIVE1MRWxlbWVudD47XG5cbiAgcHJvdGVjdGVkIGxvY2FsZXNTZXJ2aWNlID0gbmV3IExvY2FsZXNTZXJ2aWNlKCk7XG5cbiAgcHJvdGVjdGVkIGRlYnVnID0gRGVidWcoJ2NvbXBvbmVudDonICsgVGRhSTE4blN3aXRjaGVyQ29tcG9uZW50LnRhZ05hbWUpO1xuXG4gIHByb3RlY3RlZCBzY29wZSA9IHtcbiAgICBsYW5nY29kZXM6IDxJTGFuZ2NvZGVbXT4gW10sXG4gICAgc3dpdGNoOiB0aGlzLnN3aXRjaCxcbiAgICB0b2dnbGU6IHRoaXMudG9nZ2xlLFxuICAgIHJlYWR5OiA8Ym9vbGVhbj4gZmFsc2UsXG4gIH07XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudD86IEhUTUxFbGVtZW50KSB7XG4gICAgc3VwZXIoZWxlbWVudCk7XG4gICAgdGhpcy5pbml0KFRkYUkxOG5Td2l0Y2hlckNvbXBvbmVudC5vYnNlcnZlZEF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN3aXRjaCB0byBsYW5ndWFnZSBieSBsYW5nY29kZVxuICAgKiBAcGFyYW0gbGFuZ2NvZGVcbiAgICogQHBhcmFtIGV2ZW50XG4gICAqL1xuICBwdWJsaWMgc3dpdGNoKGxhbmdjb2RlOiBJTGFuZ2NvZGUsIGNvbnRleHQ6IElCaW5kZXI8YW55PiwgZXZlbnQ6IEV2ZW50KSB7XG4gICAgcmV0dXJuIHN1cGVyLnN3aXRjaChsYW5nY29kZSwgY29udGV4dCwgZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRvZ2dsZSBsYW5ndWFnZSwgbWFrZXMgb25seSBzZW5zZSBpZiB5b3UgaGF2ZSBvbmx5IHR3byBsYW5ndWFnZXNcbiAgICogQHBhcmFtIGxhbmdjb2RlXG4gICAqIEBwYXJhbSBldmVudFxuICAgKi9cbiAgcHVibGljIHRvZ2dsZShjb250ZXh0OiBJQmluZGVyPGFueT4sIGV2ZW50OiBFdmVudCkge1xuICAgIHJldHVybiBzdXBlci50b2dnbGUoY29udGV4dCwgZXZlbnQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldExhbmdjb2RlKGxhbmdjb2RlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmRlYnVnKCdzZXRMYW5nY29kZScsIGxhbmdjb2RlKTtcbiAgICByZXR1cm4gc3VwZXIuc2V0TGFuZ2NvZGUobGFuZ2NvZGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGJlZm9yZUJpbmQoKSB7XG4gICAgdGhpcy5kZWJ1ZygnYmVmb3JlQmluZCcsIHRoaXMuc2NvcGUpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGFmdGVyQmluZCgpIHtcbiAgICB0aGlzLmRlYnVnKCdhZnRlckJpbmQnLCB0aGlzLnNjb3BlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZXF1aXJlZEF0dHJpYnV0ZXMoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgIHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgdGVtcGxhdGUoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFJpYmEsXG4gIFZpZXcsXG4gIERlYnVnLFxuICBKUXVlcnksXG4gIElCaW5kZXIsXG5cbiAgY29yZU1vZHVsZSxcblxufSBmcm9tICdAcmliYWpzL2NvcmUnO1xuaW1wb3J0IHNob3BpZnlNb2R1bGUgZnJvbSAnQHJpYmFqcy9zaG9waWZ5JztcbmltcG9ydCByb3V0ZXJNb2R1bGUgZnJvbSAnQHJpYmFqcy9yb3V0ZXInO1xuaW1wb3J0IGkxOG5Nb2R1bGUgZnJvbSAnQHJpYmFqcy9pMThuJztcblxuaW1wb3J0IHsgVHJhY2tpbmdTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy90cmFja2luZy5zZXJ2aWNlcyc7XG5pbXBvcnQgKiBhcyBjdXN0b21CaW5kZXJzIGZyb20gJy4vYmluZGVycy9pbmRleCc7XG5cbmltcG9ydCAqIGFzIEN1c3RvbUNvbXBvbmVudHMgZnJvbSAnLi9jb21wb25lbnRzL2luZGV4JztcbmltcG9ydCB7IExvY2FsZXNTZXJ2aWNlIH0gZnJvbSAnQHJpYmFqcy9zaG9waWZ5LXRkYSc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLy8gdHNsaW50OmRpc2FibGU6IGludGVyZmFjZS1uYW1lXG4gIGludGVyZmFjZSBXaW5kb3cgeyBtb2RlbDogYW55OyB9XG59XG5cbi8qIHRzbGludDpkaXNhYmxlOm1heC1jbGFzc2VzLXBlci1maWxlICovXG5kZWNsYXJlIGNsYXNzIFRURFVuaXZlcnNhbFBpeGVsQXBpV3JhcHBlciB7XG4gIHB1YmxpYyBnZXRWZXJzaW9uKCk6IHN0cmluZztcbiAgcHVibGljIGluaXQoYWR2OiBzdHJpbmcsIHRhZ0lkczogc3RyaW5nW10sIGJhc2VTcmM6IHN0cmluZywgZHluUGFyYW1zPzogc3RyaW5nW10pOiB2b2lkO1xufVxuZGVjbGFyZSBmdW5jdGlvbiBUVERVbml2ZXJzYWxQaXhlbEFwaShvcHRpb25hbFRvcExldmVsVXJsPzogc3RyaW5nKTogVFREVW5pdmVyc2FsUGl4ZWxBcGlXcmFwcGVyO1xuXG5leHBvcnQgY2xhc3MgTWFpbiB7XG5cbiAgcHJpdmF0ZSB2aWV3OiBWaWV3O1xuICBwcml2YXRlIGRlYnVnID0gRGVidWcoJ2FwcDptYWluJyk7XG4gIHByaXZhdGUgcmliYSA9IG5ldyBSaWJhKCk7XG4gIHByaXZhdGUgbG9jYWxlc1NlcnZpY2UgPSBuZXcgTG9jYWxlc1NlcnZpY2UoKTtcbiAgLy8gcHJpdmF0ZSBkaXNwYXRjaGVyID0gbmV3IEV2ZW50RGlzcGF0Y2hlcignbWFpbicpO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuXG4gICAgdGhpcy5kZWJ1ZygnaW5pdCB0aGUgbWFpbiBhcHBsaWNhdGlvbicpO1xuXG4gICAgd2luZG93Lm1vZGVsLnllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG5cbiAgICB3aW5kb3cubW9kZWwuZmlsdGVyID0ge1xuICAgICAgc3RvcmllczogJ2FsbCcsXG4gICAgfTtcblxuICAgIC8vIFJlZ2lzdCBjdXN0b20gY29tcG9uZW50c1xuICAgIHRoaXMucmliYS5tb2R1bGUucmVnaXN0KHtcbiAgICAgIGNvbXBvbmVudHM6IEN1c3RvbUNvbXBvbmVudHMsXG4gICAgICBiaW5kZXJzOiBjdXN0b21CaW5kZXJzLFxuICAgIH0pO1xuXG4gICAgdGhpcy5yaWJhLm1vZHVsZS5yZWdpc3QoY29yZU1vZHVsZSk7XG4gICAgdGhpcy5yaWJhLm1vZHVsZS5yZWdpc3Qocm91dGVyTW9kdWxlKTtcbiAgICB0aGlzLnJpYmEubW9kdWxlLnJlZ2lzdChzaG9waWZ5TW9kdWxlKTtcbiAgICB0aGlzLnJpYmEubW9kdWxlLnJlZ2lzdChpMThuTW9kdWxlKHRoaXMubG9jYWxlc1NlcnZpY2UpKTtcblxuICAgIHdpbmRvdy5tb2RlbC5hc3NpZ24gPSBmdW5jdGlvbihrZXk6IHN0cmluZywgdmFsdWU6IGFueSwgY29udGV4dDogSUJpbmRlcjxhbnk+LCBldmVudDogRXZlbnQpIHtcbiAgICAgIC8vIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgIH07XG5cbiAgICB3aW5kb3cubW9kZWwuZ2xvYmFsVG9nZ2xlID0gZnVuY3Rpb24oa2V5OiBzdHJpbmcsIGNvbnRleHQ6IElCaW5kZXI8YW55PiwgZXZlbnQ6IEV2ZW50KSB7XG4gICAgICB0aGlzW2tleV0gPSAhISF0aGlzW2tleV07XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5tb2RlbC5zeXN0ZW0uc2hvcGlmeSA9ICh3aW5kb3cgYXMgYW55KS5TaG9waWZ5O1xuXG4gICAgdGhpcy52aWV3ID0gdGhpcy5yaWJhLmJpbmQoSlF1ZXJ5KCdib2R5JylbMF0sIHdpbmRvdy5tb2RlbCk7XG4gIH1cbn1cblxuY29uc3QgdHJhY2tpbmcgPSBuZXcgVHJhY2tpbmdTZXJ2aWNlKHtcbiAgZ29vZ2xlQW5hbHl0aWNzOiB3aW5kb3cubW9kZWwuc3lzdGVtLnRoZW1lU2V0dGluZ3MuZ29vZ2xlQW5hbHl0aWNzLFxuICB0aGVUcmFkZURlc2s6IHdpbmRvdy5tb2RlbC5zeXN0ZW0udGhlbWVTZXR0aW5ncy50aGVUcmFkZURlc2ssXG4gIHBpbnRlcmVzdFRhZzogd2luZG93Lm1vZGVsLnN5c3RlbS50aGVtZVNldHRpbmdzLnBpbnRlcmVzdFRhZyxcbn0pO1xuXG5KUXVlcnkoKCQ6IEpRdWVyeVN0YXRpYykgPT4ge1xuICBjb25zdCBtYWluID0gbmV3IE1haW4oKTtcbn0pO1xuXG4od2luZG93IGFzIGFueSkuJCA9IEpRdWVyeTtcbih3aW5kb3cgYXMgYW55KS5KUXVlcnkgPSBKUXVlcnk7XG4iLCJpbXBvcnQgeyBVdGlscyBhcyB0aW55YmluZFV0aWxzIH0gZnJvbSAnQHJpYmFqcy9jb3JlJztcblxuLyoqXG4gKiBKdXN0IGFuIENsYXNzIHdpdGggc29tZSBoZWxwZnVsIGZ1bmN0aW9uc1xuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBVdGlsc1xuICovXG5leHBvcnQgY2xhc3MgVXRpbHMgZXh0ZW5kcyB0aW55YmluZFV0aWxzIHtcblxuICAvKipcbiAgICogU2hvdXRvdXQgQW5ndXNDcm9sbCAoaHR0cHM6Ly9nb28uZ2wvcHh3UUdwKVxuICAgKiBAcGFyYW0gb2JqXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIHRvVHlwZShvYmo6IGFueSkge1xuICAgIGNvbnN0IG1hdGNoZXMgPSAge30udG9TdHJpbmcuY2FsbChvYmopLm1hdGNoKC9cXHMoW2Etel0rKS9pKTtcbiAgICByZXR1cm4gbWF0Y2hlcyA/IG1hdGNoZXNbMV0udG9Mb3dlckNhc2UoKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi92NC1kZXYvanMvc3JjL3V0aWwuanMjTDEyNFxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBpc0VsZW1lbnQob2JqOiBFbGVtZW50IHwgRWxlbWVudFtdKSB7XG4gICAgcmV0dXJuICgob2JqIGFzIEVsZW1lbnRbXSlbMF0gfHwgb2JqKS5ub2RlVHlwZTtcbiAgfVxuXG4gIC8qKlxuICAgKlxuICAgKiBAcGFyYW0gY29tcG9uZW50TmFtZVxuICAgKiBAcGFyYW0gY29uZmlnXG4gICAqIEBwYXJhbSBjb25maWdUeXBlc1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyB0eXBlQ2hlY2tDb25maWcoY29tcG9uZW50TmFtZTogc3RyaW5nLCBjb25maWc6IGFueSwgY29uZmlnVHlwZXM6IGFueSkge1xuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gY29uZmlnVHlwZXMpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29uZmlnVHlwZXMsIHByb3BlcnR5KSkge1xuICAgICAgICBjb25zdCBleHBlY3RlZFR5cGVzID0gY29uZmlnVHlwZXNbcHJvcGVydHldO1xuICAgICAgICBjb25zdCB2YWx1ZSAgICAgICAgID0gY29uZmlnW3Byb3BlcnR5XTtcbiAgICAgICAgY29uc3QgdmFsdWVUeXBlICAgICA9IHZhbHVlICYmIFV0aWxzLmlzRWxlbWVudCh2YWx1ZSkgPyAnZWxlbWVudCcgOiBVdGlscy50b1R5cGUodmFsdWUpO1xuXG4gICAgICAgIGlmICghdmFsdWVUeXBlIHx8ICFuZXcgUmVnRXhwKGV4cGVjdGVkVHlwZXMpLnRlc3QodmFsdWVUeXBlKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGAke2NvbXBvbmVudE5hbWUudG9VcHBlckNhc2UoKX06IGAgK1xuICAgICAgICAgICAgYE9wdGlvbiBcIiR7cHJvcGVydHl9XCIgcHJvdmlkZWQgdHlwZSBcIiR7dmFsdWVUeXBlfVwiIGAgK1xuICAgICAgICAgICAgYGJ1dCBleHBlY3RlZCB0eXBlIFwiJHtleHBlY3RlZFR5cGVzfVwiLmApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW1lbnQ6IEVsZW1lbnQpIHtcbiAgICBsZXQgc2VsZWN0b3IgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS10YXJnZXQnKTtcbiAgICBpZiAoIXNlbGVjdG9yIHx8IHNlbGVjdG9yID09PSAnIycpIHtcbiAgICAgIHNlbGVjdG9yID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKSB8fCAnJztcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpID8gc2VsZWN0b3IgOiBudWxsO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBzdHJpbmdIYXNPbmx5TnVtYmVycyhzdHI6IHN0cmluZykge1xuICAgIHJldHVybiAvXlxcZCskLy50ZXN0KHN0cik7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIHN0cmlwSHRtbCA9IChodG1sOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCB0bXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdESVYnKTtcbiAgICB0bXAuaW5uZXJIVE1MID0gaHRtbDtcbiAgICByZXR1cm4gdG1wLnRleHRDb250ZW50IHx8IHRtcC5pbm5lclRleHQgfHwgJyc7XG4gIH1cblxuICAvKipcbiAgICogU2VsZWN0IGFsbCBvZiBhbiBjb250ZW50ZWRpdGFibGUgb3IgaW5wdXQgZWxlbWVudFxuICAgKiBAcGFyYW0gZWxlbWVudCBUaGUgZWxlbWVudCB5b3Ugd2FudCB0byBzZWxlY3RcbiAgICovXG4gIHB1YmxpYyBzdGF0aWMgc2VsZWN0QWxsKGVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQpIHtcbiAgICAvLyBuZWVkIHNldFRpbWVvdXQgZm9yIHNhZmFyaVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHR5cGVvZihlbGVtZW50LnNlbGVjdGlvblN0YXJ0KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZWxlbWVudC5zZWxlY3Rpb25TdGFydCA9IDA7XG4gICAgICAgIGVsZW1lbnQuc2VsZWN0aW9uRW5kID0gOTk5O1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mKGVsZW1lbnQuc2VsZWN0KSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbGVtZW50LnNlbGVjdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mKGVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwgOTk5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgY29uc3QgcmFuZ2UgPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlQ29udGVudHMoZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgaWYgKCFzZWxlY3Rpb24pIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ05vIHNlbGVjdGlvbiBmb3VuZCEnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0aW9uLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICBzZWxlY3Rpb24uYWRkUmFuZ2UocmFuZ2UpO1xuICAgICAgICBzZWxlY3Rpb24uc2VsZWN0QWxsQ2hpbGRyZW4oZWxlbWVudCk7XG4gICAgICB9XG5cbiAgICAgIGlmICgoZG9jdW1lbnQgYXMgYW55KS5ib2R5LmNyZWF0ZVRleHRSYW5nZSkge1xuICAgICAgICBjb25zdCByYW5nZTogYW55ID0gKGRvY3VtZW50LmJvZHkgYXMgYW55KS5jcmVhdGVUZXh0UmFuZ2UoKTsgLy8gQ3JlYXRlcyBUZXh0UmFuZ2Ugb2JqZWN0XG4gICAgICAgIHJhbmdlLm1vdmVUb0VsZW1lbnRUZXh0KGVsZW1lbnQpOyAvLyBzZXRzIFJhbmdlXG4gICAgICAgIHJhbmdlLnNlbGVjdCgpOyAvLyBtYWtlIHNlbGVjdGlvbi5cbiAgICAgIH1cblxuICAgICAgaWYgKGRvY3VtZW50LmV4ZWNDb21tYW5kKSB7XG4gICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdzZWxlY3RBbGwnLCBmYWxzZSwgdW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXaGljaCBIVE1MIGVsZW1lbnQgaXMgdGhlIHRhcmdldCBvZiB0aGUgZXZlbnRcbiAgICogQHNlZSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9lbGVjdHJpY2cvNDQzNTI1OVxuICAgKi9cbiAgcHVibGljIGV2ZW50VGFyZ2V0KGU6IEV2ZW50KSB7XG4gICAgbGV0IHRhcmc7XG4gICAgbGV0ICR0YXJnO1xuICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcblxuICAgIGlmIChlLnRhcmdldCkge1xuICAgICAgdGFyZyA9IGUudGFyZ2V0O1xuICAgIH0gZWxzZSBpZiAoKGUgYXMgYW55KS5zcmNFbGVtZW50KSB7XG4gICAgICB0YXJnID0gKGUgYXMgYW55KS5zcmNFbGVtZW50O1xuICAgIH1cbiAgICAvLyBkZWZlYXQgU2FmYXJpIGJ1Z1xuICAgIGlmICh0YXJnLm5vZGVUeXBlID09PSAzKSB7XG4gICAgICB0YXJnID0gdGFyZy5wYXJlbnROb2RlO1xuICAgIH1cbiAgICAkdGFyZyA9ICQodGFyZyk7XG4gICAgcmV0dXJuICR0YXJnO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgbW91c2UgLyB0b3VjaCBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgZG9jdW1lbnRcbiAgICogQHNlZSBodHRwOi8vd3d3LnF1aXJrc21vZGUub3JnL2pzL2V2ZW50c19wcm9wZXJ0aWVzLmh0bWxcbiAgICovXG4gIHB1YmxpYyBldmVudFBvc2l0aW9uRG9jdW1lbnQoZT86IE1vdXNlRXZlbnQgfCBUb3VjaEV2ZW50IHwgRXZlbnQpIHtcbiAgICBsZXQgcG9zeCA9IDA7XG4gICAgbGV0IHBvc3kgPSAwO1xuICAgIGlmICghZSkge1xuICAgICAgZSA9IHdpbmRvdy5ldmVudDtcbiAgICB9XG5cbiAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCBpcyBudWxsJyk7XG4gICAgfVxuXG4gICAgaWYgKGUpIHtcbiAgICAgIGlmICgoZSBhcyBhbnkpLm9yaWdpbmFsRXZlbnQpIHtcbiAgICAgICAgZSA9IChlIGFzIGFueSkub3JpZ2luYWxFdmVudDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGUgJiYgKGUgYXMgVG91Y2hFdmVudCkuY2hhbmdlZFRvdWNoZXMpIHtcbiAgICAgIGUgPSAoZSBhcyBUb3VjaEV2ZW50KTtcbiAgICAgIGlmICgoZSBhcyBUb3VjaEV2ZW50KS5jaGFuZ2VkVG91Y2hlcyAmJiAoZSBhcyBUb3VjaEV2ZW50KS5jaGFuZ2VkVG91Y2hlc1swXSAmJiAoKGUgYXMgVG91Y2hFdmVudCkuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVggfHwgKGUgYXMgVG91Y2hFdmVudCkuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkpKSB7XG4gICAgICAgIHBvc3ggPSAoZSBhcyBUb3VjaEV2ZW50KS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgcG9zeSA9IChlIGFzIFRvdWNoRXZlbnQpLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgfSBlbHNlIGlmICgoZSBhcyBNb3VzZUV2ZW50KS5wYWdlWCB8fCAoZSBhcyBNb3VzZUV2ZW50KS5wYWdlWSkge1xuICAgICAgICBwb3N4ID0gKGUgYXMgTW91c2VFdmVudCkucGFnZVg7XG4gICAgICAgIHBvc3kgPSAoZSBhcyBNb3VzZUV2ZW50KS5wYWdlWTtcbiAgICAgIH0gZWxzZSBpZiAoKGUgYXMgVG91Y2hFdmVudCkudG91Y2hlcyAmJiAoZSBhcyBUb3VjaEV2ZW50KS5jaGFuZ2VkVG91Y2hlc1swXSAmJiAoKGUgYXMgVG91Y2hFdmVudCkuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCB8fCAoZSBhcyBUb3VjaEV2ZW50KS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZKSkge1xuICAgICAgICBwb3N4ID0gKGUgYXMgVG91Y2hFdmVudCkuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCArIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCArIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgICAgICBwb3N5ID0gKGUgYXMgVG91Y2hFdmVudCkuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSArIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wICsgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgIH0gZWxzZSBpZiAoKGUgYXMgTW91c2VFdmVudCkuY2xpZW50WCB8fCAoZSBhcyBNb3VzZUV2ZW50KS5jbGllbnRZKSB7XG4gICAgICAgIHBvc3ggPSAoZSBhcyBNb3VzZUV2ZW50KS5jbGllbnRYICsgZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0ICsgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgICAgIHBvc3kgPSAoZSBhcyBNb3VzZUV2ZW50KS5jbGllbnRZICsgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgKyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgeCA6IHBvc3gsXG4gICAgICB5IDogcG9zeSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcG9zaXRpb24gb2YgYW4gZWxlbWVudCByZWxhdGl2ZSB0byBkb2N1bWVudFxuICAgKi9cbiAgcHVibGljIGdldEVsZW1lbnRQb3NpdGlvbihzZWxlY3RvcjogSlF1ZXJ5LlBsYWluT2JqZWN0PGFueT4pIHtcbiAgICBjb25zdCAkZWwgPSAkKHNlbGVjdG9yKTtcbiAgICBjb25zdCBwYWdlWVNjcm9sbCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA6IDApO1xuICAgIGNvbnN0IHBhZ2VYU2Nyb2xsID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgPyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCA6IDApO1xuICAgIC8vIG9wdGlvbmFsbHkgZ2V0IGhvcml6b250YWwgc2Nyb2xsXG4gICAgLy8gZ2V0IHBvc2l0aW9uIG9mIGVsZW1lbnQgcmVsYXRpdmUgdG8gdmlld3BvcnRcbiAgICBjb25zdCByZWN0ID0gJGVsWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICd4JzogcmVjdC5sZWZ0ICsgcGFnZVhTY3JvbGwsXG4gICAgICAnZml4ZWQteCc6IHJlY3QubGVmdCxcbiAgICAgICd5JzogcmVjdC50b3AgKyBwYWdlWVNjcm9sbCxcbiAgICAgICdmaXhlZC15JzogcmVjdC50b3AsXG4gICAgICAndyc6IHJlY3Qud2lkdGgsXG4gICAgICAnaCc6IHJlY3QuaGVpZ2h0LFxuICAgICAgJyRlbGVtZW50JzogJGVsLFxuICAgIH07XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnQgcmVsYXRpdmUgdG8gYW5vdGhlciBlbGVtZW50IGUuZy4gaGlzIHBhcmVudCBlbGVtZW50XG4gICAqIEUuZy4gdXNlZCBpbiBydi10YWJzIHRvIGdldCB0aGUgc2Nyb2xscG9zdGlvbiBvZiBhbiBlbGVtZW50IGluc2l0ZSBhIHNjcm9sbGFibGUgZWxlbWVudCB0byBzY3JvbGwgdGhlIGFjdGl2ZSB0YWIgdG8gbGVmdFxuICAgKi9cbiAgcHVibGljIGdldEVsZW1lbnRQb3NpdGlvbkluRWxlbWVudChzZWxlY3RvcjogSlF1ZXJ5LlBsYWluT2JqZWN0PGFueT4sIHBhcmVudFNlbGVjdG9yOiBKUXVlcnkuUGxhaW5PYmplY3Q8YW55Pikge1xuICAgIGNvbnN0IGVsZW1lbnRQb3MgPSB0aGlzLmdldEVsZW1lbnRQb3NpdGlvbihzZWxlY3Rvcik7XG4gICAgY29uc3QgcGFyZW50RWxlbWVudFBvcyA9IHRoaXMuZ2V0RWxlbWVudFBvc2l0aW9uKHBhcmVudFNlbGVjdG9yKTtcbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAneCc6IGVsZW1lbnRQb3MueCAtIHBhcmVudEVsZW1lbnRQb3MueCxcbiAgICAgICd5JzogZWxlbWVudFBvcy55IC0gcGFyZW50RWxlbWVudFBvcy55LFxuICAgICAgJ2ZpeGVkLXgnOiBlbGVtZW50UG9zWydmaXhlZC14J10gLSBwYXJlbnRFbGVtZW50UG9zWydmaXhlZC14J10sXG4gICAgICAnZml4ZWQteSc6IGVsZW1lbnRQb3NbJ2ZpeGVkLXknXSAtIHBhcmVudEVsZW1lbnRQb3NbJ2ZpeGVkLXknXSxcbiAgICAgICd3JzogZWxlbWVudFBvcy53LFxuICAgICAgJ2gnOiBlbGVtZW50UG9zLmgsXG4gICAgICAnJGVsZW1lbnQnOiBlbGVtZW50UG9zLiRlbGVtZW50LFxuICAgICAgJyRwYXJlbnQnOiBwYXJlbnRFbGVtZW50UG9zLiRlbGVtZW50LFxuICAgICAgJ2VsZW1lbnRQb3MnOiBlbGVtZW50UG9zLFxuICAgICAgJ3BhcmVudFBvcyc6IHBhcmVudEVsZW1lbnRQb3MsXG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIE1vdXNlIHBvc2l0aW9uIHJlbGF0aXZlIHRvIHRoZSBlbGVtZW50ICAobm90IHdvcmtpbmcgb24gSUU3IGFuZCBiZWxvdylcbiAgICogQHNlZSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9lbGVjdHJpY2cvNDQzNTI1OVxuICAgKi9cbiAgcHVibGljIG1vdXNlUG9zaXRpb25FbGVtZW50KGU6IE1vdXNlRXZlbnQsIHRhcmdldDogSlF1ZXJ5PGFueT4pIHtcbiAgICBjb25zdCBtb3VzZVBvc0RvYyA9IHRoaXMuZXZlbnRQb3NpdGlvbkRvY3VtZW50KGUpO1xuICAgIC8vIGlmIHRhcmdldCBub3Qgc2V0IHRyeSB0byBnZXQgdGFyZ2V0IGZyb20gZXZlbnRcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGFyZ2V0ID0gdGhpcy5ldmVudFRhcmdldChlKTtcbiAgICB9XG4gICAgY29uc3QgdGFyZ2V0UG9zID0gdGhpcy5nZXRFbGVtZW50UG9zaXRpb24odGFyZ2V0KTtcbiAgICBjb25zdCBwb3N4ID0gbW91c2VQb3NEb2MueCAtIHRhcmdldFBvcy54O1xuICAgIGNvbnN0IHBvc3kgPSBtb3VzZVBvc0RvYy55IC0gdGFyZ2V0UG9zLnk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHggOiBwb3N4LFxuICAgICAgeSA6IHBvc3ksXG4gICAgICBlbGVtZW50OiB0YXJnZXQsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3VzZSBwb3NpdGlvbiByZWxhdGl2ZSB0byB0aGUgZWxlbWVudCBpbiBwZXJjZW50IChub3Qgd29ya2luZyBvbiBJRTcgYW5kIGJlbG93KVxuICAgKiBAc2VlIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2VsZWN0cmljZy80NDM1MjU5XG4gICAqL1xuICBwdWJsaWMgbW91c2VQb3NpdGlvbkVsZW1lbnRJblBlcmNlbnQoZTogTW91c2VFdmVudCwgdGFyZ2V0OiBKUXVlcnk8YW55Pikge1xuICAgIGNvbnN0IG1vdXNlUG9zRG9jID0gdGhpcy5ldmVudFBvc2l0aW9uRG9jdW1lbnQoZSk7XG4gICAgLy8gaWYgdGFyZ2V0IG5vdCBzZXQgdHJ5IHRvIGdldCB0YXJnZXQgZnJvbSBldmVudFxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0YXJnZXQgPSB0aGlzLmV2ZW50VGFyZ2V0KGUpO1xuICAgIH1cbiAgICBjb25zdCB3aWR0aCA9IHRhcmdldFswXS5vZmZzZXRXaWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSB0YXJnZXRbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgIGNvbnN0IHRhcmdldFBvcyA9IHRoaXMuZ2V0RWxlbWVudFBvc2l0aW9uKHRhcmdldCk7XG4gICAgY29uc3QgcG9zeCA9IG1vdXNlUG9zRG9jLnggLSB0YXJnZXRQb3MueDtcbiAgICBjb25zdCBwb3N5ID0gbW91c2VQb3NEb2MueSAtIHRhcmdldFBvcy55O1xuICAgIHJldHVybiB7XG4gICAgICB4OiBwb3N4LFxuICAgICAgeTogcG9zeSxcbiAgICAgIGxlZnQ6IHBvc3ggLyB3aWR0aCwgLy8gcGVyY2VudCB2YWx1ZVxuICAgICAgdG9wOiBwb3N5IC8gaGVpZ2h0LCAvLyBwZXJjZW50IHZhbHVlXG4gICAgICB3OiB3aWR0aCxcbiAgICAgIGg6IGhlaWdodCxcbiAgICAgIGVsZW1lbnQ6IHRhcmdldCxcbiAgICB9O1xuICB9XG5cbn1cbiIsImltcG9ydCB7XG4gIERlYnVnLFxuICBFdmVudERpc3BhdGNoZXIsXG59IGZyb20gJ0ByaWJhanMvY29yZSc7XG5cbmltcG9ydCB7IElTdGF0ZSB9IGZyb20gJ0ByaWJhanMvcm91dGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBUaGVUcmFkZURlc2sge1xuICBlbmFibGVkOiBib29sZWFuO1xuICBhZHY6IHN0cmluZztcbiAgdGFnSWQ6IHN0cmluZztcbiAgYmFzZVNyYzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdvb2dsZUFuYWx5dGljcyB7XG4gIGVuYWJsZWQ6IGJvb2xlYW47XG4gIHRyYWNraW5nSWQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQaW50ZXJlc3RUYWcge1xuICBlbmFibGVkOiBib29sZWFuO1xuICB0cmFja2luZ0lkOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmFjZWJvb2tQaXhlbCB7XG4gIGVuYWJsZWQ/OiBib29sZWFuO1xufVxuXG4vLyBzZWUgYWxzbyBQcml2YWN5U2V0dGluZ3NDb21wb25lbnRcbmV4cG9ydCBjbGFzcyBUcmFja2luZ1NlcnZpY2Uge1xuXG4gIHB1YmxpYyBzdGF0aWMgaW5zdGFuY2U/OiBUcmFja2luZ1NlcnZpY2U7XG5cbiAgcHVibGljIHNob3BpZnlDYXJ0RXZlbnREaXNwYXRjaGVyID0gbmV3IEV2ZW50RGlzcGF0Y2hlcignU2hvcGlmeUNhcnQnKTtcblxuICBwdWJsaWMgdGhlVHJhZGVEZXNrRGlzYWJsZVN0cjogc3RyaW5nO1xuXG4gIHB1YmxpYyBnb29nbGVBbmFseXRpY3NEaXNhYmxlU3RyOiBzdHJpbmc7XG5cbiAgcHVibGljIGZhY2Vib29rUGl4ZWxEaXNhYmxlU3RyOiBzdHJpbmc7XG5cbiAgcHVibGljIHBpbnRlcmVzdFRhZ0Rpc2FibGVTdHI6IHN0cmluZztcblxuICBwcm90ZWN0ZWQgdGhlVHJhZGVEZXNrOiBUaGVUcmFkZURlc2s7XG5cbiAgcHJvdGVjdGVkIGdvb2dsZUFuYWx5dGljczogR29vZ2xlQW5hbHl0aWNzO1xuXG4gIHByb3RlY3RlZCBmYWNlYm9va1BpeGVsOiBGYWNlYm9va1BpeGVsID0ge307XG5cbiAgcHJvdGVjdGVkIHBpbnRlcmVzdFRhZzogUGludGVyZXN0VGFnO1xuXG4gIHByb3RlY3RlZCBkZWJ1ZyA9IERlYnVnKCdhcHA6VHJhY2tpbmdTZXJ2aWNlJyk7XG5cbiAgcHJvdGVjdGVkIGRpc3BhdGNoZXIgPSBuZXcgRXZlbnREaXNwYXRjaGVyKCdtYWluJyk7XG5cbiAgLy8gT3JpZ2luYWwgZG9jdW1lbnQuY29va2llIGZ1bmN0aW9uIHRvIGhvbGQgdGhlbSBpZiB3ZSBibG9jayBhbGwgY29va2llc1xuICBwcm90ZWN0ZWQgX2Nvb2tpZTogYW55O1xuXG4gIHB1YmxpYyBnZXQgdGhlVHJhZGVEZXNrRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKHRoaXMudGhlVHJhZGVEZXNrRGlzYWJsZVN0ciArICc9dHJ1ZScpID4gLTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc2V0IHRoZVRyYWRlRGVza0Rpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgZG9jdW1lbnQuY29va2llID0gYCR7dGhpcy50aGVUcmFkZURlc2tEaXNhYmxlU3RyfT0ke2Rpc2FibGVkfTsgZXhwaXJlcz1UaHUsIDMxIERlYyAyMDk5IDIzOjU5OjU5IFVUQzsgcGF0aD0vYDtcbiAgICAod2luZG93IGFzIGFueSlbdGhpcy50aGVUcmFkZURlc2tEaXNhYmxlU3RyXSA9IGRpc2FibGVkO1xuICAgIHRoaXMudGhlVHJhZGVEZXNrLmVuYWJsZWQgPSAhZGlzYWJsZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGdvb2dsZUFuYWx5dGljc0Rpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIGlmIChkb2N1bWVudC5jb29raWUuaW5kZXhPZih0aGlzLmdvb2dsZUFuYWx5dGljc0Rpc2FibGVTdHIgKyAnPXRydWUnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHNldCBnb29nbGVBbmFseXRpY3NEaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke3RoaXMuZ29vZ2xlQW5hbHl0aWNzRGlzYWJsZVN0cn09JHtkaXNhYmxlZH07IGV4cGlyZXM9VGh1LCAzMSBEZWMgMjA5OSAyMzo1OTo1OSBVVEM7IHBhdGg9L2A7XG4gICAgLy8gc2VlIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2FuYWx5dGljcy9kZXZndWlkZXMvY29sbGVjdGlvbi9hbmFseXRpY3Nqcy91c2VyLW9wdC1vdXRcbiAgICAod2luZG93IGFzIGFueSlbdGhpcy5nb29nbGVBbmFseXRpY3NEaXNhYmxlU3RyXSA9IGRpc2FibGVkO1xuICAgIHRoaXMuZ29vZ2xlQW5hbHl0aWNzLmVuYWJsZWQgPSAhZGlzYWJsZWQ7XG5cbiAgICAvLyBiZSBzdXJlIHRoYXQgZ2EgaXMgZGlzYWJsZWQgYnkgb3ZlcndyaXRlIHRoZSBmdW5jdGlvblxuICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgKHdpbmRvdyBhcyBhbnkpLl9nYSA9ICh3aW5kb3cgYXMgYW55KS5nYTtcbiAgICAgICh3aW5kb3cgYXMgYW55KS5nYSA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICBjb25zb2xlLndhcm4oJ2dhIGlzIGRpc2FibGVkLCBpZ25vcmUnLCBhcmdzKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICgod2luZG93IGFzIGFueSkuX2dhKSB7XG4gICAgICAgICh3aW5kb3cgYXMgYW55KS5nYSA9ICh3aW5kb3cgYXMgYW55KS5fZ2E7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBmYWNlYm9va1BpeGVsRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKHRoaXMuZmFjZWJvb2tQaXhlbERpc2FibGVTdHIgKyAnPXRydWUnKSA+IC0xKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHNldCBmYWNlYm9va1BpeGVsRGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICBkb2N1bWVudC5jb29raWUgPSBgJHt0aGlzLmZhY2Vib29rUGl4ZWxEaXNhYmxlU3RyfT0ke2Rpc2FibGVkfTsgZXhwaXJlcz1UaHUsIDMxIERlYyAyMDk5IDIzOjU5OjU5IFVUQzsgcGF0aD0vYDtcbiAgICAvLyBzZWUgaHR0cHM6Ly93d3cudGJhLWJlcmxpbi5kZS9ibG9nL2RzZ3ZvLW9wdG91dC9cbiAgICAod2luZG93IGFzIGFueSlbdGhpcy5mYWNlYm9va1BpeGVsRGlzYWJsZVN0cl0gPSBkaXNhYmxlZDtcbiAgICB0aGlzLmZhY2Vib29rUGl4ZWwuZW5hYmxlZCA9ICFkaXNhYmxlZDtcblxuICAgIC8vIGJlIHN1cmUgdGhhdCBmYnEgaXMgZGlzYWJsZWQgYnkgb3ZlcndyaXRlIHRoZSBmdW5jdGlvblxuICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgKHdpbmRvdyBhcyBhbnkpLl9mYnEgPSAod2luZG93IGFzIGFueSkuZmJxO1xuICAgICAgKHdpbmRvdyBhcyBhbnkpLmZicSA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgICBjb25zb2xlLndhcm4oJ2ZicCBpcyBkaXNhYmxlZCwgaWdub3JlJywgYXJncyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoKHdpbmRvdyBhcyBhbnkpLl9mYnEpIHtcbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLmZicSA9ICh3aW5kb3cgYXMgYW55KS5fZmJxO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGludGVyZXN0VGFnRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKHRoaXMucGludGVyZXN0VGFnRGlzYWJsZVN0ciArICc9dHJ1ZScpID4gLTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgc2V0IHBpbnRlcmVzdFRhZ0Rpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgZG9jdW1lbnQuY29va2llID0gYCR7dGhpcy5waW50ZXJlc3RUYWdEaXNhYmxlU3RyfT0ke2Rpc2FibGVkfTsgZXhwaXJlcz1UaHUsIDMxIERlYyAyMDk5IDIzOjU5OjU5IFVUQzsgcGF0aD0vYDtcbiAgICAvLyBzZWUgaHR0cHM6Ly93d3cudGJhLWJlcmxpbi5kZS9ibG9nL2RzZ3ZvLW9wdG91dC9cbiAgICAod2luZG93IGFzIGFueSlbdGhpcy5waW50ZXJlc3RUYWdEaXNhYmxlU3RyXSA9IGRpc2FibGVkO1xuICAgIHRoaXMucGludGVyZXN0VGFnLmVuYWJsZWQgPSAhZGlzYWJsZWQ7XG5cbiAgICAvLyBiZSBzdXJlIHRoYXQgcGludHJrIGlzIGRpc2FibGVkIGJ5IG92ZXJ3cml0ZSB0aGUgZnVuY3Rpb25cbiAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICh3aW5kb3cgYXMgYW55KS5fcGludHJrID0gKHdpbmRvdyBhcyBhbnkpLnBpbnRyaztcbiAgICAgICh3aW5kb3cgYXMgYW55KS5waW50cmsgPSAoLi4uYXJnczogYW55W10pID0+IHtcbiAgICAgICAgY29uc29sZS53YXJuKCdwaW50ZXJlc3QgaXMgZGlzYWJsZWQsIGlnbm9yZScsICh3aW5kb3cgYXMgYW55KS5waW50cmspO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCh3aW5kb3cgYXMgYW55KS5fcGludHJrKSB7XG4gICAgICAgICh3aW5kb3cgYXMgYW55KS5waW50cmsgPSAod2luZG93IGFzIGFueSkuX3BpbnRyaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IGNvb2tpZVN0b3JhZ2VEaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgdGhpcy5ibG9ja0Nvb2tpZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51bmJsb2NrQ29va2llcygpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHNldHRpbmdzOiB7XG4gICAgdGhlVHJhZGVEZXNrOiBUaGVUcmFkZURlc2ssXG4gICAgZ29vZ2xlQW5hbHl0aWNzOiBHb29nbGVBbmFseXRpY3MsXG4gICAgcGludGVyZXN0VGFnOiBQaW50ZXJlc3RUYWcsXG4gIH0pIHtcblxuICAgIHRoaXMudGhlVHJhZGVEZXNrID0gc2V0dGluZ3MudGhlVHJhZGVEZXNrO1xuICAgIHRoaXMuZ29vZ2xlQW5hbHl0aWNzID0gc2V0dGluZ3MuZ29vZ2xlQW5hbHl0aWNzO1xuICAgIHRoaXMucGludGVyZXN0VGFnID0gc2V0dGluZ3MucGludGVyZXN0VGFnO1xuXG4gICAgdGhpcy5kZWJ1Zygnc2V0dGluZ3MnLCBzZXR0aW5ncyk7XG5cbiAgICB0aGlzLmdvb2dsZUFuYWx5dGljc0Rpc2FibGVTdHIgPSAnZ2EtZGlzYWJsZS0nICsgdGhpcy5nb29nbGVBbmFseXRpY3MudHJhY2tpbmdJZDtcbiAgICB0aGlzLnRoZVRyYWRlRGVza0Rpc2FibGVTdHIgPSAnVFRET3B0T3V0JztcbiAgICB0aGlzLmZhY2Vib29rUGl4ZWxEaXNhYmxlU3RyID0gJ2ZiLXBpeGVsLWlzLWRpc2FibGVkJztcbiAgICB0aGlzLnBpbnRlcmVzdFRhZ0Rpc2FibGVTdHIgPSAncGludGVyZXN0LXRhZy1pcy1kaXNhYmxlZCc7XG5cbiAgICB0aGlzLmNoZWNrRGlzYWJsZVRyYWNraW5nQ29va2llcygpO1xuXG4gICAgLyoqXG4gICAgICogc3RvcmUgb3JpZ2luYWwgY29va2llIGdldHRlciBhbmQgc2V0dGVyIHRvIG1ha2UgaXQgcG9zc2libGUgdG8gcmV2ZXJ0IHRoZSBibG9ja1xuICAgICAqL1xuICAgIHRoaXMuX2Nvb2tpZSA9IHtcbiAgICAgIGdldDogdW5kZWZpbmVkIGFzIGFueSxcbiAgICAgIHNldDogdW5kZWZpbmVkIGFzIGFueSxcbiAgICB9O1xuXG4gICAgaWYgKChkb2N1bWVudCBhcyBhbnkpLl9fbG9va3VwR2V0dGVyX18gJiYgKGRvY3VtZW50IGFzIGFueSkuX19sb29rdXBHZXR0ZXJfXygnY29va2llJykpIHtcbiAgICAgIHRoaXMuX2Nvb2tpZS5nZXQgPSAoZG9jdW1lbnQgYXMgYW55KS5fX2xvb2t1cEdldHRlcl9fKCdjb29raWUnKTtcbiAgICB9XG5cbiAgICBpZiAoKGRvY3VtZW50IGFzIGFueSkuX19sb29rdXBTZXR0ZXJfXyAmJiAoZG9jdW1lbnQgYXMgYW55KS5fX2xvb2t1cFNldHRlcl9fKCdjb29raWUnKSkge1xuICAgICAgdGhpcy5fY29va2llLnNldCA9IChkb2N1bWVudCBhcyBhbnkpLl9fbG9va3VwU2V0dGVyX18oJ2Nvb2tpZScpO1xuICAgIH1cblxuICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZG9jdW1lbnQsICdjb29raWUnKSAmJiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihkb2N1bWVudCwgJ2Nvb2tpZScpIGFzIFByb3BlcnR5RGVzY3JpcHRvcikuZ2V0KSB7XG4gICAgICB0aGlzLl9jb29raWUuZ2V0ID0gKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZG9jdW1lbnQsICdjb29raWUnKSBhcyBQcm9wZXJ0eURlc2NyaXB0b3IpLmdldDtcbiAgICB9XG5cbiAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGRvY3VtZW50LCAnY29va2llJykgJiYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZG9jdW1lbnQsICdjb29raWUnKSBhcyBQcm9wZXJ0eURlc2NyaXB0b3IpLnNldCkge1xuICAgICAgdGhpcy5fY29va2llLnNldCA9IChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGRvY3VtZW50LCAnY29va2llJykgYXMgUHJvcGVydHlEZXNjcmlwdG9yKS5zZXQ7XG4gICAgfVxuXG4gICAgaWYgKFRyYWNraW5nU2VydmljZS5pbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIFRyYWNraW5nU2VydmljZS5pbnN0YW5jZTtcbiAgICB9XG5cbiAgICB0aGlzLmRlYnVnKCdnb29nbGUgYW5hbHl0aWNzIGRpc2FibGVkOiAnLCAod2luZG93IGFzIGFueSlbdGhpcy5nb29nbGVBbmFseXRpY3NEaXNhYmxlU3RyXSk7XG4gICAgdGhpcy5kZWJ1ZygndGhlIHRyYWRlIGRlc2sgZGlzYWJsZWQ6ICcsICh3aW5kb3cgYXMgYW55KVt0aGlzLnRoZVRyYWRlRGVza0Rpc2FibGVTdHJdKTtcbiAgICB0aGlzLmRlYnVnKCdmYWNlYm9vayBwaXhlbCBkaXNhYmxlZDogJywgKHdpbmRvdyBhcyBhbnkpW3RoaXMuZmFjZWJvb2tQaXhlbERpc2FibGVTdHJdKTtcbiAgICB0aGlzLmRlYnVnKCdwaW50ZXJlc3QgdGFnIGRpc2FibGVkOiAnLCAod2luZG93IGFzIGFueSlbdGhpcy5waW50ZXJlc3RUYWdEaXNhYmxlU3RyXSk7XG5cbiAgICB0aGlzLmRpc3BhdGNoZXIub24oJ25ld1BhZ2VSZWFkeScsICh2aWV3SWQ6IHN0cmluZywgY3VycmVudFN0YXR1czogSVN0YXRlLCBwcmV2U3RhdHVzOiBJU3RhdGUsICRjb250YWluZXI6IEpRdWVyeTxIVE1MRWxlbWVudD4sIG5ld1BhZ2VSYXdIVE1MOiBzdHJpbmcsIGRhdGFzZXQ6IGFueSwgaXNGaXJzdFBhZ2VMb2FkOiBib29sZWFuKSA9PiB7XG4gICAgICB0aGlzLnRyYWNraW5nQ2FsbGJhY2soY3VycmVudFN0YXR1cywgcHJldlN0YXR1cywgJGNvbnRhaW5lciwgbmV3UGFnZVJhd0hUTUwsIGRhdGFzZXQsIGlzRmlyc3RQYWdlTG9hZCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNob3BpZnlDYXJ0RXZlbnREaXNwYXRjaGVyLm9uKCdTaG9waWZ5Q2FydDphZGQnLCAoZGF0YToge2lkOiBudW1iZXIsIHF1YW50aXR5OiBudW1iZXIsIHByb3BlcnRpZXM6IGFueX0pID0+IHtcbiAgICAgIGlmIChuYXZpZ2F0b3IuZG9Ob3RUcmFjayA9PT0gJzEnKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ1RoZSB1c2VyIHdpc2hzIG5vIHRyYWNraW5nJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBpbnRlcmVzdFRhZyAmJiB0aGlzLnBpbnRlcmVzdFRhZy5lbmFibGVkICYmICh3aW5kb3cgYXMgYW55KS5waW50cmspIHtcbiAgICAgICAgKHdpbmRvdyBhcyBhbnkpLnBpbnRyaygndHJhY2snLCAnYWRkdG9jYXJ0Jyk7XG4gICAgICAgIHRoaXMuZGVidWcoJ3BpbnRlcmVzdCBhZGR0b2NhcnQgdHJhY2tlZCEnKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIFRyYWNraW5nU2VydmljZS5pbnN0YW5jZSA9IHRoaXM7XG4gIH1cblxuICBwdWJsaWMgY2hlY2tEaXNhYmxlVHJhY2tpbmdDb29raWVzKCkge1xuICAgIHRoaXMudGhlVHJhZGVEZXNrRGlzYWJsZWQgPSB0aGlzLnRoZVRyYWRlRGVza0Rpc2FibGVkIHx8IG5hdmlnYXRvci5kb05vdFRyYWNrID09PSAnMSc7XG4gICAgdGhpcy5nb29nbGVBbmFseXRpY3NEaXNhYmxlZCA9IHRoaXMuZ29vZ2xlQW5hbHl0aWNzRGlzYWJsZWQgfHwgbmF2aWdhdG9yLmRvTm90VHJhY2sgPT09ICcxJztcbiAgICB0aGlzLmZhY2Vib29rUGl4ZWxEaXNhYmxlZCA9IHRoaXMuZmFjZWJvb2tQaXhlbERpc2FibGVkIHx8IG5hdmlnYXRvci5kb05vdFRyYWNrID09PSAnMSc7XG4gICAgdGhpcy5waW50ZXJlc3RUYWdEaXNhYmxlZCA9IHRoaXMucGludGVyZXN0VGFnRGlzYWJsZWQgfHwgbmF2aWdhdG9yLmRvTm90VHJhY2sgPT09ICcxJztcbiAgfVxuXG4gIC8qKlxuICAgKiBCbG9jayB0aGUgcG9zc2ViaWxsaXR5IHRvIHN0b3JlIGNvb2tpZXNcbiAgICogQHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDE2MDYxNzQvMTQ2NTkxOVxuICAgKi9cbiAgcHVibGljIGJsb2NrQ29va2llcygpIHtcbiAgICBpZiAoIShkb2N1bWVudCBhcyBhbnkpLl9fZGVmaW5lR2V0dGVyX18pIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkb2N1bWVudCwgJ2Nvb2tpZScsIHtcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdDb29raWVzIGFyZSBibG9ja2VkLCBkbyBub3RoaW5nJyk7XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgY29uc29sZS53YXJuKCdDb29raWVzIGFyZSBibG9ja2VkLCBkbyBub3RoaW5nLiB2YWx1ZTonLCB2YWx1ZSk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgKGRvY3VtZW50IGFzIGFueSkuX19kZWZpbmVHZXR0ZXJfXygnY29va2llJywgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0Nvb2tpZXMgYXJlIGJsb2NrZWQsIGRvIG5vdGhpbmcnKTtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfSk7XG4gICAgICAoZG9jdW1lbnQgYXMgYW55KS5fX2RlZmluZVNldHRlcl9fKCdjb29raWUnLCAodmFsdWU6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0Nvb2tpZXMgYXJlIGJsb2NrZWQsIGRvIG5vdGhpbmcuIHZhbHVlOicsIHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVbmJsb2NrIGNvb2tpZXMsIHJlc3RvcmUgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uXG4gICAqL1xuICBwdWJsaWMgdW5ibG9ja0Nvb2tpZXMoKSB7XG4gICAgaWYgKCh0aGlzIGFzIGFueSkuX2Nvb2tpZSAmJiAodGhpcyBhcyBhbnkpLl9jb29raWUuZ2V0ICYmICh0aGlzIGFzIGFueSkuX2Nvb2tpZS5zZXQpIHtcbiAgICAgIGlmICghKGRvY3VtZW50IGFzIGFueSkuX19kZWZpbmVHZXR0ZXJfXykge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZG9jdW1lbnQsICdjb29raWUnLCB7XG4gICAgICAgICAgZ2V0OiAodGhpcyBhcyBhbnkpLl9jb29raWUuZ2V0LFxuICAgICAgICAgIHNldDogKHRoaXMgYXMgYW55KS5fY29va2llLnNldCxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAoZG9jdW1lbnQgYXMgYW55KS5fX2RlZmluZUdldHRlcl9fKCdjb29raWUnLCAodGhpcyBhcyBhbnkpLl9jb29raWUuZ2V0ICk7XG4gICAgICAgIChkb2N1bWVudCBhcyBhbnkpLl9fZGVmaW5lU2V0dGVyX18oJ2Nvb2tpZScsICh0aGlzIGFzIGFueSkuX2Nvb2tpZS5zZXQgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGdldCB0aGUga2V5cyBmb3IgZWFjaCBjb29raWUgbmFtZVxuICAgKi9cbiAgcHVibGljIGdldENvb2tpZUtleXMoKSB7XG4gICAgLy8gU2VwYXJhdGUga2V5IHZhbHVlIHBhaXJzXG4gICAgY29uc3QgY29va2llcyA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpO1xuICAgIGNvbnN0IGtleXM6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb29raWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBjb29raWVFbnRyeSA9IGNvb2tpZXNbaV0uc3BsaXQoJz0nKTtcbiAgICAgIC8vICBmaXJzdCBwYXJ0IG9mIHRoZSBzcGxpdCBzdHJpbmcgaG9sZHMgdGhlIGtleSAuLi5cbiAgICAgIGtleXMucHVzaChjb29raWVFbnRyeVswXS50cmltKCkpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5cztcbiAgfVxuXG4gIC8qKlxuICAgKiBkZWxldGUgY29va2llIGJ5IG5hbWVcbiAgICovXG4gIHB1YmxpYyBkZWxldGVDb29raWUobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5kZWJ1ZygnZGVsZXRlQ29va2llJywgYFwiJHtuYW1lfVwiYCk7XG4gICAgZG9jdW1lbnQuY29va2llID0gYCR7bmFtZX09OyBleHBpcmVzPSR7bmV3IERhdGUoMCkudG9VVENTdHJpbmcoKX07IE1heC1BZ2U9LTk5OTk5OTk5OyBwYXRoPS9gO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjb29raWVzIG9uIHRoZSBzZXJ2ZXJcbiAgICovXG4gIHB1YmxpYyBkZWxldGVDb29raWVPblNlcnZlcigpIHtcbiAgICB0aGlzLmRlYnVnKCdkZWxldGVDb29raWVPblNlcnZlciBub3QgaW1wbGVtZW50ZWQgeWV0Jyk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGFsbCBicm93c2VyIGNvb2tpZXMsIHBsZWFzZSBub3RlIHRoaXMgZG8gbm90IHJlbW92ZSB0aGUgY29va2llcyBzZXR0ZWQgYnkgc2hvcGlmeSBvbiB0aGUgc2VydmVyXG4gICAqIEBzZWUgaHR0cHM6Ly9zbmlwcGV0bGliLmNvbS9qcXVlcnkvcmVtb3ZlX2Nvb2tpZXNcbiAgICovXG4gIHB1YmxpYyByZW1vdmVDb29raWVzKGlnbm9yZTogc3RyaW5nW10gPSBbXSkge1xuICAgIGNvbnN0IGNvb2tpZUtleXMgPSB0aGlzLmdldENvb2tpZUtleXMoKTtcbiAgICB0aGlzLmRlYnVnKCdjb29raWVLZXlzJywgY29va2llS2V5cyk7XG4gICAgdGhpcy5kZWJ1ZygnaWdub3JlJywgaWdub3JlKTtcbiAgICAvLyBkZWxldGUgYWxsIGNvb2tpZXNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvb2tpZUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNvb2tpZUtleSA9IGNvb2tpZUtleXNbaV07XG4gICAgICBpZiAoaWdub3JlLmluY2x1ZGVzKGNvb2tpZUtleSkpIHtcbiAgICAgICAgdGhpcy5kZWJ1ZygnaWdub3JlIGNvb2tpZScsIGNvb2tpZUtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlbGV0ZUNvb2tpZShjb29raWVLZXkpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmRlbGV0ZUNvb2tpZSgnJyk7IC8vIHJlbW92ZSBjb29raWUgd2l0aG91dCBuYW1lXG4gICAgdGhpcy5kZWxldGVDb29raWVPblNlcnZlcigpO1xuICB9XG5cbiAgcHVibGljIHRyYWNraW5nQ2FsbGJhY2soY3VycmVudFN0YXR1czogSVN0YXRlLCBwcmV2U3RhdHVzOiBJU3RhdGUsICRjb250YWluZXI6IEpRdWVyeTxIVE1MRWxlbWVudD4sIG5ld1BhZ2VSYXdIVE1MOiBzdHJpbmcsIGRhdGFzZXQ6IGFueSwgaXNGaXJzdFBhZ2VMb2FkOiBib29sZWFuKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgaWYgKG5hdmlnYXRvci5kb05vdFRyYWNrID09PSAnMScpIHtcbiAgICAgIHRoaXMuZGVidWcoJ1RoZSB1c2VyIHdpc2hzIG5vIHRyYWNraW5nJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHNlbGYuZGVidWcoJ3RyYWNraW5nQ2FsbGJhY2snLCB2aWV3SWQsIGN1cnJlbnRTdGF0dXMsIHByZXZTdGF0dXMsIGRhdGFzZXQsIGlzRmlyc3RQYWdlTG9hZCk7XG4gICAgaWYgKHNlbGYudGhlVHJhZGVEZXNrLmVuYWJsZWQgJiYgKHdpbmRvdyBhcyBhbnkpW3RoaXMudGhlVHJhZGVEZXNrRGlzYWJsZVN0cl0gIT09IHRydWUpIHtcbiAgICAgIGlmICh0eXBlb2YoKHdpbmRvdyBhcyBhbnkpLnR0ZF9kb21fcmVhZHkpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICh3aW5kb3cgYXMgYW55KS50dGRfZG9tX3JlYWR5KCAoKSA9PiB7XG4gICAgICAgICAgLy8gc2VsZi5kZWJ1ZygnVFREVW5pdmVyc2FsUGl4ZWxBcGknLCAod2luZG93IGFzIGFueSkuVFREVW5pdmVyc2FsUGl4ZWxBcGkpO1xuICAgICAgICAgIGlmICh0eXBlb2YoKHdpbmRvdyBhcyBhbnkpLlRURFVuaXZlcnNhbFBpeGVsQXBpKSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29uc3QgdW5pdmVyc2FsUGl4ZWxBcGkgPSBuZXcgKHdpbmRvdyBhcyBhbnkpLlRURFVuaXZlcnNhbFBpeGVsQXBpKCk7XG4gICAgICAgICAgICB1bml2ZXJzYWxQaXhlbEFwaS5pbml0KHNlbGYudGhlVHJhZGVEZXNrLmFkdiwgW3NlbGYudGhlVHJhZGVEZXNrLnRhZ0lkWzFdXSwgc2VsZi50aGVUcmFkZURlc2suYmFzZVNyYyk7XG4gICAgICAgICAgICBzZWxmLmRlYnVnKCd0dGQgdHJhY2tlZCEnLCB1bml2ZXJzYWxQaXhlbEFwaS5nZXRWZXJzaW9uKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVidWcoJ3RoZVRyYWRlRGVzayBpcyBkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgICh3aW5kb3cgYXMgYW55KS5kYXRhTGF5ZXIgPSAod2luZG93IGFzIGFueSkuZGF0YUxheWVyIHx8IFtdO1xuICAgIGZ1bmN0aW9uIGd0YWcoLi4uYXJnczogYW55W10pIHtcbiAgICAgICh3aW5kb3cgYXMgYW55KS5kYXRhTGF5ZXIucHVzaChhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIGlmIChzZWxmLmdvb2dsZUFuYWx5dGljcy5lbmFibGVkICYmICh3aW5kb3cgYXMgYW55KVt0aGlzLmdvb2dsZUFuYWx5dGljc0Rpc2FibGVTdHJdICE9PSB0cnVlKSB7XG4gICAgICBpZiAoaXNGaXJzdFBhZ2VMb2FkKSB7XG4gICAgICAgIC8vIHRoaXMgaXMgYWxyZWFkeSB0cmFja2VkIGJ5IHRoZSBzaG9waWZ5IGV2ZW50IGxpc3RlbmVyIGNvZGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIG5ldmVyIGZyYW1ld29yayAgV2Vic2l0ZS1UYWcgKGd0YWcuanMpIGZvciBnb29nbGUgYW5hbHl0aWNzIGlzIHVzZWQ6XG4gICAgICAgIGd0YWcoJ2V2ZW50JywgJ3BhZ2VfdmlldycsIHtcbiAgICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6b2JqZWN0LWxpdGVyYWwta2V5LXF1b3Rlc1xuICAgICAgICAgICdzZW5kX3RvJzogc2VsZi5nb29nbGVBbmFseXRpY3MudHJhY2tpbmdJZCwgLy8gb2JqZWN0LWxpdGVyYWwta2V5LXF1b3Rlc1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCh3aW5kb3cgYXMgYW55KS5nYSkge1xuICAgICAgICAgICh3aW5kb3cgYXMgYW55KS5nYSgnc2VuZCcsICdwYWdldmlldycpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVidWcoJ2dvb2dsZUFuYWx5dGljcyBpcyBkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIGlmIChzZWxmLnBpbnRlcmVzdFRhZyAmJiBzZWxmLnBpbnRlcmVzdFRhZy5lbmFibGVkICYmICFpc0ZpcnN0UGFnZUxvYWQgJiYgKHdpbmRvdyBhcyBhbnkpLnBpbnRyaykge1xuICAgICAgKHdpbmRvdyBhcyBhbnkpLnBpbnRyaygndHJhY2snLCAncGFnZXZpc2l0Jyk7XG4gICAgICBzZWxmLmRlYnVnKCdwaW50ZXJlc3QgcGFnZXZpc2l0IHRyYWNrZWQhJyk7XG4gICAgfVxuXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=