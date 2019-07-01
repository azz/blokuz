import { twoPlayer, fourPlayer } from '../game';
import setup from '../setup';

test('2 player', () => {
  expect(twoPlayer.minPlayers).toEqual(2);
  expect(twoPlayer.maxPlayers).toEqual(2);
});

test('4 player', () => {
  expect(fourPlayer.minPlayers).toEqual(4);
  expect(fourPlayer.maxPlayers).toEqual(4);
});

describe('moves', () => {
  test('place tile', () => {
    const G = setup();
    twoPlayer.moves.place(
      G,
      { turn: 0 },
      { cell: 0, tile: { pattern: ['X'], name: 'DOT' } },
    );
    expect(G.cells[0]).toEqual('0');
    expect(G.tilesUsed['0']).toEqual(['DOT']);
  });
});
