window.RT = window.RT || {};

(function(namespace, $) {
/* functional programming helpers */
  /**
   * @param {...function} f
   * @return {function}
   */
  var compose = function(f) {
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
  var curryIt = function(f, arg) {
    var curriedParams = Array.prototype.slice.call(arguments, 1);
    return function() {
      var params = Array.prototype.slice.call(arguments, 0);
      return f.apply(this, curriedParams.concat(params));
    };
  };
/**/

/* utility functions */
  var checkEnv = function(userAgent) {
    return '';
  };

  var appendNode = function($target, $source) {
    $target.append($source);
    return $target;
  };
/**/

/* store */
  var createStore = function($elm, initState) {
    for (key in initState) {
      $elm.attr(key, initState[key]);
    }

    return $elm;
  };

  var getStorePart = function($store, dataAttr) {
    return $store.attr(dataAttr);
  };

  var setStorePart = function($store, dataAttr, data) {
    $store.attr(dataAttr, data);
  };
/**/

/* ui updating */
  var updateCount = function($elm, value) {
    $elm.text(value);
  };
/**/

/* components */
  var calcer = function($store) {
    var getStoreCalcerCount = curryIt(getStorePart, $store, CALCER_COUNT);
    var setStoreCalcerCount = curryIt(setStorePart, $store, CALCER_COUNT);

    var $btn1 = $("<button />")
      .text('add')
      .click(function() {
        var count = Number(getStoreCalcerCount()) + 1;
        setStoreCalcerCount(count);

        updateCount($count, count)
      });

    var $btn2 = $("<button />")
      .text('sub')
      .click(function() {
        var count = Number(getStoreCalcerCount()) - 1;
        count = count >= 0 ? count : 0;
        setStoreCalcerCount(count);

        updateCount($count, count)
      });

    var $count = $("<h1 />")
      .text(getStorePart($store, 'data-calcer-count'));

    return $("<div />")
      .append($count)
      .append($btn1)
      .append($btn2)
  };
/**/

/* constants */
var CALCER_COUNT = 'data-calcer-count';
/**/

/* main functions */
  var seasonOpts = function(opts) {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return $.extend({}, opts, {
      uiType: checkEnv(userAgent)
    });
  };

  var genUI = function(opts) {
    var $UI = $("<div />")
      .addClass('rt-file-loader');

    var initState = {};
    initState[CALCER_COUNT] = 0;

    $store = createStore($UI, initState);

    $UI.append(calcer($store));
    return $UI;
  };
/**/

  /**
   * @param {$elm} $container
   * @param {Object} opts
   */
  namespace.fileLoader = function($container, opts) {
    var appendNodeToRoot = curryIt(appendNode, $container);
    var execute = compose(appendNodeToRoot, genUI, seasonOpts);
    execute(opts);
  };
}(RT, $));
