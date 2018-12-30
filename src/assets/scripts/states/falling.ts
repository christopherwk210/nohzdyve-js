import { GameController } from '../game-controller';
import { options } from '../options';

export function handleStateFalling(game: GameController, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const sprites = game.sprites;

  game.vars.height += 2;

  if (game.vars.oDown && !game.vars.pDown) {
    game.vars.hspeed = -options.moveSpeed;
  }

  if (game.vars.pDown && !game.vars.oDown) {
    game.vars.hspeed = options.moveSpeed;
  }

  if (!game.vars.oDown && !game.vars.pDown) {
    game.vars.hspeed = options.idleSpeed * Math.sign(game.vars.hspeed);
  }

  game.vars.playerX += game.vars.hspeed;

  const frameWidth = 20;
  const frameHeight = 28;
  const frame = (Math.floor(game.vars.frameCount / 5) % 2) * frameWidth;

  ctx.drawImage(
    sprites.playerDyvingSheet,
    frame, 0,
    frameWidth, frameHeight,
    game.vars.playerX, game.vars.playerY,
    frameWidth, frameHeight
  );
}
