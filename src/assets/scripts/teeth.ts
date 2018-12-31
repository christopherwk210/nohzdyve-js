import { GameController } from './game-controller';
import { randomBetween, choose } from './utils';
import { options } from './options';
import { GameStates } from './game-states.enum';

const teethWidth = 24;
const teethHeight = 20;

export function handleTeeth(game: GameController, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const sprites = game.sprites;

  const teethSprites = [ sprites.teethBlueSheet, sprites.teethMagentaSheet ];

  if (game.vars.teethTimer++ === 0 && game.state === GameStates.FALLING) {
    game.vars.teeth.push({
      x: randomBetween(sprites.wallLeft.width, canvas.width - sprites.wallRight.width - teethWidth),
      y: canvas.height,
      hspeed: choose([ options.teethHspeed, options.teethHspeed * -1 ]),
      sprite: choose(teethSprites)
    });
  } else if (game.vars.teethTimer > options.teethSpawnRate) game.vars.teethTimer = 0;

  game.vars.teeth = game.vars.teeth.filter(teeth => {
    const teethVspeed = game.state === GameStates.FALLING ? options.teethVspeed : options.teethVspeed - 2;
    teeth.y -= teethVspeed;

    if (teeth.y < -teethHeight) {
      return false;
    } else {
      if (teeth.x + teeth.hspeed < sprites.wallLeft.width) {
        teeth.hspeed = Math.abs(teeth.hspeed);
      } else if (teeth.x + teeth.hspeed > canvas.width - sprites.wallRight.width - teethWidth) {
        teeth.hspeed = Math.abs(teeth.hspeed) * -1;
      }
  
      teeth.x += teeth.hspeed;
      
      const frame = (Math.floor(game.vars.frameCount / 5) % 2) * teethWidth;
      ctx.drawImage(
        teeth.sprite,
        frame, 0,
        teethWidth, teethHeight,
        teeth.x, teeth.y,
        teethWidth, teethHeight
      );
      return true;
    }
  });
}
