import { GameSprites } from "./sprites";

export interface Wall {
  hasClothesLine: boolean;
  hasCamera: boolean;
  hasWindowUnit: boolean;
  hasWindow: boolean;
}

export function createWall(hasCamera?: boolean, hasWindowUnit?: boolean, hasClothesLine?: boolean, hasWindow?: boolean): Wall {
  return {
    hasCamera: !!hasCamera,
    hasWindowUnit: !!hasWindowUnit,
    hasClothesLine: !!hasClothesLine,
    hasWindow: !!hasWindow
  }
}

export function drawWalls(height: number, walls: Wall[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, left: boolean, sprites: GameSprites<HTMLImageElement>) {
  walls.forEach((wall, index) => {
    const wallSprite = left ? sprites.wallLeft : sprites.wallRight;
    const ypos = (-height) + (index * wallSprite.height);
    ctx.drawImage(wallSprite, left ? 0 : canvas.width - wallSprite.width, ypos);
  });
}
