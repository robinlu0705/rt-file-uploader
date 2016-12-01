/* main utility functions */

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
export function checkEnv(userAgent) {
  return '';
};

export function appendNode($target, $source) {
  $target.append($source);
  return $target;
};

export function isCollided(object, pos) {
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
