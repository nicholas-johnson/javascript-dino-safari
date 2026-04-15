/**
 * @typedef {{ zone: string, headcount: number, risk: 'low' | 'high' }} MigrationEvent
 */

/** @param {MigrationEvent[]} events */
export function filterHighRiskZones(events) {
  void events;
  return [];
}

/** @param {MigrationEvent[]} events */
export function toLogLines(events) {
  void events;
  return [];
}

/** @param {MigrationEvent[]} events */
export function countByZone(events) {
  void events;
  return {};
}

/** @param {MigrationEvent[]} events */
export function buildMigrationReport(events) {
  void events;
  return { lines: [], totals: {} };
}
