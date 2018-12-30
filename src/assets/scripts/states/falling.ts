import { GameController } from '../game-controller';

export function handleStateFalling(game: GameController, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const sprites = game.sprites;

  game.vars.height += 2;

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
