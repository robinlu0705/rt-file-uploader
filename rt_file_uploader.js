/* will add __FileUploaderDependencies__ and FileUploader to your namespace */
window.RT = window.RT || {};
RT.__FileUploaderDependencies__ = {};
RT.FileUploader = {};

(function(DEPENDENCIES_NAMESPACE, APP_NAMESPACE) {
  /* functional programming utility functions */
  (function() {
    /**
     * @param {...function} f
     * @return {function}
     */
    var compose = function(f) {
      var funcs = arguments;
      return function() {
        var args = arguments;
        for (var i = funcs.length; i-- > 0;) {
          args = [ funcs[i].apply(this, args) ];
        }

        return args[0];
      };
    };

    /**
     * @param {function} f
     * @param {*...} arg
     */
    var curryIt = function(f, arg) {
      var curriedParams = Array.prototype.slice.call(arguments, 1);
      return function() {
        var params = Array.prototype.slice.call(arguments, 0);
        return f.apply(this, curriedParams.concat(params));
      };
    };

    /* exports */
    DEPENDENCIES_NAMESPACE.FpUtils = {
      compose: compose,
      curryIt: curryIt
    };
  }());

  /* store utility functions */
  (function(DEPENDENCIES) {
    /* dependencies */
    var $ = DEPENDENCIES.$;
    var FpUtils = DEPENDENCIES.FpUtils;

    /* constants */
    var IDENTIFIER = 'RT_FILE_UPLOADER';

    var createStore = function(reducer, debug) {
      var $store = $('<div />');
      var reduce = FpUtils.curryIt(__calcNewState__, reducer);
      var fireChange = FpUtils.curryIt(__fireStoreChange__, $store, IDENTIFIER);
      var getState = FpUtils.curryIt(__getStoreState__, $store);
      var listen = FpUtils.curryIt(__addStoreListener__, $store, IDENTIFIER);

      $store.state = reducer({}, {});
      $store.state.__DEBUG__ = {
        action: {},
        diff: []
      };

      $store.getState = getState;
      $store.listen = listen;
      $store.dispatch = function(action) {
        if (typeof action === 'function') {
          action($store.dispatch);
        } else {
          var newState = reduce($store.state, action);
          var diff = __diffStates__($store.state, newState);

          if (debug) {
            var changedParts = {};

            for (var i = 0; i < diff.length; i++) {
              changedParts[diff[i]] = newState[diff[i]];
            }

            console.log('\n===Action fired===');
            console.log('-> Action:');
            console.log(action);
            console.log('-> Changed parts: ');
            console.log(changedParts);
            console.log('===================\n');
          }

          if (diff.length) {
            $store.state = newState;
            fireChange(diff);
          }
        }
      };

      return $store;
    };

    var __calcNewState__ = function(reducer, state, action) {
      return reducer(state, action);
    };

    var __diffStates__ = function(oldState, newState) {
      var ret = [];
      for (var key in newState) {
        if (newState[key] !== oldState[key]) {
          ret.push(key);
        }
      }

      return ret;
    }

    var __getStoreState__ = function($store, statePart) {
      if (statePart) {
        return $store.state[statePart];
      } else {
        return $store.state;
      }
    };

    var __fireStoreChange__ = function($store, IDENTIFIER, stateParts) {
      var prefix = IDENTIFIER.toString() || '';
      for (var i = 0; i < stateParts.length; i++) {
        $store.trigger(prefix + stateParts[i]);
      }
    };

    var __addStoreListener__ = function($store, IDENTIFIER, statePart, handler) {
      var prefix = IDENTIFIER.toString() || '';
      $store.on(prefix + statePart, handler);
    };

    /* exports */
    DEPENDENCIES_NAMESPACE.StoreUtils = {
      createStore: createStore,
      private: {
        __calcNewState__: __calcNewState__,
        __diffStates__: __diffStates__,
        __getStoreState__: __getStoreState__,
        __fireStoreChange__: __fireStoreChange__,
        __addStoreListener__: __addStoreListener__
      }
    };
  }({ $: $, FpUtils: DEPENDENCIES_NAMESPACE.FpUtils }));

  /* main utility functions */
  (function(DEPENDENCIES) {
    /* dependencies */
    var $ = DEPENDENCIES.$;

    var checkEnv = function(userAgent) {
      return '';
    };

    var appendNode = function($target, $source) {
      $target.append($source);
      return $target;
    };

    var isCollided = function(object, pos) {
      var left = object.left;
      var top = object.top;
      var width = object.width;
      var height = object.height;
      var x = pos.x;
      var y = pos.y;

      var boundaryLeft = left;
      var boundaryRight = left + width;
      var boundaryTop = top;
      var boundaryBottom = top + height;

      if (x > boundaryLeft && x < boundaryRight && y > boundaryTop && y < boundaryBottom) {
        return true;
      } else {
        return false
      }
    };

    var __transformPrefixer__ = function(op) {
      return {
        '-webkit-transform': op,
        '-moz-transform': op,
        '-ms-transform': op,
        '-o-transform': op,
        'transform': op
      };
    };

    /* exports */
    DEPENDENCIES_NAMESPACE.Utils = {
      checkEnv: checkEnv,
      appendNode: appendNode,
      isCollided: isCollided,
      __transformPrefixer__: __transformPrefixer__,
    };
  }({ $: $ }));

  /* actions */
  (function() {
    /* constants */
    var DISPLAY_MODE = 'DISPLAY_MODE';
    var EDIT_MODE = 'EDIT_MODE';

    /* action type constants */
    var ADD_LOADING_FILE = 'ADD_LOADING_FILE';
    var COMPLETE_LOADING_FILE = 'COMPLETE_LOADING_FILE';
    var ADD_FILE = 'ADD_FILE';
    var DELETE_FILE = 'DELETE_FILE';
    var START_EDIT = 'START_EDIT';
    var UPDATE_EDIT = 'UPDATE_EDIT';
    var END_EDIT = 'END_EDIT';
    var UPDATE_PLACEHOLDER = 'UPDATE_PLACEHOLDER';
    var UPDATE_LAYOUT = 'UPDATE_LAYOUT';

    var uploadStart = function(fileList, limit, runningID) {
      return function(dispatch) {
        var IDList = [];
        var urlList = [];
        var count = 0;

        for (var i = 0; i < fileList.length && i < limit; i++) {
          IDList.push(runningID + 1 + i);
          urlList.push('https://unsplash.it/120/90?image=' + (i + 101).toString());
          ++count;
        }

        dispatch(addLoadingFile(IDList, runningID + count, limit));

        setTimeout(function() {
          dispatch(completeLoadingFile(IDList, urlList));
        }, 3000);
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

    var completeLoadingFile = function(IDList, urlList) {
      return {
        type: COMPLETE_LOADING_FILE,
        payload: {
          IDList: IDList,
          urlList: urlList
        }
      };
    };

    var addFile = function(fileList, limit) {
      return {
        type: ADD_FILE,
        payload: {
          limit: limit,
          fileList: fileList
        }
      };
    };

    var deleteFile = function(entityID) {
      return {
        type: DELETE_FILE,
        payload: entityID
      };
    };

    var updateLayout = function(thumbnailLayouts) {
      return {
        type: UPDATE_LAYOUT,
        payload: thumbnailLayouts
      };
    }

    var startEdit = function(params) {
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

    var endEdit = function(editTarget, hoverTarget) {
      return {
        type: END_EDIT,
        payload: {
          editTarget: editTarget,
          hoverTarget: hoverTarget
        }
      };
    };

    var updateEdit = function(params) {
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

    var updatePlaceholder = function(idx) {
      return {
        type: UPDATE_PLACEHOLDER,
        payload: idx
      };
    };

    /* exports */
    DEPENDENCIES_NAMESPACE.Actions = {
      DISPLAY_MODE: DISPLAY_MODE,
      EDIT_MODE: EDIT_MODE,

      ADD_LOADING_FILE: ADD_LOADING_FILE,
      COMPLETE_LOADING_FILE: COMPLETE_LOADING_FILE,
      ADD_FILE: ADD_FILE,
      DELETE_FILE: DELETE_FILE,
      START_EDIT: START_EDIT,
      UPDATE_EDIT: UPDATE_EDIT,
      END_EDIT: END_EDIT,
      UPDATE_PLACEHOLDER: UPDATE_PLACEHOLDER,
      UPDATE_LAYOUT: UPDATE_LAYOUT,

      uploadStart: uploadStart,
      deleteFile: deleteFile,
      updateLayout: updateLayout,
      startEdit: startEdit,
      endEdit: endEdit,
      updateEdit: updateEdit,
      updatePlaceholder: updatePlaceholder
    };
  }());

  /* reducers */
  (function(DEPENDENCIES) {
    /* common constants */
    FILE_STATUS_LOADING = 'FILE_STATUS_LOADING';
    FILE_STATUS_COMPLETE = 'FILE_STATUS_COMPLETE';

    /* state parts constants */
    var FILE_DEPOT = 'FILE_DEPOT';
    var LAYOUT_DEPOT = 'LAYOUT_DEPOT';
    var MODE_DEPOT = 'MODE_DEPOT';
    var EDIT_DEPOT = 'EDIT_DEPOT';
    var PLACEHOLDER_DEPOT = 'PLACEHOLDER_DEPOT';

    /* dependencies */
    var Actions = DEPENDENCIES.Actions;

    var fileDepotDefaultState = {
      entities: {},
      order: [],
      selections: [],
      runningID: 0
    };

    var fileDepot = function(state, action) {
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

        case Actions.COMPLETE_LOADING_FILE:
          var IDList = action.payload.IDList;
          var urlList = action.payload.urlList;
          var needUpdate = false;

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
              var url = urlList[i];
              var entity = newEntities[id];
              if (entity) {
                entity.url = url;
                entity.status = FILE_STATUS_COMPLETE;
                entity.progress = 100;
              }
            }

            return $.extend({}, state, {
              entities: newEntities,
              order: newEntityOrder
            });
          }
        break;

        case Actions.ADD_FILE:
          var limit = action.payload.limit;
          var fileList = action.payload.fileList;
          var count = 0;
          var newEntities = {};
          var newEntityOrder = [];

          for (var i = 0; count < limit && i < fileList.length; i++) {
            newEntities[count] = fileList[i];
            newEntityOrder.push(count);
            count++;
          }

          for (var i = 0; count < limit && i < state.order.length; i++) {
            var idx = (state.order)[i];
            newEntities[count] = (state.entities)[idx];
            newEntityOrder.push(count);
            count++;
          }

          return $.extend({}, state, {
            entities: newEntities,
            order: newEntityOrder,
            selections: []
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

    var layoutDepot = function(state, action) {
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

    var modeDepot = function(state, action) {
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

    var editDepot = function(state, action) {
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

    var placeholderDepot = function(state, action) {
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

    /* exports */
    DEPENDENCIES_NAMESPACE.Reducers = {
      FILE_STATUS_LOADING: FILE_STATUS_LOADING,
      FILE_STATUS_COMPLETE: FILE_STATUS_COMPLETE,

      FILE_DEPOT: FILE_DEPOT,
      LAYOUT_DEPOT: LAYOUT_DEPOT,
      MODE_DEPOT: MODE_DEPOT,
      EDIT_DEPOT: EDIT_DEPOT,
      PLACEHOLDER_DEPOT: PLACEHOLDER_DEPOT,

      fileDepot: fileDepot,
      layoutDepot: layoutDepot,
      modeDepot: modeDepot,
      editDepot: editDepot,
      placeholderDepot: placeholderDepot
    };
  }({ Actions: DEPENDENCIES_NAMESPACE.Actions }));

  /* component - App */
  (function(DEPENDENCIES) {
    /* depedencies */
    var Actions = DEPENDENCIES.Actions;
    var FpUtils = DEPENDENCIES.FpUtils;
    var Reducers = DEPENDENCIES.Reducers;

    /* css prefix constants */
    var IDENTIFIER = 'RT_FILE_UPLOADER';

    var gen = function($store, opts) {
      var limit = opts.limit

      var $root = $('<div />')
        .addClass(IDENTIFIER)
        .on('dragover', function(e) {
          e.preventDefault();
          $root.addClass('drag-over');
        })
        .on('dragleave', function(e) {
          e.preventDefault();
          $root.removeClass('drag-over');
        })
        .on('drop', function(e) {
          e.preventDefault();
          $root.removeClass('drag-over');
          var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
          var files = e.originalEvent.dataTransfer.files;
          $store.dispatch(Actions.uploadStart(files, limit, getFileDepot().runningID));
        });

      return $root;
    };

    /* exports */
    DEPENDENCIES_NAMESPACE.App = {
      gen: gen
    };
  }({
    Actions: DEPENDENCIES_NAMESPACE.Actions,
    FpUtils: DEPENDENCIES_NAMESPACE.FpUtils,
    Reducers: DEPENDENCIES_NAMESPACE.Reducers
  }));

  /* component - ToolBar */
  (function(DEPENDENCIES) {
    /* dependencies */
    var FpUtils = DEPENDENCIES.FpUtils;
    var Actions = DEPENDENCIES.Actions;
    var Reducers = DEPENDENCIES.Reducers;

    var gen = function($store, opts) {
      var limit = opts.limit;

      var $hintText1 = $('<div />')
        .addClass('hint-text')
        .append($('<span />').text('選擇檔案'));

      var $hintText2 = $('<div />')
        .addClass('hint-text')
        .append($('<span />').addClass('separator').text('或'))
        .append($('<span />').text('拖曳檔案至此'));

      var $uploadIcon = $('<i />')
        .addClass('upload-icon')
        .addClass('fa')
        .addClass('fa-upload');

      var _$addLocalInput = $('<input type="file" accept="image/*;capture=camera"/>') // hack for ie8, since .attr('type', 'file') act oddly
        .addClass('add-local-input')
        .attr('multiple', '')
        .change(function(e) {
          var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
          var $this = $(this);
          var files = $this[0].files;
          $store.dispatch(Actions.uploadStart(files, limit, getFileDepot().runningID));
          $this.val('');
       });

      var _$addLocalFakeButton = $('<div />')
        .addClass('rt-button')
        .addClass('rt-button-mini')
        .addClass('rt-button-default')
        .text('本地檔案');

      var $addLocal = $('<label />')
        .addClass('action')
        .append(_$addLocalInput)
        .append(_$addLocalFakeButton);

      var $addRuten = $('<button />')
        .addClass('action')
        .addClass('rt-button')
        .addClass('rt-button-mini')
        .addClass('rt-button-default')
        .text('露天圖庫');

      var $wrap = $('<div />')
        .addClass('wrap')
        .append($uploadIcon)
        .append($hintText1)
        .append($addLocal)
        .append($addRuten)
        .append($hintText2);

      var $root = $('<div />')
        .addClass('tool-bar')
        .append($wrap);

      $store.listen(Reducers.FILE_DEPOT, function() {
        __renderOnFileDepotChange__($store, opts, $root);
      });

      return __renderOnFileDepotChange__($store, opts, $root);
    };

    var __renderOnFileDepotChange__ = function($store, opts, $root) {
      var limit = opts.limit;
      var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);

      if (!getFileDepot().order.length) {
        $root
          .addClass('hint')
          .css('height', opts.minHeight - 10);
      } else {
        $root
          .removeClass('hint')
          .css('height', 'auto');
      }

      return $root;
    };

    /* exports */
    DEPENDENCIES_NAMESPACE.ToolBar = {
      gen: gen,
      __renderOnFileDepotChange__: __renderOnFileDepotChange__
    };
  }({
    FpUtils: DEPENDENCIES_NAMESPACE.FpUtils,
    Reducers: DEPENDENCIES_NAMESPACE.Reducers,
    Actions: DEPENDENCIES_NAMESPACE.Actions
  }));

  /* component - ThumbnailViewer */
  (function(DEPENDENCIES) {
    /* dependencies */
    var FpUtils = DEPENDENCIES.FpUtils;
    var Utils = DEPENDENCIES.Utils;
    var Actions = DEPENDENCIES.Actions;
    var Reducers = DEPENDENCIES.Reducers;

    var gen = function($store, opts) {
      /* get states */
      var getModeDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.MODE_DEPOT);
      var getEditDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.EDIT_DEPOT);
      var getPlaceholderDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.PLACEHOLDER_DEPOT);

      $root = $('<div />')
        .addClass('thumbnail-viewer');

      $store.listen(Reducers.FILE_DEPOT, function() {
        __render__($store, opts, $root);
      });

      $store.listen(Reducers.MODE_DEPOT, function() {
        __renderOnModeDepotChange__($store, opts, $root);
      });

      $store.listen(Reducers.EDIT_DEPOT, function() {
       __renderOnEditDepotChange__($store, opts, $root);
      });

      $store.listen(Reducers.PLACEHOLDER_DEPOT, function() {
        __renderOnPlaceholderDepotChange__($store, opts, $root);
      });

      return __render__($store, opts, $root);
    };

    var __render__ = function($store, opts, $root) {
      var thumbnailWidth = opts.thumbnailWidth;
      var thumbnailHeight = opts.thumbnailHeight;

      /* get states */
      var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
      var getModeDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.MODE_DEPOT);
      $root.empty();

      var thumbnails = $.map(getFileDepot().order, function(entityID, idx) {
        var file = getFileDepot().entities[entityID];
        var reader = new FileReader();
        var $elm = $('<div />')
          .attr('data-ref', 'thumbnail')
          .addClass('thumbnail')
          .attr('data-key', idx)
          .css('width', thumbnailWidth)
          .css('height', thumbnailHeight)
          .on('touchstart mousedown', function(e) {
            e.preventDefault();
            if (getModeDepot().mode === Actions.DISPLAY_MODE) {
              var rootOffset = $root.offset();
              var offset = $(this).offset();
              var touchList = e.originalEvent.targetTouches;
              var pageX = touchList ? touchList[0].pageX : e.pageX;
              var pageY = touchList ? touchList[0].pageY : e.pageY;

              $store.dispatch(Actions.startEdit({
                entityID: entityID,
                cursorX: pageX - rootOffset.left,
                cursorY: pageY - rootOffset.top
              }));
            }
          });

        var $img = $('<div />')
          .addClass('img');

        switch (file.status) {
          case Reducers.FILE_STATUS_LOADING:
            $icon = $('<i />')
              .addClass('fa fa-circle-o-notch fa-spin fa-2x fa-fw loading-ring');
            $img.append($icon);
          break;

          case Reducers.FILE_STATUS_COMPLETE:
            if (file.url) {
              $img.css('background-image', 'url(' + file.url + ')');
            } else {
              $msg = $('<div />')
                .addClass('msg')
                .append($('<i />').addClass('fa fa-exclamation-triangle icon'))
                .append($('<div />').addClass('text').text('檔案格式錯誤'));
              $img.append($msg);
            }
          break;
        }

        var $imgWrap = $('<div />')
          .addClass('img-wrap')
          .css('width', thumbnailWidth)
          .css('height', thumbnailHeight)
          .append($img);

        var $delete = $('<i />')
          .addClass('fa')
          .addClass('fa-times')
          .addClass('delete')
          .on('touchstart mousedown', function(e) {
            e.stopPropagation();
          }) 
          .click(function(e) {
            e.stopPropagation();
            $store.dispatch(Actions.deleteFile(entityID));
          });

        $elm
          .append($imgWrap)
          .append($delete);

        return $elm;
      });

      $.each(thumbnails, function(idx, $thumbnail) {
        $root.append($thumbnail);
      });

      var thumbnailLayouts = $.map(thumbnails, function($thumbnail) {
        return $thumbnail.position();
      });

      $store.dispatch(Actions.updateLayout(thumbnailLayouts));

      return $root;
    };

    var __renderOnModeDepotChange__ = function($store, opts, $root) {
      var thumbnailWidth = opts.thumbnailWidth;
      var thumbnailHeight = opts.thumbnailHeight;
      var getModeDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.MODE_DEPOT);
      var getLayoutDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.LAYOUT_DEPOT);
      var getEditDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.EDIT_DEPOT);
      var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
      var getPlaceholderDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.PLACEHOLDER_DEPOT);

      if (getModeDepot().mode === Actions.EDIT_MODE) {
        $root.on('touchend mouseup', function(e) {
          if (getModeDepot().mode === Actions.EDIT_MODE) {
            $store.dispatch(Actions.endEdit(getEditDepot().target, getPlaceholderDepot().hoverTarget));
          }
        })
        .on('touchmove mousemove', function(e) {
          e.preventDefault();
          var offset = $(this).offset();
          var touchList = e.originalEvent.targetTouches;
          var pageX = touchList ? touchList[0].pageX : e.pageX;
          var pageY = touchList ? touchList[0].pageY : e.pageY;
          var cursorX = pageX - offset.left;
          var cursorY = pageY - offset.top;

          $store.dispatch(Actions.updateEdit({
            entityID: getEditDepot().target,
            cursorX: cursorX,
            cursorY: cursorY
          }));

          $.each(getLayoutDepot().thumbnailLayouts, function(idx, layout) {
            var object = {
              left: layout.left,
              top: layout.top,
              width: thumbnailWidth,
              height: thumbnailHeight
            };

            var pos = {
              x: cursorX,
              y: cursorY
            };

            if (Utils.isCollided(object, pos)) {
              $store.dispatch(Actions.updatePlaceholder((getFileDepot().order)[idx]));
              return false;
            }
          });
        });
      } else {
        $root
          .off('touchmove')
          .off('mousemove')
          .off('touchend')
          .off('mouseup');
      }
    };

    var __renderOnEditDepotChange__ = function($store, opts, $root) {
      var getModeDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.MODE_DEPOT);
      var getEditDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.EDIT_DEPOT);
      var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
      var getLayoutDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.LAYOUT_DEPOT);

      if (getModeDepot().mode === Actions.EDIT_MODE) {
        $.each(getFileDepot().order, function(idx, entityID) {
          if (entityID === getEditDepot().target) {
            $root
              .children('[data-ref=thumbnail]')
              .eq(idx)
              .attr('date-ref', 'dragTarget')
              .addClass('drag-target')
              .css({
                position: 'absolute',
                zIndex: '99',
                left: (getLayoutDepot().thumbnailLayouts)[idx].left + getEditDepot().currentPos.x - getEditDepot().startPos.x,
                top: (getLayoutDepot().thumbnailLayouts)[idx].top + getEditDepot().currentPos.y - getEditDepot().startPos.y - 7
              });
          }
        });
      }

      return $root;
    };

    var __renderOnPlaceholderDepotChange__ = function($store, opts, $root) {
      var thumbnailWidth = opts.thumbnailWidth;
      var thumbnailHeight = opts.thumbnailHeight;

      var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
      var getEditDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.EDIT_DEPOT);
      var getPlaceholderDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.PLACEHOLDER_DEPOT);

      var hoverTarget = getPlaceholderDepot().hoverTarget;
      var editTarget = getEditDepot().target;
      $root.children('[data-ref=placeholder]').remove();

      if (hoverTarget !== null) {
        var placeholderIdx = getFileDepot().order.indexOf(hoverTarget);
        var editIdx = getFileDepot().order.indexOf(editTarget);

        $placeholderTarget = $root.children('[data-ref=thumbnail]').eq(placeholderIdx);
        $placeholder = $('<div />')
          .attr('data-ref', 'placeholder')
          .addClass('placeholder')
          .css({
            width: thumbnailWidth,
            height: thumbnailHeight
          });

        if (editIdx > placeholderIdx) {
          $placeholder.insertBefore($placeholderTarget);
        } else {
          $placeholder.insertAfter($placeholderTarget);
        }
      }

      return $root;
    };

    /* exports */
    DEPENDENCIES_NAMESPACE.ThumbnailViewer = {
      gen: gen,
      __render__: __render__,
      __renderOnModeDepotChange__: __renderOnModeDepotChange__,
      __renderOnEditDepotChange__: __renderOnEditDepotChange__,
      __renderOnPlaceholderDepotChange__: __renderOnPlaceholderDepotChange__
    };
  }({
    FpUtils: DEPENDENCIES_NAMESPACE.FpUtils,
    Utils: DEPENDENCIES_NAMESPACE.Utils,
    Reducers: DEPENDENCIES_NAMESPACE.Reducers,
    Actions: DEPENDENCIES_NAMESPACE.Actions
  }));

  /* entry */
  (function(DEPENDENCIES) {
    /* dependencies */
    var StoreUtils = DEPENDENCIES.StoreUtils;
    var FpUtils = DEPENDENCIES.FpUtils;
    var Utils = DEPENDENCIES.Utils;
    var Actions = DEPENDENCIES.Actions;
    var Reducers = DEPENDENCIES.Reducers;
    var App = DEPENDENCIES.App;
    var ToolBar = DEPENDENCIES.ToolBar;
    var ThumbnailViewer = DEPENDENCIES.ThumbnailViewer;

    /* main functions */
    var __seasonOpts__ = function(opts) {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return $.extend({}, opts, {
        uiType: Utils.checkEnv(userAgent),
        minHeight: opts.minHeight || 140,
        thumbnailWidth: opts.thumbnailWidth || 120,
        thumbnailHeight: opts.thumbnailHeight || 90,
        limit: opts.limit || 3
      });
    };

    var __genUI__ = function(opts) {
      /* create store with initial state */
      var combinedReducer = function(state, action) {
        var newState = {};
        newState[Reducers.FILE_DEPOT] = Reducers.fileDepot(state[Reducers.FILE_DEPOT], action);
        newState[Reducers.LAYOUT_DEPOT] = Reducers.layoutDepot(state[Reducers.LAYOUT_DEPOT], action);
        newState[Reducers.MODE_DEPOT] = Reducers.modeDepot(state[Reducers.MODE_DEPOT], action);
        newState[Reducers.EDIT_DEPOT] = Reducers.editDepot(state[Reducers.EDIT_DEPOT], action);
        newState[Reducers.PLACEHOLDER_DEPOT] = Reducers.placeholderDepot(state[Reducers.PLACEHOLDER_DEPOT], action);

        return newState;
      };

      var $store = StoreUtils.createStore(combinedReducer, opts.debug);
      /* create file loader ui */
      var $App = App.gen($store, opts);
      var $ToolBar = ToolBar.gen($store, opts);
      var $ThumbnailViewer = ThumbnailViewer.gen($store, opts);

      var appendComponentToApp = FpUtils.curryIt(Utils.appendNode, $App);

      appendComponentToApp($ToolBar);
      appendComponentToApp($ThumbnailViewer);

      return $App;
    };

    /* exports */
    /**
     * @param {$elm} $container
     * @param {Object} opts
     * @param {number} opts.minHeight
     * @param {number} opts.thumbnailWidth
     * @param {number} opts.thumbnailHeight
     * @param {number} opts.limit
     */
    APP_NAMESPACE.gen = function($container, opts) {
      var appendUIToContainer = FpUtils.curryIt(Utils.appendNode, $container);
      var execute = FpUtils.compose(appendUIToContainer, __genUI__, __seasonOpts__);
      execute(opts);
    };

    APP_NAMESPACE.__genUI__ = __genUI__;
    APP_NAMESPACE.__seasonOpts__ = __seasonOpts__;
  }({
    FpUtils: DEPENDENCIES_NAMESPACE.FpUtils,
    StoreUtils: DEPENDENCIES_NAMESPACE.StoreUtils,
    Utils: DEPENDENCIES_NAMESPACE.Utils,
    Reducers: DEPENDENCIES_NAMESPACE.Reducers,
    App: DEPENDENCIES_NAMESPACE.App,
    ToolBar: DEPENDENCIES_NAMESPACE.ToolBar,
    ThumbnailViewer: DEPENDENCIES_NAMESPACE.ThumbnailViewer
  }));
}(RT.__FileUploaderDependencies__, RT.FileUploader));
