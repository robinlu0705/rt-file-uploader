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

	module.exports = __webpack_require__(/*! /home/robinlu0705/rt_file_uploader/src/index.js */1);


/***/ },
/* 1 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _reactDom = __webpack_require__(/*! react-dom */ 39);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _react = __webpack_require__(/*! react */ 40);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 41);
	
	var _redux = __webpack_require__(/*! redux */ 49);
	
	var _reduxThunk = __webpack_require__(/*! redux-thunk */ 82);
	
	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);
	
	var _reducers = __webpack_require__(/*! ./src/reducers */ 83);
	
	var _reducers2 = _interopRequireDefault(_reducers);
	
	var _constants = __webpack_require__(/*! ./src/constants */ 112);
	
	var CONSTANTS = _interopRequireWildcard(_constants);
	
	var _AppContainer = __webpack_require__(/*! ./src/components/AppContainer */ 122);
	
	var _AppContainer2 = _interopRequireDefault(_AppContainer);
	
	var _actions = __webpack_require__(/*! ./src/actions */ 111);
	
	var actions = _interopRequireWildcard(_actions);
	
	var _reduxWatch = __webpack_require__(/*! redux-watch */ 176);
	
	var _reduxWatch2 = _interopRequireDefault(_reduxWatch);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function __seasonOpts__(opts) {
	  return (0, _assign2.default)({}, opts, {
	    minHeight: opts.minHeight || 160,
	    thumbnailWidth: opts.thumbnailWidth || 120,
	    thumbnailHeight: opts.thumbnailHeight || 90,
	    limit: opts.limit || 3,
	    galleryFilterOpts: opts.galleryFilterOpts instanceof Array ? opts.galleryFilterOpts : []
	  });
	}
	
	function __findDeletedFileEntities__(newFileEntities, oldFileEntities) {
	  var ret = {};
	  for (var id in oldFileEntities) {
	    if (oldFileEntities.hasOwnProperty(id)) {
	      if (!newFileEntities.hasOwnProperty(id)) {
	        ret[id] = oldFileEntities[id];
	      }
	    }
	  }
	
	  return ret;
	}
	
	window.RT = window.RT || {};
	var APP_NAMESPACE = window.RT.FileUploader = {};
	
	APP_NAMESPACE.gen = function (id, opts) {
	  opts = __seasonOpts__(opts);
	
	  var finalCreateStore = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default), window.devToolsExtension ? window.devToolsExtension() : function (f) {
	    return f;
	  })(_redux.createStore);
	
	  var store = finalCreateStore(_reducers2.default);
	  var fileDepotWatcher = (0, _reduxWatch2.default)(store.getState, 'fileDepot.entities');
	
	  store.subscribe(fileDepotWatcher(function (newVal, oldVal) {
	    var onDelete = opts.onDelete;
	    if (typeof onDelete === 'function') {
	      var deletedFileEntities = __findDeletedFileEntities__(newVal, oldVal);
	      var deletedFileArray = [];
	
	      for (var _id in deletedFileEntities) {
	        if (deletedFileEntities.hasOwnProperty(_id)) {
	          var entity = deletedFileEntities[_id];
	          deletedFileArray.push({
	            id: _id,
	            url: entity.url,
	            status: entity.status,
	            progress: entity.progress,
	            errMsg: entity.errMsg,
	            userDefinedData: entity.userDefinedData
	          });
	        }
	      }
	
	      if (deletedFileArray.length > 0) {
	        onDelete(deletedFileArray);
	      }
	    }
	  }));
	
	  store.dispatch(actions.setGalleryFilterOpts(opts.galleryFilterOpts));
	
	  _reactDom2.default.render(_react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(_AppContainer2.default, { opts: opts })
	  ), document.getElementById(id));
	
	  return {
	    getFiles: function getFiles() {
	      return store.getState().fileDepot.order.map(function (id) {
	        var entity = store.getState().fileDepot.entities[id];
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
	      store.dispatch(actions.addFile(list.map(function (item) {
	        return {
	          url: item.url,
	          userDefinedData: item.userDefinedData
	        };
	      }), opts.limit, store.getState().fileDepot.runningID));
	    }
	  };
	};
	
	APP_NAMESPACE.FILE_STATUS = {
	  COMPLETE: CONSTANTS.FILE_STATUS_COMPLETE,
	  LOADING: CONSTANTS.FILE_STATUS_LOADING,
	  ERROR: CONSTANTS.FILE_STATUS_ERROR,
	  TIMEOUT: CONSTANTS.FILE_STATUS_TIMEOUT
	};

/***/ },
/* 2 */
/*!**************************************************!*\
  !*** ./~/babel-runtime/core-js/object/assign.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/assign */ 3), __esModule: true };

/***/ },
/* 3 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/object/assign.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.assign */ 4);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 7).Object.assign;

/***/ },
/* 4 */
/*!************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.object.assign.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(/*! ./_export */ 5);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(/*! ./_object-assign */ 20)});

/***/ },
/* 5 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_export.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(/*! ./_global */ 6)
	  , core      = __webpack_require__(/*! ./_core */ 7)
	  , ctx       = __webpack_require__(/*! ./_ctx */ 8)
	  , hide      = __webpack_require__(/*! ./_hide */ 10)
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
/* 6 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_global.js ***!
  \**************************************************************/
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_core.js ***!
  \************************************************************/
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_ctx.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(/*! ./_a-function */ 9);
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
/* 9 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_a-function.js ***!
  \******************************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 10 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_hide.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(/*! ./_object-dp */ 11)
	  , createDesc = __webpack_require__(/*! ./_property-desc */ 19);
	module.exports = __webpack_require__(/*! ./_descriptors */ 15) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 11 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-dp.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(/*! ./_an-object */ 12)
	  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 14)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 18)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 15) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 12 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_an-object.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 13);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 13 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_is-object.js ***!
  \*****************************************************************/
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 14 */
/*!**********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_ie8-dom-define.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(/*! ./_descriptors */ 15) && !__webpack_require__(/*! ./_fails */ 16)(function(){
	  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ 17)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_descriptors.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(/*! ./_fails */ 16)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
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
/* 17 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_dom-create.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(/*! ./_is-object */ 13)
	  , document = __webpack_require__(/*! ./_global */ 6).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 18 */
/*!********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-primitive.js ***!
  \********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(/*! ./_is-object */ 13);
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
/* 19 */
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
/* 20 */
/*!*********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-assign.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(/*! ./_object-keys */ 21)
	  , gOPS     = __webpack_require__(/*! ./_object-gops */ 36)
	  , pIE      = __webpack_require__(/*! ./_object-pie */ 37)
	  , toObject = __webpack_require__(/*! ./_to-object */ 38)
	  , IObject  = __webpack_require__(/*! ./_iobject */ 25)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(/*! ./_fails */ 16)(function(){
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
/* 21 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-keys.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(/*! ./_object-keys-internal */ 22)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 35);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 22 */
/*!****************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-keys-internal.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(/*! ./_has */ 23)
	  , toIObject    = __webpack_require__(/*! ./_to-iobject */ 24)
	  , arrayIndexOf = __webpack_require__(/*! ./_array-includes */ 28)(false)
	  , IE_PROTO     = __webpack_require__(/*! ./_shared-key */ 32)('IE_PROTO');
	
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
/* 23 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_has.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 24 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-iobject.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(/*! ./_iobject */ 25)
	  , defined = __webpack_require__(/*! ./_defined */ 27);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 25 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iobject.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(/*! ./_cof */ 26);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 26 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_cof.js ***!
  \***********************************************************/
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 27 */
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
/* 28 */
/*!**********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_array-includes.js ***!
  \**********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 24)
	  , toLength  = __webpack_require__(/*! ./_to-length */ 29)
	  , toIndex   = __webpack_require__(/*! ./_to-index */ 31);
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
/* 29 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-length.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(/*! ./_to-integer */ 30)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 30 */
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
/* 31 */
/*!****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-index.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 30)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 32 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_shared-key.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(/*! ./_shared */ 33)('keys')
	  , uid    = __webpack_require__(/*! ./_uid */ 34);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 33 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_shared.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(/*! ./_global */ 6)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 34 */
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
/* 35 */
/*!*********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_enum-bug-keys.js ***!
  \*********************************************************************/
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 36 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-gops.js ***!
  \*******************************************************************/
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 37 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-pie.js ***!
  \******************************************************************/
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 38 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_to-object.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(/*! ./_defined */ 27);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 39 */
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 40 */
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 41 */
/*!************************************!*\
  !*** ./~/react-redux/lib/index.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.connect = exports.Provider = undefined;
	
	var _Provider = __webpack_require__(/*! ./components/Provider */ 42);
	
	var _Provider2 = _interopRequireDefault(_Provider);
	
	var _connect = __webpack_require__(/*! ./components/connect */ 46);
	
	var _connect2 = _interopRequireDefault(_connect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	exports.Provider = _Provider2["default"];
	exports.connect = _connect2["default"];

/***/ },
/* 42 */
/*!**************************************************!*\
  !*** ./~/react-redux/lib/components/Provider.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports["default"] = undefined;
	
	var _react = __webpack_require__(/*! react */ 40);
	
	var _storeShape = __webpack_require__(/*! ../utils/storeShape */ 44);
	
	var _storeShape2 = _interopRequireDefault(_storeShape);
	
	var _warning = __webpack_require__(/*! ../utils/warning */ 45);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var didWarnAboutReceivingStore = false;
	function warnAboutReceivingStore() {
	  if (didWarnAboutReceivingStore) {
	    return;
	  }
	  didWarnAboutReceivingStore = true;
	
	  (0, _warning2["default"])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
	}
	
	var Provider = function (_Component) {
	  _inherits(Provider, _Component);
	
	  Provider.prototype.getChildContext = function getChildContext() {
	    return { store: this.store };
	  };
	
	  function Provider(props, context) {
	    _classCallCheck(this, Provider);
	
	    var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));
	
	    _this.store = props.store;
	    return _this;
	  }
	
	  Provider.prototype.render = function render() {
	    return _react.Children.only(this.props.children);
	  };
	
	  return Provider;
	}(_react.Component);
	
	exports["default"] = Provider;
	
	
	if (process.env.NODE_ENV !== 'production') {
	  Provider.prototype.componentWillReceiveProps = function (nextProps) {
	    var store = this.store;
	    var nextStore = nextProps.store;
	
	
	    if (store !== nextStore) {
	      warnAboutReceivingStore();
	    }
	  };
	}
	
	Provider.propTypes = {
	  store: _storeShape2["default"].isRequired,
	  children: _react.PropTypes.element.isRequired
	};
	Provider.childContextTypes = {
	  store: _storeShape2["default"].isRequired
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 43)))

/***/ },
/* 43 */
/*!**********************************************************!*\
  !*** (webpack)/~/node-libs-browser/~/process/browser.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 44 */
/*!***********************************************!*\
  !*** ./~/react-redux/lib/utils/storeShape.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(/*! react */ 40);
	
	exports["default"] = _react.PropTypes.shape({
	  subscribe: _react.PropTypes.func.isRequired,
	  dispatch: _react.PropTypes.func.isRequired,
	  getState: _react.PropTypes.func.isRequired
	});

