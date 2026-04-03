import { calcEnergy } from "./calcEnergy.js";

const appendEndHistory = (gameState, outcome) => {
    gameState.history = [
        ...gameState.history,
        {
            action: "GAME_ENDED",
            turn: gameState.turn,
            city: gameState.city?.name,
            outcome,
        },
    ];
};

const snapshotStats = (gameState) => {
    const grid = calcEnergy(
        gameState.buildings,
        gameState.region,
        gameState.eventModifiers,
    );
    return {
        balance: gameState.city.balance,
        turn: gameState.turn,
        maxTurns: gameState.maxTurns,
        energy: grid.energy,
        demand: grid.demand,
        coverage: grid.coverage,
        buildings: gameState.buildings.length,
    };
};

const resolveTimeUpOutcome = (gameState, stats) => {
    const threshold = gameState.winCoverageThreshold ?? 70;
    if (stats.balance < 0) {
        return {
            result: "defeat",
            reason: "bankruptcy",
        };
    }
    if (stats.coverage >= threshold) {
        return {
            result: "victory",
            reason: "sustainable_grid",
        };
    }
    return {
        result: "defeat",
        reason: "insufficient_coverage",
    };
};

export const tryFinalizeGame = (gameState) => {
    if (gameState.phase === "ended" || !gameState.city) {
        return;
    }
    if (gameState.city.balance >= 0) {
        return;
    }

    const stats = snapshotStats(gameState);
    gameState.phase = "ended";
    gameState.outcome = {
        result: "defeat",
        reason: "bankruptcy",
        stats,
    };
    appendEndHistory(gameState, gameState.outcome);
};

export const finalizeMatchAtTurnLimit = (gameState) => {
    if (gameState.phase === "ended" || !gameState.city) {
        return;
    }

    const stats = snapshotStats(gameState);

    if (gameState.city.balance < 0) {
        gameState.phase = "ended";
        gameState.outcome = {
            result: "defeat",
            reason: "bankruptcy",
            stats,
        };
        appendEndHistory(gameState, gameState.outcome);
        return;
    }

    gameState.phase = "ended";
    const resolution = resolveTimeUpOutcome(gameState, stats);
    gameState.outcome = { ...resolution, stats };
    appendEndHistory(gameState, gameState.outcome);
};

export const isGameOver = (gameState) => gameState.phase === "ended";
