# Exercise - Sighting logger (filesystem)

**Mission briefing:** Persist sightings as **NDJSON** (one JSON object per line) under a file path you control.

## Tasks

Implement in [`starter/index.js`](starter/index.js):

1. **`appendSighting(filePath, record)`** - append `JSON.stringify(record) + '\n'` using **`fs/promises`** (`appendFile`). Create parent directories if needed (`mkdir` with `{ recursive: true }`).
2. **`readSightings(filePath)`** - read the file as UTF-8, split on newlines, filter empties, `JSON.parse` each line, return an array of objects.

## Verify

```bash
cd starter && pnpm install && pnpm test
```

Reference: [`solution/index.js`](solution/index.js).
