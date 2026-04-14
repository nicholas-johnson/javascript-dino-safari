# Module 8 - Code Organisation: Scaling Without Chaos

The park is franchising. New teams mean more modules, more APIs between them, and more ways for errors and config to sprawl. This module is about **boundaries** - where code lives, what it exports, how errors surface, and how configuration stays sane.

By the end of this module you should be able to:

- **Compare feature folders vs layered layouts** and know when a monorepo helps.
- **Design module contracts**: what is exported, which direction dependencies flow.
- **Centralize errors, config, and logging** with clear ownership and fail-fast validation.

---

## 1. Project structure - where things live

```bash
node module-08-code-organisation/demo/01-project-structure
```

### Feature folders vs layers

Most teams start with one of two layouts:

**Layered** (by technical role):

```
src/
  controllers/
  services/
  repositories/
  models/
```

**Feature-first** (by domain):

```
src/
  zones/
    zones.controller.js
    zones.service.js
    zones.repo.js
    zones.test.js
  alerts/
    alerts.controller.js
    alerts.service.js
    alerts.test.js
```

Layered is familiar from MVC tutorials. Feature-first is better as you grow: when you own the "zones" feature, everything you need is in one folder. You don't touch four different directories for a single change.

### Monorepos

This course repo is a monorepo - multiple packages (`module-01`, `module-02`, etc.) in one repository with shared tooling at the root. `pnpm workspaces` handles the wiring. Each module has its own `package.json` and dependencies.

The key benefit: shared linting, testing, and formatting config with independent deployable units. Ask: "Can a new teammate find where X lives?" If the answer is "grep the whole repo," your boundaries need work.

---

## 2. Module contracts - controlling the surface area

```bash
node module-08-code-organisation/demo/02-module-contracts
```

### The facade pattern

A module's `index.js` exports only the public API. Everything else stays internal:

```
zones/
  index.js          ← public API (the facade)
  normalize.js      ← internal
  validate.js       ← internal
  zone.model.js     ← internal
```

```js
// zones/index.js
export { listZones, getZoneById, createZone } from './zone.service.js';
```

Consumers import from `zones/index.js`. They never reach into internal files. If you rename `normalize.js`, only the facade's import changes - not every file in the project.

### One-way dependencies

Good module graphs are a **DAG** (directed acyclic graph). Dependencies flow one way. If module A imports from module B and B imports from A, you have a **circular dependency**. Node will resolve it, but you'll get `undefined` at the point of use and mysterious runtime errors.

Rule of thumb: draw the arrows. If you see a cycle, extract the shared code into a third module that both can import from.

### What makes a good contract

- **Explicit exports**: consumers can only use what you choose to expose.
- **Stable names**: rename internals freely; the facade absorbs the change.
- **One direction**: no cycles, no reaching into another module's internals.
- **Tested**: the facade's exports are the test surface. Internals are tested through the facade.

---

## 3. Error handling, config, and logging

```bash
node module-08-code-organisation/demo/03-error-handling
```

### Custom error types

Catching errors by message string is fragile. Create typed errors with a stable `code`:

```js
class AppError extends Error {
  constructor(code, message, context = {}) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.context = context;
  }
}

class ConfigError extends AppError {
  constructor(message, context) {
    super('CONFIG_INVALID', message, context);
    this.name = 'ConfigError';
  }
}
```

Callers switch on `error.code`, not the message:

```js
try {
  const config = loadConfig(process.env);
} catch (err) {
  if (err.code === 'CONFIG_INVALID') {
    console.error('Fix your .env:', err.message);
    process.exit(1);
  }
  throw err;
}
```

### Config validation - fail fast

Don't let a missing env var surface as a cryptic `undefined` deep in a database call. Validate at startup:

```js
function loadConfig(env) {
  const required = ['DATABASE_URL', 'API_KEY', 'LOG_LEVEL'];
  const missing = required.filter((key) => env[key] === undefined);

  if (missing.length > 0) {
    throw new ConfigError(`Missing required env vars: ${missing.join(', ')}`, {
      missing,
    });
  }

  return {
    databaseUrl: env.DATABASE_URL,
    apiKey: env.API_KEY,
    logLevel: env.LOG_LEVEL || 'info',
  };
}
```

If the app can't start correctly, it should crash loudly with a message that tells you exactly what to fix.

### Structured logging

Unstructured logs (`console.log('something happened')`) are impossible to parse at scale. A single formatting function keeps everything consistent:

```js
function formatLogLine(level, message, context = {}) {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...context,
  });
}

console.log(
  formatLogLine('info', 'Zone scan complete', { zone: 'paddock-a', count: 12 }),
);
// {"timestamp":"2026-04-10T10:30:00.000Z","level":"info","message":"Zone scan complete","zone":"paddock-a","count":12}
```

Every log line has the same shape. Log aggregators (Datadog, ELK, CloudWatch) can index and query them reliably.

---

## Exercises

| #   | Folder                                                      | What you'll practice                                                                                     |
| --- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 1   | [`exercises/01-split-modules`](exercises/01-split-modules/) | Refactor a monolith (`compileDigest`) into three focused modules. Tests must stay green after each move. |
| 2   | [`exercises/02-error-config`](exercises/02-error-config/)   | Build `AppError`, `loadConfig`, and `formatLogLine` from scratch.                                        |

Run all module tests:

```bash
cd module-08-code-organisation/exercises/<exercise>/starter && pnpm install && pnpm test
```

---

## Slides

Teaching deck: from repo root run `pnpm slides:08`, or `cd slides && pnpm dev`.

## Reference

- [Node.js Modules docs](https://nodejs.org/api/esm.html)
- [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [12-Factor App: Config](https://12factor.net/config)
