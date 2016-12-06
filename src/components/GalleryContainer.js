import { connect } from 'react-redux';
import Gallery from 'Gallery';
import * as actions from 'actions';

function mapStateToProps(state) {
  return {
    _galleryFilterDepot: state.galleryFilterDepot,
    _galleryImageDepot: state.galleryImageDepot,
    _gallerySelectionDepot: state.gallerySelectionDepot,
    _galleryStatusDepot: state.galleryStatusDepot,
    _fileDepot: state.fileDepot
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    onToggle() {
      dispatch(actions.toggleGallery());
    },

    onImageFetch({ categoryVal, page, onFetchGallery }) {
      dispatch(actions.fetchGalleryImage(categoryVal, page, onFetchGallery));
    },

    onFilterChange({ category, page }) {
      dispatch(actions.changeGalleryFilter(category, page));
    },

    onSelectionChange(newSelection) {
      dispatch(actions.changeGallerySelection(newSelection));
    }
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { _galleryFilterDepot, _galleryImageDepot, _gallerySelectionDepot, _galleryStatusDepot, _fileDepot } = stateProps;
  const { dispatch } = dispatchProps;
  return Object.assign({}, dispatchProps, ownProps, {
    categoryOpts: _galleryFilterDepot.categoryList,
    currentCategory: _galleryFilterDepot.category,
    currentPage: _galleryFilterDepot.page,
    items: _galleryImageDepot.list,
    selection: _gallerySelectionDepot.list,
    isFetching: _galleryImageDepot.isFetching,
    isOpened: _galleryStatusDepot.isOpened,
    onUpload({ limit, onUploadFromGallery, onDelete }) {
      const selection = _gallerySelectionDepot.list;
      if (selection.length) {
        dispatch(actions.uploadFromGalleryStart({
          currentFileEntities: _fileDepot.entities,
          currentFileOrder: _fileDepot.order,
          uploadFiles: selection.map(i => ({
            url: _galleryImageDepot.list[i].url,
            userDefinedData: _galleryImageDepot.list[i].userDefinedData
          })),

          runningID: _fileDepot.runningID,
          limit: limit,
          onUploadFromGallery: onUploadFromGallery,
          onDelete: onDelete
        }));
      }
    }
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Gallery);