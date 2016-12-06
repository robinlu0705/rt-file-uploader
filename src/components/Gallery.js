/* component - Gallery */
import React from 'react';

export default function Gallery({ categoryOpts, currentCategory, currentPage, items, selection, opts, isOpened, isFetching, onToggle, onFilterChange, onImageFetch, onSelectionChange, onUpload }) {
  return (
    <div className={`gallery ${isOpened ? 'is-opened' : ''}`}>
      <div className="overlay" onClick={onToggle}></div>
      <div className="dialog">
        <div className="title">露天圖庫</div>
        <div className="content">
          <div className="wrap">
            <div className="tool-bar">
              <select name="" value={currentCategory} disabled={isFetching}
                onChange={e => {
                  const currentTarget = e.currentTarget;
                  const newCategory = Number(currentTarget.value);
                  onFilterChange({
                    category: newCategory,
                    page: 1
                  });

                  onImageFetch({
                    categoryVal: categoryOpts[newCategory].val,
                    page: 1,
                    onFetchGallery: opts.onFetchGallery
                  });
                }}
              >
                {categoryOpts.map((category, i) => <option value={i} key={i}>{category.text}</option>)}
              </select>
              <select name="" value={currentPage} disabled={isFetching}
                onChange={e => {
                  const currentTarget = e.currentTarget;
                  const newPage = Number(currentTarget.value);
                  onFilterChange({
                    category: currentCategory,
                    page: newPage
                  });

                  onImageFetch({
                    categoryVal: categoryOpts[currentCategory],
                    page: newPage,
                    onFetchGallery: opts.onFetchGallery
                  });
                }}
              >
                {[...(Array(categoryOpts[currentCategory].totalPages).keys())].map(n => <option value={n + 1} key={n}>{n + 1}</option>)}
              </select>
            </div>
            <div className="list-view">
              {(() => {
                if (isFetching) {
                  return <i className="fa fa-circle-o-notch fa-spin fa-2x fa-fw loading-ring"></i>;
                } else {
                  return items.map((item, i) => {
                    const idxInSelection = selection.indexOf(i);
                    const selectedClass = idxInSelection === -1 ? '' : 'is-selected';
                    return (
                      <div className={`list-item ${selectedClass}`} key={i}
                        onClick={() => {
                          let newSelection = selection.slice(0);
                          if (idxInSelection === -1) {
                            newSelection.push(i);
                            if (newSelection.length > opts.limit) {
                              newSelection = newSelection.slice(newSelection.length - opts.limit);
                            }
                          } else {
                            newSelection.splice(idxInSelection, 1);
                          }

                          onSelectionChange(newSelection);
                        }}
                      >
                        <img src={item.url} width={opts.thumbnailWidth} height={opts.thumbnailHeight} alt=""/>
                      </div>
                    );
                  });
                }
              })()}
            </div>
            <div className="btn-bar">
              <button className="rt-button rt-button-mini rt-button-submit" type="button"
                onClick={() => {
                  onUpload({
                    limit: opts.limit,
                    onUploadFromGallery: opts.onUploadFromGallery,
                    onDelete: opts.onDelete
                  });

                  onToggle();
                }}
              >
                確定新增
              </button>
              <a href="#" onClick={onToggle}>取消</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Gallery.propTypes = {
  categoryOpts: React.PropTypes.arrayOf(React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    val: React.PropTypes.string.isRequired,
    totalPages: React.PropTypes.number.isRequired
  })).isRequired,

  currentCategory: React.PropTypes.number.isRequired,
  currentPage: React.PropTypes.number.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.shape({
    url: React.PropTypes.string.isRequired
  })).isRequired,

  selection: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  opts: React.PropTypes.object.isRequired /* see App.js */,
  isOpened: React.PropTypes.bool.isRequired,
  isFetching: React.PropTypes.bool.isRequired,
  onToggle: React.PropTypes.func.isRequired,
  onFilterChange: React.PropTypes.func.isRequired,
  onImageFetch: React.PropTypes.func.isRequired,
  onSelectionChange: React.PropTypes.func.isRequired,
  onUpload: React.PropTypes.func.isRequired
};
