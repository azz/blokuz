import { Game } from 'boardgame.io/core';
import { fillCells } from './logic';

const GAME_SIZE = 20;

export default Game({
  name: 'Let me in!',

  minPlayers: 4,
  maxPlayers: 4,

  setup: () => {
    const state = {
      gameSize: GAME_SIZE,
      cells: Array(GAME_SIZE * GAME_SIZE).fill(null),
      tilesUsed: {},
    };
    for (let i = 0; i < 4; i++) {
      state.tilesUsed[i] = [];
    }

    return state;
  },

  moves: {
    place(G, ctx, { cell, tile }) {
      fillCells(G, ctx, { cell, tile });
      G.tilesUsed[ctx.currentPlayer].push(tile.name);
    },
  },
});
