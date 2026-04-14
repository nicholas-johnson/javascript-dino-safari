/**
 * Small module to demonstrate Vitest testing.
 * Imported by alert.test.js in this same folder.
 */

export function formatAlert(dino) {
  const name = dino?.name ?? 'Unknown';
  const zone = dino?.zone ?? 'Uncharted';
  const level = dino?.dangerLevel ?? 0;
  const tag = level >= 4 ? 'DANGER' : 'OK';

  return `[${tag}] ${name} spotted in ${zone}`;
}

export function isHighRisk(dino) {
  return (dino?.dangerLevel ?? 0) >= 4;
}
