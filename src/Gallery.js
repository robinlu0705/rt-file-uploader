/* component - Gallery */
import $ from 'jQuery';
import * as FpUtils from 'FpUtils';
import * as Reducers from 'Reducers';
import * as Actions from 'Actions';

function __limitHintTextGen__(limit) {
  return ` - 尚可選擇 ${limit}`;
}

function __render__($store, opts, $root) {
  /* get states */
  const getGalleryStatusDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_STATUS_DEPOT);
  const getGalleryFilterDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_FILTER_DEPOT);
  const getGalleryImageDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_IMAGE_DEPOT);
  const getGallerySelectionDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_SELECTION_DEPOT);
  const getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);

  if (getGalleryStatusDepot().isOpened) {
    $root.addClass('is-opened');
  }

  const $bg = $('<div />')
    .addClass('overlay')
    .click(function() {
      $store.dispatch(Actions.triggerGallery());
    });

  const $limitHint = $('<div />')
    .attr('data-ref', 'limitHint')
    .addClass('limit-hint')
    .text(__limitHintTextGen__(opts.limit - getFileDepot().order.length - getGallerySelectionDepot().list.length));

  const $dialogTitle = $('<div />')
    .addClass('title')
    .append($('<div />').addClass('title-text').text('露天圖庫'))
    .append($limitHint);

  const $dialogContent = (() => {
    const $root = $('<div />')
      .addClass('content');

    const $wrap = $('<div />')
      .addClass('wrap');

    const $toolBar = (() => {
      const $root = $('<div />')
        .addClass('tool-bar');

      const $pagination = $('<select />')
        .attr('data-ref', 'galleryPagination');

      for (let i = 1; i <= getGalleryFilterDepot().categoryList[getGalleryFilterDepot().category].totalPages; i++) {
        const $option = $('<option />').attr('value', i).text('第 ' + i.toString() + ' 頁');

        $pagination.append($option);
      }

      $pagination
        .val(getGalleryFilterDepot().page)
        .change(function(e) {
          const $this = $(e.currentTarget);
          $store.dispatch(Actions.changeGalleryFilter(getGalleryFilterDepot().category, Number($this.val())));
          $store.dispatch(Actions.fetchGalleryImage((getGalleryFilterDepot().categoryList)[getGalleryFilterDepot().category].val, Number($this.val()), opts.onFetchGallery));
        });

      const $category = $('<select />')
        .attr('data-ref', 'galleryCategory');

      for (let i = 0; i < getGalleryFilterDepot().categoryList.length; i++) {
        const categoryItem = getGalleryFilterDepot().categoryList[i];
        const $option = $('<option />').attr('value', i).text(categoryItem.text);

        $category.append($option);
      }

      $category
        .val(getGalleryFilterDepot().category)
        .change(e => {
          const $this = $(e.currentTarget);
          $store.dispatch(Actions.changeGalleryFilter(Number($this.val()), 1));
          $store.dispatch(Actions.fetchGalleryImage((getGalleryFilterDepot().categoryList)[getGalleryFilterDepot().category].val, 1, opts.onFetchGallery));
        });

      return $root
        .append($category)
        .append($pagination);
    })();

    const $listView = (() => {
      const $root = $('<div />')
        .addClass('list-view')
        .attr('data-ref', 'galleryListView');

      for (let i = 0; i < getGalleryImageDepot().list.length; i++) {
        const url = getGalleryImageDepot().list[i].url;
        const $listItem = $('<div />')
          .addClass('list-item');

        const $img = $('<img />')
          .attr('width', opts.thumbnailWidth)
          .attr('height', opts.thumbnailHeight)
          .attr('src', url);

        $listItem.append($img);
        $root.append($listItem);
      }

      return $root;
    })();

    const $btnBar = (() => {
      const $root = $('<div />')
        .addClass('btn-bar');

      const $ok = $('<button />')
        .attr('type', 'button')
        .addClass('rt-button rt-button-mini rt-button-submit')
        .text('確定新增')
        .click(() => {
          const list = [];
          const runningID = getFileDepot().runningID;
          const selectionList = getGallerySelectionDepot().list;
          const imageList = getGalleryImageDepot().list;

          if (selectionList.length) {
            if (selectionList.length > opts.limit) {
              $store.dispatch(Actions.setGlobalError(Actions.GLOBAL_ERROR_OVERSELECT, opts.limit));
            } else if (selectionList.length + getFileDepot().order.length > opts.limit) {
              $store.dispatch(Actions.setGlobalError(Actions.GLOBAL_ERROR_OVERFLOW));
            } else {
              $store.dispatch(Actions.setGlobalError(Actions.GLOBAL_ERROR_NONE));
              for (let i = 0; i < selectionList.length; i++) {
                const selection = selectionList[i];
                list.push({
                  url: imageList[selection].url,
                  userDefinedData: imageList[selection].userDefinedData
                });
              }

              $store.dispatch(Actions.uploadFromGalleryStart({
                currentFileEntities: getFileDepot().entities,
                currentFileOrder: getFileDepot().order,
                uploadFiles: list,
                limit: opts.limit,
                runningID: runningID,
                onUploadFromGallery: opts.onUploadFromGallery,
                onDelete: opts.onDelete
              }));
            }

            $store.dispatch(Actions.triggerGallery());
          }
        });

      var $no = $('<a />')
        .attr('href', '#')
        .text('取消')
        .click(e => {
          e.preventDefault();
          $store.dispatch(Actions.triggerGallery());
        });

      return $root
        .append($ok)
        .append($no);
    })();

    $wrap
      .append($toolBar)
      .append($listView)
      .append($btnBar);

    return $root.append($wrap);
  })();

  const $dialog = $('<div />')
    .addClass('dialog')
    .append($dialogTitle)
    .append($dialogContent);

  $root
    .append($bg)
    .append($dialog);

  return $root;
}

