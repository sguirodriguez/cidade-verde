export const calcEnergy = (buildings, region) => {
    const result = buildings.reduce(
        (accumulator, item) => {
            if (item.role === 'consumer') {
                accumulator.demand += item.capacity;
            }

            if (item.role === 'producer') {
                const findMultiplier = region?.[item.type]
                accumulator.energy += item.capacity * findMultiplier;
            }

            return accumulator;
        },
        {
            energy: 0,
            demand: 0,
        },
    );

    const coverage =
        result.demand === 0
            ? 0
            : Number(((result.energy / result.demand) * 100).toFixed(2));

    return {
        ...result,
        coverage,
    };
};
