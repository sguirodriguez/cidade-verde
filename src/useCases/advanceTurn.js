import { calcEnergy } from "./calcEnergy.js";
import { diceEvents } from "./diceEvents.js";
import { modifiersFromEvent } from "./eventModifiers.js";

export const advanceTurn = (gameState) => {
    if (gameState.turn >= gameState.maxTurns) {
        return;
    }

    gameState.turn = gameState.turn + 1;
    gameState.city.balance += gameState.city.turnIncome;

    const event = diceEvents(gameState.region.events, gameState.region.name);
    gameState.event = event;
    gameState.eventModifiers = modifiersFromEvent(event);


    if (event?.balanceBonus) {
        gameState.city.balance += event.balanceBonus;
    }

    const calcEnergyResult = calcEnergy(gameState.buildings, gameState.region, gameState.eventModifiers);

    gameState.history = [...gameState.history, {
        action: "TURN_ADVANCED",
        lastTurn: gameState.turn - 1,
        turn: gameState.turn,
        city: gameState.city.name,
        lastBalance: gameState.city.balance - gameState.city.turnIncome,
        newBalance: gameState.city.balance,
        turnIncome: gameState.city.turnIncome,
        eventKey: event?.key,
        eventName: event?.name,
        energy: calcEnergyResult.energy,
        demand: calcEnergyResult.demand,
        coverage: calcEnergyResult.coverage,
    }]
};