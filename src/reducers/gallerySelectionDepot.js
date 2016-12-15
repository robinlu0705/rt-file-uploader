import * as actions from '/src/actions';

const defaultState = {
  list: []
};

export default (state = defaultState, action) => {
  const actionHandler = {
    [actions.CHANGE_GALLERY_SELECTION]() {
      return Object.assign({}, state, {
        list: action.payload
      });
    },

    [actions.REQUEST_GALLERY_IMAGE]() {
      return Object.assign({}, state, {
        list: []
      });
    }
  };

  if (action.type in actionHandler) {
    return actionHandler[action.type]();
  }

  return state;
};
