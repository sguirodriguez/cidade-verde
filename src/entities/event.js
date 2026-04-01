import { v4 as uuidv4 } from 'uuid';

export default class Event {
    id;
    key;
    name;
    description;
    direction;
    solarEffect;
    windEffect;
    biomassEffect;
    balanceBonus;
    demandBonus;
    probability;

    constructor({ key, name, description, direction, windEffect, solarEffect, biomassEffect, balanceBonus, demandBonus, probability }) {
        this.id = uuidv4();
        this.key = key;
        this.name = name;
        this.description = description;
        this.direction = direction;
        this.solarEffect = solarEffect;
        this.windEffect = windEffect;
        this.biomassEffect = biomassEffect;
        this.balanceBonus = balanceBonus;
        this.demandBonus = demandBonus;
        this.probability = probability;
    }

    get info() {
        return {
            id: this.id,
            key: this.key,
            name: this.name,
            description: this.description,
            direction: this.direction,
            solarEffect: this.solarEffect,
            windEffect: this.windEffect,
            biomassEffect: this.biomassEffect,
            balanceBonus: this.balanceBonus,
            demandBonus: this.demandBonus,
            probability: this.probability,
        };
    }
}

