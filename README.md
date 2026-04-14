# Dinosaur Safari: JavaScript with Node

```
                    __
                   / _)
        _.----._/ /
       /         /
    __/ (  | (  |
   /__.-'|_|--|_|
   🦖 Welcome to Jurassic Node.js 🦕
```

**Mission:** Build rock-solid JavaScript skills while running everything in **Node.js** - from modern syntax and tooling to async patterns, streams, and scalable project structure. HQ has opened the park gates for two intensive days of hands-on tracking.

## Prerequisites

- **Node.js** v20 or newer (`node -v`)
- **pnpm** v10 or newer (`pnpm -v`) - install with `corepack enable && corepack prepare pnpm@latest --activate`
- A code editor (VS Code / Cursor recommended)
- Terminal comfort (`cd`, `pnpm`)

## Setup

```bash
cd javascript-with-node-course
pnpm install
pnpm test          # run all exercise tests (Vitest - many fail until you complete start.js)
pnpm lint          # ESLint
pnpm format        # Prettier
```

This project is a **pnpm monorepo** - each module is its own workspace package under `module-*/`. All shared tooling (Vitest, ESLint, Prettier) lives at the root.

Each **module** has its own `README.md`, **demo** scripts you can run with `node …`, and **exercises** with `start.js` (your work), `start.test.js` (Vitest), and `solution.js` (instructor reference - try the exercise first!).

Shared park data lives in [`data/dinosaurs.json`](data/dinosaurs.json).

## Slides (React + `slide-deck`)

Each module includes a Vite app under `slides/` that renders teaching decks with the workspace package [`slide-deck`](slide-deck/).

```bash
pnpm slides:01          # same pattern :02 … :08
# or
cd module-01-modern-javascript/slides && pnpm dev
```

Build for static hosting: `pnpm --filter @dino-safari/module-01-slides build` (output in `slides/dist/`).

## Schedule

### Day 1 - Foundations of the park

| Block | Module                                                      | Topic                                               |
| ----- | ----------------------------------------------------------- | --------------------------------------------------- |
| 1     | [module-01-modern-javascript](module-01-modern-javascript/) | Modern JS: ESM, tooling, Vitest, debugging          |
| 2     | [module-02-functions](module-02-functions/)                 | Functions, arrows, map/filter/reduce                |
| 3     | [module-03-closures](module-03-closures/)                   | Closures, currying, immutability                    |
| 4     | [module-04-js-gotchas](module-04-js-gotchas/)               | JS Gotchas: coercion, truthiness, equality, numbers |

### Day 2 - Operations & scale

| Block | Module                                                        | Topic                                            |
| ----- | ------------------------------------------------------------- | ------------------------------------------------ |
| 5     | [module-05-objects-prototypes](module-05-objects-prototypes/) | Objects & prototypes, Maps/Sets, composition     |
| 6     | [module-06-async](module-06-async/)                           | Promises, async/await, concurrency, event loop   |
| 7     | [module-07-node-tools](module-07-node-tools/)                 | Files, HTTP, streams                             |
| 8     | [module-08-code-organisation](module-08-code-organisation/)   | Structure, APIs between modules, errors & config |

## Course outline

All **exercises** run in **Node.js** and are checked with **Vitest** (`start.js` / `start.test.js`). **Demos** are plain `node …` scripts. Optional **slides** under each module’s `slides/` folder are separate Vite + React apps for teaching only.

### Module 1 - [Modern JavaScript](module-01-modern-javascript/)

**Topics:** Hello World, syntax basics (`const`/`let`, loops), string manipulation, ESM (`import`/`export`, `"type": "module"`), `package.json` scripts, npm packages, debugging with `node --inspect`.

**Demos:** Hello World; variables and loops; string methods; ESM import/export; package scripts + npm; intentional bug for stepping through.

| Exercise        | Folder                                                                                      | What you practice                                                               |
| --------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Strings         | [`exercises/01-strings`](module-01-modern-javascript/exercises/01-strings/)                 | `toUpperCase`, `toLowerCase`, `includes`, `split`, template literals            |
| Package scripts | [`exercises/02-package-scripts`](module-01-modern-javascript/exercises/02-package-scripts/) | `start`, `lint`, `test` scripts; wiring Node and Vitest from `package.json`     |
| ESM imports     | [`exercises/03-esm-imports`](module-01-modern-javascript/exercises/03-esm-imports/)         | Import from Node built-in (`node:path`), npm (`picocolors`), and a local module |

