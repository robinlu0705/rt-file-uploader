import * as actions from '/src/actions';

const defaultState = {
  page: 1,
  categoryList: [ { text: '--', val: '', totalPages: 1 } ], 
  category: 0,
  isFetching: false
};

export default (state = defaultState, action) => {
  const actionHandler = {
    [actions.SET_GALLERY_FILTER_OPTS]() {
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
    },

    [actions.CHANGE_GALLERY_FILTER]() {
      const category = action.payload.category;
      const page = action.payload.page;

      return Object.assign({}, state, {
        page: page,
        category: category
      });
    },

    [actions.REQUEST_GALLERY_IMAGE]() {
      return Object.assign({}, state, {
        isFetching: true
      });
    },

    [actions.RECEIVE_GALLERY_IMAGE]() {
      return Object.assign({}, state, {
        isFetching: false
      });
    }
  };

  if (action.type in actionHandler) {
    return actionHandler[action.type]();
  }

  return state;
};
