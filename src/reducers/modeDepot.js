import * as actions from '/src/actions';
import * as CONSTANTS from '/src/constants';

const defaultState = {
  mode: CONSTANTS.DISPLAY_MODE
};

export default (state = defaultState, action) => {
  const actionHandler = {
    [actions.START_EDIT]() {
      return Object.assign({}, state, {
        mode: CONSTANTS.EDIT_MODE
      });
    },

    [actions.END_EDIT]() {
      return Object.assign({}, state, {
        mode: CONSTANTS.DISPLAY_MODE
      });
    }
  };

  if (action.type in actionHandler) {
    return actionHandler[action.type]();
  }

  return state;
};
