export const slides = [
  {
    type: 'title',
    content: {
      title: 'Module 7 - Node.js Tools',
      subtitle: 'Park operations: files, HTTP, streams',
      icon: 'wrench',
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Seven modules, zero npm installs',
      icon: 'package',
      points: [
        '`node:path` - cross-platform file paths',
        '`node:url` - URL parsing and the ESM `__dirname` trick',
        '`node:fs/promises` - async read, write, append, mkdir',
        '`node:fs` - sync helpers and stream constructors',
        '`node:http` - stand up a JSON API from scratch',
        '`node:stream` - chunk-by-chunk processing with pipeline',
        '`node:readline` - line-by-line iteration over large files',
      ],
    },
  },

  // --- node:path ---
  {
    type: 'title',
    content: {
      title: 'node:path',
      subtitle: 'Cross-platform file paths',
      icon: 'map',
    },
  },
  {
    type: 'standard',
    content: {
      title: 'node:path',
      icon: 'map',
      points: [
        'Build file paths that work on macOS, Linux, *and* Windows.',
        '`join` normalises separators; `resolve` gives you an absolute path.',
        '`dirname` and `basename` split a path into folder and file parts.',
        'Never concatenate strings with `/` - it breaks on Windows.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'node:path in action',
      code: `import path from 'node:path';

path.join('data', 'logs', 'sightings.ndjson');
// macOS: 'data/logs/sightings.ndjson'
// Win:   'data\\\\logs\\\\sightings.ndjson'

path.resolve('data', 'logs');
// '/Users/ranger/park-ops/data/logs'

path.dirname('/data/logs/sightings.ndjson');
// '/data/logs'
path.basename('/data/logs/sightings.ndjson');
// 'sightings.ndjson'`,
      highlights: [
        '`join` for relative, `resolve` for absolute - both handle separators for you',
      ],
    },
  },

  {
    type: 'standard',
    content: {
      title: 'node:path - watch out',
      icon: 'alert-triangle',
      points: [
        '`resolve` restarts from the *last* absolute segment: `resolve("/a", "/b")` → `"/b"`, not `"/a/b"`.',
        '`join` vs `resolve`: `join` keeps things relative, `resolve` always returns an absolute path from `cwd`.',
        '`extname` includes the dot: `extname("data.json")` → `".json"`, not `"json"`.',
        'Relative paths in `readFile` resolve from `process.cwd()`, not from the source file - use the `__dirname` pattern to be safe.',
      ],
    },
  },

  // --- node:url ---
  {
    type: 'title',
    content: {
      title: 'node:url',
      subtitle: 'URL parsing and the ESM __dirname trick',
      icon: 'link',
    },
  },
  {
    type: 'standard',
    content: {
      title: 'node:url',
      icon: 'link',
      points: [
        '`new URL(path, base)` parses URLs into structured parts: pathname, search params, host.',
        '`fileURLToPath(import.meta.url)` converts a `file://` URL to a system path - the ESM replacement for `__dirname`.',
        'Works on both HTTP URLs and file-system URLs.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'node:url in action',
      code: `import { fileURLToPath } from 'node:url';
import path from 'node:path';

// ESM-friendly __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parsing an HTTP URL
const url = new URL('/dinosaurs?zone=CV', 'http://127.0.0.1');
url.pathname;              // '/dinosaurs'
url.searchParams.get('zone'); // 'CV'`,
      highlights: [
        'ESM has no built-in `__dirname` - this two-line pattern is the standard fix',
      ],
    },
  },

  {
    type: 'standard',
    content: {
      title: 'node:url - watch out',
      icon: 'alert-triangle',
      points: [
        '`new URL()` *throws* on invalid input - always wrap in `try`/`catch` when parsing user-supplied strings.',
        '`import.meta.url` is a `file://` URL, not a path - pass it through `fileURLToPath` before handing it to `fs`.',
        '`searchParams.get()` returns `null` (not `undefined`) when the key is missing.',
        'The legacy `url.parse()` is deprecated - use `new URL()` for all new code.',
      ],
    },
  },

  // --- node:fs/promises ---
  {
    type: 'title',
    content: {
      title: 'node:fs/promises',
      subtitle: 'Async read, write, append, mkdir',
      icon: 'folder-plus',
    },
  },
  {
    type: 'standard',
    content: {
      title: 'node:fs/promises',
      icon: 'folder-plus',
      points: [
        'Async file operations that return promises - `await` them just like `fetch`.',
        '`readFile(path, "utf8")` returns a string; omit the encoding to get a raw Buffer.',
        '`writeFile` overwrites; `appendFile` adds to the end - perfect for logs.',
        '`mkdir(path, { recursive: true })` creates nested directories in one call.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'node:fs/promises in action',
      code: `import { readFile, writeFile, appendFile, mkdir }
  from 'node:fs/promises';

// Create nested dirs - no error if they exist
await mkdir('data/logs', { recursive: true });

// Append an NDJSON line
const row = { id: 'TRX-001', zone: 'CV' };
await appendFile('data/sightings.ndjson',
  JSON.stringify(row) + '\\n');

// Read it back
const text = await readFile('data/sightings.ndjson', 'utf8');
const records = text.trim().split('\\n').map(JSON.parse);`,
      highlights: [
        'One JSON object per line (NDJSON) - append-friendly and easy to stream later',
      ],
    },
  },

  {
    type: 'standard',
    content: {
      title: 'node:fs/promises - watch out',
      icon: 'alert-triangle',
      points: [
        'Forgetting `"utf8"` returns a `Buffer`, not a string - template literals and `.split()` will silently do the wrong thing.',
        '`writeFile` silently overwrites - there is no "are you sure?" prompt. Check with `access()` first if that matters.',
        '`readFile` on a missing file throws `ENOENT` - always `try`/`catch` or check existence first.',
        'Concurrent `appendFile` calls to the same file can interleave - for high-throughput logging, open a write stream instead.',
      ],
    },
  },

  // --- node:fs ---
  {
    type: 'title',
    content: {
      title: 'node:fs',
      subtitle: 'Sync helpers and stream constructors',
      icon: 'hard-drive',
    },
  },
  {
    type: 'standard',
    content: {
      title: 'node:fs',
      icon: 'hard-drive',
      points: [
        'The original filesystem module - synchronous calls and stream constructors.',
        '`readFileSync` / `writeFileSync` block the thread; fine at startup, never inside a request handler.',
        '`createReadStream` / `createWriteStream` produce streams that feed into `pipeline`.',
        'Rule of thumb: `node:fs/promises` for one-shot async work, `node:fs` for sync bootstrapping and streaming.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'node:fs in action',
      code: `import { readFileSync, createReadStream } from 'node:fs';

// Sync - blocks the thread; fine at boot
const config = JSON.parse(
  readFileSync('config.json', 'utf8'),
);

// Stream - non-blocking, constant memory
const stream = createReadStream('big-telemetry.csv');
for await (const chunk of stream) {
  process.stdout.write(chunk);
}`,
      highlights: [
        'Sync for startup, streams for runtime - never `readFileSync` inside a server handler',
      ],
    },
  },

  // --- node:http ---
  {
    type: 'title',
    content: {
      title: 'node:http',
      subtitle: 'Stand up a JSON API from scratch',
      icon: 'globe',
    },
  },
  {
    type: 'standard',
    content: {
      title: 'node:http',
      icon: 'globe',
      points: [
        '`createServer(callback)` gives you a raw HTTP server - no framework needed.',
        'The callback receives `req` (readable stream) and `res` (writable stream).',
        'Route by matching `req.method` and `req.url` with conditionals.',
        "Set `Content-Type`, write a status code, `res.end()` the body - that's the whole API.",
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'node:http in action',
      code: `import { createServer } from 'node:http';

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ ok: true }));
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not_found' }));
});

server.listen(3000, () => console.log('Listening on :3000'));`,
      highlights: [
        'Explicit branches are fine for learning; graduate to Express/Fastify for real apps',
      ],
    },
  },

  {
    type: 'standard',
    content: {
      title: 'node:http - watch out',
      icon: 'alert-triangle',
      points: [
        'Forgetting `res.end()` hangs the connection - the client waits forever and eventually times out.',
        '`req.url` includes the query string: `"/dinos?zone=CV"`, not `"/dinos"` - parse it with `new URL()` to split cleanly.',
        'The request body does not arrive all at once - you *must* collect chunks (or use `for await`) before `JSON.parse`.',
        'Uncaught `JSON.parse` on a malformed body crashes the server - always wrap in `try`/`catch` and respond `400`.',
      ],
    },
  },

  // --- node:stream ---
  {
    type: 'title',
    content: {
      title: 'node:stream',
      subtitle: 'Chunk-by-chunk processing with pipeline',
      icon: 'waves',
    },
  },
  {
    type: 'standard',
    content: {
      title: 'node:stream',
      icon: 'waves',
      points: [
        'Process data chunk by chunk instead of loading it all into memory.',
        'Four types: Readable, Writable, Transform, and Duplex.',
        '`pipeline` from `node:stream/promises` wires streams together with error handling and cleanup.',
        'Backpressure: if the consumer is slow, the producer automatically pauses.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'node:stream in action',
      code: `import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';

const uppercase = new Transform({
  transform(chunk, enc, cb) {
    cb(null, chunk.toString().toUpperCase());
  },
});

await pipeline(
  createReadStream('sensors.csv'),
  uppercase,
  createWriteStream('SENSORS.csv'),
);`,
      highlights: [
        '`pipeline` handles backpressure, errors, and cleanup - prefer it over manual `.pipe()`',
      ],
    },
  },

  {
    type: 'code',
    content: {
      title: 'Filtering rows with a Transform',
      code: `import { createReadStream, createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { Transform } from 'node:stream';

const dangerFilter = new Transform({
  transform(chunk, enc, cb) {
    const line = chunk.toString();
    const [zone, species, level] = line.split(',');
    if (Number(level) >= 8) {
      cb(null, \`\${zone},\${species},\${level}\\n\`);
    } else {
      cb();   // drop the row - pass nothing
    }
  },
});

await pipeline(
  createReadStream('all-sightings.csv'),
  dangerFilter,
  createWriteStream('dangerous-only.csv'),
);`,
      highlights: [
        'Call `cb()` with no data to drop a chunk, or `cb(null, data)` to pass it downstream',
      ],
    },
  },

  {
    type: 'standard',
    content: {
      title: 'node:stream - watch out',
      icon: 'alert-triangle',
      points: [
        '`.pipe()` does *not* forward errors - an error on the source silently leaves the destination open. Use `pipeline` instead.',
        'Chunks are `Buffer`s by default, not strings - call `.toString()` or set `{ encoding: "utf8" }` on the stream.',
        'In a Transform, you *must* call the `callback` every time - forgetting it stalls the entire pipeline.',
        'Never `await` inside a Transform `_transform` method - the callback-based API does not understand promises.',
      ],
    },
  },

  // --- node:readline ---
  {
    type: 'title',
    content: {
      title: 'node:readline',
      subtitle: 'Line-by-line iteration over large files',
      icon: 'text',
    },
  },
  {
    type: 'standard',
    content: {
      title: 'node:readline',
      icon: 'text',
      points: [
        'Wraps any readable stream into a line-by-line async iterable.',
        'Perfect for CSV, NDJSON, or any newline-delimited format.',
        '`for await (const line of rl)` processes one line at a time - memory stays flat.',
        'Pairs naturally with `createReadStream` from `node:fs`.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'node:readline in action',
      code: `import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

const rl = createInterface({
  input: createReadStream('sensors.csv'),
});

for await (const line of rl) {
  const [zone, temp] = line.split(',');
  if (Number(temp) > 40) {
    console.log(\`ALERT: \${zone} at \${temp}°C\`);
  }
}`,
      highlights: ['Reads a 2 GB file with constant memory - no `readFile` spike'],
    },
  },

  // --- Exercises & close ---
  {
    type: 'welcome',
    content: {
      title: 'Exercises - operations desk',
      points: [
        '01 - Sighting logger (fs/promises + path)',
        '02 - Dino HTTP JSON API (http + url)',
        '03 - Stream filter dangerous CSV rows (stream + readline)',
      ],
    },
  },
  {
    type: 'title',
    content: {
      title: 'Operations center - Module 7',
      subtitle: 'Run Node demos, then exercises under module-07-node-tools',
      icon: 'rocket',
    },
  },
];
