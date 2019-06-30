const TILE_SIZE = 26;

export function snapToGrid(x, y, useScroll) {
  let snappedX = Math.round(x / TILE_SIZE) * TILE_SIZE;
  let snappedY = Math.round(y / TILE_SIZE) * TILE_SIZE;

  if (useScroll) {
    snappedX -= window.scrollX % TILE_SIZE;
    snappedY -= window.scrollY % TILE_SIZE;
  }

  return [snappedX, snappedY];
}
