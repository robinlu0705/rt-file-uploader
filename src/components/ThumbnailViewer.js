/* component - ThumbnailViewer */
import React from 'react';
import * as CONSTANTS from '/src/constants';

function ThumbnailContent({ status, url, errMsg }) {
  switch (status) {
    case CONSTANTS.FILE_STATUS_LOADING: {
      return <div className="img">
        <i className="fa fa-circle-o-notch fa-spin fa-2x fa-fw loading-ring"></i>
      </div>;
    }

    case CONSTANTS.FILE_STATUS_COMPLETE: {
      return <div className="img" style={{ backgroundImage: `url(${url})` }}></div>;
    }

    case CONSTANTS.FILE_STATUS_ERROR: {
      return <div className="img">
        <div className="msg">
          <i className="fa fa-exclamation-triangle icon"></i>
          <div className="text">{errMsg}</div>
        </div>
      </div>;
    }
  }
}

ThumbnailContent.propTypes = {
  status: React.PropTypes.oneOf([
    CONSTANTS.FILE_STATUS_LOADING,
    CONSTANTS.FILE_STATUS_COMPLETE,
    CONSTANTS.FILE_STATUS_ERROR
  ]).isRequired,

  url: React.PropTypes.string,
  errMsg: React.PropTypes.string
};


export default class ThumbnailViewer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.thumbnailMouseDownHandler = this.thumbnailMouseDownHandler.bind(this);
    this.thumbnailMouseMoveHandler = this.thumbnailMouseMoveHandler.bind(this);
    this.thumbnailMouseUpHandler = this.thumbnailMouseUpHandler.bind(this);
    this.preRenderHandler = this.preRenderHandler.bind(this);
    this.postRenderHandler = this.postRenderHandler.bind(this);
  }

  render() {
    const { opts, thumbnailOrder, thumbnailEntities, thumbnailLayouts, mode, editTarget, editStartPos, editCurrentPos, hoverTarget } = this.props;

    return (
      <div className="thumbnail-viewer"
        ref={div => {
          this.root = div;
        }}
        onTouchMove={e => {
          this.thumbnailMouseMoveHandler(e, opts.thumbnailWidth, opts.thumbnailHeight);
        }}
        onMouseMove={e => {
          this.thumbnailMouseMoveHandler(e, opts.thumbnailWidth, opts.thumbnailHeight);
        }}
        onTouchEnd={this.thumbnailMouseUpHandler}
        onMouseUp={this.thumbnailMouseUpHandler}
      >
        {(() => {
          const thumbnailElms = thumbnailOrder.map((id, i) => {
            const entity = thumbnailEntities[id];
            const editingClasses = [];
            const editingStyle = {};

            if (mode === CONSTANTS.EDIT_MODE) {
              editingClasses.push('is-editing');

              if (id === editTarget) {
                editingClasses.push('drag-target');
                Object.assign(editingStyle, {
                  position: 'absolute',
                  zIndex: '99',
                  left: thumbnailLayouts[i].left + editCurrentPos.x - editStartPos.x,
                  top: thumbnailLayouts[i].top + editCurrentPos.y - editStartPos.y
                });
              }
            }

            return (
              <div className={`thumbnail ${editingClasses.join(' ')}`} key={id}
                style={Object.assign({
                  width: opts.thumbnailWidth, height: opts.thumbnailHeight
                }, editingStyle)}
                ref={div => {
                  if (div) {
                    this.thumbnails.push(div);
                  }
                }}
                onTouchStart={e => {
                  this.thumbnailMouseDownHandler(e, id);
                }}
                onMouseDown={e => {
                  this.thumbnailMouseDownHandler(e, id);
                }}
              >
                <div className="img-wrap" style={{ width: opts.thumbnailWidth, height: opts.thumbnailHeight }}>
                  <ThumbnailContent status={entity.status} url={entity.url} errMsg={entity.errMsg} />
                </div>
                <i className="fa fa-times delete"
                  onTouchStart={e => {
                    e.stopPropagation();
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    const { onFileDelete } = this.props;
                    onFileDelete({
                      entityID: id,
                      onDelete: opts.onDelete
                    });
                  }}
                ></i>
              </div>
            );
          });

          if (mode === CONSTANTS.EDIT_MODE && hoverTarget) {
            const placeholderElm = <div className="placeholder" key='placeholder' style={{ width: opts.thumbnailWidth, height: opts.thumbnailHeight }}>
            </div>;
            const placeholderIdx = thumbnailOrder.indexOf(hoverTarget);
            const editIdx = thumbnailOrder.indexOf(editTarget);

            if (editIdx > placeholderIdx) {
              return [
                ...(thumbnailElms.slice(0, placeholderIdx)),
                placeholderElm,
                ...(thumbnailElms.slice(placeholderIdx))
              ];
            } else {
              return [
                ...(thumbnailElms.slice(0, placeholderIdx + 1)),
                placeholderElm,
                ...(thumbnailElms.slice(placeholderIdx + 1))
              ];
            }
          } else {
            return thumbnailElms;
          }
        })()}
      </div>
    );
  }

  componentWillMount() {
    this.preRenderHandler();
  }

  componentWillUpdate() {
    this.preRenderHandler();
  }

  componentDidMount() {
    this.postRenderHandler();
  }

  componentDidUpdate() {
    this.postRenderHandler();
  }

  preRenderHandler() {
    this.thumbnails = [];
  }

  postRenderHandler() {
    const { onLayoutUpdate, thumbnailLayouts } = this.props;

    if (thumbnailLayouts.length !== this.thumbnails.length) {
      onLayoutUpdate(this.thumbnails.map(thumbnail => {
        return {
          left: thumbnail.offsetLeft,
          top: thumbnail.offsetTop
        };
      }));
    }
  }

  thumbnailMouseDownHandler(e, entityID) {
    const { onReorderStart } = this.props;

    e.preventDefault();
    
    const touchList = e.targetTouches;
    const pageX = touchList ? touchList[0].pageX : e.pageX;
    const pageY = touchList ? touchList[0].pageY : e.pageY;
    const rootPageX = this.root.getBoundingClientRect().left + window.pageXOffset;
    const rootPageY = this.root.getBoundingClientRect().top + window.pageYOffset;

    onReorderStart({
      entityID: entityID,
      cursorX: pageX - rootPageX,
      cursorY: pageY - rootPageY
    });
  }

  thumbnailMouseMoveHandler(e, thumbnailWidth, thumbnailHeight) {
    e.preventDefault();

    const { onReordering } = this.props;
    const touchList = e.targetTouches;
    const pageX = touchList ? touchList[0].pageX : e.pageX;
    const pageY = touchList ? touchList[0].pageY : e.pageY;
    const rootPageX = this.root.getBoundingClientRect().left + window.pageXOffset;
    const rootPageY = this.root.getBoundingClientRect().top + window.pageYOffset;

    onReordering({
      cursorX: pageX - rootPageX,
      cursorY: pageY - rootPageY,
      thumbnailWidth: thumbnailWidth,
      thumbnailHeight: thumbnailHeight
    });
  }

  thumbnailMouseUpHandler() {
    const { onReorderEnd } = this.props;
    onReorderEnd();
  }
}

