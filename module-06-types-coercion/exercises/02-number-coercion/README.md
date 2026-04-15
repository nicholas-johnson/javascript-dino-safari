# Exercise - Sensor reading validator

**Mission briefing:** Field sensors emit strings, numbers, `null`, and garbage. Normalize to a **finite number** or `null` when unusable.

## Tasks

Implement `validateReading(input)` in [`start.js`](start.js):

- Returns a **finite number** when the reading is usable.
- Returns **`null`** for `undefined`, `null`, `''`, whitespace-only strings, non-numeric strings, `NaN`, and non-finite numbers (`Infinity`, `-Infinity`).
- Numeric strings with surrounding spaces (e.g. `"  12.5  "`) should parse to `12.5`.
- Already-valid finite numbers pass through unchanged.

Use `Number()`, `Number.isFinite()`, and `Number.isNaN()` thoughtfully.

## Verify

```bash
pnpm vitest run module-06-types-coercion/exercises/02-number-coercion/start.test.js
```

Reference: [`solution.js`](solution.js).
