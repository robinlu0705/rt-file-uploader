/* component - ToolBar */
import * as FpUtils from 'FpUtils';
import * as Actions from 'Actions';
import * as Reducers from 'Reducers';

var __renderOnFileDepotChange__ = function($store, opts, $root) {
  var limit = opts.limit;
  var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);

  if (!getFileDepot().order.length) {
    $root
      .addClass('hint');
  } else {
    $root
      .removeClass('hint')
      .css('height', 'auto');
  }

  return $root;
};

/* exports */
export function gen($store, opts) {
  var getGalleryFilterDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_FILTER_DEPOT);

  var limit = opts.limit;

  var $hintText1 = $('<div />')
    .addClass('hint-text')
    .append($('<span />').text('選擇檔案'));

  var $hintText2 = $('<div />')
    .addClass('hint-text')
    .append($('<span />').addClass('separator').text('或'))
    .append($('<span />').text('拖曳檔案至此'));

  var $uploadIcon = $('<i />')
    .addClass('upload-icon')
    .addClass('fa')
    .addClass('fa-upload');

  var _$addLocalInput = $('<input type="file" accept="image/*;capture=camera"/>') // hack for ie8, since .attr('type', 'file') act oddly
    .addClass('add-local-input')
    .attr('multiple', '')
    .change(function(e) {
      var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
      var $this = $(this);
      var files = $this[0].files;
      $store.dispatch(Actions.uploadStart(files, limit, getFileDepot().runningID, opts.onUpload));
      $this.val('');
   });

  var _$addLocalFakeButton = $('<div />')
    .addClass('rt-button')
    .addClass('rt-button-mini')
    .addClass('rt-button-default')
    .text('本地檔案');

  var $addLocal = $('<label />')
    .addClass('action')
    .append(_$addLocalInput)
    .append(_$addLocalFakeButton);

  var $addRuten = $('<button />')
    .attr('type', 'button')
    .addClass('action')
    .addClass('rt-button')
    .addClass('rt-button-mini')
    .addClass('rt-button-default')
    .text('露天圖庫')
    .click(function() {
      $store.dispatch(Actions.triggerGallery());
      $store.dispatch(Actions.fetchGalleryImage((getGalleryFilterDepot().categoryList)[getGalleryFilterDepot().category].val, getGalleryFilterDepot().page, opts.onFetchGallery));
    });

  var $wrap = $('<div />')
    .addClass('wrap')
    .append($uploadIcon)
    .append($hintText1)
    .append($addLocal)
    .append($addRuten)
    .append($hintText2);

  var $root = $('<div />')
    .addClass('tool-bar')
    .append($wrap);

  $store.listen(Reducers.FILE_DEPOT, function() {
    __renderOnFileDepotChange__($store, opts, $root);
  });

  return __renderOnFileDepotChange__($store, opts, $root);
};
