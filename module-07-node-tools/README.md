# Module 7 - Node.js Tools: Files, HTTP, and Streams

Node's standard library is your utility belt - seven built-in modules, zero npm installs. Between them you can build file paths, read and write data, stand up an API, and stream-process files that are too large to fit in memory.

By the end of this module you should be able to:

- **Build safe, cross-platform file paths** with `node:path` and `node:url`.
- **Read, write, and append files** with `node:fs/promises` and know when to reach for synchronous `node:fs` instead.
- **Stand up a JSON API** with `node:http`, parse request bodies, and return proper status codes.
- **Stream large files** chunk by chunk with `node:stream` and `node:readline`, using `pipeline` for clean error handling.

---

## 1. node:path - cross-platform file paths

Paths look different on every operating system. macOS and Linux use forward slashes (`data/logs/output.csv`), Windows uses backslashes (`data\logs\output.csv`). If you concatenate path segments with string slashes, your code breaks on at least one platform. `node:path` handles the differences for you.

### join vs resolve

`join` glues segments together and normalises the separators, but keeps things **relative**:

```js
import path from 'node:path';

path.join('data', 'logs', 'sightings.ndjson');
// macOS/Linux: 'data/logs/sightings.ndjson'
// Windows:     'data\\logs\\sightings.ndjson'
```

`resolve` does the same thing but always returns an **absolute** path, starting from the current working directory:

```js
path.resolve('data', 'logs');
// '/Users/you/project/data/logs'
```

Use `join` when you want a relative path (e.g. for display or relative imports). Use `resolve` when you need a full absolute path.

### Splitting paths apart

```js
path.dirname('/data/logs/sightings.ndjson');   // '/data/logs'
path.basename('/data/logs/sightings.ndjson');   // 'sightings.ndjson'
path.extname('/data/logs/sightings.ndjson');    // '.ndjson'  (includes the dot)
```

These are useful when you need to derive an output path from an input path - for example, changing the extension or writing to a sibling directory.

### Watch out

- `resolve` restarts from the **last** absolute segment: `resolve('/a', '/b')` gives you `'/b'`, not `'/a/b'`.
- `extname` includes the dot. If you're comparing extensions, compare against `'.json'`, not `'json'`.
- Relative paths in `readFile` resolve from `process.cwd()`, not from the source file. Always build paths from `__dirname` (see the next section) to avoid surprises when the script is run from a different directory.

---

## 2. node:url - URL parsing and the ESM __dirname trick

### The __dirname problem

In CommonJS (`require`), every file has `__dirname` and `__filename` built in. ESM doesn't. Instead you get `import.meta.url`, which is a `file://` URL - not a file path. You need to convert it:

```js
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

This two-line pattern is the standard replacement. You'll use it in almost every Node ESM script that touches the filesystem.

### Parsing HTTP URLs

`new URL` breaks a URL into structured parts - pathname, search params, host, protocol - so you never have to split strings by hand:

```js
const url = new URL('/dinosaurs?zone=CV&limit=5', 'http://127.0.0.1:3000');

url.pathname;                    // '/dinosaurs'
url.searchParams.get('zone');    // 'CV'
url.searchParams.get('limit');   // '5'  (always a string)
url.searchParams.has('offset');  // false
```

The second argument is the **base** - required for relative URLs, optional if the first argument is already absolute. In an HTTP server, you'll typically pass `http://${req.headers.host}` as the base and `req.url` as the path.

### Watch out

- `new URL()` **throws** on invalid input. Always wrap it in `try`/`catch` when parsing user-supplied strings.
- `import.meta.url` is a `file://` URL, not a plain path. Passing it directly to `readFile` works on some platforms but isn't portable - always convert with `fileURLToPath` first.
- `searchParams.get()` returns `null` (not `undefined`) when the key is missing, and always returns a **string** - you'll need to convert numeric params with `Number()`.
- The legacy `url.parse()` function is deprecated. Use `new URL()` for all new code.

---

## 3. node:fs/promises - async file operations

This is the module you'll reach for most often. Every function returns a promise, so you `await` it just like `fetch`.

### Reading files

```js
import { readFile } from 'node:fs/promises';

const text = await readFile('zones.json', 'utf8');
const zones = JSON.parse(text);
```

The second argument is the encoding. Pass `'utf8'` to get a string. Omit it and you get a raw `Buffer` - useful for binary files (images, PDFs) but surprising if you expected text.

### Writing and appending

```js
import { writeFile, appendFile } from 'node:fs/promises';

await writeFile('output.json', JSON.stringify(zones, null, 2));
await appendFile('access.log', `${new Date().toISOString()} GET /zones\n`);
```

