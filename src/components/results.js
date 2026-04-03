import { BUILDING_ICONS } from '../assets/buildingIcons.js';
import { REASON_LABELS } from '../constants/index.js';
import { AVATARS } from '../data/avatars.js';
import { getGameResults } from '../useCases/gameResults.js';
import { gameState } from '../session.js';
import { formatCurrency } from './format.js';

export function renderResults() {
  const results = getGameResults(gameState);
  const outcome = results.outcome;
  const isVictory = outcome?.result === 'victory';

  renderResultBanner(isVictory, outcome);
  renderResultSummary(outcome);
  renderLogs();
}

function renderResultBanner(isVictory, outcome) {
  const bannerElement = document.getElementById('result-banner');
  bannerElement.className = `result-banner ${isVictory ? 'victory' : 'defeat'}`;
  bannerElement.innerHTML = `
    <div class="result-emoji">${isVictory ? '🏆' : '💔'}</div>
    <div class="result-title ${isVictory ? 'clr-green' : 'clr-red'}">${isVictory ? 'Vitória!' : 'Derrota'}</div>
    <div class="result-reason dim">${REASON_LABELS[outcome?.reason] ?? outcome?.reason ?? ''}</div>`;
}

function renderResultSummary(outcome) {
  const matchedAvatar = AVATARS.find(avatar => avatar.key === gameState.player?.avatar);
  const stats = outcome?.stats ?? {};

  const rows = [
    ['Região', `${gameState.region?.name} — ${gameState.city?.name}`],
    ['Personagem', `${matchedAvatar?.icon ?? ''} ${matchedAvatar?.name ?? gameState.player?.avatar}`],
    ['Turnos jogados', `${gameState.turn} / ${gameState.maxTurns}`],
    ['Saldo final', formatCurrency(stats.balance ?? gameState.city?.balance ?? 0)],
    ['Cobertura final', `${(stats.coverage ?? 0).toFixed(1)}%`],
  ];

  document.getElementById('result-summary').innerHTML = rows.map(([label, displayValue]) => `
    <div class="row row-apart">
      <span class="xs dim">${label}</span>
      <span class="xs bold">${displayValue}</span>
    </div>`).join('');
}

function renderLogs() {
  const lines = gameState.history.map(entry => {
    if (entry.action === 'TURN_ADVANCED') {
      const coverageDisplay = entry.current.coverage.toFixed(1);
      const balanceDisplay = formatCurrency(entry.current.balance);
      const demandGrowthSuffix = entry.current.demandGrowthKeys?.length
        ? ` · +${entry.current.demandGrowthKeys.map(buildingKey => BUILDING_ICONS[buildingKey] ?? buildingKey).join('')}`
        : '';
      return `Turno ${entry.current.turn}: Saldo ${balanceDisplay} · Cobertura ${coverageDisplay}%${demandGrowthSuffix}`;
    }
    if (entry.action === 'BUILDING_PURCHASED') {
      const icon = BUILDING_ICONS[entry.buildingKey] ?? '🏭';
      return `Turno ${entry.turn}: Comprou ${icon} ${entry.buildingName} (−${formatCurrency(entry.buildingCost)})`;
    }
    if (entry.action === 'GAME_ENDED') {
      const outcomeLabel = entry.outcome?.result === 'victory' ? '✅ Vitória' : '❌ Derrota';
      return `Turno ${entry.turn}: ${outcomeLabel} — ${REASON_LABELS[entry.outcome?.reason] ?? ''}`;
    }
    return null;
  }).filter(Boolean);

  document.getElementById('result-logs').innerHTML = lines.length
    ? lines.map(logLine => `<div>${logLine}</div>`).join('')
    : '<div class="dim">Nenhum evento registrado.</div>';
}
