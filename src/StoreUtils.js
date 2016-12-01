/* store utility functions */
import * as FpUtils from 'FpUtils';

/* constants */
var IDENTIFIER = 'RT_FILE_UPLOADER';

var __calcNewState__ = function(reducer, state, action) {
  return reducer(state, action);
};

var __diffStates__ = function(oldState, newState) {
  var ret = [];
  for (var key in newState) {
    if (newState[key] !== oldState[key]) {
      ret.push(key);
    }
  }

  return ret;
}

var __getStoreState__ = function($store, statePart) {
  if (statePart) {
    return $store.state[statePart];
  } else {
    return $store.state;
  }
};

var __fireStoreChange__ = function($store, IDENTIFIER, stateParts) {
  var prefix = IDENTIFIER.toString() || '';
  for (var i = 0; i < stateParts.length; i++) {
    $store.trigger(prefix + stateParts[i]);
  }
};

var __addStoreListener__ = function($store, IDENTIFIER, statePart, handler) {
  var prefix = IDENTIFIER.toString() || '';
  $store.on(prefix + statePart, handler);
};

/* exports */
export function createStore(reducer, debug) {
  var $store = $('<div />');
  var reduce = FpUtils.curryIt(__calcNewState__, reducer);
  var fireChange = FpUtils.curryIt(__fireStoreChange__, $store, IDENTIFIER);
  var getState = FpUtils.curryIt(__getStoreState__, $store);
  var listen = FpUtils.curryIt(__addStoreListener__, $store, IDENTIFIER);

  $store.state = reducer({}, {});
  $store.state.__DEBUG__ = {
    action: {},
    diff: []
  };

  $store.getState = getState;
  $store.listen = listen;
  $store.dispatch = function(action) {
    if (typeof action === 'function') {
      action($store.dispatch);
    } else {
      var newState = reduce($store.state, action);
      var diff = __diffStates__($store.state, newState);

      if (debug) {
        var changedParts = {};

        for (var i = 0; i < diff.length; i++) {
          changedParts[diff[i]] = newState[diff[i]];
        }

        console.log('\n===Action fired===');
        console.log('-> Action:');
        console.log(action);
        console.log('-> Changed parts: ');
        console.log(changedParts);
        console.log('===================\n');
      }

      if (diff.length) {
        $store.state = newState;
        fireChange(diff);
      }
    }
  };

  return $store;
};
