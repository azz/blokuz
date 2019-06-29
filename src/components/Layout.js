import React from 'react';
import PlayerTiles from './PlayerTiles';
import Board from './Board';
import DragLayer from './DragLayer';

const Layout = props => {
  return (
    <div style={{ display: 'flex' }}>
      <DragLayer />
      <Board {...props} />
      <PlayerTiles {...props} />
    </div>
  );
};

export default Layout;
