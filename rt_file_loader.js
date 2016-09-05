window.RT = window.RT || {};

(function(NAMESPACE, IDENTIFIER, $) {
  /**
   * exported API
   * @param {$elm} $container
   * @param {Object} opts
   * @param {string} thumbnailWidth
   * @param {string} thumbnailHeight
   * @param {number} limit
   */
  NAMESPACE.fileLoader = function($container, opts) {
    var appendUIToContainer = curryIt(appendNode, $container);
    var execute = compose(appendUIToContainer, genUI, seasonOpts);
    execute(opts);
  };

/* constants */
  var FILE_DEPOT = 'FILE_DEPOT';
/**/

/* main functions */
  var seasonOpts = function(opts) {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return $.extend({}, opts, {
      uiType: checkEnv(userAgent)
    });
  };

  var genUI = function(opts) {
    /* create store with initial state */
    var initState = {};
    initState[FILE_DEPOT] = {
      entities: {},
      order: [],
      selections: []
    };

    var $store = createStore(initState);

    /* create file loader ui */
    var $root = $('<div />')
      .addClass(IDENTIFIER);

    var appendComponentToRoot = curryIt(appendNode, $root);

    var $toolBar = toolBar($store, opts);
    var $thumbnailViewer = thumbnailViewer($store, opts);

    appendComponentToRoot($toolBar);
    appendComponentToRoot($thumbnailViewer);

    return $root;
  };
/**/

/* components */
  /**
   * have to explicitly teach the components
   * which elements should update on certain part of store changes
   * since we don't have a good re-render machanism like react
   */
  var toolBar = function($store, opts) {
    var limit = opts.limit || 3;
    var getStoreFileDepot = curryIt(getStorePart, $store, FILE_DEPOT);
    var setStoreFileDepot = curryIt(setStorePart, $store, FILE_DEPOT);

   var render = function($root) {
      var $addLocalInput = $('<input type="file" accept="image/*;capture=camera"/>') // hack for ie8, since .attr('type', 'file') act oddly
        .addClass('add-local-input')
        .attr('multiple', '')
        .change(function(e) {
          var $this = $(this);
          var storeFileDepot = getStoreFileDepot();
          var oldFileEntities = storeFileDepot.entities;
          var oldFileOrder = storeFileDepot.order;
          var insertResult = insertFileListIntoFileEntities(oldFileEntities, oldFileOrder, $this[0].files, limit);

          setStoreFileDepot($.extend({}, storeFileDepot, {
            entities: insertResult.entities,
            order: insertResult.order,
            selections: []
          }));
       });

      var $addLocalFakeButton = $('<div />')
        .addClass('rt-button')
        .addClass('rt-button-mini')
        .addClass('rt-button-default')
        .text('從本機新增');

      var $addLocal = $('<label />')
        .append($addLocalInput)
        .append($addLocalFakeButton);

      var $addRuten = $('<button />')
        .addClass('rt-button')
        .addClass('rt-button-mini')
        .addClass('rt-button-default')
        .text('從露天圖庫新增');

      var $delete = $('<button />')
        .addClass('rt-button')
        .addClass('rt-button-mini')
        .addClass('rt-button-default')
        .text('刪除圖片');

      return $root
        .append($addLocal)
        .append($addRuten)
        .append($delete);
    };

    var $root = $('<div />')
      .addClass('tool-bar');

    return render($root);
  };

  var thumbnailViewer = function($store, opts) {
    var thumbnailWidth = opts.thumbnailWidth || 120;
    var thumbnailHeight = opts.thumbnailHeight || 90;

    var getStoreFileDepot = curryIt(getStorePart, $store, FILE_DEPOT);
    var onStoreFileDepotChange = curryIt(addStoreListener, $store, FILE_DEPOT);
    var genThumbnailImgCSS = curryIt(mapOrientationToCSS, thumbnailWidth, thumbnailHeight);

    var render = function($root) {
      var storeFileDepot = getStoreFileDepot();

      $root.empty();
      $.each(storeFileDepot.order, function(idx, entityID) {
        var file = storeFileDepot.entities[entityID];
        var reader = new FileReader();
        var $elm = $('<div />')
          .addClass('thumbnail')
          .css('width', thumbnailWidth)
          .css('height', thumbnailHeight);

        var $img = $('<div />')
          .addClass('img');

        var $delete = $('<i />')
          // .addClass('fa')
          // .addClass('fa-trash-o')
          .addClass('delete');

        $elm
          .append($img)
          .append($delete);

        reader.onloadend = function() {
          EXIF.getData(file, function() {
            var style = genThumbnailImgCSS(this.exifdata.Orientation);

            $img
              .css(style)
              .css('background-image', 'url(' + reader.result + ')');
          });
        };

        reader.readAsDataURL(file);
        $root.append($elm);
      });

      return $root;
    };

    var $root = $('<div />')
      .addClass('thumbnail-viewer');

    onStoreFileDepotChange(function() {
      render($root);
    });

    return render($root);
  };
/**/

/* store */
  var createStore = function(initState) {
    var $store = $('<div />');
    $store.state = {};

    for (key in initState) {
      $store.state[key] = initState[key];
    }

    return $store;
  };

  var getStorePart = function($store, partName) {
    return $store.state[partName];
  };

  var setStorePart = function($store, partName, data) {
    $store.state[partName] = data;
    $store.trigger(IDENTIFIER + partName);
  };

  var addStoreListener = function($store, partName, handler) {
    $store.on(IDENTIFIER + partName, handler);
  };
/**/

/* utility functions */
  var checkEnv = function(userAgent) {
    return '';
  };

  var appendNode = function($target, $source) {
    $target.append($source);
    return $target;
  };

  var transformPrefixer = function(op) {
    return {
      '-webkit-transform': op,
      '-moz-transform': op,
      '-ms-transform': op,
      '-o-transform': op,
      'transform': op
    };
  };

  var mapOrientationToCSS = function(width, height, orientation) {
    var adjustTop = (height - width) / 2;
    var adjustLeft = (width - height) / 2;
    var ret = {
      position: 'relative',
      width: width,
      height: height
    };

    switch (orientation) {
      case 2:
        // horizontal flip
        return $.extend({}, ret, transformPrefixer('scale3d(-1, 1, 1)'));
      break;
      case 3:
        // 180° rotate left
        return $.extend({}, ret, transformPrefixer('rotate(180deg)'));
      break;
      case 4:
        // vertical flip
        return $.extend({}, ret, transformPrefixer('scale3d(1, -1, 1)'));
      break;
      case 5:
        // vertical flip + 90 rotate right
        return $.extend({}, ret, {
          width: height,
          height: width,
          left: adjustLeft,
          top: adjustTop
        }, transformPrefixer('scale3d(1, -1, 1) rotate(90deg)'));
      break;
      case 6:
        // 90° rotate right
        return $.extend({}, ret, {
          width: height,
          height: width,
          left: adjustLeft,
          top: adjustTop
        }, transformPrefixer('rotate(90deg)'));
      break;
      case 7:
        // horizontal flip + 90 rotate right
        return $.extend({}, ret, {
          width: height,
          height: width,
          left: adjustLeft,
          top: adjustTop
        }, transformPrefixer('scale3d(-1, 1, 1) rotate(90deg)'));
      break;
      case 8:
        // 90° rotate left
        return $.extend({}, ret, {
          width: height,
          height: width,
          left: adjustLeft,
          top: adjustTop
        }, transformPrefixer('rotate(-90deg)'));
      break;
      default:
        return ret;
      break;
    }
  };

  var insertFileListIntoFileEntities = function(entities, entityOrder, fileList, limit) {
    var count = 0;
    var newEntities = {};
    var newEntityOrder = [];

    for (var i = 0; count < limit && i < fileList.length; i++) {
      newEntities[count] = fileList[i];
      newEntityOrder.push(count);
      count++;
    }

    for (var i = 0; count < limit && i < entityOrder.length; i++) {
      var idx = entityOrder[i];
      newEntities[count] = entities[idx];
      newEntityOrder.push(count);
      count++;
    }

    return {
      entities: newEntities,
      order: newEntityOrder
    };
  };
/**/

/* functional programming helpers */
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
/**/
}(RT, 'rt_file_loader', $));
