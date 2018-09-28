//Define the OpenProfileId object
function OpenProfileId() {

  // Helper functions

  // START Plugins getters for IE.
  // Cf. http://www.matthewratzloff.com/blog/2007/06/26/detecting-plugins-in-internet-explorer-and-a-few-hints-for-all-the-others/
  function getAdobeReaderPluginIE() {
      var isInstalled = false,
          version = '',
          control = null,
          temp = '',
          name = '';

      try {
          // AcroPDF.PDF is used by version 7 and later
          temp = 'AcroPDF.PDF';
          control = new ActiveXObject(temp);
      }
      catch (e) {
      }

      if (!control) {
          try {
              // PDF.PdfCtrl is used by version 6 and earlier
              temp = 'PDF.PdfCtrl';
              control = new ActiveXObject(temp);
          }
          catch (e) {
          }
      }

      if (control) {
          try {
              isInstalled = true;
              name = temp;
              version = control.GetVersions().split(',');
              version = version[0].split('=');
              version = parseFloat(version[1]);
          }
          catch (e) {
          }
      }

      return { "isInstalled": isInstalled, "version": version, "name": name };
  }

  function getFlashPlayerIE() {
      var isInstalled = false,
          version = '',
          control = null,
          temp = '',
          name = '';

      try {
          temp = 'ShockwaveFlash.ShockwaveFlash';
          control = new ActiveXObject(temp);
      }
      catch (e) {
      }

      if (control) {
          try {
              isInstalled = true;
              name = temp;
              version = control.GetVariable('$version').substring(4);
              version = version.split(',');
              version = parseFloat(version[0] + '.' + version[1]);
          }
          catch (e) {
          }
      }

      return { "isInstalled": isInstalled, "version": version, "name": name };
  }

  function getJavaIE() {
      // The JRE (formerly Java Virtual Machine, or JVM) is actually more difficult to handle than you would think. Determining if Java is installed is easy�a quick call to navigator.javaEnabled() returns a simple Boolean. The problem is detecting the version and provider (Microsoft or Sun) you need to load an applet.
      var isInstalled = false,
          version = '',
          name = '';

      try {
          isInstalled = navigator.javaEnabled();
          name = isInstalled ? 'Java' : '';
      }
      catch (e) {
      }

      return { "isInstalled": isInstalled, "version": version, "name": name };
  }

  function getQuickTimeIE() {
      var isInstalled = false,
          version = '',
          control = null,
          temp = '',
          name = '';

      try {
          temp = 'QuickTime.QuickTime';
          control = new ActiveXObject(temp);
      }
      catch (e) {
      }

      if (control) {
          try {
              isInstalled = true;
              name = temp;
              version = control.QuickTimeVersion.toString(16); // Convert to hex
              version = version.substring(0, 1) + '.' + version.substring(1, 3);
              version = parseFloat(version);
          }
          catch (e) {
          }
      }

      return { "isInstalled": isInstalled, "version": version, "name": name };
  }

  function getRealPlayerIE() {
      var isInstalled = false,
          version = '',
          definedControls = [
              'rmocx.RealPlayer G2 Control',
              'rmocx.RealPlayer G2 Control.1',
              'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
              'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
              'RealPlayer'
          ],
          control = null,
          temp = '',
          name = '';

      for (var i = 0; i < definedControls.length; i++) {
          try {
              control = new ActiveXObject(definedControls[i]);
          }
          catch (e) {
              continue;
          }
          if (control) {
              temp = definedControls[i];
              break;
          }
      }

      if (control) {
          try {
              isInstalled = true;
              name = temp;
              version = control.GetVersionInfo();
              version = parseFloat(version);
          }
          catch (e) {
          }
      }

      return { "isInstalled": isInstalled, "version": version, "name": name };
  }

  function getShockwavePlayerIE() {
      var isInstalled = false,
          version = '',
          control = null,
          temp = '',
          name = '';

      try {
          temp = 'SWCtl.SWCtl';
          control = new ActiveXObject(temp);
      }
      catch (e) {
      }

      if (control) {
          try {
              isInstalled = true;
              name = temp;
              version = control.ShockwaveVersion('').split('r');
              version = parseFloat(version[0]);
          }
          catch (e) {
          }
      }

      return { "isInstalled": isInstalled, "version": version, "name": name };
  }

  function getWindowsMediaPlayerIE() {
      var isInstalled = false,
          version = '',
          control = null,
          temp = '',
          name = '';

      try {
          temp = 'WMPlayer.OCX';
          control = new ActiveXObject(temp);
      }
      catch (e) {
      }

      if (control) {
          try {
              isInstalled = true;
              name = temp;
              version = parseFloat(control.versionInfo);
          }
          catch (e) {
          }
      }

      return { "isInstalled": isInstalled, "version": version, "name": name };
  }
  // END Plugins getters for IE.


  function getPluginsList() {
      var delimiter = "|",
          pluginsList = "",
          plugins = {},
          pluginsTemp = [];

      try {
          if (window.navigator.plugins && window.navigator.plugins.length) {
              // This works on all browsers except IE
              for (var i = 0, l = window.navigator.plugins.length; i < l; i++) {
                  var plugin_name = window.navigator.plugins[i]["name"] || "";

                  // have we already added this plugin?
                  if (!plugins.hasOwnProperty(plugin_name)) {
                      plugins[plugin_name] = '';
                      pluginsTemp.push(plugin_name);
                  }
              }
              pluginsList = pluginsTemp.join(delimiter);
          }
          else if (window.ActiveXObject) {
              pluginsList = getAdobeReaderPluginIE().name + delimiter +
                  getFlashPlayerIE().name + delimiter +
                  getJavaIE().name + delimiter +
                  getQuickTimeIE().name + delimiter +
                  getRealPlayerIE().name + delimiter +
                  getShockwavePlayerIE().name + delimiter +
                  getWindowsMediaPlayerIE().name;
          }
      }
      catch (err1) {
      }

      return pluginsList;
  }

  function getGmtOffset() {
      var localTime = new Date(),
          tz = localTime.getTimezoneOffset() / 60 * (-1);

      tz = (tz > 0 ? "+" : "") + tz;

      return "GMT" + tz;
  }

  /*
   * START Hashing algo
   *
   * Joseph Myer's md5() algorithm, modified to hash unicode characters as UTF-8.
   *
   * Copyright 1999-2010, Joseph Myers, Paul Johnston, Greg Holt, Will Bond <will@wbond.net>
   * http://www.myersdaily.org/joseph/javascript/md5-text.html
   * http://pajhome.org.uk/crypt/md5
   *
   * Released under the BSD license
   * http://www.opensource.org/licenses/bsd-license
   */
  function md5cycle(x, k) {
      var a = x[0], b = x[1], c = x[2], d = x[3];

      a = ff(a, b, c, d, k[0], 7, -680876936);
      d = ff(d, a, b, c, k[1], 12, -389564586);
      c = ff(c, d, a, b, k[2], 17, 606105819);
      b = ff(b, c, d, a, k[3], 22, -1044525330);
      a = ff(a, b, c, d, k[4], 7, -176418897);
      d = ff(d, a, b, c, k[5], 12, 1200080426);
      c = ff(c, d, a, b, k[6], 17, -1473231341);
      b = ff(b, c, d, a, k[7], 22, -45705983);
      a = ff(a, b, c, d, k[8], 7, 1770035416);
      d = ff(d, a, b, c, k[9], 12, -1958414417);
      c = ff(c, d, a, b, k[10], 17, -42063);
      b = ff(b, c, d, a, k[11], 22, -1990404162);
      a = ff(a, b, c, d, k[12], 7, 1804603682);
      d = ff(d, a, b, c, k[13], 12, -40341101);
      c = ff(c, d, a, b, k[14], 17, -1502002290);
      b = ff(b, c, d, a, k[15], 22, 1236535329);

      a = gg(a, b, c, d, k[1], 5, -165796510);
      d = gg(d, a, b, c, k[6], 9, -1069501632);
      c = gg(c, d, a, b, k[11], 14, 643717713);
      b = gg(b, c, d, a, k[0], 20, -373897302);
      a = gg(a, b, c, d, k[5], 5, -701558691);
      d = gg(d, a, b, c, k[10], 9, 38016083);
      c = gg(c, d, a, b, k[15], 14, -660478335);
      b = gg(b, c, d, a, k[4], 20, -405537848);
      a = gg(a, b, c, d, k[9], 5, 568446438);
      d = gg(d, a, b, c, k[14], 9, -1019803690);
      c = gg(c, d, a, b, k[3], 14, -187363961);
      b = gg(b, c, d, a, k[8], 20, 1163531501);
      a = gg(a, b, c, d, k[13], 5, -1444681467);
      d = gg(d, a, b, c, k[2], 9, -51403784);
      c = gg(c, d, a, b, k[7], 14, 1735328473);
      b = gg(b, c, d, a, k[12], 20, -1926607734);

      a = hh(a, b, c, d, k[5], 4, -378558);
      d = hh(d, a, b, c, k[8], 11, -2022574463);
      c = hh(c, d, a, b, k[11], 16, 1839030562);
      b = hh(b, c, d, a, k[14], 23, -35309556);
      a = hh(a, b, c, d, k[1], 4, -1530992060);
      d = hh(d, a, b, c, k[4], 11, 1272893353);
      c = hh(c, d, a, b, k[7], 16, -155497632);
      b = hh(b, c, d, a, k[10], 23, -1094730640);
      a = hh(a, b, c, d, k[13], 4, 681279174);
      d = hh(d, a, b, c, k[0], 11, -358537222);
      c = hh(c, d, a, b, k[3], 16, -722521979);
      b = hh(b, c, d, a, k[6], 23, 76029189);
      a = hh(a, b, c, d, k[9], 4, -640364487);
      d = hh(d, a, b, c, k[12], 11, -421815835);
      c = hh(c, d, a, b, k[15], 16, 530742520);
      b = hh(b, c, d, a, k[2], 23, -995338651);

      a = ii(a, b, c, d, k[0], 6, -198630844);
      d = ii(d, a, b, c, k[7], 10, 1126891415);
      c = ii(c, d, a, b, k[14], 15, -1416354905);
      b = ii(b, c, d, a, k[5], 21, -57434055);
      a = ii(a, b, c, d, k[12], 6, 1700485571);
      d = ii(d, a, b, c, k[3], 10, -1894986606);
      c = ii(c, d, a, b, k[10], 15, -1051523);
      b = ii(b, c, d, a, k[1], 21, -2054922799);
      a = ii(a, b, c, d, k[8], 6, 1873313359);
      d = ii(d, a, b, c, k[15], 10, -30611744);
      c = ii(c, d, a, b, k[6], 15, -1560198380);
      b = ii(b, c, d, a, k[13], 21, 1309151649);
      a = ii(a, b, c, d, k[4], 6, -145523070);
      d = ii(d, a, b, c, k[11], 10, -1120210379);
      c = ii(c, d, a, b, k[2], 15, 718787259);
      b = ii(b, c, d, a, k[9], 21, -343485551);

      x[0] = add32(a, x[0]);
      x[1] = add32(b, x[1]);
      x[2] = add32(c, x[2]);
      x[3] = add32(d, x[3]);
  }

  function cmn(q, a, b, x, s, t) {
      a = add32(add32(a, q), add32(x, t));
      return add32((a << s) | (a >>> (32 - s)), b);
  }

  function ff(a, b, c, d, x, s, t) {
      return cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }

  function gg(a, b, c, d, x, s, t) {
      return cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }

  function hh(a, b, c, d, x, s, t) {
      return cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function ii(a, b, c, d, x, s, t) {
      return cmn(c ^ (b | (~d)), a, b, x, s, t);
  }

  function md51(s) {
      // Converts the string to UTF-8 "bytes" when necessary
      if (/[\x80-\xFF]/.test(s)) {
          s = unescape(encodeURI(s));
      }
      txt = '';
      var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i;
      for (i = 64; i <= s.length; i += 64) {
          md5cycle(state, md5blk(s.substring(i - 64, i)));
      }
      s = s.substring(i - 64);
      var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (i = 0; i < s.length; i++)
          tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
      tail[i >> 2] |= 0x80 << ((i % 4) << 3);
      if (i > 55) {
          md5cycle(state, tail);
          for (i = 0; i < 16; i++) tail[i] = 0;
      }
      tail[14] = n * 8;
      md5cycle(state, tail);
      return state;
  }

  function md5blk(s) { /* I figured global was faster.   */
      var md5blks = [], i; /* Andy King said do it this way. */
      for (i = 0; i < 64; i += 4) {
          md5blks[i >> 2] = s.charCodeAt(i) +
          (s.charCodeAt(i + 1) << 8) +
          (s.charCodeAt(i + 2) << 16) +
          (s.charCodeAt(i + 3) << 24);
      }
      return md5blks;
  }

  var hex_chr = '0123456789abcdef'.split('');

  function rhex(n) {
      var s = '', j = 0;
      for (; j < 4; j++)
          s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] +
              hex_chr[(n >> (j * 8)) & 0x0F];
      return s;
  }

  function hex(x) {
      for (var i = 0; i < x.length; i++)
          x[i] = rhex(x[i]);
      return x.join('');
  }

  function md5(s) {
      return hex(md51(s));
  }

  /* this function is much faster, so if possible we use it. Some IEs are the
  only ones I know of that need the idiotic second function, generated by an
  if clause.  */
  function add32(a, b) {
      return (a + b) & 0xFFFFFFFF;
  }

  if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
      function add32(x, y) {
          var lsw = (x & 0xFFFF) + (y & 0xFFFF),
              msw = (x >> 16) + (y >> 16) + (lsw >> 16);
          return (msw << 16) | (lsw & 0xFFFF);
      }
  }
  // END Hashing algo

  function getHash(str) {
      return md5(str);
  }

  // OpenProfileId functions
  this.getId = function () {
      var hash = '';

      try {
          var ua = window.navigator.userAgent,
              plugins = getPluginsList(),
              timezone = getGmtOffset(),
              screenWidth = window.screen.width,
              screenHeight = window.screen.height,
              screenColorDepth = window.screen.pixelDepth,
              id = ua + plugins + timezone + screenWidth + screenHeight + screenColorDepth;

          hash = getHash(id);
      }
      catch (err2) {
      };

      return hash;
  };

  this.getVersion = function () {
      return "1.1";
  };

  this.getSite = function () {
      return window.location.host + window.location.pathname;
  };
};

