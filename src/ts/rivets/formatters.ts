/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Core formatters
let formatters: any = {};
// Calls a function with arguments
formatters['call'] = function(value, ...args) {
	return value.call(this, ...Array.from(args));
};

export { formatters };