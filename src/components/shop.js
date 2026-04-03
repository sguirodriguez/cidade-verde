import { BUILDING_ICONS } from '../assets/buildingIcons.js';
import { PRODUCER_BUILDINGS } from '../data/producerBuildings.js';
import { buyBuilding } from '../useCases/buyBuilding.js';
import { gameState } from '../session.js';
import { formatCurrency } from './format.js';

export function renderShop() {
  document.getElementById('shop-balance').textContent = formatCurrency(gameState.city.balance);

  const list = document.getElementById('shop-list');
  list.innerHTML = PRODUCER_BUILDINGS.map(building => {
    const canAfford = gameState.city.balance >= building.cost;
    const icon = BUILDING_ICONS[building.key] ?? '🏭';
    return `
      <div class="bld-card">
        <div class="bld-icon">${icon}</div>
        <div class="bld-info">
          <div class="bld-name">${building.name}</div>
          <div class="bld-desc">${building.description}</div>
          <div class="bld-cost">Custo: ${formatCurrency(building.cost)} · +${building.capacity} MW base</div>
        </div>
        <button class="btn btn-buy" data-key="${building.key}" ${canAfford ? '' : 'disabled'}>Comprar</button>
      </div>`;
  }).join('');

  list.querySelectorAll('[data-key]').forEach(buyButton => {
    buyButton.addEventListener('click', () => {
      buyBuilding(buyButton.dataset.key, gameState);
      renderShop();
    });
  });
}
