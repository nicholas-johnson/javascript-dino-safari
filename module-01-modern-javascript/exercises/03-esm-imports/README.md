# Exercise 03 - ESM imports

## The scenario

The park's alert system is being rebuilt as modern ES modules. It needs to pull code from three different sources: a **Node built-in** module (`node:path`), an **npm package** (`picocolors` for coloured terminal output), and a **local file** (`risk-levels.js` which maps danger numbers to labels like `'CRITICAL'`).

You'll wire up the imports and implement two functions that use them - one that formats a coloured alert string for the tracking console, and one that extracts file extensions using Node's path module.

## What you will build

### 1. `formatAlert(dino)` - in [`starter/format-alert.js`](starter/format-alert.js)

Takes a dino record (or `null`/`undefined`) and returns a single-line alert string:

```
[COLOURED_LABEL] name @ zone
```

For example:

```js
formatAlert({ name: 'Rex', zone: 'Valley', dangerLevel: 5 });
// → "[CRITICAL] Rex @ Valley"  (CRITICAL in red)

formatAlert({ name: 'Bronto', zone: 'Lake', dangerLevel: 1 });
// → "[LOW] Bronto @ Lake"  (LOW in green)

formatAlert(null);
// → "[NONE] Unknown @ Uncharted"  (NONE in green)
```

**Rules:**

- Apply `??` defaults: `name` → `'Unknown'`, `zone` → `'Uncharted'`, `dangerLevel` → `0`
- Use `getRiskLabel(dangerLevel)` from `./risk-levels.js` to convert the number to a label
- Colour the label with picocolors: `pc.red` if danger >= 4, `pc.yellow` if >= 2, otherwise `pc.green`

### 2. `getExtension(filename)` - in [`starter/get-extension.js`](starter/get-extension.js)

Returns the file extension (e.g. `'.json'`, `'.js'`) using `path.extname` from the `node:path` built-in.

```js
getExtension('dinosaurs.json'); // '.json'
getExtension('Makefile'); // ''
```

## Getting started

Open the two stub files in `starter/`. Each has `// TODO` comments showing which imports to add and what to implement. The `risk-levels.js` file is already complete - just import from it.

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The tests check colour output, all danger-level brackets, null/undefined/empty-object defaults, and correct file extension extraction.

## Hints

- ES module imports look like `import path from 'node:path'`, `import pc from 'picocolors'`, and `import { getRiskLabel } from './risk-levels.js'`.
- Use `dino?.name ?? 'Unknown'` to safely default - the `?.` handles `null`/`undefined` input, and `??` only triggers on `null`/`undefined` (not on `0` or `''`).
- `path.extname('data.json')` returns `'.json'`.

## Reference solution

[`solution/format-alert.js`](solution/format-alert.js) | [`solution/get-extension.js`](solution/get-extension.js)
