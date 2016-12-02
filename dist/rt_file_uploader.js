var rt_file_uploader =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************************!*\
  !*** multi rt_file_uploader ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! /home/robinlu0705/rt_file_uploader/src/entry.js */1);


/***/ },
/* 1 */
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _FpUtils = __webpack_require__(/*! FpUtils */ 2);
	
	var FpUtils = _interopRequireWildcard(_FpUtils);
	
	var _StoreUtils = __webpack_require__(/*! StoreUtils */ 3);
	
	var StoreUtils = _interopRequireWildcard(_StoreUtils);
	
	var _Utils = __webpack_require__(/*! Utils */ 4);
	
	var Utils = _interopRequireWildcard(_Utils);
	
	var _Reducers = __webpack_require__(/*! Reducers */ 5);
	
	var Reducers = _interopRequireWildcard(_Reducers);
	
	var _Actions = __webpack_require__(/*! Actions */ 65);
	
	var Actions = _interopRequireWildcard(_Actions);
	
	var _App = __webpack_require__(/*! App */ 66);
	
	var App = _interopRequireWildcard(_App);
	
	var _ToolBar = __webpack_require__(/*! ToolBar */ 67);
	
	var ToolBar = _interopRequireWildcard(_ToolBar);
	
	var _ThumbnailViewer = __webpack_require__(/*! ThumbnailViewer */ 68);
	
	var ThumbnailViewer = _interopRequireWildcard(_ThumbnailViewer);
	
	var _Gallery = __webpack_require__(/*! Gallery */ 73);
	
	var Gallery = _interopRequireWildcard(_Gallery);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	window.RT = window.RT || {}; /* will add FileUploader to window.RT */
	
	var APP_NAMESPACE = window.RT.FileUploader = {};
	
	/* main functions */
	function __seasonOpts__(opts) {
	  return $.extend({}, opts, {
	    minHeight: opts.minHeight || 160,
	    thumbnailWidth: opts.thumbnailWidth || 120,
	    thumbnailHeight: opts.thumbnailHeight || 90,
	    limit: opts.limit || 3,
	    galleryFilterOpts: opts.galleryFilterOpts instanceof Array ? opts.galleryFilterOpts : []
	  });
	}
	
	function __createStore__(opts) {
	  /* create store with initial state */
	  var combinedReducer = function combinedReducer(state, action) {
	    var newState = {};
	    newState[Reducers.FILE_DEPOT] = Reducers.fileDepot(state[Reducers.FILE_DEPOT], action);
	    newState[Reducers.LAYOUT_DEPOT] = Reducers.layoutDepot(state[Reducers.LAYOUT_DEPOT], action);
	    newState[Reducers.MODE_DEPOT] = Reducers.modeDepot(state[Reducers.MODE_DEPOT], action);
	    newState[Reducers.EDIT_DEPOT] = Reducers.editDepot(state[Reducers.EDIT_DEPOT], action);
	    newState[Reducers.PLACEHOLDER_DEPOT] = Reducers.placeholderDepot(state[Reducers.PLACEHOLDER_DEPOT], action);
	    newState[Reducers.GALLERY_STATUS_DEPOT] = Reducers.galleryStatusDepot(state[Reducers.GALLERY_STATUS_DEPOT], action);
	    newState[Reducers.GALLERY_FILTER_DEPOT] = Reducers.galleryFilterDepot(state[Reducers.GALLERY_FILTER_DEPOT], action);
	    newState[Reducers.GALLERY_IMAGE_DEPOT] = Reducers.galleryImageDepot(state[Reducers.GALLERY_IMAGE_DEPOT], action);
	    newState[Reducers.GALLERY_SELECTION_DEPOT] = Reducers.gallerySelectionDepot(state[Reducers.GALLERY_SELECTION_DEPOT], action);
	
	    return newState;
	  };
	
	  return StoreUtils.createStore(combinedReducer, opts.debug);
	}
	
	function __genUI__($store, opts) {
	  /* create file loader ui */
	  var $App = App.gen($store, opts);
	  var $ToolBar = ToolBar.gen($store, opts);
	  var $ThumbnailViewer = ThumbnailViewer.gen($store, opts);
	  var $Gallery = Gallery.gen($store, opts);
	
	  var appendComponentToApp = FpUtils.curryIt(Utils.appendNode, $App);
	
	  appendComponentToApp($ToolBar);
	  appendComponentToApp($ThumbnailViewer);
	  appendComponentToApp($Gallery);
	
	  return $App;
	}
	
	/* export to APP_NAMESPACE */
	/**
	 * @param {$elm} $container
	 * @param {Object} opts
	 * @param {Number} opts.minHeight
	 * @param {Number} opts.thumbnailWidth
	 * @param {Number} opts.thumbnailHeight
	 * @param {Number} opts.limit
	 * @param {Object[]} opts.galleryFilterOpts
	 * @param {String} opts.galleryFilterOpts[].categoryName
	 * @param {String} opts.galleryFilterOpts[].categoryVal
	 * @param {Number} opts.galleryFilterOpts[].totalPages
	 * @param {Boolean} [opts.debug=false]
	 * @param {Function} opts.onUpload
	 * @param {Function} opte.onFetchGallery
	 * @param {Function} opts.onUploadFromGallery
	 * @param {Function} opts.onDelete
	 */
	APP_NAMESPACE.gen = function ($container, opts) {
	  opts = __seasonOpts__(opts);
	  var appendUIToContainer = FpUtils.curryIt(Utils.appendNode, $container);
	  var $store = __createStore__(opts);
	
	  $store.dispatch(Actions.setGalleryFilterOpts(opts.galleryFilterOpts));
	
	  var $App = __genUI__($store, opts);
	
	  appendUIToContainer($App);
	
	  return {
	    getFiles: function getFiles() {
	      var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
	      return getFileDepot().order.map(function (id) {
	        var entity = getFileDepot().entities[id];
	        return {
	          id: id,
	          url: entity.url,
	          status: entity.status,
	          progress: entity.progress,
	          errMsg: entity.errMsg,
	          userDefinedData: entity.userDefinedData
	        };
	      });
	    },
	    setFiles: function setFiles(list) {
	      var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
	      $store.dispatch(Actions.addFile(getFileDepot().entities, getFileDepot().order, list.map(function (item) {
	        return {
	          url: item.url,
	          userDefinedData: item.userDefinedData
	        };
	      }), opts.limit, getFileDepot().runningID, opts.onDelete));
	    }
	  };
	};
	
	APP_NAMESPACE.FILE_STATUS = {
	  COMPLETE: Reducers.FILE_STATUS_COMPLETE,
	  LOADING: Reducers.FILE_STATUS_LOADING,
	  ERROR: Reducers.FILE_STATUS_ERROR,
	  TIMEOUT: Reducers.FILE_STATUS_TIMEOUT
	};

/***/ },
/* 2 */
/*!************************!*\
  !*** ./src/FpUtils.js ***!
  \************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.compose = compose;
	exports.curryIt = curryIt;
	/* functional programming utility functions */
	
	/**
	 * @param {...function}
	 * @return {function}
	 */
	function compose() {
	  var funcs = arguments;
	  return function () {
	    var args = arguments;
	    for (var i = funcs.length; i-- > 0;) {
	      args = [funcs[i].apply(this, args)];
	    }
	
	    return args[0];
	  };
	}
	
	/**
	 * @param {function} f
	 * @param {*...}
	 */
	function curryIt(f) {
	  var curriedParams = Array.prototype.slice.call(arguments, 1);
	  return function () {
	    var params = Array.prototype.slice.call(arguments, 0);
	    return f.apply(this, curriedParams.concat(params));
	  };
	}

