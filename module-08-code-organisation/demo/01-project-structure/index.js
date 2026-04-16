/**
 * Two ways to organise the SAME project - an inventory tracking API
 * with products, orders, and auth.
 *
 * Each approach lives in its own folder, implements identical behaviour,
 * and exports a run() function so you can compare the code side-by-side.
 *
 *   node module-08-code-organisation/demo/01-project-structure
 */

import { run as runLayered } from './layered/run.js';
import { run as runFeatureFirst } from './feature-first/run.js';

const divider = '─'.repeat(60);

// ── Approach 1 ───────────────────────────────────────────────

console.log(divider);
console.log('APPROACH 1 - Layered (group by technical role)');
console.log();
console.log('  layered/');
console.log('    models/          Data shapes');
console.log('    repositories/    Persistence layer');
console.log('    services/        Business logic');
console.log();
console.log('  Rule: services → repositories → models (never reverse).');
console.log('  Good for: small projects, clear separation of concerns.');
console.log('  Watch out: feature work touches every layer.\n');
runLayered();

// ── Approach 2 ───────────────────────────────────────────────

console.log('\n' + divider);
console.log('APPROACH 2 - Feature-first (group by domain concept)');
console.log();
console.log('  feature-first/');
console.log('    auth/            Self-contained auth module');
console.log('    products/        Catalogue: store + barrel index.js');
console.log('    orders/          Orders: store + service + barrel');
console.log();
console.log('  Rule: cross-feature imports go through index.js only.');
console.log('  Good for: larger projects, independent team ownership.');
console.log('  Watch out: shared utilities need a clear home.\n');
runFeatureFirst();

console.log('\n' + divider);
console.log('Both produce the same result. The difference is where');
console.log('you find code and how modules depend on each other.');
console.log('Browse the folders to compare.\n');
