import { GameController } from '../game-controller';
import { GameStates } from '../game-states.enum';

export function handleStateWindowExit(game: GameController, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const sprites = game.sprites;

  if (game.vars.logoOpacity > 0.05) {
    game.vars.logoOpacity -= 0.05;

    ctx.globalAlpha = game.vars.logoOpacity;
    ctx.drawImage(sprites.logo, (canvas.width / 2) - (sprites.logo.width / 2), 15);
    ctx.globalAlpha = 1;
  } else {
    game.vars.height ++;

    if (game.vars.height > 10) {
      game.vars.playerX += 3;

      ctx.drawImage(sprites.playerJump, game.vars.playerX, game.vars.playerY - game.vars.height);
      ctx.drawImage(sprites.dashMarks, game.vars.playerX - sprites.dashMarks.width - 10, game.vars.playerY - game.vars.height + (sprites.playerJump.height / 2));

      if (game.vars.playerX > canvas.width / 2) {
        game.state = GameStates.FALLING;
      }
    }
  }
}
