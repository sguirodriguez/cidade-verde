import { buildGame } from "./useCases/buildGame.js";

const gameState = {
  player: null,
  city: null,
  region: null,
  buildings: [],
  turn: 1,
  maxTurns: 12,
  history: [],
};

// ---- BUILD GAME ----

buildGame("makarov", "titan", "Nordeste", gameState)


// ---- GAME STARTED ----


console.log("game state", gameState);