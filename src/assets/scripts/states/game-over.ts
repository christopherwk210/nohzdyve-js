import { GameController } from '../game-controller';
import { drawUI } from '../ui';
import { drawPoof } from '../poof';
import { handleTeeth } from '../teeth';

export function handleStateGameOver(game: GameController, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const sprites = game.sprites;

  drawPoof(game, ctx);
  handleTeeth(game, canvas, ctx);
  drawUI(game, canvas, ctx);

  ctx.drawImage(
    sprites.gameOver,
    (canvas.width / 2) - (sprites.gameOver.width / 2),
    (canvas.height / 2) - (sprites.gameOver.height / 2)
  );
}
