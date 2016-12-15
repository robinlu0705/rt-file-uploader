import * as actions from '/src/actions';

const defaultState = {
  target: null,
  startPos: {
    x: 0,
    y: 0
  },

  currentPos: {
    x: 0,
    y: 0
  }
};

export default (state = defaultState, action) => {
  const actionHandler = {
    [actions.START_EDIT]() {
      return Object.assign({}, state, {
        target: action.payload.entityID,
        startPos: {
          x: action.payload.cursorX,
          y: action.payload.cursorY
        },

        currentPos: {
          x: action.payload.cursorX,
          y: action.payload.cursorY
        }
      });
    },

    [actions.UPDATE_EDIT]() {
      return Object.assign({}, state, {
        currentPos: {
          x: action.payload.cursorX,
          y: action.payload.cursorY
        }
      });
    }
  };

  if (action.type in actionHandler) {
    return actionHandler[action.type]();
  }

  return state;
};
