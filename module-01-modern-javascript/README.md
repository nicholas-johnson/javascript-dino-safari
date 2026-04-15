# Module 1 - Setting Up Base Camp

This module is the on-ramp. By the end of it every student should be able to:

- **Run a script** with `node` and see output in the terminal.
- **Use modern syntax** - `const`, `let`, `for...of`, template literals.
- **Manipulate strings** - trim, search, slice, split, replace, and format with template literals.
- **Split code into modules** - `export` from one file, `import` in another.
- **Scaffold a project** with `pnpm init`, add scripts to `package.json`, and install an npm package.
- **Write a function** with parameters and a return value.
- **Run tests** with Vitest - `describe`, `it`, `expect`.
- **Attach a debugger** when `console.log` isn't enough.

Everything runs in **Node.js**. No browser, no bundler, no magic.

---

## 1. Hello World

```bash
node module-01-modern-javascript/demo/01-hello-world
```

Open `demo/01-hello-world/index.js`. One line:

```js
console.log('Hello World');
```

`console.log` writes to **stdout** - the terminal. `node path/to/file` executes that file. If `Hello World` appears, Node is installed and working. That's your first Node.js program.

---

## 2. Syntax fundamentals

```bash
node module-01-modern-javascript/demo/02-syntax-fundamentals
```

The building blocks you'll use in every file.

### `const` and `let`

```js
const sectorName = 'Cretaceous Valley'; // won't be reassigned
let checkInsLogged = 0; // will be incremented
```

Use `const` by default. Reach for `let` only when the binding _must_ change. There is no `var` in modern JavaScript - forget it exists.

### Loops

```js
for (const name of rangersOnDuty) {
  // for...of - iterate values
  console.log(name, '- present');
}

for (let pass = 1; pass <= 3; pass += 1) {
  // classic for - when you need an index
  console.log('Pass', pass, 'of 3');
}

while (pingsRemaining > 0) {
  // while - condition-based
  pingsRemaining -= 1;
}
```

`for...of` is the workhorse. Classic `for` is for counters. `while` is for conditions that aren't about a collection.

Edit the demo, change some values, run it again. Breaking things on purpose is the fastest way to learn syntax.

---

## 3. String manipulation

```bash
node module-01-modern-javascript/demo/03-strings
```

Strings are everywhere - log messages, file paths, user input, CSV rows. This demo walks through the methods you'll reach for daily.

### Template literals

```js
const species = 'Velociraptor';
const zone = 'Raptor Ridge';
console.log(`Sighting: ${species} in ${zone}`);
```

Back-ticks let you embed expressions with `${}`. No more `'hello ' + name + '!'` gymnastics.

### Trimming, case, and length

```js
const sector = '  Cretaceous Valley  ';
sector.trim(); // 'Cretaceous Valley'
sector.trim().toUpperCase(); // 'CRETACEOUS VALLEY'
sector.trim().length; // 17
```

`trim()` strips leading and trailing whitespace - essential when reading user input or file data. `toUpperCase()` / `toLowerCase()` return a new string (strings are immutable).

### Searching

```js
const log = 'Rex spotted near north fence at 14:32';
log.includes('Rex'); // true
log.startsWith('Rex'); // true
log.indexOf('north'); // 18
```

`includes` is the go-to boolean check. `indexOf` gives you the position (or `-1` if missing).

### Extracting parts

```js
log.slice(0, 3); // 'Rex'
log.slice(17); // 'north fence at 14:32'
```

`slice(start, end)` is non-destructive. Negative indices count from the end.

### Splitting and joining

```js
const csv = 'Rex,Raptor,Bronto,Stego';
const names = csv.split(','); // ['Rex', 'Raptor', 'Bronto', 'Stego']
names.join(' | '); // 'Rex | Raptor | Bronto | Stego'
```

`split` breaks a string into an array on a delimiter. `join` does the reverse. You'll use this pair constantly for CSV parsing, building output lines, and extracting initials.

