/* component - ThumbnailViewer */
import $ from 'jQuery';
import * as FpUtils from 'FpUtils';
import * as Utils from 'Utils';
import * as Actions from 'Actions';
import * as Reducers from 'Reducers';

function __render__($store, opts, $root) {
  const thumbnailWidth = opts.thumbnailWidth;
  const thumbnailHeight = opts.thumbnailHeight;

  /* get states */
  const getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
  const getModeDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.MODE_DEPOT);
  $root.empty();

  const $thumbnails = getFileDepot().order.map((entityID, idx) => {
    const file = getFileDepot().entities[entityID];
    const $elm = $('<div />')
      .attr('data-ref', 'thumbnail')
      .addClass('thumbnail')
      .attr('data-key', idx)
      .css('width', thumbnailWidth)
      .css('height', thumbnailHeight)
      .on('touchstart mousedown', e => {
        e.preventDefault();
        if (getModeDepot().mode === Actions.DISPLAY_MODE) {
          const rootOffset = $root.offset();
          const touchList = e.originalEvent.targetTouches;
          const pageX = touchList ? touchList[0].pageX : e.pageX;
          const pageY = touchList ? touchList[0].pageY : e.pageY;

          $store.dispatch(Actions.startEdit({
            entityID: entityID,
            cursorX: pageX - rootOffset.left,
            cursorY: pageY - rootOffset.top
          }));
        }
      });

    const $img = $('<div />')
      .addClass('img');

    switch (file.status) {
      case Reducers.FILE_STATUS_LOADING: {
        const $icon = $('<i />')
          .addClass('fa fa-circle-o-notch fa-spin fa-2x fa-fw loading-ring');

        $img.append($icon);
        break;
      }

      case Reducers.FILE_STATUS_COMPLETE: {
        $img.css('background-image', 'url(' + file.url + ')');
        break;
      }

      case Reducers.FILE_STATUS_ERROR: {
        const $msg = $('<div />')
            .addClass('msg')
            .append($('<i />').addClass('fa fa-exclamation-triangle icon'))
            .append($('<div />').addClass('text').text(file.errMsg));

        $img.append($msg);
        break;
      }
    }

    const $imgWrap = $('<div />')
      .addClass('img-wrap')
      .css('width', thumbnailWidth)
      .css('height', thumbnailHeight)
      .append($img);

    const $delete = $('<i />')
      .addClass('fa')
      .addClass('fa-times')
      .addClass('delete')
      .on('touchstart mousedown', e => {
        e.stopPropagation();
      }) 
      .click(e => {
        e.stopPropagation();
        $store.dispatch(Actions.deleteFile(getFileDepot().entities, [ entityID ], opts.onDelete));
      });

    $elm
      .append($imgWrap)
      .append($delete);

    return $elm;
  });

  for (let $thumbnail of $thumbnails) {
    $root.append($thumbnail);
  }

  const thumbnailLayouts = $thumbnails.map($thumbnail => $thumbnail.position());

  $store.dispatch(Actions.updateLayout(thumbnailLayouts));

  return $root;
}

function __renderOnModeDepotChange__($store, opts, $root) {
  const thumbnailWidth = opts.thumbnailWidth;
  const thumbnailHeight = opts.thumbnailHeight;
  const getModeDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.MODE_DEPOT);
  const getLayoutDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.LAYOUT_DEPOT);
  const getEditDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.EDIT_DEPOT);
  const getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
  const getPlaceholderDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.PLACEHOLDER_DEPOT);

  if (getModeDepot().mode === Actions.EDIT_MODE) {
    $root.on('touchend mouseup', () => {
      if (getModeDepot().mode === Actions.EDIT_MODE) {
        $store.dispatch(Actions.endEdit(getEditDepot().target, getPlaceholderDepot().hoverTarget));
      }
    })
    .on('touchmove mousemove', e => {
      e.preventDefault();
      const $this = $(e.currentTarget);
      const offset = $this.offset();
      const touchList = e.originalEvent.targetTouches;
      const pageX = touchList ? touchList[0].pageX : e.pageX;
      const pageY = touchList ? touchList[0].pageY : e.pageY;
      const cursorX = pageX - offset.left;
      const cursorY = pageY - offset.top;

      $store.dispatch(Actions.updateEdit({
        entityID: getEditDepot().target,
        cursorX: cursorX,
        cursorY: cursorY
      }));

      for (let [ idx, layout ] of getLayoutDepot().thumbnailLayouts.entries()) {
        const object = {
          left: layout.left,
          top: layout.top,
          width: thumbnailWidth,
          height: thumbnailHeight
        };

        const pos = {
          x: cursorX,
          y: cursorY
        };

        if (Utils.isCollided(object, pos)) {
          $store.dispatch(Actions.updatePlaceholder((getFileDepot().order)[idx]));
          return false;
        }
      }
    });
  } else {
    $root
      .off('touchmove')
      .off('mousemove')
      .off('touchend')
      .off('mouseup');
  }
}

function __renderOnEditDepotChange__($store, opts, $root) {
  const getModeDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.MODE_DEPOT);
  const getEditDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.EDIT_DEPOT);
  const getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
  const getLayoutDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.LAYOUT_DEPOT);

  if (getModeDepot().mode === Actions.EDIT_MODE) {
    for (let [ idx, entityID ] of getFileDepot().order.entries()) {
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
    }
  }

  return $root;
}

function __renderOnPlaceholderDepotChange__($store, opts, $root) {
  const thumbnailWidth = opts.thumbnailWidth;
  const thumbnailHeight = opts.thumbnailHeight;

  const getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
  const getEditDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.EDIT_DEPOT);
  const getPlaceholderDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.PLACEHOLDER_DEPOT);

  const hoverTarget = getPlaceholderDepot().hoverTarget;
  const editTarget = getEditDepot().target;

  $root.children('[data-ref=placeholder]').remove();

  if (hoverTarget !== null) {
    const placeholderIdx = getFileDepot().order.indexOf(hoverTarget);
    const editIdx = getFileDepot().order.indexOf(editTarget);

    const $placeholderTarget = $root.children('[data-ref=thumbnail]').eq(placeholderIdx);
    const $placeholder = $('<div />')
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
}

/* exports */
export function gen($store, opts) {
  const $root = $('<div />')
    .addClass('thumbnail-viewer');

  $store.listen(Reducers.FILE_DEPOT, () => {
    __render__($store, opts, $root);
  });

  $store.listen(Reducers.MODE_DEPOT, () => {
    __renderOnModeDepotChange__($store, opts, $root);
  });

  $store.listen(Reducers.EDIT_DEPOT, () => {
    __renderOnEditDepotChange__($store, opts, $root);
  });

  $store.listen(Reducers.PLACEHOLDER_DEPOT, () => {
    __renderOnPlaceholderDepotChange__($store, opts, $root);
  });

  return __render__($store, opts, $root);
}
