# Capstone 5 - Real-Time Log Monitor

Build a system with two parts: a log generator that appends NDJSON entries to a file, and a monitor that streams the file in real time, filters for alerts, and serves a live summary over HTTP.

---

## What you're building

**Terminal 1 - generate fake logs:**

```bash
node generate-logs.js --file logs/app.ndjson --interval 500
```

**Terminal 2 - monitor and serve:**

```bash
node monitor.js --file logs/app.ndjson --port 3000
```

Then visit `http://localhost:3000/summary` to see a live JSON summary of error counts, most recent alerts, and uptime.

---

## Requirements

### Log generator

- Append one NDJSON line every `--interval` milliseconds using `appendFile`.
- Each entry: `{ timestamp, level, service, message }`.
- `level` is one of `"info"`, `"warn"`, `"error"` - randomly weighted (70% info, 20% warn, 10% error).
- `service` is randomly picked from a list: `"auth"`, `"api"`, `"db"`, `"cache"`.
- Write a `createLogFactory(services)` function that returns a generator function. The generator closes over the service list and a counter, producing a new log entry on each call.

### Stream reader

- Monitor the log file using `createReadStream` with `createInterface` from `node:readline`.
- Process each line as it arrives with `for await (const line of rl)`.
- After reaching the end of the existing file, use `fs.watch` or poll with a short interval to detect new lines appended by the generator.

### Alert pipeline (functional)

- Parse each JSON line and run it through a processing pipeline:
  1. `.filter()` - keep only `"warn"` and `"error"` entries.
  2. `.map()` - reshape into `{ timestamp, level, service, message, severity }` where severity is a number (warn = 1, error = 2).
  3. Accumulate into a rolling window of the last 50 alerts using a ring buffer.
- Write the ring buffer as a closure: `createRingBuffer(capacity)` returns `{ push(item), toArray() }`, closing over a fixed-size array and a write index.

### In-memory stats

- Track counts using a `Map<string, number>` keyed by `"level:service"` (e.g. `"error:db"`).
- Use a class `StatsCollector` with methods `record(entry)`, `getSummary()`, and a private `#counts` field.
- `getSummary()` returns: total entries processed, error count, warn count, top 3 noisiest services (use `.sort()` and `.slice()`), and the last 10 alerts from the ring buffer.

### HTTP dashboard

- Serve two endpoints with `node:http`:
  - `GET /summary` - returns the stats summary as JSON.
  - `GET /health` - returns `{ "status": "ok", "uptime": process.uptime() }`.
- Parse the URL with `new URL(req.url, base)` to handle query strings cleanly.
- Return `404` with `{ "error": "not_found" }` for anything else.
- Set appropriate `Content-Type` headers.

### Error handling

- If the log file doesn't exist yet, wait and retry (the generator might not have started).
- Wrap `JSON.parse` on every line in `try`/`catch` - skip corrupt lines with a warning, don't crash.
- If the HTTP server fails to bind the port, catch the error and print a clear message.
- Use a custom `MonitorError` class with a `code` property.

### Code organisation

- **generate-logs.js** - standalone script.
- **monitor.js** - entry point for the monitor.
- `lib/stream-reader.js` - file streaming and watch logic.
- `lib/pipeline.js` - filter, map, and ring buffer.
- `lib/stats.js` - `StatsCollector` class.
- `lib/server.js` - HTTP server setup and routing.
- `lib/ring-buffer.js` - ring buffer factory.

---

## Modules practiced

| Module | How it's used |
|---|---|
| 1 - Modern JS | ESM, template literals, `const`/`let`, `for...of` |
| 2 - Functions | `.filter()`, `.map()`, `.sort()`, `.slice()` pipeline |
| 3 - Closures | Log factory, ring buffer closing over fixed array and index |
| 4 - Gotchas | `JSON.parse` crash risk, `NaN` on corrupt data, `===` |
| 5 - Objects | `StatsCollector` class with `#private` fields, `Map` for counts |
| 6 - Async | `async`/`await` for file ops, `setInterval`, `AbortController` for clean shutdown |
| 7 - Node tools | `fs/promises`, `fs.createReadStream`, `readline`, `http`, `path`, `url` |
| 8 - Code org | Multi-module `lib/` structure, custom errors, facade entry points |

---

## Stretch goals

- Add a `--grep <pattern>` flag to the monitor that only counts entries whose message matches a regex.
- Add `Promise.race` with a timeout so the monitor exits if no new log lines appear for 30 seconds.
- Pipe the alert stream through a Transform that formats entries as CSV and writes to a separate `alerts.csv` file using `pipeline`.
