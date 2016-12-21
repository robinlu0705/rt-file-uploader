import { it, describe } from 'mocha';
import { expect } from 'chai';
import * as actions from '/src/actions';
import * as CONSTANTS from '/src/constants';
import layoutDepot from '/src/reducers/layoutDepot';

describe('layoutDepot', () => {
  it('updates the positions of thumbnails', () => {
    const action = {
      type: actions.UPDATE_LAYOUT,
      payload: [ {
        left: 0,
        top: 0
      }, {
        left: 3,
        top: 4
      } ]
    };

    const newState = layoutDepot(undefined, action);

    expect(newState.thumbnailLayouts[0].left).to.equal(0);
    expect(newState.thumbnailLayouts[0].top).to.equal(0);
    expect(newState.thumbnailLayouts[1].left).to.equal(3);
    expect(newState.thumbnailLayouts[1].top).to.equal(4);
  });
});
