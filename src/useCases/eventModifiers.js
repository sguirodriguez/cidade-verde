export const defaultEventModifiers = () => ({
    solarEffect: 1,
    windEffect: 1,
    biomassEffect: 1,
    demandBonus: 0,
});

export const modifiersFromEvent = (event) => {
    if (!event) return defaultEventModifiers();
    return {
        solarEffect: event.solarEffect ?? 1,
        windEffect: event.windEffect ?? 1,
        biomassEffect: event.biomassEffect ?? 1,
        demandBonus: event.demandBonus ?? 0,
    };
};
