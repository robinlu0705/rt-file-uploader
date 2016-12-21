import { it, describe } from 'mocha';
import { expect } from 'chai';
import * as actions from '/src/actions';
import galleryImageDepot from '/src/reducers/galleryImageDepot';

describe('galleryImageDepot', () => {
  it('clears all images and switches to fetching state when request starts', () => {
    const action = {
      type: actions.REQUEST_GALLERY_IMAGE
    };

    const newState = galleryImageDepot(undefined, action);

    expect(newState.isFetching).to.be.true;
    expect(newState.list.length).to.equal(0);
  });

  it('updates images and switches to non-fetching state when receive images', () => {
    const action = {
      type: actions.RECEIVE_GALLERY_IMAGE,
      payload: [ {
        url: 'a'
      }, {
        url: 'b'
      } ]
    };

    const newState = galleryImageDepot(undefined, action);

    expect(newState.isFetching).to.be.false;
    expect(newState.list[0].url).to.equal('a');
    expect(newState.list[1].url).to.equal('b');
  });
});
