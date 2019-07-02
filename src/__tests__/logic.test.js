import { isValidMove, fillCells, transform } from '../logic';
import setup from '../setup';

describe('isValidMove()', () => {
  describe('initial turn', () => {
    test('first player', () => {
      expect(
        isValidMove(
          setup(),
          { turn: 0 },
          { cell: 0, tile: { pattern: ['XXX'] } },
        ),
      ).toEqual(true);

      expect(
        isValidMove(
          setup(),
          { turn: 0 },
          { cell: 1, tile: { pattern: ['XXX'] } },
        ),
      ).toEqual(false);

      expect(
        isValidMove(
          setup(),
          { turn: 0 },
          { cell: 0, tile: { pattern: [' XX'] } },
        ),
      ).toEqual(false);
    });

    test('second player', () => {
      expect(
        isValidMove(
          setup(),
          { turn: 1 },
          { cell: 18, tile: { pattern: ['XX'] } },
        ),
      ).toEqual(true);

      expect(
        isValidMove(
          setup(),
          { turn: 1 },
          { cell: 18, tile: { pattern: ['X '] } },
        ),
      ).toEqual(false);
    });

    test('third player', () => {
      expect(
        isValidMove(
          setup(),
          { turn: 2 },
          { cell: 398, tile: { pattern: ['XX'] } },
        ),
      ).toEqual(true);

      expect(
        isValidMove(
          setup(),
          { turn: 2 },
          { cell: 391, tile: { pattern: ['X '] } },
        ),
      ).toEqual(false);
    });

    test('fourth player', () => {
      expect(
        isValidMove(
          setup(),
          { turn: 3 },
          { cell: 380, tile: { pattern: ['XX'] } },
        ),
      ).toEqual(true);

      expect(
        isValidMove(
          setup(),
          { turn: 3 },
          { cell: 380, tile: { pattern: [' X'] } },
        ),
      ).toEqual(false);
    });
  });

  describe('space availablity', () => {
    test('space available', () => {
      const G = setup();
      G.cells[0] = '0';
      expect(
        isValidMove(G, { turn: 4 }, { cell: 21, tile: { pattern: ['X'] } }),
      ).toEqual(true);
    });

    test('space occupied by self', () => {
      const G = setup();
      G.cells[0] = '0';
      G.cells[21] = '0';
      expect(
        isValidMove(G, { turn: 4 }, { cell: 21, tile: { pattern: ['X'] } }),
      ).toEqual(false);
    });

    test('space occupied by others', () => {
      const G = setup();
      G.cells[0] = '0';
      G.cells[21] = '1';
      expect(
        isValidMove(G, { turn: 4 }, { cell: 21, tile: { pattern: ['X'] } }),
      ).toEqual(false);
    });
  });

  describe('board confinement', () => {
    test('piece exceeds board righrwards', () => {
      expect(
        isValidMove(
          setup(),
          { turn: 1 },
          { cell: 19, tile: { pattern: ['XX'] } },
        ),
      ).toEqual(false);
    });

    test('piece exceeds board downwards', () => {
      expect(
        isValidMove(
          setup(),
          { turn: 2 },
          { cell: 399, tile: { pattern: ['XX'] } },
        ),
      ).toEqual(false);
    });
  });

  describe('adjacency to own piece', () => {
    test('touches lengthwise', () => {
      const G = setup();
      G.cells[0] = '0';
      expect(
        isValidMove(G, { turn: 4 }, { cell: 1, tile: { pattern: ['X', 'X'] } }),
      ).toEqual(false);
    });
  });

  describe('connectedness', () => {
    test('touches only diagonally', () => {
      const G = setup();
      G.cells[0] = '0';
      expect(
        isValidMove(
          G,
          { turn: 4 },
          { cell: 1, tile: { pattern: [' X', 'XX'] } },
        ),
      ).toEqual(true);
    });

    test("doesn't wrap to other side of board rightwards", () => {
      const G = setup();
      G.cells[0] = '0';
      G.cells[20] = '0';
      expect(
        isValidMove(G, { turn: 4 }, { cell: 39, tile: { pattern: ['X'] } }),
      ).toEqual(false);
    });

    test("doesn't wrap to other side of board leftwards", () => {
      const G = setup();
      G.cells[19] = '1';
      expect(
        isValidMove(G, { turn: 5 }, { cell: 0, tile: { pattern: ['X'] } }),
      ).toEqual(false);
    });
  });
});

