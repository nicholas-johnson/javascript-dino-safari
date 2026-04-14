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

## Exercises

| #   | Folder             | Key skills                                          | Notes                                                                                                                           |
| --- | ------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `01-split-modules` | Refactoring, module boundaries, tests as safety net | Split `compileDigest` monolith into `normalize-zones`, `count-alerts`, `compile-digest`. Tests must stay green after each move. |
| 2   | `02-error-config`  | Custom errors, env config, log formatting           | `AppError`, `loadConfig`, `formatLogLine`.                                                                                      |

## Timing

- Demo 01 (project structure): ~10 min.
- Demo 02 (module contracts): ~15 min.
- Demo 03 (error handling): ~10 min.
- Exercise 01 (split modules): ~25–30 min.
- Exercise 02 (error/config): ~20 min.
- Total: ~1.5 hours.

## Common issues

- **Circular imports**: students import a helper from another module that imports back. Node resolves it but with `undefined` at the point of use. Explain the symptom: "TypeError: X is not a function" at runtime.
- **Breaking tests while refactoring**: students change function signatures during extraction. Emphasise: move code first, refactor second. Run tests after every small step.
- **Config validation too lax**: students check `if (!env.VAR)` which treats `""` and `"0"` as missing. Use explicit `=== undefined` or `.trim()` checks.
- **Error subclass missing `this.name`**: `error.name` defaults to `"Error"`. Set `this.name = 'AppError'` or use the class name explicitly for better stack traces.
- **Logging inconsistency**: students use different formats per function. Show how a single `formatLogLine` keeps everything uniform for log parsers.
