import { GameController } from '../game-controller';
import { drawUI } from '../ui';
import { drawPoofs } from '../poof';
import { handleTeeth } from '../teeth';
import { handleEyes } from '../eyes';

export function handleStateGameOver(game: GameController, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const sprites = game.sprites;

  if (!game.vars.savedHiscore) {
    game.vars.savedHiscore = true;

    if (game.vars.score > game.vars.hiscore) {
      localStorage.setItem('nohzdyve-high-score', game.vars.score.toString());
      game.vars.hiscore = game.vars.score;
    }
  }

  drawPoofs(game, ctx);
  handleTeeth(game, canvas, ctx);
  handleEyes(game, canvas, ctx);
  drawUI(game, canvas, ctx);

  ctx.drawImage(
    sprites.gameOver,
    (canvas.width / 2) - (sprites.gameOver.width / 2),
    (canvas.height / 2) - (sprites.gameOver.height / 2)
  );
}
