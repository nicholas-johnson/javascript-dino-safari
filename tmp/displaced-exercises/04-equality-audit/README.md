# Exercise - Equality audit

**Mission briefing:** HQ wants a diagnostic object comparing **`==`**, **`===`**, and **`Object.is`** for any pair of readings.

## Tasks

Implement `compareEquality(a, b)` in [`start.js`](start.js) returning:

```ts
{ loose: boolean, strict: boolean, objectIs: boolean }
```

Where:

- `loose` is `a == b`
- `strict` is `a === b`
- `objectIs` is `Object.is(a, b)`

## Verify

```bash
pnpm vitest run module-04-types-coercion/exercises/04-equality-audit/start.test.js
```

Reference: [`solution.js`](solution.js).
