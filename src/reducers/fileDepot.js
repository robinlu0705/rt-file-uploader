import * as actions from 'actions';
import * as CONSTANTS from 'constants';

const defaultState = {
  entities: {},
  order: [],
  selections: [],
  runningID: 0
};

export default (state = defaultState, action) => {
  const actionHandlers = {
    [actions.ADD_LOADING_FILE]() {
      const IDList = action.payload.IDList;
      const runningID = action.payload.runningID;
      const remainedIDs = action.payload.remainedIDs;
      const newEntities = {};
      const newEntityOrder = [];

      for (let id of remainedIDs) {
        newEntities[id] = state.entities[id];
        newEntityOrder.push(id);
      }

      for (let i = 0; i < IDList.length; i++) {
        const id = IDList[i];
        newEntities[id] = {
          url: '',
          status: CONSTANTS.FILE_STATUS_LOADING,
          progress: 0
        };

        newEntityOrder.push(id);
      }

      return Object.assign({}, state, {
        entities: newEntities,
        order: newEntityOrder,
        selections: [],
        runningID: runningID
      });
    },

    [actions.UPDATE_LOADING_FILE]() {
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
        const newEntities = Object.assign({}, state.entities);
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
    },

    [actions.ADD_FILE]() {
      const list = action.payload.list;
      const runningID = action.payload.runningID;
      const remainedIDs = action.payload.remainedIDs;
      const newEntities = {};
      const newEntityOrder = [];

      for (let id of remainedIDs) {
        newEntities[id] = state.entities[id];
        newEntityOrder.push(id);
      }

      for (let i = 0; i < list.length; i++) {
        const id = list[i].id;
        const url = list[i].url;
        const userDefinedData = list[i].userDefinedData;
        newEntities[id] = {
          url: url,
          status: CONSTANTS.FILE_STATUS_COMPLETE,
          progress: 100,
          errMsg: '',
          userDefinedData: userDefinedData
        };

        newEntityOrder.push(id);
      }

      return Object.assign({}, state, {
        entities: newEntities,
        order: newEntityOrder,
        selections: [],
        runningID: runningID
      });
    },

    [actions.DELETE_FILE]() {
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
    },

    [actions.END_EDIT]() {
      const editTarget = action.payload.editTarget;
      const hoverTarget = action.payload.hoverTarget;
      const editIdx = state.order.indexOf(editTarget);
      const hoverIdx = state.order.indexOf(hoverTarget);
      let order = state.order.slice(0, editIdx).concat(state.order.slice(editIdx + 1));
      order = order.slice(0, hoverIdx).concat([ editTarget ]).concat(order.slice(hoverIdx));
      return Object.assign({}, state, {
        order: order
      });
    }
  };
  
  if (action.type in actionHandlers) {
    return actionHandlers[action.type]();
  }

  return state;
};