/***/ },
/* 3 */
/*!***************************!*\
  !*** ./src/StoreUtils.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createStore = createStore;
	
	var _FpUtils = __webpack_require__(/*! FpUtils */ 2);
	
	var FpUtils = _interopRequireWildcard(_FpUtils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/* constants */
	var IDENTIFIER = 'RT_FILE_UPLOADER'; /* store utility functions */
	
	
	function __calcNewState__(reducer, state, action) {
	  return reducer(state, action);
	}
	
	function __diffStates__(oldState, newState) {
	  var ret = [];
	  for (var key in newState) {
	    if (newState[key] !== oldState[key]) {
	      ret.push(key);
	    }
	  }
	
	  return ret;
	}
	
	function __getStoreState__($store, statePart) {
	  if (statePart) {
	    return $store.state[statePart];
	  } else {
	    return $store.state;
	  }
	}
	
	function __fireStoreChange__($store, IDENTIFIER, stateParts) {
	  var prefix = IDENTIFIER.toString() || '';
	  for (var i = 0; i < stateParts.length; i++) {
	    $store.trigger(prefix + stateParts[i]);
	  }
	}
	
	function __addStoreListener__($store, IDENTIFIER, statePart, handler) {
	  var prefix = IDENTIFIER.toString() || '';
	  $store.on(prefix + statePart, handler);
	}
	
	/* exports */
	function createStore(reducer, debug) {
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
	  $store.dispatch = function (action) {
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
	}

/***/ },
/* 4 */
/*!**********************!*\
  !*** ./src/Utils.js ***!
  \**********************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.appendNode = appendNode;
	exports.isCollided = isCollided;
	/* main utility functions */
	
	/* exports */
	function appendNode($target, $source) {
	  $target.append($source);
	  return $target;
	}
	
	function isCollided(_ref, _ref2) {
	  var left = _ref.left,
	      top = _ref.top,
	      width = _ref.width,
	      height = _ref.height;
	  var x = _ref2.x,
	      y = _ref2.y;
	
	  var boundaryLeft = left;
	  var boundaryRight = left + width;
	  var boundaryTop = top;
	  var boundaryBottom = top + height;
	
	  if (x > boundaryLeft && x < boundaryRight && y > boundaryTop && y < boundaryBottom) {
	    return true;
	  } else {
	    return false;
	  }
	}

/***/ },
/* 5 */
/*!*************************!*\
  !*** ./src/Reducers.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GALLERY_SELECTION_DEPOT = exports.GALLERY_IMAGE_DEPOT = exports.GALLERY_FILTER_DEPOT = exports.GALLERY_STATUS_DEPOT = exports.PLACEHOLDER_DEPOT = exports.EDIT_DEPOT = exports.MODE_DEPOT = exports.LAYOUT_DEPOT = exports.FILE_DEPOT = exports.FILE_STATUS_TIMEOUT = exports.FILE_STATUS_ERROR = exports.FILE_STATUS_COMPLETE = exports.FILE_STATUS_LOADING = undefined;
	
	var _getIterator2 = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ 6);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 59);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	exports.fileDepot = fileDepot;
	exports.layoutDepot = layoutDepot;
	exports.modeDepot = modeDepot;
	exports.editDepot = editDepot;
	exports.placeholderDepot = placeholderDepot;
	exports.galleryStatusDepot = galleryStatusDepot;
	exports.galleryFilterDepot = galleryFilterDepot;
	exports.galleryImageDepot = galleryImageDepot;
	exports.gallerySelectionDepot = gallerySelectionDepot;
	
	var _Actions = __webpack_require__(/*! Actions */ 65);
	
	var Actions = _interopRequireWildcard(_Actions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* common constants */
	var FILE_STATUS_LOADING = exports.FILE_STATUS_LOADING = 'FILE_STATUS_LOADING'; /* reducers */
	var FILE_STATUS_COMPLETE = exports.FILE_STATUS_COMPLETE = 'FILE_STATUS_COMPLETE';
	var FILE_STATUS_ERROR = exports.FILE_STATUS_ERROR = 'FILE_STATUS_ERROR';
	var FILE_STATUS_TIMEOUT = exports.FILE_STATUS_TIMEOUT = 'FILE_STATUS_TIMEOUT';
	
	/* state parts constants */
	var FILE_DEPOT = exports.FILE_DEPOT = 'FILE_DEPOT';
	var LAYOUT_DEPOT = exports.LAYOUT_DEPOT = 'LAYOUT_DEPOT';
	var MODE_DEPOT = exports.MODE_DEPOT = 'MODE_DEPOT';
	var EDIT_DEPOT = exports.EDIT_DEPOT = 'EDIT_DEPOT';
	var PLACEHOLDER_DEPOT = exports.PLACEHOLDER_DEPOT = 'PLACEHOLDER_DEPOT';
	var GALLERY_STATUS_DEPOT = exports.GALLERY_STATUS_DEPOT = 'GALLERY_STATUS_DEPOT';
	var GALLERY_FILTER_DEPOT = exports.GALLERY_FILTER_DEPOT = 'GALLERY_FILTER_DEPOT';
	var GALLERY_IMAGE_DEPOT = exports.GALLERY_IMAGE_DEPOT = 'GALLERY_IMAGE_DEPOT';
	var GALLERY_SELECTION_DEPOT = exports.GALLERY_SELECTION_DEPOT = 'GALLERY_SELECTION_DEPOT';
	
	var fileDepotDefaultState = {
	  entities: {},
	  order: [],
	  selections: [],
	  runningID: 0
	};
	
	function fileDepot() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : fileDepotDefaultState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case Actions.ADD_LOADING_FILE:
	      {
	        var IDList = action.payload.IDList;
	        var runningID = action.payload.runningID;
	        var remainedIDs = action.payload.remainedIDs;
	        var newEntities = {};
	        var newEntityOrder = [];
	
	        for (var i = 0; i < IDList.length; i++) {
	          var id = IDList[i];
	          newEntities[id] = {
	            url: '',
	            status: FILE_STATUS_LOADING,
	            progress: 0
	          };
	
	          newEntityOrder.push(id);
	        }
	
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	          for (var _iterator = (0, _getIterator3.default)(remainedIDs), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _id = _step.value;
	
	            newEntities[_id] = state.entities[_id];
	            newEntityOrder.push(_id);
	          }
	        } catch (err) {
	          _didIteratorError = true;
	          _iteratorError = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	              _iterator.return();
	            }
	          } finally {
	            if (_didIteratorError) {
	              throw _iteratorError;
	            }
	          }
	        }
	
	        return (0, _assign2.default)({}, state, {
	          entities: newEntities,
	          order: newEntityOrder,
	          selections: [],
	          runningID: runningID
	        });
	      }
	
	    case Actions.UPDATE_LOADING_FILE:
	      {
	        var list = action.payload;
	        var needUpdate = false;
	        var _IDList = list.map(function (item) {
	          return item.id;
	        });
	
	        for (var _i = 0; _i < state.order.length; _i++) {
	          var _id2 = state.order[_i];
	          if (_IDList.indexOf(_id2) !== -1) {
	            needUpdate = true;
	            break;
	          }
	        }
	
	        if (!needUpdate) {
	          return state;
	        } else {
	          var _newEntities = $.extend({}, state.entities);
	          var _newEntityOrder = state.order.slice(0);
	
	          for (var _i2 = 0; _i2 < _IDList.length; _i2++) {
	            var _id3 = _IDList[_i2];
	            var url = list[_i2].url;
	            var status = list[_i2].status;
	            var progress = list[_i2].progress;
	            var errMsg = list[_i2].errMsg;
	            var userDefinedData = list[_i2].userDefinedData;
	            var entity = _newEntities[_id3];
	            if (entity) {
	              entity.url = url;
	              entity.status = status;
	              entity.progress = progress;
	              entity.errMsg = errMsg;
	              entity.userDefinedData = userDefinedData;
	            }
	          }
	
	          return (0, _assign2.default)({}, state, {
	            entities: _newEntities,
	            order: _newEntityOrder
	          });
	        }
	      }
	
	    case Actions.ADD_FILE:
	      {
	        var _list = action.payload.list;
	        var _runningID = action.payload.runningID;
	        var _remainedIDs = action.payload.remainedIDs;
	        var _newEntities2 = {};
	        var _newEntityOrder2 = [];
	
	        for (var _i3 = 0; _i3 < _list.length; _i3++) {
	          var _id4 = _list[_i3].id;
	          var _url = _list[_i3].url;
	          var _userDefinedData = _list[_i3].userDefinedData;
	          _newEntities2[_id4] = {
	            url: _url,
	            status: FILE_STATUS_COMPLETE,
	            progress: 100,
	            errMsg: '',
	            userDefinedData: _userDefinedData
	          };
	
	          _newEntityOrder2.push(_id4);
	        }
	
	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;
	
	        try {
	          for (var _iterator2 = (0, _getIterator3.default)(_remainedIDs), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var _id5 = _step2.value;
	
	            _newEntities2[_id5] = state.entities[_id5];
	            _newEntityOrder2.push(_id5);
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }
	
	        return (0, _assign2.default)({}, state, {
	          entities: _newEntities2,
	          order: _newEntityOrder2,
	          selections: [],
	          runningID: _runningID
	        });
	      }
	
	    case Actions.DELETE_FILE:
	      {
	        var _newEntities3 = (0, _assign2.default)({}, state.entities);
	        var _newEntityOrder3 = state.order.slice(0);
	
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;
	
	        try {
	          for (var _iterator3 = (0, _getIterator3.default)(action.payload), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var _id6 = _step3.value;
	
	            var idx = _newEntityOrder3.indexOf(_id6);
	
	            if (idx !== -1) {
	              delete _newEntities3[_id6];
	              _newEntityOrder3.splice(idx, 1);
	            }
	          }
	        } catch (err) {
	          _didIteratorError3 = true;
	          _iteratorError3 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	              _iterator3.return();
	            }
	          } finally {
	            if (_didIteratorError3) {
	              throw _iteratorError3;
	            }
	          }
	        }
	
	        return (0, _assign2.default)({}, state, {
	          entities: _newEntities3,
	          order: _newEntityOrder3,
	          selections: []
	        });
	      }
	
	    case Actions.END_EDIT:
	      {
	        var editTarget = action.payload.editTarget;
	        var hoverTarget = action.payload.hoverTarget;
	        var editIdx = state.order.indexOf(editTarget);
	        var hoverIdx = state.order.indexOf(hoverTarget);
	        var order = state.order.slice(0, editIdx).concat(state.order.slice(editIdx + 1));
	        order = order.slice(0, hoverIdx).concat([editTarget]).concat(order.slice(hoverIdx));
	        return $.extend({}, state, {
	          order: order
	        });
	      }
	
	    default:
	      return state;
	  }
	}
	
	var layoutDepotDefaultState = {
	  thumbnailLayouts: []
	};
	
	function layoutDepot() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : layoutDepotDefaultState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case Actions.UPDATE_LAYOUT:
	      {
	        return (0, _assign2.default)({}, state, {
	          thumbnailLayouts: action.payload
	        });
	      }
	
	    default:
	      return state;
	  }
	}
	
	var modeDepotDefaultState = {
	  mode: Actions.DISPLAY_MODE
	};
	
	function modeDepot() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : modeDepotDefaultState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case Actions.START_EDIT:
	      {
	        return (0, _assign2.default)({}, state, {
	          mode: Actions.EDIT_MODE
	        });
	      }
	
	    case Actions.END_EDIT:
	      {
	        return (0, _assign2.default)({}, state, {
	          mode: Actions.DISPLAY_MODE
	        });
	      }
	
	    default:
	      return state;
	  }
	}
	
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
	
	function editDepot() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : editDepotDefaultState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case Actions.START_EDIT:
	      {
	        return (0, _assign2.default)({}, state, {
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
	
	    case Actions.UPDATE_EDIT:
	      {
	        return (0, _assign2.default)({}, state, {
	          currentPos: {
	            x: action.payload.cursorX,
	            y: action.payload.cursorY
	          }
	        });
	      }
	
	    default:
	      return state;
	  }
	}
	
	var placeholderDepotDefaultState = {
	  hoverTarget: null
	};
	
	function placeholderDepot() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : placeholderDepotDefaultState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case Actions.START_EDIT:
	      {
	        return (0, _assign2.default)({}, state, {
	          hoverTarget: action.payload.entityID
	        });
	      }
	
	    case Actions.UPDATE_PLACEHOLDER:
	      {
	        return (0, _assign2.default)({}, state, {
	          hoverTarget: action.payload
	        });
	      }
	
	    case Actions.END_EDIT:
	      {
	        return (0, _assign2.default)({}, state, {
	          hoverTarget: null
	        });
	      }
	
	    default:
	      return state;
	  }
	}
	
	var galleryStatusDepotDefaultState = {
	  isOpened: false
	};
	
	function galleryStatusDepot() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : galleryStatusDepotDefaultState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case Actions.TRIGGER_GALLERY:
	      {
	        return (0, _assign2.default)({}, state, {
	          isOpened: !state.isOpened
	        });
	      }
	
	    default:
	      return state;
	  }
	}
	
	var galleryFilterDepotDefaultState = {
	  page: 1,
	  categoryList: [{ text: '--', val: '', totalPages: 1 }],
	  category: 0,
	  isFetching: false
	};
	
	function galleryFilterDepot() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : galleryFilterDepotDefaultState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case Actions.SET_GALLERY_FILTER_OPTS:
	      {
	        var opts = action.payload.filter(function (opt) {
	          return opt.hasOwnProperty('categoryVal');
	        });
	
	        if (opts.length > 0) {
	          return (0, _assign2.default)({}, state, {
	            categoryList: opts.map(function (opt) {
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
	      }
	
	    case Actions.CHANGE_GALLERY_FILTER:
	      {
	        var category = action.payload.category;
	        var page = action.payload.page;
	
	        return (0, _assign2.default)({}, state, {
	          page: page,
	          category: category
	        });
	      }
	
	    case Actions.REQUEST_GALLERY_IMAGE:
	      {
	        return (0, _assign2.default)({}, state, {
	          isFetching: true
	        });
	      }
	
	    case Actions.RECEIVE_GALLERY_IMAGE:
	      {
	        return (0, _assign2.default)({}, state, {
	          isFetching: false
	        });
	      }
	
	    default:
	      return state;
	  }
	}
	
	var galleryImageDepotDefaultState = {
	  list: [],
	  isFetching: false
	};
	
	function galleryImageDepot() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : galleryImageDepotDefaultState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case Actions.REQUEST_GALLERY_IMAGE:
	      {
	        return (0, _assign2.default)({}, state, {
	          isFetching: true,
	          list: []
	        });
	      }
	
	    case Actions.RECEIVE_GALLERY_IMAGE:
	      {
	        return (0, _assign2.default)({}, state, {
	          isFetching: false,
	          list: action.payload
	        });
	      }
	
	    default:
	      return state;
	  }
	}
	
	var gallerySelectionDepotDefaultState = {
	  list: []
	};
	
	function gallerySelectionDepot() {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : gallerySelectionDepotDefaultState;
	  var action = arguments[1];
	
	  switch (action.type) {
	    case Actions.CHANGE_GALLERY_SELECTION:
	      {
	        return (0, _assign2.default)({}, state, {
	          list: action.payload
	        });
	      }
	
	    case Actions.REQUEST_GALLERY_IMAGE:
	      {
	        return (0, _assign2.default)({}, state, {
	          list: []
	        });
	      }
	
	    default:
	      return state;
	  }
	}

/***/ },
/* 6 */
/*!*************************************************!*\
  !*** ./~/babel-runtime/core-js/get-iterator.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/get-iterator */ 7), __esModule: true };

