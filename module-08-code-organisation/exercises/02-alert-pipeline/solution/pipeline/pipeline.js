import {
  createDeduplicator,
  normaliseAlert,
  validateAlert,
} from '../alerts/index.js';

/**
 * @param {Array<{ zone?: unknown; level?: unknown; timestamp?: unknown }>} rawAlerts
 * @returns {{
 *   critical: Array<{ zone: string; level: number; timestamp: number; id: string }>;
 *   warning: Array<{ zone: string; level: number; timestamp: number; id: string }>;
 *   info: Array<{ zone: string; level: number; timestamp: number; id: string }>;
 *   total: number;
 * }}
 */
export function processAlerts(rawAlerts) {
  const dedupe = createDeduplicator();
  const alerts = rawAlerts
    .filter(validateAlert)
    .map(normaliseAlert)
    .filter(dedupe);

  const critical = [];
  const warning = [];
  const info = [];

  for (const alert of alerts) {
    if (alert.level >= 4) {
      critical.push(alert);
    } else if (alert.level >= 2) {
      warning.push(alert);
    } else {
      info.push(alert);
    }
  }

  return {
    critical,
    warning,
    info,
    total: alerts.length,
  };
}
