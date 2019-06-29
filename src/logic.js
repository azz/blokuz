export function isValidMove(G, ctx, { cell, tile }) {
  return (
    spacesAvailable(G, ctx, { cell, tile }) &&
    noAdjacentOwn(G, ctx, { cell, tile }) &&
    isConnected(G, ctx, { cell, tile })
  );
}

function spacesAvailable(G, ctx, { cell, tile }) {
  let isValid = true;
  iteratePattern(tile, (x, y) => {
    if (G.cells[cell + toAbsolute(G, x, y)]) {
      isValid = false;
    }
  });
  return isValid;
}

const directNeighbours = [
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
];
const adjacentNeighbours = [
  { dx: -1, dy: -1 },
  { dx: -1, dy: 1 },
  { dx: 1, dy: -1 },
  { dx: 1, dy: 1 },
];

function toAbsolute(G, x, y) {
  return x * G.gameSize + y;
}

function noAdjacentOwn(G, ctx, { cell, tile }) {
  let isValid = true;
  iteratePattern(tile, (x, y) => {
    for (const neighbour of directNeighbours) {
      if (
        G.cells[cell + toAbsolute(G, x + neighbour.dx, y + neighbour.dy)] ===
        ctx.currentPlayer
      ) {
        isValid = false;
      }
    }
  });
  return isValid;
}

function isConnected(G, ctx, { cell, tile }) {
  // first turn, must place in your corner.
  if (!ctx.tilesUsed[ctx.currentPlayer].length) {
    // TODO:
  }

  let isValid = true;
  iteratePattern(tile, (x, y) => {
    for (const neighbour of adjacentNeighbours) {
      if (
        G.cells[cell + toAbsolute(G, x + neighbour.dx, y + neighbour.dy)] ===
        ctx.currentPlayer
      ) {
        isValid = false;
      }
    }
  });
  return isValid;
}

export function fillCells(G, ctx, { cell, tile }) {
  iteratePattern(tile, (x, y) => {
    G.cells[cell + toAbsolute(G, x, y)] = ctx.currentPlayer;
  });
}

function iteratePattern(tile, callback) {
  for (let i = 0; i < tile.pattern.length; i++) {
    for (let j = 0; j < tile.pattern[0].length; j++) {
      if (tile.pattern[i][j] === 'X') {
        callback(i, j);
      }
    }
  }
}
