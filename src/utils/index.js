/* main utility functions */

export function isCollided({ left, top, width, height }, { x, y }) {
  const boundaryLeft = left;
  const boundaryRight = left + width;
  const boundaryTop = top;
  const boundaryBottom = top + height;

  if (x > boundaryLeft && x < boundaryRight && y > boundaryTop && y < boundaryBottom) {
    return true;
  } else {
    return false;
  }
}
