import { loadSprites, spritePaths} from './sprites';
import { GameStates } from './game-states.enum';
import { canvas, ctx } from './canvas';
import { GameController } from './game-controller';
import { createWall, drawWalls } from './walls';

// State handlers
import { handleStateTitle } from './states/title';

let game: GameController = {
  sprites: null,
  state: GameStates.TITLE,
  vars: {
    startGameVisible: true,
    frameCount: 0,
    height: 0,
    leftWalls: [],
    rightWalls: []
  }
};

window['game'] = game;

async function startGame() {
  game.sprites = await loadSprites(spritePaths);

  game.vars.leftWalls.push(
    createWall(false, false, false, true),
    createWall()
  );

  game.vars.rightWalls.push(
    createWall(false, true),
    createWall()
  );

  gameLoop();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (game.state) {
    case GameStates.TITLE:
      handleStateTitle(game, canvas, ctx);
      break;
  }

  drawWalls(game.vars.height, game.vars.leftWalls, canvas, ctx, true, game.sprites);
  drawWalls(game.vars.height, game.vars.rightWalls, canvas, ctx, false, game.sprites);

  game.vars.frameCount++;
  requestAnimationFrame(gameLoop);
}

startGame();
