/**
 * @typedef {{ zone: string, headcount: number, risk: 'low' | 'high' }} MigrationEvent
 */

/** @param {MigrationEvent[]} events */
export function filterHighRiskZones(events) {
  return [];
}

/** @param {MigrationEvent[]} events */
export function toLogLines(events) {
  return [];
}

/** @param {MigrationEvent[]} events */
export function countByZone(events) {
  return {};
}

/** @param {MigrationEvent[]} events */
export function buildMigrationReport(events) {
  return { lines: [], totals: {} };
}
