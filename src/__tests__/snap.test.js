import { snapToGrid } from '../snap';

test('snaps to grid', () => {
  expect(snapToGrid(1, 2)).toEqual([0, 0]);
  expect(snapToGrid(33, 10)).toEqual([26, 0]);
  expect(snapToGrid(33, 19)).toEqual([26, 26]);
});

test('snaps to grid, with scroll', () => {
  expect(snapToGrid(1, 2, true)).toEqual([0, 0]);
});