/***/ },
/* 45 */
/*!********************************************!*\
  !*** ./~/react-redux/lib/utils/warning.js ***!
  \********************************************/
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 46 */
/*!*************************************************!*\
  !*** ./~/react-redux/lib/components/connect.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports["default"] = connect;
	
	var _react = __webpack_require__(/*! react */ 40);
	
	var _storeShape = __webpack_require__(/*! ../utils/storeShape */ 44);
	
	var _storeShape2 = _interopRequireDefault(_storeShape);
	
	var _shallowEqual = __webpack_require__(/*! ../utils/shallowEqual */ 47);
	
	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);
	
	var _wrapActionCreators = __webpack_require__(/*! ../utils/wrapActionCreators */ 48);
	
	var _wrapActionCreators2 = _interopRequireDefault(_wrapActionCreators);
	
	var _warning = __webpack_require__(/*! ../utils/warning */ 45);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	var _isPlainObject = __webpack_require__(/*! lodash/isPlainObject */ 70);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _hoistNonReactStatics = __webpack_require__(/*! hoist-non-react-statics */ 80);
	
	var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
	
	var _invariant = __webpack_require__(/*! invariant */ 81);
	
	var _invariant2 = _interopRequireDefault(_invariant);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaultMapStateToProps = function defaultMapStateToProps(state) {
	  return {};
	}; // eslint-disable-line no-unused-vars
	var defaultMapDispatchToProps = function defaultMapDispatchToProps(dispatch) {
	  return { dispatch: dispatch };
	};
	var defaultMergeProps = function defaultMergeProps(stateProps, dispatchProps, parentProps) {
	  return _extends({}, parentProps, stateProps, dispatchProps);
	};
	
	function getDisplayName(WrappedComponent) {
	  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
	}
	
	var errorObject = { value: null };
	function tryCatch(fn, ctx) {
	  try {
	    return fn.apply(ctx);
	  } catch (e) {
	    errorObject.value = e;
	    return errorObject;
	  }
	}
	
	// Helps track hot reloading.
	var nextVersion = 0;
	
	function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
	  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
	
	  var shouldSubscribe = Boolean(mapStateToProps);
	  var mapState = mapStateToProps || defaultMapStateToProps;
	
	  var mapDispatch = void 0;
	  if (typeof mapDispatchToProps === 'function') {
	    mapDispatch = mapDispatchToProps;
	  } else if (!mapDispatchToProps) {
	    mapDispatch = defaultMapDispatchToProps;
	  } else {
	    mapDispatch = (0, _wrapActionCreators2["default"])(mapDispatchToProps);
	  }
	
	  var finalMergeProps = mergeProps || defaultMergeProps;
	  var _options$pure = options.pure,
	      pure = _options$pure === undefined ? true : _options$pure,
	      _options$withRef = options.withRef,
	      withRef = _options$withRef === undefined ? false : _options$withRef;
	
	  var checkMergedEquals = pure && finalMergeProps !== defaultMergeProps;
	
	  // Helps track hot reloading.
	  var version = nextVersion++;
	
	  return function wrapWithConnect(WrappedComponent) {
	    var connectDisplayName = 'Connect(' + getDisplayName(WrappedComponent) + ')';
	
	    function checkStateShape(props, methodName) {
	      if (!(0, _isPlainObject2["default"])(props)) {
	        (0, _warning2["default"])(methodName + '() in ' + connectDisplayName + ' must return a plain object. ' + ('Instead received ' + props + '.'));
	      }
	    }
	
	    function computeMergedProps(stateProps, dispatchProps, parentProps) {
	      var mergedProps = finalMergeProps(stateProps, dispatchProps, parentProps);
	      if (process.env.NODE_ENV !== 'production') {
	        checkStateShape(mergedProps, 'mergeProps');
	      }
	      return mergedProps;
	    }
	
	    var Connect = function (_Component) {
	      _inherits(Connect, _Component);
	
	      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
	        return !pure || this.haveOwnPropsChanged || this.hasStoreStateChanged;
	      };
	
	      function Connect(props, context) {
	        _classCallCheck(this, Connect);
	
	        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));
	
	        _this.version = version;
	        _this.store = props.store || context.store;
	
	        (0, _invariant2["default"])(_this.store, 'Could not find "store" in either the context or ' + ('props of "' + connectDisplayName + '". ') + 'Either wrap the root component in a <Provider>, ' + ('or explicitly pass "store" as a prop to "' + connectDisplayName + '".'));
	
	        var storeState = _this.store.getState();
	        _this.state = { storeState: storeState };
	        _this.clearCache();
	        return _this;
	      }
	
	      Connect.prototype.computeStateProps = function computeStateProps(store, props) {
	        if (!this.finalMapStateToProps) {
	          return this.configureFinalMapState(store, props);
	        }
	
	        var state = store.getState();
	        var stateProps = this.doStatePropsDependOnOwnProps ? this.finalMapStateToProps(state, props) : this.finalMapStateToProps(state);
	
	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(stateProps, 'mapStateToProps');
	        }
	        return stateProps;
	      };
	
	      Connect.prototype.configureFinalMapState = function configureFinalMapState(store, props) {
	        var mappedState = mapState(store.getState(), props);
	        var isFactory = typeof mappedState === 'function';
	
	        this.finalMapStateToProps = isFactory ? mappedState : mapState;
	        this.doStatePropsDependOnOwnProps = this.finalMapStateToProps.length !== 1;
	
	        if (isFactory) {
	          return this.computeStateProps(store, props);
	        }
	
	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(mappedState, 'mapStateToProps');
	        }
	        return mappedState;
	      };
	
	      Connect.prototype.computeDispatchProps = function computeDispatchProps(store, props) {
	        if (!this.finalMapDispatchToProps) {
	          return this.configureFinalMapDispatch(store, props);
	        }
	
	        var dispatch = store.dispatch;
	
	        var dispatchProps = this.doDispatchPropsDependOnOwnProps ? this.finalMapDispatchToProps(dispatch, props) : this.finalMapDispatchToProps(dispatch);
	
	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(dispatchProps, 'mapDispatchToProps');
	        }
	        return dispatchProps;
	      };
	
	      Connect.prototype.configureFinalMapDispatch = function configureFinalMapDispatch(store, props) {
	        var mappedDispatch = mapDispatch(store.dispatch, props);
	        var isFactory = typeof mappedDispatch === 'function';
	
	        this.finalMapDispatchToProps = isFactory ? mappedDispatch : mapDispatch;
	        this.doDispatchPropsDependOnOwnProps = this.finalMapDispatchToProps.length !== 1;
	
	        if (isFactory) {
	          return this.computeDispatchProps(store, props);
	        }
	
	        if (process.env.NODE_ENV !== 'production') {
	          checkStateShape(mappedDispatch, 'mapDispatchToProps');
	        }
	        return mappedDispatch;
	      };
	
	      Connect.prototype.updateStatePropsIfNeeded = function updateStatePropsIfNeeded() {
	        var nextStateProps = this.computeStateProps(this.store, this.props);
	        if (this.stateProps && (0, _shallowEqual2["default"])(nextStateProps, this.stateProps)) {
	          return false;
	        }
	
	        this.stateProps = nextStateProps;
	        return true;
	      };
	
	      Connect.prototype.updateDispatchPropsIfNeeded = function updateDispatchPropsIfNeeded() {
	        var nextDispatchProps = this.computeDispatchProps(this.store, this.props);
	        if (this.dispatchProps && (0, _shallowEqual2["default"])(nextDispatchProps, this.dispatchProps)) {
	          return false;
	        }
	
	        this.dispatchProps = nextDispatchProps;
	        return true;
	      };
	
	      Connect.prototype.updateMergedPropsIfNeeded = function updateMergedPropsIfNeeded() {
	        var nextMergedProps = computeMergedProps(this.stateProps, this.dispatchProps, this.props);
	        if (this.mergedProps && checkMergedEquals && (0, _shallowEqual2["default"])(nextMergedProps, this.mergedProps)) {
	          return false;
	        }
	
	        this.mergedProps = nextMergedProps;
	        return true;
	      };
	
	      Connect.prototype.isSubscribed = function isSubscribed() {
	        return typeof this.unsubscribe === 'function';
	      };
	
	      Connect.prototype.trySubscribe = function trySubscribe() {
	        if (shouldSubscribe && !this.unsubscribe) {
	          this.unsubscribe = this.store.subscribe(this.handleChange.bind(this));
	          this.handleChange();
	        }
	      };
	
	      Connect.prototype.tryUnsubscribe = function tryUnsubscribe() {
	        if (this.unsubscribe) {
	          this.unsubscribe();
	          this.unsubscribe = null;
	        }
	      };
	
	      Connect.prototype.componentDidMount = function componentDidMount() {
	        this.trySubscribe();
	      };
	
	      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	        if (!pure || !(0, _shallowEqual2["default"])(nextProps, this.props)) {
	          this.haveOwnPropsChanged = true;
	        }
	      };
	
	      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
	        this.tryUnsubscribe();
	        this.clearCache();
	      };
	
	      Connect.prototype.clearCache = function clearCache() {
	        this.dispatchProps = null;
	        this.stateProps = null;
	        this.mergedProps = null;
	        this.haveOwnPropsChanged = true;
	        this.hasStoreStateChanged = true;
	        this.haveStatePropsBeenPrecalculated = false;
	        this.statePropsPrecalculationError = null;
	        this.renderedElement = null;
	        this.finalMapDispatchToProps = null;
	        this.finalMapStateToProps = null;
	      };
	
	      Connect.prototype.handleChange = function handleChange() {
	        if (!this.unsubscribe) {
	          return;
	        }
	
	        var storeState = this.store.getState();
	        var prevStoreState = this.state.storeState;
	        if (pure && prevStoreState === storeState) {
	          return;
	        }
	
	        if (pure && !this.doStatePropsDependOnOwnProps) {
	          var haveStatePropsChanged = tryCatch(this.updateStatePropsIfNeeded, this);
	          if (!haveStatePropsChanged) {
	            return;
	          }
	          if (haveStatePropsChanged === errorObject) {
	            this.statePropsPrecalculationError = errorObject.value;
	          }
	          this.haveStatePropsBeenPrecalculated = true;
	        }
	
	        this.hasStoreStateChanged = true;
	        this.setState({ storeState: storeState });
	      };
	
	      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
	        (0, _invariant2["default"])(withRef, 'To access the wrapped instance, you need to specify ' + '{ withRef: true } as the fourth argument of the connect() call.');
	
	        return this.refs.wrappedInstance;
	      };
	
	      Connect.prototype.render = function render() {
	        var haveOwnPropsChanged = this.haveOwnPropsChanged,
	            hasStoreStateChanged = this.hasStoreStateChanged,
	            haveStatePropsBeenPrecalculated = this.haveStatePropsBeenPrecalculated,
	            statePropsPrecalculationError = this.statePropsPrecalculationError,
	            renderedElement = this.renderedElement;
	
	
	        this.haveOwnPropsChanged = false;
	        this.hasStoreStateChanged = false;
	        this.haveStatePropsBeenPrecalculated = false;
	        this.statePropsPrecalculationError = null;
	
	        if (statePropsPrecalculationError) {
	          throw statePropsPrecalculationError;
	        }
	
	        var shouldUpdateStateProps = true;
	        var shouldUpdateDispatchProps = true;
	        if (pure && renderedElement) {
	          shouldUpdateStateProps = hasStoreStateChanged || haveOwnPropsChanged && this.doStatePropsDependOnOwnProps;
	          shouldUpdateDispatchProps = haveOwnPropsChanged && this.doDispatchPropsDependOnOwnProps;
	        }
	
	        var haveStatePropsChanged = false;
	        var haveDispatchPropsChanged = false;
	        if (haveStatePropsBeenPrecalculated) {
	          haveStatePropsChanged = true;
	        } else if (shouldUpdateStateProps) {
	          haveStatePropsChanged = this.updateStatePropsIfNeeded();
	        }
	        if (shouldUpdateDispatchProps) {
	          haveDispatchPropsChanged = this.updateDispatchPropsIfNeeded();
	        }
	
	        var haveMergedPropsChanged = true;
	        if (haveStatePropsChanged || haveDispatchPropsChanged || haveOwnPropsChanged) {
	          haveMergedPropsChanged = this.updateMergedPropsIfNeeded();
	        } else {
	          haveMergedPropsChanged = false;
	        }
	
	        if (!haveMergedPropsChanged && renderedElement) {
	          return renderedElement;
	        }
	
	        if (withRef) {
	          this.renderedElement = (0, _react.createElement)(WrappedComponent, _extends({}, this.mergedProps, {
	            ref: 'wrappedInstance'
	          }));
	        } else {
	          this.renderedElement = (0, _react.createElement)(WrappedComponent, this.mergedProps);
	        }
	
	        return this.renderedElement;
	      };
	
	      return Connect;
	    }(_react.Component);
	
	    Connect.displayName = connectDisplayName;
	    Connect.WrappedComponent = WrappedComponent;
	    Connect.contextTypes = {
	      store: _storeShape2["default"]
	    };
	    Connect.propTypes = {
	      store: _storeShape2["default"]
	    };
	
	    if (process.env.NODE_ENV !== 'production') {
	      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
	        if (this.version === version) {
	          return;
	        }
	
	        // We are hot reloading!
	        this.version = version;
	        this.trySubscribe();
	        this.clearCache();
	      };
	    }
	
	    return (0, _hoistNonReactStatics2["default"])(Connect, WrappedComponent);
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 43)))

/***/ },
/* 47 */
/*!*************************************************!*\
  !*** ./~/react-redux/lib/utils/shallowEqual.js ***!
  \*************************************************/
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = shallowEqual;
	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }
	
	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);
	
	  if (keysA.length !== keysB.length) {
	    return false;
	  }
	
	  // Test for A's keys different from B.
	  var hasOwn = Object.prototype.hasOwnProperty;
	  for (var i = 0; i < keysA.length; i++) {
	    if (!hasOwn.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }
	
	  return true;
	}

/***/ },
/* 48 */
/*!*******************************************************!*\
  !*** ./~/react-redux/lib/utils/wrapActionCreators.js ***!
  \*******************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports["default"] = wrapActionCreators;
	
	var _redux = __webpack_require__(/*! redux */ 49);
	
	function wrapActionCreators(actionCreators) {
	  return function (dispatch) {
	    return (0, _redux.bindActionCreators)(actionCreators, dispatch);
	  };
	}

/***/ },
/* 49 */
/*!******************************!*\
  !*** ./~/redux/lib/index.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;
	
	var _createStore = __webpack_require__(/*! ./createStore */ 50);
	
	var _createStore2 = _interopRequireDefault(_createStore);
	
	var _combineReducers = __webpack_require__(/*! ./combineReducers */ 65);
	
	var _combineReducers2 = _interopRequireDefault(_combineReducers);
	
	var _bindActionCreators = __webpack_require__(/*! ./bindActionCreators */ 67);
	
	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);
	
	var _applyMiddleware = __webpack_require__(/*! ./applyMiddleware */ 68);
	
	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);
	
	var _compose = __webpack_require__(/*! ./compose */ 69);
	
	var _compose2 = _interopRequireDefault(_compose);
	
	var _warning = __webpack_require__(/*! ./utils/warning */ 66);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}
	
	if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}
	
	exports.createStore = _createStore2['default'];
	exports.combineReducers = _combineReducers2['default'];
	exports.bindActionCreators = _bindActionCreators2['default'];
	exports.applyMiddleware = _applyMiddleware2['default'];
	exports.compose = _compose2['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 43)))

/***/ },
/* 50 */
/*!************************************!*\
  !*** ./~/redux/lib/createStore.js ***!
  \************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports['default'] = createStore;
	
	var _isPlainObject = __webpack_require__(/*! lodash/isPlainObject */ 51);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _symbolObservable = __webpack_require__(/*! symbol-observable */ 61);
	
	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};
	
	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [preloadedState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, preloadedState, enhancer) {
	  var _ref2;
	
	  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = preloadedState;
	    preloadedState = undefined;
	  }
	
	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }
	
	    return enhancer(createStore)(reducer, preloadedState);
	  }
	
	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }
	
	  var currentReducer = reducer;
	  var currentState = preloadedState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;
	
	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }
	
	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }
	
	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }
	
	    var isSubscribed = true;
	
	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);
	
	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }
	
	      isSubscribed = false;
	
	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }
	
	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2['default'])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }
	
	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }
	
	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }
	
	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }
	
	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }
	
	    return action;
	  }
	
	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }
	
	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }
	
	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/zenparsing/es-observable
	   */
	  function observable() {
	    var _ref;
	
	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }
	
	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }
	
	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2['default']] = function () {
	      return this;
	    }, _ref;
	  }
	
	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });
	
	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
	}

/***/ },
/* 51 */
/*!*******************************************!*\
  !*** ./~/redux/~/lodash/isPlainObject.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ 52),
	    getPrototype = __webpack_require__(/*! ./_getPrototype */ 58),
	    isObjectLike = __webpack_require__(/*! ./isObjectLike */ 60);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}
	
	module.exports = isPlainObject;


/***/ },
/* 52 */
/*!*****************************************!*\
  !*** ./~/redux/~/lodash/_baseGetTag.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(/*! ./_Symbol */ 53),
	    getRawTag = __webpack_require__(/*! ./_getRawTag */ 56),
	    objectToString = __webpack_require__(/*! ./_objectToString */ 57);
	
	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';
	
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	
	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  value = Object(value);
	  return (symToStringTag && symToStringTag in value)
	    ? getRawTag(value)
	    : objectToString(value);
	}
	
	module.exports = baseGetTag;


/***/ },
/* 53 */
/*!*************************************!*\
  !*** ./~/redux/~/lodash/_Symbol.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(/*! ./_root */ 54);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 54 */
/*!***********************************!*\
  !*** ./~/redux/~/lodash/_root.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ 55);
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	module.exports = root;


/***/ },
/* 55 */
/*!*****************************************!*\
  !*** ./~/redux/~/lodash/_freeGlobal.js ***!
  \*****************************************/
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	module.exports = freeGlobal;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 56 */
/*!****************************************!*\
  !*** ./~/redux/~/lodash/_getRawTag.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(/*! ./_Symbol */ 53);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	
	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];
	
	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}
	
	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}
	
	module.exports = getRawTag;


/***/ },
/* 57 */
/*!*********************************************!*\
  !*** ./~/redux/~/lodash/_objectToString.js ***!
  \*********************************************/
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}
	
	module.exports = objectToString;


/***/ },
/* 58 */
/*!*******************************************!*\
  !*** ./~/redux/~/lodash/_getPrototype.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(/*! ./_overArg */ 59);
	
	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);
	
	module.exports = getPrototype;


/***/ },
/* 59 */
/*!**************************************!*\
  !*** ./~/redux/~/lodash/_overArg.js ***!
  \**************************************/
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	module.exports = overArg;


/***/ },
/* 60 */
/*!******************************************!*\
  !*** ./~/redux/~/lodash/isObjectLike.js ***!
  \******************************************/
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 61 */
/*!**********************************************!*\
  !*** ./~/redux/~/symbol-observable/index.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./lib/index */ 62);


/***/ },
/* 62 */
/*!**************************************************!*\
  !*** ./~/redux/~/symbol-observable/lib/index.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ponyfill = __webpack_require__(/*! ./ponyfill */ 64);
	
	var _ponyfill2 = _interopRequireDefault(_ponyfill);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var root; /* global window */
	
	
	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global !== 'undefined') {
	  root = global;
	} else if (true) {
	  root = module;
	} else {
	  root = Function('return this')();
	}
	
	var result = (0, _ponyfill2['default'])(root);
	exports['default'] = result;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(/*! ./../../../../webpack/buildin/module.js */ 63)(module)))

/***/ },
/* 63 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 64 */
/*!*****************************************************!*\
  !*** ./~/redux/~/symbol-observable/lib/ponyfill.js ***!
  \*****************************************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports['default'] = symbolObservablePonyfill;
	function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;
	
		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}
	
		return result;
	};

/***/ },
/* 65 */
/*!****************************************!*\
  !*** ./~/redux/lib/combineReducers.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	exports.__esModule = true;
	exports['default'] = combineReducers;
	
	var _createStore = __webpack_require__(/*! ./createStore */ 50);
	
	var _isPlainObject = __webpack_require__(/*! lodash/isPlainObject */ 51);
	
	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);
	
	var _warning = __webpack_require__(/*! ./utils/warning */ 66);
	
	var _warning2 = _interopRequireDefault(_warning);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';
	
	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
	}
	
	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';
	
	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }
	
	  if (!(0, _isPlainObject2['default'])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }
	
	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
	  });
	
	  unexpectedKeys.forEach(function (key) {
	    unexpectedKeyCache[key] = true;
	  });
	
	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}
	
	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });
	
	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }
	
	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}
	
	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];
	
	    if (process.env.NODE_ENV !== 'production') {
	      if (typeof reducers[key] === 'undefined') {
	        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
	      }
	    }
	
	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);
	
	  if (process.env.NODE_ENV !== 'production') {
	    var unexpectedKeyCache = {};
	  }
	
	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }
	
	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];
	
	    if (sanityError) {
	      throw sanityError;
	    }
	
	    if (process.env.NODE_ENV !== 'production') {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
	      if (warningMessage) {
	        (0, _warning2['default'])(warningMessage);
	      }
	    }
	
	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 43)))

