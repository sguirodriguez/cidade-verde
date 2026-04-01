import { calcEnergy } from "./calcEnergy.js";
import { diceEvents } from "./diceEvents.js";
import { modifiersFromEvent } from "./eventModifiers.js";
import { growConsumerDemandForTurn } from "./growConsumerDemand.js";

export const advanceTurn = (gameState) => {
    if (gameState.turn >= gameState.maxTurns) {
        return;
    }

    const previousGrid = calcEnergy(gameState.buildings, gameState.region, gameState.eventModifiers);

    const previous = {
        turn: gameState.turn,
        balance: gameState.city.balance,
        buildings: gameState.buildings.length,
        energy: previousGrid.energy,
        demand: previousGrid.demand,
        coverage: previousGrid.coverage,
    };

    gameState.turn = gameState.turn + 1;
    gameState.city.balance += gameState.city.turnIncome;

    const event = diceEvents(gameState.region.events, gameState.region.name);
    gameState.event = event;
    gameState.eventModifiers = modifiersFromEvent(event);

    if (event?.balanceBonus) {
        gameState.city.balance += event.balanceBonus;
    }

    const demandGrowth = growConsumerDemandForTurn(gameState);

    const newGrid = calcEnergy(gameState.buildings, gameState.region, gameState.eventModifiers);

    const current = {
        turn: gameState.turn,
        balance: gameState.city.balance,
        buildings: gameState.buildings.length,
        energy: newGrid.energy,
        demand: newGrid.demand,
        coverage: newGrid.coverage,
        turnIncome: gameState.city.turnIncome,
        demandGrowthKeys: demandGrowth.keys,
    };

    gameState.history = [
        ...gameState.history,
        {
            action: "TURN_ADVANCED",
            city: gameState.city.name,
            previous,
            current,
        },
    ];
};
