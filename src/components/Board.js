import React, { memo } from 'react';
import { useDrop } from 'react-dnd';
import BoardTile from './BoardTile';
import { snapToGrid } from '../snap';

const Board = () => {
  useDrop({
    accept: 'Tile',
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      let left = Math.round(item.left + delta.x);
      let top = Math.round(item.top + delta.y);
      [left, top] = snapToGrid(left, top);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      item: monitor.getItem(),
    }),
  });

  let tbody = [];
  for (let i = 0; i < 20; i++) {
    let cells = [];
    for (let j = 0; j < 20; j++) {
      const id = 20 * i + j;
      cells.push(<BoardTile key={id} />);
    }
    tbody.push(<tr key={i}>{cells}</tr>);
  }

  return (
    <div style={{ display: 'flex' }}>
      <table>
        <tbody>{tbody}</tbody>
      </table>
    </div>
  );
};

export default memo(Board);
