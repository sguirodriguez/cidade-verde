import { buildGame } from "./useCases/buildGame.js";
import { buyBuilding } from "./useCases/buyBuilding.js";
import { calcEnergy } from "./useCases/calcEnergy.js";

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

buyBuilding("biomass_plant", gameState)
buyBuilding("wind_farm", gameState)

const result = calcEnergy(gameState.buildings, gameState.region)

console.log("result", result, gameState.city);