`writeFile` **overwrites** the file completely. `appendFile` adds to the end without touching existing content. For log files, append is almost always what you want.

### Creating directories

```js
import { mkdir } from 'node:fs/promises';

await mkdir('data/logs/2026', { recursive: true });
```

`{ recursive: true }` creates every directory in the chain that doesn't exist yet, and doesn't error if they already do. Without it, you'd need to create each parent separately and handle "already exists" errors yourself.

### NDJSON - newline-delimited JSON

A practical pattern for structured log files: one JSON object per line. Easy to append, easy to stream, easy to parse:

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

Each line is a self-contained JSON object, so appending never corrupts existing data (unlike a single JSON array, where a crash mid-write leaves invalid JSON).

### Watch out

- Forgetting `'utf8'` returns a `Buffer`. Template literals and `.split()` will silently coerce it to a string like `"[object Buffer]"` rather than the file contents.
- `writeFile` silently overwrites with no confirmation. If you need to guard against accidental overwrites, check with `access()` or `stat()` first.
- `readFile` on a missing file throws with code `ENOENT`. Always wrap in `try`/`catch`:

```js
try {
  const data = await readFile('config.json', 'utf8');
} catch (err) {
  if (err.code === 'ENOENT') {
    console.log('No config file found, using defaults');
  } else {
    throw err;
  }
}
```

---

## 4. node:fs - sync helpers and stream constructors

The original filesystem module. You'll use it for two things: **synchronous reads at startup** and **creating streams**.

### Synchronous reads

```js
import { readFileSync } from 'node:fs';

const config = JSON.parse(readFileSync('config.json', 'utf8'));
```

`readFileSync` blocks the entire thread until the file is read. That's fine during startup - the server isn't accepting requests yet. But **never use sync methods inside a request handler** or event loop callback. A single 100 ms disk read blocks every other request for that 100 ms.

Rule of thumb: `node:fs/promises` for runtime work, `node:fs` sync methods only at boot.

### Stream constructors

The other reason to import `node:fs` is `createReadStream` and `createWriteStream`, which produce streams for the pipeline pattern (covered in sections 6 and 7 below):

```js
import { createReadStream, createWriteStream } from 'node:fs';

const input = createReadStream('big-telemetry.csv');
const output = createWriteStream('filtered.csv');
```

These don't load the file into memory. They read and write in chunks, which is essential for large files.

---

## 5. node:http - building a JSON API from scratch

Node's built-in HTTP module gives you a server with no framework. It's lower-level than Express or Fastify, but understanding it helps you debug those tools later.

### Creating a server

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

The callback receives two arguments: `req` (a readable stream representing the incoming request) and `res` (a writable stream for the response). You set a status code with `writeHead`, write the body, and call `end()` to finish.

### Routing

There's no built-in router. You match `req.method` and `req.url` with `if`/`else` branches. For anything beyond a handful of routes, use a framework - but this is how they all work under the hood.

To handle URLs with query strings, parse them with `new URL`:

```js
const url = new URL(req.url, `http://${req.headers.host}`);
const zone = url.searchParams.get('zone');
```

### Parsing a request body

Request bodies don't arrive all at once - they come in chunks. You need to collect them before parsing:

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

Always wrap `JSON.parse` in `try`/`catch` and return `400 Bad Request` for malformed input. An uncaught parse error crashes the entire server.

### Status codes that matter

| Code  | When                                          |
| ----- | --------------------------------------------- |
| `200` | Success, here's the data.                     |
| `201` | Created - after a successful POST.            |
| `400` | Bad request - malformed JSON, missing fields. |
| `404` | Not found - bad URL or unknown ID.            |
| `500` | Server error - your bug, not the client's.    |

### Watch out

- Forgetting `res.end()` hangs the connection. The client waits forever and eventually times out.
- `req.url` includes the query string: `'/dinosaurs?zone=CV'`, not `'/dinosaurs'`. Parse it with `new URL()` to split cleanly.
- Always set `Content-Type`. Without it, clients guess the format, and they often guess wrong.

---

## 6. node:stream - chunk-by-chunk processing with pipeline

Streams process data in small pieces instead of loading everything into memory. There are four types:

| Type | Direction | Example |
|---|---|---|
| **Readable** | produces data | `createReadStream`, `req` |
| **Writable** | consumes data | `createWriteStream`, `res` |
| **Transform** | reads, modifies, re-emits | uppercasing, filtering rows |
| **Duplex** | both directions independently | TCP sockets |

### The pipeline pattern

`pipeline` from `node:stream/promises` wires streams together. It handles errors, backpressure, and cleanup automatically:

```js
import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';

