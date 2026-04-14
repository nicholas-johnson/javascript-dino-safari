// Bug Hunt: Numbers & Money
// Every function below has a subtle bug related to JavaScript number handling.
// The tests describe the CORRECT behaviour - run them, read the failures,
// and fix the code.

/**
 * Sum an array of price strings (e.g. ["12.10", "3.99", "0.01"]) and return
 * the total in integer cents.
 * e.g. ["12.10", "3.99"] → 1609
 */
export function totalPriceCents(prices) {
  let sum = 0;
  for (const p of prices) {
    sum += parseFloat(p);
  }
  return Math.round(sum * 100);
}

/**
 * Parse a string into an integer age.
 * Return null if the string is not a clean integer (e.g. "12abc" should be null).
 */
export function parseAge(input) {
  const n = parseInt(input);
  if (isNaN(n)) return null;
  return n;
}

/**
 * Return true only when `x` is the actual NaN value.
 * Must not return true for undefined, strings, or other non-number types.
 */
export function isStrictlyNaN(x) {
  return isNaN(x);
}

/**
 * Safely divide `a` by `b`. Return null when the result would be
 * Infinity, -Infinity, or NaN (e.g. division by zero).
 */
export function safeDivide(a, b) {
  return a / b;
}

/**
 * Return `n` rounded to 2 decimal places as a number (not a string).
 * e.g. 3.456 → 3.46, 10 → 10
 */
export function roundTo2(n) {
  return n.toFixed(2);
}
