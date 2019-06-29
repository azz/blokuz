import { Server } from 'boardgame.io/server';
import game from '../src/game';

const server = Server({
  games: [game],

  // db: new DbConnector(),
});

server.run(process.env.PORT || 8000);
