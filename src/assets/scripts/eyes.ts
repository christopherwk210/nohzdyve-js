import { GameController } from './game-controller';
import { randomBetween, choose } from './utils';
import { options } from './options';
import { GameStates } from './game-states.enum';

const eyeWidth = 16;
const eyeHeight = 31;

export function handleEyes(game: GameController, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const sprites = game.sprites;

  const eyeSprites = [ sprites.eyeballCyanSheet, sprites.eyeballMagentaSheet ];

  if (game.vars.eyeTimer++ === 0 && game.state === GameStates.FALLING && choose([ true, true, false ])) {
    const hspeed = choose([ options.eyeballHspeed, options.eyeballHspeed * -1 ]);
    game.vars.eyes.push({
      x: randomBetween(sprites.wallLeft.width + options.eyeballPadding, canvas.width - sprites.wallRight.width - eyeWidth - options.eyeballPadding),
      y: canvas.height,
      hspeed,
      targetHspeed: hspeed,
      sprite: choose(eyeSprites),
      turnAroundTimer: Math.floor(options.eyeballTurnAroundTime / 2)
    });
  } else if (game.vars.eyeTimer > options.eyeballSpawnChanceRate) game.vars.eyeTimer = 0;

  game.vars.eyes = game.vars.eyes.filter(eye => {
    if (game.state === GameStates.FALLING) eye.y -= 2;

    if (eye.y < -eyeHeight) {
      return false;
    } else {
      if (++eye.turnAroundTimer >= options.eyeballTurnAroundTime) {
        eye.turnAroundTimer = 0;
        eye.targetHspeed *= - 1;
      }

      if (eye.hspeed < eye.targetHspeed) {
        eye.hspeed += 0.1;
      } else if (eye.hspeed > eye.targetHspeed) {
        eye.hspeed -= 0.1;
      }

      eye.x += eye.hspeed;

      const frame = (Math.floor(game.vars.frameCount / 5) % 4) * eyeWidth;
      ctx.drawImage(
        eye.sprite,
        frame, 0,
        eyeWidth, eyeHeight,
        eye.x, eye.y,
        eyeWidth, eyeHeight
      );
      return true;
    }
  });
}
