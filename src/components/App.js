import React from 'react';
import { Client, Lobby } from 'boardgame.io/react';

import { twoPlayer, fourPlayer } from '../game';
import Layout from './Layout';

const isSolo = window.location.search.substring(1) === 'solo';

const GameClient = Client({
  numPlayers: 4,
  game: twoPlayer,
  board: Layout,
  debug: process.env.NODE_ENV !== 'production',
});

const App = () => {
  return isSolo ? (
    <GameClient />
  ) : (
    <Lobby
      gameServer={window.location.origin}
      lobbyServer={window.location.origin}
      gameComponents={[
        { game: twoPlayer, board: Layout },
        { game: fourPlayer, board: Layout },
      ]}
    />
  );
};

export default App;
