import path from 'node:path';
import pc from 'picocolors';
import { getRiskLabel } from './risk-levels.js';

/**
 * @param {Record<string, unknown> | null | undefined} dino
 * @returns {string}
 */
export function formatAlert(dino) {
  const name = dino?.name ?? 'Unknown';
  const zone = dino?.zone ?? 'Uncharted';
  const dangerLevel = dino?.dangerLevel ?? 0;

  const label = getRiskLabel(dangerLevel);

  const coloured =
    dangerLevel >= 4 ? pc.red(label) : dangerLevel >= 2 ? pc.yellow(label) : pc.green(label);

  return `[${coloured}] ${name} @ ${zone}`;
}

/**
 * @param {string} filename
 * @returns {string}
 */
export function getExtension(filename) {
  return path.extname(filename);
}
