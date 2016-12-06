import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from 'reducers';
import * as CONSTANTS from 'constants';
import AppContainer from 'components/AppContainer';
import * as actions from 'actions';

function __seasonOpts__(opts) {
  return Object.assign({}, opts, {
    minHeight: opts.minHeight || 160,
    thumbnailWidth: opts.thumbnailWidth || 120,
    thumbnailHeight: opts.thumbnailHeight || 90,
    limit: opts.limit || 3,
    galleryFilterOpts: opts.galleryFilterOpts instanceof Array ? opts.galleryFilterOpts : []
  });
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

  store.dispatch(actions.setGalleryFilterOpts(opts.galleryFilterOpts));

  ReactDom.render(
    <Provider store={store}>
      <AppContainer opts={opts} />
    </Provider>,

    document.getElementById(id)
  );

  return {
    getFiles() {
      return store.fileDepot.order.map(id => {
        const entity = store.fileDepot.entities[id];
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
      store.dispatch(actions.addFile(store.fileDepot.entities, store.fileDepot.order, list.map(item => ({
        url: item.url,
        userDefinedData: item.userDefinedData
      })), opts.limit, store.fileDepot.runningID, opts.onDelete));
    }
  };
};

APP_NAMESPACE.FILE_STATUS = {
  COMPLETE: CONSTANTS.FILE_STATUS_COMPLETE,
  LOADING: CONSTANTS.FILE_STATUS_LOADING,
  ERROR: CONSTANTS.FILE_STATUS_ERROR,
  TIMEOUT: CONSTANTS.FILE_STATUS_TIMEOUT
};
