# Exercise - Errors, config, and log lines

**Mission briefing:** Operations wants **typed errors**, **validated env config**, and a single **`formatLogLine`** helper so every subsystem logs consistently.

## Tasks

Implement in [`starter/index.js`](starter/index.js):

1. **`AppError`** - `class AppError extends Error` with a **`code`** string property (e.g. `new AppError('NOT_FOUND', 'missing dino')`).
2. **`loadConfig(env)`** - pass `process.env` (tests inject a fake object). Require `PARK_NAME` (non-empty string). Read `API_PORT` default **`'8080'`**; must be a positive integer string. On violations throw **`AppError`** with codes **`CONFIG_MISSING`** / **`CONFIG_INVALID`**.
3. **`formatLogLine(level, message, meta)`** - return `"[LEVEL] message | key=value"` joined for each `meta` entry sorted by key. If `meta` is empty/undefined, omit the `|` section.

## Verify

```bash
cd starter && pnpm install && pnpm test
```

Reference: [`solution/index.js`](solution/index.js).
