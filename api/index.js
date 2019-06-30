import serve from 'koa-static';
import { Server } from 'boardgame.io/server';
import { twoPlayer, fourPlayer } from '../src/game';

const server = Server({
  games: [twoPlayer, fourPlayer],

  // db: new DbConnector(),
});

server.app.use(serve('build'));

server.run(process.env.PORT || 8000);