### Replacing

```js
const alert = 'DANGER: Rex in zone-a, Rex near fence';
alert.replace('Rex', 'T-Rex'); // replaces first occurrence
alert.replaceAll('Rex', 'T-Rex'); // replaces all
```

`replace` swaps the first match. `replaceAll` gets every one. Both return a new string.

---

## 4. Modules - splitting code across files

```bash
node module-01-modern-javascript/demo/04-esm-basics
```

A single file doesn't scale. As soon as you need more than a hundred lines you split code into **modules** - files that export things other files can import.

This demo has two files. Open them side by side.

### Exporting

`park-info.js` makes things available:

```js
export const PARK_NAME = 'Dinosaur Safari Research Park';
export const SECTOR_COUNT = 6;

export function formatWelcome(rangerName) {
  return `Welcome to ${PARK_NAME}, Ranger ${rangerName}. ${SECTOR_COUNT} sectors online.`;
}

export default function printStatus() {
  console.log(`[${PARK_NAME}] All systems operational.`);
}
```

`export` in front of a declaration shares it. `export default` marks one thing as the "main" export.

### Importing

`index.js` pulls them in:

```js
import printStatus, { PARK_NAME, SECTOR_COUNT, formatWelcome } from './park-info.js';
```

**Named exports** go in `{ braces }` - names must match exactly. Typo `PARK_NAME` as `PAARK_NAME` and you get `undefined`, not an error. Silent bugs.

**Default exports** can use any name on the import side. That flexibility is why many teams prefer named exports - the name stays consistent everywhere.

### Enabling ESM

This works because `package.json` contains `"type": "module"`. Without it, Node treats `.js` files as the older CommonJS format (`require` / `module.exports`). Every package in this course has it set.

---

## 5. Package scripts and npm

```bash
node module-01-modern-javascript/demo/05-package-scripts
```

A project with no documented commands is a project where someone forgets how to run the tests. `package.json` is your operations manual.

### Scaffolding a project

```bash
pnpm init
```

This gives you a minimal `package.json` with a name, version, and an empty `scripts` section.

### Installing an npm package

The demo imports **picocolors**, a tiny library for coloured terminal output. Install it:

```bash
pnpm add picocolors
```

Now there's a `node_modules/` folder and `picocolors` is listed in `dependencies`. Any file in the project can `import pc from 'picocolors'` - same `import` syntax we used for local files, just without the `./` path.

### Adding scripts

Look at the module's `package.json`:

```json
{
  "scripts": {
    "test": "vitest run --root .",
    "demo:scripts": "node demo/05-package-scripts",
    "demo:esm": "node demo/04-esm-basics"
  }
}
```

Each key is a command name. Each value is the shell command that runs. Instead of remembering the full path, anyone can type:

```bash
pnpm demo:scripts
```

Two script names are special - `start` and `test` don't need `run`:

```bash
pnpm test         # same as: pnpm run test
```

### Passing arguments

Everything after `--` gets forwarded. The demo reads `process.argv` to pick up flags:

```bash
pnpm demo:scripts -- --sector=ridge --verbose
```

Run it both ways - with `node` directly and via `pnpm demo:scripts`. Notice that `process.env.npm_lifecycle_event` tells you which script triggered it, and that `node_modules/.bin` is automatically on your PATH inside a script. That's how tools like `vitest` and `eslint` work without a global install.

---

## 6. Your first functions

```bash
node module-01-modern-javascript/demo/06-function-intro
```

Functions are how you give a name to a chunk of work. Open `demo/06-function-intro/index.js`.

### The `function` keyword

```js
function greet() {
  return 'Hello, Jurassic World!';
}
console.log(greet());
```

`function` declares a reusable block. `return` sends a value back to the caller. If you forget `return`, the function returns `undefined`.

### Parameters

```js
function greetRanger(name) {
  return 'Welcome, Ranger ' + name + '.';
}
console.log(greetRanger('Ellie'));
```

