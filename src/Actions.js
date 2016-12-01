/* actions */

/* constants */
export const DISPLAY_MODE = 'DISPLAY_MODE';
export const EDIT_MODE = 'EDIT_MODE';

/* action type constants */
export const ADD_LOADING_FILE = 'ADD_LOADING_FILE';
export const UPDATE_LOADING_FILE = 'UPDATE_LOADING_FILE';
export const ADD_FILE = 'ADD_FILE';
export const DELETE_FILE = 'DELETE_FILE';
export const START_EDIT = 'START_EDIT';
export const UPDATE_EDIT = 'UPDATE_EDIT';
export const END_EDIT = 'END_EDIT';
export const UPDATE_PLACEHOLDER = 'UPDATE_PLACEHOLDER';
export const UPDATE_LAYOUT = 'UPDATE_LAYOUT';
export const TRIGGER_GALLERY = 'TRIGGER_GALLERY';
export const SET_GALLERY_FILTER_OPTS = 'SET_GALLERY_FILTER_OPTS';
export const CHANGE_GALLERY_FILTER = 'CHANGE_GALLERY_FILTER';
export const REQUEST_GALLERY_IMAGE = 'REQUEST_GALLERY_IMAGE';
export const RECEIVE_GALLERY_IMAGE = 'RECEIVE_GALLERY_IMAGE';
export const CHANGE_GALLERY_SELECTION = 'CHANGE_GALLERY_SELECTION';

export function uploadStart(fileList, limit, runningID, onUpload) {
  return function(dispatch) {
    const itemList = [];
    for (let i = 0; i < fileList.length && i < limit; i++) {
      itemList.push({
        id: runningID + 1 + i,
        file: fileList.item(i)
      })
    }

    dispatch(addLoadingFile(itemList.map(item => item.id), runningID + itemList.length, limit));

    if (typeof onUpload === 'function') {
      const update = list => {
        dispatch(updateLoadingFile(list.map(item => ({
          id: item.id,
          url: item.url,
          status: item.status,
          progress: item.progress,
          errMsg: item.errMsg,
          userDefinedData: item.userDefinedData
        }))));
      };

      onUpload(itemList, update);
    }
  };
};

export function uploadFromGalleryStart(fileList, limit, runningID, onUploadFromGallery) {
  return dispatch => {
    const itemList = [];
    for (let i = 0; i < fileList.length && i < limit; i++) {
      itemList.push({
        id: runningID + 1 + i,
        url: fileList[i].url,
        userDefinedData: fileList[i].userDefinedData
      })
    }

    dispatch(addLoadingFile(itemList.map(item => item.id), runningID + itemList.length, limit));

    if (typeof onUploadFromGallery === 'function') {
      const update = list => {
        dispatch(updateLoadingFile(list.map(item => ({
          id: item.id,
          url: item.url,
          status: item.status,
          progress: item.progress,
          errMsg: item.errMsg,
          userDefinedData: item.userDefinedData
        }))));
      };

      onUploadFromGallery(itemList, update);
    }
  };
};

function addLoadingFile(IDList, runningID, limit) {
  return {
    type: ADD_LOADING_FILE,
    payload: {
      IDList: IDList,
      runningID: runningID,
      limit: limit
    }
  };
};

function updateLoadingFile(list) {
  return {
    type: UPDATE_LOADING_FILE,
    payload: list
  };
};

export function addFile(list, limit, runningID) {
  list = list.slice(0, limit).map((item, idx) => ({
    id: runningID + 1 + idx,
    url: item.url,
    userDefinedData: item.userDefinedData
  }));

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

export function startEdit({ entityID, cursorX, cursorY }) {
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

export function updateEdit({ entityID, cursorX, cursorY }) {
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
  return dispatch => {
    dispatch(requestGalleryImage());
    if (typeof onFetchGallery === 'function') {
      const update = list => {
        dispatch(receiveGalleryImage(list.map(item => ({
          url: item.url,
          userDefinedData: item.userDefinedData
        }))));
      };

      onFetchGallery(categoryVal, Number(page), update);
    }
  };
};

function requestGalleryImage() {
  return {
    type: REQUEST_GALLERY_IMAGE
  };
};

function receiveGalleryImage(list) {
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
