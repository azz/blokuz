const TILE_SIZE = 26;

export function snapToGrid(x, y) {
  const snappedX = Math.round(x / TILE_SIZE) * TILE_SIZE;
  const snappedY = Math.round(y / TILE_SIZE) * TILE_SIZE;
  return [snappedX, snappedY];
}
