import SHAPES from './shapes';

export function isValidMove(G, ctx, { cell, tile }) {
  return (
    isOnBoard(G, ctx, { cell, tile }) &&
    spacesAvailable(G, ctx, { cell, tile }) &&
    noAdjacentOwn(G, ctx, { cell, tile }) &&
    isConnected(G, ctx, { cell, tile })
  );
}

function isOnBoard(G, ctx, { cell, tile }) {
  return (
    Math.floor(cell / G.gameSize) + tile.pattern.length <= G.gameSize &&
    (cell % G.gameSize) + tile.pattern[0].length <= G.gameSize
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
        String(ctx.turn % 4)
      ) {
        isValid = false;
        break;
      }
    }
  });
  return isValid;
}

function isConnected(G, ctx, { cell, tile }) {
  // first turn, must place in your corner.
  if (ctx.turn <= 4) {
    let target;
    switch (ctx.turn) {
      case 1:
        target = 0; // top-left (red)
        break;
      case 2:
        target = G.gameSize - 1; // top-right (orange)
        break;
      case 3:
        target = G.gameSize ** 2 - 1; // bottom-right (green)
        break;
      case 4:
        target = G.gameSize ** 2 - G.gameSize; // bottom-left (blue)
        break;
      /* istanbul ignore next */
      default:
        return false;
    }
    return hasIntersection(G, ctx, { cell, tile, target });
  }

  let isValid = false;
  iteratePattern(tile, (x, y) => {
    for (const neighbour of adjacentNeighbours) {
      if (
        ((cell + x) % G.gameSize === G.gameSize - 1 && neighbour.dx < 0) ||
        ((cell + x) % G.gameSize === 0 && neighbour.dx > 0)
      ) {
        break;
      }
      if (
        G.cells[cell + toAbsolute(G, x + neighbour.dx, y + neighbour.dy)] ===
        String(ctx.turn % 4)
      ) {
        isValid = true;
        break;
      }
    }
  });
  return isValid;
}

export function fillCells(G, ctx, { cell, tile }) {
  iteratePattern(tile, (x, y) => {
    G.cells[cell + toAbsolute(G, x, y)] = String(ctx.turn % 4);
  });
}

export function consumeTile(G, ctx, { tile }) {
  G.tilesUsed[ctx.turn % 4].push(tile.name);
}

function hasIntersection(G, ctx, { cell, tile, target }) {
  let intersects = false;
  iteratePattern(tile, (x, y) => {
    if (cell + toAbsolute(G, x, y) === target) {
      intersects = true;
    }
  });
  return intersects;
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

export function transform(pattern, { isFlippedX, isFlippedY, orientation }) {
  let result = pattern.map(p => p.split(''));

  const transpose = (col, i) =>
    result.map(row => row[row.length - i - 1]).reverse();

  for (let i = 0; i < orientation; i++) {
    result = result[0].map(transpose).reverse();
  }
  if (isFlippedX) {
    result = result.map(row => row.reverse());
  }
  if (isFlippedY) {
    result.reverse();
  }

  return result.map(line => line.join(''));
}

export function getPossibleMoves(G, ctx) {
  const moves = [];

  const availableShapes = Object.entries(SHAPES).filter(
    ([key]) => !G.tilesUsed[ctx.turn % 4].includes(key)
  );

  for (let cell = 0; cell < G.cells.length; cell++) {
    if (G.cells[cell]) continue;

    for (const [name, pattern] of availableShapes) {
      for (let orientation = 0; orientation < 4; orientation++) {
        for (const isFlippedX of [true, false]) {
          const tile = {
            name,
            pattern: transform(pattern, { isFlippedX, orientation }),
          };
          if (isValidMove(G, ctx, { cell, tile })) {
            moves.push({
              move: 'place',
              args: [{ cell, tile }],
            });
          }
        }
      }
    }
  }

  return moves;
}

export function isGameOver(G, ctx) {
  let moves = [];
  for (let i = 0; i < 4; i++) {
    moves.push(...getPossibleMoves(G, { ...ctx, turn: ctx.turn + i }));
  }

  if (moves.length === 0) {
    return getScores(G, ctx);
  }
}

function getScore(G, ctx, { player }) {
  const shapesRemaining = Object.entries(SHAPES).filter(
    ([key]) => !G.tilesUsed[player].includes(key)
  );
  const shapePoints = shapesRemaining.reduce(
    (total, [key, pattern]) =>
      total + pattern.join('').replace(/ /g, '').length,
    0
  );
  return shapePoints;
}

export function getScores(G, ctx) {
  const scores = [];

  for (let i = 0; i < ctx.numPlayers; i++) {
    const points = getScore(G, ctx, { player: i });
    scores.push({ player: i, points });
  }

  scores.sort((a, b) => a.points - b.points);

  return scores;
}
