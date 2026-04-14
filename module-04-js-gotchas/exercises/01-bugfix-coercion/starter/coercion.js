// Bug Hunt: Coercion & Truthiness
// Every function below has a subtle bug caused by JavaScript coercion or
// truthiness rules. The tests describe the CORRECT behaviour - run them,
// read the failures, and fix the code.

/**
 * Return true if `reading` is a usable sensor value.
 * Zero IS a valid reading; only null and undefined should be rejected.
 */
export function isUsableReading(reading) {
  if (!reading) return false;
  return true;
}

/**
 * Return the zone name, or "Unknown" when the caller passes null/undefined.
 * An empty string "" is a valid (if odd) zone name and must be kept.
 */
export function getZoneName(zone) {
  return zone || 'Unknown';
}

/**
 * Add two numeric sensor readings.
 * Callers sometimes pass strings from CSV parsing - always return a number.
 */
export function addReadings(a, b) {
  return a + b;
}

/**
 * Count how many entries in `flags` are truthy.
 * e.g. [1, 0, true, false, "yes", ""] → 3
 */
export function countTruthy(flags) {
  let count = 0;
  for (const flag of flags) {
    if (flag == true) count++;
  }
  return count;
}

/**
 * Return true when the array has items, false when empty.
 */
export function hasItems(arr) {
  if (arr == false) return false;
  return true;
}

/**
 * Return the configured timeout, or 5000 as a default.
 * A timeout of 0 is valid and means "no delay".
 */
export function getTimeout(config) {
  return config.timeout || 5000;
}
