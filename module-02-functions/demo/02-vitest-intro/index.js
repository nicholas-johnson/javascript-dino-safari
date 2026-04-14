/**
 * Demo: Vitest - describe, it, expect.
 * Run: node module-02-functions/demo/02-vitest-intro
 *
 * This folder contains:
 *   alert.js       → two small functions (formatAlert, isHighRisk)
 *   alert.test.js  → Vitest tests for both functions
 *   index.js       → this script (runs the functions, points to the tests)
 *
 * To run the tests:
 *   pnpm vitest run module-02-functions/demo/02-vitest-intro/alert.test.js
 */

import { formatAlert, isHighRisk } from './alert.js';

console.log('\n--- Vitest intro demo ---\n');

const rex = { name: 'Rex', zone: 'Valley', dangerLevel: 5 };
const bronto = { name: 'Bronto', zone: 'Lake', dangerLevel: 1 };

console.log(formatAlert(rex), '  high risk?', isHighRisk(rex));
console.log(formatAlert(bronto), '  high risk?', isHighRisk(bronto));
console.log(formatAlert(null), '  high risk?', isHighRisk(null));

console.log('\nRun the tests:');
console.log('  pnpm vitest run module-02-functions/demo/02-vitest-intro/alert.test.js\n');