/***/ },
/* 66 */
/*!**************************************!*\
  !*** ./~/redux/lib/utils/warning.js ***!
  \**************************************/
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 67 */
/*!*******************************************!*\
  !*** ./~/redux/lib/bindActionCreators.js ***!
  \*******************************************/
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}
	
	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }
	
	  if (typeof actionCreators !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }
	
	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ },
/* 68 */
/*!****************************************!*\
  !*** ./~/redux/lib/applyMiddleware.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = applyMiddleware;
	
	var _compose = __webpack_require__(/*! ./compose */ 69);
	
	var _compose2 = _interopRequireDefault(_compose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }
	
	  return function (createStore) {
	    return function (reducer, preloadedState, enhancer) {
	      var store = createStore(reducer, preloadedState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];
	
	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);
	
	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ },
/* 69 */
/*!********************************!*\
  !*** ./~/redux/lib/compose.js ***!
  \********************************/
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */
	
	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }
	
	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  }
	
	  if (funcs.length === 1) {
	    return funcs[0];
	  }
	
	  var last = funcs[funcs.length - 1];
	  var rest = funcs.slice(0, -1);
	  return function () {
	    return rest.reduceRight(function (composed, f) {
	      return f(composed);
	    }, last.apply(undefined, arguments));
	  };
	}

/***/ },
/* 70 */
/*!*************************************************!*\
  !*** ./~/react-redux/~/lodash/isPlainObject.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ 71),
	    getPrototype = __webpack_require__(/*! ./_getPrototype */ 77),
	    isObjectLike = __webpack_require__(/*! ./isObjectLike */ 79);
	
	/** `Object#toString` result references. */
	var objectTag = '[object Object]';
	
	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;
	
	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);
	
	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}
	
	module.exports = isPlainObject;


/***/ },
/* 71 */
/*!***********************************************!*\
  !*** ./~/react-redux/~/lodash/_baseGetTag.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(/*! ./_Symbol */ 72),
	    getRawTag = __webpack_require__(/*! ./_getRawTag */ 75),
	    objectToString = __webpack_require__(/*! ./_objectToString */ 76);
	
	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';
	
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	
	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  value = Object(value);
	  return (symToStringTag && symToStringTag in value)
	    ? getRawTag(value)
	    : objectToString(value);
	}
	
	module.exports = baseGetTag;


/***/ },
/* 72 */
/*!*******************************************!*\
  !*** ./~/react-redux/~/lodash/_Symbol.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(/*! ./_root */ 73);
	
	/** Built-in value references. */
	var Symbol = root.Symbol;
	
	module.exports = Symbol;


/***/ },
/* 73 */
/*!*****************************************!*\
  !*** ./~/react-redux/~/lodash/_root.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ 74);
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	module.exports = root;


/***/ },
/* 74 */
/*!***********************************************!*\
  !*** ./~/react-redux/~/lodash/_freeGlobal.js ***!
  \***********************************************/
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	module.exports = freeGlobal;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 75 */
/*!**********************************************!*\
  !*** ./~/react-redux/~/lodash/_getRawTag.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(/*! ./_Symbol */ 72);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
	
	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];
	
	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}
	
	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}
	
	module.exports = getRawTag;


/***/ },
/* 76 */
/*!***************************************************!*\
  !*** ./~/react-redux/~/lodash/_objectToString.js ***!
  \***************************************************/
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;
	
	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}
	
	module.exports = objectToString;


/***/ },
/* 77 */
/*!*************************************************!*\
  !*** ./~/react-redux/~/lodash/_getPrototype.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(/*! ./_overArg */ 78);
	
	/** Built-in value references. */
	var getPrototype = overArg(Object.getPrototypeOf, Object);
	
	module.exports = getPrototype;


/***/ },
/* 78 */
/*!********************************************!*\
  !*** ./~/react-redux/~/lodash/_overArg.js ***!
  \********************************************/
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}
	
	module.exports = overArg;


/***/ },
/* 79 */
/*!************************************************!*\
  !*** ./~/react-redux/~/lodash/isObjectLike.js ***!
  \************************************************/
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 80 */
/*!**********************************************************!*\
  !*** ./~/react-redux/~/hoist-non-react-statics/index.js ***!
  \**********************************************************/
/***/ function(module, exports) {

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	'use strict';
	
	var REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};
	
	var KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};
	
	var isGetOwnPropertySymbolsAvailable = typeof Object.getOwnPropertySymbols === 'function';
	
	module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, customStatics) {
	    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components
	        var keys = Object.getOwnPropertyNames(sourceComponent);
	
	        /* istanbul ignore else */
	        if (isGetOwnPropertySymbolsAvailable) {
	            keys = keys.concat(Object.getOwnPropertySymbols(sourceComponent));
	        }
	
	        for (var i = 0; i < keys.length; ++i) {
	            if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]] && (!customStatics || !customStatics[keys[i]])) {
	                try {
	                    targetComponent[keys[i]] = sourceComponent[keys[i]];
	                } catch (error) {
	
	                }
	            }
	        }
	    }
	
	    return targetComponent;
	};


/***/ },
/* 81 */
/*!**********************************************!*\
  !*** ./~/react-redux/~/invariant/browser.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! (webpack)/~/node-libs-browser/~/process/browser.js */ 43)))

/***/ },
/* 82 */
/*!************************************!*\
  !*** ./~/redux-thunk/lib/index.js ***!
  \************************************/
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	function createThunkMiddleware(extraArgument) {
	  return function (_ref) {
	    var dispatch = _ref.dispatch;
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        if (typeof action === 'function') {
	          return action(dispatch, getState, extraArgument);
	        }
	
	        return next(action);
	      };
	    };
	  };
	}
	
	var thunk = createThunkMiddleware();
	thunk.withExtraArgument = createThunkMiddleware;
	
	exports['default'] = thunk;

/***/ },
/* 83 */
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redux = __webpack_require__(/*! redux */ 49);
	
	var _fileDepot = __webpack_require__(/*! ./src/reducers/fileDepot */ 84);
	
	var _fileDepot2 = _interopRequireDefault(_fileDepot);
	
	var _layoutDepot = __webpack_require__(/*! ./src/reducers/layoutDepot */ 113);
	
	var _layoutDepot2 = _interopRequireDefault(_layoutDepot);
	
	var _modeDepot = __webpack_require__(/*! ./src/reducers/modeDepot */ 114);
	
	var _modeDepot2 = _interopRequireDefault(_modeDepot);
	
	var _editDepot = __webpack_require__(/*! ./src/reducers/editDepot */ 115);
	
	var _editDepot2 = _interopRequireDefault(_editDepot);
	
	var _placeholderDepot = __webpack_require__(/*! ./src/reducers/placeholderDepot */ 116);
	
	var _placeholderDepot2 = _interopRequireDefault(_placeholderDepot);
	
	var _galleryStatusDepot = __webpack_require__(/*! ./src/reducers/galleryStatusDepot */ 117);
	
	var _galleryStatusDepot2 = _interopRequireDefault(_galleryStatusDepot);
	
	var _galleryFilterDepot = __webpack_require__(/*! ./src/reducers/galleryFilterDepot */ 118);
	
	var _galleryFilterDepot2 = _interopRequireDefault(_galleryFilterDepot);
	
	var _galleryImageDepot = __webpack_require__(/*! ./src/reducers/galleryImageDepot */ 119);
	
	var _galleryImageDepot2 = _interopRequireDefault(_galleryImageDepot);
	
	var _gallerySelectionDepot = __webpack_require__(/*! ./src/reducers/gallerySelectionDepot */ 120);
	
	var _gallerySelectionDepot2 = _interopRequireDefault(_gallerySelectionDepot);
	
	var _globalErrorDepot = __webpack_require__(/*! ./src/reducers/globalErrorDepot */ 121);
	
	var _globalErrorDepot2 = _interopRequireDefault(_globalErrorDepot);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _redux.combineReducers)({
	  fileDepot: _fileDepot2.default,
	  layoutDepot: _layoutDepot2.default,
	  modeDepot: _modeDepot2.default,
	  editDepot: _editDepot2.default,
	  placeholderDepot: _placeholderDepot2.default,
	  galleryStatusDepot: _galleryStatusDepot2.default,
	  galleryFilterDepot: _galleryFilterDepot2.default,
	  galleryImageDepot: _galleryImageDepot2.default,
	  gallerySelectionDepot: _gallerySelectionDepot2.default,
	  globalErrorDepot: _globalErrorDepot2.default
	});

/***/ },
/* 84 */
/*!***********************************!*\
  !*** ./src/reducers/fileDepot.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ 85);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _getIterator2 = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ 89);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _actions = __webpack_require__(/*! ./src/actions */ 111);
	
	var actions = _interopRequireWildcard(_actions);
	
	var _constants = __webpack_require__(/*! ./src/constants */ 112);
	
	var CONSTANTS = _interopRequireWildcard(_constants);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultState = {
	  entities: {},
	  order: [],
	  selections: [],
	  runningID: 0
	};
	
	exports.default = function () {
	  var _actionHandlers;
	
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
	  var action = arguments[1];
	
	  var actionHandlers = (_actionHandlers = {}, (0, _defineProperty3.default)(_actionHandlers, actions.ADD_LOADING_FILE, function () {
	    var IDList = action.payload.IDList;
	    var limit = action.payload.limit;
	    var newRunningID = action.payload.newRunningID;
	    var newEntities = {};
	    var newEntityOrder = [];
	    var overflow = IDList.length + state.order.length - limit;
	    var remainedIDs = state.order.slice(0 + overflow, state.order.length);
	
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = (0, _getIterator3.default)(remainedIDs), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var id = _step.value;
	
	        newEntities[id] = state.entities[id];
	        newEntityOrder.push(id);
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
	
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;
	
	    try {
	      for (var _iterator2 = (0, _getIterator3.default)(IDList), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var _id = _step2.value;
	
	        newEntities[_id] = {
	          url: '',
	          status: CONSTANTS.FILE_STATUS_LOADING,
	          progress: 0
	        };
	
	        newEntityOrder.push(_id);
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
	      entities: newEntities,
	      order: newEntityOrder,
	      selections: [],
	      runningID: newRunningID
	    });
	  }), (0, _defineProperty3.default)(_actionHandlers, actions.UPDATE_LOADING_FILE, function () {
	    var list = action.payload;
	    var needUpdate = false;
	    var IDList = list.map(function (item) {
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
	      var newEntities = (0, _assign2.default)({}, state.entities);
	      var newEntityOrder = state.order.slice(0);
	
	      for (var _i = 0; _i < IDList.length; _i++) {
	        var _id2 = IDList[_i];
	        var url = list[_i].url;
	        var status = list[_i].status;
	        var progress = list[_i].progress;
	        var errMsg = list[_i].errMsg;
	        var userDefinedData = list[_i].userDefinedData;
	        var entity = newEntities[_id2];
	        if (entity) {
	          entity.url = url;
	          entity.status = status;
	          entity.progress = progress;
	          entity.errMsg = errMsg;
	          entity.userDefinedData = userDefinedData;
	        }
	      }
	
	      return (0, _assign2.default)({}, state, {
	        entities: newEntities,
	        order: newEntityOrder
	      });
	    }
	  }), (0, _defineProperty3.default)(_actionHandlers, actions.ADD_FILE, function () {
	    var list = action.payload.list;
	    var newRunningID = action.payload.newRunningID;
	    var limit = action.payload.limit;
	    var newEntities = {};
	    var newEntityOrder = [];
	    var overflow = list.length + state.order.length - limit;
	    var remainedIDs = state.order.slice(0 + overflow, state.order.length);
	
	    var _iteratorNormalCompletion3 = true;
	    var _didIteratorError3 = false;
	    var _iteratorError3 = undefined;
	
	    try {
	      for (var _iterator3 = (0, _getIterator3.default)(remainedIDs), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	        var _id3 = _step3.value;
	
	        newEntities[_id3] = state.entities[_id3];
	        newEntityOrder.push(_id3);
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
	
	    for (var i = 0; i < list.length; i++) {
	      var id = list[i].id;
	      var url = list[i].url;
	      var userDefinedData = list[i].userDefinedData;
	      newEntities[id] = {
	        url: url,
	        status: CONSTANTS.FILE_STATUS_COMPLETE,
	        progress: 100,
	        errMsg: '',
	        userDefinedData: userDefinedData
	      };
	
	      newEntityOrder.push(id);
	    }
	
	    return (0, _assign2.default)({}, state, {
	      entities: newEntities,
	      order: newEntityOrder,
	      selections: [],
	      runningID: newRunningID
	    });
	  }), (0, _defineProperty3.default)(_actionHandlers, actions.DELETE_FILE, function () {
	    var newEntities = (0, _assign2.default)({}, state.entities);
	    var newEntityOrder = state.order.slice(0);
	
	    var _iteratorNormalCompletion4 = true;
	    var _didIteratorError4 = false;
	    var _iteratorError4 = undefined;
	
	    try {
	      for (var _iterator4 = (0, _getIterator3.default)(action.payload), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	        var id = _step4.value;
	
	        var idx = newEntityOrder.indexOf(id);
	
	        if (idx !== -1) {
	          delete newEntities[id];
	          newEntityOrder.splice(idx, 1);
	        }
	      }
	    } catch (err) {
	      _didIteratorError4 = true;
	      _iteratorError4 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion4 && _iterator4.return) {
	          _iterator4.return();
	        }
	      } finally {
	        if (_didIteratorError4) {
	          throw _iteratorError4;
	        }
	      }
	    }
	
	    return (0, _assign2.default)({}, state, {
	      entities: newEntities,
	      order: newEntityOrder,
	      selections: []
	    });
	  }), (0, _defineProperty3.default)(_actionHandlers, actions.END_EDIT, function () {
	    var editTarget = action.payload.editTarget;
	    var hoverTarget = action.payload.hoverTarget;
	    var editIdx = state.order.indexOf(editTarget);
	    var hoverIdx = state.order.indexOf(hoverTarget);
	    var order = state.order.slice(0, editIdx).concat(state.order.slice(editIdx + 1));
	    order = order.slice(0, hoverIdx).concat([editTarget]).concat(order.slice(hoverIdx));
	    return (0, _assign2.default)({}, state, {
	      order: order
	    });
	  }), _actionHandlers);
	
	  if (action.type in actionHandlers) {
	    return actionHandlers[action.type]();
	  }
	
	  return state;
	};

/***/ },
/* 85 */
/*!***************************************************!*\
  !*** ./~/babel-runtime/helpers/defineProperty.js ***!
  \***************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ 86);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};

/***/ },
/* 86 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/core-js/object/define-property.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/define-property */ 87), __esModule: true };

/***/ },
/* 87 */
/*!************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/object/define-property.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.define-property */ 88);
	var $Object = __webpack_require__(/*! ../../modules/_core */ 7).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 88 */
/*!*********************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.object.define-property.js ***!
  \*********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 5);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ 15), 'Object', {defineProperty: __webpack_require__(/*! ./_object-dp */ 11).f});

/***/ },
/* 89 */
/*!*************************************************!*\
  !*** ./~/babel-runtime/core-js/get-iterator.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/get-iterator */ 90), __esModule: true };

/***/ },
/* 90 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/get-iterator.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/web.dom.iterable */ 91);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 106);
	module.exports = __webpack_require__(/*! ../modules/core.get-iterator */ 108);

