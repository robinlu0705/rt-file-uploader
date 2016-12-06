import * as actions from 'actions';

const defaultState = {
  isOpened: false
};

export default (state = defaultState, action) => {
  const actionHandler = {
    [actions.TOGGLE_GALLERY]() {
      return Object.assign({}, state, {
        isOpened: !state.isOpened
      });
    }
  };

  if (action.type in actionHandler) {
    return actionHandler[action.type]();
  }

  return state;
};
