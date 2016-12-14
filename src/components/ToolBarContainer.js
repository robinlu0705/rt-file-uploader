import { connect } from 'react-redux';
import ToolBar from 'ToolBar';
import * as actions from 'actions';
import * as CONSTANTS from 'constants';

function mapStateToProps(state) {
  return {
    errMsg: state.globalErrorDepot.msg,
    _fileDepotRunningID: state.fileDepot.runningID,
    _fileDepotOrder: state.fileDepot.order,
    _globalErrorDepotTimerToken: state.globalErrorDepot.timerToken,
    _galleryFilterDepotCategoryList: state.galleryFilterDepot.categoryList,
    _galleryFilterDepotCategory: state.galleryFilterDepot.category,
    _galleryFilterDepotPage: state.galleryFilterDepot.page
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    onGalleryToggle() {
      dispatch(actions.toggleGallery());
    }
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { _fileDepotRunningID, _fileDepotOrder, _globalErrorDepotTimerToken, _galleryFilterDepotCategoryList, _galleryFilterDepotCategory, _galleryFilterDepotPage } = stateProps;
  const { dispatch } = dispatchProps;

  return Object.assign({}, stateProps, dispatchProps, ownProps, {
    showHint: _fileDepotOrder.length <= 0,
    fileCount: _fileDepotOrder.length,
    onLocalFileChange({ fileList, limit, onUpload }) {
      if (fileList.length > limit) {
        dispatch(actions.setGlobalError(CONSTANTS.GLOBAL_ERROR_OVERSELECT, limit, _globalErrorDepotTimerToken));
      } else if (fileList.length + _fileDepotOrder.length > limit) {
        dispatch(actions.setGlobalError(CONSTANTS.GLOBAL_ERROR_OVERFLOW, limit, _globalErrorDepotTimerToken));
      } else {
        dispatch(actions.setGlobalError(CONSTANTS.GLOBAL_ERROR_NONE, limit, _globalErrorDepotTimerToken));
        dispatch(actions.uploadStart({
          uploadFileList: fileList,
          limit: limit,
          onUpload: onUpload,
          runningID: _fileDepotRunningID
        }));
      }
    },

    onGalleryImageFetch(onFetchGallery) {
      dispatch(actions.fetchGalleryImage(_galleryFilterDepotCategoryList[_galleryFilterDepotCategory].val, _galleryFilterDepotPage, onFetchGallery));
    }
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ToolBar);
