# Exercise - Zone tracker factory

**Mission briefing:** Each zone must keep its own immutable audit trail from the outside, but allow rangers to append sightings.

## Tasks

Implement `createZoneTracker(zoneName)` in [`start.js`](start.js).

Return an object with:

- `logSighting(assetId, note)` - store `{ assetId, note }` in order (private to that zone).
- `getSightings()` - return a **shallow copy** array so callers cannot mutate internal state.
- `getCount()` - number of sightings.

Trackers for different zones must **not** share the same backing array.

## Verify

```bash
pnpm vitest run module-02-functions/exercises/01-closure-factory/start.test.js
```

Reference: [`solution.js`](solution.js).
