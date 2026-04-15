# Exercise - `DinoRegistry` with `Map` and `Set`

**Mission briefing:** Fast lookups by ID and zone rollups require the right structures - not plain objects everywhere.

## Tasks

Implement `createDinoRegistry()` in [`start.js`](start.js) returning:

- `add(dino)` - store by `dino.trackingId` (string). Overwrites same ID. `listSpecies()` must return unique species (a `Set` is a good building block).
- `get(trackingId)` - the record or `undefined`.
- `findByZone(zone)` - array of all dinos in that zone (any order).
- `listSpecies()` - **sorted** array of unique species strings.

## Verify

```bash
pnpm vitest run module-03-objects-prototypes/exercises/02-map-and-set/start.test.js
```

Reference: [`solution.js`](solution.js).
