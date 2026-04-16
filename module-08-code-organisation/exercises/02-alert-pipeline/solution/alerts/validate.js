/**
 * @param {{ zone?: unknown; level?: unknown; timestamp?: unknown }} alert
 * @returns {boolean}
 */
export function validateAlert(alert) {
  const { zone, level, timestamp } = alert;
  if (typeof zone !== 'string' || zone.trim() === '') {
    return false;
  }
  if (typeof level !== 'number' || !Number.isInteger(level) || level < 1 || level > 5) {
    return false;
  }
  if (typeof timestamp !== 'number' || timestamp <= 0) {
    return false;
  }
  return true;
}
