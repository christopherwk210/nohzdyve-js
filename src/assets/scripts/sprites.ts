export interface GameSprites<T> {
  controls?: T;
  dashMarks?: T;
  eyeballCyanSheet?: T;
  eyeballMagentaSheet?: T;
  fanSheet?: T;
  flower?: T;
  gameOver?: T;
  heart?: T;
  hiScore?: T;
  logo?: T;
  playerDyvingSheet?: T;
  playerJump?: T;
  score?: T;
  start?: T;
  teethBlueSheet?: T;
  teethMagentaSheet?: T;
  wallLeft?: T;
  wallRight?: T;
  windowSheet?: T;
}

export const spritePaths: GameSprites<string> = {
  controls: require('../images/spr_controls.png'),
  dashMarks: require('../images/spr_dash_marks.png'),
  eyeballCyanSheet: require('../images/spr_eyeball_cyan_sheet.png'),
  eyeballMagentaSheet: require('../images/spr_eyeball_magenta_sheet.png'),
  flower: require('../images/spr_flower.png'),
  gameOver: require('../images/spr_game_over.png'),
  fanSheet: require('../images/spr_fan_sheet.png'),
  heart: require('../images/spr_heart.png'),
  hiScore: require('../images/spr_hi_score.png'),
  logo: require('../images/spr_logo.png'),
  playerDyvingSheet: require('../images/spr_player_dyving_sheet.png'),
  playerJump: require('../images/spr_player_jump.png'),
  score: require('../images/spr_score.png'),
  start: require('../images/spr_start.png'),
  teethBlueSheet: require('../images/spr_teeth_blue_sheet.png'),
  teethMagentaSheet: require('../images/spr_teeth_magenta_sheet.png'),
  wallLeft: require('../images/spr_wall_left.png'),
  wallRight: require('../images/spr_wall_right.png'),
  windowSheet: require('../images/spr_window_sheet.png')
};

/**
 * Loads given game sprites into memory
 * @param sprites 
 */
export function loadSprites(sprites: GameSprites<string>): Promise<GameSprites<HTMLImageElement>> {
  return new Promise(resolve => {
    const spriteNames = Object.keys(sprites);

    const totalImages = spriteNames.length;
    let loaded = 0;

    let loadedImages: GameSprites<HTMLImageElement> = {};

    spriteNames.forEach(spriteName => {
      const image = new Image();

      image.onload = () => {
        loadedImages[spriteName] = image;
        if (++loaded === totalImages) resolve(loadedImages);
      }

      image.src = sprites[spriteName];
    });
  });
}
