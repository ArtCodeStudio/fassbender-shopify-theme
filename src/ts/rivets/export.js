/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * DS208: Avoid top-level this
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Rivets.factory
// --------------

// Rivets.js module factory.
var factory = function(sightglass) {
  // Integrate sightglass.
  Rivets.sightglass = sightglass;

  // Allow access to private members (for testing).
  Rivets.public._ = Rivets;

  // Return the public interface.
  return Rivets.public;
};

// Exports Rivets.js for CommonJS, AMD and the browser.
if (typeof (typeof module !== 'undefined' && module !== null ? module.exports : undefined) === 'object') {
  module.exports = Rivets.factory(require('sightglass'));
} else if ((typeof define === 'function') && define.amd) {
  define(['sightglass'], function(sightglass) {
    return this.rivets = Rivets.factory(sightglass);
  });
} else {
  this.rivets = Rivets.factory(sightglass);
}

