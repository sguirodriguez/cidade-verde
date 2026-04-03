import { BUILDINGS } from './buildings.js';

export const PRODUCER_BUILDINGS = BUILDINGS.filter(building => building.role === 'producer');
