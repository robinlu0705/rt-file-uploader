import { connect } from 'react-redux';
import App from 'App';
import * as actions from 'actions';

function mapStateToProps(state) {
  return {
    _fileDepotRunningID: state.fileDepot.runningID
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { _fileDepotRunningID } = stateProps;
  const { dispatch } = dispatchProps;

  return Object.assign({}, dispatchProps, ownProps, {
    onFileDrop({ fileList, limit, onUpload }) {
      dispatch(actions.uploadStart({
        uploadFileList: fileList,
        limit: limit,
        onUpload: onUpload,
        runningID: _fileDepotRunningID
      }));
    }
  });
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(App);
