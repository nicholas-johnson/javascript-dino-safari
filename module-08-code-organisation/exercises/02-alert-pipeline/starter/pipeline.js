import { createDeduplicator } from './deduplicate.js';
import { normaliseAlert } from './normalise.js';
import { validateAlert } from './validate.js';

// TODO: wire validate → normalise → dedupe → categorise
export function processAlerts(rawAlerts) {
  return { critical: [], warning: [], info: [], total: 0 };
}
