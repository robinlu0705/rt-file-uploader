/* component - App */
import React from 'react';
import ToolBarContainer from 'ToolBarContainer';
import ThumbnailViewerContainer from 'ThumbnailViewerContainer';
import GalleryContainer from 'GalleryContainer';

/* css prefix constants */
const IDENTIFIER = 'RT_FILE_UPLOADER';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isDragOver: false
    };
  }

  render() {
    const { opts, onFileDrop } = this.props;
    const { isDragOver } = this.state;

    return (
      <div className={`${IDENTIFIER} ${isDragOver ? 'drag-over' : ''}`} style={{ minHeight: `${opts.minHeight}px` }}
        onDragOver={e => {
          e.preventDefault();
          this.setState({
            isDragOver: true
          });
        }}
        onDragLeave={e => {
          e.preventDefault();
          this.setState({
            isDragOver: false
          });
        }}
        onDrop={e => {
          e.preventDefault();
          onFileDrop({
            fileList: e.dataTransfer.files,
            limit: opts.limit,
            onUpload: opts.onUpload
          });

          this.setState({
            isDragOver: false
          });
        }}
      >
        <ToolBarContainer opts={opts} />
        <ThumbnailViewerContainer opts={opts} />
        <GalleryContainer opts={opts} />
      </div>
    );
  }
}

App.propTypes = {
  opts: React.PropTypes.shape({
    limit: React.PropTypes.number,
    minHeight: React.PropTypes.number,
    thumbnailWidth: React.PropTypes.number,
    thumbnailHeight: React.PropTypes.number,
    galleryFilterOpts: React.PropTypes.arrayOf(React.PropTypes.shape({
      categoryName: React.PropTypes.string.isRequired,
      categoryVal: React.PropTypes.string.isRequired,
      totalPages: React.PropTypes.number.isRequired
    })),

    debug: React.PropTypes.bool,
    onUpload: React.PropTypes.func,
    onFetchGallery: React.PropTypes.func,
    onUploadFromGallery: React.PropTypes.func,
    onDelete: React.PropTypes.func
  }),

  onFileDrop: React.PropTypes.func.isRequired
};
