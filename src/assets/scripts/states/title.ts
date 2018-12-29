import { GameController } from '../game-controller';

export function handleStateTitle(game: GameController, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  if (!(game.vars.frameCount % 10)) game.vars.startGameVisible = !game.vars.startGameVisible;

  const sprites = game.sprites;

  ctx.drawImage(sprites.logo, (canvas.width / 2) - (sprites.logo.width / 2), 15);
  ctx.drawImage(sprites.controls, (canvas.width / 2) - (sprites.controls.width / 2), 111);
  if (game.vars.startGameVisible) ctx.drawImage(sprites.start, (canvas.width / 2) - (sprites.start.width / 2), 145);
}
