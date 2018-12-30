import { GameController } from '../game-controller';
import { drawUI } from '../ui';

export function handleStateGameOver(game: GameController, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const sprites = game.sprites;

  drawUI(game, canvas, ctx);
  ctx.drawImage(
    sprites.gameOver,
    (canvas.width / 2) - (sprites.gameOver.width / 2),
    (canvas.height / 2) - (sprites.gameOver.height / 2)
  );
}
