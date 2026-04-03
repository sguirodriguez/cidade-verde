export { createGameState } from "./game/createGameState.js";
export { buildGame } from "./useCases/buildGame.js";
export { advanceTurn } from "./useCases/advanceTurn.js";
export { buyBuilding } from "./useCases/buyBuilding.js";
export { calcEnergy } from "./useCases/calcEnergy.js";
export { getGameResults } from "./useCases/gameResults.js";
export { tryFinalizeGame, isGameOver } from "./useCases/gameEnd.js";

export { AVATARS } from "./data/avatars.js";
export { PRODUCER_BUILDINGS } from "./data/producerBuildings.js";
export { BUILDING_ICONS } from "./assets/buildingIcons.js";
export { REASON_LABELS, HISTORY_KEY } from "./constants/index.js";
