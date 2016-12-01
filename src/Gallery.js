/* component - Gallery */
import * as FpUtils from 'FpUtils';
import * as Reducers from 'Reducers';
import * as Actions from 'Actions';

var __render__ = function($store, opts, $root) {
  /* get states */
  var getGalleryStatusDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_STATUS_DEPOT);
  var getGalleryFilterDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_FILTER_DEPOT);
  var getGalleryImageDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_IMAGE_DEPOT);
  var getGallerySelectionDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_SELECTION_DEPOT);
  var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);

  if (getGalleryStatusDepot().isOpened) {
    $root.addClass('is-opened');
  }

  var $bg = $('<div />')
    .addClass('overlay')
    .click(function() {
      $store.dispatch(Actions.triggerGallery());
    });

  var $dialogTitle = $('<div />')
    .addClass('title')
    .text('露天圖庫');

  var $dialogContent = (function() {
    var $root = $('<div />')
      .addClass('content');

    var $wrap = $('<div />')
      .addClass('wrap');

    var $toolBar = (function() {
      var $root = $('<div />')
        .addClass('tool-bar');

      var $pagination = $('<select />')
        .attr('data-ref', 'galleryPagination');;

      for (var i = 1; i <= getGalleryFilterDepot().categoryList[getGalleryFilterDepot().category].totalPages; i++) {
        var $option = $('<option />').attr('value', i).text('第 ' + i.toString() + ' 頁');

        $pagination.append($option);
      }

      $pagination
        .val(getGalleryFilterDepot().page)
        .change(function(e) {
          var $this = $(this);
          $store.dispatch(Actions.changeGalleryFilter(getGalleryFilterDepot().category, Number($this.val())));
          $store.dispatch(Actions.fetchGalleryImage((getGalleryFilterDepot().categoryList)[getGalleryFilterDepot().category].val, Number($this.val()), opts.onFetchGallery));
        });

      var $category = $('<select />')
        .attr('data-ref', 'galleryCategory');

      for (var i = 0; i < getGalleryFilterDepot().categoryList.length; i++) {
        var categoryItem = getGalleryFilterDepot().categoryList[i];
        var $option = $('<option />').attr('value', categoryItem.val).text(categoryItem.text);

        $category.append($option);
      }

      $category
        .val(getGalleryFilterDepot().category)
        .change(function(e) {
          var $this = $(this);
          $store.dispatch(Actions.changeGalleryFilter(Number($this.val()), 1));
          $store.dispatch(Actions.fetchGalleryImage((getGalleryFilterDepot().categoryList)[getGalleryFilterDepot().category].val, 1, opts.onFetchGallery));
        });

      return $root
        .append($category)
        .append($pagination);
    }());

    var $listView = (function() {
      var $root = $('<div />')
        .addClass('list-view')
        .attr('data-ref', 'galleryListView');

      for (var i = 0; i < getGalleryImageDepot().list.length; i++) {
        var url = getGalleryImageDepot().list[i].url;
        var $listItem = $('<div />')
          .addClass('list-item');

        var $img = $('<img />')
          .attr('width', opts.thumbnailWidth)
          .attr('height', opts.thumbnailHeight)
          .attr('src', url);

        $listItem.append($img);
        $root.append($listItem);
      }

      return $root;
    }());

    var $btnBar = (function() {
      var $root = $('<div />')
        .addClass('btn-bar');

      var $ok = $('<button />')
        .attr('type', 'button')
        .addClass('rt-button rt-button-mini rt-button-submit')
        .text('確定新增')
        .click(function() {
          var list = [];
          var runningID = getFileDepot().runningID;
          var selectionList = getGallerySelectionDepot().list;
          var imageList = getGalleryImageDepot().list;
          if (selectionList.length) {
            for (var i = 0; i < selectionList.length; i++) {
              var selection = selectionList[i];
              list.push({
                url: imageList[selection].url,
                userDefinedData: imageList[selection].userDefinedData
              });
            }

            $store.dispatch(Actions.uploadFromGalleryStart(list, opts.limit, runningID, opts.onUploadFromGallery));
            $store.dispatch(Actions.triggerGallery());
          }
        });

      var $no = $('<a />')
        .attr('href', '#')
        .text('取消')
        .click(function(e) {
          e.preventDefault();
          $store.dispatch(Actions.triggerGallery());
        });

      return $root
        .append($ok)
        .append($no);
    }());

    $wrap
      .append($toolBar)
      .append($listView)
      .append($btnBar);

    return $root.append($wrap);
  }());

  var $dialog = $('<div />')
    .addClass('dialog')
    .append($dialogTitle)
    .append($dialogContent);

  $root
    .append($bg)
    .append($dialog);

  return $root;
};