/***/ },
/* 7 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/get-iterator.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/web.dom.iterable */ 8);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 54);
	module.exports = __webpack_require__(/*! ../modules/core.get-iterator */ 56);

/***/ },
/* 8 */
/*!***********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/web.dom.iterable.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./es6.array.iterator */ 9);
	var global        = __webpack_require__(/*! ./_global */ 20)
	  , hide          = __webpack_require__(/*! ./_hide */ 24)
	  , Iterators     = __webpack_require__(/*! ./_iterators */ 12)
	  , TO_STRING_TAG = __webpack_require__(/*! ./_wks */ 51)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 9 */
/*!*************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.array.iterator.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 10)
	  , step             = __webpack_require__(/*! ./_iter-step */ 11)
	  , Iterators        = __webpack_require__(/*! ./_iterators */ 12)
	  , toIObject        = __webpack_require__(/*! ./_to-iobject */ 13);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(/*! ./_iter-define */ 17)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 10 */
/*!**************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_add-to-unscopables.js ***!
  \**************************************************************************/
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 11 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iter-step.js ***!
  \*****************************************************************/
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 12 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iterators.js ***!
  \*****************************************************************/
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 13 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-iobject.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(/*! ./_iobject */ 14)
	  , defined = __webpack_require__(/*! ./_defined */ 16);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 14 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iobject.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(/*! ./_cof */ 15);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 15 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_cof.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 16 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_defined.js ***!
  \***************************************************************/
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 17 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iter-define.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(/*! ./_library */ 18)
	  , $export        = __webpack_require__(/*! ./_export */ 19)
	  , redefine       = __webpack_require__(/*! ./_redefine */ 34)
	  , hide           = __webpack_require__(/*! ./_hide */ 24)
	  , has            = __webpack_require__(/*! ./_has */ 35)
	  , Iterators      = __webpack_require__(/*! ./_iterators */ 12)
	  , $iterCreate    = __webpack_require__(/*! ./_iter-create */ 36)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 50)
	  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 52)
	  , ITERATOR       = __webpack_require__(/*! ./_wks */ 51)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 18 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_library.js ***!
  \***************************************************************/
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 19 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_export.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./_global */ 20)
	  , core      = __webpack_require__(/*! ./_core */ 21)
	  , ctx       = __webpack_require__(/*! ./_ctx */ 22)
	  , hide      = __webpack_require__(/*! ./_hide */ 24)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 20 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_global.js ***!
  \**************************************************************/
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 21 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_core.js ***!
  \************************************************************/
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 22 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_ctx.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(/*! ./_a-function */ 23);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 23 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_a-function.js ***!
  \******************************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 24 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_hide.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(/*! ./_object-dp */ 25)
	  , createDesc = __webpack_require__(/*! ./_property-desc */ 33);
	module.exports = __webpack_require__(/*! ./_descriptors */ 29) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 25 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-dp.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(/*! ./_an-object */ 26)
	  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 28)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 32)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 29) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 26 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_an-object.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 27);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 27 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_is-object.js ***!
  \*****************************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 28 */
