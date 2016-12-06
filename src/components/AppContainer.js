import { connect } from 'react-redux';
import App from 'App';
import * as actions from 'actions';

function mapStateToProps(state) {
  return {
    _fileDepot: state.fileDepot
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { _fileDepot } = stateProps;
  const { dispatch } = dispatchProps;

  return Object.assign({}, dispatchProps, ownProps, {
    onFileDrop({ fileList, limit, onUpload, onDelete }) {
      dispatch(actions.uploadStart({
        currentFileEntities: _fileDepot.entities,
        currentFileOrder: _fileDepot.order,
        uploadFileList: fileList,
        limit: limit,
        runningID: _fileDepot.runningID,
        onUpload: onUpload,
        onDelete: onDelete
      }));
    }
  });
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(App);
