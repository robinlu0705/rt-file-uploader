/* reducers */
import * as Actions from 'Actions';

/* common constants */
export var FILE_STATUS_LOADING = 'FILE_STATUS_LOADING';
export var FILE_STATUS_COMPLETE = 'FILE_STATUS_COMPLETE';
export var FILE_STATUS_ERROR = 'FILE_STATUS_ERROR';
export var FILE_STATUS_TIMEOUT = 'FILE_STATUS_TIMEOUT';

/* state parts constants */
export var FILE_DEPOT = 'FILE_DEPOT';
export var LAYOUT_DEPOT = 'LAYOUT_DEPOT';
export var MODE_DEPOT = 'MODE_DEPOT';
export var EDIT_DEPOT = 'EDIT_DEPOT';
export var PLACEHOLDER_DEPOT = 'PLACEHOLDER_DEPOT';
export var GALLERY_STATUS_DEPOT = 'GALLERY_STATUS_DEPOT';
export var GALLERY_FILTER_DEPOT = 'GALLERY_FILTER_DEPOT';
export var GALLERY_IMAGE_DEPOT = 'GALLERY_IMAGE_DEPOT';
export var GALLERY_SELECTION_DEPOT = 'GALLERY_SELECTION_DEPOT';

var fileDepotDefaultState = {
  entities: {},
  order: [],
  selections: [],
  runningID: 0
};

export function fileDepot(state, action) {
  state = state || fileDepotDefaultState;

  switch (action.type) {
    case Actions.ADD_LOADING_FILE:
      var IDList = action.payload.IDList;
      var runningID = action.payload.runningID;
      var limit = action.payload.limit;
      var newEntities = {};
      var newEntityOrder = [];
      var count = 0;

      for (var i = 0; i < IDList.length && count < limit; i++) {
        var id = IDList[i];
        newEntities[id] = {
          url: '',
          status: FILE_STATUS_LOADING,
          progress: 0
        };

        newEntityOrder.push(id);
        ++count;
      }

      for (var i = 0; i < state.order.length && count < limit; i++) {
        var id = state.order[i];
        newEntities[id] = state.entities[id];
        newEntityOrder.push(id);
        ++count;
      }

      return $.extend({}, state, {
        entities: newEntities,
        order: newEntityOrder,
        selections: [],
        runningID: runningID
      });
    break;

    case Actions.UPDATE_LOADING_FILE:
      var list = action.payload;
      var needUpdate = false;
      var IDList = $.map(list, function(item) {
        return item.id;
      });

      for (var i = 0; i < state.order.length; i++) {
        var id = state.order[i];
        if (IDList.indexOf(id) !== -1) {
          needUpdate = true;
          break;
        }
      }

      if (!needUpdate) {
        return state;
      } else {
        var newEntities = $.extend({}, state.entities);
        var newEntityOrder = state.order.slice(0);

        for (var i = 0; i < IDList.length; i++) {
          var id = IDList[i];
          var url = list[i].url;
          var status = list[i].status;
          var progress = list[i].progress;
          var errMsg = list[i].errMsg;
          var userDefinedData = list[i].userDefinedData;
          var entity = newEntities[id];
          if (entity) {
            entity.url = url;
            entity.status = status;
            entity.progress = progress;
            entity.errMsg = errMsg;
            entity.userDefinedData = userDefinedData;
          }
        }

        return $.extend({}, state, {
          entities: newEntities,
          order: newEntityOrder
        });
      }
    break;

    case Actions.ADD_FILE:
      var list = action.payload.list;
      var runningID = action.payload.runningID;
      var limit = action.payload.limit;
      var newEntities = {};
      var newEntityOrder = [];
      var count = 0;

      for (var i = 0; i < list.length && count < limit; i++) {
        var id = list[i].id;
        var url = list[i].url;
        var userDefinedData = list[i].userDefinedData;
        newEntities[id] = {
          url: url,
          status: FILE_STATUS_COMPLETE,
          progress: 100,
          errMsg: '',
          userDefinedData: userDefinedData
        };

        newEntityOrder.push(id);
        ++count;
      }

      for (var i = 0; i < state.order.length && count < limit; i++) {
        var id = state.order[i];
        newEntities[id] = state.entities[id];
        newEntityOrder.push(id);
        ++count;
      }

      return $.extend({}, state, {
        entities: newEntities,
        order: newEntityOrder,
        selections: [],
        runningID: runningID
      });
    break;

    case Actions.DELETE_FILE:
      var id = action.payload;
      var idx = state.order.indexOf(id);

      if (idx === -1) {
        return state;
      } else {
        var newEntities = $.extend({}, state.entities);
        var newEntityOrder = state.order.slice(0);

        delete newEntities[id];
        newEntityOrder.splice(idx, 1);

        return $.extend({}, state, {
          entities: newEntities,
          order: newEntityOrder,
          selections: []
        });
      }
    break;

    case Actions.END_EDIT:
      var editTarget = action.payload.editTarget;
      var hoverTarget = action.payload.hoverTarget;
      var editIdx = state.order.indexOf(editTarget);
      var hoverIdx = state.order.indexOf(hoverTarget);
      var order = state.order.slice(0, editIdx).concat(state.order.slice(editIdx + 1));
      order = order.slice(0, hoverIdx).concat([ editTarget ]).concat(order.slice(hoverIdx));
      return $.extend({}, state, {
        order: order
      });
    break;

    default:
      return state;
  }
};

