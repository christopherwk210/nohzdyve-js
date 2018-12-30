import { GameController } from './game-controller';
import { choose } from './utils';

export interface Wall {
  hasClothesLine: boolean;
  hasFlower: boolean;
  hasWindowUnit: boolean;
  hasWindow: boolean;
  positionTop: boolean;
}

export function createWall(hasFlower?: boolean, hasWindowUnit?: boolean, hasClothesLine?: boolean, hasWindow?: boolean, positionTop?: boolean): Wall {
  return {
    hasFlower: !!hasFlower,
    hasWindowUnit: !!hasWindowUnit,
    hasClothesLine: !!hasClothesLine,
    hasWindow: !!hasWindow,
    positionTop: !!positionTop
  }
}

export function drawWalls(height: number, walls: Wall[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, left: boolean, game: GameController) {
  const sprites = game.sprites;

  walls.forEach((wall, index) => {
    const wallSprite = left ? sprites.wallLeft : sprites.wallRight;
    const ypos = (-height) + (index * wallSprite.height);

    if (ypos < -wallSprite.height) return;

    ctx.drawImage(wallSprite, left ? 0 : canvas.width - wallSprite.width, ypos);

    if (wall.hasFlower) {
      const flower_ypos = (wall.positionTop ? 77 : 161) - 13;
      const flower_x = left ? -21 - sprites.flower.width : canvas.width - 21 - sprites.flower.width;
      const flower_y = ypos + flower_ypos;

      if (left) ctx.scale(-1, 1);
      ctx.drawImage(sprites.flower, flower_x, flower_y);
      if (left) ctx.setTransform(1, 0, 0, 1, 0, 0);

      game.vars.flowers.push([ flower_x, flower_y ]);
    }

    if (wall.hasWindowUnit) {
      const frameWidth = 24;
      const frameHeight = 22;
      const frame = (Math.floor(game.vars.frameCount / 5) % 4) * frameWidth;
      const unit_ypos = wall.positionTop ? 54 : 138;

      const unit_x = left ? -17 - frameWidth : canvas.width - 17 - frameWidth;
      const unit_y = ypos + unit_ypos;

      if (left) ctx.scale(-1, 1);
      ctx.drawImage(
        sprites.fanSheet,
        frame, 0,
        frameWidth, frameHeight,
        unit_x, unit_y,
        frameWidth, frameHeight
      );
      if (left) ctx.setTransform(1, 0, 0, 1, 0, 0);

      game.vars.windowUnits.push([ unit_x, unit_y ]);
    }

    if (wall.hasClothesLine) {}

    if (wall.hasWindow && height !== 0) {
      const frameWidth = 24;
      const frameHeight = 22;
      const frame = (height > 10 ? 1 : 0) * frameWidth;
      const unit_ypos = wall.positionTop ? 54 : 138;

      ctx.drawImage(
        sprites.windowSheet,
        frame, 0,
        frameWidth, frameHeight,
        left ? 17 : canvas.width - 17 - frameWidth, ypos + unit_ypos,
        frameWidth, frameHeight
      );
    }
  });
}

export function createRandomWallConfigurations() {
  const obstacleChoices = ['unit', 'flower', 'none'];
  const sideChoices = ['left', 'right'];
  const verticalChoices = [true, false];

  const obstacleChoice = choose(obstacleChoices);
  if (obstacleChoice === 'none') {
    return [ [], [] ];
  } else {
    const sideChoice = choose(sideChoices);
    const verticalChoice = choose(verticalChoices);

    const obstacleWindowConfig = [obstacleChoice === 'flower', obstacleChoice === 'unit', false, false, verticalChoice];

    return sideChoice === 'left' ? [ obstacleWindowConfig, [] ] : [ [], obstacleWindowConfig ];
  }
}
