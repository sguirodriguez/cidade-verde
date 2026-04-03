import { calcEnergy } from '../useCases/calcEnergy.js';
import { isGameOver } from '../useCases/gameEnd.js';
import { gameState } from '../session.js';
import { coverageClass, eventDirectionClass, formatCurrency } from './format.js';

export function renderMap() {
  const energyMetrics = calcEnergy(gameState.buildings, gameState.region, gameState.eventModifiers);
  const coveragePercent = energyMetrics.coverage;

  document.getElementById('map-city-name').textContent = gameState.city.name;
  document.getElementById('map-region-name').textContent = `Região ${gameState.region.name}`;
  document.getElementById('map-turn').textContent = `Turno ${gameState.turn}/${gameState.maxTurns}`;
  document.getElementById('map-balance').textContent = formatCurrency(gameState.city.balance);
  document.getElementById('map-energy').textContent = `${Math.round(energyMetrics.energy)} MW`;
  document.getElementById('map-demand').textContent = `${Math.round(energyMetrics.demand)} MW`;

  const coverageElement = document.getElementById('map-coverage');
  coverageElement.textContent = `${coveragePercent.toFixed(1)}%`;
  coverageElement.className = `stat-value ${coverageClass(coveragePercent)}`;

  const progressBar = document.getElementById('map-prog');
  progressBar.style.width = `${Math.min(coveragePercent, 100)}%`;
  progressBar.className = `prog-bar ${coverageClass(coveragePercent)}`;
  document.getElementById('map-prog-label').textContent = `${coveragePercent.toFixed(1)}%`;

  document.getElementById('map-producers').textContent = gameState.buildings.filter(
    building => building.role === 'producer',
  ).length;
  document.getElementById('map-consumers').textContent = gameState.buildings.filter(
    building => building.role === 'consumer',
  ).length;

  renderMapEvent();

  const gameHasEnded = isGameOver(gameState);
  document.getElementById('btn-advance').disabled = gameHasEnded;
  document.getElementById('btn-open-shop').disabled = gameHasEnded;
}

export function renderMapEvent() {
  const eventContainer = document.getElementById('map-event');
  if (!gameState.event) {
    eventContainer.classList.add('hidden');
    return;
  }

  const directionModifierClass = eventDirectionClass(gameState.event.direction);
  eventContainer.innerHTML = `
    <div class="event-banner ${directionModifierClass}">
      <div class="event-name">${gameState.event.name}</div>
      <div class="event-desc">${gameState.event.description}</div>
    </div>`;
  eventContainer.classList.remove('hidden');
}
