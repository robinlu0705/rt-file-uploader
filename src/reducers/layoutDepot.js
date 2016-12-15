import * as actions from '/src/actions';

const defaultState = {
  thumbnailLayouts: []
};

export default (state = defaultState, action) => {
  const actionHandler = {
    [actions.UPDATE_LAYOUT]() {
      return Object.assign({}, state, {
        thumbnailLayouts: action.payload
      });
    }
  };

  if (action.type in actionHandler) {
    return actionHandler[action.type]();
  }

  return state;
};
