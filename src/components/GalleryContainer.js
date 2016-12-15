import { connect } from 'react-redux';
import Gallery from '/src/components/Gallery';
import * as actions from '/src/actions';

function mapStateToProps(state) {
  return {
    categoryOpts: state.galleryFilterDepot.categoryList,
    currentCategory: state.galleryFilterDepot.category,
    currentPage: state.galleryFilterDepot.page,
    items: state.galleryImageDepot.list,
    selection: state.gallerySelectionDepot.list,
    fileCount: state.fileDepot.order.length,
    isFetching: state.galleryImageDepot.isFetching,
    isOpened: state.galleryStatusDepot.isOpened,
    _gallerySelection: state.gallerySelectionDepot.list,
    _fileDepotRunningID: state.fileDepot.runningID
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
  const { _gallerySelection, _fileDepotRunningID, items } = stateProps;
  const { dispatch } = dispatchProps;

  return Object.assign({}, stateProps, dispatchProps, ownProps, {
    onUpload({ limit, onUploadFromGallery }) {
      const selection = _gallerySelection;
      if (selection.length) {
        dispatch(actions.uploadFromGalleryStart({
          uploadFiles: selection.map(i => ({
            url: items[i].url,
            userDefinedData: items[i].userDefinedData
          })),

          runningID: _fileDepotRunningID,
          limit: limit,
          onUploadFromGallery: onUploadFromGallery
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