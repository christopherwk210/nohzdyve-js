import { loadSprites, spritePaths} from './sprites';
import { GameStates } from './game-states.enum';
import { canvas, ctx } from './canvas';
import { GameController } from './game-controller';
import { createWall, drawWalls } from './walls';

// State handlers
import { handleStateTitle } from './states/title';
import { handleStateWindowExit } from './states/window-exit';
import { handleStateFalling } from './states/falling';

let game: GameController = {
  sprites: null,
  state: GameStates.TITLE,
  vars: {    
    frameCount: 0,
    height: 0,

    leftWalls: [],
    rightWalls: [],

    flowers: [],
    windowUnits: [],

    playerX: 20,
    playerY: 138,

    lives: 3,

    // Title state vars
    startGameVisible: true,

    // Window exit vars
    logoOpacity: 1,

    // Falling vars
    hspeed: 0,
    oDown: false,
    pDown: false
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
        game.vars.oDown = true;
        break;
      case 'p':
        game.vars.pDown = true;
        break;
    }
  });

  window.addEventListener('keyup', e => {
    switch (e.key) {
      case 'o':
        game.vars.oDown = false;
        break;
      case 'p':
        game.vars.pDown = false;
        break;
    }
  });

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
    case GameStates.FALLING:
      handleStateFalling(game, canvas, ctx);
      break;
  }

  if (game.vars.height / 161 > game.vars.leftWalls.length - 1) {
    game.vars.leftWalls.push(
      createWall()
    );

    game.vars.rightWalls.push(
      createWall()
    );
  }

  game.vars.flowers = [];
  game.vars.windowUnits = [];

  drawWalls(game.vars.height, game.vars.leftWalls, canvas, ctx, true, game);
  drawWalls(game.vars.height, game.vars.rightWalls, canvas, ctx, false, game);

  game.vars.frameCount++;
  requestAnimationFrame(gameLoop);
}

startGame();
