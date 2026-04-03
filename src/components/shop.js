import { BUILDING_ICONS } from '../assets/buildingIcons.js';
import { PRODUCER_BUILDINGS } from '../data/producerBuildings.js';
import { buyBuilding } from '../useCases/buyBuilding.js';
import { isGameOver } from '../useCases/gameEnd.js';
import { gameState } from '../session.js';
import { saveMatchToHistory } from './history.js';
import { renderResults } from './results.js';
import { showScreen } from './navigation.js';
import { showToast, triggerBuildingPurchaseAnimation } from './feedback.js';
import { formatCurrency } from './format.js';

export function renderShop() {
  document.getElementById('shop-balance').textContent = formatCurrency(gameState.city.balance);

  const list = document.getElementById('shop-list');
  list.innerHTML = PRODUCER_BUILDINGS.map(building => {
    const canAfford = gameState.city.balance >= building.cost;
    const icon = BUILDING_ICONS[building.key] ?? '🏭';
    return `
      <div class="bld-card" data-building-key="${building.key}">
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
      const key = buyButton.dataset.key;
      const result = buyBuilding(key, gameState);
      if (result?.status === 'FAILED') {
        showToast('Saldo insuficiente para esta usina.', { type: 'error' });
        renderShop();
        return;
      }
      if (result?.status === 'GAME_OVER') {
        renderShop();
        return;
      }
      const bought = PRODUCER_BUILDINGS.find(b => b.key === key);
      if (bought) {
        showToast(`${bought.name} construída! +${bought.capacity} MW`, { type: 'success' });
        triggerBuildingPurchaseAnimation(key);
      }
      renderShop();
      if (isGameOver(gameState)) {
        saveMatchToHistory(gameState);
        renderResults();
        showScreen('results');
      }
    });
  });
}
