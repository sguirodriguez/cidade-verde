import { BUILDINGS } from "../data/buildings.js";
import { EVENTS } from "../data/events.js";
import { REGIONS } from "../data/regions.js";
import Building from "../entities/building.js";
import City from "../entities/city.js";
import Event from "../entities/event.js";
import Player from "../entities/player.js";
import Region from "../entities/region.js";

export const buildGame = (name, avatar, regionName, gameState) => {

    const player = new Player({ name, avatar });

    gameState.player = player;

    const regions = REGIONS

    const regionSelected = regions.filter(item => item.name === regionName)?.[0];

    const region = new Region({
        name: regionSelected.name,
        solar: regionSelected.mults.solar,
        wind: regionSelected.mults.wind,
        biomass: regionSelected.mults.biomass,
        events: regionSelected.events
    })

    const city = new City({
        name: regionSelected.city.name,
        balance: regionSelected.city.balance,
        income: regionSelected.city.incomeRate
    })

    gameState.region = region
    gameState.city = city


    const consumerBuildings = BUILDINGS.filter(item => item.role == "consumer")

    let buildings = []

    for (const element of consumerBuildings) {
        const building = new Building({
            name: element.name,
            key: element.key,
            role: element.role,
            type: element.type,
            description: element.description,
            capacity: element.capacity,
            cost: element.cost
        })

        buildings.push(building)
    }

    gameState.buildings = buildings

    const eventsInRegion = EVENTS.filter(item => region.events.includes(item.key))

    let events = []
    for (const element of eventsInRegion) {
        const event = new Event({
            name: element.name,
            key: element.key,
            description: element.description,
            direction: element.direction,
            solarEffect: element.solarEffect,
            windEffect: element.windEffect,
            biomassEffect: element.biomassEffect,
            balanceBonus: element.balanceBonus,
            demandBonus: element.demandBonus,
            probability: element.probability,
        })

        events.push(event)
    }

    gameState.events = events;
}