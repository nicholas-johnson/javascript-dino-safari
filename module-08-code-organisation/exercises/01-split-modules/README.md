# Exercise - Refactor the spaghetti digest

**Mission briefing:** `compileDigest` works, but everything lives in one tangled file. Split responsibilities without changing behaviour.

## Starting point

- [`starter/spaghetti.js`](starter/spaghetti.js) - messy but **correct** implementation.
- [`starter/index.js`](starter/index.js) - currently re-exports `compileDigest` from `spaghetti.js`.

## Tasks

1. Extract **zone normalization / dedupe / sorting** into its own module (e.g. `zones.js`).
2. Extract **high-alert counting** into another module (e.g. `alerts.js`).
3. Add a small **composer** (could be `compile-digest.js` or keep `index.js`) that wires the pieces.
4. Update [`starter/index.js`](starter/index.js) to export `compileDigest` from your new structure and **delete or stop using** the monolith import.

## Rules

- **Do not change** the public signature or output shape of `compileDigest`.
- Keep tests green:

```bash
cd starter && pnpm install && pnpm test
```

## Reference layout

See the [`solution/`](solution/) folder for one possible factoring.
