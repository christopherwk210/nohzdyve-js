import { GameController } from './game-controller';
import { GameStates } from './game-states.enum';

export function createPoof(game: GameController, x: number, y: number) {
  game.vars.poofs.push({
    x, y,
    frame: 0,
    sprite: game.sprites.poof
  });
}

export function drawPoofs(game: GameController, ctx: CanvasRenderingContext2D) {
  if (!game.vars.poofs.length) return;

  const frameWidth = 29;
  const frameHeight = 18;

  game.vars.poofs = game.vars.poofs.filter(poof => {
    if (poof.frame >= 4) return false;

    if (game.state === GameStates.FALLING) {
      poof.y -= 2;
    }

    ctx.drawImage(
      poof.sprite,
      poof.frame * frameWidth, 0,
      frameWidth, frameHeight,
      poof.x - (frameWidth / 2), poof.y - (frameHeight / 2),
      frameWidth, frameHeight
    );

    if (game.vars.frameCount % 4 === 0) {
      poof.frame++;
    }

    return true;
  });
}
