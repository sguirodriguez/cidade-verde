export const calcEnergy = (buildings, region, eventModifiers = {}) => {
    const solarEffect = eventModifiers.solarEffect ?? 1;
    const windEffect = eventModifiers.windEffect ?? 1;
    const biomassEffect = eventModifiers.biomassEffect ?? 1;
    const demandBonus = eventModifiers.demandBonus ?? 0;

    const producerTypeEffect = (type) => {
        if (type === "solar") return solarEffect;
        if (type === "wind") return windEffect;
        if (type === "biomass") return biomassEffect;
        return 1;
    };

    const result = buildings.reduce(
        (accumulator, item) => {
            if (item.role === "consumer") {
                accumulator.demand += item.capacity;
            }

            if (item.role === "producer") {
                const base = region?.[item.type];
                accumulator.energy +=
                    item.capacity * base * producerTypeEffect(item.type);
            }

            return accumulator;
        },
        {
            energy: 0,
            demand: 0,
        },
    );

    const totalDemand = result.demand + demandBonus;

    const coverage =
        totalDemand === 0
            ? 0
            : Number(((result.energy / totalDemand) * 100).toFixed(2));

    return {
        ...result,
        demand: totalDemand,
        coverage,
    };
};
