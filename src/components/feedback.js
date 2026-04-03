import { formatCurrency } from './format.js';

const DEFAULT_TOAST_MS = 3500;
const DEFAULT_MODAL_MS = 4000;

let toastSeq = 0;
let roundFeedbackTimer = null;

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function scheduleRemove(node, ms) {
  const id = ++toastSeq;
  const t = window.setTimeout(() => {
    if (node?.isConnected) node.classList.add('feedback-leave');
    window.setTimeout(() => {
      if (toastSeq === id) node?.remove();
    }, 280);
  }, ms);
  return t;
}

export function showToast(message, options = {}) {
  const stack = document.getElementById('toast-stack');
  if (!stack) return;

  const duration = options.duration ?? DEFAULT_TOAST_MS;
  const type = options.type ?? 'info';

  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.setAttribute('role', 'status');
  el.innerHTML = `
    <span class="toast__text">${escapeHtml(message)}</span>
    <button type="button" class="toast__close" aria-label="Fechar">×</button>`;

  const removeNow = () => {
    el.classList.add('feedback-leave');
    window.setTimeout(() => el.remove(), 280);
  };

  el.querySelector('.toast__close').addEventListener('click', removeNow);
  stack.appendChild(el);
  requestAnimationFrame(() => el.classList.add('toast--in'));

  scheduleRemove(el, duration);
}

export function eventImpactLines(event) {
  if (!event) return [];
  const lines = [];
  if (event.solarEffect != null && event.solarEffect !== 1) {
    lines.push(`☀️ Geração solar ×${event.solarEffect} neste turno`);
  }
  if (event.windEffect != null && event.windEffect !== 1) {
    lines.push(`💨 Geração eólica ×${event.windEffect} neste turno`);
  }
  if (event.biomassEffect != null && event.biomassEffect !== 1) {
    lines.push(`🌿 Geração biomassa ×${event.biomassEffect} neste turno`);
  }
  if (event.demandBonus) {
    lines.push(`⚡ Demanda +${event.demandBonus} MW neste turno`);
  }
  if (event.balanceBonus) {
    lines.push(`💰 Verba extra ${formatCurrency(event.balanceBonus)}`);
  }
  if (!lines.length) {
    lines.push('Efeito neutro neste turno.');
  }
  return lines;
}

function roundScoreFrom(current) {
  return Math.round((current.coverage ?? 0) * 10 + (current.balance ?? 0) / 40);
}

export function showRoundFeedback({ previous, current, event }) {
  const overlay = document.getElementById('round-feedback');
  const appRoot = document.getElementById('app-root');
  if (!overlay) return;

  const deltaBalance = (current.balance ?? 0) - (previous.balance ?? 0);
  const deltaCoverage = (current.coverage ?? 0) - (previous.coverage ?? 0);
  const score = roundScoreFrom(current);

  const deltaBalStr =
    deltaBalance >= 0 ? `+${formatCurrency(deltaBalance)}` : `−${formatCurrency(Math.abs(deltaBalance))}`;
  const deltaCovStr = `${deltaCoverage >= 0 ? '+' : ''}${deltaCoverage.toFixed(1)}%`;

  const directionClass =
    event?.direction === 'UP' ? 'up' : event?.direction === 'DOWN' ? 'down' : 'neutral';

  const impactHtml = event
    ? `
    <div class="round-feedback__event event-banner ${directionClass}">
      <div class="event-name">${escapeHtml(event.name)}</div>
      <div class="event-desc">${escapeHtml(event.description)}</div>
      <ul class="round-feedback__impact">
        ${eventImpactLines(event)
          .map(line => `<li>${escapeHtml(line)}</li>`)
          .join('')}
      </ul>
    </div>`
    : '';

  overlay.innerHTML = `
    <div class="round-feedback__backdrop" data-close-round-feedback></div>
    <div class="round-feedback__card" role="dialog" aria-modal="true" aria-labelledby="round-feedback-title">
      <button type="button" class="round-feedback__x" aria-label="Fechar">×</button>
      <h3 id="round-feedback-title" class="round-feedback__title">Turno ${current.turn}</h3>
      <div class="round-feedback__summary">
        <div class="round-feedback__metric">
          <span class="round-feedback__label">Variação de saldo</span>
          <span class="round-feedback__value ${deltaBalance >= 0 ? 'clr-green' : 'clr-red'}">${deltaBalStr}</span>
        </div>
        <div class="round-feedback__metric">
          <span class="round-feedback__label">Cobertura</span>
          <span class="round-feedback__value">${deltaCovStr}</span>
        </div>
        <div class="round-feedback__metric">
          <span class="round-feedback__label">Índice</span>
          <span class="round-feedback__value clr-yellow">${score}</span>
        </div>
      </div>
      ${impactHtml}
    </div>`;

  const close = () => {
    if (roundFeedbackTimer != null) {
      window.clearTimeout(roundFeedbackTimer);
      roundFeedbackTimer = null;
    }
    overlay.classList.remove('round-feedback--open', 'round-feedback--shake');
    overlay.innerHTML = '';
    document.body.classList.remove('body-flash');
    appRoot?.classList.remove('app--shake');
  };

  if (roundFeedbackTimer != null) {
    window.clearTimeout(roundFeedbackTimer);
    roundFeedbackTimer = null;
  }

  overlay.classList.add('round-feedback--open', 'round-feedback--shake');
  document.body.classList.add('body-flash');
  appRoot?.classList.add('app--shake');
  window.setTimeout(() => {
    overlay.classList.remove('round-feedback--shake');
    document.body.classList.remove('body-flash');
    appRoot?.classList.remove('app--shake');
  }, 420);

  overlay.querySelectorAll('[data-close-round-feedback], .round-feedback__x').forEach(btn => {
    btn.addEventListener('click', close);
  });

  roundFeedbackTimer = window.setTimeout(close, DEFAULT_MODAL_MS);
}

export function triggerBuildingPurchaseAnimation(buildingKey) {
  const card = document.querySelector(`.bld-card[data-building-key="${buildingKey}"]`);
  if (!card) return;
  card.classList.remove('bld-card--pop');
  void card.offsetWidth;
  card.classList.add('bld-card--pop');
  window.setTimeout(() => card.classList.remove('bld-card--pop'), 600);
}
