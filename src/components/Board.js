import React, { memo } from 'react';
import { useDrop } from 'react-dnd';
import Cell from './Cell';
import { snapToGrid } from '../snap';
import colors from '../colors';
import { isValidMove } from '../logic';

function getCell(G, monitor) {
  const { x, y } = monitor.getSourceClientOffset();
  let left = Math.round(x);
  let top = Math.round(y);
  [left, top] = snapToGrid(left, top);
  left /= 26;
  top /= 26;

  return top * G.gameSize + left;
}

const Board = ({ G, ctx, moves, events }) => {
  const [, drop] = useDrop({
    accept: 'Tile',
    canDrop: (tile, monitor) => {
      const cell = getCell(G, monitor);
      return isValidMove(G, ctx, { cell, tile });
    },
    drop: (tile, monitor) => {
      const cell = getCell(G, monitor);
      moves.place({ cell, tile });
      events.endTurn();
    },
    // collect: monitor => ({
    //   canDrop: monitor.canDrop(),
    //   isOver: monitor.isOver(),
    // }),
  });

  const cells = Array(G.gameSize * G.gameSize)
    .fill(null)
    .map((cell, i) => <Cell key={i} color={colors[G.cells[i]]} />);

  return (
    <div
      ref={drop}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${G.gameSize}, 24px)`,
        gridTemplateRows: `repeat(${G.gameSize}, 24px)`,
        gridGap: '2px',
      }}
    >
      {cells}
    </div>
  );
};

export default memo(Board);
