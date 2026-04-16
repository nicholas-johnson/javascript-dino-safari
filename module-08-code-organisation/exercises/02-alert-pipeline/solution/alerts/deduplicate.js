/**
 * @returns {(alert: { id: string }) => boolean}
 */
export function createDeduplicator() {
  const seen = new Set();
  return (alert) => {
    if (seen.has(alert.id)) {
      return false;
    }
    seen.add(alert.id);
    return true;
  };
}
