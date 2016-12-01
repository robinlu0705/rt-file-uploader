/* component - ToolBar */
import * as FpUtils from 'FpUtils';
import * as Actions from 'Actions';
import * as Reducers from 'Reducers';

function __renderOnFileDepotChange__($store, opts, $root) {
  const limit = opts.limit;
  const getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);

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
  const getGalleryFilterDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_FILTER_DEPOT);

  const limit = opts.limit;

  const $hintText1 = $('<div />')
    .addClass('hint-text')
    .append($('<span />').text('選擇檔案'));

  const $hintText2 = $('<div />')
    .addClass('hint-text')
    .append($('<span />').addClass('separator').text('或'))
    .append($('<span />').text('拖曳檔案至此'));

  const $uploadIcon = $('<i />')
    .addClass('upload-icon')
    .addClass('fa')
    .addClass('fa-upload');

  const _$addLocalInput = $('<input type="file" accept="image/*;capture=camera"/>') // hack for ie8, since .attr('type', 'file') act oddly
    .addClass('add-local-input')
    .attr('multiple', '')
    .change(e => {
      const getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
      const $this = $(e.currentTarget);
      const files = $this[0].files;
      $store.dispatch(Actions.uploadStart(files, limit, getFileDepot().runningID, opts.onUpload));
      $this.val('');
   });

  const _$addLocalFakeButton = $('<div />')
    .addClass('rt-button')
    .addClass('rt-button-mini')
    .addClass('rt-button-default')
    .text('本地檔案');

  const $addLocal = $('<label />')
    .addClass('action')
    .append(_$addLocalInput)
    .append(_$addLocalFakeButton);

  const $addRuten = $('<button />')
    .attr('type', 'button')
    .addClass('action')
    .addClass('rt-button')
    .addClass('rt-button-mini')
    .addClass('rt-button-default')
    .text('露天圖庫')
    .click(e => {
      $store.dispatch(Actions.triggerGallery());
      $store.dispatch(Actions.fetchGalleryImage((getGalleryFilterDepot().categoryList)[getGalleryFilterDepot().category].val, getGalleryFilterDepot().page, opts.onFetchGallery));
    });

  const $wrap = $('<div />')
    .addClass('wrap')
    .append($uploadIcon)
    .append($hintText1)
    .append($addLocal)
    .append($addRuten)
    .append($hintText2);

  const $root = $('<div />')
    .addClass('tool-bar')
    .append($wrap);

  $store.listen(Reducers.FILE_DEPOT, () => {
    __renderOnFileDepotChange__($store, opts, $root);
  });

  return __renderOnFileDepotChange__($store, opts, $root);
};
