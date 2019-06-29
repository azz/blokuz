import React from 'react';
import PlayerTiles from './PlayerTiles';
import Board from './Board';
import DragLayer from './DragLayer';

const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <DragLayer />
      <Board />
      <PlayerTiles color={'red'} />
    </div>
  );
};

export default Layout;