/*!**********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_ie8-dom-define.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(/*! ./_descriptors */ 29) && !__webpack_require__(/*! ./_fails */ 30)(function(){
	  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 31)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 29 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_descriptors.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(/*! ./_fails */ 30)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 30 */
/*!*************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_fails.js ***!
  \*************************************************************/
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 31 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_dom-create.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 27)
	  , document = __webpack_require__(/*! ./_global */ 20).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 32 */
/*!********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-primitive.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(/*! ./_is-object */ 27);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 33 */
/*!*********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_property-desc.js ***!
  \*********************************************************************/
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 34 */
/*!****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_redefine.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_hide */ 24);

/***/ },
/* 35 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_has.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 36 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iter-create.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(/*! ./_object-create */ 37)
	  , descriptor     = __webpack_require__(/*! ./_property-desc */ 33)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 50)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(/*! ./_hide */ 24)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 51)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 37 */
/*!*********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-create.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(/*! ./_an-object */ 26)
	  , dPs         = __webpack_require__(/*! ./_object-dps */ 38)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 48)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 45)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(/*! ./_dom-create */ 31)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(/*! ./_html */ 49).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 38 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-dps.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(/*! ./_object-dp */ 25)
	  , anObject = __webpack_require__(/*! ./_an-object */ 26)
	  , getKeys  = __webpack_require__(/*! ./_object-keys */ 39);
	
	module.exports = __webpack_require__(/*! ./_descriptors */ 29) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 39 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-keys.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(/*! ./_object-keys-internal */ 40)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 48);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 40 */
/*!****************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-keys-internal.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(/*! ./_has */ 35)
	  , toIObject    = __webpack_require__(/*! ./_to-iobject */ 13)
	  , arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 41)(false)
	  , IE_PROTO     = __webpack_require__(/*! ./_shared-key */ 45)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 41 */
/*!**********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_array-includes.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 13)
	  , toLength  = __webpack_require__(/*! ./_to-length */ 42)
	  , toIndex   = __webpack_require__(/*! ./_to-index */ 44);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 42 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-length.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(/*! ./_to-integer */ 43)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 43 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-integer.js ***!
  \******************************************************************/
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 44 */
/*!****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-index.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 43)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 45 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_shared-key.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(/*! ./_shared */ 46)('keys')
	  , uid    = __webpack_require__(/*! ./_uid */ 47);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 46 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_shared.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(/*! ./_global */ 20)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 47 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_uid.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 48 */
/*!*********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_enum-bug-keys.js ***!
  \*********************************************************************/
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 49 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_html.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_global */ 20).document && document.documentElement;

/***/ },
/* 50 */
/*!*************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_set-to-string-tag.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(/*! ./_object-dp */ 25).f
	  , has = __webpack_require__(/*! ./_has */ 35)
	  , TAG = __webpack_require__(/*! ./_wks */ 51)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 51 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_wks.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(/*! ./_shared */ 46)('wks')
	  , uid        = __webpack_require__(/*! ./_uid */ 47)
	  , Symbol     = __webpack_require__(/*! ./_global */ 20).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 52 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-gpo.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(/*! ./_has */ 35)
	  , toObject    = __webpack_require__(/*! ./_to-object */ 53)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 45)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 53 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-object.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(/*! ./_defined */ 16);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 54 */
/*!**************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.string.iterator.js ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(/*! ./_string-at */ 55)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(/*! ./_iter-define */ 17)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 55 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_string-at.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 43)
	  , defined   = __webpack_require__(/*! ./_defined */ 16);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 56 */
/*!************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/core.get-iterator.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(/*! ./_an-object */ 26)
	  , get      = __webpack_require__(/*! ./core.get-iterator-method */ 57);
	module.exports = __webpack_require__(/*! ./_core */ 21).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 57 */
/*!*******************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/core.get-iterator-method.js ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(/*! ./_classof */ 58)
	  , ITERATOR  = __webpack_require__(/*! ./_wks */ 51)('iterator')
	  , Iterators = __webpack_require__(/*! ./_iterators */ 12);
	module.exports = __webpack_require__(/*! ./_core */ 21).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 58 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_classof.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(/*! ./_cof */ 15)
	  , TAG = __webpack_require__(/*! ./_wks */ 51)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 59 */
/*!**************************************************!*\
  !*** ./~/babel-runtime/core-js/object/assign.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/assign */ 60), __esModule: true };

/***/ },
/* 60 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/object/assign.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.assign */ 61);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 21).Object.assign;

/***/ },
/* 61 */
/*!************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.object.assign.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(/*! ./_export */ 19);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(/*! ./_object-assign */ 62)});

