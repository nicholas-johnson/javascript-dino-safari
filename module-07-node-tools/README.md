# Module 7 - Node.js Tools: Files, HTTP, and Streams

Park Operations runs on logs, JSON APIs, and multi-gigabyte telemetry dumps. Node's standard library is your utility belt - `fs` for files, `http` for APIs, and streams for anything too large to fit in memory at once.

By the end of this module you should be able to:

- **Read and write files** with `node:fs/promises` and build safe paths with `node:path`.
- **Stand up a small HTTP JSON API** with `http.createServer`, proper status codes, and body parsing.
- **Pipe streams** for large-file processing and understand **backpressure** intuitively.

---

## 0. All seven modules in one script

```bash
node module-07-node-tools/demo/00-all-modules
```

Walks through `node:path`, `node:url`, `node:fs/promises`, `node:fs`, `node:http`, `node:stream`, and `node:readline` in numbered sections with console output you can narrate live.

---

## 1. Filesystem - reading, writing, and paths

```bash
node module-07-node-tools/demo/01-filesystem
```

### Reading and writing

Node's `node:fs/promises` module gives you async file operations that return promises - so you can `await` them:

```js
import { readFile, writeFile, appendFile, mkdir } from 'node:fs/promises';

const data = await readFile('zones.json', 'utf8');
const zones = JSON.parse(data);

await writeFile('output.json', JSON.stringify(zones, null, 2));
```

`readFile` returns a Buffer by default - pass `'utf8'` to get a string. `writeFile` overwrites; `appendFile` adds to the end.

### Creating directories

```js
await mkdir('logs/2026', { recursive: true });
```

`{ recursive: true }` creates parent directories as needed - no error if the directory already exists.

### Building paths safely

Never concatenate paths with string slashes. Use `node:path`:

```js
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logPath = join(__dirname, 'logs', 'sensors.ndjson');
```

ESM doesn't have `__dirname` natively - the `import.meta.url` + `fileURLToPath` pattern is the standard replacement. `join` normalizes separators across platforms: `join('a', 'b', 'c.txt')` → `a/b/c.txt` on macOS, `a\b\c.txt` on Windows.

### NDJSON - newline-delimited JSON

A common pattern for log files: one JSON object per line.

```js
async function appendLog(filePath, entry) {
  await appendFile(filePath, JSON.stringify(entry) + '\n');
}

async function readLogs(filePath) {
  const text = await readFile(filePath, 'utf8');
  return text
    .trim()
    .split('\n')
    .map((line) => JSON.parse(line));
}
```

---

## 2. HTTP server - a small JSON API

```bash
node module-07-node-tools/demo/02-http-server
```

Node's built-in `http` module lets you stand up a server in ~30 lines:

```js
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(3000, () => console.log('Listening on :3000'));
```

### Routing

There's no built-in router. You match `req.method` and `req.url` with conditionals. For anything beyond a handful of routes, reach for a framework (Express, Fastify, Hono) - but understanding the raw primitives helps you debug them.

### Parsing a request body

Request bodies arrive in chunks. You need to collect them:

```js
async function parseBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  return JSON.parse(raw);
}
```

Always wrap `JSON.parse` in `try`/`catch` and return a `400 Bad Request` for malformed input.

### Status codes that matter

| Code  | When                                          |
| ----- | --------------------------------------------- |
| `200` | Success, here's the data.                     |
| `201` | Created - after a successful POST.            |
| `400` | Bad request - malformed JSON, missing fields. |
| `404` | Not found - bad URL or unknown ID.            |
| `500` | Server error - your bug, not the client's.    |

---

## 3. Streams - processing data that doesn't fit in memory

```bash
node module-07-node-tools/demo/03-streams
```

`readFile` loads the entire file into memory. For a 2 GB telemetry dump, that's a problem. Streams process data **chunk by chunk**.

### Reading a file as a stream

```js
import { createReadStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { createInterface } from 'node:readline';

const fileStream = createReadStream('sensors.csv');
const rl = createInterface({ input: fileStream });

for await (const line of rl) {
  const [zone, temp, timestamp] = line.split(',');
  if (Number(temp) > 40) {
    console.log(`ALERT: ${zone} at ${temp}°C`);
  }
}
```

### The pipeline pattern

`pipeline` from `node:stream/promises` wires streams together and handles errors and cleanup:

```js
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';

const filterHot = new Transform({
  transform(chunk, encoding, callback) {
    const line = chunk.toString();
    if (line.includes('CRITICAL')) {
      this.push(line + '\n');
    }
    callback();
  },
});

await pipeline(
  createReadStream('all-readings.csv'),
  filterHot,
  createWriteStream('critical-only.csv'),
);
```

### Backpressure - the intuition

If the consumer (write stream) is slower than the producer (read stream), Node automatically pauses the producer until the consumer catches up. This is **backpressure**. `pipeline` handles it for you - which is why you should prefer it over manual `.pipe()` chains.

---

## Exercises

| #   | Folder                                                            | What you'll practice                                                                |
| --- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1   | [`exercises/01-file-io-ndjson`](exercises/01-file-io-ndjson/)     | `mkdir` + `appendFile` to write NDJSON logs, read them back and parse line-by-line. |
| 2   | [`exercises/02-http-json-server`](exercises/02-http-json-server/) | Build a minimal dino JSON API - health, list, get-by-id, 404 handling.              |
| 3   | [`exercises/03-stream-processor`](exercises/03-stream-processor/) | Process a CSV with streams or readline, filter by danger level, write output.       |

Run all module tests:

```bash
cd module-07-node-tools/exercises/<exercise>/starter && pnpm install && pnpm test
```

---

## Slides

Teaching deck: from repo root run `pnpm slides:07`, or `cd slides && pnpm dev`.

## Reference

- [MDN: Node.js file system](https://nodejs.org/api/fs.html)
- [Node.js HTTP docs](https://nodejs.org/api/http.html)
- [Node.js Streams guide](https://nodejs.org/api/stream.html)
- [Sam Roberts: Backpressure in Streams (video)](https://www.youtube.com/watch?v=nok2C0z3lGQ)
