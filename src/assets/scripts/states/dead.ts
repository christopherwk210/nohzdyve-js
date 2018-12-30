import { GameController } from '../game-controller';
import { drawUI } from '../ui';

export function handleStateDead(game: GameController, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const sprites = game.sprites;

  drawUI(game, canvas, ctx);
}