### Module 2 - [Functions, arrows, functional loops](module-02-functions/)

**Topics:** Introduction to functions, Vitest, function declarations, expressions, arrow syntax, default/rest parameters, functions as values, `.filter()`, `.sort()`, `.map()`, `.reduce()`, pipelines.

**Demos:** Function intro; Vitest; function basics (declarations, expressions, arrows); filter; sort; map; reduce; carnivore pipeline over JSON data.

| Exercise           | Folder                                                                                    | What you practice                                        |
| ------------------ | ----------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Function intro     | [`exercises/01-function-intro`](module-02-functions/exercises/01-function-intro/)         | `function` keyword, parameters, return values            |
| Vitest contract    | [`exercises/02-vitest-contract`](module-02-functions/exercises/02-vitest-contract/)       | Implement `formatSighting`; Vitest guarding the contract |
| Arrow functions    | [`exercises/03-arrow-functions`](module-02-functions/exercises/03-arrow-functions/)       | Arrow syntax, default params, rest params                |
| Filter             | [`exercises/04-filter`](module-02-functions/exercises/04-filter/)                         | `.filter()` on numbers and objects                       |
| Sort               | [`exercises/05-sort`](module-02-functions/exercises/05-sort/)                             | `.sort()` with numeric and string comparators            |
| Map                | [`exercises/06-map`](module-02-functions/exercises/06-map/)                               | `.map()` to double, extract, format                      |
| Reduce             | [`exercises/07-reduce`](module-02-functions/exercises/07-reduce/)                         | `.reduce()` to sum, group, find max                      |
| Migration pipeline | [`exercises/08-migration-pipeline`](module-02-functions/exercises/08-migration-pipeline/) | Full pipeline: filter + map + reduce composed            |

### Module 3 - [Closures & currying](module-03-closures/)

**Topics:** Closures and private state, partial application, currying, immutability (spread vs `structuredClone`).

**Demos:** Zone tracker factory with closure-held state; partial application and currying; shallow vs deep copy.

| Exercise            | Folder                                                                                     | What you practice                                             |
| ------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| Closure factory     | [`exercises/01-closure-factory`](module-03-closures/exercises/01-closure-factory/)         | `createZoneTracker` with private sightings array              |
| Partial application | [`exercises/02-partial-application`](module-03-closures/exercises/02-partial-application/) | `createAlertFn`, `createTaggedLogger`; higher-order functions |
| Immutable records   | [`exercises/03-immutable-records`](module-03-closures/exercises/03-immutable-records/)     | `bumpDangerLevel`, `renameZone` without mutating inputs       |

### Module 4 - [JS Gotchas](module-04-js-gotchas/)

**Topics:** Coercion traps, the eight falsy values, `||` vs `??`, `==` vs `===` vs `Object.is`, `typeof` quirks, `NaN`, `-0`, IEEE floats and money, `parseInt` hazards.

**Demos:** Coercion traps; truthy/falsy deep dive; number gotchas; edge cases (`typeof null`, `-0`, `Object.is`).

| Exercise           | Folder                                                                               | What you practice                                                 |
| ------------------ | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Bug Hunt: Coercion | [`exercises/01-bugfix-coercion`](module-04-js-gotchas/exercises/01-bugfix-coercion/) | Fix 6 functions with `!val`, `\|\|` vs `??`, `==` traps           |
| Bug Hunt: Equality | [`exercises/02-bugfix-equality`](module-04-js-gotchas/exercises/02-bugfix-equality/) | Fix 5 functions with `typeof`, `=== null`, `NaN`, `Object.is`     |
| Bug Hunt: Numbers  | [`exercises/03-bugfix-numbers`](module-04-js-gotchas/exercises/03-bugfix-numbers/)   | Fix 5 functions with float drift, `parseInt`, `isNaN`, `.toFixed` |

### Module 5 - [Objects & prototypes](module-05-objects-prototypes/)

**Topics:** Prototype chain, property lookup, constructors vs `class` sugar, `Map` / `Set`, composition vs deep inheritance.

