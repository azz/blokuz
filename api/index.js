import serve from 'koa-static';
import { Server, Mongo } from 'boardgame.io/server';
import { twoPlayer, fourPlayer } from '../src/game';

console.log('MONGODB_URI', process.env.MONGODB_URI);

const server = Server({
  games: [twoPlayer, fourPlayer],

  db: process.env.MONGODB_URI
    ? new Mongo({
        url: process.env.MONGODB_URI,
        dbname: process.env.MONGODB_DATABASE,
      })
    : undefined,
});

server.app.use(serve('build'));

server.run(process.env.PORT || 8000);
