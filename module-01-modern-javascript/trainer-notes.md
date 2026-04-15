# Module 1 - Trainer Notes

## Goal

Get everyone from zero to a working modern JS workflow: run scripts, split code into modules, install packages, write basic functions, run Vitest tests, and attach a debugger.

## Demo walkthrough

### 01 - Hello World

- Confirm `node -v` works for everyone.
- `node module-01-modern-javascript/demo/01-hello-world` - one `console.log`, instant win.
- Point out: `node` runs a file, `console.log` writes to stdout. That's the whole mental model for now.

### 02 - Syntax fundamentals

- Skip for experienced groups. Useful for mixed rooms to level-set.
- `const` vs `let` - no `var`, ever.
- Three loop forms: `for...of` (most common), classic `for` (when you need an index), `while` (condition-based).
- Ask someone to change a loop bound, predict what happens, run it.

### 03 - String manipulation

- Walk through each section: template literals, trimming, case, searching, slicing, splitting/joining, replacing.
- Emphasise immutability: all string methods return a _new_ string.
- Ask students to guess what `'  hello  '.trim().toUpperCase()` returns before running.
- Good place to mention chaining - `str.trim().toLowerCase().split(' ')`.

### 04 - ESM basics

- Open `park-info.js` and `index.js` side by side.
- Named exports: `{ braces }`, names must match exactly. Ask: "What happens if you typo `PARK_NAME`?" (you get `undefined`, no error).
- Default export: can use any name on the import side - that's why many teams avoid defaults.
- Point out `"type": "module"` in `package.json` - without it, Node falls back to CommonJS (`require`).

### 05 - Package scripts + npm

- Live-code in a scratch folder if time allows:
  - `pnpm init` → show the generated `package.json`.
  - `pnpm add picocolors` → show `node_modules/`, show the new `dependencies` entry.
  - Add a `"start"` script, run it with `pnpm start`.
- Run the demo: `node module-01-modern-javascript/demo/05-package-scripts`.
- Then run via the script: `pnpm demo:scripts -- --sector=ridge --verbose`.
- Show `process.env.npm_lifecycle_event` - it's set only when running via a script.
- Explain `node_modules/.bin` on PATH: that's why `vitest` and `eslint` work inside scripts without global install.

### 06 - Function intro

- Walk through a bare-bones `function` declaration, parameters, and `return`.
- Keep it simple: no arrow functions, no defaults, no rest. Those come in Module 2.
- Ask students: "What happens if you forget `return`?" (`undefined`).
- Good warm-up before Vitest, since tests call functions and check return values.

### 07 - Vitest intro

- Open `alert.js`, `alert.test.js`, and `index.js` side by side.
- Run the tests: `pnpm vitest run module-01-modern-javascript/demo/07-vitest-intro/alert.test.js`.
- Explain the `describe` / `it` / `expect` pattern.
- Point out: tests are just functions that call your functions and check the result.
- This demo is the bridge to every exercise in the course - from here on, "make the tests pass" is the workflow.

### 08 - Debugging

- Run with `--inspect`, attach Chrome DevTools or IDE debugger.
- Set a breakpoint inside the `for` loop in `averageWeightKg`.
- Step through - ask the group to spot the bug (`<=` should be `<`).
- The bug is subtle: `undefined?.weightKg ?? 0` adds zero silently, so no crash, just a wrong answer.
- Takeaway: complex state (loops, objects, arrays) → debugger beats `console.log`.

## Exercises

| #   | Folder               | Key skills                                                           | Notes                                                                                |
| --- | -------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| 1   | `01-strings`         | `toUpperCase`, `toLowerCase`, `includes`, `split`, template literals | Reinforces demo 03. Gentle first exercise - pure string work.                        |
| 2   | `02-package-scripts` | `pnpm init`, adding scripts, `pnpm test`                             | Reinforces demo 05. Students edit a `package.json`.                                  |
| 3   | `03-esm-imports`     | Import from Node built-in, npm, local module                         | Ties demos 04 + 05 together. Uses `node:path`, `picocolors`, local `risk-levels.js`. |
| 4   | `04-function-intro`  | `function` keyword, params, return                                   | Reinforces demo 06. Plain functions, no arrows yet.                                  |
| 5   | `05-vitest-contract` | `??` defaults, template literals, Vitest                             | Reinforces demo 07. First time students write code _to pass a test_.                 |

## Timing

- Demos 01–05: ~40–50 min (less if skipping demo 02).
- Demo 06 (functions): ~10 min.
- Demo 07 (Vitest): ~10–15 min.
- Demo 08 (debugging): ~10 min.
- Exercises: ~50–60 min for all five.
- Total: roughly 2.5 hours including Q&A.

## Common issues

- **`ERR_MODULE_NOT_FOUND`**: student forgot `.js` extension on a relative import. ESM requires it.
- **`SyntaxError: Cannot use import`**: missing `"type": "module"` in `package.json`.
- **`pnpm` not found**: `corepack enable && corepack prepare pnpm@latest --activate`.
- **Vitest "no test files found"**: wrong path, or running from the wrong directory.
- **Debugger won't attach**: firewall, wrong Chrome tab, or missing `--inspect` flag.

## What this module does NOT cover

These topics have their own modules later:

- Destructuring, spread/rest, `?.`, `??` in depth → Module 4 (JS Gotchas) or as-needed in exercises.
- `async` / `await` → Module 6.
- `fs`, `path`, `http` → Module 7.
- Project structure and code organisation → Module 8.
