import { Game } from 'boardgame.io/core';

export default Game({
  setup: () => ({ cells: Array(20 * 20).fill(null) }),

  moves: {
    clickCell(G, ctx, id) {
      G.cells[id] = ctx.currentPlayer;
    },
  },
});
