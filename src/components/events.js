import { gameState, resetGameSession } from '../session.js';
import { buildGame } from '../useCases/buildGame.js';
import { advanceTurn } from '../useCases/advanceTurn.js';
import { isGameOver } from '../useCases/gameEnd.js';
import { renderAvatarDesc, renderAvatarGrid, updateConfirmButton } from './character.js';
import { renderHistory, saveMatchToHistory } from './history.js';
import { showScreen } from './navigation.js';
import { renderMap } from './map.js';
import { renderRegionList } from './region.js';
import { renderResults } from './results.js';
import { showRoundFeedback } from './feedback.js';
import { renderShop } from './shop.js';

function resetCharacterFlow() {
  resetGameSession();
  document.getElementById('player-name').value = '';
  document.getElementById('btn-confirm-avatar').disabled = true;
  renderAvatarDesc();
  renderAvatarGrid();
}

export function wireEvents() {
  document.getElementById('btn-play').addEventListener('click', () => {
    resetCharacterFlow();
    showScreen('character');
  });

  document.getElementById('btn-stats').addEventListener('click', () => {
    renderHistory();
    showScreen('history');
  });

  document.getElementById('btn-history-back').addEventListener('click', () => showScreen('start'));

  document.getElementById('player-name').addEventListener('input', updateConfirmButton);

  document.getElementById('btn-confirm-avatar').addEventListener('click', () => {
    gameState.uiSelections.region = null;
    document.getElementById('btn-start-game').disabled = true;
    renderRegionList();
    showScreen('region');
  });

  document.getElementById('btn-start-game').addEventListener('click', () => {
    const playerName = document.getElementById('player-name').value.trim() || 'Jogador';
    const { avatar, region } = gameState.uiSelections;
    resetGameSession();
    buildGame(playerName, avatar.key, region.name, gameState);

    if (avatar.balanceBonus) {
      gameState.city.balance += avatar.balanceBonus;
    }

    renderMap();
    showScreen('map');
  });

  document.getElementById('btn-open-shop').addEventListener('click', () => {
    renderShop();
    showScreen('shop');
  });

  document.getElementById('btn-advance').addEventListener('click', () => {
    advanceTurn(gameState);

    if (isGameOver(gameState)) {
      saveMatchToHistory(gameState);
      renderResults();
      showScreen('results');
      return;
    }

    renderMap();

    const lastEntry = gameState.history[gameState.history.length - 1];
    if (lastEntry?.action === 'TURN_ADVANCED') {
      showRoundFeedback({
        previous: lastEntry.previous,
        current: lastEntry.current,
        event: gameState.event,
      });
    }
  });

  document.getElementById('btn-close-shop').addEventListener('click', () => {
    renderMap();
    showScreen('map');
  });

  document.getElementById('btn-toggle-logs').addEventListener('click', () => {
    const logsPanel = document.getElementById('result-logs');
    const toggleLogsButton = document.getElementById('btn-toggle-logs');
    const logsPanelWasVisible = !logsPanel.classList.contains('hidden');
    logsPanel.classList.toggle('hidden');
    toggleLogsButton.textContent = logsPanelWasVisible ? 'Ver Registro de Eventos ▼' : 'Ocultar Registro ▲';
  });

  document.getElementById('btn-new-game').addEventListener('click', () => {
    resetCharacterFlow();
    showScreen('character');
  });

  document.getElementById('btn-go-start').addEventListener('click', () => showScreen('start'));
}
