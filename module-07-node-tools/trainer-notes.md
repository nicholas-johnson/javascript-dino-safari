# Module 7 - Node.js Tools: Trainer Notes

## Goal

Students can use Node's standard library for real tasks: read/write files, stand up a small HTTP JSON API, and process large data with streams.

## Demo walkthrough

### 01 - Filesystem

- Show `readFile`, `writeFile`, `appendFile` from `node:fs/promises`. All async - tie back to Module 6.
- `mkdir({ recursive: true })` - avoids "directory not found" errors.
- `path.join` - never concatenate slashes manually. Show Windows vs POSIX difference.
- `fileURLToPath(import.meta.url)` - ESM-friendly way to get `__dirname`. Explain why ESM doesn't have `__dirname` natively.
- Live-code: append a few JSON lines to a file, read them back, parse each line.

### 02 - HTTP server

- `http.createServer` - one callback, `req` and `res`. Show method/URL routing with `if` branches.
- Set `Content-Type: application/json` and write `JSON.stringify(body)`.
- Status codes: 200, 201, 400, 404, 500. Ask: "What status for malformed JSON in the request body?" (400.)
- Parse request body by collecting chunks. Show what happens with invalid JSON (wrap in try/catch, return 400).
- Run the server, hit it with `curl` or the browser. `Ctrl+C` to stop.

### 03 - Streams

- Show `createReadStream` - reads a file in chunks instead of loading it all into memory.
- Transform stream: line-by-line CSV processing, filtering rows by a condition.
- `pipeline` from `node:stream/promises` - handles errors and cleanup.
- Backpressure intuition: "If the consumer is slow, the producer pauses." No need to go deep - just plant the concept.

## Exercises

| #   | Folder                | Key skills                                       | Notes                                           |
| --- | --------------------- | ------------------------------------------------ | ----------------------------------------------- |
| 1   | `01-file-io-ndjson`   | `fs/promises`, `path`, NDJSON append/read        | `mkdir` + `appendFile` + line-by-line parsing.  |
| 2   | `02-http-json-server` | `http.createServer`, routing, JSON, status codes | Health endpoint, list, get-by-id, 404 handling. |
| 3   | `03-stream-processor` | Streams or readline, transform, filter           | Process CSV, filter by danger level.            |

## Timing

- Demo 01 (filesystem): ~15 min.
- Demo 02 (HTTP server): ~20 min.
- Demo 03 (streams): ~10 min.
- Exercises: ~40–50 min for all three.
- Total: ~1.5–2 hours.

## Common issues

- **Forgetting `await` on fs/promises**: `readFile` returns a promise. Without `await`, students get `[object Promise]` in their output.
- **Path separators**: students hard-code `/` on macOS and it breaks in examples. Use `path.join` always.
- **HTTP body parsing**: students forget the request body arrives in chunks. Need to collect `data` events or use a helper.
- **JSON.parse on empty body**: throws. Wrap in try/catch, return 400 for malformed input.
- **Stream error handling**: students pipe without `pipeline` or `.on('error')` and get unhandled exceptions on bad files.
- **Forgetting `res.end()`**: the HTTP response hangs if you `write()` without `end()`.
