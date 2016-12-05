/* reducers */
import * as Actions from 'Actions';

/* common constants */
export const FILE_STATUS_LOADING = 'FILE_STATUS_LOADING';
export const FILE_STATUS_COMPLETE = 'FILE_STATUS_COMPLETE';
export const FILE_STATUS_ERROR = 'FILE_STATUS_ERROR';
export const FILE_STATUS_TIMEOUT = 'FILE_STATUS_TIMEOUT';

/* state parts constants */
export const FILE_DEPOT = 'FILE_DEPOT';
export const LAYOUT_DEPOT = 'LAYOUT_DEPOT';
export const MODE_DEPOT = 'MODE_DEPOT';
export const EDIT_DEPOT = 'EDIT_DEPOT';
export const PLACEHOLDER_DEPOT = 'PLACEHOLDER_DEPOT';
export const GALLERY_STATUS_DEPOT = 'GALLERY_STATUS_DEPOT';
export const GALLERY_FILTER_DEPOT = 'GALLERY_FILTER_DEPOT';
export const GALLERY_IMAGE_DEPOT = 'GALLERY_IMAGE_DEPOT';
export const GALLERY_SELECTION_DEPOT = 'GALLERY_SELECTION_DEPOT';

const fileDepotDefaultState = {
  entities: {},
  order: [],
  selections: [],
  runningID: 0
};

export function fileDepot(state = fileDepotDefaultState, action) {
  switch (action.type) {
    case Actions.ADD_LOADING_FILE: {
      const IDList = action.payload.IDList;
      const runningID = action.payload.runningID;
      const remainedIDs = action.payload.remainedIDs;
      const newEntities = {};
      const newEntityOrder = [];

      for (let i = 0; i < IDList.length; i++) {
        const id = IDList[i];
        newEntities[id] = {
          url: '',
          status: FILE_STATUS_LOADING,
          progress: 0
        };

        newEntityOrder.push(id);
      }

      for (let id of remainedIDs) {
        newEntities[id] = state.entities[id];
        newEntityOrder.push(id);
      }

      return Object.assign({}, state, {
        entities: newEntities,
        order: newEntityOrder,
        selections: [],
        runningID: runningID
      });
    }

    case Actions.UPDATE_LOADING_FILE: {
      const list = action.payload;
      let needUpdate = false;
      const IDList = list.map(item => item.id);

      for (let i = 0; i < state.order.length; i++) {
        const id = state.order[i];
        if (IDList.indexOf(id) !== -1) {
          needUpdate = true;
          break;
        }
      }

      if (!needUpdate) {
        return state;
      } else {
        const newEntities = $.extend({}, state.entities);
        const newEntityOrder = state.order.slice(0);

        for (let i = 0; i < IDList.length; i++) {
          const id = IDList[i];
          const url = list[i].url;
          const status = list[i].status;
          const progress = list[i].progress;
          const errMsg = list[i].errMsg;
          const userDefinedData = list[i].userDefinedData;
          const entity = newEntities[id];
          if (entity) {
            entity.url = url;
            entity.status = status;
            entity.progress = progress;
            entity.errMsg = errMsg;
            entity.userDefinedData = userDefinedData;
          }
        }

        return Object.assign({}, state, {
          entities: newEntities,
          order: newEntityOrder
        });
      }
    }

    case Actions.ADD_FILE: {
      const list = action.payload.list;
      const runningID = action.payload.runningID;
      const remainedIDs = action.payload.remainedIDs;
      const newEntities = {};
      const newEntityOrder = [];

      for (let i = 0; i < list.length; i++) {
        const id = list[i].id;
        const url = list[i].url;
        const userDefinedData = list[i].userDefinedData;
        newEntities[id] = {
          url: url,
          status: FILE_STATUS_COMPLETE,
          progress: 100,
          errMsg: '',
          userDefinedData: userDefinedData
        };

        newEntityOrder.push(id);
      }

      for (let id of remainedIDs) {
        newEntities[id] = state.entities[id];
        newEntityOrder.push(id);
      }

      return Object.assign({}, state, {
        entities: newEntities,
        order: newEntityOrder,
        selections: [],
        runningID: runningID
      });
    }

    case Actions.DELETE_FILE: {
      const newEntities = Object.assign({}, state.entities);
      const newEntityOrder = state.order.slice(0);

      for (let id of action.payload) {
        const idx = newEntityOrder.indexOf(id);

        if (idx !== -1) {
          delete newEntities[id];
          newEntityOrder.splice(idx, 1);
        }
      }

      return Object.assign({}, state, {
        entities: newEntities,
        order: newEntityOrder,
        selections: []
      });
    }

    case Actions.END_EDIT: {
      const editTarget = action.payload.editTarget;
      const hoverTarget = action.payload.hoverTarget;
      const editIdx = state.order.indexOf(editTarget);
      const hoverIdx = state.order.indexOf(hoverTarget);
      let order = state.order.slice(0, editIdx).concat(state.order.slice(editIdx + 1));
      order = order.slice(0, hoverIdx).concat([ editTarget ]).concat(order.slice(hoverIdx));
      return $.extend({}, state, {
        order: order
      });
    }

    default:
      return state;
  }
};

