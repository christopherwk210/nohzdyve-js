import { GameController } from '../game-controller';
import { options } from '../options';
import { GameStates } from '../game-states.enum';
import { boxCollision } from '../collision';
import { drawUI } from '../ui';
import { randomBetween, choose } from '../utils';
import { handleTeeth } from '../teeth';

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

  handleTeeth(game, canvas, ctx);

  // Calculate X
  game.vars.playerX += game.vars.hspeed;

  // Collide with walls
  const leighway = 1;
  if (game.vars.playerX < game.sprites.wallLeft.width - leighway || game.vars.playerX > canvas.width - game.sprites.wallRight.width - frameWidth + leighway) {
    die();
  }

  // Collide with flowers
  for (const [ flower_x, flower_y ] of game.vars.flowers) {
    if (
      boxCollision(
        flower_x,
        flower_y,
        game.sprites.flower.width,
        game.sprites.flower.height,

        game.vars.playerX,
        game.vars.playerY,
        frameWidth,
        frameHeight
      )
    ) die();
  }

  // Collide with window units
  for (const [ unit_x, unit_y ] of game.vars.windowUnits) {
    if (
      boxCollision(
        unit_x,
        unit_y,
        24,
        22,

        game.vars.playerX,
        game.vars.playerY,
        frameWidth,
        frameHeight
      )
    ) die();
  }

  // Collide with teeth
  for (const teeth of game.vars.teeth) {
    if (
      boxCollision(
        teeth.x,
        teeth.y,
        24,
        20,

        game.vars.playerX,
        game.vars.playerY,
        frameWidth,
        frameHeight
      )
    ) die();
  }

  // Draw player
  ctx.drawImage(
    sprites.playerDyvingSheet,
    frame, 0,
    frameWidth, frameHeight,
    game.vars.playerX, game.vars.playerY,
    frameWidth, frameHeight
  );

  drawUI(game, canvas, ctx);
}
