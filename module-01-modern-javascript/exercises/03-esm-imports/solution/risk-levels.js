/**
 * Risk-level labels used across the park's alert system.
 * Import this module from index.js.
 */

export const RISK_LABELS = {
  0: 'NONE',
  1: 'LOW',
  2: 'MODERATE',
  3: 'ELEVATED',
  4: 'HIGH',
  5: 'CRITICAL',
};

export function getRiskLabel(level) {
  return RISK_LABELS[level] ?? `LEVEL-${level}`;
}
