import { HISTORY_KEY } from '../constants/index.js';
import { AVATARS } from '../data/avatars.js';
import { getGameResults } from '../useCases/gameResults.js';
import { formatCurrency } from './format.js';

export function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveMatchToHistory(gameState) {
  const results = getGameResults(gameState);
  if (!results.outcome) return;

  const matchedAvatar = AVATARS.find(avatar => avatar.key === gameState.player?.avatar);
  const entry = {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    region: gameState.region?.name ?? '—',
    city: gameState.city?.name ?? '—',
    avatar: matchedAvatar?.name ?? gameState.player?.avatar ?? '—',
    result: results.outcome.result,
    reason: results.outcome.reason,
    turns: gameState.turn,
    balance: results.outcome.stats?.balance ?? 0,
    coverage: results.outcome.stats?.coverage ?? 0,
  };

  const history = loadHistory();
  history.unshift(entry);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20)));
}

export function renderHistory() {
  const list = document.getElementById('history-list');
  const history = loadHistory();

  if (!history.length) {
    list.innerHTML = '<p class="dim tc history-empty">Nenhuma partida concluída ainda.</p>';
    return;
  }

  list.innerHTML = history.map(entry => {
    const date = new Date(entry.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    const resultModifierClass = entry.result === 'victory' ? 'victory' : 'defeat';
    const resultLabel = resultModifierClass === 'victory' ? 'Vitória' : 'Derrota';

    return `
      <div class="hist-item">
        <div>
          <div class="bold sm">${entry.city} · ${entry.region}</div>
          <div class="xs dim mt4">${entry.avatar} · ${entry.turns} turnos · ${formatCurrency(entry.balance)}</div>
          <div class="xs dim">${date}</div>
        </div>
        <div class="hist-badge ${resultModifierClass}">${resultLabel}</div>
      </div>`;
  }).join('');
}
