import { it, describe } from 'mocha';
import { expect } from 'chai';
import * as actions from '/src/actions';
import * as CONSTANTS from '/src/constants';
import globalErrorDepot from '/src/reducers/globalErrorDepot';

describe('globalErrorDepot', () => {
  it('sets error message and timer token for overflow', () => {
    const action = {
      type: actions.SET_GLOBAL_ERROR,
      payload: {
        errType: CONSTANTS.GLOBAL_ERROR_OVERFLOW,
        timerToken: 1
      }
    };

    const newState = globalErrorDepot(undefined, action);

    expect(newState.msg).to.equal('檔案已達限定上傳數，若要繼續上傳，請先刪除檔案');
    expect(newState.timerToken).to.equal(1);
  });

  it('sets error message and timer token for overselect', () => {
    const action = {
      type: actions.SET_GLOBAL_ERROR,
      payload: {
        errType: CONSTANTS.GLOBAL_ERROR_OVERSELECT,
        limit: 3,
        timerToken: 2
      }
    };

    const newState = globalErrorDepot(undefined, action);

    expect(newState.msg).to.equal(`最多僅可上傳 ${action.payload.limit} 個檔案`);
    expect(newState.timerToken).to.equal(2);
  });
});
