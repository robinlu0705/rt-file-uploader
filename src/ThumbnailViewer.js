/* component - ThumbnailViewer */
import * as FpUtils from 'FpUtils';
import * as Utils from 'Utils';
import * as Actions from 'Actions';
import * as Reducers from 'Reducers';

var __render__ = function($store, opts, $root) {
  var thumbnailWidth = opts.thumbnailWidth;
  var thumbnailHeight = opts.thumbnailHeight;

  /* get states */
  var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
  var getModeDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.MODE_DEPOT);
  $root.empty();

  var thumbnails = $.map(getFileDepot().order, function(entityID, idx) {
    var file = getFileDepot().entities[entityID];
    var reader = new FileReader();
    var $elm = $('<div />')
      .attr('data-ref', 'thumbnail')
      .addClass('thumbnail')
      .attr('data-key', idx)
      .css('width', thumbnailWidth)
      .css('height', thumbnailHeight)
      .on('touchstart mousedown', function(e) {
        e.preventDefault();
        if (getModeDepot().mode === Actions.DISPLAY_MODE) {
          var rootOffset = $root.offset();
          var offset = $(this).offset();
          var touchList = e.originalEvent.targetTouches;
          var pageX = touchList ? touchList[0].pageX : e.pageX;
          var pageY = touchList ? touchList[0].pageY : e.pageY;

          $store.dispatch(Actions.startEdit({
            entityID: entityID,
            cursorX: pageX - rootOffset.left,
            cursorY: pageY - rootOffset.top
          }));
        }
      });

    var $img = $('<div />')
      .addClass('img');

    switch (file.status) {
      case Reducers.FILE_STATUS_LOADING:
        var $icon = $('<i />')
          .addClass('fa fa-circle-o-notch fa-spin fa-2x fa-fw loading-ring');
        $img.append($icon);
      break;

      case Reducers.FILE_STATUS_COMPLETE:
        $img.css('background-image', 'url(' + file.url + ')');
      break;

      case Reducers.FILE_STATUS_ERROR:
        $msg = $('<div />')
            .addClass('msg')
            .append($('<i />').addClass('fa fa-exclamation-triangle icon'))
            .append($('<div />').addClass('text').text(file.errMsg));
        $img.append($msg);
      break;
    }

    var $imgWrap = $('<div />')
      .addClass('img-wrap')
      .css('width', thumbnailWidth)
      .css('height', thumbnailHeight)
      .append($img);

    var $delete = $('<i />')
      .addClass('fa')
      .addClass('fa-times')
      .addClass('delete')
      .on('touchstart mousedown', function(e) {
        e.stopPropagation();
      }) 
      .click(function(e) {
        e.stopPropagation();
        $store.dispatch(Actions.deleteFile(entityID));
      });

    $elm
      .append($imgWrap)
      .append($delete);

    return $elm;
  });

  $.each(thumbnails, function(idx, $thumbnail) {
    $root.append($thumbnail);
  });

  var thumbnailLayouts = $.map(thumbnails, function($thumbnail) {
    return $thumbnail.position();
  });

  $store.dispatch(Actions.updateLayout(thumbnailLayouts));

  return $root;
};

