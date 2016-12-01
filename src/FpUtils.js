/* functional programming utility functions */

/**
 * @param {...function} f
 * @return {function}
 */
export function compose(f) {
  var funcs = arguments;
  return function() {
    var args = arguments;
    for (var i = funcs.length; i-- > 0;) {
      args = [ funcs[i].apply(this, args) ];
    }

    return args[0];
  };
};

/**
 * @param {function} f
 * @param {*...} arg
 */
export function curryIt(f, arg) {
  var curriedParams = Array.prototype.slice.call(arguments, 1);
  return function() {
    var params = Array.prototype.slice.call(arguments, 0);
    return f.apply(this, curriedParams.concat(params));
  };
};
