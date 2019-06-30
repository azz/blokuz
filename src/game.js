import { Game } from 'boardgame.io/core';
import { fillCells } from './logic';

const GAME_SIZE = 20;

const makeGame = players =>
  Game({
    name: `${players}-player`,

    minPlayers: players,
    maxPlayers: players,

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
        G.tilesUsed[ctx.turn % 4].push(tile.name);
      },
    },
  });

export const twoPlayer = makeGame(2);
export const fourPlayer = makeGame(4);
