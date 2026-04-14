// Bug Hunt: Equality & typeof
// Every function below has a subtle bug related to equality checks or typeof.
// The tests describe the CORRECT behaviour - run them, read the failures,
// and fix the code.

/**
 * Return true when `val` is null OR undefined, false otherwise.
 */
export function isNullish(val) {
  return val === null;
}

/**
 * Return a more useful type string than `typeof` gives.
 * - null  → "null"   (not "object")
 * - arrays → "array" (not "object")
 * - everything else → whatever typeof returns
 */
export function betterTypeof(val) {
  return typeof val;
}

/**
 * Return true only when `val` is actually NaN.
 * Must NOT return true for undefined, strings, or other non-NaN values.
 */
export function isActuallyNaN(val) {
  return val !== val || isNaN(val);
}

/**
 * Return true when `val` is an array, false otherwise.
 */
export function isArray(val) {
  return typeof val === 'array';
}

/**
 * Return true when `a` and `b` are the same value, with no gotchas:
 * - NaN and NaN should be considered the same.
 * - +0 and -0 should be considered different.
 */
export function areSameValue(a, b) {
  return a === b;
}
