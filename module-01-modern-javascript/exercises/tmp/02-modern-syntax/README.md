# Exercise - Modern syntax refactor

**Mission briefing:** Legacy telemetry code from the old park system is verbose and brittle. Refactor it to use **destructuring**, **template literals**, **optional chaining (`?.`)**, and **nullish coalescing (`??`)** - without changing behaviour.

## Tasks

Edit [`start.js`](start.js):

1. Replace manual `dino && dino.field` checks with `?.` and `??` where appropriate.
2. Use **destructuring** in `summarizeForRadio` parameters.
3. Build the radio string with a **template literal** (no `+` concatenation).
4. In `mergeRangerNotes`, use **spread** to merge objects immutably (return a new object).

## Verify

```bash
pnpm vitest run module-01-modern-javascript/exercises/02-modern-syntax/start.test.js
```

## Hints

- `??` only falls back for `null` / `undefined`, not `0` or `''`.
- Spread order matters: later keys override earlier ones.

Instructor reference: [`solution.js`](solution.js).
