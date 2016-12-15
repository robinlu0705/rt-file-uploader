import { connect } from 'react-redux';
import * as actions from '/src/actions';
import * as CONSTANTS from '/src/constants';
import ThumbnailViewer from '/src/components/ThumbnailViewer';
import * as utils from '/src/utils';

function mapStateToProps(state) {
  return {
    _fileDepot: state.fileDepot,
    _modeDepot: state.modeDepot,
    _editDepot: state.editDepot,
    _placeholderDepot: state.placeholderDepot,
    _layoutDepot: state.layoutDepot
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch,
    onLayoutUpdate(thumbnailLayouts) {
      dispatch(actions.updateLayout(thumbnailLayouts));
    }
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { _fileDepot, _modeDepot, _editDepot, _placeholderDepot, _layoutDepot } = stateProps;

  return Object.assign({}, ownProps, dispatchProps, {
    thumbnailOrder: _fileDepot.order,
    thumbnailEntities: _fileDepot.entities,
    thumbnailLayouts: _layoutDepot.thumbnailLayouts,
    mode: _modeDepot.mode,
    editTarget: _editDepot.target,
    editCurrentPos: _editDepot.currentPos,
    editStartPos: _editDepot.startPos,
    hoverTarget: _placeholderDepot.hoverTarget,
    onFileDelete({ entityID, onDelete }) {
      dispatch(actions.deleteFile(_fileDepot.entities, [ entityID ], onDelete));
    },

    onReorderStart({ entityID, cursorX, cursorY }) {
      if (_modeDepot.mode === CONSTANTS.DISPLAY_MODE) {
        dispatch(actions.startEdit({ entityID, cursorX, cursorY }));
      }
    },

    onReorderEnd() {
      if (_modeDepot.mode === CONSTANTS.EDIT_MODE) {
        dispatch(actions.endEdit(_editDepot.target, _placeholderDepot.hoverTarget));
      }
    },

    onReordering({ cursorX, cursorY, thumbnailWidth, thumbnailHeight }) {
      if (_modeDepot.mode === CONSTANTS.EDIT_MODE) {
        dispatch(actions.updateEdit({
          cursorX: cursorX,
          cursorY: cursorY,
          entityID: _fileDepot.target
        }));

        for (let [ idx, layout ] of _layoutDepot.thumbnailLayouts.entries()) {
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

          if (utils.isCollided(object, pos)) {
            dispatch(actions.updatePlaceholder((_fileDepot.order)[idx]));
            break;
          }
        }
      }
    }
  });
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ThumbnailViewer);
