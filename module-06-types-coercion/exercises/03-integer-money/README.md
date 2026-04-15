# Exercise - Safari tickets in cents

**Mission briefing:** Never sum ticket prices as raw floats. Convert each line item to **integer cents**, then sum.

## Tasks

Implement in [`start.js`](start.js):

1. **`dollarsToCents(dollars)`** - `dollars` is a finite `number` (e.g. `12.34`). Return integer cents using **rounding** (`Math.round`) so `12.34 -> 1234`, `0.1 + 0.2` style inputs are handled by giving dollars already computed - for this function assume `dollars` is a single decimal-like value.
2. **`sumTicketPricesCents(items)`** - `items` is an array of **strings** like `"12.34"` (two decimal places) or whole numbers as strings `"10"`. Parse each to cents and return the **total cents** as an integer.

Assume each string has optional dollars + cents with dot; no thousands separators. Invalid strings contribute `0`.

## Verify

```bash
pnpm vitest run module-06-types-coercion/exercises/03-integer-money/start.test.js
```

Reference: [`solution.js`](solution.js).
