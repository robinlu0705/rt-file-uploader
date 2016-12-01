/* will add FileUploader to window.RT */
import * as FpUtils from 'FpUtils';
import * as StoreUtils from 'StoreUtils';
import * as Utils from 'Utils';
import * as Reducers from 'Reducers';
import * as Actions from 'Actions';
import * as App from 'App';
import * as ToolBar from 'ToolBar';
import * as ThumbnailViewer from 'ThumbnailViewer';
import * as Gallery from 'Gallery';


window.RT = window.RT || {};
const APP_NAMESPACE = RT.FileUploader = {};

/* main functions */
function __seasonOpts__(opts) {
  return $.extend({}, opts, {
    minHeight: opts.minHeight || 160,
    thumbnailWidth: opts.thumbnailWidth || 120,
    thumbnailHeight: opts.thumbnailHeight || 90,
    limit: opts.limit || 3,
    galleryFilterOpts: opts.galleryFilterOpts instanceof Array ? opts.galleryFilterOpts : []
  });
};

function __createStore__(opts) {
  /* create store with initial state */
  const combinedReducer = (state, action) => {
    const newState = {};
    newState[Reducers.FILE_DEPOT] = Reducers.fileDepot(state[Reducers.FILE_DEPOT], action);
    newState[Reducers.LAYOUT_DEPOT] = Reducers.layoutDepot(state[Reducers.LAYOUT_DEPOT], action);
    newState[Reducers.MODE_DEPOT] = Reducers.modeDepot(state[Reducers.MODE_DEPOT], action);
    newState[Reducers.EDIT_DEPOT] = Reducers.editDepot(state[Reducers.EDIT_DEPOT], action);
    newState[Reducers.PLACEHOLDER_DEPOT] = Reducers.placeholderDepot(state[Reducers.PLACEHOLDER_DEPOT], action);
    newState[Reducers.GALLERY_STATUS_DEPOT] = Reducers.galleryStatusDepot(state[Reducers.GALLERY_STATUS_DEPOT], action);
    newState[Reducers.GALLERY_FILTER_DEPOT] = Reducers.galleryFilterDepot(state[Reducers.GALLERY_FILTER_DEPOT], action);
    newState[Reducers.GALLERY_IMAGE_DEPOT] = Reducers.galleryImageDepot(state[Reducers.GALLERY_IMAGE_DEPOT], action);
    newState[Reducers.GALLERY_SELECTION_DEPOT] = Reducers.gallerySelectionDepot(state[Reducers.GALLERY_SELECTION_DEPOT], action);

    return newState;
  };

  return StoreUtils.createStore(combinedReducer, opts.debug);
};

function __genUI__($store, opts) {
  /* create file loader ui */
  const $App = App.gen($store, opts);
  const $ToolBar = ToolBar.gen($store, opts);
  const $ThumbnailViewer = ThumbnailViewer.gen($store, opts);
  const $Gallery = Gallery.gen($store, opts);

  const appendComponentToApp = FpUtils.curryIt(Utils.appendNode, $App);

  appendComponentToApp($ToolBar);
  appendComponentToApp($ThumbnailViewer);
  appendComponentToApp($Gallery);

  return $App;
};

/* export to APP_NAMESPACE */
/**
 * @param {$elm} $container
 * @param {Object} opts
 * @param {number} opts.minHeight
 * @param {number} opts.thumbnailWidth
 * @param {number} opts.thumbnailHeight
 * @param {number} opts.limit
 */
APP_NAMESPACE.gen = ($container, opts) => {
  opts = __seasonOpts__(opts);
  const appendUIToContainer = FpUtils.curryIt(Utils.appendNode, $container);
  const $store = __createStore__(opts);

  $store.dispatch(Actions.setGalleryFilterOpts(opts.galleryFilterOpts));

  const $App = __genUI__($store, opts);

  appendUIToContainer($App);

  return {
    getFiles() {
      const getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
      return getFileDepot().order.map(id => {
        const entity = getFileDepot().entities[id];
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
      const getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
      $store.dispatch(Actions.addFile(list.map(item => ({
        url: item.url,
        userDefinedData: item.userDefinedData
      })), opts.limit, getFileDepot().runningID));
    }
  };
};

APP_NAMESPACE.FILE_STATUS = {
  COMPLETE: Reducers.FILE_STATUS_COMPLETE,
  LOADING: Reducers.FILE_STATUS_LOADING,
  ERROR: Reducers.FILE_STATUS_ERROR,
  TIMEOUT: Reducers.FILE_STATUS_TIMEOUT
};
