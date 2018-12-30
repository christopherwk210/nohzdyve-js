import { GameController } from '../game-controller';
import { options } from '../options';
import { GameStates } from '../game-states.enum';

export function handleStateFalling(game: GameController, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const sprites = game.sprites;

  function die() {
    if (--game.vars.lives === 0) {
      game.state = GameStates.GAME_OVER;
    } else {
      game.state = GameStates.DEAD;
    }
  }

  // Sprite frame
  const frameWidth = 20;
  const frameHeight = 28;
  const frame = (Math.floor(game.vars.frameCount / 5) % 2) * frameWidth;

  // Fall
  game.vars.height += 2;

  // Handle inputs
  if (game.vars.oDown && !game.vars.pDown) {
    game.vars.hspeed = -options.moveSpeed;
  }

  if (game.vars.pDown && !game.vars.oDown) {
    game.vars.hspeed = options.moveSpeed;
  }

  if (!game.vars.oDown && !game.vars.pDown) {
    game.vars.hspeed = options.idleSpeed * Math.sign(game.vars.hspeed);
  }

  // Calculate X
  game.vars.playerX += game.vars.hspeed;

  // Collide with walls
  if (game.vars.playerX < game.sprites.wallLeft.width || game.vars.playerX > canvas.width - game.sprites.wallRight.width - frameWidth) {
    die();
  }

  // Draw player
  ctx.drawImage(
    sprites.playerDyvingSheet,
    frame, 0,
    frameWidth, frameHeight,
    game.vars.playerX, game.vars.playerY,
    frameWidth, frameHeight
  );
}
