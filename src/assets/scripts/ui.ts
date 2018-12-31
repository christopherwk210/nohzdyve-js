import { GameController } from './game-controller';

export function drawUI(game: GameController, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  const sprites = game.sprites;

  const ui_y = 4;

  // Draw hearts
  const hearts_left = 34;
  const hearts_padding = 1;

  for (let i = 0; i < game.vars.lives; i++) {
    ctx.drawImage(sprites.heart, hearts_left + ((hearts_padding + sprites.heart.width) * i), ui_y);
  }

  // Draw score text
  const score_left = 64;
  ctx.drawImage(sprites.score, score_left, ui_y);

  // Draw score numbers
  const score_tally_left = score_left + sprites.score.width + 7;
  const score_tally_padding = 1;

  const currentScore: number = game.vars.score;
  let currentScoreString = currentScore.toString();

  while (currentScoreString.length < 5) {
    currentScoreString = '0' + currentScoreString;
  }

  for (let i = 0; i < 5; i++) {
    const currentNumber = parseInt(currentScoreString[i]);
    drawNumber(sprites.numbersGreen, currentNumber, ctx, score_tally_left + ((score_tally_padding + 5) * i), ui_y);
  }

  // Draw hiscore text
  const hiscore_left = score_tally_left + ((score_tally_padding + 5) * 5) + 14;
  ctx.drawImage(sprites.hiScore, hiscore_left, ui_y);

  // Draw hiscore numbers
  const hiscore_tally_left = hiscore_left + sprites.hiScore.width + 7;
  const hiscore_tally_padding = 1;

  const currentHiscore: number = game.vars.hiscore;
  let currentHiscoreString = currentHiscore.toString();

  while (currentHiscoreString.length < 5) {
    currentHiscoreString = '0' + currentHiscoreString;
  }

  for (let i = 0; i < 5; i++) {
    const currentNumber = parseInt(currentHiscoreString[i]);
    drawNumber(sprites.numbersMagenta, currentNumber, ctx, hiscore_tally_left + ((hiscore_tally_padding + 5) * i), ui_y);
  }
}

function drawNumber(sprite: HTMLImageElement, number: number, ctx: CanvasRenderingContext2D, x: number, y: number) {
  const frameSize = 5;
  const frame = number * frameSize;

  ctx.drawImage(
    sprite,
    frame, 0,
    frameSize, frameSize,
    x, y,
    frameSize, frameSize
  );
}
