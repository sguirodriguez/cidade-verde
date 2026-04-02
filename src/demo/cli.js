import { advanceTurn } from "../useCases/advanceTurn.js";
import { buildGame } from "../useCases/buildGame.js";
import { buyBuilding } from "../useCases/buyBuilding.js";
import { calcEnergy } from "../useCases/calcEnergy.js";
import { getGameResults } from "../useCases/gameResults.js";
import { createGameState } from "../game/createGameState.js";

const gameState = createGameState();

buildGame("makarov", "titan", "Nordeste", gameState);

buyBuilding("biomass_plant", gameState);
buyBuilding("wind_farm", gameState);

calcEnergy(
    gameState.buildings,
    gameState.region,
    gameState.eventModifiers,
);

advanceTurn(gameState);

console.log(getGameResults(gameState));