describe('fillCells()', () => {
  test('assigns pattern to cells', () => {
    const G = setup();
    fillCells(G, { turn: 0 }, { cell: 0, tile: { pattern: ['XXX'] } });
    expect(G.cells.slice(0, 3)).toEqual(['0', '0', '0']);
    expect(G.cells.slice(3)).not.toContain('0');
  });

  test('uses turn to select determine player', () => {
    const G = setup();
    fillCells(G, { turn: 1 }, { cell: 0, tile: { pattern: ['XXX'] } });
    expect(G.cells.slice(0, 3)).toEqual(['1', '1', '1']);
    expect(G.cells.slice(3)).not.toContain('1');
    expect(G.cells.slice(3)).not.toContain('0');
  });
});

describe('transform()', () => {
  test('no rotation', () => {
    expect(transform(['X'], { orientation: 0 })).toEqual(['X']);
    expect(transform(['XXX'], { orientation: 0 })).toEqual(['XXX']);
  });

  test('rotation 90deg', () => {
    expect(transform(['X'], { orientation: 1 })).toEqual(['X']);
    expect(transform(['XXX'], { orientation: 1 })).toEqual(['X', 'X', 'X']);
    // prettier-ignore
    expect(
      transform(
        ['XXX',
         'X  '],
        { orientation: 1 }
      )
    ).toEqual([
      'XX',
      ' X',
      ' X',
    ]);
  });

  test('rotation 180deg', () => {
    expect(transform(['X'], { orientation: 2 })).toEqual(['X']);
    expect(transform(['XXX'], { orientation: 2 })).toEqual(['XXX']);
    // prettier-ignore
    expect(
      transform(
        ['XXX',
         'X  '],
        { orientation: 2 }
      )
    ).toEqual([
      '  X',
      'XXX',
    ]);
  });

  test('rotation 270deg', () => {
    expect(transform(['X'], { orientation: 3 })).toEqual(['X']);
    expect(transform(['XXX'], { orientation: 3 })).toEqual(['X', 'X', 'X']);
    // prettier-ignore
    expect(
      transform(
        ['XXX',
         'X  '],
        { orientation: 3 }
      )
    ).toEqual([
      'X ',
      'X ',
      'XX',
    ]);
  });

  test('flipped about x-axis', () => {
    expect(transform(['X'], { isFlippedX: true })).toEqual(['X']);
    expect(transform(['XXX'], { isFlippedX: true })).toEqual(['XXX']);
    // prettier-ignore
    expect(
      transform(
        ['XXX',
         'X  '],
        { isFlippedX: true }
      )
    ).toEqual([
      'XXX',
      '  X',
    ]);
  });

  test('flipped about y-axis', () => {
    expect(transform(['X'], { isFlippedY: true })).toEqual(['X']);
    expect(transform(['XXX'], { isFlippedY: true })).toEqual(['XXX']);
    // prettier-ignore
    expect(
      transform(
        ['XXX',
         'X  '],
        { isFlippedY: true }
      )
    ).toEqual([
      'X  ',
      'XXX',
    ]);
  });

  test('flipped about both axes', () => {
    const args = { isFlippedX: true, isFlippedY: true };
    expect(transform(['X'], args)).toEqual(['X']);
    expect(transform(['XXX'], args)).toEqual(['XXX']);
    // prettier-ignore
    expect(
      transform(
        ['XXX',
         'X  '],
        args
      )
    ).toEqual([
      '  X',
      'XXX',
    ]);
  });
});
