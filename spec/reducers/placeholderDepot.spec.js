import { it, describe } from 'mocha';
import { expect } from 'chai';
import * as actions from '/src/actions';
import placeholderDepot from '/src/reducers/placeholderDepot';

describe('placeholderDepot', () => {
  it('records the id of hovered target when editing starts', () => {
    const action = {
      type: actions.START_EDIT,
      payload: {
        entityID: 1
      }
    };

    const newState = placeholderDepot(undefined, action);

    expect(newState.hoverTarget).to.equal(1);
  });

  it('updates the id of hovered target while editing', () => {
    const action = {
      type: actions.UPDATE_PLACEHOLDER,
      payload: 2
    };

    const newState = placeholderDepot(undefined, action);

    expect(newState.hoverTarget).to.equal(2);
  });

  it('resets the id of hovered target when editing ends', () => {
    const action = {
      type: actions.END_EDIT
    };

    const newState = placeholderDepot(undefined, action);

    expect(newState.hoverTarget).to.be.null;
  });
});
