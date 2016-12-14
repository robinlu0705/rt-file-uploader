import * as actions from 'actions';
import * as CONSTANTS from 'constants';

const defaultState = {
  msg: '',
  timerToken: null
};

export default (state = defaultState, action) => {
  const actionHandler = {
    [actions.SET_GLOBAL_ERROR]() {
      let msg = '';

      switch (action.payload.errType) {
        case CONSTANTS.GLOBAL_ERROR_OVERFLOW: {
          msg = '檔案已達限定上傳數，若要繼續上傳，請先刪除檔案';
          break;
        }

        case CONSTANTS.GLOBAL_ERROR_OVERSELECT: {
          msg = `最多僅可上傳 ${action.payload.limit} 個檔案`;
          break;
        }
      }

      return Object.assign({}, state, {
        msg: msg,
        timerToken: action.payload.timerToken
      });
    }
  };

  if (action.type in actionHandler) {
    return actionHandler[action.type]();
  }

  return state;
};
