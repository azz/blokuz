import { Game } from 'boardgame.io/core';
import { fillCells, consumeTile, isGameOver } from './logic';
import setup from './setup';

const makeGame = players =>
  Game({
    name: `${players}-player`,

    minPlayers: players,
    maxPlayers: players,

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
