import { GameController } from '../game-controller';
import { drawUI } from '../ui';
import { drawPoof } from '../poof';

export function handleStateDead(game: GameController, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  drawPoof(game, ctx);
  drawUI(game, canvas, ctx);
}
