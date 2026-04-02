export const createGameState = ({
    maxTurns = 12,
    winCoverageThreshold = 70,
} = {}) => ({
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
    maxTurns,
    phase: "playing",
    outcome: null,
    winCoverageThreshold,
    history: [],
});
