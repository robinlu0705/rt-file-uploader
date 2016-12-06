/* component - ToolBar */
import React from 'react';

export default function ToolBar({ opts, showHint, onLocalFileChange, onGalleryToggle, onGalleryImageFetch }) {
  return <div className={[ 'tool-bar', showHint ? 'hint' : '' ].join(' ')}>
    <div className="wrap">
      <i className="upload-icon fa fa-upload"></i>
      <div className="hint-text"><span>選擇檔案</span></div>
      <label className="action">
        <input type="file" accept="image/*;capture=camera" className="add-local-input" multiple
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
        <div className="rt-button rt-button-mini rt-button-default">本地檔案</div>
      </label>
      <button type="button" className="action rt-button rt-button-mini rt-button-default"
        onClick={() => {
          onGalleryToggle();
          onGalleryImageFetch(opts.onFetchGallery);
        }}
      >
        露天圖庫
      </button>
      <div className="hint-text"><span className="separator">或</span><span>拖曳檔案至此</span></div>
    </div>
  </div>;
}

ToolBar.propTypes = {
  opts: React.PropTypes.object.isRequired /* see App.js */,
  showHint: React.PropTypes.bool.isRequired,
  onLocalFileChange: React.PropTypes.func.isRequired,
  onGalleryToggle: React.PropTypes.func.isRequired,
  onGalleryImageFetch: React.PropTypes.func.isRequired
};
