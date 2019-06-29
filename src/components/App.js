import React from 'react';
import { Client, Lobby } from 'boardgame.io/react';

import game from '../game';
import Layout from './Layout';

const isSolo = window.location.search.substring(1) === 'solo';

const GameClient = Client({
  numPlayers: 4,
  game,
  board: Layout,
  debug: process.env.NODE_ENV !== 'production',
});

const App = () => {
  return isSolo ? (
    <GameClient />
  ) : (
    <Lobby
      gameServer={window.location.origin.replace(':3000', ':8000')}
      lobbyServer={window.location.origin}
      gameComponents={[{ game, board: Layout }]}
    />
  );
};

export default App;