/***/ },
/* 91 */
/*!***********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/web.dom.iterable.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./es6.array.iterator */ 92);
	var global        = __webpack_require__(/*! ./_global */ 6)
	  , hide          = __webpack_require__(/*! ./_hide */ 10)
	  , Iterators     = __webpack_require__(/*! ./_iterators */ 95)
	  , TO_STRING_TAG = __webpack_require__(/*! ./_wks */ 104)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 92 */
/*!*************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.array.iterator.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ 93)
	  , step             = __webpack_require__(/*! ./_iter-step */ 94)
	  , Iterators        = __webpack_require__(/*! ./_iterators */ 95)
	  , toIObject        = __webpack_require__(/*! ./_to-iobject */ 24);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(/*! ./_iter-define */ 96)(Array, 'Array', function(iterated, kind){
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
/* 93 */
/*!**************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_add-to-unscopables.js ***!
  \**************************************************************************/
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 94 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iter-step.js ***!
  \*****************************************************************/
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 95 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iterators.js ***!
  \*****************************************************************/
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 96 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iter-define.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(/*! ./_library */ 97)
	  , $export        = __webpack_require__(/*! ./_export */ 5)
	  , redefine       = __webpack_require__(/*! ./_redefine */ 98)
	  , hide           = __webpack_require__(/*! ./_hide */ 10)
	  , has            = __webpack_require__(/*! ./_has */ 23)
	  , Iterators      = __webpack_require__(/*! ./_iterators */ 95)
	  , $iterCreate    = __webpack_require__(/*! ./_iter-create */ 99)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 103)
	  , getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 105)
	  , ITERATOR       = __webpack_require__(/*! ./_wks */ 104)('iterator')
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
/* 97 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_library.js ***!
  \***************************************************************/
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 98 */
/*!****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_redefine.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_hide */ 10);

/***/ },
/* 99 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iter-create.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(/*! ./_object-create */ 100)
	  , descriptor     = __webpack_require__(/*! ./_property-desc */ 19)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 103)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(/*! ./_hide */ 10)(IteratorPrototype, __webpack_require__(/*! ./_wks */ 104)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 100 */
/*!*********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-create.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(/*! ./_an-object */ 12)
	  , dPs         = __webpack_require__(/*! ./_object-dps */ 101)
	  , enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ 35)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 32)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(/*! ./_dom-create */ 17)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(/*! ./_html */ 102).appendChild(iframe);
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
/* 101 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-dps.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(/*! ./_object-dp */ 11)
	  , anObject = __webpack_require__(/*! ./_an-object */ 12)
	  , getKeys  = __webpack_require__(/*! ./_object-keys */ 21);
	
	module.exports = __webpack_require__(/*! ./_descriptors */ 15) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 102 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_html.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./_global */ 6).document && document.documentElement;

/***/ },
/* 103 */
/*!*************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_set-to-string-tag.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(/*! ./_object-dp */ 11).f
	  , has = __webpack_require__(/*! ./_has */ 23)
	  , TAG = __webpack_require__(/*! ./_wks */ 104)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 104 */
/*!***********************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_wks.js ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(/*! ./_shared */ 33)('wks')
	  , uid        = __webpack_require__(/*! ./_uid */ 34)
	  , Symbol     = __webpack_require__(/*! ./_global */ 6).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 105 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-gpo.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(/*! ./_has */ 23)
	  , toObject    = __webpack_require__(/*! ./_to-object */ 38)
	  , IE_PROTO    = __webpack_require__(/*! ./_shared-key */ 32)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 106 */
/*!**************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.string.iterator.js ***!
  \**************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(/*! ./_string-at */ 107)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(/*! ./_iter-define */ 96)(String, 'String', function(iterated){
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
/* 107 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_string-at.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(/*! ./_to-integer */ 30)
	  , defined   = __webpack_require__(/*! ./_defined */ 27);
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
/* 108 */
/*!************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/core.get-iterator.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(/*! ./_an-object */ 12)
	  , get      = __webpack_require__(/*! ./core.get-iterator-method */ 109);
	module.exports = __webpack_require__(/*! ./_core */ 7).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 109 */
/*!*******************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/core.get-iterator-method.js ***!
  \*******************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(/*! ./_classof */ 110)
	  , ITERATOR  = __webpack_require__(/*! ./_wks */ 104)('iterator')
	  , Iterators = __webpack_require__(/*! ./_iterators */ 95);
	module.exports = __webpack_require__(/*! ./_core */ 7).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 110 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_classof.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(/*! ./_cof */ 26)
	  , TAG = __webpack_require__(/*! ./_wks */ 104)('toStringTag')
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
/* 111 */
/*!******************************!*\
  !*** ./src/actions/index.js ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.SET_GLOBAL_ERROR = exports.CHANGE_GALLERY_SELECTION = exports.RECEIVE_GALLERY_IMAGE = exports.REQUEST_GALLERY_IMAGE = exports.CHANGE_GALLERY_FILTER = exports.SET_GALLERY_FILTER_OPTS = exports.TOGGLE_GALLERY = exports.UPDATE_LAYOUT = exports.UPDATE_PLACEHOLDER = exports.END_EDIT = exports.UPDATE_EDIT = exports.START_EDIT = exports.DELETE_FILE = exports.ADD_FILE = exports.UPDATE_LOADING_FILE = exports.ADD_LOADING_FILE = undefined;
	exports.uploadStart = uploadStart;
	exports.uploadFromGalleryStart = uploadFromGalleryStart;
	exports.addFile = addFile;
	exports.deleteFile = deleteFile;
	exports.updateLayout = updateLayout;
	exports.startEdit = startEdit;
	exports.endEdit = endEdit;
	exports.updateEdit = updateEdit;
	exports.updatePlaceholder = updatePlaceholder;
	exports.toggleGallery = toggleGallery;
	exports.setGalleryFilterOpts = setGalleryFilterOpts;
	exports.changeGalleryFilter = changeGalleryFilter;
	exports.fetchGalleryImage = fetchGalleryImage;
	exports.changeGallerySelection = changeGallerySelection;
	exports.setGlobalError = setGlobalError;
	
	var _constants = __webpack_require__(/*! ./src/constants */ 112);
	
	var CONSTANTS = _interopRequireWildcard(_constants);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	/* action type constants */
	var ADD_LOADING_FILE = exports.ADD_LOADING_FILE = 'ADD_LOADING_FILE'; /* actions */
	var UPDATE_LOADING_FILE = exports.UPDATE_LOADING_FILE = 'UPDATE_LOADING_FILE';
	var ADD_FILE = exports.ADD_FILE = 'ADD_FILE';
	var DELETE_FILE = exports.DELETE_FILE = 'DELETE_FILE';
	var START_EDIT = exports.START_EDIT = 'START_EDIT';
	var UPDATE_EDIT = exports.UPDATE_EDIT = 'UPDATE_EDIT';
	var END_EDIT = exports.END_EDIT = 'END_EDIT';
	var UPDATE_PLACEHOLDER = exports.UPDATE_PLACEHOLDER = 'UPDATE_PLACEHOLDER';
	var UPDATE_LAYOUT = exports.UPDATE_LAYOUT = 'UPDATE_LAYOUT';
	var TOGGLE_GALLERY = exports.TOGGLE_GALLERY = 'TOGGLE_GALLERY';
	var SET_GALLERY_FILTER_OPTS = exports.SET_GALLERY_FILTER_OPTS = 'SET_GALLERY_FILTER_OPTS';
	var CHANGE_GALLERY_FILTER = exports.CHANGE_GALLERY_FILTER = 'CHANGE_GALLERY_FILTER';
	var REQUEST_GALLERY_IMAGE = exports.REQUEST_GALLERY_IMAGE = 'REQUEST_GALLERY_IMAGE';
	var RECEIVE_GALLERY_IMAGE = exports.RECEIVE_GALLERY_IMAGE = 'RECEIVE_GALLERY_IMAGE';
	var CHANGE_GALLERY_SELECTION = exports.CHANGE_GALLERY_SELECTION = 'CHANGE_GALLERY_SELECTION';
	var SET_GLOBAL_ERROR = exports.SET_GLOBAL_ERROR = 'SET_GLOBAL_ERROR';
	
	function uploadStart(_ref) {
	  var uploadFileList = _ref.uploadFileList,
	      limit = _ref.limit,
	      onUpload = _ref.onUpload,
	      runningID = _ref.runningID;
	
	  return function (dispatch) {
	    /* new added items */
	    var itemList = [];
	    for (var i = 0; i < uploadFileList.length && i < limit; i++) {
	      itemList.push({
	        id: runningID + 1 + i,
	        file: uploadFileList.item(i)
	      });
	    }
	
	    dispatch(addLoadingFile(itemList.map(function (item) {
	      return item.id;
	    }), limit, runningID + itemList.length));
	
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
	  var uploadFiles = _ref2.uploadFiles,
	      limit = _ref2.limit,
	      runningID = _ref2.runningID,
	      onUploadFromGallery = _ref2.onUploadFromGallery;
	
	  return function (dispatch) {
	    /* new added items */
	    var itemList = uploadFiles.slice(0, limit).map(function (file, idx) {
	      return {
	        id: runningID + 1 + idx,
	        url: file.url,
	        userDefinedData: file.userDefinedData
	      };
	    });
	
	    dispatch(addLoadingFile(itemList.map(function (item) {
	      return item.id;
	    }), limit, runningID + itemList.length));
	
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
	
	function addFile(addList, limit, runningID) {
	  /* new added items */
	  var itemList = addList.slice(0, limit).map(function (item, idx) {
	    return {
	      id: runningID + 1 + idx,
	      url: item.url,
	      userDefinedData: item.userDefinedData
	    };
	  });
	
	  return {
	    type: ADD_FILE,
	    payload: {
	      list: itemList,
	      limit: limit,
	      newRunningID: runningID + itemList.length
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
	
	function toggleGallery() {
	  return {
	    type: TOGGLE_GALLERY
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
	
	function _setGlobalError(errType, limit, timerToken) {
	  var ret = {
	    type: SET_GLOBAL_ERROR,
	    payload: {
	      limit: limit,
	      timerToken: timerToken
	    }
	  };
	
	  switch (errType) {
	    case CONSTANTS.GLOBAL_ERROR_OVERSELECT:
	      {
	        ret.payload.errType = CONSTANTS.GLOBAL_ERROR_OVERSELECT;
	        break;
	      }
	
	    case CONSTANTS.GLOBAL_ERROR_OVERFLOW:
	      {
	        ret.payload.errType = CONSTANTS.GLOBAL_ERROR_OVERFLOW;
	        break;
	      }
	
	    default:
	      ret.payload.errType = CONSTANTS.GLOBAL_ERROR_NONE;
	  }
	
	  return ret;
	}
	
	function setGlobalError(errType, limit, timerToken) {
	  return function (dispatch) {
	    var token = void 0;
	
	    if (errType !== CONSTANTS.GLOBAL_ERROR_NONE) {
	      clearTimeout(timerToken);
	      token = setTimeout(function () {
	        dispatch(_setGlobalError(CONSTANTS.GLOBAL_ERROR_NONE));
	      }, 6000);
	    }
	
	    dispatch(_setGlobalError(errType, limit, token));
	  };
	}

/***/ },
/* 112 */
/*!********************************!*\
  !*** ./src/constants/index.js ***!
  \********************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var DISPLAY_MODE = exports.DISPLAY_MODE = 'DISPLAY_MODE';
	var EDIT_MODE = exports.EDIT_MODE = 'EDIT_MODE';
	
	var FILE_STATUS_LOADING = exports.FILE_STATUS_LOADING = 'FILE_STATUS_LOADING';
	var FILE_STATUS_COMPLETE = exports.FILE_STATUS_COMPLETE = 'FILE_STATUS_COMPLETE';
	var FILE_STATUS_ERROR = exports.FILE_STATUS_ERROR = 'FILE_STATUS_ERROR';
	var FILE_STATUS_TIMEOUT = exports.FILE_STATUS_TIMEOUT = 'FILE_STATUS_TIMEOUT';
	
	var GLOBAL_ERROR_OVERSELECT = exports.GLOBAL_ERROR_OVERSELECT = 'GLOBAL_ERROR_OVERSELECT';
	var GLOBAL_ERROR_OVERFLOW = exports.GLOBAL_ERROR_OVERFLOW = 'GLOBAL_ERROR_OVERFLOW';
	var GLOBAL_ERROR_NONE = exports.GLOBAL_ERROR_NONE = 'GLOBAL_ERROR_NONE';

/***/ },
/* 113 */
/*!*************************************!*\
  !*** ./src/reducers/layoutDepot.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ 85);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _actions = __webpack_require__(/*! ./src/actions */ 111);
	
	var actions = _interopRequireWildcard(_actions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultState = {
	  thumbnailLayouts: []
	};
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
	  var action = arguments[1];
	
	  var actionHandler = (0, _defineProperty3.default)({}, actions.UPDATE_LAYOUT, function () {
	    return (0, _assign2.default)({}, state, {
	      thumbnailLayouts: action.payload
	    });
	  });
	
	  if (action.type in actionHandler) {
	    return actionHandler[action.type]();
	  }
	
	  return state;
	};

/***/ },
/* 114 */
/*!***********************************!*\
  !*** ./src/reducers/modeDepot.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ 85);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _actions = __webpack_require__(/*! ./src/actions */ 111);
	
	var actions = _interopRequireWildcard(_actions);
	
	var _constants = __webpack_require__(/*! ./src/constants */ 112);
	
	var CONSTANTS = _interopRequireWildcard(_constants);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultState = {
	  mode: CONSTANTS.DISPLAY_MODE
	};
	
	exports.default = function () {
	  var _actionHandler;
	
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
	  var action = arguments[1];
	
	  var actionHandler = (_actionHandler = {}, (0, _defineProperty3.default)(_actionHandler, actions.START_EDIT, function () {
	    return (0, _assign2.default)({}, state, {
	      mode: CONSTANTS.EDIT_MODE
	    });
	  }), (0, _defineProperty3.default)(_actionHandler, actions.END_EDIT, function () {
	    return (0, _assign2.default)({}, state, {
	      mode: CONSTANTS.DISPLAY_MODE
	    });
	  }), _actionHandler);
	
	  if (action.type in actionHandler) {
	    return actionHandler[action.type]();
	  }
	
	  return state;
	};

/***/ },
/* 115 */
/*!***********************************!*\
  !*** ./src/reducers/editDepot.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ 85);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _actions = __webpack_require__(/*! ./src/actions */ 111);
	
	var actions = _interopRequireWildcard(_actions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultState = {
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
	
	exports.default = function () {
	  var _actionHandler;
	
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
	  var action = arguments[1];
	
	  var actionHandler = (_actionHandler = {}, (0, _defineProperty3.default)(_actionHandler, actions.START_EDIT, function () {
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
	  }), (0, _defineProperty3.default)(_actionHandler, actions.UPDATE_EDIT, function () {
	    return (0, _assign2.default)({}, state, {
	      currentPos: {
	        x: action.payload.cursorX,
	        y: action.payload.cursorY
	      }
	    });
	  }), _actionHandler);
	
	  if (action.type in actionHandler) {
	    return actionHandler[action.type]();
	  }
	
	  return state;
	};

/***/ },
/* 116 */
/*!******************************************!*\
  !*** ./src/reducers/placeholderDepot.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ 85);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _actions = __webpack_require__(/*! ./src/actions */ 111);
	
	var actions = _interopRequireWildcard(_actions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultState = {
	  hoverTarget: null
	};
	
	exports.default = function () {
	  var _actionHandler;
	
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
	  var action = arguments[1];
	
	  var actionHandler = (_actionHandler = {}, (0, _defineProperty3.default)(_actionHandler, actions.START_EDIT, function () {
	    return (0, _assign2.default)({}, state, {
	      hoverTarget: action.payload.entityID
	    });
	  }), (0, _defineProperty3.default)(_actionHandler, actions.UPDATE_PLACEHOLDER, function () {
	    return (0, _assign2.default)({}, state, {
	      hoverTarget: action.payload
	    });
	  }), (0, _defineProperty3.default)(_actionHandler, actions.END_EDIT, function () {
	    return (0, _assign2.default)({}, state, {
	      hoverTarget: null
	    });
	  }), _actionHandler);
	
	  if (action.type in actionHandler) {
	    return actionHandler[action.type]();
	  }
	
	  return state;
	};

/***/ },
/* 117 */
/*!********************************************!*\
  !*** ./src/reducers/galleryStatusDepot.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ 85);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _actions = __webpack_require__(/*! ./src/actions */ 111);
	
	var actions = _interopRequireWildcard(_actions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultState = {
	  isOpened: false
	};
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
	  var action = arguments[1];
	
	  var actionHandler = (0, _defineProperty3.default)({}, actions.TOGGLE_GALLERY, function () {
	    return (0, _assign2.default)({}, state, {
	      isOpened: !state.isOpened
	    });
	  });
	
	  if (action.type in actionHandler) {
	    return actionHandler[action.type]();
	  }
	
	  return state;
	};

