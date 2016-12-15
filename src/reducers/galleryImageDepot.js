import * as actions from '/src/actions';

const defaultState = {
  list: [],
  isFetching: false
};

export default (state = defaultState, action) => {
  const actionHandler = {
    [actions.REQUEST_GALLERY_IMAGE]() {
      return Object.assign({}, state, {
        isFetching: true,
        list: []
      });
    },

    [actions.RECEIVE_GALLERY_IMAGE]() {
      return Object.assign({}, state, {
        isFetching: false,
        list: action.payload
      });
    }
  };

  if (action.type in actionHandler) {
    return actionHandler[action.type]();
  }

  return state;
};
