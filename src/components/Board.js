import React, { memo, useRef } from 'react';
import { useDrop } from 'react-dnd';
import Cell from './Cell';
import { snapToGrid } from '../snap';
import { isValidMove } from '../logic';
import colors from '../colors';

function getCell(G, boardRef, monitor) {
  let { top, left } = boardRef.current.getBoundingClientRect();
  const { x, y } = monitor.getSourceClientOffset();
  left = Math.round(x - left);
  top = Math.round(y - top);
  [left, top] = snapToGrid(left, top);
  left /= 26;
  top /= 26;

  return top * G.gameSize + left;
}

const Board = ({ G, ctx, moves, events }) => {
  const boardRef = useRef();
  const [, drop] = useDrop({
    accept: 'Tile',
    canDrop: (tile, monitor) => {
      const cell = getCell(G, boardRef, monitor);
      return isValidMove(G, ctx, { cell, tile });
    },
    drop: (tile, monitor) => {
      const cell = getCell(G, boardRef, monitor);
      moves.place({ cell, tile });
      events.endTurn();
    },
  });

  const cells = Array(G.gameSize * G.gameSize)
    .fill(null)
    .map((cell, i) => <Cell key={i} color={colors[G.cells[i]]} />);

  return (
    <div ref={drop}>
      <div
        ref={boardRef}
        style={{
          display: 'grid',
          background: '#eee',
          gridTemplateColumns: `repeat(${G.gameSize}, 24px)`,
          gridTemplateRows: `repeat(${G.gameSize}, 24px)`,
          gridGap: '2px',
        }}
      >
        {cells}
      </div>
    </div>
  );
};

export default memo(Board);
