import { decreaseTimer } from './js/utils.js';
import { animate } from "./js/gameLogic.js";
import { keyDownHandler, keyUpHandler } from './js/eventHandlers.js';
import { player, enemy } from './js/gameObjects.js';

decreaseTimer()
animate()
window.addEventListener('keydown', keyDownHandler);
window.addEventListener('keyup', keyUpHandler);