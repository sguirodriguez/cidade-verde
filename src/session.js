import { createGameState } from './game/createGameState.js';

/** Sessão atual da aplicação (um único objeto mutável passado ao motor após o setup). */
export let gameState = createGameState();

export function resetGameSession() {
  gameState = createGameState();
}
