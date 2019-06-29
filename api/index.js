import serve from 'koa-static';
import { Server } from 'boardgame.io/server';
import game from '../src/game';

const server = Server({
  games: [game],

  // db: new DbConnector(),
});

server.app.use(serve('build'));

server.run(process.env.PORT || 8000);
