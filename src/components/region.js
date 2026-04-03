import { REGIONS } from '../data/regions.js';
import { gameState } from '../session.js';
import { formatCurrency } from './format.js';

export function renderRegionList() {
  const list = document.getElementById('region-list');

  const producerTypeLabels = { solar: '☀️ Solar', wind: '💨 Eólica', biomass: '🌿 Biomassa' };

  list.innerHTML = REGIONS.map(region => {
    const tags = Object.entries(region.mults).map(([producerType, multiplier]) => {
      const tagModifierClass = multiplier > 1 ? 'boost' : multiplier < 1 ? 'weaken' : '';
      return `<span class="tag ${tagModifierClass}">${producerTypeLabels[producerType] ?? producerType} ×${multiplier}</span>`;
    }).join('');

    return `
      <div class="region-card" data-name="${region.name}">
        <div class="region-head">
          <div>
            <div class="bold sm">${region.name}</div>
            <div class="xs dim mt4">${region.city.name}</div>
          </div>
          <div class="xs dim text-right">
            Saldo inicial<br><strong class="clr-yellow">${formatCurrency(region.city.balance)}</strong>
          </div>
        </div>
        <p class="xs mt8">${region.description}</p>
        <div class="tags">${tags}</div>
      </div>`;
  }).join('');

  list.querySelectorAll('.region-card').forEach(card => {
    card.addEventListener('click', () => {
      list.querySelectorAll('.region-card').forEach(otherCard => otherCard.classList.remove('active'));
      card.classList.add('active');
      gameState.uiSelections.region = REGIONS.find(region => region.name === card.dataset.name);
      document.getElementById('btn-start-game').disabled = false;
    });
  });
}
