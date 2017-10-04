/* component - ToolBar */
import $ from 'jQuery';
import * as FpUtils from 'FpUtils';
import * as Actions from 'Actions';
import * as Reducers from 'Reducers';

function __limitHintDefaultTextGen__(limit) {
  return `Can still upload ${limit} ${limit === 1 ? 'file' : 'files'}`;
}

function __renderOnFileDepotChange__($store, opts, $root) {
  const getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
  const fileLength = getFileDepot().order.length;

  if (opts.limit - fileLength > 0) {
    $root.find('[data-ref=addLocalInput]')
      .prop('disabled', false);

    $root.find('[data-ref=addLocalFakeButton]')
      .removeClass('rt-button-disabled');

    $root.find('[data-ref=addOnlineButton]')
      .prop('disabled', false)
      .removeClass('rt-button-disabled');
  } else {
    $root.find('[data-ref=addLocalInput]')
      .prop('disabled', true);

    $root.find('[data-ref=addLocalFakeButton]')
      .addClass('rt-button-disabled');

    $root.find('[data-ref=addOnlineButton]')
      .prop('disabled', true)
      .addClass('rt-button-disabled');
  }

  if (!fileLength) {
    $root
      .addClass('hint');

    $root.find('[data-ref=globalError]')
      .removeClass('rt-error-bubble');

    $root.find('[data-ref=limitHint]')
      .text(__limitHintDefaultTextGen__(opts.limit));
  } else {
    $root
      .removeClass('hint')
      .css('height', 'auto');

    $root.find('[data-ref=globalError]')
      .addClass('rt-error-bubble');

    const remains = opts.limit - fileLength;

    $root.find('[data-ref=limitHint]')
      .text(`Can still upload ${remains} ${remains === 1 ? 'file' : 'files'}`);
  }

  return $root;
}

function __renderOnGlobalErrorDepotChange__($store, opts, $root) {
  const getGlobalErrorDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GLOBAL_ERROR_DEPOT);
  const msg = getGlobalErrorDepot().msg;

  if (msg) {
    $root.find('[data-ref=limitHint]')
      .addClass('is-hidden');

    $root.find('[data-ref=globalError]')
      .text(msg)
      .removeClass('is-hidden');
  } else {
    $root.find('[data-ref=limitHint]')
      .removeClass('is-hidden');

    $root.find('[data-ref=globalError]')
      .text('')
      .addClass('is-hidden');
  }
}

/* exports */
export function gen($store, opts) {
  const getGalleryFilterDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_FILTER_DEPOT);
  const getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
  const getGlobalErrorDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GLOBAL_ERROR_DEPOT);

  const limit = opts.limit;

  const $hintText1 = $('<div />')
    .addClass('hint-text')
    .append($('<span />').text('Choose files from'));

  const $hintText2 = $('<div />')
    .addClass('hint-text')
    .append($('<span />').addClass('separator').text('or'))
    .append($('<span />').text('DRAG THEM HERE'));

  const $limitHintText = $('<div />')
    .attr('data-ref', 'limitHint')
    .addClass('limit-hint-text')
    .text(__limitHintDefaultTextGen__(opts.limit));

  const $globalError = $('<label />')
    .attr('data-ref', 'globalError')
    .addClass('global-error is-hidden')
    .text(getGlobalErrorDepot().msg);

  const $uploadIcon = $('<i />')
    .addClass('upload-icon')
    .addClass('fa')
    .addClass('fa-upload');

  const _$addLocalInput = $(`<input type="file" accept="${opts.accept}" capture />`) // hack for ie8, since .attr('type', 'file') act oddly
    .attr('data-ref', 'addLocalInput')
    .addClass('add-local-input')
    .attr('multiple', '')
    .change(e => {
      const $this = $(e.currentTarget);
      const files = $this[0].files;

      if (files.length) {
        if (files.length > opts.limit) {
          $store.dispatch(Actions.setGlobalError(Actions.GLOBAL_ERROR_OVERSELECT, opts.limit, getGlobalErrorDepot().timerToken));
        } else if (files.length + getFileDepot().order.length > opts.limit) {
          $store.dispatch(Actions.setGlobalError(Actions.GLOBAL_ERROR_OVERFLOW, opts.limit, getGlobalErrorDepot().timerToken));
        } else {
          $store.dispatch(Actions.setGlobalError(Actions.GLOBAL_ERROR_NONE, opts.limit, getGlobalErrorDepot().timerToken));
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

        $this.val('');
      }
    });

  const _$addLocalFakeButton = $('<div />')
    .attr('data-ref', 'addLocalFakeButton')
    .addClass('rt-button')
    .addClass('rt-button-mini')
    .addClass('rt-button-default')
    .text('LOCAL');

  const $addLocal = $('<label />')
    .addClass('action')
    .append(_$addLocalInput)
    .append(_$addLocalFakeButton);

  const $addOnline = $('<button />')
    .attr('data-ref', 'addOnlineButton')
    .attr('type', 'button')
    .addClass('action')
    .addClass('rt-button')
    .addClass('rt-button-mini')
    .addClass('rt-button-default')
    .text('ONLINE IMAGES')
    .click(() => {
      $store.dispatch(Actions.triggerGallery());
      $store.dispatch(Actions.fetchGalleryImage((getGalleryFilterDepot().categoryList)[getGalleryFilterDepot().category].val, getGalleryFilterDepot().page, opts.onFetchGallery));
    });

  const $wrap = $('<div />')
    .addClass('wrap')
    .append($uploadIcon)
    .append($hintText1)
    .append($addLocal)
    .append($('<span />').text('/').css({ margin: '0px 5px' }))
    .append($addOnline)
    .append($hintText2)
    .append($limitHintText)
    .append($globalError);

  const $root = $('<div />')
    .addClass('tool-bar')
    .append($wrap);

  $store.listen(Reducers.FILE_DEPOT, () => {
    __renderOnFileDepotChange__($store, opts, $root);
  });

  $store.listen(Reducers.GLOBAL_ERROR_DEPOT, () => {
    __renderOnGlobalErrorDepotChange__($store, opts, $root);
  });

  return __renderOnFileDepotChange__($store, opts, $root);
}