var layoutDepotDefaultState = {
  thumbnailLayouts: []
};

export function layoutDepot(state, action) {
  state = state || layoutDepotDefaultState;
  switch (action.type) {
    case Actions.UPDATE_LAYOUT:
      return $.extend({}, state, {
        thumbnailLayouts: action.payload
      });
    break;

    default:
      return state;
  }
};

var modeDepotDefaultState = {
  mode: Actions.DISPLAY_MODE
};

export function modeDepot(state, action) {
  state = state || modeDepotDefaultState;
  switch (action.type) {
    case Actions.START_EDIT:
      return $.extend({}, state, {
        mode: Actions.EDIT_MODE
      });
    break;

    case Actions.END_EDIT:
      return $.extend({}, state, {
        mode: Actions.DISPLAY_MODE
      });
    break;

    default:
      return state;
  }
};

var editDepotDefaultState = {
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

export function editDepot(state, action) {
  state = state || editDepotDefaultState;
  switch (action.type) {
    case Actions.START_EDIT:
      return $.extend({}, state, {
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
    break;

    case Actions.UPDATE_EDIT:
      return $.extend({}, state, {
        currentPos: {
          x: action.payload.cursorX,
          y: action.payload.cursorY
        }
      });
    break;

    default:
      return state;
  }
};

var placeholderDepotDefaultState = {
  hoverTarget: null
};

export function placeholderDepot(state, action) {
  state = state || placeholderDepotDefaultState;
  switch (action.type) {
    case Actions.START_EDIT:
      return $.extend({}, state, {
        hoverTarget: action.payload.entityID
      });
    break;

    case Actions.UPDATE_PLACEHOLDER:
      return $.extend({}, state, {
        hoverTarget: action.payload
      });
    break;

    case Actions.END_EDIT:
      return $.extend({}, state, {
        hoverTarget: null
      });
    break;

    default:
      return state;
  }
};

var galleryStatusDepotDefaultState = {
  isOpened: false
};

export function galleryStatusDepot(state, action) {
  state = state || galleryStatusDepotDefaultState;
  switch (action.type) {
    case Actions.TRIGGER_GALLERY:
      return $.extend({}, state, {
        isOpened: !state.isOpened
      });
    break;

    default:
      return state;
  }
};

var galleryFilterDepotDefaultState = {
  page: 1,
  categoryList: [ { text: '--', val: '', totalPages: 1 } ], 
  category: 0,
  isFetching: false
};

export function galleryFilterDepot(state, action) {
  state = state || galleryFilterDepotDefaultState;
  switch (action.type) {
    case Actions.SET_GALLERY_FILTER_OPTS:
      var opts = $.grep(action.payload, function(opt) {
        return opt.hasOwnProperty('categoryVal');
      });

      if (opts.length > 0) {
        return $.extend({}, state, {
          categoryList: $.map(opts, function(opt) {
            return {
              text: opt.categoryName || opt.categoryVal,
              val: opt.categoryVal,
              totalPages: opt.totalPages
            };
          }),

          category: 0,
          page: 1
        });
      } else {
        return state;
      }
    break;

    case Actions.CHANGE_GALLERY_FILTER:
      var category = action.payload.category;
      var page = action.payload.page;

      return $.extend({}, state, {
        page: page,
        category: category
      });
    break;

    case Actions.REQUEST_GALLERY_IMAGE:
      return $.extend({}, state, {
        isFetching: true
      });
    break;

    case Actions.RECEIVE_GALLERY_IMAGE:
      return $.extend({}, state, {
        isFetching: false
      });
    break;

    default:
      return state;
  }
};

var galleryImageDepotDefaultState = {
  list: [],
  isFetching: false
};

export function galleryImageDepot(state, action) {
  state = state || galleryImageDepotDefaultState;
  switch (action.type) {
    case Actions.REQUEST_GALLERY_IMAGE:
      return $.extend({}, state, {
        isFetching: true,
        list: []
      });
    break;

    case Actions.RECEIVE_GALLERY_IMAGE:
      return $.extend({}, state, {
        isFetching: false,
        list: action.payload
      });
    break;

    default:
      return state;
  }
};

var gallerySelectionDepotDefaultState = {
  list: []
};

export function gallerySelectionDepot(state, action) {
  state = state || gallerySelectionDepotDefaultState;
  switch (action.type) {
    case Actions.CHANGE_GALLERY_SELECTION:
      return $.extend({}, state, {
        list: action.payload
      });
    break;

    case Actions.REQUEST_GALLERY_IMAGE:
      return $.extend({}, state, {
        list: []
      });
    break;

    default:
      return state;
  }
};
