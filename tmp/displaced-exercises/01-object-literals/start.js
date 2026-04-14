/**
 * Object literals, string keys, and plain objects as associative maps.
 * Symbols are real keys too - this exercise sticks to values that stringify.
 */

/**
 * @param {string} code
 * @param {string} species
 * @param {number} headcount
 */
export function createPaddock(code, species, headcount) {
  void code;
  void species;
  void headcount;
  // TODO
  return {};
}

/** @returns {{ 1: string; 2: string }} */
export function createTelemetryRow() {
  // TODO: object literal with numeric-looking keys 1 and 2 (values: 'motion', 'heat')
  return {};
}

/**
 * String used as the property name when you write `obj[value]` (non-Symbol `value`).
 * @param {unknown} value
 * @returns {string}
 */
export function toBracketKeyString(value) {
  void value;
  // TODO
  return '';
}

/**
 * Build an object by assigning with `o[true]`, `o[null]`, `o[undefined]`
 * so keys end up as the strings `'true'`, `'null'`, `'undefined'`.
 * @returns {Record<string, string>}
 */
export function buildCoercedKeyExample() {
  // TODO
  return {};
}

/**
 * Mutates `sightingsByZone`: ensures `sightingsByZone[zoneId]` is an array and pushes `label`.
 * @param {Record<string, string[]>} sightingsByZone
 * @param {string} zoneId
 * @param {string} label
 */
export function noteSighting(sightingsByZone, zoneId, label) {
  void sightingsByZone;
  void zoneId;
  void label;
  // TODO
}

/**
 * @param {object} obj
 * @returns {boolean} true iff every `for...in` key has `typeof key === 'string'`
 */
export function forInKeysAreStrings(obj) {
  void obj;
  // TODO
  return false;
}