const toUpperCase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

await pipeline(
  createReadStream('sensors.csv'),
  toUpperCase,
  createWriteStream('SENSORS.csv'),
);
```

Data flows left to right: the read stream produces chunks, the transform modifies them, and the write stream saves the result. At no point is the entire file in memory.

### Writing a filter transform

To **drop** chunks, call the callback with no data. To **pass** them through, call it with the data:

```js
const dangerFilter = new Transform({
  transform(chunk, encoding, callback) {
    const line = chunk.toString();
    const [zone, species, level] = line.split(',');
    if (Number(level) >= 8) {
      callback(null, `${zone},${species},${level}\n`);
    } else {
      callback(); // drop this row
    }
  },
});
```

### Backpressure

If the consumer (write stream) is slower than the producer (read stream), Node automatically pauses the producer until the consumer catches up. This prevents memory from growing without bound. `pipeline` manages this for you, which is why you should always prefer it over manual `.pipe()` chains.

### Watch out

- `.pipe()` does **not** forward errors. An error on the source silently leaves the destination open. Always use `pipeline`.
- Chunks are `Buffer`s by default, not strings. Call `.toString()` inside your transform, or set `{ encoding: 'utf8' }` on the stream.
- You **must** call the `callback` in every `transform` invocation. Forgetting it stalls the entire pipeline with no error message.
- Don't `await` inside a Transform's `transform` method. The callback-based API doesn't understand promises. If you need async transforms, look at `stream.compose` or a library like `scramjet`.

---

## 7. node:readline - line-by-line iteration

`readline` wraps any readable stream into an async iterable that yields one line at a time. It's the easiest way to process CSV, NDJSON, or any newline-delimited format without loading the whole file.

### Basic usage

```js
import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

const rl = createInterface({
  input: createReadStream('sensors.csv'),
});

for await (const line of rl) {
  const [zone, temp, timestamp] = line.split(',');
  if (Number(temp) > 40) {
    console.log(`ALERT: ${zone} at ${temp}°C`);
  }
}
```

This reads a 2 GB file with constant memory. Each iteration yields exactly one line, and the underlying stream pauses automatically between iterations if your processing is slower than the read speed.

### When to use readline vs a Transform

Use **readline** when you want to process lines one at a time and don't need to pipe output into another stream. Use a **Transform** (section 6) when you want to wire multiple streams together with `pipeline` - for example, reading a file, filtering rows, and writing the result to another file in a single pass.

They often work together: `readline` for the input side, a write stream for the output side, and your logic in the `for await` loop body.

### Parsing structured data

For NDJSON files, combine readline with `JSON.parse`:

```js
const rl = createInterface({
  input: createReadStream('events.ndjson'),
});

const events = [];
for await (const line of rl) {
  try {
    events.push(JSON.parse(line));
  } catch {
    console.warn('Skipping corrupt line:', line);
  }
}
```

Wrapping `JSON.parse` in `try`/`catch` per line means a single corrupt entry doesn't crash the whole import.

---

## Exercises

| #   | Folder                                                            | What you'll practice                                                                |
| --- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 1   | [`exercises/01-file-io-ndjson`](exercises/01-file-io-ndjson/)     | `mkdir` + `appendFile` to write NDJSON logs, read them back and parse line-by-line. |
| 2   | [`exercises/02-http-json-server`](exercises/02-http-json-server/) | Build a minimal JSON API - health, list, get-by-id, 404 handling.                   |
| 3   | [`exercises/03-stream-processor`](exercises/03-stream-processor/) | Process a CSV with streams or readline, filter by danger level, write output.       |

Run all module tests:

```bash
cd module-07-node-tools/exercises/<exercise>/starter && pnpm install && pnpm test
```

---

## Slides

Teaching deck: from repo root run `pnpm slides:07`, or `cd slides && pnpm dev`.

## Reference

- [Node.js `path` docs](https://nodejs.org/api/path.html)
- [Node.js `url` docs](https://nodejs.org/api/url.html)
- [Node.js `fs` docs](https://nodejs.org/api/fs.html)
- [Node.js `http` docs](https://nodejs.org/api/http.html)
- [Node.js Streams guide](https://nodejs.org/api/stream.html)
- [Node.js `readline` docs](https://nodejs.org/api/readline.html)
- [Sam Roberts: Backpressure in Streams (video)](https://www.youtube.com/watch?v=nok2C0z3lGQ)
