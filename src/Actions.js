/* actions */

/* constants */
export var DISPLAY_MODE = 'DISPLAY_MODE';
export var EDIT_MODE = 'EDIT_MODE';

/* action type constants */
export var ADD_LOADING_FILE = 'ADD_LOADING_FILE';
export var UPDATE_LOADING_FILE = 'UPDATE_LOADING_FILE';
export var ADD_FILE = 'ADD_FILE';
export var DELETE_FILE = 'DELETE_FILE';
export var START_EDIT = 'START_EDIT';
export var UPDATE_EDIT = 'UPDATE_EDIT';
export var END_EDIT = 'END_EDIT';
export var UPDATE_PLACEHOLDER = 'UPDATE_PLACEHOLDER';
export var UPDATE_LAYOUT = 'UPDATE_LAYOUT';
export var TRIGGER_GALLERY = 'TRIGGER_GALLERY';
export var SET_GALLERY_FILTER_OPTS = 'SET_GALLERY_FILTER_OPTS';
export var CHANGE_GALLERY_FILTER = 'CHANGE_GALLERY_FILTER';
export var REQUEST_GALLERY_IMAGE = 'REQUEST_GALLERY_IMAGE';
export var RECEIVE_GALLERY_IMAGE = 'RECEIVE_GALLERY_IMAGE';
export var CHANGE_GALLERY_SELECTION = 'CHANGE_GALLERY_SELECTION';

export function uploadStart(fileList, limit, runningID, onUpload) {
  return function(dispatch) {
    var itemList = [];
    for (var i = 0; i < fileList.length && i < limit; i++) {
      itemList.push({
        id: runningID + 1 + i,
        file: fileList.item(i)
      })
    }

    dispatch(addLoadingFile($.map(itemList, function(item) {
      return item.id;
    }), runningID + itemList.length, limit));

    if (typeof onUpload === 'function') {
      var update = function(list) {
        dispatch(updateLoadingFile($.map(list, function(item) {
          return {
            id: item.id,
            url: item.url,
            status: item.status,
            progress: item.progress,
            errMsg: item.errMsg,
            userDefinedData: item.userDefinedData
          };
        })));
      };

      onUpload(itemList, update);
    }
  };
};

export function uploadFromGalleryStart(fileList, limit, runningID, onUploadFromGallery) {
  return function(dispatch) {
    var itemList = [];
    for (var i = 0; i < fileList.length && i < limit; i++) {
      itemList.push({
        id: runningID + 1 + i,
        url: fileList[i].url,
        userDefinedData: fileList[i].userDefinedData
      })
    }

    dispatch(addLoadingFile($.map(itemList, function(item) {
      return item.id;
    }), runningID + itemList.length, limit));

    if (typeof onUploadFromGallery === 'function') {
      var update = function(list) {
        dispatch(updateLoadingFile($.map(list, function(item) {
          return {
            id: item.id,
            url: item.url,
            status: item.status,
            progress: item.progress,
            errMsg: item.errMsg,
            userDefinedData: item.userDefinedData
          };
        })));
      };

      onUploadFromGallery(itemList, update);
    }
  };
};

var addLoadingFile = function(IDList, runningID, limit) {
  return {
    type: ADD_LOADING_FILE,
    payload: {
      IDList: IDList,
      runningID: runningID,
      limit: limit
    }
  };
};

var updateLoadingFile = function(list) {
  return {
    type: UPDATE_LOADING_FILE,
    payload: list
  };
};

export function addFile(list, limit, runningID) {
  list = $.map(list.slice(0, limit), function(item, idx) {
    return {
      id: runningID + 1 + idx,
      url: item.url,
      userDefinedData: item.userDefinedData
    };
  });

  return {
    type: ADD_FILE,
    payload: {
      list: list,
      limit: limit,
      runningID: runningID + list.length
    }
  };
};

export function deleteFile(entityID) {
  return {
    type: DELETE_FILE,
    payload: entityID
  };
};

export function updateLayout(thumbnailLayouts) {
  return {
    type: UPDATE_LAYOUT,
    payload: thumbnailLayouts
  };
}

export function startEdit(params) {
  var entityID = params.entityID;
  var cursorX = params.cursorX;
  var cursorY = params.cursorY;

  return {
    type: START_EDIT,
    payload: {
      entityID: entityID,
      cursorX: cursorX,
      cursorY: cursorY
    }
  };
};

export function endEdit(editTarget, hoverTarget) {
  return {
    type: END_EDIT,
    payload: {
      editTarget: editTarget,
      hoverTarget: hoverTarget
    }
  };
};

export function updateEdit(params) {
  var entityID = params.entityID;
  var cursorX = params.cursorX;
  var cursorY = params.cursorY;

  return {
    type: UPDATE_EDIT,
    payload: {
      entityID: entityID,
      cursorX: cursorX,
      cursorY: cursorY
    }
  };
};

export function updatePlaceholder(idx) {
  return {
    type: UPDATE_PLACEHOLDER,
    payload: idx
  };
};

export function triggerGallery() {
  return {
    type: TRIGGER_GALLERY
  };
};

export function setGalleryFilterOpts(optList) {
  return {
    type: SET_GALLERY_FILTER_OPTS,
    payload: optList
  };
};

export function changeGalleryFilter(category, page) {
  return {
    type: CHANGE_GALLERY_FILTER,
    payload: {
      category: category,
      page: page
    }
  }
};

export function fetchGalleryImage(categoryVal, page, onFetchGallery) {
  return function(dispatch) {
    dispatch(requestGalleryImage());
    if (typeof onFetchGallery === 'function') {
      var update = function(list) {
        dispatch(receiveGalleryImage($.map(list, function(item) {
          return {
            url: item.url,
            userDefinedData: item.userDefinedData
          };
        })));
      };

      onFetchGallery(categoryVal, Number(page), update);
    }
  };
};

var requestGalleryImage = function() {
  return {
    type: REQUEST_GALLERY_IMAGE
  };
};

var receiveGalleryImage = function(list) {
  return {
    type: RECEIVE_GALLERY_IMAGE,
    payload: list
  }
};

export function changeGallerySelection(list) {
  return {
    type: CHANGE_GALLERY_SELECTION,
    payload: list
  };
};
