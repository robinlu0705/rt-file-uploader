import * as actions from 'actions';

const defaultState = {
  hoverTarget: null
};

export default (state = defaultState, action) => {
  const actionHandler = {
    [actions.START_EDIT]() {
      return Object.assign({}, state, {
        hoverTarget: action.payload.entityID
      });
    },

    [actions.UPDATE_PLACEHOLDER]() {
      return Object.assign({}, state, {
        hoverTarget: action.payload
      });
    },

    [actions.END_EDIT]() {
      return Object.assign({}, state, {
        hoverTarget: null
      });
    }
  };

  if (action.type in actionHandler) {
    return actionHandler[action.type]();
  }

  return state;
};
