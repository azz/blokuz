import setup from '../setup';

test('creates cells', () => {
  const G = setup();
  expect(G.cells).toHaveLength(20 * 20);
  expect(G.cells.filter(x => x !== null)).toHaveLength(0);
});

test('creates tiles used', () => {
  const G = setup();
  expect(G.tilesUsed).toEqual({
    0: [],
    1: [],
    2: [],
    3: [],
  });
});
