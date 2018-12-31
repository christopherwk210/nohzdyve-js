import { loadSprites, spritePaths} from './sprites';
import { GameStates } from './game-states.enum';
import { canvas, ctx } from './canvas';
import { GameController } from './game-controller';
import { createWall, drawWalls, createRandomWallConfigurations } from './walls';
import { options } from './options';

// State handlers
import { handleStateTitle } from './states/title';
import { handleStateWindowExit } from './states/window-exit';
import { handleStateFalling } from './states/falling';
import { handleStateDead } from './states/dead';
import { handleStateGameOver } from './states/game-over';

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
    score: 0,
    hiscore: 0,

    // Title state vars
    startGameVisible: true,

    // Window exit vars
    logoOpacity: 1,

    // Falling vars
    hspeed: 0,
    oDown: false,
    pDown: false,

    teeth: [],
    teethTimer: options.teethSpawnRate - 10,

    eyes: [],
    eyeTimer: 0,

    // Dead vars
    poofFrame: 0
  }
};

window['game'] = game;

function respawn() {
  game.vars.leftWalls = [];
  game.vars.rightWalls = [];

  game.vars.leftWalls.push(
    createWall(false, false, false, true),
    createWall()
  );

  game.vars.rightWalls.push(
    createWall(false, true),
    createWall()
  );

  game.vars.playerX = 20;
  game.vars.playerY = 138;
  game.vars.hspeed = 0;

  game.vars.height = 0;

  game.vars.poofFrame = 0;
}

function reset() {
  respawn();
  game.vars.logoOpacity = 1;
  game.vars.startGameVisible = true;
  game.vars.lives = 3;
  game.vars.score = 0;
}

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
        switch (game.state) {
          case GameStates.TITLE:
            game.state = GameStates.WINDOW_EXIT;
            break;
          case GameStates.DEAD:
            respawn();
            game.state = GameStates.WINDOW_EXIT;
            break;
          case GameStates.GAME_OVER:
            reset();
            game.state = GameStates.TITLE;
            break;
        }
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

  // Continually spawn walls
  if (game.vars.height / 161 > game.vars.leftWalls.length - 1) {
    const configurations = createRandomWallConfigurations();

    game.vars.leftWalls.push(
      createWall(...configurations[0])
    );

    game.vars.rightWalls.push(
      createWall(...configurations[1])
    );
  }

  // Reset obstacle tracking
  game.vars.flowers = [];
  game.vars.windowUnits = [];

  // Draw walls
  drawWalls(game.vars.height, game.vars.leftWalls, canvas, ctx, true, game);
  drawWalls(game.vars.height, game.vars.rightWalls, canvas, ctx, false, game);

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
    case GameStates.DEAD:
      handleStateDead(game, canvas, ctx);
      break;
    case GameStates.GAME_OVER:
      handleStateGameOver(game, canvas, ctx);
      break;
  }

  game.vars.frameCount++;
  requestAnimationFrame(gameLoop);
}

startGame();
