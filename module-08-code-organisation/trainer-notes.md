# Module 8 - Code Organisation: Trainer Notes

## Goal

Students understand how to structure a growing JS codebase: feature folders vs layers, clean module boundaries, typed errors, environment config, and consistent logging. They can split a monolith into focused modules while keeping tests green.

## Demo walkthrough

### 01 - Project structure

- Walk through the suggested feature-first layout printed by the demo.
- Contrast with layered layout (controllers/services/repos). Ask: "Which is easier to navigate when you own one feature?"
- Point at this course repo as a real monorepo example: shared tooling at root, `pnpm workspaces`, `@dino-safari/` naming.
- Key message: pick a convention and enforce it. The worst structure is no structure.

### 02 - Module contracts

- Show the facade pattern: `index.js` exports only the public API. Internals stay private.
- Demonstrate one-way dependencies. Ask: "What breaks if module A imports from module B and B imports from A?" (Circular imports - runtime surprises.)
- Live-code: rename an internal function, show that only the facade's import changes, not every consumer.

### 03 - Error handling

- `ConfigError extends Error` with a `code` property. Show how callers can switch on `error.code` instead of parsing message strings.
- `loadConfig(env)` validates required env vars at startup. Fail fast with an actionable message.
- `formatLogLine` - consistent structured logging. Show level, timestamp, message, context.
- Ask: "Where should you catch errors - deep in the helper or at the edge?" (At the edge. Helpers throw; the composition root catches and logs.)

## Capstone Exercises

These are multi-file capstones drawing from skills across the whole course.

| #   | Folder               | Skills combined                                           | Notes                                                                                      |
| --- | -------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 1   | `01-dino-dashboard`  | Fetch, Promise.all, map/reduce, objects, `this`           | 3 domain folders: `data/`, `analytics/`, `dashboard/` with barrel `index.js` files.        |
| 2   | `02-alert-pipeline`  | Closures, HOFs, map/filter, immutability, composition     | 2 domain folders: `alerts/` (validate, normalise, deduplicate) and `pipeline/`.            |
| 3   | `03-park-config`     | Classes, errors, config validation, object methods        | 3 domain folders: `errors/`, `config/`, `logging/` with barrel `index.js` files.           |

## Timing

- Demo 01 (project structure): ~10 min.
- Demo 02 (module contracts): ~15 min.
- Demo 03 (error handling): ~10 min.
- Capstone 01 (dashboard): ~25–30 min.
- Capstone 02 (alert pipeline): ~25–30 min.
- Capstone 03 (park config): ~20–25 min.
- Total: ~2–2.5 hours.

## Common issues

- **Circular imports**: students import a helper from another module that imports back. Node resolves it but with `undefined` at the point of use. Explain the symptom: "TypeError: X is not a function" at runtime.
- **Forgetting `.json()` on fetch response**: `fetch` resolves with a `Response`, not parsed data. Remind them of the Module 6 demo.
- **Mutating input in normalise**: students modify the original alert object. Tests check the original is untouched.
- **Deduplicator closure shared across tests**: each call to `processAlerts` should create a fresh deduplicator.
- **Config validation too lax**: students check `if (!env.VAR)` which treats `""` and `"0"` as missing. Use explicit checks.
- **Error subclass missing `this.name`**: `error.name` defaults to `"Error"`. Set `this.name = 'AppError'` for better stack traces.
- **Logger level filtering**: students forget the level hierarchy. Debug < info < warn < error. A debug message should not appear when level is info.
