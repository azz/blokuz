import React from 'react';
import { Client } from 'boardgame.io/react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Game from './Game';
import Layout from './Layout';

const GameClient = Client({ game: Game, board: Layout });

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <GameClient />
    </DndProvider>
  );
};

export default App;
