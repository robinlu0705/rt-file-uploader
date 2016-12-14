/* component - App */
import $ from 'jQuery';
import * as Actions from 'Actions';
import * as FpUtils from 'FpUtils';
import * as Reducers from 'Reducers';

/* css prefix constants */
const IDENTIFIER = 'RT_FILE_UPLOADER';

/* exports */
export function gen($store, opts) {
  const limit = opts.limit;
  const $root = $('<div />')
    .addClass(IDENTIFIER)
    .css('minHeight', opts.minHeight)
    .on('dragover', e => {
      e.preventDefault();
      $root.addClass('drag-over');
    })
    .on('dragleave', e => {
      e.preventDefault();
      $root.removeClass('drag-over');
    })
    .on('drop', e => {
      e.preventDefault();
      $root.removeClass('drag-over');

      const getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
      const getGlobalErrorDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GLOBAL_ERROR_DEPOT);
      const files = e.originalEvent.dataTransfer.files;

      if (files.length > opts.limit) {
        $store.dispatch(Actions.setGlobalError(Actions.GLOBAL_ERROR_OVERSELECT, opts.limit, getGlobalErrorDepot().timerToken));
      } else if (files.length + getFileDepot().order.length > opts.limit) {
        $store.dispatch(Actions.setGlobalError(Actions.GLOBAL_ERROR_OVERFLOW, opts.limit, getGlobalErrorDepot().timerToken));
      } else {
        $store.dispatch(Actions.setGlobalError(Actions.GLOBAL_ERROR_NONE), opts.limit, getGlobalErrorDepot().timerToken);
        $store.dispatch(Actions.uploadStart({
          currentFileEntities: getFileDepot().entities,
          currentFileOrder: getFileDepot().order,
          uploadFileList: files,
          limit: limit,
          runningID: getFileDepot().runningID,
          onUpload: opts.onUpload,
          onDelete: opts.onDelete
        }));
      }
    });

  return $root;
}
