import { BUILDINGS } from "../data/buildings.js";
import Building from "../entities/building.js";
import { extraConsumersOnTurn } from "../data/demandGrowth.js";

const instantiateConsumer = (key) => {
    const building = BUILDINGS.find((b) => b.key === key && b.role === "consumer");
    if (!building) return null;
    return new Building({
        name: building.name,
        key: building.key,
        role: building.role,
        type: building.type,
        description: building.description,
        capacity: building.capacity,
        cost: building.cost,
    });
};

export const growConsumerDemandForTurn = (gameState) => {
    const keys = extraConsumersOnTurn(gameState.turn);
    const added = keys.map(key => instantiateConsumer(key)).filter(Boolean);
    if (!added.length) return { keys: [], buildings: [] };

    gameState.buildings = [...gameState.buildings, ...added];

    return { keys, buildings: added };
};
