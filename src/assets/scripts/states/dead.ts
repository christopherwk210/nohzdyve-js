import { GameController } from '../game-controller';
import { drawUI } from '../ui';
import { drawPoofs } from '../poof';
import { handleTeeth } from '../teeth';
import { handleEyes } from '../eyes';

export function handleStateDead(game: GameController, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  drawPoofs(game, ctx);
  handleTeeth(game, canvas, ctx);
  handleEyes(game, canvas, ctx);
  drawUI(game, canvas, ctx);
}
