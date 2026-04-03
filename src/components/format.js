export function formatCurrency(amount) {
  return `R$${Math.round(amount).toLocaleString('pt-BR')}`;
}

export function coverageClass(coveragePercent) {
  if (coveragePercent >= 70) return 'clr-green';
  if (coveragePercent >= 40) return 'clr-yellow';
  return 'clr-red';
}

export function eventDirectionClass(direction) {
  if (direction === 'UP') return 'up';
  if (direction === 'DOWN') return 'down';
  return 'neutral';
}