/**
* Pulled from jQuery.
* Used to wait for the DOM to load before calling function.
* Fixes issues if body is not loaded yet; we need to wait.
*/
var ttd_dom_ready = (function () {

  var readyList,
      DOMContentLoaded,
      class2type = {};
  class2type["[object Boolean]"] = "boolean";
  class2type["[object Number]"] = "number";
  class2type["[object String]"] = "string";
  class2type["[object Function]"] = "function";
  class2type["[object Array]"] = "array";
  class2type["[object Date]"] = "date";
  class2type["[object RegExp]"] = "regexp";
  class2type["[object Object]"] = "object";

  var ReadyObj = {
      // Is the DOM ready to be used? Set to true once it occurs.
      isReady: false,
      // A counter to track how many items to wait for before
      // the ready event fires. See #6781
      readyWait: 1,
      // Hold (or release) the ready event
      holdReady: function (hold) {
          if (hold) {
              ReadyObj.readyWait++;
          } else {
              ReadyObj.ready(true);
          }
      },
      // Handle when the DOM is ready
      ready: function (wait) {
          // Either a released hold or an DOMready/load event and not yet ready
          if ((wait === true && !--ReadyObj.readyWait) || (wait !== true && !ReadyObj.isReady)) {
              // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
              if (!document.body) {
                  return setTimeout(ReadyObj.ready, 1);
              }

              // Remember that the DOM is ready
              ReadyObj.isReady = true;
              // If a normal DOM Ready event fired, decrement, and wait if need be
              if (wait !== true && --ReadyObj.readyWait > 0) {
                  return;
              }
              // If there are functions bound, to execute
              readyList.resolveWith(document, [ReadyObj]);

              // Trigger any bound ready events
              //if ( ReadyObj.fn.trigger ) {
              //    ReadyObj( document ).trigger( "ready" ).unbind( "ready" );
              //}
          }
      },
      bindReady: function () {
          if (readyList) {
              return;
          }
          readyList = ReadyObj._Deferred();

          // Catch cases where $(document).ready() is called after the
          // browser event has already occurred.
          if (document.readyState === "complete") {
              // Handle it asynchronously to allow scripts the opportunity to delay ready
              return setTimeout(ReadyObj.ready, 1);
          }

          // Mozilla, Opera and webkit nightlies currently support this event
          if (document.addEventListener) {
              // Use the handy event callback
              document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
              // A fallback to window.onload, that will always work
              window.addEventListener("load", ReadyObj.ready, false);

              // If IE event model is used
          } else if (document.attachEvent) {
              // ensure firing before onload,
              // maybe late but safe also for iframes
              document.attachEvent("onreadystatechange", DOMContentLoaded);

              // A fallback to window.onload, that will always work
              window.attachEvent("onload", ReadyObj.ready);

              // If IE and not a frame
              // continually check to see if the document is ready
              var toplevel = false;

              try {
                  toplevel = window.frameElement == null;
              } catch (e) { }

              if (document.documentElement.doScroll && toplevel) {
                  doScrollCheck();
              }
          }
      },
      _Deferred: function () {
          var // callbacks list
              callbacks = [],
              // stored [ context , args ]
              fired,
              // to avoid firing when already doing so
              firing,
              // flag to know if the deferred has been cancelled
              cancelled,
              // the deferred itself
              deferred = {

                  // done( f1, f2, ...)
                  done: function () {
                      if (!cancelled) {
                          var args = arguments,
                              i,
                              length,
                              elem,
                              type,
                              _fired;
                          if (fired) {
                              _fired = fired;
                              fired = 0;
                          }
                          for (i = 0, length = args.length; i < length; i++) {
                              elem = args[i];
                              type = ReadyObj.type(elem);
                              if (type === "array") {
                                  deferred.done.apply(deferred, elem);
                              } else if (type === "function") {
                                  callbacks.push(elem);
                              }
                          }
                          if (_fired) {
                              deferred.resolveWith(_fired[0], _fired[1]);
                          }
                      }
                      return this;
                  },

                  // resolve with given context and args
                  resolveWith: function (context, args) {
                      if (!cancelled && !fired && !firing) {
                          // make sure args are available (#8421)
                          args = args || [];
                          firing = 1;
                          try {
                              while (callbacks[0]) {
                                  callbacks.shift().apply(context, args);//shifts a callback, and applies it to document
                              }
                          }
                          finally {
                              fired = [context, args];
                              firing = 0;
                          }
                      }
                      return this;
                  },

                  // resolve with this as context and given arguments
                  resolve: function () {
                      deferred.resolveWith(this, arguments);
                      return this;
                  },

                  // Has this deferred been resolved?
                  isResolved: function () {
                      return !!(firing || fired);
                  },

                  // Cancel
                  cancel: function () {
                      cancelled = 1;
                      callbacks = [];
                      return this;
                  }
              };

          return deferred;
      },
      type: function (obj) {
          return obj == null ?
              String(obj) :
              class2type[Object.prototype.toString.call(obj)] || "object";
      }
  }
  // The DOM ready check for Internet Explorer
  function doScrollCheck() {
      if (ReadyObj.isReady) {
          return;
      }

      try {
          // If IE is used, use the trick by Diego Perini
          // http://javascript.nwbox.com/IEContentLoaded/
          document.documentElement.doScroll("left");
      } catch (e) {
          setTimeout(doScrollCheck, 1);
          return;
      }

      // and execute any waiting functions
      ReadyObj.ready();
  }
  // Cleanup functions for the document ready method
  if (document.addEventListener) {
      DOMContentLoaded = function () {
          document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
          ReadyObj.ready();
      };

  } else if (document.attachEvent) {
      DOMContentLoaded = function () {
          // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
          if (document.readyState === "complete") {
              document.detachEvent("onreadystatechange", DOMContentLoaded);
              ReadyObj.ready();
          }
      };
  }
  function ready(fn) {
      // Attach the listeners
      ReadyObj.bindReady();

      var type = ReadyObj.type(fn);

      // Add the callback
      readyList.done(fn);//readyList is result of _Deferred()
  }
  return ready;
})();

