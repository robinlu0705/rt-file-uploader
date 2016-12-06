import { connect } from 'react-redux';
import ToolBar from 'ToolBar';
import * as actions from 'actions';

function mapStateToProps(state) {
  return {
    _fileDepot: state.fileDepot,
    _galleryFilterDepot: state.galleryFilterDepot
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
  const { _fileDepot, _galleryFilterDepot } = stateProps;
  const { dispatch } = dispatchProps;

  return Object.assign({}, dispatchProps, ownProps, {
    showHint: _fileDepot.order.length <= 0,
    onLocalFileChange({ fileList, limit, onUpload, onDelete }) {
      dispatch(actions.uploadStart({
        currentFileEntities: _fileDepot.entities,
        currentFileOrder: _fileDepot.order,
        uploadFileList: fileList,
        limit: limit,
        runningID: _fileDepot.runningID,
        onUpload: onUpload,
        onDelete: onDelete
      }));
    },

    onGalleryImageFetch(onFetchGallery) {
      dispatch(actions.fetchGalleryImage(_galleryFilterDepot.categoryList[_galleryFilterDepot.category].val, _galleryFilterDepot.page, onFetchGallery));
    }
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ToolBar);
