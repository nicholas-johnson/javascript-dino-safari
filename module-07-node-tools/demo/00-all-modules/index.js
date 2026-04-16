// ── 1. node:path ─────────────────────────────────────────────────────
import path from 'node:path';

console.log('\n--- 1. node:path ---');

const sample = path.join('data', 'logs', 'sightings.ndjson');
console.log('join      :', sample);
console.log('resolve   :', path.resolve('data', 'logs'));
console.log('dirname   :', path.dirname(sample));
console.log('basename  :', path.basename(sample));
console.log('extname   :', path.extname(sample));

// ── 2. node:url ──────────────────────────────────────────────────────
import { fileURLToPath } from 'node:url';

console.log('\n--- 2. node:url ---');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('import.meta.url :', import.meta.url);
console.log('__filename      :', __filename);
console.log('__dirname       :', __dirname);

const url = new URL('/dinosaurs?zone=CV&limit=5', 'http://127.0.0.1:3000');
console.log('pathname        :', url.pathname);
console.log('searchParams    :', Object.fromEntries(url.searchParams));

// ── 3. node:fs/promises ──────────────────────────────────────────────
import { mkdir, appendFile, readFile, rm } from 'node:fs/promises';

console.log('\n--- 3. node:fs/promises ---');

const scratch = path.join(__dirname, '.scratch');
await mkdir(scratch, { recursive: true });
console.log('created scratch dir:', scratch);

const ndjsonPath = path.join(scratch, 'sightings.ndjson');
const rows = [
  { id: 'TRX-001', species: 'Tyrannosaurus', zone: 'CV' },
  { id: 'VRP-004', species: 'Velociraptor', zone: 'RR' },
];
for (const row of rows) {
  await appendFile(ndjsonPath, JSON.stringify(row) + '\n');
}
console.log('appended', rows.length, 'NDJSON lines');

const text = await readFile(ndjsonPath, 'utf8');
const records = text.trim().split('\n').map(JSON.parse);
console.log('read back:', records);

// ── 4. node:fs (sync) ───────────────────────────────────────────────
import { readFileSync, createReadStream, createWriteStream } from 'node:fs';

console.log('\n--- 4. node:fs (sync at startup) ---');

const dinoPath = path.join(__dirname, '../../../data/dinosaurs.json');
const dinosaurs = JSON.parse(readFileSync(dinoPath, 'utf8'));
console.log('loaded', dinosaurs.length, 'dinosaurs (sync)');
console.log('first:', dinosaurs[0].name, '-', dinosaurs[0].species);

// ── 5. node:http ─────────────────────────────────────────────────────
import { createServer } from 'node:http';

console.log('\n--- 5. node:http ---');

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok', dinos: dinosaurs.length }));
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not_found' }));
});

const port = await new Promise((resolve) => {
  server.listen(0, () => resolve(server.address().port));
});
console.log('server listening on port', port);

const resp = await fetch(`http://127.0.0.1:${port}/health`);
const body = await resp.json();
console.log('GET /health →', resp.status, body);

server.close();
console.log('server closed');

// ── 6. node:stream ──────────────────────────────────────────────────
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';

console.log('\n--- 6. node:stream ---');

const upperPath = path.join(scratch, 'sightings-upper.ndjson');

const toUpperCase = new Transform({
  transform(chunk, _enc, cb) {
    cb(null, chunk.toString().toUpperCase());
  },
});

await pipeline(createReadStream(ndjsonPath), toUpperCase, createWriteStream(upperPath));
console.log('pipeline complete → uppercased file written');
console.log('contents:', await readFile(upperPath, 'utf8'));

// ── 7. node:readline ────────────────────────────────────────────────
import { createInterface } from 'node:readline';

console.log('--- 7. node:readline ---');

const rl = createInterface({
  input: createReadStream(upperPath),
});

let lineNum = 0;
for await (const line of rl) {
  lineNum++;
  console.log(`  line ${lineNum}:`, line);
}
console.log('processed', lineNum, 'lines');

// ── Cleanup ─────────────────────────────────────────────────────────
await rm(scratch, { recursive: true });
console.log('\ncleaned up scratch dir');
console.log('done ✓\n');
