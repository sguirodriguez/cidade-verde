export default class Region {
    name;
    solar;
    wind;
    biomass;
    events;

    constructor({ name, solar, wind, biomass, events }) {
        this.name = name;
        this.solar = solar;
        this.wind = wind;
        this.biomass = biomass;
        this.events = events;
    }

    get multipliers() {
        return {
            solar: this.solar,
            wind: this.wind,
            biomass: this.biomass
        }
    }
}

