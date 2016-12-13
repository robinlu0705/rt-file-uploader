/* actions */

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
export const TOGGLE_GALLERY = 'TOGGLE_GALLERY';
export const SET_GALLERY_FILTER_OPTS = 'SET_GALLERY_FILTER_OPTS';
export const CHANGE_GALLERY_FILTER = 'CHANGE_GALLERY_FILTER';
export const REQUEST_GALLERY_IMAGE = 'REQUEST_GALLERY_IMAGE';
export const RECEIVE_GALLERY_IMAGE = 'RECEIVE_GALLERY_IMAGE';
export const CHANGE_GALLERY_SELECTION = 'CHANGE_GALLERY_SELECTION';

export function uploadStart({ uploadFileList, limit, onUpload, runningID }) {
  return function(dispatch) {
    /* new added items */
    const itemList = [];
    for (let i = 0; i < uploadFileList.length && i < limit; i++) {
      itemList.push({
        id: runningID + 1 + i,
        file: uploadFileList.item(i)
      });
    }

    dispatch(addLoadingFile(itemList.map(item => item.id), limit, runningID + itemList.length));

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
}

export function uploadFromGalleryStart({ uploadFiles, limit, runningID, onUploadFromGallery }) {
  return dispatch => {
    /* new added items */
    const itemList = uploadFiles.slice(0, limit).map((file, idx) => ({
      id: runningID + 1 + idx,
      url: file.url,
      userDefinedData: file.userDefinedData
    }));

    dispatch(addLoadingFile(itemList.map(item => item.id), limit, runningID + itemList.length));

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
}

function addLoadingFile(IDList, limit, newRunningID) {
  return {
    type: ADD_LOADING_FILE,
    payload: {
      IDList: IDList,
      limit: limit,
      newRunningID: newRunningID
    }
  };
}

function updateLoadingFile(list) {
  return {
    type: UPDATE_LOADING_FILE,
    payload: list
  };
}

export function addFile(addList, limit, runningID) {
  /* new added items */
  const itemList = addList.slice(0, limit).map((item, idx) => ({
    id: runningID + 1 + idx,
    url: item.url,
    userDefinedData: item.userDefinedData
  }));

  return {
    type: ADD_FILE,
    payload: {
      list: itemList,
      limit: limit,
      newRunningID: runningID + itemList.length
    }
  };
}

export function deleteFile(currentFileEntities, entityIDs, onDelete) {
  if (typeof onDelete === 'function') {
    const itemList = entityIDs.filter(entityID => currentFileEntities[entityID]).map(entityID => {
      const entity = currentFileEntities[entityID];
      return {
        id: entityID,
        url: entity.url,
        status: entity.status,
        progress: entity.progress,
        errMsg: entity.errMsg,
        userDefinedData: entity.userDefinedData
      };
    });

    onDelete(itemList);
  }

  return {
    type: DELETE_FILE,
    payload: entityIDs
  };
}

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
}

export function endEdit(editTarget, hoverTarget) {
  return {
    type: END_EDIT,
    payload: {
      editTarget: editTarget,
      hoverTarget: hoverTarget
    }
  };
}

export function updateEdit({ entityID, cursorX, cursorY }) {
  return {
    type: UPDATE_EDIT,
    payload: {
      entityID: entityID,
      cursorX: cursorX,
      cursorY: cursorY
    }
  };
}

export function updatePlaceholder(idx) {
  return {
    type: UPDATE_PLACEHOLDER,
    payload: idx
  };
}

export function toggleGallery() {
  return {
    type: TOGGLE_GALLERY
  };
}

export function setGalleryFilterOpts(optList) {
  return {
    type: SET_GALLERY_FILTER_OPTS,
    payload: optList
  };
}

export function changeGalleryFilter(category, page) {
  return {
    type: CHANGE_GALLERY_FILTER,
    payload: {
      category: category,
      page: page
    }
  };
}

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
}

function requestGalleryImage() {
  return {
    type: REQUEST_GALLERY_IMAGE
  };
}

function receiveGalleryImage(list) {
  return {
    type: RECEIVE_GALLERY_IMAGE,
    payload: list
  };
}

export function changeGallerySelection(list) {
  return {
    type: CHANGE_GALLERY_SELECTION,
    payload: list
  };
}