const layoutDepotDefaultState = {
  thumbnailLayouts: []
};

export function layoutDepot(state = layoutDepotDefaultState, action) {
  switch (action.type) {
    case Actions.UPDATE_LAYOUT: {
      return Object.assign({}, state, {
        thumbnailLayouts: action.payload
      });
    }

    default:
      return state;
  }
};

const modeDepotDefaultState = {
  mode: Actions.DISPLAY_MODE
};

export function modeDepot(state = modeDepotDefaultState, action) {
  switch (action.type) {
    case Actions.START_EDIT: {
      return Object.assign({}, state, {
        mode: Actions.EDIT_MODE
      });
    }

    case Actions.END_EDIT: {
      return Object.assign({}, state, {
        mode: Actions.DISPLAY_MODE
      });
    }

    default:
      return state;
  }
};

const editDepotDefaultState = {
  target: null,
  startPos: {
    x: 0,
    y: 0
  },

  currentPos: {
    x: 0,
    y: 0
  }
};

export function editDepot(state = editDepotDefaultState, action) {
  switch (action.type) {
    case Actions.START_EDIT: {
      return Object.assign({}, state, {
        target: action.payload.entityID,
        startPos: {
          x: action.payload.cursorX,
          y: action.payload.cursorY
        },

        currentPos: {
          x: action.payload.cursorX,
          y: action.payload.cursorY
        }
      });
    }

    case Actions.UPDATE_EDIT: {
      return Object.assign({}, state, {
        currentPos: {
          x: action.payload.cursorX,
          y: action.payload.cursorY
        }
      });
    }

    default:
      return state;
  }
};

const placeholderDepotDefaultState = {
  hoverTarget: null
};

export function placeholderDepot(state = placeholderDepotDefaultState, action) {
  switch (action.type) {
    case Actions.START_EDIT: {
      return Object.assign({}, state, {
        hoverTarget: action.payload.entityID
      });
    }

    case Actions.UPDATE_PLACEHOLDER: {
      return Object.assign({}, state, {
        hoverTarget: action.payload
      });
    }

    case Actions.END_EDIT: {
      return Object.assign({}, state, {
        hoverTarget: null
      });
    }

    default:
      return state;
  }
};

const galleryStatusDepotDefaultState = {
  isOpened: false
};

export function galleryStatusDepot(state = galleryStatusDepotDefaultState, action) {
  switch (action.type) {
    case Actions.TRIGGER_GALLERY: {
      return Object.assign({}, state, {
        isOpened: !state.isOpened
      });
    }

    default:
      return state;
  }
};

const galleryFilterDepotDefaultState = {
  page: 1,
  categoryList: [ { text: '--', val: '', totalPages: 1 } ], 
  category: 0,
  isFetching: false
};

export function galleryFilterDepot(state = galleryFilterDepotDefaultState, action) {
  switch (action.type) {
    case Actions.SET_GALLERY_FILTER_OPTS: {
      const opts = action.payload.filter(opt => opt.hasOwnProperty('categoryVal'));

      if (opts.length > 0) {
        return Object.assign({}, state, {
          categoryList: opts.map(opt => ({
            text: opt.categoryName || opt.categoryVal,
            val: opt.categoryVal,
            totalPages: opt.totalPages
          })),

          category: 0,
          page: 1
        });
      } else {
        return state;
      }
    }

    case Actions.CHANGE_GALLERY_FILTER: {
      const category = action.payload.category;
      const page = action.payload.page;

      return Object.assign({}, state, {
        page: page,
        category: category
      });
    }

    case Actions.REQUEST_GALLERY_IMAGE: {
      return Object.assign({}, state, {
        isFetching: true
      });
    }

    case Actions.RECEIVE_GALLERY_IMAGE: {
      return Object.assign({}, state, {
        isFetching: false
      });
    }

    default:
      return state;
  }
};

const galleryImageDepotDefaultState = {
  list: [],
  isFetching: false
};

export function galleryImageDepot(state = galleryImageDepotDefaultState, action) {
  switch (action.type) {
    case Actions.REQUEST_GALLERY_IMAGE: {
      return Object.assign({}, state, {
        isFetching: true,
        list: []
      });
    }

    case Actions.RECEIVE_GALLERY_IMAGE: {
      return Object.assign({}, state, {
        isFetching: false,
        list: action.payload
      });
    }

    default:
      return state;
  }
};

const gallerySelectionDepotDefaultState = {
  list: []
};

export function gallerySelectionDepot(state = gallerySelectionDepotDefaultState, action) {
  switch (action.type) {
    case Actions.CHANGE_GALLERY_SELECTION: {
      return Object.assign({}, state, {
        list: action.payload
      });
    }

    case Actions.REQUEST_GALLERY_IMAGE: {
      return Object.assign({}, state, {
        list: []
      });
    }

    default:
      return state;
  }
};
