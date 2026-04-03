export function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(screenElement => screenElement.classList.remove('active'));
  document.getElementById(`screen-${screenId}`).classList.add('active');
}
