/* functional programming utility functions */

/**
 * @param {...function}
 * @return {function}
 */
export function compose() {
  const funcs = arguments;
  return function() {
    let args = arguments;
    for (let i = funcs.length; i-- > 0;) {
      args = [ funcs[i].apply(this, args) ];
    }

    return args[0];
  };
}

/**
 * @param {function} f
 * @param {*...}
 */
export function curryIt(f) {
  const curriedParams = Array.prototype.slice.call(arguments, 1);
  return function() {
    const params = Array.prototype.slice.call(arguments, 0);
    return f.apply(this, curriedParams.concat(params));
  };
}
