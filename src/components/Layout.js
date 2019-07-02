import React from 'react';
import PlayerTiles from './PlayerTiles';
import Board from './Board';
import DragLayer from './DragLayer';

import { DndProvider } from 'react-dnd';
import TouchBackend from 'react-dnd-touch-backend';
import HTML5Backend from 'react-dnd-html5-backend';

const Layout = props => {
  return (
    <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
      <div style={{ display: 'flex', flexFlow: 'row wrap', width: '100vw' }}>
        <DragLayer />
        <Board {...props} />
        <PlayerTiles {...props} />
      </div>
    </DndProvider>
  );
};

function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}

export default Layout;
