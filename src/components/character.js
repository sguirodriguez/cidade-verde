import { AVATARS } from '../data/avatars.js';
import { gameState } from '../session.js';

export function renderAvatarGrid() {
  const avatarGrid = document.getElementById('avatar-grid');
  avatarGrid.innerHTML = AVATARS.map(avatarOption => `
    <div class="avatar-card" data-key="${avatarOption.key}">
      <div class="avatar-icon">${avatarOption.icon}</div>
      <div class="avatar-name">${avatarOption.name}</div>
    </div>`).join('');

  avatarGrid.querySelectorAll('.avatar-card').forEach(card => {
    card.addEventListener('click', () => {
      avatarGrid.querySelectorAll('.avatar-card').forEach(otherCard => otherCard.classList.remove('active'));
      card.classList.add('active');
      gameState.uiSelections.avatar = AVATARS.find(avatarOption => avatarOption.key === card.dataset.key);
      renderAvatarDesc();
      updateConfirmButton();
    });
  });
}

export function renderAvatarDesc() {
  const descriptionPanel = document.getElementById('avatar-desc');
  if (!gameState.uiSelections.avatar) {
    descriptionPanel.innerHTML = '<p class="dim xs">Selecione um personagem acima.</p>';
    return;
  }
  const { icon, name, description } = gameState.uiSelections.avatar;
  descriptionPanel.innerHTML = `
    <div class="bold sm">${icon} ${name}</div>
    <p class="mt4 xs">${description}</p>`;
}

export function updateConfirmButton() {
  const playerName = document.getElementById('player-name').value.trim();
  document.getElementById('btn-confirm-avatar').disabled = !gameState.uiSelections.avatar || !playerName;
}