var __renderOnGalleryStatusDepotChanged__ = function($store, opts, $root) {
  /* get states */
  var getGalleryStatusDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_STATUS_DEPOT);

  if (getGalleryStatusDepot().isOpened) {
    $root.addClass('is-opened');
  } else {
    $root.removeClass('is-opened');
  }
};

var __renderOnGalleryFilterDepotChanged__ = function($store, opts, $root) {
  /* get states */
  var getGalleryFilterDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_FILTER_DEPOT);

  var $pagination = $root.find('[data-ref=galleryPagination]');
  var $category = $root.find('[data-ref=galleryCategory]');

  $pagination.empty();
  for (var i = 1; i <= getGalleryFilterDepot().categoryList[getGalleryFilterDepot().category].totalPages; i++) {
    var $option = $('<option />').attr('value', i).text('第 ' + i.toString() + ' 頁');

    $pagination.append($option);
  }

  $pagination.val(getGalleryFilterDepot().page);

  $category.empty();
  for (var i = 0; i < getGalleryFilterDepot().categoryList.length; i++) {
    var categoryItem = getGalleryFilterDepot().categoryList[i];
    var $option = $('<option />').attr('value', i.toString()).text(categoryItem.text);

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
};

var __renderOnGalleryImageDepotChanged__ = function($store, opts, $root) {
  /* get states */
  var getGalleryImageDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_IMAGE_DEPOT);
  var getGallerySelectionDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_SELECTION_DEPOT);

  var $listView = $root.find('[data-ref=galleryListView]');

  $listView.empty();

  if (getGalleryImageDepot().isFetching) {
    var $icon = $('<i />')
      .addClass('fa fa-circle-o-notch fa-spin fa-2x fa-fw loading-ring');
    $listView.append($icon);
  } else {
    for (var i = 0; i < getGalleryImageDepot().list.length; i++) {
      var url = getGalleryImageDepot().list[i].url;
      var $listItem = $('<div />')
        .addClass('list-item')
        .click(function() {
          var $this = $(this);
          var selection = getGallerySelectionDepot().list.slice(0);
          var n = $this.index();
          var idx = selection.indexOf(n);

          if (idx === -1) {
            selection.push(n);
            if (selection.length > opts.limit) {
              selection = selection.slice(selection.length - opts.limit);
            }
          } else {
            selection.splice(idx, 1);
          }

          $store.dispatch(Actions.changeGallerySelection(selection));
        });

      var $img = $('<img />')
        .attr('width', opts.thumbnailWidth)
        .attr('height', opts.thumbnailHeight)
        .attr('src', url);

      $listItem.append($img);
      $listView.append($listItem);
    }
  }
};

var __renderOnGallerySelectionDepotChanged__ = function($store, opts, $root) {
  /* get states */
  var getGallerySelectionDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_SELECTION_DEPOT);

  var $listView = $root.find('[data-ref=galleryListView]');

  $listView.find('.is-selected').removeClass('is-selected');

  for (var i = 0; i < getGallerySelectionDepot().list.length; i++) {
    var n = getGallerySelectionDepot().list[i];
    $listView.children().eq(n).addClass('is-selected');
  }
};

/* exports */
export function gen($store, opts) {
  var $root = $('<div />')
    .addClass('gallery');

  $store.listen(Reducers.GALLERY_STATUS_DEPOT, function() {
    __renderOnGalleryStatusDepotChanged__($store, opts, $root);
  });

  $store.listen(Reducers.GALLERY_FILTER_DEPOT, function() {
    __renderOnGalleryFilterDepotChanged__($store, opts, $root);
  });

  $store.listen(Reducers.GALLERY_IMAGE_DEPOT, function() {
    __renderOnGalleryImageDepotChanged__($store, opts, $root);
  });

  $store.listen(Reducers.GALLERY_SELECTION_DEPOT, function() {
    __renderOnGallerySelectionDepotChanged__($store, opts, $root);
  });

  return __render__($store, opts, $root);
};
