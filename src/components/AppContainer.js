import { connect } from 'react-redux';
import App from 'App';
import * as actions from 'actions';
import * as CONSTANTS from 'constants';

function mapStateToProps(state) {
  return {
    _fileDepotRunningID: state.fileDepot.runningID,
    _fileDepotOrder: state.fileDepot.order,
    _globalErrorDepotTimerToken: state.globalErrorDepot.timerToken
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { _fileDepotRunningID, _fileDepotOrder, _globalErrorDepotTimerToken } = stateProps;
  const { dispatch } = dispatchProps;

  return Object.assign({}, stateProps, dispatchProps, ownProps, {
    onFileDrop({ fileList, limit, onUpload }) {
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
    }
  });
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(App);
