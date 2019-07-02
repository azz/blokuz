import { AI, RandomBot } from 'boardgame.io/ai';
import { getPossibleMoves } from './logic';

export default AI({
  bot: RandomBot,
  enumerate: getPossibleMoves,
});
