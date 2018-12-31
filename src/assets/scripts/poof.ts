import { GameController } from './game-controller';

export function drawPoof(game: GameController, ctx: CanvasRenderingContext2D) {
  const sprites = game.sprites;
  const frame = game.vars.poofFrame;

  if (frame < 4) {
    // Sprite frame
    const frameWidth = 29;
    const frameHeight = 18;
    const sx = frame * frameWidth;

    // Player size
    const playerFrameWidth = 20;
    const playerFrameHeight = 28;

    ctx.drawImage(
      sprites.poof,
      sx, 0,
      frameWidth, frameHeight,
      game.vars.playerX - (frameWidth / 2) + (playerFrameWidth / 2), game.vars.playerY - (frameHeight / 2) + (playerFrameHeight / 2),
      frameWidth, frameHeight
    );

    game.vars.poofFrame = game.vars.frameCount % 4 === 0 ? game.vars.poofFrame + 1 : game.vars.poofFrame;
  }
}
