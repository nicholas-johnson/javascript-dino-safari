/**
 * Demo: Functional pipelines — filter, map, reduce.
 * Run: node module-02-functions/demo/08-pipelines
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dinosaurs = JSON.parse(
  readFileSync(path.join(__dirname, '../../../data/dinosaurs.json'), 'utf8'),
);

const carnivorePressure = dinosaurs
  .filter((d) => d.diet === 'carnivore' && d.isActive)
  .map((d) => ({ zone: d.zone, danger: d.dangerLevel }))
  .reduce((acc, row) => {
    acc[row.zone] = (acc[row.zone] ?? 0) + row.danger;
    return acc;
  }, {});

console.log('\n--- Pipeline demo (carnivore danger by zone) ---');
console.log(carnivorePressure);
