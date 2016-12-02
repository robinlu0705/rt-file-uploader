/* store utility functions */
import * as FpUtils from 'FpUtils';

/* constants */
const IDENTIFIER = 'RT_FILE_UPLOADER';

function __calcNewState__(reducer, state, action) {
  return reducer(state, action);
}

function __diffStates__(oldState, newState) {
  const ret = [];
  for (let key in newState) {
    if (newState[key] !== oldState[key]) {
      ret.push(key);
    }
  }

  return ret;
}

function __getStoreState__($store, statePart) {
  if (statePart) {
    return $store.state[statePart];
  } else {
    return $store.state;
  }
}

function __fireStoreChange__($store, IDENTIFIER, stateParts) {
  const prefix = IDENTIFIER.toString() || '';
  for (let i = 0; i < stateParts.length; i++) {
    $store.trigger(prefix + stateParts[i]);
  }
}

function __addStoreListener__($store, IDENTIFIER, statePart, handler) {
  const prefix = IDENTIFIER.toString() || '';
  $store.on(prefix + statePart, handler);
}

/* exports */
export function createStore(reducer, debug) {
  const $store = $('<div />');
  const reduce = FpUtils.curryIt(__calcNewState__, reducer);
  const fireChange = FpUtils.curryIt(__fireStoreChange__, $store, IDENTIFIER);
  const getState = FpUtils.curryIt(__getStoreState__, $store);
  const listen = FpUtils.curryIt(__addStoreListener__, $store, IDENTIFIER);

  $store.state = reducer({}, {});
  $store.state.__DEBUG__ = {
    action: {},
    diff: []
  };

  $store.getState = getState;
  $store.listen = listen;
  $store.dispatch = (action) => {
    if (typeof action === 'function') {
      action($store.dispatch);
    } else {
      const newState = reduce($store.state, action);
      const diff = __diffStates__($store.state, newState);

      if (debug) {
        const changedParts = {};

        for (let i = 0; i < diff.length; i++) {
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
}
