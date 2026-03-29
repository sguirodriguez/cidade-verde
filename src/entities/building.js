import { v4 as uuidv4 } from 'uuid';

export default class Building {
    id;
    key;
    name;
    description;
    role;
    type;
    capacity;
    cost;

    constructor({ name, key, description, role, type, capacity, cost }) {
        this.id = uuidv4(),
            this.key = key,
            this.name = name;
        this.description = description;
        this.role = role;
        this.type = type;
        this.capacity = capacity;
        this.cost = cost;
    }

    get info() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            role: this.role,
            type: this.type,
            capacity: this.capacity,
            cost: this.cost
        }
    }
}

