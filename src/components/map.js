import { calcEnergy } from '../useCases/calcEnergy.js';
import { isGameOver } from '../useCases/gameEnd.js';
import { gameState } from '../session.js';
import { coverageClass, eventDirectionClass, formatCurrency } from './format.js';

const COVERAGE_CRITICAL = 40;

function updateCoverageAlert(coveragePercent) {
  const alertEl = document.getElementById('map-coverage-alert');
  if (!alertEl) return;

  const threshold = gameState.winCoverageThreshold ?? 70;
  const belowMeta = coveragePercent < threshold;
  const critical = coveragePercent < COVERAGE_CRITICAL;

  if (!belowMeta) {
    alertEl.classList.add('hidden');
    alertEl.classList.remove('coverage-alert--pulse', 'coverage-alert--critical');
    return;
  }

  alertEl.classList.remove('hidden');
  alertEl.innerHTML = `
    <span class="coverage-alert__icon" aria-hidden="true">⚠️</span>
    <span class="coverage-alert__text">
      ${
        critical
          ? `Cobertura crítica (${coveragePercent.toFixed(1)}%). Amplie a geração urgentemente.`
          : `Cobertura abaixo da meta de ${threshold}% (${coveragePercent.toFixed(1)}%).`
      }
    </span>`;
  alertEl.classList.toggle('coverage-alert--critical', critical);
  alertEl.classList.toggle('coverage-alert--pulse', true);
}

export function renderMap() {
  const energyMetrics = calcEnergy(gameState.buildings, gameState.region, gameState.eventModifiers);
  const coveragePercent = energyMetrics.coverage;

  document.getElementById('map-city-name').textContent = gameState.city.name;
  document.getElementById('map-region-name').textContent = `Região ${gameState.region.name}`;

  const producerTypeLabels = { solar: '☀️ Solar', wind: '💨 Eólica', biomass: '🌿 Biomassa' };
  const multsEl = document.getElementById('map-region-mults');
  if (multsEl && gameState.region) {
    const entries = [
      ['solar', gameState.region.solar],
      ['wind', gameState.region.wind],
      ['biomass', gameState.region.biomass],
    ];
    multsEl.innerHTML = entries
      .map(([key, value]) => {
        const tagClass = value > 1 ? 'boost' : value < 1 ? 'weaken' : '';
        const label = producerTypeLabels[key] ?? key;
        return `<span class="tag ${tagClass}">${label} ×${value}</span>`;
      })
      .join('');
  }

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

  updateCoverageAlert(coveragePercent);

  document.getElementById('map-producers').textContent = gameState.buildings.filter(
    building => building.role === 'producer',
  ).length;
  document.getElementById('map-consumers').textContent = gameState.buildings.filter(
    building => building.role === 'consumer',
  ).length;

  renderMapEvent();

  const gameHasEnded = isGameOver(gameState);
  const advanceBtn = document.getElementById('btn-advance');
  advanceBtn.disabled = gameHasEnded;
  document.getElementById('btn-open-shop').disabled = gameHasEnded;
  advanceBtn.textContent =
    !gameHasEnded && gameState.turn >= gameState.maxTurns
      ? 'Encerrar partida →'
      : 'Avançar Turno →';
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
