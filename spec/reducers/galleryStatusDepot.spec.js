import { it, describe } from 'mocha';
import { expect } from 'chai';
import * as actions from '/src/actions';
import galleryStatusDepot from '/src/reducers/galleryStatusDepot';

describe('galleryStatusDepot', () => {
  it('switches from closed state to opened state', () => {
    const action = {
      type: actions.TOGGLE_GALLERY
    };

    const initialState = {
      isOpened: false
    };

    const newState = galleryStatusDepot(initialState, action);

    expect(newState.isOpened).to.be.true;
  });

  it('switches from opened state to closed state', () => {
    const action = {
      type: actions.TOGGLE_GALLERY
    };

    const initialState = {
      isOpened: true
    };

    const newState = galleryStatusDepot(initialState, action);

    expect(newState.isOpened).to.be.false;
  });
});
