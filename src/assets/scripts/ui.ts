import { GameController } from './game-controller';

export function drawUI(game: GameController, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const sprites = game.sprites;

  const ui_y = 4;

  const hearts_left = 34;
  const hearts_padding = 1;

  for (let i = 0; i < game.vars.lives; i++) {
    ctx.drawImage(sprites.heart, hearts_left + ((hearts_padding + sprites.heart.width) * i), ui_y);
  }

  const score_left = 64;
  ctx.drawImage(sprites.score, score_left, ui_y);
}