/***/ },
/* 118 */
/*!********************************************!*\
  !*** ./src/reducers/galleryFilterDepot.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ 85);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _actions = __webpack_require__(/*! ./src/actions */ 111);
	
	var actions = _interopRequireWildcard(_actions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultState = {
	  page: 1,
	  categoryList: [{ text: '--', val: '', totalPages: 1 }],
	  category: 0,
	  isFetching: false
	};
	
	exports.default = function () {
	  var _actionHandler;
	
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
	  var action = arguments[1];
	
	  var actionHandler = (_actionHandler = {}, (0, _defineProperty3.default)(_actionHandler, actions.SET_GALLERY_FILTER_OPTS, function () {
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
	  }), (0, _defineProperty3.default)(_actionHandler, actions.CHANGE_GALLERY_FILTER, function () {
	    var category = action.payload.category;
	    var page = action.payload.page;
	
	    return (0, _assign2.default)({}, state, {
	      page: page,
	      category: category
	    });
	  }), (0, _defineProperty3.default)(_actionHandler, actions.REQUEST_GALLERY_IMAGE, function () {
	    return (0, _assign2.default)({}, state, {
	      isFetching: true
	    });
	  }), (0, _defineProperty3.default)(_actionHandler, actions.RECEIVE_GALLERY_IMAGE, function () {
	    return (0, _assign2.default)({}, state, {
	      isFetching: false
	    });
	  }), _actionHandler);
	
	  if (action.type in actionHandler) {
	    return actionHandler[action.type]();
	  }
	
	  return state;
	};

/***/ },
/* 119 */
/*!*******************************************!*\
  !*** ./src/reducers/galleryImageDepot.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ 85);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _actions = __webpack_require__(/*! ./src/actions */ 111);
	
	var actions = _interopRequireWildcard(_actions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultState = {
	  list: [],
	  isFetching: false
	};
	
	exports.default = function () {
	  var _actionHandler;
	
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
	  var action = arguments[1];
	
	  var actionHandler = (_actionHandler = {}, (0, _defineProperty3.default)(_actionHandler, actions.REQUEST_GALLERY_IMAGE, function () {
	    return (0, _assign2.default)({}, state, {
	      isFetching: true,
	      list: []
	    });
	  }), (0, _defineProperty3.default)(_actionHandler, actions.RECEIVE_GALLERY_IMAGE, function () {
	    return (0, _assign2.default)({}, state, {
	      isFetching: false,
	      list: action.payload
	    });
	  }), _actionHandler);
	
	  if (action.type in actionHandler) {
	    return actionHandler[action.type]();
	  }
	
	  return state;
	};

/***/ },
/* 120 */
/*!***********************************************!*\
  !*** ./src/reducers/gallerySelectionDepot.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ 85);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _actions = __webpack_require__(/*! ./src/actions */ 111);
	
	var actions = _interopRequireWildcard(_actions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultState = {
	  list: []
	};
	
	exports.default = function () {
	  var _actionHandler;
	
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
	  var action = arguments[1];
	
	  var actionHandler = (_actionHandler = {}, (0, _defineProperty3.default)(_actionHandler, actions.CHANGE_GALLERY_SELECTION, function () {
	    return (0, _assign2.default)({}, state, {
	      list: action.payload
	    });
	  }), (0, _defineProperty3.default)(_actionHandler, actions.REQUEST_GALLERY_IMAGE, function () {
	    return (0, _assign2.default)({}, state, {
	      list: []
	    });
	  }), _actionHandler);
	
	  if (action.type in actionHandler) {
	    return actionHandler[action.type]();
	  }
	
	  return state;
	};

/***/ },
/* 121 */
/*!******************************************!*\
  !*** ./src/reducers/globalErrorDepot.js ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _defineProperty2 = __webpack_require__(/*! babel-runtime/helpers/defineProperty */ 85);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _actions = __webpack_require__(/*! ./src/actions */ 111);
	
	var actions = _interopRequireWildcard(_actions);
	
	var _constants = __webpack_require__(/*! ./src/constants */ 112);
	
	var CONSTANTS = _interopRequireWildcard(_constants);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var defaultState = {
	  msg: '',
	  timerToken: null
	};
	
	exports.default = function () {
	  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
	  var action = arguments[1];
	
	  var actionHandler = (0, _defineProperty3.default)({}, actions.SET_GLOBAL_ERROR, function () {
	    var msg = '';
	
	    switch (action.payload.errType) {
	      case CONSTANTS.GLOBAL_ERROR_OVERFLOW:
	        {
	          msg = '檔案已達限定上傳數，若要繼續上傳，請先刪除檔案';
	          break;
	        }
	
	      case CONSTANTS.GLOBAL_ERROR_OVERSELECT:
	        {
	          msg = '\u6700\u591A\u50C5\u53EF\u4E0A\u50B3 ' + action.payload.limit + ' \u500B\u6A94\u6848';
	          break;
	        }
	    }
	
	    return (0, _assign2.default)({}, state, {
	      msg: msg,
	      timerToken: action.payload.timerToken
	    });
	  });
	
	  if (action.type in actionHandler) {
	    return actionHandler[action.type]();
	  }
	
	  return state;
	};

/***/ },
/* 122 */
/*!****************************************!*\
  !*** ./src/components/AppContainer.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 41);
	
	var _App = __webpack_require__(/*! ./src/components/App */ 123);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _actions = __webpack_require__(/*! ./src/actions */ 111);
	
	var actions = _interopRequireWildcard(_actions);
	
	var _constants = __webpack_require__(/*! ./src/constants */ 112);
	
	var CONSTANTS = _interopRequireWildcard(_constants);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function mapStateToProps(state) {
	  return {
	    _fileDepotRunningID: state.fileDepot.runningID,
	    _fileDepotOrder: state.fileDepot.order,
	    _globalErrorDepotTimerToken: state.globalErrorDepot.timerToken
	  };
	}
	
	function mergeProps(stateProps, dispatchProps, ownProps) {
	  var _fileDepotRunningID = stateProps._fileDepotRunningID,
	      _fileDepotOrder = stateProps._fileDepotOrder,
	      _globalErrorDepotTimerToken = stateProps._globalErrorDepotTimerToken;
	  var dispatch = dispatchProps.dispatch;
	
	
	  return (0, _assign2.default)({}, stateProps, dispatchProps, ownProps, {
	    onFileDrop: function onFileDrop(_ref) {
	      var fileList = _ref.fileList,
	          limit = _ref.limit,
	          onUpload = _ref.onUpload;
	
	      if (fileList.length > limit) {
	        dispatch(actions.setGlobalError(CONSTANTS.GLOBAL_ERROR_OVERSELECT, limit, _globalErrorDepotTimerToken));
	      } else if (fileList.length + _fileDepotOrder.length > limit) {
	        dispatch(actions.setGlobalError(CONSTANTS.GLOBAL_ERROR_OVERFLOW, limit, _globalErrorDepotTimerToken));
	      } else {
	        dispatch(actions.setGlobalError(CONSTANTS.GLOBAL_ERROR_NONE, limit, _globalErrorDepotTimerToken));
	        dispatch(actions.uploadStart({
	          uploadFileList: fileList,
	          limit: limit,
	          onUpload: onUpload,
	          runningID: _fileDepotRunningID
	        }));
	      }
	    }
	  });
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, null, mergeProps)(_App2.default);

/***/ },
/* 123 */
/*!*******************************!*\
  !*** ./src/components/App.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 124);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 128);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 129);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 130);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 149);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 40);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _ToolBarContainer = __webpack_require__(/*! ./src/components/ToolBarContainer */ 157);
	
	var _ToolBarContainer2 = _interopRequireDefault(_ToolBarContainer);
	
	var _ThumbnailViewerContainer = __webpack_require__(/*! ./src/components/ThumbnailViewerContainer */ 159);
	
	var _ThumbnailViewerContainer2 = _interopRequireDefault(_ThumbnailViewerContainer);
	
	var _GalleryContainer = __webpack_require__(/*! ./src/components/GalleryContainer */ 174);
	
	var _GalleryContainer2 = _interopRequireDefault(_GalleryContainer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* css prefix constants */
	/* component - App */
	var IDENTIFIER = 'RT_FILE_UPLOADER';
	
	var App = function (_React$PureComponent) {
	  (0, _inherits3.default)(App, _React$PureComponent);
	
	  function App(props) {
	    (0, _classCallCheck3.default)(this, App);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).call(this, props));
	
	    _this.state = {
	      isDragOver: false
	    };
	    return _this;
	  }
	
	  (0, _createClass3.default)(App, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props,
	          opts = _props.opts,
	          onFileDrop = _props.onFileDrop;
	      var isDragOver = this.state.isDragOver;
	
	
	      return _react2.default.createElement(
	        'div',
	        { className: IDENTIFIER + ' ' + (isDragOver ? 'drag-over' : ''), style: { minHeight: opts.minHeight + 'px' },
	          onDragOver: function onDragOver(e) {
	            e.preventDefault();
	            _this2.setState({
	              isDragOver: true
	            });
	          },
	          onDragLeave: function onDragLeave(e) {
	            e.preventDefault();
	            _this2.setState({
	              isDragOver: false
	            });
	          },
	          onDrop: function onDrop(e) {
	            e.preventDefault();
	            onFileDrop({
	              fileList: e.dataTransfer.files,
	              limit: opts.limit,
	              onUpload: opts.onUpload
	            });
	
	            _this2.setState({
	              isDragOver: false
	            });
	          }
	        },
	        _react2.default.createElement(_ToolBarContainer2.default, { opts: opts }),
	        _react2.default.createElement(_ThumbnailViewerContainer2.default, { opts: opts }),
	        _react2.default.createElement(_GalleryContainer2.default, { opts: opts })
	      );
	    }
	  }]);
	  return App;
	}(_react2.default.PureComponent);
	
	exports.default = App;
	
	
	App.propTypes = {
	  opts: _react2.default.PropTypes.shape({
	    limit: _react2.default.PropTypes.number,
	    minHeight: _react2.default.PropTypes.number,
	    thumbnailWidth: _react2.default.PropTypes.number,
	    thumbnailHeight: _react2.default.PropTypes.number,
	    galleryFilterOpts: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
	      categoryName: _react2.default.PropTypes.string.isRequired,
	      categoryVal: _react2.default.PropTypes.string.isRequired,
	      totalPages: _react2.default.PropTypes.number.isRequired
	    })),
	
	    debug: _react2.default.PropTypes.bool,
	    onUpload: _react2.default.PropTypes.func,
	    onFetchGallery: _react2.default.PropTypes.func,
	    onUploadFromGallery: _react2.default.PropTypes.func,
	    onDelete: _react2.default.PropTypes.func
	  }),
	
	  onFileDrop: _react2.default.PropTypes.func.isRequired
	};

/***/ },
/* 124 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/core-js/object/get-prototype-of.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/get-prototype-of */ 125), __esModule: true };

/***/ },
/* 125 */
/*!*************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/object/get-prototype-of.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.get-prototype-of */ 126);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 7).Object.getPrototypeOf;

/***/ },
/* 126 */
/*!**********************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.object.get-prototype-of.js ***!
  \**********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(/*! ./_to-object */ 38)
	  , $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ 105);
	
	__webpack_require__(/*! ./_object-sap */ 127)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 127 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-sap.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(/*! ./_export */ 5)
	  , core    = __webpack_require__(/*! ./_core */ 7)
	  , fails   = __webpack_require__(/*! ./_fails */ 16);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 128 */
/*!***************************************************!*\
  !*** ./~/babel-runtime/helpers/classCallCheck.js ***!
  \***************************************************/
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 129 */
/*!************************************************!*\
  !*** ./~/babel-runtime/helpers/createClass.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ 86);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 130 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(/*! ../helpers/typeof */ 131);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 131 */
/*!*******************************************!*\
  !*** ./~/babel-runtime/helpers/typeof.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(/*! ../core-js/symbol/iterator */ 132);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(/*! ../core-js/symbol */ 135);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 132 */
/*!****************************************************!*\
  !*** ./~/babel-runtime/core-js/symbol/iterator.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol/iterator */ 133), __esModule: true };

/***/ },
/* 133 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/symbol/iterator.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.string.iterator */ 106);
	__webpack_require__(/*! ../../modules/web.dom.iterable */ 91);
	module.exports = __webpack_require__(/*! ../../modules/_wks-ext */ 134).f('iterator');

/***/ },
/* 134 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_wks-ext.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(/*! ./_wks */ 104);

/***/ },
/* 135 */
/*!*******************************************!*\
  !*** ./~/babel-runtime/core-js/symbol.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/symbol */ 136), __esModule: true };

/***/ },
/* 136 */
/*!**************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/symbol/index.js ***!
  \**************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.symbol */ 137);
	__webpack_require__(/*! ../../modules/es6.object.to-string */ 146);
	__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ 147);
	__webpack_require__(/*! ../../modules/es7.symbol.observable */ 148);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 7).Symbol;

/***/ },
/* 137 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.symbol.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(/*! ./_global */ 6)
	  , has            = __webpack_require__(/*! ./_has */ 23)
	  , DESCRIPTORS    = __webpack_require__(/*! ./_descriptors */ 15)
	  , $export        = __webpack_require__(/*! ./_export */ 5)
	  , redefine       = __webpack_require__(/*! ./_redefine */ 98)
	  , META           = __webpack_require__(/*! ./_meta */ 138).KEY
	  , $fails         = __webpack_require__(/*! ./_fails */ 16)
	  , shared         = __webpack_require__(/*! ./_shared */ 33)
	  , setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ 103)
	  , uid            = __webpack_require__(/*! ./_uid */ 34)
	  , wks            = __webpack_require__(/*! ./_wks */ 104)
	  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 134)
	  , wksDefine      = __webpack_require__(/*! ./_wks-define */ 139)
	  , keyOf          = __webpack_require__(/*! ./_keyof */ 140)
	  , enumKeys       = __webpack_require__(/*! ./_enum-keys */ 141)
	  , isArray        = __webpack_require__(/*! ./_is-array */ 142)
	  , anObject       = __webpack_require__(/*! ./_an-object */ 12)
	  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 24)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 18)
	  , createDesc     = __webpack_require__(/*! ./_property-desc */ 19)
	  , _create        = __webpack_require__(/*! ./_object-create */ 100)
	  , gOPNExt        = __webpack_require__(/*! ./_object-gopn-ext */ 143)
	  , $GOPD          = __webpack_require__(/*! ./_object-gopd */ 145)
	  , $DP            = __webpack_require__(/*! ./_object-dp */ 11)
	  , $keys          = __webpack_require__(/*! ./_object-keys */ 21)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(/*! ./_object-gopn */ 144).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(/*! ./_object-pie */ 37).f  = $propertyIsEnumerable;
	  __webpack_require__(/*! ./_object-gops */ 36).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(/*! ./_library */ 97)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ 10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 138 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_meta.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(/*! ./_uid */ 34)('meta')
	  , isObject = __webpack_require__(/*! ./_is-object */ 13)
	  , has      = __webpack_require__(/*! ./_has */ 23)
	  , setDesc  = __webpack_require__(/*! ./_object-dp */ 11).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(/*! ./_fails */ 16)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 139 */
