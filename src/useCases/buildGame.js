import { BUILDINGS } from "../data/buildings.js";
import { EVENTS } from "../data/events.js";
import { REGIONS } from "../data/regions.js";
import Building from "../entities/building.js";
import City from "../entities/city.js";
import Event from "../entities/event.js";
import Player from "../entities/player.js";
import Region from "../entities/region.js";

export const buildGame = (name, avatar, regionName, gameState) => {
    const regionSelected = REGIONS.find(item => item.name === regionName);

    if (!regionSelected) {
        throw new Error(`Region "${regionName}" not found`);
    }

    const player = new Player({ name, avatar });

    const region = new Region({
        name: regionSelected.name,
        solar: regionSelected.mults.solar,
        wind: regionSelected.mults.wind,
        biomass: regionSelected.mults.biomass,
        events: regionSelected.events,
    });

    const city = new City({
        name: regionSelected.city.name,
        balance: regionSelected.city.balance,
        income: regionSelected.city.incomeRate,
    });

    const buildings = BUILDINGS
        .filter(item => item.role === "consumer")
        .map(
            item =>
                new Building({
                    name: item.name,
                    key: item.key,
                    role: item.role,
                    type: item.type,
                    description: item.description,
                    capacity: item.capacity,
                    cost: item.cost,
                })
        );

    const events = EVENTS
        .filter(item => region.events.includes(item.key))
        .map(
            item =>
                new Event({
                    name: item.name,
                    key: item.key,
                    description: item.description,
                    direction: item.direction,
                    solarEffect: item.solarEffect,
                    windEffect: item.windEffect,
                    biomassEffect: item.biomassEffect,
                    balanceBonus: item.balanceBonus,
                    demandBonus: item.demandBonus,
                    probability: item.probability,
                })
        );

    gameState.player = player;
    gameState.region = region;
    gameState.city = city;
    gameState.buildings = buildings;
    gameState.events = events;

    return gameState;
};