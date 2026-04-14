// TODO: import path from 'node:path'
// TODO: import pc from 'picocolors'
// TODO: import { getRiskLabel } from './risk-levels.js'

/**
 * Build a single-line alert string for the park's tracking console.
 *
 * Format: [RISK_LABEL] name @ zone
 *
 * Use getRiskLabel(dangerLevel) from the local risk-levels.js module to
 * convert a numeric danger level to a label like "HIGH" or "CRITICAL".
 *
 * Use picocolors to colour the label:
 *   - danger level >= 4 → pc.red(label)
 *   - danger level >= 2 → pc.yellow(label)
 *   - otherwise         → pc.green(label)
 *
 * Apply ?? defaults: name → 'Unknown', zone → 'Uncharted', dangerLevel → 0.
 *
 * @param {Record<string, unknown> | null | undefined} dino
 * @returns {string}
 */
export function formatAlert(dino) {
  // TODO: implement
  void dino;
  return '';
}

/**
 * Return the file extension for a given filename (e.g. '.json', '.js').
 * Use path.extname from the node:path built-in module.
 *
 * @param {string} filename
 * @returns {string}
 */
export function getExtension(filename) {
  // TODO: implement using path.extname
  void filename;
  return '';
}
