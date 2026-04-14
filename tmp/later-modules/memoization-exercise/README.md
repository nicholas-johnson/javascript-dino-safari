# Exercise - Memoized route preview

**Mission briefing:** GIS route previews are expensive. Wrap them with a tiny **`memoize`** helper.

## Tasks

1. Implement **`memoize(fn)`** for **single-argument** functions. Cache results in a **`Map`** keyed by that argument (reference equality is fine for this exercise).
2. Implement **`makeRoutePreview()`** returning `{ preview(id), getCallCount() }` where `preview` returns `"ROUTE:" + id` and the underlying work increments an internal counter **only on cache miss**.

## Verify

```bash
pnpm vitest run module-04-functional/exercises/03-memoization/start.test.js
```

Reference: [`solution.js`](solution.js).
