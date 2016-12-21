import { it, describe } from 'mocha';
import { expect } from 'chai';
import * as actions from '/src/actions';
import galleryFilterDepot from '/src/reducers/galleryFilterDepot';

describe('galleryFilterDepot', () => {
  it('sets the filter options', () => {
    const action = {
      type: actions.SET_GALLERY_FILTER_OPTS,
      payload: [ {
        categoryName: 'A',
        categoryVal: 'a',
        totalPages: 1
      }, {
        categoryName: 'B',
        categoryVal: 'b',
        totalPages: 2
      } ]
    };

    const newState = galleryFilterDepot(undefined, action);

    expect(newState.categoryList[0].text).to.equal('A');
    expect(newState.categoryList[0].val).to.equal('a');
    expect(newState.categoryList[0].totalPages).to.equal(1);
    expect(newState.categoryList[1].text).to.equal('B');
    expect(newState.categoryList[1].val).to.equal('b');
    expect(newState.categoryList[1].totalPages).to.equal(2);
  });

  it('changes the filter options', () => {
    const action = {
      type: actions.CHANGE_GALLERY_FILTER,
      payload: {
        category: 'a',
        page: 3
      }
    };

    const newState = galleryFilterDepot(undefined, action);

    expect(newState.category).to.equal('a');
    expect(newState.page).to.equal(3);
  });

  it('switches to fetching state when requesting gallery images', () => {
    const action = {
      type: actions.REQUEST_GALLERY_IMAGE
    };

    const newState = galleryFilterDepot(undefined, action);

    expect(newState.isFetching).to.be.true;
  });

  it('switches to non-fetching state when receiving gallery image', () => {
    const action = {
      type: actions.RECEIVE_GALLERY_IMAGE
    };

    const newState = galleryFilterDepot(undefined, action);

    expect(newState.isFetching).to.be.false;
  });
});