/*!******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_wks-define.js ***!
  \******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(/*! ./_global */ 6)
	  , core           = __webpack_require__(/*! ./_core */ 7)
	  , LIBRARY        = __webpack_require__(/*! ./_library */ 97)
	  , wksExt         = __webpack_require__(/*! ./_wks-ext */ 134)
	  , defineProperty = __webpack_require__(/*! ./_object-dp */ 11).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 140 */
/*!*************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_keyof.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(/*! ./_object-keys */ 21)
	  , toIObject = __webpack_require__(/*! ./_to-iobject */ 24);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 141 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_enum-keys.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(/*! ./_object-keys */ 21)
	  , gOPS    = __webpack_require__(/*! ./_object-gops */ 36)
	  , pIE     = __webpack_require__(/*! ./_object-pie */ 37);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 142 */
/*!****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_is-array.js ***!
  \****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(/*! ./_cof */ 26);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 143 */
/*!***********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-gopn-ext.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(/*! ./_to-iobject */ 24)
	  , gOPN      = __webpack_require__(/*! ./_object-gopn */ 144).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 144 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-gopn.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(/*! ./_object-keys-internal */ 22)
	  , hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ 35).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 145 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_object-gopd.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(/*! ./_object-pie */ 37)
	  , createDesc     = __webpack_require__(/*! ./_property-desc */ 19)
	  , toIObject      = __webpack_require__(/*! ./_to-iobject */ 24)
	  , toPrimitive    = __webpack_require__(/*! ./_to-primitive */ 18)
	  , has            = __webpack_require__(/*! ./_has */ 23)
	  , IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ 14)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(/*! ./_descriptors */ 15) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 146 */
/*!***************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.object.to-string.js ***!
  \***************************************************************************/
/***/ function(module, exports) {



/***/ },
/* 147 */
/*!********************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es7.symbol.async-iterator.js ***!
  \********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_wks-define */ 139)('asyncIterator');

/***/ },
/* 148 */
/*!****************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es7.symbol.observable.js ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ./_wks-define */ 139)('observable');

/***/ },
/* 149 */
/*!*********************************************!*\
  !*** ./~/babel-runtime/helpers/inherits.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ 150);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(/*! ../core-js/object/create */ 154);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(/*! ../helpers/typeof */ 131);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 150 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/core-js/object/set-prototype-of.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/set-prototype-of */ 151), __esModule: true };

/***/ },
/* 151 */
/*!*************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/object/set-prototype-of.js ***!
  \*************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.set-prototype-of */ 152);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 7).Object.setPrototypeOf;

/***/ },
/* 152 */
/*!**********************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.object.set-prototype-of.js ***!
  \**********************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(/*! ./_export */ 5);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(/*! ./_set-proto */ 153).set});

/***/ },
/* 153 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_set-proto.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(/*! ./_is-object */ 13)
	  , anObject = __webpack_require__(/*! ./_an-object */ 12);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(/*! ./_ctx */ 8)(Function.call, __webpack_require__(/*! ./_object-gopd */ 145).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 154 */
/*!**************************************************!*\
  !*** ./~/babel-runtime/core-js/object/create.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/object/create */ 155), __esModule: true };

/***/ },
/* 155 */
/*!***************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/object/create.js ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.object.create */ 156);
	var $Object = __webpack_require__(/*! ../../modules/_core */ 7).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 156 */
/*!************************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.object.create.js ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(/*! ./_export */ 5)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(/*! ./_object-create */ 100)});

/***/ },
/* 157 */
/*!********************************************!*\
  !*** ./src/components/ToolBarContainer.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 41);
	
	var _ToolBar = __webpack_require__(/*! ./src/components/ToolBar */ 158);
	
	var _ToolBar2 = _interopRequireDefault(_ToolBar);
	
	var _actions = __webpack_require__(/*! ./src/actions */ 111);
	
	var actions = _interopRequireWildcard(_actions);
	
	var _constants = __webpack_require__(/*! ./src/constants */ 112);
	
	var CONSTANTS = _interopRequireWildcard(_constants);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function mapStateToProps(state) {
	  return {
	    errMsg: state.globalErrorDepot.msg,
	    _fileDepotRunningID: state.fileDepot.runningID,
	    _fileDepotOrder: state.fileDepot.order,
	    _globalErrorDepotTimerToken: state.globalErrorDepot.timerToken,
	    _galleryFilterDepotCategoryList: state.galleryFilterDepot.categoryList,
	    _galleryFilterDepotCategory: state.galleryFilterDepot.category,
	    _galleryFilterDepotPage: state.galleryFilterDepot.page
	  };
	}
	
	function mapDispatchToProps(dispatch) {
	  return {
	    dispatch: dispatch,
	    onGalleryToggle: function onGalleryToggle() {
	      dispatch(actions.toggleGallery());
	    }
	  };
	}
	
	function mergeProps(stateProps, dispatchProps, ownProps) {
	  var _fileDepotRunningID = stateProps._fileDepotRunningID,
	      _fileDepotOrder = stateProps._fileDepotOrder,
	      _globalErrorDepotTimerToken = stateProps._globalErrorDepotTimerToken,
	      _galleryFilterDepotCategoryList = stateProps._galleryFilterDepotCategoryList,
	      _galleryFilterDepotCategory = stateProps._galleryFilterDepotCategory,
	      _galleryFilterDepotPage = stateProps._galleryFilterDepotPage;
	  var dispatch = dispatchProps.dispatch;
	
	
	  return (0, _assign2.default)({}, stateProps, dispatchProps, ownProps, {
	    showHint: _fileDepotOrder.length <= 0,
	    fileCount: _fileDepotOrder.length,
	    onLocalFileChange: function onLocalFileChange(_ref) {
	      var fileList = _ref.fileList,
	          limit = _ref.limit,
	          onUpload = _ref.onUpload;
	
	      if (fileList.length > limit) {
	        dispatch(actions.setGlobalError(CONSTANTS.GLOBAL_ERROR_OVERSELECT, limit, _globalErrorDepotTimerToken));
	      } else if (fileList.length + _fileDepotOrder.length > limit) {
	        dispatch(actions.setGlobalError(CONSTANTS.GLOBAL_ERROR_OVERFLOW, limit, _globalErrorDepotTimerToken));
	      } else {
	        dispatch(actions.setGlobalError(CONSTANTS.GLOBAL_ERROR_NONE, limit, _globalErrorDepotTimerToken));
	        dispatch(actions.uploadStart({
	          uploadFileList: fileList,
	          limit: limit,
	          onUpload: onUpload,
	          runningID: _fileDepotRunningID
	        }));
	      }
	    },
	    onGalleryImageFetch: function onGalleryImageFetch(onFetchGallery) {
	      dispatch(actions.fetchGalleryImage(_galleryFilterDepotCategoryList[_galleryFilterDepotCategory].val, _galleryFilterDepotPage, onFetchGallery));
	    }
	  });
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps)(_ToolBar2.default);

/***/ },
/* 158 */
/*!***********************************!*\
  !*** ./src/components/ToolBar.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ToolBar;
	
	var _react = __webpack_require__(/*! react */ 40);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function ToolBar(_ref) {
	  var opts = _ref.opts,
	      showHint = _ref.showHint,
	      fileCount = _ref.fileCount,
	      errMsg = _ref.errMsg,
	      onLocalFileChange = _ref.onLocalFileChange,
	      onGalleryToggle = _ref.onGalleryToggle,
	      onGalleryImageFetch = _ref.onGalleryImageFetch;
	
	  var isOverFlow = fileCount >= opts.limit;
	
	  return _react2.default.createElement(
	    'div',
	    { className: ['tool-bar', showHint ? 'hint' : ''].join(' ') },
	    _react2.default.createElement(
	      'div',
	      { className: 'wrap' },
	      _react2.default.createElement('i', { className: 'upload-icon fa fa-upload' }),
	      _react2.default.createElement(
	        'div',
	        { className: 'hint-text' },
	        _react2.default.createElement(
	          'span',
	          null,
	          '\u9078\u64C7\u6A94\u6848'
	        )
	      ),
	      _react2.default.createElement(
	        'label',
	        { className: 'action' },
	        _react2.default.createElement('input', { type: 'file', accept: 'image/*;capture=camera', className: 'add-local-input', multiple: true, disabled: isOverFlow,
	          onChange: function onChange(e) {
	            var currentTarget = e.currentTarget;
	            onLocalFileChange({
	              fileList: currentTarget.files,
	              limit: opts.limit,
	              onUpload: opts.onUpload,
	              onDelete: opts.onDelete
	            });
	
	            currentTarget.value = '';
	          }
	        }),
	        _react2.default.createElement(
	          'div',
	          { className: 'rt-button rt-button-mini rt-button-default ' + (isOverFlow ? 'rt-button-disabled' : '') },
	          '\u672C\u5730\u6A94\u6848'
	        )
	      ),
	      _react2.default.createElement(
	        'button',
	        { type: 'button', className: 'action rt-button rt-button-mini rt-button-default ' + (isOverFlow ? 'rt-button-disabled' : ''), disabled: isOverFlow,
	          onClick: function onClick() {
	            onGalleryToggle();
	            onGalleryImageFetch(opts.onFetchGallery);
	          }
	        },
	        '\u9732\u5929\u5716\u5EAB'
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'hint-text' },
	        _react2.default.createElement(
	          'span',
	          { className: 'separator' },
	          '\u6216'
	        ),
	        _react2.default.createElement(
	          'span',
	          null,
	          '\u62D6\u66F3\u6A94\u6848\u81F3\u6B64'
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'limit-hint-text ' + (errMsg ? 'is-hidden' : '') },
	        (showHint ? '最多' : '尚') + '\u53EF\u4E0A\u50B3 ' + (opts.limit - fileCount) + ' \u500B\u6A94\u6848'
	      ),
	      _react2.default.createElement(
	        'label',
	        { className: 'global-error ' + (errMsg ? '' : 'is-hidden') + ' ' + (showHint ? '' : 'rt-error-bubble') },
	        errMsg
	      )
	    )
	  );
	} /* component - ToolBar */
	
	
	ToolBar.propTypes = {
	  opts: _react2.default.PropTypes.object.isRequired /* see App.js */
	  , showHint: _react2.default.PropTypes.bool.isRequired,
	  fileCount: _react2.default.PropTypes.number.isRequired,
	  errMsg: _react2.default.PropTypes.string,
	  onLocalFileChange: _react2.default.PropTypes.func.isRequired,
	  onGalleryToggle: _react2.default.PropTypes.func.isRequired,
	  onGalleryImageFetch: _react2.default.PropTypes.func.isRequired
	};

/***/ },
/* 159 */
/*!****************************************************!*\
  !*** ./src/components/ThumbnailViewerContainer.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _slicedToArray2 = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ 160);
	
	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
	
	var _getIterator2 = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ 89);
	
	var _getIterator3 = _interopRequireDefault(_getIterator2);
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 41);
	
	var _actions = __webpack_require__(/*! ./src/actions */ 111);
	
	var actions = _interopRequireWildcard(_actions);
	
	var _constants = __webpack_require__(/*! ./src/constants */ 112);
	
	var CONSTANTS = _interopRequireWildcard(_constants);
	
	var _ThumbnailViewer = __webpack_require__(/*! ./src/components/ThumbnailViewer */ 164);
	
	var _ThumbnailViewer2 = _interopRequireDefault(_ThumbnailViewer);
	
	var _utils = __webpack_require__(/*! ./src/utils */ 173);
	
	var utils = _interopRequireWildcard(_utils);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function mapStateToProps(state) {
	  return {
	    _fileDepot: state.fileDepot,
	    _modeDepot: state.modeDepot,
	    _editDepot: state.editDepot,
	    _placeholderDepot: state.placeholderDepot,
	    _layoutDepot: state.layoutDepot
	  };
	}
	
	function mapDispatchToProps(dispatch) {
	  return {
	    dispatch: dispatch,
	    onLayoutUpdate: function onLayoutUpdate(thumbnailLayouts) {
	      dispatch(actions.updateLayout(thumbnailLayouts));
	    }
	  };
	}
	
	function mergeProps(stateProps, dispatchProps, ownProps) {
	  var dispatch = dispatchProps.dispatch;
	  var _fileDepot = stateProps._fileDepot,
	      _modeDepot = stateProps._modeDepot,
	      _editDepot = stateProps._editDepot,
	      _placeholderDepot = stateProps._placeholderDepot,
	      _layoutDepot = stateProps._layoutDepot;
	
	
	  return (0, _assign2.default)({}, ownProps, dispatchProps, {
	    thumbnailOrder: _fileDepot.order,
	    thumbnailEntities: _fileDepot.entities,
	    thumbnailLayouts: _layoutDepot.thumbnailLayouts,
	    mode: _modeDepot.mode,
	    editTarget: _editDepot.target,
	    editCurrentPos: _editDepot.currentPos,
	    editStartPos: _editDepot.startPos,
	    hoverTarget: _placeholderDepot.hoverTarget,
	    onFileDelete: function onFileDelete(_ref) {
	      var entityID = _ref.entityID,
	          onDelete = _ref.onDelete;
	
	      dispatch(actions.deleteFile(_fileDepot.entities, [entityID], onDelete));
	    },
	    onReorderStart: function onReorderStart(_ref2) {
	      var entityID = _ref2.entityID,
	          cursorX = _ref2.cursorX,
	          cursorY = _ref2.cursorY;
	
	      if (_modeDepot.mode === CONSTANTS.DISPLAY_MODE) {
	        dispatch(actions.startEdit({ entityID: entityID, cursorX: cursorX, cursorY: cursorY }));
	      }
	    },
	    onReorderEnd: function onReorderEnd() {
	      if (_modeDepot.mode === CONSTANTS.EDIT_MODE) {
	        dispatch(actions.endEdit(_editDepot.target, _placeholderDepot.hoverTarget));
	      }
	    },
	    onReordering: function onReordering(_ref3) {
	      var cursorX = _ref3.cursorX,
	          cursorY = _ref3.cursorY,
	          thumbnailWidth = _ref3.thumbnailWidth,
	          thumbnailHeight = _ref3.thumbnailHeight;
	
	      if (_modeDepot.mode === CONSTANTS.EDIT_MODE) {
	        dispatch(actions.updateEdit({
	          cursorX: cursorX,
	          cursorY: cursorY,
	          entityID: _fileDepot.target
	        }));
	
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;
	
	        try {
	          for (var _iterator = (0, _getIterator3.default)(_layoutDepot.thumbnailLayouts.entries()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
	                idx = _step$value[0],
	                layout = _step$value[1];
	
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
	
	            if (utils.isCollided(object, pos)) {
	              dispatch(actions.updatePlaceholder(_fileDepot.order[idx]));
	              break;
	            }
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
	      }
	    }
	  });
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps)(_ThumbnailViewer2.default);

/***/ },
/* 160 */
/*!**************************************************!*\
  !*** ./~/babel-runtime/helpers/slicedToArray.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _isIterable2 = __webpack_require__(/*! ../core-js/is-iterable */ 161);
	
	var _isIterable3 = _interopRequireDefault(_isIterable2);
	
	var _getIterator2 = __webpack_require__(/*! ../core-js/get-iterator */ 89);
	
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
/* 161 */
/*!************************************************!*\
  !*** ./~/babel-runtime/core-js/is-iterable.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/is-iterable */ 162), __esModule: true };

/***/ },
/* 162 */
/*!*************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/is-iterable.js ***!
  \*************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../modules/web.dom.iterable */ 91);
	__webpack_require__(/*! ../modules/es6.string.iterator */ 106);
	module.exports = __webpack_require__(/*! ../modules/core.is-iterable */ 163);

