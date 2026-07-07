export function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

export function daysUntil(dateStr) {
  const diff = (new Date(dateStr) - new Date(todayStr())) / 86400000
  return Math.round(diff)
}

export function stampLabel(dateStr) {
  const d = daysUntil(dateStr)
  if (d < 0) return { text: 'OVERDUE', cls: 'overdue' }
  if (d === 0) return { text: 'TODAY', cls: '' }
  if (d === 1) return { text: 'TOMORROW', cls: 'future' }
  return {
    text: new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
    cls: 'future',
  }
}
