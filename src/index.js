import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '/src/reducers';
import * as CONSTANTS from '/src/constants';
import AppContainer from '/src/components/AppContainer';
import * as actions from '/src/actions';
import watch from 'redux-watch';

function __seasonOpts__(opts) {
  return Object.assign({}, opts, {
    minHeight: opts.minHeight || 160,
    thumbnailWidth: opts.thumbnailWidth || 120,
    thumbnailHeight: opts.thumbnailHeight || 90,
    limit: opts.limit || 3,
    galleryFilterOpts: opts.galleryFilterOpts instanceof Array ? opts.galleryFilterOpts : []
  });
}

function __findDeletedFileEntities__(newFileEntities, oldFileEntities) {
  const ret = {};
  for (let id in oldFileEntities) {
    if (oldFileEntities.hasOwnProperty(id)) {
      if (!(newFileEntities.hasOwnProperty(id))) {
        ret[id] = oldFileEntities[id];
      }
    }
  }

  return ret;
}

window.RT = window.RT || {};
const APP_NAMESPACE = window.RT.FileUploader = {};

APP_NAMESPACE.gen = (id, opts) => {
  opts = __seasonOpts__(opts);

  const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducer);
  const fileDepotWatcher = watch(store.getState, 'fileDepot.entities');

  store.subscribe(fileDepotWatcher((newVal, oldVal) => {
    const onDelete = opts.onDelete;
    if (typeof onDelete === 'function') {
      const deletedFileEntities = __findDeletedFileEntities__(newVal, oldVal);
      const deletedFileArray = [];

      for (let id in deletedFileEntities) {
        if (deletedFileEntities.hasOwnProperty(id)) {
          const entity = deletedFileEntities[id];
          deletedFileArray.push({
            id: id,
            url: entity.url,
            status: entity.status,
            progress: entity.progress,
            errMsg: entity.errMsg,
            userDefinedData: entity.userDefinedData
          });
        }
      }

      if (deletedFileArray.length > 0) {
        onDelete(deletedFileArray);
      }
    }
  }));

  store.dispatch(actions.setGalleryFilterOpts(opts.galleryFilterOpts));

  ReactDom.render(
    <Provider store={store}>
      <AppContainer opts={opts} />
    </Provider>,

    document.getElementById(id)
  );

  return {
    getFiles() {
      return store.getState().fileDepot.order.map(id => {
        const entity = store.getState().fileDepot.entities[id];
        return {
          id: id,
          url: entity.url,
          status: entity.status,
          progress: entity.progress,
          errMsg: entity.errMsg,
          userDefinedData: entity.userDefinedData
        };
      });
    },

    setFiles(list) {
      store.dispatch(actions.addFile(list.map(item => ({
        url: item.url,
        userDefinedData: item.userDefinedData
      })), opts.limit, store.getState().fileDepot.runningID));
    }
  };
};

APP_NAMESPACE.FILE_STATUS = {
  COMPLETE: CONSTANTS.FILE_STATUS_COMPLETE,
  LOADING: CONSTANTS.FILE_STATUS_LOADING,
  ERROR: CONSTANTS.FILE_STATUS_ERROR,
  TIMEOUT: CONSTANTS.FILE_STATUS_TIMEOUT
};
