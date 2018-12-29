import { GameSprites } from './sprites';
import { GameStates } from './game-states.enum';

export interface GameController {
  sprites: GameSprites<HTMLImageElement>;
  state: GameStates;
  vars: {
    [x: string]: any;
  }
}
