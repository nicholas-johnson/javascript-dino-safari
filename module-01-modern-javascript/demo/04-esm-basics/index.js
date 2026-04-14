/**
 * Demo: ESM basics — import and export between files.
 * Run: node module-01-modern-javascript/demo/03-esm-basics
 *
 * This folder has two files:
 *   park-info.js  → named exports (PARK_NAME, SECTOR_COUNT, formatWelcome)
 *                    + a default export (printStatus)
 *   index.js      → imports and uses them (this file)
 *
 * Key ideas:
 *   - Named exports use { braces } on import — names must match exactly.
 *   - Default export can be imported with any name you choose.
 *   - "type": "module" in package.json enables ESM in .js files.
 */

import printStatus, { PARK_NAME, SECTOR_COUNT, formatWelcome } from './park-info.js';

console.log('\n--- ESM basics demo ---\n');

console.log('Named export (constant):', PARK_NAME);
console.log('Named export (constant):', SECTOR_COUNT, 'sectors');
console.log('Named export (function):', formatWelcome('Ellie'));

console.log();
printStatus();
console.log();
