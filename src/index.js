import { advanceTurn } from "./useCases/advanceTurn.js";
import { buildGame } from "./useCases/buildGame.js";
import { buyBuilding } from "./useCases/buyBuilding.js";
import { calcEnergy } from "./useCases/calcEnergy.js";

const gameState = {
  player: null,
  city: null,
  region: null,
  buildings: [],
  event: null,
  eventModifiers: {
    solarEffect: 1,
    windEffect: 1,
    biomassEffect: 1,
    demandBonus: 0,
  },
  turn: 1,
  maxTurns: 12,
  history: [],
};

// ---- BUILD GAME ----

buildGame("makarov", "titan", "Nordeste", gameState)

// ---- GAME STARTED ----

buyBuilding("biomass_plant", gameState)
buyBuilding("wind_farm", gameState)

calcEnergy(
  gameState.buildings,
  gameState.region,
  gameState.eventModifiers,
);

advanceTurn(gameState)

console.log("result", gameState);