//Define the TTDUniversalPixelApi object.
function TTDUniversalPixelApi(optionalTopLevelUrl) {
  //Make sure this matches with the loader script version and
  //corresponding universal_pixel.<upLoaderScriptVersion>.js exists.
  var upLoaderScriptVersion = "1.1.3";

  this.getVersion = function () {
      return upLoaderScriptVersion;
  };

  // universal_pixel.js
  this.init = function (adv, tag_ids, base_src, dyn_params) {

      // Context: The signature for init used to be (adv, tag_ids, base_src, verifyCallback, dyn_params)
      //          We removed verifyCallback (a string), but we still have this function be called out in the wild
      //          To make everyone happy we just remove the fourth argument if it's a string, and move the fifth
      //          argument (dynamic parameters) into its spot. At this point, the arguments match up with the signature. 
      if (typeof arguments[3] === 'string') {
          arguments[3] = null;
          if (arguments.length > 4){
              for (var i=4; i<arguments.length; i++){
                  arguments[i-1] = arguments[i];
              }
          }
      }
      
      if (!adv || adv == "" || !tag_ids || tag_ids.length <= 0) {
          return;
      }

      var embedElem = document.getElementsByTagName('body')[0];
      if (!embedElem) {
          return;
      }

      var openProfileId = new OpenProfileId();
      var src_with_params = "";

      var openStatId = openProfileId.getId();
      var openStatIdVersion = openProfileId.getVersion();

      paramMap = {
          "MonetaryValue": "v",
          "MonetaryValueFormat": "vf"
      };

      var optionalParams = [];

      if (typeof (_pixelParams) !== 'undefined') {
          for (var i in _pixelParams) {
              var value = _pixelParams[i];
              var key = paramMap[i];

              // Make sure we have a valid key and value
              // Also check that the value doesn't match the macro replacement format
              if (key && value && !(/%%.*%%/i.test(value)))
                  optionalParams.push(key + "=" + encodeURIComponent(value));
          }
      }

      var advParam = "adv=" + adv;
      var upParams = "upid=" + tag_ids.join(",");

      // Use the given toplevel url or try to figure it out ourself
      var ref = optionalTopLevelUrl || TryFindTopMostReferrer();

      src_with_params = base_src
          + "?" + advParam
          + "&ref=" + encodeURIComponent(ref)
          + "&" + upParams
          + "&osi=" + openStatId
          + "&osv=" + openStatIdVersion
          //This is the script version adn should always match the version of the loader script.
          + "&upv=" + this.getVersion();

      if (dyn_params) {
          for(var param in dyn_params) {
              src_with_params = src_with_params + "&" + param + "=" + dyn_params[param];
          }
      }

      if (optionalParams.length > 0)
          src_with_params = src_with_params + "&" + optionalParams.join("&");

      // 
      // GDPR Alert!
      // if we are executing on a page that has integrated with a Consent Management Provider (CMP), then we need to wait until
      // user consent has been gathered, either via an onscreen consent screen or a cache cookie from a previously shown consent screen. the CMP code is
      // responsible for doing this and we can count on a standard __cmp function to exist if the page has loaded a CMP. once consent is available
      // we get called in a callback that can then fire the pixel. if there's no CMP, then we fire the pixel right away
      // https://github.com/InteractiveAdvertisingBureau/GDPR-Transparency-and-Consent-Framework/blob/master/CMP%20JS%20API%20v1.1%20Final.md#CMP-JS-API
      //
      if (typeof (__cmp) === 'function') {
          __cmp('getConsentData', null, firePixel);
      }
      else {
          firePixel();
      }


      function firePixel(cmpResult) {

          function getGdprAppliesParam(gdprApplies) {
              return gdprApplies ? "1" : "0";
          }

          if (cmpResult != null) {
              src_with_params = src_with_params +
                  "&gdpr=" +
                   getGdprAppliesParam(cmpResult.gdprApplies) +
                  "&gdpr_consent=" +
                  cmpResult.consentData;
          }


          var iframe = document.createElement("iframe");
          iframe.setAttribute("id", "universal_pixel");
          iframe.setAttribute("allowTransparency", true);
          iframe.setAttribute("height", 0);
          iframe.setAttribute("width", 0);
          iframe.setAttribute("style", "display:none;");
          iframe.setAttribute("src", src_with_params);

          function addIframe() {
              embedElem.appendChild(iframe);
          }

          if (document.readyState === "complete") {
              setTimeout(addIframe, 0);
          }
          else if (window.addEventListener) {
              window.addEventListener("load", addIframe);
          }
          else if (window.attachEvent) { // Support for IE8 and below
              window.attachEvent("onload", addIframe);
          }
          else {
              addIframe();
          }
      }


  };
  // Extract a value from the query string of a full url
  function GetQueryStringValue(url, name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(url);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  // Walks up to the top most IFRAME that can still be accessed without violating same-origin
  // policy and retrieves it's document's referrer value which is a URL for the parent window.
  // Before IFRAMEs are traveresed we attempt to read the top.location in case we are in the same
  // domain.
  function TryFindTopMostReferrer() {

      var currentWindow = window;
      var referrerTrace = '';
      var hasError = false;
      try {
          //Accessing the property of the location would either succeed or fail with XSS error.
          if (top.location.href) {
              referrerTrace = top.location.href;
          }
      }
      catch (error) {
          hasError = true;
      }

      if (hasError) {
          while (true) {
              try {
                  //Accessing the property of the document would either succeed or fail with XSS error.
                  referrerTrace = currentWindow.document.referrer;

                  if (window.parent != currentWindow) {
                      currentWindow = window.parent;
                  }
                  else {
                      break;
                  }
              } catch (error) {
                  break;
              }
          }
      }

      // This is a targeted fix for buckmason.com who puts our pixel into multiple levels of
      // iframes that preventing us from getting the real top level url. Fortunately, they put
      // the top level url on the query string of the url we were able to get. Charles 02/2015
      if (-1 < referrerTrace.indexOf('cloudfront.net'))
          referrerTrace = GetQueryStringValue(referrerTrace, 'url') || referrerTrace;

      return referrerTrace;
  }
}
