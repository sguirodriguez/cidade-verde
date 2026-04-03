import { createGameState } from './game/createGameState.js';

export let gameState = createGameState();

export function resetGameSession() {
  gameState = createGameState();
}
