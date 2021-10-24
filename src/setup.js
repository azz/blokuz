const GAME_SIZE = 20;
// const GAME_SIZE = 7;

export default function setup() {
  const state = {
    gameSize: GAME_SIZE,
    cells: Array(GAME_SIZE * GAME_SIZE).fill(null),
    tilesUsed: {},
  };

  for (let i = 0; i < 4; i++) {
    state.tilesUsed[i] = [];
  }

  return state;
}
