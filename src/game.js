import { fillCells, consumeTile, isGameOver } from './logic';
import setup from './setup';
import ai from './ai';

const makeGame = playerCount => ({
  name: `${playerCount}-player`,

  minPlayers: playerCount,
  maxPlayers: playerCount,

  ai,

  setup,

  moves: {
    place(G, ctx, { cell, tile }) {
      fillCells(G, ctx, { cell, tile });
      consumeTile(G, ctx, { tile });
    },
  },

  flow: {
    movesPerTurn: 1,
    endGameIf: isGameOver,
  },
});

export const twoPlayer = makeGame(2);
export const fourPlayer = makeGame(4);
