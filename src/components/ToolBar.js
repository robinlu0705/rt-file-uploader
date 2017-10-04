/* component - ToolBar */
import React from 'react';

export default function ToolBar({ opts, showHint, fileCount, errMsg, onLocalFileChange, onGalleryToggle, onGalleryImageFetch }) {
  const isOverFlow = fileCount >= opts.limit;
  const remains = opts.limit - fileCount;

  return <div className={[ 'tool-bar', showHint ? 'hint' : '' ].join(' ')}>
    <div className="wrap">
      <i className="upload-icon fa fa-upload"></i>
      <div className="hint-text"><span>Choose files from</span></div>
      <label className="action">
        <input type="file" accept="image/*;capture=camera" className="add-local-input" multiple disabled={isOverFlow}
          onChange={e => {
            const currentTarget = e.currentTarget;
            onLocalFileChange({
              fileList: currentTarget.files,
              limit: opts.limit,
              onUpload: opts.onUpload,
              onDelete: opts.onDelete
            });

            currentTarget.value = '';
          }}
        />
        <div className={`rt-button rt-button-mini rt-button-default ${isOverFlow ? 'rt-button-disabled' : ''}`}>LOCAL</div>
      </label>
      <span style={{ margin: '0px 5px', color: 'grey' }}>/</span>
      <button type="button" className={`action rt-button rt-button-mini rt-button-default ${isOverFlow ? 'rt-button-disabled' : ''}`} disabled={isOverFlow}
        onClick={() => {
          onGalleryToggle();
          onGalleryImageFetch(opts.onFetchGallery);
        }}
      >
        ONLINE IMAGES
      </button>
      <div className="hint-text"><span className="separator">or</span><span>DRAG THEM HERE</span></div>
      <div className={`limit-hint-text ${errMsg ? 'is-hidden' : ''}`}>{`Can still upload ${remains} ${remains === 1 ? 'files' : 'files'}`}</div>
      <label className={`global-error ${errMsg ? '' : 'is-hidden'} ${showHint ? '' : 'rt-error-bubble'}`}>{errMsg}</label>
    </div>
  </div>;
}

ToolBar.propTypes = {
  opts: React.PropTypes.object.isRequired /* see App.js */,
  showHint: React.PropTypes.bool.isRequired,
  fileCount: React.PropTypes.number.isRequired,
  errMsg: React.PropTypes.string,
  onLocalFileChange: React.PropTypes.func.isRequired,
  onGalleryToggle: React.PropTypes.func.isRequired,
  onGalleryImageFetch: React.PropTypes.func.isRequired
};
