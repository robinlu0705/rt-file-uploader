import { it, describe } from 'mocha';
import { expect } from 'chai';
import * as actions from '/src/actions';
import * as CONSTANTS from '/src/constants';
import fileDepot from '/src/reducers/fileDepot';

describe('fileDepot', () => {
  it('adds files with 0% uploading progress', () => {
    const action = {
      type: actions.ADD_LOADING_FILE,
      payload: {
        IDList: [ 3, 4, 5 ],
        limit: 3,
        newRunningID: 5
      }
    };

    const newState = fileDepot(undefined, action);

    expect(newState.order.length).to.equal(3);
    expect(Object.keys(newState.entities).length).to.equal(3);
    expect(newState.runningID).to.equal(5);
  });

  it('updates the uploading progress of files', () => {
    const initialState = {
      entities: {
        3: {}
      },
      order: [ 3 ]
    };

    const action = {
      type: actions.UPDATE_LOADING_FILE,
      payload: [ {
        id: 3,
        url: 'some-url',
        status: CONSTANTS.FILE_STATUS_COMPLETE,
        errMsg: 'some-error',
        progress: 100
      } ]
    };

    const newState = fileDepot(initialState, action);

    expect(newState.entities[3].progress).to.equal(100);
    expect(newState.entities[3].status).to.equal(CONSTANTS.FILE_STATUS_COMPLETE);
    expect(newState.entities[3].url).to.equal('some-url');
    expect(newState.entities[3].errMsg).to.equal('some-error');
  });

  it('adds files with 100% uploading progress', () => {
    const action = {
      type: actions.ADD_FILE,
      payload: {
        list: [ {
          id: 3,
          url: 'some-url'
        } ],

        limit: 1,
        newRunningID: 3
      }
    };

    const newState = fileDepot(undefined, action);

    expect(newState.entities[3].progress).to.equal(100);
    expect(newState.entities[3].status).to.equal(CONSTANTS.FILE_STATUS_COMPLETE);
    expect(newState.entities[3].url).to.equal('some-url');
    expect(newState.entities[3].errMsg).to.equal('');
  });

  it('deletes files', () => {
    const initialState = {
      entities: {
        1: {},
        2: {}
      },
      order: [ 1, 2 ]
    };

    const action = {
      type: actions.DELETE_FILE,
      payload: [ 1 ]
    }

    const newState = fileDepot(initialState, action);

    expect(newState.order.length).to.equal(1);
    expect(Object.keys(newState.entities).length).to.equal(1);
  });

  it('reorders the files', () => {
    const initialState = {
      order: [1, 2, 3]
    };

    const action = {
      type: actions.END_EDIT,
      payload: {
        editTarget: 1,
        hoverTarget: 3
      }
    };

    const newState = fileDepot(initialState, action);

    expect(newState.order[0]).to.equal(2);
    expect(newState.order[1]).to.equal(3);
    expect(newState.order[2]).to.equal(1);
  });
});
