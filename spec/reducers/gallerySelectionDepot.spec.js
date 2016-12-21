import { it, describe } from 'mocha';
import { expect } from 'chai';
import * as actions from '/src/actions';
import gallerySelectionDepot from '/src/reducers/gallerySelectionDepot';

describe('gallerySelectionDepot', () => {
  it('changes selection list', () => {
    const action = {
      type: actions.CHANGE_GALLERY_SELECTION,
      payload: [ 1, 2, 3 ]
    };

    const newState = gallerySelectionDepot(undefined, action);

    expect(newState.list[0]).to.equal(1);
    expect(newState.list[1]).to.equal(2);
    expect(newState.list[2]).to.equal(3);
  });

  it('clears selection list when requesting gallery images', () => {
    const action = {
      type: actions.REQUEST_GALLERY_IMAGE
    };

    const newState = gallerySelectionDepot(undefined, action);

    expect(newState.list.length).to.equal(0);
  });
});