/***/ },
/* 163 */
/*!***********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/core.is-iterable.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(/*! ./_classof */ 110)
	  , ITERATOR  = __webpack_require__(/*! ./_wks */ 104)('iterator')
	  , Iterators = __webpack_require__(/*! ./_iterators */ 95);
	module.exports = __webpack_require__(/*! ./_core */ 7).isIterable = function(it){
	  var O = Object(it);
	  return O[ITERATOR] !== undefined
	    || '@@iterator' in O
	    || Iterators.hasOwnProperty(classof(O));
	};

/***/ },
/* 164 */
/*!*******************************************!*\
  !*** ./src/components/ThumbnailViewer.js ***!
  \*******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ 165);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 124);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 128);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 129);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(/*! babel-runtime/helpers/possibleConstructorReturn */ 130);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(/*! babel-runtime/helpers/inherits */ 149);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _react = __webpack_require__(/*! react */ 40);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _constants = __webpack_require__(/*! ./src/constants */ 112);
	
	var CONSTANTS = _interopRequireWildcard(_constants);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* component - ThumbnailViewer */
	function ThumbnailContent(_ref) {
	  var status = _ref.status,
	      url = _ref.url,
	      errMsg = _ref.errMsg;
	
	  switch (status) {
	    case CONSTANTS.FILE_STATUS_LOADING:
	      {
	        return _react2.default.createElement(
	          'div',
	          { className: 'img' },
	          _react2.default.createElement('i', { className: 'fa fa-circle-o-notch fa-spin fa-2x fa-fw loading-ring' })
	        );
	      }
	
	    case CONSTANTS.FILE_STATUS_COMPLETE:
	      {
	        return _react2.default.createElement('div', { className: 'img', style: { backgroundImage: 'url(' + url + ')' } });
	      }
	
	    case CONSTANTS.FILE_STATUS_ERROR:
	      {
	        return _react2.default.createElement(
	          'div',
	          { className: 'img' },
	          _react2.default.createElement(
	            'div',
	            { className: 'msg' },
	            _react2.default.createElement('i', { className: 'fa fa-exclamation-triangle icon' }),
	            _react2.default.createElement(
	              'div',
	              { className: 'text' },
	              errMsg
	            )
	          )
	        );
	      }
	  }
	}
	
	ThumbnailContent.propTypes = {
	  status: _react2.default.PropTypes.oneOf([CONSTANTS.FILE_STATUS_LOADING, CONSTANTS.FILE_STATUS_COMPLETE, CONSTANTS.FILE_STATUS_ERROR]).isRequired,
	
	  url: _react2.default.PropTypes.string,
	  errMsg: _react2.default.PropTypes.string
	};
	
	var ThumbnailViewer = function (_React$PureComponent) {
	  (0, _inherits3.default)(ThumbnailViewer, _React$PureComponent);
	
	  function ThumbnailViewer(props) {
	    (0, _classCallCheck3.default)(this, ThumbnailViewer);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (ThumbnailViewer.__proto__ || (0, _getPrototypeOf2.default)(ThumbnailViewer)).call(this, props));
	
	    _this.thumbnailMouseDownHandler = _this.thumbnailMouseDownHandler.bind(_this);
	    _this.thumbnailMouseMoveHandler = _this.thumbnailMouseMoveHandler.bind(_this);
	    _this.thumbnailMouseUpHandler = _this.thumbnailMouseUpHandler.bind(_this);
	    _this.preRenderHandler = _this.preRenderHandler.bind(_this);
	    _this.postRenderHandler = _this.postRenderHandler.bind(_this);
	    return _this;
	  }
	
	  (0, _createClass3.default)(ThumbnailViewer, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;
	
	      var _props = this.props,
	          opts = _props.opts,
	          thumbnailOrder = _props.thumbnailOrder,
	          thumbnailEntities = _props.thumbnailEntities,
	          thumbnailLayouts = _props.thumbnailLayouts,
	          mode = _props.mode,
	          editTarget = _props.editTarget,
	          editStartPos = _props.editStartPos,
	          editCurrentPos = _props.editCurrentPos,
	          hoverTarget = _props.hoverTarget;
	
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'thumbnail-viewer',
	          ref: function ref(div) {
	            _this2.root = div;
	          },
	          onTouchMove: function onTouchMove(e) {
	            _this2.thumbnailMouseMoveHandler(e, opts.thumbnailWidth, opts.thumbnailHeight);
	          },
	          onMouseMove: function onMouseMove(e) {
	            _this2.thumbnailMouseMoveHandler(e, opts.thumbnailWidth, opts.thumbnailHeight);
	          },
	          onTouchEnd: this.thumbnailMouseUpHandler,
	          onMouseUp: this.thumbnailMouseUpHandler
	        },
	        function () {
	          var thumbnailElms = thumbnailOrder.map(function (id, i) {
	            var entity = thumbnailEntities[id];
	            var editingClasses = [];
	            var editingStyle = {};
	
	            if (mode === CONSTANTS.EDIT_MODE) {
	              editingClasses.push('is-editing');
	
	              if (id === editTarget) {
	                editingClasses.push('drag-target');
	                (0, _assign2.default)(editingStyle, {
	                  position: 'absolute',
	                  zIndex: '99',
	                  left: thumbnailLayouts[i].left + editCurrentPos.x - editStartPos.x,
	                  top: thumbnailLayouts[i].top + editCurrentPos.y - editStartPos.y
	                });
	              }
	            }
	
	            return _react2.default.createElement(
	              'div',
	              { className: 'thumbnail ' + editingClasses.join(' '), key: id,
	                style: (0, _assign2.default)({
	                  width: opts.thumbnailWidth, height: opts.thumbnailHeight
	                }, editingStyle),
	                ref: function ref(div) {
	                  if (div) {
	                    _this2.thumbnails.push(div);
	                  }
	                },
	                onTouchStart: function onTouchStart(e) {
	                  _this2.thumbnailMouseDownHandler(e, id);
	                },
	                onMouseDown: function onMouseDown(e) {
	                  _this2.thumbnailMouseDownHandler(e, id);
	                }
	              },
	              _react2.default.createElement(
	                'div',
	                { className: 'img-wrap', style: { width: opts.thumbnailWidth, height: opts.thumbnailHeight } },
	                _react2.default.createElement(ThumbnailContent, { status: entity.status, url: entity.url, errMsg: entity.errMsg })
	              ),
	              _react2.default.createElement('i', { className: 'fa fa-times delete',
	                onTouchStart: function onTouchStart(e) {
	                  e.stopPropagation();
	                },
	                onMouseDown: function onMouseDown(e) {
	                  e.stopPropagation();
	                },
	                onClick: function onClick(e) {
	                  e.stopPropagation();
	                  var onFileDelete = _this2.props.onFileDelete;
	
	                  onFileDelete({
	                    entityID: id,
	                    onDelete: opts.onDelete
	                  });
	                }
	              })
	            );
	          });
	
	          if (mode === CONSTANTS.EDIT_MODE && hoverTarget) {
	            var placeholderElm = _react2.default.createElement('div', { className: 'placeholder', key: 'placeholder', style: { width: opts.thumbnailWidth, height: opts.thumbnailHeight } });
	            var placeholderIdx = thumbnailOrder.indexOf(hoverTarget);
	            var editIdx = thumbnailOrder.indexOf(editTarget);
	
	            if (editIdx > placeholderIdx) {
	              return [].concat((0, _toConsumableArray3.default)(thumbnailElms.slice(0, placeholderIdx)), [placeholderElm], (0, _toConsumableArray3.default)(thumbnailElms.slice(placeholderIdx)));
	            } else {
	              return [].concat((0, _toConsumableArray3.default)(thumbnailElms.slice(0, placeholderIdx + 1)), [placeholderElm], (0, _toConsumableArray3.default)(thumbnailElms.slice(placeholderIdx + 1)));
	            }
	          } else {
	            return thumbnailElms;
	          }
	        }()
	      );
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.preRenderHandler();
	    }
	  }, {
	    key: 'componentWillUpdate',
	    value: function componentWillUpdate() {
	      this.preRenderHandler();
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.postRenderHandler();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.postRenderHandler();
	    }
	  }, {
	    key: 'preRenderHandler',
	    value: function preRenderHandler() {
	      this.thumbnails = [];
	    }
	  }, {
	    key: 'postRenderHandler',
	    value: function postRenderHandler() {
	      var _props2 = this.props,
	          onLayoutUpdate = _props2.onLayoutUpdate,
	          thumbnailLayouts = _props2.thumbnailLayouts;
	
	
	      if (thumbnailLayouts.length !== this.thumbnails.length) {
	        onLayoutUpdate(this.thumbnails.map(function (thumbnail) {
	          return {
	            left: thumbnail.offsetLeft,
	            top: thumbnail.offsetTop
	          };
	        }));
	      }
	    }
	  }, {
	    key: 'thumbnailMouseDownHandler',
	    value: function thumbnailMouseDownHandler(e, entityID) {
	      var onReorderStart = this.props.onReorderStart;
	
	
	      e.preventDefault();
	
	      var touchList = e.targetTouches;
	      var pageX = touchList ? touchList[0].pageX : e.pageX;
	      var pageY = touchList ? touchList[0].pageY : e.pageY;
	      var rootPageX = this.root.getBoundingClientRect().left + window.pageXOffset;
	      var rootPageY = this.root.getBoundingClientRect().top + window.pageYOffset;
	
	      onReorderStart({
	        entityID: entityID,
	        cursorX: pageX - rootPageX,
	        cursorY: pageY - rootPageY
	      });
	    }
	  }, {
	    key: 'thumbnailMouseMoveHandler',
	    value: function thumbnailMouseMoveHandler(e, thumbnailWidth, thumbnailHeight) {
	      e.preventDefault();
	
	      var onReordering = this.props.onReordering;
	
	      var touchList = e.targetTouches;
	      var pageX = touchList ? touchList[0].pageX : e.pageX;
	      var pageY = touchList ? touchList[0].pageY : e.pageY;
	      var rootPageX = this.root.getBoundingClientRect().left + window.pageXOffset;
	      var rootPageY = this.root.getBoundingClientRect().top + window.pageYOffset;
	
	      onReordering({
	        cursorX: pageX - rootPageX,
	        cursorY: pageY - rootPageY,
	        thumbnailWidth: thumbnailWidth,
	        thumbnailHeight: thumbnailHeight
	      });
	    }
	  }, {
	    key: 'thumbnailMouseUpHandler',
	    value: function thumbnailMouseUpHandler() {
	      var onReorderEnd = this.props.onReorderEnd;
	
	      onReorderEnd();
	    }
	  }]);
	  return ThumbnailViewer;
	}(_react2.default.PureComponent);
	
	exports.default = ThumbnailViewer;
	
	
	ThumbnailViewer.propTypes = {
	  opts: _react2.default.PropTypes.object.isRequired /* see App.js */
	  , thumbnailOrder: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number).isRequired,
	  thumbnailEntities: _react2.default.PropTypes.shape({
	    status: _react2.default.PropTypes.oneOf([CONSTANTS.FILE_STATUS_LOADING, CONSTANTS.FILE_STATUS_COMPLETE, CONSTANTS.FILE_STATUS_ERROR]).isRequired,
	
	    url: _react2.default.PropTypes.string,
	    errMsg: _react2.default.PropTypes.string
	  }).isRequired,
	
	  thumbnailLayouts: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
	    left: _react2.default.PropTypes.number.isRequired,
	    top: _react2.default.PropTypes.number.isRequired
	  })).isRequired,
	
	  mode: _react2.default.PropTypes.oneOf([CONSTANTS.EDIT_MODE, CONSTANTS.DISPLAY_MODE]).isRequired,
	
	  editTarget: _react2.default.PropTypes.number,
	  editStartPos: _react2.default.PropTypes.shape({
	    x: _react2.default.PropTypes.number.isRequired,
	    y: _react2.default.PropTypes.number.isRequired
	  }).isRequired,
	
	  editCurrentPos: _react2.default.PropTypes.shape({
	    x: _react2.default.PropTypes.number.isRequired,
	    y: _react2.default.PropTypes.number.isRequired
	  }).isRequired,
	
	  hoverTarget: _react2.default.PropTypes.number,
	  onLayoutUpdate: _react2.default.PropTypes.func.isRequired,
	  onReorderStart: _react2.default.PropTypes.func.isRequired,
	  onReordering: _react2.default.PropTypes.func.isRequired,
	  onReorderEnd: _react2.default.PropTypes.func.isRequired,
	  onFileDelete: _react2.default.PropTypes.func.isRequired
	};

/***/ },
/* 165 */
/*!******************************************************!*\
  !*** ./~/babel-runtime/helpers/toConsumableArray.js ***!
  \******************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _from = __webpack_require__(/*! ../core-js/array/from */ 166);
	
	var _from2 = _interopRequireDefault(_from);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }
	
	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
	};

/***/ },
/* 166 */
/*!***********************************************!*\
  !*** ./~/babel-runtime/core-js/array/from.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(/*! core-js/library/fn/array/from */ 167), __esModule: true };

/***/ },
/* 167 */
/*!************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/fn/array/from.js ***!
  \************************************************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../../modules/es6.string.iterator */ 106);
	__webpack_require__(/*! ../../modules/es6.array.from */ 168);
	module.exports = __webpack_require__(/*! ../../modules/_core */ 7).Array.from;

/***/ },
/* 168 */
/*!*********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/es6.array.from.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(/*! ./_ctx */ 8)
	  , $export        = __webpack_require__(/*! ./_export */ 5)
	  , toObject       = __webpack_require__(/*! ./_to-object */ 38)
	  , call           = __webpack_require__(/*! ./_iter-call */ 169)
	  , isArrayIter    = __webpack_require__(/*! ./_is-array-iter */ 170)
	  , toLength       = __webpack_require__(/*! ./_to-length */ 29)
	  , createProperty = __webpack_require__(/*! ./_create-property */ 171)
	  , getIterFn      = __webpack_require__(/*! ./core.get-iterator-method */ 109);
	
	$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ 172)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 169 */
/*!*****************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iter-call.js ***!
  \*****************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(/*! ./_an-object */ 12);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 170 */
/*!*********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_is-array-iter.js ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(/*! ./_iterators */ 95)
	  , ITERATOR   = __webpack_require__(/*! ./_wks */ 104)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 171 */
/*!***********************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_create-property.js ***!
  \***********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(/*! ./_object-dp */ 11)
	  , createDesc      = __webpack_require__(/*! ./_property-desc */ 19);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 172 */
