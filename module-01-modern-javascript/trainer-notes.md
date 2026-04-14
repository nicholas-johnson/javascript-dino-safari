# Module 1 — Trainer Notes

## Goal

Get everyone from zero to a working modern JS workflow: run scripts, split code into modules, install packages, attach a debugger. Vitest is introduced at the start of Module 2.

## Demo walkthrough

### 01 — Hello World

- Confirm `node -v` works for everyone.
- `node module-01-modern-javascript/demo/01-hello-world` — one `console.log`, instant win.
- Point out: `node` runs a file, `console.log` writes to stdout. That's the whole mental model for now.

### 02 — Syntax fundamentals

- Skip for experienced groups. Useful for mixed rooms to level-set.
- `const` vs `let` — no `var`, ever.
- Three loop forms: `for...of` (most common), classic `for` (when you need an index), `while` (condition-based).
- Ask someone to change a loop bound, predict what happens, run it.

### 03 — String manipulation

- Walk through each section: template literals, trimming, case, searching, slicing, splitting/joining, replacing.
- Emphasise immutability: all string methods return a *new* string.
- Ask students to guess what `'  hello  '.trim().toUpperCase()` returns before running.
- Good place to mention chaining — `str.trim().toLowerCase().split(' ')`.

### 04 — ESM basics

- Open `park-info.js` and `index.js` side by side.
- Named exports: `{ braces }`, names must match exactly. Ask: "What happens if you typo `PARK_NAME`?" (you get `undefined`, no error).
- Default export: can use any name on the import side — that's why many teams avoid defaults.
- Point out `"type": "module"` in `package.json` — without it, Node falls back to CommonJS (`require`).

### 05 — Package scripts + npm

- Live-code in a scratch folder if time allows:
  - `pnpm init` → show the generated `package.json`.
  - `pnpm add picocolors` → show `node_modules/`, show the new `dependencies` entry.
  - Add a `"start"` script, run it with `pnpm start`.
- Run the demo: `node module-01-modern-javascript/demo/05-package-scripts`.
- Then run via the script: `pnpm demo:scripts -- --sector=ridge --verbose`.
- Show `process.env.npm_lifecycle_event` — it's set only when running via a script.
- Explain `node_modules/.bin` on PATH: that's why `vitest` and `eslint` work inside scripts without global install.

### 06 — Debugging

- Run with `--inspect`, attach Chrome DevTools or IDE debugger.
- Set a breakpoint inside the `for` loop in `averageWeightKg`.
- Step through — ask the group to spot the bug (`<=` should be `<`).
- The bug is subtle: `undefined?.weightKg ?? 0` adds zero silently, so no crash, just a wrong answer.
- Takeaway: complex state (loops, objects, arrays) → debugger beats `console.log`.

## Exercises

| # | Folder | Key skills | Notes |
|---|--------|-----------|-------|
| 1 | `01-strings` | `toUpperCase`, `toLowerCase`, `includes`, `split`, template literals | Reinforces demo 03. Gentle first exercise — pure string work. |
| 2 | `02-package-scripts` | `pnpm init`, adding scripts, `pnpm test` | Reinforces demo 05. Students edit a `package.json`. |
| 3 | `03-esm-imports` | Import from Node built-in, npm, local module | Ties demos 04 + 05 together. Uses `node:path`, `picocolors`, local `risk-levels.js`. |

## Timing

- Demos 01–05: ~40–50 min (less if skipping demo 02).
- Demo 06 (debugging): ~10 min.
- Exercises: ~30–40 min for all three.
- Total: roughly 1.5 hours including Q&A.

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
