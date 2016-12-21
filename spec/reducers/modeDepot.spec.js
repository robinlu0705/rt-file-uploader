import { it, describe } from 'mocha';
import { expect } from 'chai';
import * as actions from '/src/actions';
import * as CONSTANTS from '/src/constants';
import modeDepot from '/src/reducers/modeDepot';

describe('modeDepot', () => {
  it('switches to edit mode when editing starts', () => {
    const action = {
      type: actions.START_EDIT
    };

    const newState = modeDepot(undefined, action);

    expect(newState.mode).to.equal(CONSTANTS.EDIT_MODE);
  });

  it('switches to displaying mode when editing ends', () => {
    const action = {
      type: actions.END_EDIT
    };

    const newState = modeDepot(undefined, action);

    expect(newState.mode).to.equal(CONSTANTS.DISPLAY_MODE);
  });
});
