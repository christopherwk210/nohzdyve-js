import { loadSprites, spritePaths} from './sprites';
import { GameStates } from './game-states.enum';
import { canvas, ctx } from './canvas';
import { GameController } from './game-controller';
import { createWall, drawWalls } from './walls';

// State handlers
import { handleStateTitle } from './states/title';
import { handleStateWindowExit } from './states/window-exit';

let game: GameController = {
  sprites: null,
  state: GameStates.TITLE,
  vars: {    
    frameCount: 0,
    height: 0,

    leftWalls: [],
    rightWalls: [],

    playerX: 20,
    playerY: 138,

    // Title state vars
    startGameVisible: true,

    // Window exit vars
    logoOpacity: 1
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

  window.addEventListener('keydown', e => {
    switch (e.key) {
      case ' ':
        if (game.state === GameStates.TITLE) game.state = GameStates.WINDOW_EXIT;
        break;
      case 'o':
        break;
      case 'p':
        break;
    }
  })

  gameLoop();
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  switch (game.state) {
    case GameStates.TITLE:
      handleStateTitle(game, canvas, ctx);
      break;
    case GameStates.WINDOW_EXIT:
      handleStateWindowExit(game, canvas, ctx);
      break;
  }

  drawWalls(game.vars.height, game.vars.leftWalls, canvas, ctx, true, game);
  drawWalls(game.vars.height, game.vars.rightWalls, canvas, ctx, false, game);

  game.vars.frameCount++;
  requestAnimationFrame(gameLoop);
}

startGame();
