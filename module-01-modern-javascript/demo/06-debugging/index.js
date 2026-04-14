/**
 * Demo: Intentionally buggy tracker — use node --inspect and breakpoints.
 *
 * Run normally (you'll see a wrong average):
 *   node module-01-modern-javascript/demo/06-debugging
 *
 * Run with the debugger paused on the first line:
 *   node --inspect-brk module-01-modern-javascript/demo/06-debugging
 *
 * Then attach via Chrome (chrome://inspect) or your editor's debugger.
 * Set a breakpoint inside the loop in averageWeightKg, step through, and
 * find the bug: <= should be <, so the last iteration reads undefined.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dinosaurs = JSON.parse(
  readFileSync(path.join(__dirname, '../../../data/dinosaurs.json'), 'utf8'),
);

function averageWeightKg(list) {
  let total = 0;
  // BUG: off-by-one / wrong loop bound — students should catch this while stepping
  for (let i = 0; i <= list.length; i++) {
    total += list[i]?.weightKg ?? 0;
  }
  return total / list.length;
}

function findHeaviestCarnivore(list) {
  return list
    .filter((d) => d.diet === 'carnivore')
    .reduce((best, d) => (d.weightKg > (best?.weightKg ?? 0) ? d : best), null);
}

const avg = averageWeightKg(dinosaurs);
const apex = findHeaviestCarnivore(dinosaurs);

console.log('\n--- Debugging demo (expect wrong average!) ---\n');
console.log('Reported average weight (kg):', avg.toFixed(2));
console.log('Heaviest carnivore:', apex?.name, `(${apex?.species})`);