Parameters are placeholders. The value you pass in (`'Ellie'`) is the **argument**. You can have as many parameters as you need:

```js
function add(a, b) {
  return a + b;
}
```

### Using return values

The value a function returns can be stored, printed, or passed straight into another function call:

```js
const result = double(7);
console.log(double(double(3)));
```

We'll add arrow functions, defaults, and higher-order patterns in Module 2. For now, `function`, parameters, and `return` are all you need.

---

## 7. Testing with Vitest

```bash
node module-01-modern-javascript/demo/07-vitest-intro
```

This demo folder has three files - open them side by side:

- `alert.js` - two small functions (`formatAlert`, `isHighRisk`).
- `alert.test.js` - Vitest tests for both.
- `index.js` - a runner that calls the functions so you can see the output.

### Running the tests

```bash
pnpm vitest run module-01-modern-javascript/demo/07-vitest-intro/alert.test.js
```

### What the test file looks like

```js
import { describe, it, expect } from 'vitest';
import { formatAlert, isHighRisk } from './alert.js';

describe('formatAlert', () => {
  it('formats a dino sighting', () => {
    const dino = { name: 'Rex', zone: 'Valley', dangerLevel: 5 };
    expect(formatAlert(dino)).toBe('[ALERT] Rex in Valley (level 5)');
  });
});
```

`describe` groups related tests. `it` describes a single behaviour. `expect(...).toBe(...)` checks the result. If the value doesn't match, Vitest shows you what you got vs what you expected.

Every exercise in this course has a test file. The workflow is always the same: read the tests, write code until they pass.

---

## 8. Debugging

```bash
node module-01-modern-javascript/demo/08-debugging
```

The demo has an intentional bug - the reported average weight is wrong. Rather than staring at the code, attach a debugger:

```bash
node --inspect module-01-modern-javascript/demo/08-debugging
```

- **Chrome**: `chrome://inspect` → "Open dedicated DevTools for Node"
- **VS Code / Cursor**: "Attach to Node Process" or the debug icon in the terminal

Set a breakpoint inside the `for` loop. Step through iteration by iteration. Watch `i`, `list[i]`, and `total`. The loop uses `<=` instead of `<` - one iteration too many. `list[i]` is `undefined` on the last pass, and `undefined?.weightKg ?? 0` silently adds zero instead of crashing. The average is wrong but nothing throws.

This is the kind of bug `console.log` misses but a breakpoint catches in seconds.

---

## Exercises

Each exercise has a `starter/` folder (your work) and a `solution/` folder (instructor reference - try first). Both contain a `package.json`, `index.js`, and `index.test.js`.

| #   | Folder                                                | What you'll practice                                                                            |
| --- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| 1   | [`01-strings`](exercises/01-strings/)                 | `toUpperCase`, `toLowerCase`, `includes`, `split`, template literals - everyday string methods. |
| 2   | [`02-package-scripts`](exercises/02-package-scripts/) | Wire up `start`, `lint`, and `test` scripts in a `package.json`.                                |
| 3   | [`03-esm-imports`](exercises/03-esm-imports/)         | Import from a Node built-in (`node:path`), an npm package (`picocolors`), and a local module.   |
| 4   | [`04-function-intro`](exercises/04-function-intro/)   | `function` keyword, parameters, return values - your first functions.                           |
| 5   | [`05-vitest-contract`](exercises/05-vitest-contract/) | Implement `formatSighting` - template literals and `??` defaults, Vitest guarding the contract. |

Run an exercise:

```bash
cd module-01-modern-javascript/exercises/01-strings/starter && pnpm install && pnpm test
```

---

## Slides

Teaching deck (Vite + [`slide-deck`](../slide-deck/)): from repo root run `pnpm slides:01`, or `cd slides && pnpm dev`.

## Reference

- [Node.js ESM](https://nodejs.org/api/esm.html)
- [Vitest](https://vitest.dev/)
- [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files)
