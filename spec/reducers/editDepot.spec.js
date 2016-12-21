import { it, describe } from 'mocha';
import { expect } from 'chai';
import * as actions from '/src/actions';
import editDepot from '/src/reducers/editDepot';

describe('editDepot', () => {
  it('records the tartget under editing and its positions', () => {
    const action = {
      type: actions.START_EDIT,
      payload: {
        entityID: 1,
        cursorX: 101,
        cursorY: 102
      }
    };

    const newState = editDepot(undefined, action);

    expect(newState.target).to.equal(1);
    expect(newState.startPos.x).to.equal(101);
    expect(newState.startPos.y).to.equal(102);
    expect(newState.currentPos.x).to.equal(101);
    expect(newState.currentPos.y).to.equal(102);
  });

  it('keeps updating the current position of the target while editing', () => {
    const action = {
      type: actions.UPDATE_EDIT,
      payload: {
        cursorX: 201,
        cursorY: 202
      }
    };

    const newState = editDepot(undefined, action);

    expect(newState.currentPos.x).to.equal(201);
    expect(newState.currentPos.y).to.equal(202);
  });
});
