import { GameController } from '../game-controller';

export function handleStateWindowExit(game: GameController, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const sprites = game.sprites;

  if (game.vars.logoOpacity > 0.05) {
    game.vars.logoOpacity -= 0.05;

    ctx.globalAlpha = game.vars.logoOpacity;
    ctx.drawImage(sprites.logo, (canvas.width / 2) - (sprites.logo.width / 2), 15);
    ctx.globalAlpha = 1;
  } else {
    game.vars.height ++;
    game.vars.playerX ++;
  }
}
