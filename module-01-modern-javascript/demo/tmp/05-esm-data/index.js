/**
 * Demo: loading data with ESM - reading JSON and deriving __dirname.
 * Run: node module-01-modern-javascript/demo/05-esm-data
 *
 * ESM doesn't provide __dirname or require(). This demo shows the standard
 * pattern for resolving file paths relative to the current module using
 * import.meta.url.
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dinosaurs = JSON.parse(
  readFileSync(path.join(__dirname, '../../../data/dinosaurs.json'), 'utf8'),
);

const activeCarnivores = dinosaurs.filter((d) => d.isActive && d.diet === 'carnivore');

console.log('\n--- ESM data loading demo ---\n');
console.log(`__dirname resolved to: ${__dirname}`);
console.log(`Loaded ${dinosaurs.length} dinosaurs from data/dinosaurs.json`);
console.log(`Active carnivores: ${activeCarnivores.length}`);
console.log(
  'First three:',
  dinosaurs
    .slice(0, 3)
    .map((d) => d.name)
    .join(', '),
);
console.log();
