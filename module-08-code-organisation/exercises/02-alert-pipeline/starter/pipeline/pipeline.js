import {
  createDeduplicator,
  normaliseAlert,
  validateAlert,
} from '../alerts/index.js';

// TODO: wire validate → normalise → dedupe → categorise
export function processAlerts(rawAlerts) {
  return { critical: [], warning: [], info: [], total: 0 };
}
