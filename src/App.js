/* component - App */
import * as Actions from 'Actions';
import * as FpUtils from 'FpUtils';
import * as Reducers from 'Reducers';

/* css prefix constants */
var IDENTIFIER = 'RT_FILE_UPLOADER';

/* exports */
export function gen($store, opts) {
  var limit = opts.limit

  var $root = $('<div />')
    .addClass(IDENTIFIER)
    .css('minHeight', opts.minHeight)
    .on('dragover', function(e) {
      e.preventDefault();
      $root.addClass('drag-over');
    })
    .on('dragleave', function(e) {
      e.preventDefault();
      $root.removeClass('drag-over');
    })
    .on('drop', function(e) {
      e.preventDefault();
      $root.removeClass('drag-over');
      var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
      var files = e.originalEvent.dataTransfer.files;
      $store.dispatch(Actions.uploadStart(files, limit, getFileDepot().runningID, opts.onUpload));
    });

  return $root;
};