function __renderOnGalleryStatusDepotChanged__($store, opts, $root) {
  /* get states */
  const getGalleryStatusDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_STATUS_DEPOT);

  if (getGalleryStatusDepot().isOpened) {
    $root.addClass('is-opened');
  } else {
    $root.removeClass('is-opened');
  }
}

function __renderOnGalleryFilterDepotChanged__($store, opts, $root) {
  /* get states */
  const getGalleryFilterDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_FILTER_DEPOT);

  const $pagination = $root.find('[data-ref=galleryPagination]');
  const $category = $root.find('[data-ref=galleryCategory]');

  $pagination.empty();
  for (let i = 1; i <= getGalleryFilterDepot().categoryList[getGalleryFilterDepot().category].totalPages; i++) {
    const $option = $('<option />').attr('value', i).text('第 ' + i.toString() + ' 頁');

    $pagination.append($option);
  }

  $pagination.val(getGalleryFilterDepot().page);

  $category.empty();
  for (let i = 0; i < getGalleryFilterDepot().categoryList.length; i++) {
    const categoryItem = getGalleryFilterDepot().categoryList[i];
    const $option = $('<option />').attr('value', i.toString()).text(categoryItem.text);

    $category.append($option);
  }

  $category.val(getGalleryFilterDepot().category);

  if (getGalleryFilterDepot().isFetching) {
    $pagination.prop('disabled', true);
    $category.prop('disabled', true);
  } else {
    $pagination.prop('disabled', false);
    $category.prop('disabled', false);
  }
}

function __renderOnGalleryImageDepotChanged__($store, opts, $root) {
  /* get states */
  const getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
  const getGalleryImageDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_IMAGE_DEPOT);
  const getGallerySelectionDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_SELECTION_DEPOT);

  const $listView = $root.find('[data-ref=galleryListView]');

  $listView.empty();

  if (getGalleryImageDepot().isFetching) {
    const $icon = $('<i />')
      .addClass('fa fa-circle-o-notch fa-spin fa-2x fa-fw loading-ring');
    $listView.append($icon);
  } else {
    for (let i = 0; i < getGalleryImageDepot().list.length; i++) {
      const url = getGalleryImageDepot().list[i].url;
      const $listItem = $('<div />')
        .addClass('list-item')
        .click(e => {
          const $this = $(e.currentTarget);
          let selection = getGallerySelectionDepot().list.slice(0);
          const n = $this.index();
          const idx = selection.indexOf(n);
          const limit = opts.limit - getFileDepot().order.length;

          if (idx === -1) {
            selection.push(n);
            if (selection.length > limit) {
              selection = selection.slice(selection.length - limit);
            }
          } else {
            selection.splice(idx, 1);
          }

          $store.dispatch(Actions.changeGallerySelection(selection));
        });

      const $img = $('<img />')
        .attr('width', opts.thumbnailWidth)
        .attr('height', opts.thumbnailHeight)
        .attr('src', url);

      $listItem.append($img);
      $listView.append($listItem);
    }
  }
}

function __renderOnGallerySelectionDepotChanged__($store, opts, $root) {
  /* get states */
  const getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
  const getGallerySelectionDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_SELECTION_DEPOT);

  const $listView = $root.find('[data-ref=galleryListView]');

  $listView.find('.is-selected').removeClass('is-selected');

  for (let i = 0; i < getGallerySelectionDepot().list.length; i++) {
    const n = getGallerySelectionDepot().list[i];
    $listView.children().eq(n).addClass('is-selected');
  }

  $root.find('[data-ref=limitHint]')
    .text(__limitHintTextGen__(opts.limit - getFileDepot().order.length - getGallerySelectionDepot().list.length));
}

/* exports */
export function gen($store, opts) {
  const $root = $('<div />')
    .addClass('gallery');

  $store.listen(Reducers.GALLERY_STATUS_DEPOT, () => {
    __renderOnGalleryStatusDepotChanged__($store, opts, $root);
  });

  $store.listen(Reducers.GALLERY_FILTER_DEPOT, () => {
    __renderOnGalleryFilterDepotChanged__($store, opts, $root);
  });

  $store.listen(Reducers.GALLERY_IMAGE_DEPOT, () => {
    __renderOnGalleryImageDepotChanged__($store, opts, $root);
  });

  $store.listen(Reducers.GALLERY_SELECTION_DEPOT, () => {
    __renderOnGallerySelectionDepotChanged__($store, opts, $root);
  });

  return __render__($store, opts, $root);
}
