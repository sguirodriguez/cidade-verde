const BY_TURN = {
    2: ["house", "house"],
    3: ["house"],
    4: ["house", "factory"],
    5: ["house", "house"],
    6: ["factory"],
    7: ["house", "school"],
    8: ["house", "house"],
    9: ["factory"],
    10: ["house", "hospital"],
    11: ["house", "house"],
    12: ["factory", "house"],
};

export const extraConsumersOnTurn = (turn) => {
    if (turn < 2) return [];
    return BY_TURN[turn] ?? ["house"];
};