/*!*******************************************************************!*\
  !*** ./~/babel-runtime/~/core-js/library/modules/_iter-detect.js ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(/*! ./_wks */ 104)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 173 */
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isCollided = isCollided;
	/* main utility functions */
	
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
/* 174 */
/*!********************************************!*\
  !*** ./src/components/GalleryContainer.js ***!
  \********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign = __webpack_require__(/*! babel-runtime/core-js/object/assign */ 2);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _reactRedux = __webpack_require__(/*! react-redux */ 41);
	
	var _Gallery = __webpack_require__(/*! ./src/components/Gallery */ 175);
	
	var _Gallery2 = _interopRequireDefault(_Gallery);
	
	var _actions = __webpack_require__(/*! ./src/actions */ 111);
	
	var actions = _interopRequireWildcard(_actions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function mapStateToProps(state) {
	  return {
	    categoryOpts: state.galleryFilterDepot.categoryList,
	    currentCategory: state.galleryFilterDepot.category,
	    currentPage: state.galleryFilterDepot.page,
	    items: state.galleryImageDepot.list,
	    selection: state.gallerySelectionDepot.list,
	    fileCount: state.fileDepot.order.length,
	    isFetching: state.galleryImageDepot.isFetching,
	    isOpened: state.galleryStatusDepot.isOpened,
	    _gallerySelection: state.gallerySelectionDepot.list,
	    _fileDepotRunningID: state.fileDepot.runningID
	  };
	}
	
	function mapDispatchToProps(dispatch) {
	  return {
	    dispatch: dispatch,
	    onToggle: function onToggle() {
	      dispatch(actions.toggleGallery());
	    },
	    onImageFetch: function onImageFetch(_ref) {
	      var categoryVal = _ref.categoryVal,
	          page = _ref.page,
	          onFetchGallery = _ref.onFetchGallery;
	
	      dispatch(actions.fetchGalleryImage(categoryVal, page, onFetchGallery));
	    },
	    onFilterChange: function onFilterChange(_ref2) {
	      var category = _ref2.category,
	          page = _ref2.page;
	
	      dispatch(actions.changeGalleryFilter(category, page));
	    },
	    onSelectionChange: function onSelectionChange(newSelection) {
	      dispatch(actions.changeGallerySelection(newSelection));
	    }
	  };
	}
	
	function mergeProps(stateProps, dispatchProps, ownProps) {
	  var _gallerySelection = stateProps._gallerySelection,
	      _fileDepotRunningID = stateProps._fileDepotRunningID,
	      items = stateProps.items;
	  var dispatch = dispatchProps.dispatch;
	
	
	  return (0, _assign2.default)({}, stateProps, dispatchProps, ownProps, {
	    onUpload: function onUpload(_ref3) {
	      var limit = _ref3.limit,
	          onUploadFromGallery = _ref3.onUploadFromGallery;
	
	      var selection = _gallerySelection;
	      if (selection.length) {
	        dispatch(actions.uploadFromGalleryStart({
	          uploadFiles: selection.map(function (i) {
	            return {
	              url: items[i].url,
	              userDefinedData: items[i].userDefinedData
	            };
	          }),
	
	          runningID: _fileDepotRunningID,
	          limit: limit,
	          onUploadFromGallery: onUploadFromGallery
	        }));
	      }
	    }
	  });
	}
	
	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeProps)(_Gallery2.default);

/***/ },
/* 175 */
/*!***********************************!*\
  !*** ./src/components/Gallery.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _toConsumableArray2 = __webpack_require__(/*! babel-runtime/helpers/toConsumableArray */ 165);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	exports.default = Gallery;
	
	var _react = __webpack_require__(/*! react */ 40);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function Gallery(_ref) {
	  var categoryOpts = _ref.categoryOpts,
	      currentCategory = _ref.currentCategory,
	      currentPage = _ref.currentPage,
	      items = _ref.items,
	      selection = _ref.selection,
	      fileCount = _ref.fileCount,
	      opts = _ref.opts,
	      isOpened = _ref.isOpened,
	      isFetching = _ref.isFetching,
	      onToggle = _ref.onToggle,
	      onFilterChange = _ref.onFilterChange,
	      onImageFetch = _ref.onImageFetch,
	      onSelectionChange = _ref.onSelectionChange,
	      onUpload = _ref.onUpload;
	
	  var selectionLimit = opts.limit - fileCount;
	  return _react2.default.createElement(
	    'div',
	    { className: 'gallery ' + (isOpened ? 'is-opened' : '') },
	    _react2.default.createElement('div', { className: 'overlay', onClick: onToggle }),
	    _react2.default.createElement(
	      'div',
	      { className: 'dialog' },
	      _react2.default.createElement(
	        'div',
	        { className: 'title' },
	        _react2.default.createElement(
	          'div',
	          { className: 'title-text' },
	          '\u9732\u5929\u5716\u5EAB'
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'limit-hint' },
	          ' - \u5C1A\u53EF\u9078\u64C7 ' + (selectionLimit - selection.length)
	        )
	      ),
	      _react2.default.createElement(
	        'div',
	        { className: 'content' },
	        _react2.default.createElement(
	          'div',
	          { className: 'wrap' },
	          _react2.default.createElement(
	            'div',
	            { className: 'tool-bar' },
	            _react2.default.createElement(
	              'select',
	              { name: '', value: currentCategory, disabled: isFetching,
	                onChange: function onChange(e) {
	                  var currentTarget = e.currentTarget;
	                  var newCategory = Number(currentTarget.value);
	                  onFilterChange({
	                    category: newCategory,
	                    page: 1
	                  });
	
	                  onImageFetch({
	                    categoryVal: categoryOpts[newCategory].val,
	                    page: 1,
	                    onFetchGallery: opts.onFetchGallery
	                  });
	                }
	              },
	              categoryOpts.map(function (category, i) {
	                return _react2.default.createElement(
	                  'option',
	                  { value: i, key: i },
	                  category.text
	                );
	              })
	            ),
	            _react2.default.createElement(
	              'select',
	              { name: '', value: currentPage, disabled: isFetching,
	                onChange: function onChange(e) {
	                  var currentTarget = e.currentTarget;
	                  var newPage = Number(currentTarget.value);
	                  onFilterChange({
	                    category: currentCategory,
	                    page: newPage
	                  });
	
	                  onImageFetch({
	                    categoryVal: categoryOpts[currentCategory],
	                    page: newPage,
	                    onFetchGallery: opts.onFetchGallery
	                  });
	                }
	              },
	              [].concat((0, _toConsumableArray3.default)(Array(categoryOpts[currentCategory].totalPages).keys())).map(function (n) {
	                return _react2.default.createElement(
	                  'option',
	                  { value: n + 1, key: n },
	                  n + 1
	                );
	              })
	            )
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'list-view' },
	            function () {
	              if (isFetching) {
	                return _react2.default.createElement('i', { className: 'fa fa-circle-o-notch fa-spin fa-2x fa-fw loading-ring' });
	              } else {
	                return items.map(function (item, i) {
	                  var idxInSelection = selection.indexOf(i);
	                  var selectedClass = idxInSelection === -1 ? '' : 'is-selected';
	                  return _react2.default.createElement(
	                    'div',
	                    { className: 'list-item ' + selectedClass, key: i,
	                      onClick: function onClick() {
	                        var newSelection = selection.slice(0);
	                        if (idxInSelection === -1) {
	                          newSelection.push(i);
	                          if (newSelection.length > selectionLimit) {
	                            newSelection = newSelection.slice(newSelection.length - opts.limit);
	                          }
	                        } else {
	                          newSelection.splice(idxInSelection, 1);
	                        }
	
	                        onSelectionChange(newSelection);
	                      }
	                    },
	                    _react2.default.createElement('img', { src: item.url, width: opts.thumbnailWidth, height: opts.thumbnailHeight, alt: '' })
	                  );
	                });
	              }
	            }()
	          ),
	          _react2.default.createElement(
	            'div',
	            { className: 'btn-bar' },
	            _react2.default.createElement(
	              'button',
	              { className: 'rt-button rt-button-mini rt-button-submit', type: 'button',
	                onClick: function onClick() {
	                  onUpload({
	                    limit: opts.limit,
	                    onUploadFromGallery: opts.onUploadFromGallery
	                  });
	
	                  onToggle();
	                }
	              },
	              '\u78BA\u5B9A\u65B0\u589E'
	            ),
	            _react2.default.createElement(
	              'a',
	              { href: '#', onClick: onToggle },
	              '\u53D6\u6D88'
	            )
	          )
	        )
	      )
	    )
	  );
	} /* component - Gallery */
	
	
	Gallery.propTypes = {
	  categoryOpts: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
	    text: _react2.default.PropTypes.string.isRequired,
	    val: _react2.default.PropTypes.string.isRequired,
	    totalPages: _react2.default.PropTypes.number.isRequired
	  })).isRequired,
	
	  currentCategory: _react2.default.PropTypes.number.isRequired,
	  currentPage: _react2.default.PropTypes.number.isRequired,
	  items: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
	    url: _react2.default.PropTypes.string.isRequired
	  })).isRequired,
	
	  selection: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number).isRequired,
	  fileCount: _react2.default.PropTypes.number.isRequired,
	  opts: _react2.default.PropTypes.object.isRequired /* see App.js */
	  , isOpened: _react2.default.PropTypes.bool.isRequired,
	  isFetching: _react2.default.PropTypes.bool.isRequired,
	  onToggle: _react2.default.PropTypes.func.isRequired,
	  onFilterChange: _react2.default.PropTypes.func.isRequired,
	  onImageFetch: _react2.default.PropTypes.func.isRequired,
	  onSelectionChange: _react2.default.PropTypes.func.isRequired,
	  onUpload: _react2.default.PropTypes.func.isRequired
	};

/***/ },
/* 176 */
/*!********************************!*\
  !*** ./~/redux-watch/index.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict'
	var getValue = __webpack_require__(/*! object-path */ 177).get
	
	function defaultCompare (a, b) {
	  return a === b
	}
	
	function watch (getState, objectPath, compare) {
	  compare = compare || defaultCompare
	  var currentValue = getValue(getState(), objectPath)
	  return function w (fn) {
	    return function () {
	      var newValue = getValue(getState(), objectPath)
	      if (!compare(currentValue, newValue)) {
	        var oldValue = currentValue
	        currentValue = newValue
	        fn(newValue, oldValue, objectPath)
	      }
	    }
	  }
	}
	
	module.exports = watch


/***/ },
/* 177 */
/*!**********************************************!*\
  !*** ./~/redux-watch/~/object-path/index.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory){
	  'use strict';
	
	  /*istanbul ignore next:cant test*/
	  if (typeof module === 'object' && typeof module.exports === 'object') {
	    module.exports = factory();
	  } else if (true) {
	    // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    // Browser globals
	    root.objectPath = factory();
	  }
	})(this, function(){
	  'use strict';
	
	  var
	    toStr = Object.prototype.toString,
	    _hasOwnProperty = Object.prototype.hasOwnProperty;
	
	  function isEmpty(value){
	    if (!value) {
	      return true;
	    }
	    if (isArray(value) && value.length === 0) {
	        return true;
	    } else if (!isString(value)) {
	        for (var i in value) {
	            if (_hasOwnProperty.call(value, i)) {
	                return false;
	            }
	        }
	        return true;
	    }
	    return false;
	  }
	
	  function toString(type){
	    return toStr.call(type);
	  }
	
	  function isNumber(value){
	    return typeof value === 'number' || toString(value) === "[object Number]";
	  }
	
	  function isString(obj){
	    return typeof obj === 'string' || toString(obj) === "[object String]";
	  }
	
	  function isObject(obj){
	    return typeof obj === 'object' && toString(obj) === "[object Object]";
	  }
	
	  function isArray(obj){
	    return typeof obj === 'object' && typeof obj.length === 'number' && toString(obj) === '[object Array]';
	  }
	
	  function isBoolean(obj){
	    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
	  }
	
	  function getKey(key){
	    var intKey = parseInt(key);
	    if (intKey.toString() === key) {
	      return intKey;
	    }
	    return key;
	  }
	
	  function set(obj, path, value, doNotReplace){
	    if (isNumber(path)) {
	      path = [path];
	    }
	    if (isEmpty(path)) {
	      return obj;
	    }
	    if (isString(path)) {
	      return set(obj, path.split('.').map(getKey), value, doNotReplace);
	    }
	    var currentPath = path[0];
	
	    if (path.length === 1) {
	      var oldVal = obj[currentPath];
	      if (oldVal === void 0 || !doNotReplace) {
	        obj[currentPath] = value;
	      }
	      return oldVal;
	    }
	
	    if (obj[currentPath] === void 0) {
	      //check if we assume an array
	      if(isNumber(path[1])) {
	        obj[currentPath] = [];
	      } else {
	        obj[currentPath] = {};
	      }
	    }
	
	    return set(obj[currentPath], path.slice(1), value, doNotReplace);
	  }
	
	  function del(obj, path) {
	    if (isNumber(path)) {
	      path = [path];
	    }
	
	    if (isEmpty(obj)) {
	      return void 0;
	    }
	
	    if (isEmpty(path)) {
	      return obj;
	    }
	    if(isString(path)) {
	      return del(obj, path.split('.'));
	    }
	
	    var currentPath = getKey(path[0]);
	    var oldVal = obj[currentPath];
	
	    if(path.length === 1) {
	      if (oldVal !== void 0) {
	        if (isArray(obj)) {
	          obj.splice(currentPath, 1);
	        } else {
	          delete obj[currentPath];
	        }
	      }
	    } else {
	      if (obj[currentPath] !== void 0) {
	        return del(obj[currentPath], path.slice(1));
	      }
	    }
	
	    return obj;
	  }
	
	  var objectPath = function(obj) {
	    return Object.keys(objectPath).reduce(function(proxy, prop) {
	      if (typeof objectPath[prop] === 'function') {
	        proxy[prop] = objectPath[prop].bind(objectPath, obj);
	      }
	
	      return proxy;
	    }, {});
	  };
	
	  objectPath.has = function (obj, path) {
	    if (isEmpty(obj)) {
	      return false;
	    }
	
	    if (isNumber(path)) {
	      path = [path];
	    } else if (isString(path)) {
	      path = path.split('.');
	    }
	
	    if (isEmpty(path) || path.length === 0) {
	      return false;
	    }
	
	    for (var i = 0; i < path.length; i++) {
	      var j = path[i];
	      if ((isObject(obj) || isArray(obj)) && _hasOwnProperty.call(obj, j)) {
	        obj = obj[j];
	      } else {
	        return false;
	      }
	    }
	
	    return true;
	  };
	
	  objectPath.ensureExists = function (obj, path, value){
	    return set(obj, path, value, true);
	  };
	
	  objectPath.set = function (obj, path, value, doNotReplace){
	    return set(obj, path, value, doNotReplace);
	  };
	
	  objectPath.insert = function (obj, path, value, at){
	    var arr = objectPath.get(obj, path);
	    at = ~~at;
	    if (!isArray(arr)) {
	      arr = [];
	      objectPath.set(obj, path, arr);
	    }
	    arr.splice(at, 0, value);
	  };
	
	  objectPath.empty = function(obj, path) {
	    if (isEmpty(path)) {
	      return obj;
	    }
	    if (isEmpty(obj)) {
	      return void 0;
	    }
	
	    var value, i;
	    if (!(value = objectPath.get(obj, path))) {
	      return obj;
	    }
	
	    if (isString(value)) {
	      return objectPath.set(obj, path, '');
	    } else if (isBoolean(value)) {
	      return objectPath.set(obj, path, false);
	    } else if (isNumber(value)) {
	      return objectPath.set(obj, path, 0);
	    } else if (isArray(value)) {
	      value.length = 0;
	    } else if (isObject(value)) {
	      for (i in value) {
	        if (_hasOwnProperty.call(value, i)) {
	          delete value[i];
	        }
	      }
	    } else {
	      return objectPath.set(obj, path, null);
	    }
	  };
	
	  objectPath.push = function (obj, path /*, values */){
	    var arr = objectPath.get(obj, path);
	    if (!isArray(arr)) {
	      arr = [];
	      objectPath.set(obj, path, arr);
	    }
	
	    arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
	  };
	
	  objectPath.coalesce = function (obj, paths, defaultValue) {
	    var value;
	
	    for (var i = 0, len = paths.length; i < len; i++) {
	      if ((value = objectPath.get(obj, paths[i])) !== void 0) {
	        return value;
	      }
	    }
	
	    return defaultValue;
	  };
	
	  objectPath.get = function (obj, path, defaultValue){
	    if (isNumber(path)) {
	      path = [path];
	    }
	    if (isEmpty(path)) {
	      return obj;
	    }
	    if (isEmpty(obj)) {
	      return defaultValue;
	    }
	    if (isString(path)) {
	      return objectPath.get(obj, path.split('.'), defaultValue);
	    }
	
	    var currentPath = getKey(path[0]);
	
	    if (path.length === 1) {
	      if (obj[currentPath] === void 0) {
	        return defaultValue;
	      }
	      return obj[currentPath];
	    }
	
	    return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
	  };
	
	  objectPath.del = function(obj, path) {
	    return del(obj, path);
	  };
	
	  return objectPath;
	});


/***/ }
/******/ ]);
//# sourceMappingURL=rt_file_uploader.js.map