**Demos:** Prototype chain with constructors; `class` syntax (extends, super, getters, statics); Map/Set registry; simple capability composition; composition with destructuring.

| Exercise          | Folder                                                                                           | What you practice                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| Prototypes        | [`exercises/01-prototypes`](module-05-objects-prototypes/exercises/01-prototypes/)               | `Dinosaur` / `FlyingDinosaur` with prototypes only (no `class`)   |
| Map & Set         | [`exercises/02-map-and-set`](module-05-objects-prototypes/exercises/02-map-and-set/)             | `createDinoRegistry`: add, get, findByZone, sorted unique species |
| Mixin composition | [`exercises/03-mixin-composition`](module-05-objects-prototypes/exercises/03-mixin-composition/) | Mixins `withSwim` / `withFly` / `withArmor`; spread, no mutation  |

### Module 6 - [Async JavaScript](module-06-async/)

**Topics:** Promises (chain, errors), `async` / `await`, `Promise.all` / `allSettled` / `race`, timeouts and retries, `AbortController`, event loop intuition, unhandled rejections.

**Demos:** Chained delays; concurrency + race + abort sketch; ordering of timers vs microtasks.

| Exercise           | Folder                                                                                | What you practice                                            |
| ------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Retry & timeout    | [`exercises/01-retry-timeout`](module-06-async/exercises/01-retry-timeout/)           | `withTimeout`, `runWithRetry`                                |
| Promise.allSettled | [`exercises/02-promise-allsettled`](module-06-async/exercises/02-promise-allsettled/) | `Promise.allSettled` with uniform fulfilled/rejected summary |
| AbortController    | [`exercises/03-abort-controller`](module-06-async/exercises/03-abort-controller/)     | `createCancellableTask` with `AbortController`               |

### Module 7 - [Node.js tools](module-07-node-tools/)

**Topics:** `fs/promises`, `path`, `process.env` / `argv`, `http.createServer`, JSON request/response patterns, streams, `readline`, piping, backpressure intuition.

**Demos:** Scratch logs; small HTTP JSON server; streaming CSV through a transform.

| Exercise          | Folder                                                                                 | What you practice                                        |
| ----------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| File I/O & NDJSON | [`exercises/01-file-io-ndjson`](module-07-node-tools/exercises/01-file-io-ndjson/)     | Append/read NDJSON; `mkdir` recursive                    |
| HTTP JSON server  | [`exercises/02-http-json-server`](module-07-node-tools/exercises/02-http-json-server/) | `createDinoApiServer`: health, list, get by id, 404 JSON |
| Stream processor  | [`exercises/03-stream-processor`](module-07-node-tools/exercises/03-stream-processor/) | Stream or readline over CSV; filter by danger level      |

### Module 8 - [Code organisation](module-08-code-organisation/)

**Topics:** Feature vs layered layout, module contracts, dependency direction, custom errors, env-based config, logging shape.

**Demos:** Project structure patterns; module contracts and dependency direction; centralized error handling for config.

| Exercise       | Folder                                                                                  | What you practice                                                          |
| -------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Split modules  | [`exercises/01-split-modules`](module-08-code-organisation/exercises/01-split-modules/) | Split `compileDigest` from monolith into focused modules; keep tests green |
| Error & config | [`exercises/02-error-config`](module-08-code-organisation/exercises/02-error-config/)   | `AppError`, `loadConfig`, `formatLogLine`                                  |

## Running tests for a single module

```bash
pnpm --filter @dino-safari/module-01-modern-javascript test
```

Or from within a module directory:

```bash
cd module-01-modern-javascript
pnpm test
```

Or target a single exercise from the root:

```bash
pnpm vitest run module-02-functions/exercises/02-vitest-contract/start.test.js
```

## Workspace commands

```bash
pnpm -r test                    # run test script in every module
pnpm --filter "module-*" test   # same, by glob
```

## Debugging demos

Use the Node inspector on any demo or exercise:

```bash
node --inspect module-01-modern-javascript/demo/06-debugging
```

Then attach your debugger (Chrome: `chrome://inspect`).

## License

Copyright (c) 2026 Nicholas Johnson. **All rights reserved.** This material is not licensed for use, copying, or distribution by others. See [LICENSE](LICENSE).
