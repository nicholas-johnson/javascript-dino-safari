/**
 * @param {{ zone: string; level: number; timestamp: number }} alert
 * @returns {{ zone: string; level: number; timestamp: number; id: string }}
 */
export function normaliseAlert(alert) {
  const zone = alert.zone.trim().toLowerCase();
  return {
    zone,
    level: alert.level,
    timestamp: alert.timestamp,
    id: `${zone}-${alert.timestamp}`,
  };
}
