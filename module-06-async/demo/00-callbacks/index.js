import fs from 'node:fs';
import path from 'node:path';

const file = path.join(import.meta.dirname, 'sightings.json');

// ── 1. Classic error-first callback ─────────────────────────────────
console.log('\n--- 1. fs.readFile with a callback ---');
console.log('before readFile');

fs.readFile(file, 'utf8', (err, raw) => {
  if (err) return console.error('Read failed:', err.message);
  const sightings = JSON.parse(raw);
  console.log('sightings loaded:', sightings.length, 'records');
  console.log(sightings[0]);
});

console.log('after readFile  (runs BEFORE the callback!)');

// ── 2. Nested callbacks ("callback hell") ───────────────────────────
// Read the file, pick a sighting, then write a report.
// Each step depends on the previous one → nesting grows.
await new Promise((r) => setTimeout(r, 100));

console.log('\n--- 2. Nested callbacks (pyramid of doom) ---');

fs.readFile(file, 'utf8', (err, raw) => {
  if (err) return console.error(err);
  const sightings = JSON.parse(raw);
  const first = sightings[0];

  const report = `${first.species} spotted in ${first.zone} at ${first.time}\n`;
  const outFile = path.join(import.meta.dirname, 'report.txt');

  fs.writeFile(outFile, report, (err) => {
    if (err) return console.error(err);
    console.log('report written →', outFile);

    fs.readFile(outFile, 'utf8', (err, contents) => {
      if (err) return console.error(err);
      console.log('report contents:', contents.trim());
    });
  });
});

await new Promise((r) => setTimeout(r, 200));

// ── 3. Same thing with .then() chains ───────────────────────────────
console.log('\n--- 3. Same flow with .then() chains ---');

import { readFile, writeFile } from 'node:fs/promises';

const outFile = path.join(import.meta.dirname, 'report.txt');

await readFile(file, 'utf8')
  .then((raw) => {
    const sightings = JSON.parse(raw);
    const first = sightings[0];
    const report = `${first.species} spotted in ${first.zone} at ${first.time}\n`;
    return writeFile(outFile, report).then(() => report);
  })
  .then((report) => {
    console.log('report written →', outFile);
    return readFile(outFile, 'utf8');
  })
  .then((contents) => console.log('report contents:', contents.trim()))
  .catch((err) => console.error('Something broke:', err.message));

// ── 4. Same thing with async / await ────────────────────────────────
console.log('\n--- 4. Same flow with async / await ---');

try {
  const raw = await readFile(file, 'utf8');
  const sightings = JSON.parse(raw);
  const first = sightings[0];

  const report = `${first.species} spotted in ${first.zone} at ${first.time}\n`;

  await writeFile(outFile, report);
  console.log('report written →', outFile);

  const contents = await readFile(outFile, 'utf8');
  console.log('report contents:', contents.trim());
} catch (err) {
  console.error('Something broke:', err.message);
}

// ── 5. Promise.all - load two files in parallel ─────────────────────
console.log('\n--- 5. Promise.all - two files at once ---');

const zonesFile = path.join(import.meta.dirname, 'zones.json');

try {
  const [sightingsRaw, zonesRaw] = await Promise.all([
    readFile(file, 'utf8'),
    readFile(zonesFile, 'utf8'),
  ]);

  const sightings = JSON.parse(sightingsRaw);
  const zones = JSON.parse(zonesRaw);

  console.log('sightings:', sightings.length, 'records');
  console.log('zones:    ', zones.length, 'records');

  const merged = sightings.map((s) => {
    const zone = zones.find((z) => z.name === s.zone);
    return { ...s, fence: zone?.fence ?? 'unknown' };
  });

  console.log('merged:');
  console.table(merged);
} catch (err) {
  console.error('Something broke:', err.message);
}
