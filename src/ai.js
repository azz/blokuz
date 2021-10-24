import { RandomBot } from 'boardgame.io/ai';
import { getPossibleMoves } from './logic';

const AI = {
  bot: RandomBot,
  enumerate: getPossibleMoves,
};
export default AI;