var __renderOnModeDepotChange__ = function($store, opts, $root) {
  var thumbnailWidth = opts.thumbnailWidth;
  var thumbnailHeight = opts.thumbnailHeight;
  var getModeDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.MODE_DEPOT);
  var getLayoutDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.LAYOUT_DEPOT);
  var getEditDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.EDIT_DEPOT);
  var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
  var getPlaceholderDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.PLACEHOLDER_DEPOT);

  if (getModeDepot().mode === Actions.EDIT_MODE) {
    $root.on('touchend mouseup', function(e) {
      if (getModeDepot().mode === Actions.EDIT_MODE) {
        $store.dispatch(Actions.endEdit(getEditDepot().target, getPlaceholderDepot().hoverTarget));
      }
    })
    .on('touchmove mousemove', function(e) {
      e.preventDefault();
      var offset = $(this).offset();
      var touchList = e.originalEvent.targetTouches;
      var pageX = touchList ? touchList[0].pageX : e.pageX;
      var pageY = touchList ? touchList[0].pageY : e.pageY;
      var cursorX = pageX - offset.left;
      var cursorY = pageY - offset.top;

      $store.dispatch(Actions.updateEdit({
        entityID: getEditDepot().target,
        cursorX: cursorX,
        cursorY: cursorY
      }));

      $.each(getLayoutDepot().thumbnailLayouts, function(idx, layout) {
        var object = {
          left: layout.left,
          top: layout.top,
          width: thumbnailWidth,
          height: thumbnailHeight
        };

        var pos = {
          x: cursorX,
          y: cursorY
        };

        if (Utils.isCollided(object, pos)) {
          $store.dispatch(Actions.updatePlaceholder((getFileDepot().order)[idx]));
          return false;
        }
      });
    });
  } else {
    $root
      .off('touchmove')
      .off('mousemove')
      .off('touchend')
      .off('mouseup');
  }
};

var __renderOnEditDepotChange__ = function($store, opts, $root) {
  var getModeDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.MODE_DEPOT);
  var getEditDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.EDIT_DEPOT);
  var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
  var getLayoutDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.LAYOUT_DEPOT);

  if (getModeDepot().mode === Actions.EDIT_MODE) {
    $.each(getFileDepot().order, function(idx, entityID) {
      if (entityID === getEditDepot().target) {
        $root
          .children('[data-ref=thumbnail]')
          .eq(idx)
          .attr('date-ref', 'dragTarget')
          .addClass('drag-target')
          .css({
            position: 'absolute',
            zIndex: '99',
            left: (getLayoutDepot().thumbnailLayouts)[idx].left + getEditDepot().currentPos.x - getEditDepot().startPos.x,
            top: (getLayoutDepot().thumbnailLayouts)[idx].top + getEditDepot().currentPos.y - getEditDepot().startPos.y - 7
          });
      }
    });
  }

  return $root;
};

var __renderOnPlaceholderDepotChange__ = function($store, opts, $root) {
  var thumbnailWidth = opts.thumbnailWidth;
  var thumbnailHeight = opts.thumbnailHeight;

  var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
  var getEditDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.EDIT_DEPOT);
  var getPlaceholderDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.PLACEHOLDER_DEPOT);

  var hoverTarget = getPlaceholderDepot().hoverTarget;
  var editTarget = getEditDepot().target;
  $root.children('[data-ref=placeholder]').remove();

  if (hoverTarget !== null) {
    var placeholderIdx = getFileDepot().order.indexOf(hoverTarget);
    var editIdx = getFileDepot().order.indexOf(editTarget);

    var $placeholderTarget = $root.children('[data-ref=thumbnail]').eq(placeholderIdx);
    var $placeholder = $('<div />')
      .attr('data-ref', 'placeholder')
      .addClass('placeholder')
      .css({
        width: thumbnailWidth,
        height: thumbnailHeight
      });

    if (editIdx > placeholderIdx) {
      $placeholder.insertBefore($placeholderTarget);
    } else {
      $placeholder.insertAfter($placeholderTarget);
    }
  }

  return $root;
};

/* exports */
export function gen($store, opts) {
  /* get states */
  var getModeDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.MODE_DEPOT);
  var getEditDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.EDIT_DEPOT);
  var getPlaceholderDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.PLACEHOLDER_DEPOT);

  var $root = $('<div />')
    .addClass('thumbnail-viewer');

  $store.listen(Reducers.FILE_DEPOT, function() {
    __render__($store, opts, $root);
  });

  $store.listen(Reducers.MODE_DEPOT, function() {
    __renderOnModeDepotChange__($store, opts, $root);
  });

  $store.listen(Reducers.EDIT_DEPOT, function() {
   __renderOnEditDepotChange__($store, opts, $root);
  });

  $store.listen(Reducers.PLACEHOLDER_DEPOT, function() {
    __renderOnPlaceholderDepotChange__($store, opts, $root);
  });

  return __render__($store, opts, $root);
};
