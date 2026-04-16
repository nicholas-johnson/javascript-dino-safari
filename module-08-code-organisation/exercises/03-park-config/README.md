# Capstone 03 - Park Config

## The scenario

Before the park can scale to multiple environments - development, staging, production - it needs a robust configuration system. Environment variables must be validated on startup (fail fast with a clear error, not halfway through a request), errors need structured types with codes so monitoring tools can categorise them, and logging needs configurable levels so debug noise doesn't flood production.

This exercise combines classes (custom errors), object literals with methods (the logger), closures (level gating), and module boundaries organised by domain.

## Project structure

```
starter/
  errors/
    app-error.js        ← custom error class
    index.js            ← barrel: exports { AppError }
  config/
    config.js           ← config loader with validation
    index.js            ← barrel: exports { loadConfig }
  logging/
    logger.js           ← levelled structured logger
    index.js            ← barrel: exports { createLogger }
  index.js              ← entry point
  index.test.js         ← tests (imports through barrels)
```

## What you will build

### [`starter/errors/app-error.js`](starter/errors/app-error.js) - Custom error class

**`AppError`** extends `Error` with:

- `name` property set to `'AppError'`
- `code` property (e.g. `'CONFIG_MISSING'`, `'CONFIG_INVALID'`)
- `message` inherited from `Error`

```js
const err = new AppError('CONFIG_MISSING', 'PARK_NAME is required');
err instanceof Error; // true
err instanceof AppError; // true
err.name; // 'AppError'
err.code; // 'CONFIG_MISSING'
err.message; // 'PARK_NAME is required'
```

### [`starter/config/config.js`](starter/config/config.js) - Config loader

**`loadConfig(env)`** - validate an environment-like object and return a typed config. Imports `AppError` from `../errors/index.js`.

| Env var     | Validation                                  | Default                                         |
| ----------- | ------------------------------------------- | ----------------------------------------------- |
| `PARK_NAME` | Required, non-empty after trim              | - (throw `AppError` with code `CONFIG_MISSING`) |
| `API_PORT`  | Must be a positive integer                  | `8080`                                          |
| `LOG_LEVEL` | Must be `debug`, `info`, `warn`, or `error` | `'info'`                                        |

Throw `AppError` with code `CONFIG_MISSING` for missing `PARK_NAME`, and `CONFIG_INVALID` for bad `API_PORT` or `LOG_LEVEL`.

Return `{ parkName: string, apiPort: number, logLevel: string }`.

### [`starter/logging/logger.js`](starter/logging/logger.js) - Levelled structured logger

**`createLogger(config)`** - return an object with `debug`, `info`, `warn`, and `error` methods.

Each method `(message, meta?)`:

- If the method's level is below the configured `logLevel`, return `null` (don't log).
- Otherwise, format and `console.log` the line, then return it:

```
[LEVEL] [parkName] message | key1=value1 key2=value2
```

- Meta keys are sorted alphabetically.
- If `meta` is empty or omitted, skip the ` | ...` suffix.
- Level hierarchy: `debug < info < warn < error`.

```js
const log = createLogger({ parkName: 'Dino Safari', logLevel: 'info' });
log.info('Starting', { port: 3000 }); // "[INFO] [Dino Safari] Starting | port=3000"
log.debug('Trace'); // null (below info level)
```

## Getting started

Implement `errors/app-error.js` first (simplest), then `config/config.js`, then `logging/logger.js`. Run:

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The tests check `AppError` inheritance, config validation (missing, whitespace, invalid port, invalid level, defaults), and logger formatting (meta sorting, empty meta, level gating).

## Hints

- In `AppError`, call `super(message)` and set `this.name = 'AppError'` and `this.code = code`.
- For `loadConfig`, check `PARK_NAME` first, then parse `API_PORT` with `Number(env.API_PORT)`, and validate `LOG_LEVEL` against a whitelist.
- For the logger, assign numeric weights to levels (`debug: 0, info: 1, warn: 2, error: 3`) and compare against the configured level to decide whether to emit.
- Format meta with `Object.entries(meta).sort(([a],[b]) => a.localeCompare(b)).map(([k,v]) => \`${k}=${v}\`).join(' ')`.

## Reference solution

[`solution/`](solution/) folder