ThumbnailViewer.propTypes = {
  opts: React.PropTypes.object.isRequired /* see App.js */,
  thumbnailOrder: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  thumbnailEntities: React.PropTypes.shape({
    status: React.PropTypes.oneOf([
      CONSTANTS.FILE_STATUS_LOADING,
      CONSTANTS.FILE_STATUS_COMPLETE,
      CONSTANTS.FILE_STATUS_ERROR
    ]).isRequired,

    url: React.PropTypes.string,
    errMsg: React.PropTypes.string
  }).isRequired,

  thumbnailLayouts: React.PropTypes.arrayOf(React.PropTypes.shape({
    left: React.PropTypes.number.isRequired,
    top: React.PropTypes.number.isRequired
  })).isRequired,

  mode: React.PropTypes.oneOf([
    CONSTANTS.EDIT_MODE,
    CONSTANTS.DISPLAY_MODE
  ]).isRequired,

  editTarget: React.PropTypes.number,
  editStartPos: React.PropTypes.shape({
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  }).isRequired,

  editCurrentPos: React.PropTypes.shape({
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired
  }).isRequired,

  hoverTarget: React.PropTypes.number,
  onLayoutUpdate: React.PropTypes.func.isRequired,
  onReorderStart: React.PropTypes.func.isRequired,
  onReordering: React.PropTypes.func.isRequired,
  onReorderEnd: React.PropTypes.func.isRequired,
  onFileDelete: React.PropTypes.func.isRequired
};
