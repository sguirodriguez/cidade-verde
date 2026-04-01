import { EVENTS } from "../data/events.js";
import Event from "../entities/event.js";

const VALID_REGION_SLUGS = new Set(["nordeste", "sul", "sudeste", "norte"]);

const findEventByKey = (eventKey) => EVENTS.find((e) => e.key === eventKey);

const regionNameToSlug = (regionName) => {
    if (!regionName) return null;
    const slug = regionName
        .normalize("NFD")
        .replace(/\p{M}/gu, "")
        .toLowerCase();
    return VALID_REGION_SLUGS.has(slug) ? slug : null;
};

const probabilityWeight = (eventKey, regionSlug) => {
    const value = findEventByKey(eventKey)?.probability?.[regionSlug];
    return typeof value === "number" && value > 0 ? value : 0;
};

const asProbabilityMasses = (weights) => {
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    if (total <= 0) return null;
    return weights.map((weight) => weight / total);
};

const uniformMasses = (count) => Array.from({ length: count }, () => 1 / count);

const sampleIndex = (masses) => {
    let roll = Math.random();
    for (let i = 0; i < masses.length; i++) {
        roll -= masses[i];
        if (roll <= 0) return i;
    }
    return masses.length - 1;
};

const sampleWeightedKey = (allowedKeys, regionSlug) => {
    if (!allowedKeys?.length) return null;

    const weights = allowedKeys.map((key) => probabilityWeight(key, regionSlug));
    const masses = asProbabilityMasses(weights) ?? uniformMasses(allowedKeys.length);

    return allowedKeys[sampleIndex(masses)];
};

export const diceEvents = (allowedEventKeys, regionName) => {
    const regionSlug = regionNameToSlug(regionName);
    const chosenKey = sampleWeightedKey(allowedEventKeys, regionSlug);
    const definition = chosenKey ? findEventByKey(chosenKey) : null;

    return definition ? new Event(definition) : null;
};
