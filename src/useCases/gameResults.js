export const getGameResults = (gameState) => {
    const snapshot = {
        phase: gameState.phase,
        turn: gameState.turn,
        maxTurns: gameState.maxTurns,
        winCoverageThreshold: gameState.winCoverageThreshold ?? 70,
        cityName: gameState.city?.name ?? null,
        balance: gameState.city?.balance ?? null,
    };

    if (gameState.phase !== "ended" || !gameState.outcome) {
        return { ...snapshot, outcome: null };
    }

    const { result, reason, stats } = gameState.outcome;
    return {
        ...snapshot,
        outcome: {
            result,
            reason,
            stats: { ...stats },
        },
    };
};
