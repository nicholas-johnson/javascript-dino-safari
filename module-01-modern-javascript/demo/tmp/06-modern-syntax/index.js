/**
 * Demo: Modern syntax for safari telemetry.
 * Run: node module-01-modern-javascript/demo/06-modern-syntax
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dinosaurs = JSON.parse(
  readFileSync(path.join(__dirname, '../../../data/dinosaurs.json'), 'utf8'),
);

function summarizeSighting(raw) {
  const { name, species, zone, dangerLevel = 0, lastSeen, notes } = raw ?? {};

  const safeZone = zone ?? 'Unknown Zone';
  const level = dangerLevel ?? 0;

  return {
    headline: `${name ?? 'Unnamed dino'} (${species ?? 'species unknown'})`,
    zone: safeZone,
    riskLabel: level >= 4 ? 'HIGH ALERT' : level >= 2 ? 'ELEVATED' : 'ROUTINE',
    logLine: `${name ?? '???'} last ping: ${lastSeen ?? 'never'} - notes: ${notes ?? 'n/a'}`,
  };
}

const [first, second, ...rest] = dinosaurs;
const mergedTelemetry = { ...first, rangerId: 'RS-7', notes: 'Calm; feeding' };

const summaries = [first, second, rest[0]].map((d) => summarizeSighting(d));

console.log('\n--- Modern syntax demo ---\n');
console.log(
  'Destructuring + defaults:',
  summarizeSighting({ name: 'Shadow', species: null }),
);
console.log(
  'Spread merged record keys:',
  Object.keys(mergedTelemetry).slice(0, 5).join(', '),
  '...',
);
console.log('Rest count (remaining herd sample):', rest.length);
summaries.forEach((s) => console.log(`• [${s.riskLabel}] ${s.headline} @ ${s.zone}`));