/***/ },
/* 62 */
/*!*********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-assign.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(/*! ./_object-keys */ 39)
	  , gOPS     = __webpack_require__(/*! ./_object-gops */ 63)
	  , pIE      = __webpack_require__(/*! ./_object-pie */ 64)
	  , toObject = __webpack_require__(/*! ./_to-object */ 53)
	  , IObject  = __webpack_require__(/*! ./_iobject */ 14)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(/*! ./_fails */ 30)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 63 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-gops.js ***!
  \*******************************************************************/
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 64 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-pie.js ***!
  \******************************************************************/
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 65 */
/*!************************!*\
  !*** ./src/Actions.js ***!
  \************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.uploadStart = uploadStart;
	exports.uploadFromGalleryStart = uploadFromGalleryStart;
	exports.addFile = addFile;
	exports.deleteFile = deleteFile;
	exports.updateLayout = updateLayout;
	exports.startEdit = startEdit;
	exports.endEdit = endEdit;
	exports.updateEdit = updateEdit;
	exports.updatePlaceholder = updatePlaceholder;
	exports.triggerGallery = triggerGallery;
	exports.setGalleryFilterOpts = setGalleryFilterOpts;
	exports.changeGalleryFilter = changeGalleryFilter;
	exports.fetchGalleryImage = fetchGalleryImage;
	exports.changeGallerySelection = changeGallerySelection;
	/* actions */
	
	/* constants */
	var DISPLAY_MODE = exports.DISPLAY_MODE = 'DISPLAY_MODE';
	var EDIT_MODE = exports.EDIT_MODE = 'EDIT_MODE';
	
	/* action type constants */
	var ADD_LOADING_FILE = exports.ADD_LOADING_FILE = 'ADD_LOADING_FILE';
	var UPDATE_LOADING_FILE = exports.UPDATE_LOADING_FILE = 'UPDATE_LOADING_FILE';
	var ADD_FILE = exports.ADD_FILE = 'ADD_FILE';
	var DELETE_FILE = exports.DELETE_FILE = 'DELETE_FILE';
	var START_EDIT = exports.START_EDIT = 'START_EDIT';
	var UPDATE_EDIT = exports.UPDATE_EDIT = 'UPDATE_EDIT';
	var END_EDIT = exports.END_EDIT = 'END_EDIT';
	var UPDATE_PLACEHOLDER = exports.UPDATE_PLACEHOLDER = 'UPDATE_PLACEHOLDER';
	var UPDATE_LAYOUT = exports.UPDATE_LAYOUT = 'UPDATE_LAYOUT';
	var TRIGGER_GALLERY = exports.TRIGGER_GALLERY = 'TRIGGER_GALLERY';
	var SET_GALLERY_FILTER_OPTS = exports.SET_GALLERY_FILTER_OPTS = 'SET_GALLERY_FILTER_OPTS';
	var CHANGE_GALLERY_FILTER = exports.CHANGE_GALLERY_FILTER = 'CHANGE_GALLERY_FILTER';
	var REQUEST_GALLERY_IMAGE = exports.REQUEST_GALLERY_IMAGE = 'REQUEST_GALLERY_IMAGE';
	var RECEIVE_GALLERY_IMAGE = exports.RECEIVE_GALLERY_IMAGE = 'RECEIVE_GALLERY_IMAGE';
	var CHANGE_GALLERY_SELECTION = exports.CHANGE_GALLERY_SELECTION = 'CHANGE_GALLERY_SELECTION';
	
	function uploadStart(_ref) {
	  var currentFileEntities = _ref.currentFileEntities,
	      currentFileOrder = _ref.currentFileOrder,
	      uploadFileList = _ref.uploadFileList,
	      limit = _ref.limit,
	      runningID = _ref.runningID,
	      onUpload = _ref.onUpload,
	      onDelete = _ref.onDelete;
	
	  return function (dispatch) {
	    /* new added items */
	    var itemList = [];
	    for (var i = 0; i < uploadFileList.length && i < limit; i++) {
	      itemList.push({
	        id: runningID + 1 + i,
	        file: uploadFileList.item(i)
	      });
	    }
	
	    /* delete overflowed items */
	    var overflow = itemList.length + currentFileOrder.length - limit;
	    var remainedIDs = currentFileOrder.slice(0, currentFileOrder.length - overflow);
	    if (overflow > 0 && typeof onDelete === 'function') {
	      var deleteIDs = currentFileOrder.slice(currentFileOrder.length - overflow);
	      onDelete(deleteIDs.map(function (id) {
	        var entity = currentFileEntities[id];
	        return {
	          id: id,
	          url: entity.url,
	          status: entity.status,
	          progress: entity.progress,
	          errMsg: entity.errMsg,
	          userDefinedData: entity.userDefinedData
	        };
	      }));
	    }
	
	    dispatch(addLoadingFile(itemList.map(function (item) {
	      return item.id;
	    }), runningID + itemList.length, remainedIDs));
	
	    if (typeof onUpload === 'function') {
	      var update = function update(list) {
	        dispatch(updateLoadingFile(list.map(function (item) {
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
	}
	
	function uploadFromGalleryStart(_ref2) {
	  var currentFileEntities = _ref2.currentFileEntities,
	      currentFileOrder = _ref2.currentFileOrder,
	      uploadFiles = _ref2.uploadFiles,
	      limit = _ref2.limit,
	      runningID = _ref2.runningID,
	      onUploadFromGallery = _ref2.onUploadFromGallery,
	      onDelete = _ref2.onDelete;
	
	  return function (dispatch) {
	    /* new added items */
	    var itemList = uploadFiles.slice(0, limit).map(function (file, idx) {
	      return {
	        id: runningID + 1 + idx,
	        url: file.url,
	        userDefinedData: file.userDefinedData
	      };
	    });
	
	    /* delete overflowed items */
	    var overflow = itemList.length + currentFileOrder.length - limit;
	    var remainedIDs = currentFileOrder.slice(0, currentFileOrder.length - overflow);
	    if (overflow > 0 && typeof onDelete === 'function') {
	      var deleteIDs = currentFileOrder.slice(currentFileOrder.length - overflow);
	      onDelete(deleteIDs.map(function (id) {
	        var entity = currentFileEntities[id];
	        return {
	          id: id,
	          url: entity.url,
	          status: entity.status,
	          progress: entity.progress,
	          errMsg: entity.errMsg,
	          userDefinedData: entity.userDefinedData
	        };
	      }));
	    }
	
	    dispatch(addLoadingFile(itemList.map(function (item) {
	      return item.id;
	    }), runningID + itemList.length, remainedIDs));
	
	    if (typeof onUploadFromGallery === 'function') {
	      var update = function update(list) {
	        dispatch(updateLoadingFile(list.map(function (item) {
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
	}
	
	function addLoadingFile(IDList, runningID, remainedIDs) {
	  return {
	    type: ADD_LOADING_FILE,
	    payload: {
	      IDList: IDList,
	      runningID: runningID,
	      remainedIDs: remainedIDs
	    }
	  };
	}
	
	function updateLoadingFile(list) {
	  return {
	    type: UPDATE_LOADING_FILE,
	    payload: list
	  };
	}
	
	function addFile(currentFileEntities, currentFileOrder, addList, limit, runningID, onDelete) {
	  /* new added items */
	  var itemList = addList.slice(0, limit).map(function (item, idx) {
	    return {
	      id: runningID + 1 + idx,
	      url: item.url,
	      userDefinedData: item.userDefinedData
	    };
	  });
	
	  /* delete overflowed items */
	  var overflow = itemList.length + currentFileOrder.length - limit;
	  var remainedIDs = currentFileOrder.slice(0, currentFileOrder.length - overflow);
	  if (overflow > 0 && typeof onDelete === 'function') {
	    var deleteIDs = currentFileOrder.slice(currentFileOrder.length - overflow);
	    onDelete(deleteIDs.map(function (id) {
	      var entity = currentFileEntities[id];
	      return {
	        id: id,
	        url: entity.url,
	        status: entity.status,
	        progress: entity.progress,
	        errMsg: entity.errMsg,
	        userDefinedData: entity.userDefinedData
	      };
	    }));
	  }
	
	  return {
	    type: ADD_FILE,
	    payload: {
	      list: itemList,
	      remainedIDs: remainedIDs,
	      runningID: runningID + itemList.length
	    }
	  };
	}
	
	function deleteFile(currentFileEntities, entityIDs, onDelete) {
	  if (typeof onDelete === 'function') {
	    var itemList = entityIDs.filter(function (entityID) {
	      return currentFileEntities[entityID];
	    }).map(function (entityID) {
	      var entity = currentFileEntities[entityID];
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
	
	function updateLayout(thumbnailLayouts) {
	  return {
	    type: UPDATE_LAYOUT,
	    payload: thumbnailLayouts
	  };
	}
	
	function startEdit(_ref3) {
	  var entityID = _ref3.entityID,
	      cursorX = _ref3.cursorX,
	      cursorY = _ref3.cursorY;
	
	  return {
	    type: START_EDIT,
	    payload: {
	      entityID: entityID,
	      cursorX: cursorX,
	      cursorY: cursorY
	    }
	  };
	}
	
	function endEdit(editTarget, hoverTarget) {
	  return {
	    type: END_EDIT,
	    payload: {
	      editTarget: editTarget,
	      hoverTarget: hoverTarget
	    }
	  };
	}
	
	function updateEdit(_ref4) {
	  var entityID = _ref4.entityID,
	      cursorX = _ref4.cursorX,
	      cursorY = _ref4.cursorY;
	
	  return {
	    type: UPDATE_EDIT,
	    payload: {
	      entityID: entityID,
	      cursorX: cursorX,
	      cursorY: cursorY
	    }
	  };
	}
	
	function updatePlaceholder(idx) {
	  return {
	    type: UPDATE_PLACEHOLDER,
	    payload: idx
	  };
	}
	
	function triggerGallery() {
	  return {
	    type: TRIGGER_GALLERY
	  };
	}
	
	function setGalleryFilterOpts(optList) {
	  return {
	    type: SET_GALLERY_FILTER_OPTS,
	    payload: optList
	  };
	}
	
	function changeGalleryFilter(category, page) {
	  return {
	    type: CHANGE_GALLERY_FILTER,
	    payload: {
	      category: category,
	      page: page
	    }
	  };
	}
	
	function fetchGalleryImage(categoryVal, page, onFetchGallery) {
	  return function (dispatch) {
	    dispatch(requestGalleryImage());
	    if (typeof onFetchGallery === 'function') {
	      var update = function update(list) {
	        dispatch(receiveGalleryImage(list.map(function (item) {
	          return {
	            url: item.url,
	            userDefinedData: item.userDefinedData
	          };
	        })));
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
	
	function changeGallerySelection(list) {
	  return {
	    type: CHANGE_GALLERY_SELECTION,
	    payload: list
	  };
	}

/***/ },
/* 66 */
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.gen = gen;
	
	var _Actions = __webpack_require__(/*! Actions */ 65);
	
	var Actions = _interopRequireWildcard(_Actions);
	
	var _FpUtils = __webpack_require__(/*! FpUtils */ 2);
	
	var FpUtils = _interopRequireWildcard(_FpUtils);
	
	var _Reducers = __webpack_require__(/*! Reducers */ 5);
	
	var Reducers = _interopRequireWildcard(_Reducers);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/* css prefix constants */
	var IDENTIFIER = 'RT_FILE_UPLOADER';
	
	/* exports */
	/* component - App */
	function gen($store, opts) {
	  var limit = opts.limit;
	  var $root = $('<div />').addClass(IDENTIFIER).css('minHeight', opts.minHeight).on('dragover', function (e) {
	    e.preventDefault();
	    $root.addClass('drag-over');
	  }).on('dragleave', function (e) {
	    e.preventDefault();
	    $root.removeClass('drag-over');
	  }).on('drop', function (e) {
	    e.preventDefault();
	    $root.removeClass('drag-over');
	
	    var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
	    var files = e.originalEvent.dataTransfer.files;
	
	    $store.dispatch(Actions.uploadStart({
	      currentFileEntities: getFileDepot().entities,
	      currentFileOrder: getFileDepot().order,
	      uploadFileList: files,
	      limit: limit,
	      runningID: getFileDepot().runningID,
	      onUpload: opts.onUpload,
	      onDelete: opts.onDelete
	    }));
	  });
	
	  return $root;
	}

/***/ },
/* 67 */
/*!************************!*\
  !*** ./src/ToolBar.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.gen = gen;
	
	var _FpUtils = __webpack_require__(/*! FpUtils */ 2);
	
	var FpUtils = _interopRequireWildcard(_FpUtils);
	
	var _Actions = __webpack_require__(/*! Actions */ 65);
	
	var Actions = _interopRequireWildcard(_Actions);
	
	var _Reducers = __webpack_require__(/*! Reducers */ 5);
	
	var Reducers = _interopRequireWildcard(_Reducers);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function __renderOnFileDepotChange__($store, opts, $root) {
	  var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
	
	  if (!getFileDepot().order.length) {
	    $root.addClass('hint');
	  } else {
	    $root.removeClass('hint').css('height', 'auto');
	  }
	
	  return $root;
	}
	
	/* exports */
	/* component - ToolBar */
	function gen($store, opts) {
	  var getGalleryFilterDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_FILTER_DEPOT);
	  var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
	
	  var limit = opts.limit;
	
	  var $hintText1 = $('<div />').addClass('hint-text').append($('<span />').text('選擇檔案'));
	
	  var $hintText2 = $('<div />').addClass('hint-text').append($('<span />').addClass('separator').text('或')).append($('<span />').text('拖曳檔案至此'));
	
	  var $uploadIcon = $('<i />').addClass('upload-icon').addClass('fa').addClass('fa-upload');
	
	  var _$addLocalInput = $('<input type="file" accept="image/*;capture=camera"/>') // hack for ie8, since .attr('type', 'file') act oddly
	  .addClass('add-local-input').attr('multiple', '').change(function (e) {
	    var $this = $(e.currentTarget);
	    var files = $this[0].files;
	
	    $store.dispatch(Actions.uploadStart({
	      currentFileEntities: getFileDepot().entities,
	      currentFileOrder: getFileDepot().order,
	      uploadFileList: files,
	      limit: limit,
	      runningID: getFileDepot().runningID,
	      onUpload: opts.onUpload,
	      onDelete: opts.onDelete
	    }));
	
	    $this.val('');
	  });
	
	  var _$addLocalFakeButton = $('<div />').addClass('rt-button').addClass('rt-button-mini').addClass('rt-button-default').text('本地檔案');
	
	  var $addLocal = $('<label />').addClass('action').append(_$addLocalInput).append(_$addLocalFakeButton);
	
	  var $addRuten = $('<button />').attr('type', 'button').addClass('action').addClass('rt-button').addClass('rt-button-mini').addClass('rt-button-default').text('露天圖庫').click(function () {
	    $store.dispatch(Actions.triggerGallery());
	    $store.dispatch(Actions.fetchGalleryImage(getGalleryFilterDepot().categoryList[getGalleryFilterDepot().category].val, getGalleryFilterDepot().page, opts.onFetchGallery));
	  });
	
	  var $wrap = $('<div />').addClass('wrap').append($uploadIcon).append($hintText1).append($addLocal).append($addRuten).append($hintText2);
	
	  var $root = $('<div />').addClass('tool-bar').append($wrap);
	
	  $store.listen(Reducers.FILE_DEPOT, function () {
	    __renderOnFileDepotChange__($store, opts, $root);
	  });
	
	  return __renderOnFileDepotChange__($store, opts, $root);
	}

/***/ },
/* 68 */
/*!********************************!*\
  !*** ./src/ThumbnailViewer.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray2 = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ 69);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _getIterator2 = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ 6);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	exports.gen = gen;
	
	var _FpUtils = __webpack_require__(/*! FpUtils */ 2);
	
	var FpUtils = _interopRequireWildcard(_FpUtils);
	
	var _Utils = __webpack_require__(/*! Utils */ 4);
	
	var Utils = _interopRequireWildcard(_Utils);
	
	var _Actions = __webpack_require__(/*! Actions */ 65);
	
	var Actions = _interopRequireWildcard(_Actions);
	
	var _Reducers = __webpack_require__(/*! Reducers */ 5);
	
	var Reducers = _interopRequireWildcard(_Reducers);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* component - ThumbnailViewer */
	function __render__($store, opts, $root) {
	  var thumbnailWidth = opts.thumbnailWidth;
	  var thumbnailHeight = opts.thumbnailHeight;
	
	  /* get states */
	  var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
	  var getModeDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.MODE_DEPOT);
	  $root.empty();
	
	  var $thumbnails = getFileDepot().order.map(function (entityID, idx) {
	    var file = getFileDepot().entities[entityID];
	    var $elm = $('<div />').attr('data-ref', 'thumbnail').addClass('thumbnail').attr('data-key', idx).css('width', thumbnailWidth).css('height', thumbnailHeight).on('touchstart mousedown', function (e) {
	      e.preventDefault();
	      if (getModeDepot().mode === Actions.DISPLAY_MODE) {
	        var rootOffset = $root.offset();
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
	
	    var $img = $('<div />').addClass('img');
	
	    switch (file.status) {
	      case Reducers.FILE_STATUS_LOADING:
	        {
	          var $icon = $('<i />').addClass('fa fa-circle-o-notch fa-spin fa-2x fa-fw loading-ring');
	
	          $img.append($icon);
	          break;
	        }
	
	      case Reducers.FILE_STATUS_COMPLETE:
	        {
	          $img.css('background-image', 'url(' + file.url + ')');
	          break;
	        }
	
	      case Reducers.FILE_STATUS_ERROR:
	        {
	          var $msg = $('<div />').addClass('msg').append($('<i />').addClass('fa fa-exclamation-triangle icon')).append($('<div />').addClass('text').text(file.errMsg));
	
	          $img.append($msg);
	          break;
	        }
	    }
	
	    var $imgWrap = $('<div />').addClass('img-wrap').css('width', thumbnailWidth).css('height', thumbnailHeight).append($img);
	
	    var $delete = $('<i />').addClass('fa').addClass('fa-times').addClass('delete').on('touchstart mousedown', function (e) {
	      e.stopPropagation();
	    }).click(function (e) {
	      e.stopPropagation();
	      $store.dispatch(Actions.deleteFile(getFileDepot().entities, [entityID], opts.onDelete));
	    });
	
	    $elm.append($imgWrap).append($delete);
	
	    return $elm;
	  });
	
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;
	
	  try {
	    for (var _iterator = (0, _getIterator3.default)($thumbnails), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var $thumbnail = _step.value;
	
	      $root.append($thumbnail);
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	
	  var thumbnailLayouts = $thumbnails.map(function ($thumbnail) {
	    return $thumbnail.position();
	  });
	
	  $store.dispatch(Actions.updateLayout(thumbnailLayouts));
	
	  return $root;
	}
	
	function __renderOnModeDepotChange__($store, opts, $root) {
	  var thumbnailWidth = opts.thumbnailWidth;
	  var thumbnailHeight = opts.thumbnailHeight;
	  var getModeDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.MODE_DEPOT);
	  var getLayoutDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.LAYOUT_DEPOT);
	  var getEditDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.EDIT_DEPOT);
	  var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
	  var getPlaceholderDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.PLACEHOLDER_DEPOT);
	
	  if (getModeDepot().mode === Actions.EDIT_MODE) {
	    $root.on('touchend mouseup', function () {
	      if (getModeDepot().mode === Actions.EDIT_MODE) {
	        $store.dispatch(Actions.endEdit(getEditDepot().target, getPlaceholderDepot().hoverTarget));
	      }
	    }).on('touchmove mousemove', function (e) {
	      e.preventDefault();
	      var $this = $(e.currentTarget);
	      var offset = $this.offset();
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
	
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;
	
	      try {
	        for (var _iterator2 = (0, _getIterator3.default)(getLayoutDepot().thumbnailLayouts.entries()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2),
	              idx = _step2$value[0],
	              layout = _step2$value[1];
	
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
	            $store.dispatch(Actions.updatePlaceholder(getFileDepot().order[idx]));
	            return false;
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    });
	  } else {
	    $root.off('touchmove').off('mousemove').off('touchend').off('mouseup');
	  }
	}
	
	function __renderOnEditDepotChange__($store, opts, $root) {
	  var getModeDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.MODE_DEPOT);
	  var getEditDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.EDIT_DEPOT);
	  var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
	  var getLayoutDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.LAYOUT_DEPOT);
	
	  if (getModeDepot().mode === Actions.EDIT_MODE) {
	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;
	
	    try {
	      for (var _iterator3 = (0, _getIterator3.default)(getFileDepot().order.entries()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	        var _step3$value = (0, _slicedToArray3.default)(_step3.value, 2),
	            idx = _step3$value[0],
	            entityID = _step3$value[1];
	
	        if (entityID === getEditDepot().target) {
	          $root.children('[data-ref=thumbnail]').eq(idx).attr('date-ref', 'dragTarget').addClass('drag-target').css({
	            position: 'absolute',
	            zIndex: '99',
	            left: getLayoutDepot().thumbnailLayouts[idx].left + getEditDepot().currentPos.x - getEditDepot().startPos.x,
	            top: getLayoutDepot().thumbnailLayouts[idx].top + getEditDepot().currentPos.y - getEditDepot().startPos.y - 7
	          });
	        }
	      }
	    } catch (err) {
	      _didIteratorError3 = true;
	      _iteratorError3 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion3 && _iterator3.return) {
	          _iterator3.return();
	        }
	      } finally {
	        if (_didIteratorError3) {
	          throw _iteratorError3;
	        }
	      }
	    }
	  }
	
	  return $root;
	}
	
	function __renderOnPlaceholderDepotChange__($store, opts, $root) {
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
	
	    var $placeholderTarget = $root.children('[data-ref=thumbnail]').eq(placeholderIdx);
	    var $placeholder = $('<div />').attr('data-ref', 'placeholder').addClass('placeholder').css({
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
	}
	
	/* exports */
	function gen($store, opts) {
	  var $root = $('<div />').addClass('thumbnail-viewer');
	
	  $store.listen(Reducers.FILE_DEPOT, function () {
	    __render__($store, opts, $root);
	  });
	
	  $store.listen(Reducers.MODE_DEPOT, function () {
	    __renderOnModeDepotChange__($store, opts, $root);
	  });
	
	  $store.listen(Reducers.EDIT_DEPOT, function () {
	    __renderOnEditDepotChange__($store, opts, $root);
	  });
	
	  $store.listen(Reducers.PLACEHOLDER_DEPOT, function () {
	    __renderOnPlaceholderDepotChange__($store, opts, $root);
	  });
	
	  return __render__($store, opts, $root);
	}

/***/ },
/* 69 */
/*!**************************************************!*\
  !*** ./~/babel-runtime/helpers/slicedToArray.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(/*! ../core-js/is-iterable */ 70);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(/*! ../core-js/get-iterator */ 6);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function sliceIterator(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;
	
	    try {
	      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);
	
	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"]) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	
	    return _arr;
	  }
	
	  return function (arr, i) {
	    if (Array.isArray(arr)) {
	      return arr;
	    } else if ((0, _isIterable3.default)(Object(arr))) {
	      return sliceIterator(arr, i);
	    } else {
	      throw new TypeError("Invalid attempt to destructure non-iterable instance");
	    }
	  };
	}();

/***/ },
/* 70 */
/*!************************************************!*\
  !*** ./~/babel-runtime/core-js/is-iterable.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/is-iterable */ 71), __esModule: true };

/***/ },
/* 71 */
/*!*************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/is-iterable.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/web.dom.iterable */ 8);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 54);
	module.exports = __webpack_require__(/*! ../modules/core.is-iterable */ 72);

/***/ },
/* 72 */
/*!***********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/core.is-iterable.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(/*! ./_classof */ 58)
	  , ITERATOR  = __webpack_require__(/*! ./_wks */ 51)('iterator')
	  , Iterators = __webpack_require__(/*! ./_iterators */ 12);
	module.exports = __webpack_require__(/*! ./_core */ 21).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 73 */
/*!************************!*\
  !*** ./src/Gallery.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.gen = gen;
	
	var _FpUtils = __webpack_require__(/*! FpUtils */ 2);
	
	var FpUtils = _interopRequireWildcard(_FpUtils);
	
	var _Reducers = __webpack_require__(/*! Reducers */ 5);
	
	var Reducers = _interopRequireWildcard(_Reducers);
	
	var _Actions = __webpack_require__(/*! Actions */ 65);
	
	var Actions = _interopRequireWildcard(_Actions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function __render__($store, opts, $root) {
	  /* get states */
	  var getGalleryStatusDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_STATUS_DEPOT);
	  var getGalleryFilterDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_FILTER_DEPOT);
	  var getGalleryImageDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_IMAGE_DEPOT);
	  var getGallerySelectionDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_SELECTION_DEPOT);
	  var getFileDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.FILE_DEPOT);
	
	  if (getGalleryStatusDepot().isOpened) {
	    $root.addClass('is-opened');
	  }
	
	  var $bg = $('<div />').addClass('overlay').click(function () {
	    $store.dispatch(Actions.triggerGallery());
	  });
	
	  var $dialogTitle = $('<div />').addClass('title').text('露天圖庫');
	
	  var $dialogContent = function () {
	    var $root = $('<div />').addClass('content');
	
	    var $wrap = $('<div />').addClass('wrap');
	
	    var $toolBar = function () {
	      var $root = $('<div />').addClass('tool-bar');
	
	      var $pagination = $('<select />').attr('data-ref', 'galleryPagination');
	
	      for (var i = 1; i <= getGalleryFilterDepot().categoryList[getGalleryFilterDepot().category].totalPages; i++) {
	        var $option = $('<option />').attr('value', i).text('第 ' + i.toString() + ' 頁');
	
	        $pagination.append($option);
	      }
	
	      $pagination.val(getGalleryFilterDepot().page).change(function (e) {
	        var $this = $(e.currentTarget);
	        $store.dispatch(Actions.changeGalleryFilter(getGalleryFilterDepot().category, Number($this.val())));
	        $store.dispatch(Actions.fetchGalleryImage(getGalleryFilterDepot().categoryList[getGalleryFilterDepot().category].val, Number($this.val()), opts.onFetchGallery));
	      });
	
	      var $category = $('<select />').attr('data-ref', 'galleryCategory');
	
	      for (var _i = 0; _i < getGalleryFilterDepot().categoryList.length; _i++) {
	        var categoryItem = getGalleryFilterDepot().categoryList[_i];
	        var _$option = $('<option />').attr('value', categoryItem.val).text(categoryItem.text);
	
	        $category.append(_$option);
	      }
	
	      $category.val(getGalleryFilterDepot().category).change(function (e) {
	        var $this = $(e.currentTarget);
	        $store.dispatch(Actions.changeGalleryFilter(Number($this.val()), 1));
	        $store.dispatch(Actions.fetchGalleryImage(getGalleryFilterDepot().categoryList[getGalleryFilterDepot().category].val, 1, opts.onFetchGallery));
	      });
	
	      return $root.append($category).append($pagination);
	    }();
	
	    var $listView = function () {
	      var $root = $('<div />').addClass('list-view').attr('data-ref', 'galleryListView');
	
	      for (var i = 0; i < getGalleryImageDepot().list.length; i++) {
	        var url = getGalleryImageDepot().list[i].url;
	        var $listItem = $('<div />').addClass('list-item');
	
	        var $img = $('<img />').attr('width', opts.thumbnailWidth).attr('height', opts.thumbnailHeight).attr('src', url);
	
	        $listItem.append($img);
	        $root.append($listItem);
	      }
	
	      return $root;
	    }();
	
	    var $btnBar = function () {
	      var $root = $('<div />').addClass('btn-bar');
	
	      var $ok = $('<button />').attr('type', 'button').addClass('rt-button rt-button-mini rt-button-submit').text('確定新增').click(function () {
	        var list = [];
	        var runningID = getFileDepot().runningID;
	        var selectionList = getGallerySelectionDepot().list;
	        var imageList = getGalleryImageDepot().list;
	
	        if (selectionList.length) {
	          for (var i = 0; i < selectionList.length; i++) {
	            var selection = selectionList[i];
	            list.push({
	              url: imageList[selection].url,
	              userDefinedData: imageList[selection].userDefinedData
	            });
	          }
	
	          $store.dispatch(Actions.uploadFromGalleryStart({
	            currentFileEntities: getFileDepot().entities,
	            currentFileOrder: getFileDepot().order,
	            uploadFiles: list,
	            limit: opts.limit,
	            runningID: runningID,
	            onUploadFromGallery: opts.onUploadFromGallery,
	            onDelete: opts.onDelete
	          }));
	
	          $store.dispatch(Actions.triggerGallery());
	        }
	      });
	
	      var $no = $('<a />').attr('href', '#').text('取消').click(function (e) {
	        e.preventDefault();
	        $store.dispatch(Actions.triggerGallery());
	      });
	
	      return $root.append($ok).append($no);
	    }();
	
	    $wrap.append($toolBar).append($listView).append($btnBar);
	
	    return $root.append($wrap);
	  }();
	
	  var $dialog = $('<div />').addClass('dialog').append($dialogTitle).append($dialogContent);
	
	  $root.append($bg).append($dialog);
	
	  return $root;
	} /* component - Gallery */
	
	
	function __renderOnGalleryStatusDepotChanged__($store, opts, $root) {
	  /* get states */
	  var getGalleryStatusDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_STATUS_DEPOT);
	
	  if (getGalleryStatusDepot().isOpened) {
	    $root.addClass('is-opened');
	  } else {
	    $root.removeClass('is-opened');
	  }
	}
	
	function __renderOnGalleryFilterDepotChanged__($store, opts, $root) {
	  /* get states */
	  var getGalleryFilterDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_FILTER_DEPOT);
	
	  var $pagination = $root.find('[data-ref=galleryPagination]');
	  var $category = $root.find('[data-ref=galleryCategory]');
	
	  $pagination.empty();
	  for (var i = 1; i <= getGalleryFilterDepot().categoryList[getGalleryFilterDepot().category].totalPages; i++) {
	    var $option = $('<option />').attr('value', i).text('第 ' + i.toString() + ' 頁');
	
	    $pagination.append($option);
	  }
	
	  $pagination.val(getGalleryFilterDepot().page);
	
	  $category.empty();
	  for (var _i2 = 0; _i2 < getGalleryFilterDepot().categoryList.length; _i2++) {
	    var categoryItem = getGalleryFilterDepot().categoryList[_i2];
	    var _$option2 = $('<option />').attr('value', _i2.toString()).text(categoryItem.text);
	
	    $category.append(_$option2);
	  }
	
	  $category.val(getGalleryFilterDepot().category);
	
	  if (getGalleryFilterDepot().isFetching) {
	    $pagination.prop('disabled', true);
	    $category.prop('disabled', true);
	  } else {
	    $pagination.prop('disabled', false);
	    $category.prop('disabled', false);
	  }
	}
	
	function __renderOnGalleryImageDepotChanged__($store, opts, $root) {
	  /* get states */
	  var getGalleryImageDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_IMAGE_DEPOT);
	  var getGallerySelectionDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_SELECTION_DEPOT);
	
	  var $listView = $root.find('[data-ref=galleryListView]');
	
	  $listView.empty();
	
	  if (getGalleryImageDepot().isFetching) {
	    var $icon = $('<i />').addClass('fa fa-circle-o-notch fa-spin fa-2x fa-fw loading-ring');
	    $listView.append($icon);
	  } else {
	    for (var i = 0; i < getGalleryImageDepot().list.length; i++) {
	      var url = getGalleryImageDepot().list[i].url;
	      var $listItem = $('<div />').addClass('list-item').click(function (e) {
	        var $this = $(e.currentTarget);
	        var selection = getGallerySelectionDepot().list.slice(0);
	        var n = $this.index();
	        var idx = selection.indexOf(n);
	
	        if (idx === -1) {
	          selection.push(n);
	          if (selection.length > opts.limit) {
	            selection = selection.slice(selection.length - opts.limit);
	          }
	        } else {
	          selection.splice(idx, 1);
	        }
	
	        $store.dispatch(Actions.changeGallerySelection(selection));
	      });
	
	      var $img = $('<img />').attr('width', opts.thumbnailWidth).attr('height', opts.thumbnailHeight).attr('src', url);
	
	      $listItem.append($img);
	      $listView.append($listItem);
	    }
	  }
	}
	
	function __renderOnGallerySelectionDepotChanged__($store, opts, $root) {
	  /* get states */
	  var getGallerySelectionDepot = FpUtils.curryIt($store.getState.bind($store), Reducers.GALLERY_SELECTION_DEPOT);
	
	  var $listView = $root.find('[data-ref=galleryListView]');
	
	  $listView.find('.is-selected').removeClass('is-selected');
	
	  for (var i = 0; i < getGallerySelectionDepot().list.length; i++) {
	    var n = getGallerySelectionDepot().list[i];
	    $listView.children().eq(n).addClass('is-selected');
	  }
	}
	
	/* exports */
	function gen($store, opts) {
	  var $root = $('<div />').addClass('gallery');
	
	  $store.listen(Reducers.GALLERY_STATUS_DEPOT, function () {
	    __renderOnGalleryStatusDepotChanged__($store, opts, $root);
	  });
	
	  $store.listen(Reducers.GALLERY_FILTER_DEPOT, function () {
	    __renderOnGalleryFilterDepotChanged__($store, opts, $root);
	  });
	
	  $store.listen(Reducers.GALLERY_IMAGE_DEPOT, function () {
	    __renderOnGalleryImageDepotChanged__($store, opts, $root);
	  });
	
	  $store.listen(Reducers.GALLERY_SELECTION_DEPOT, function () {
	    __renderOnGallerySelectionDepotChanged__($store, opts, $root);
	  });
	
	  return __render__($store, opts, $root);
	}

/***/ }
/******/ ]);
//# sourceMappingURL=rt_file_uploader.js.map