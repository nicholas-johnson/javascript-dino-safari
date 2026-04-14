# Exercise - `DinoRegistry` with `Map` and `Set`

**Mission briefing:** Fast lookups by ID and zone rollups require the right structures - not plain objects everywhere.

## Tasks

Implement `createDinoRegistry()` in [`starter/index.js`](starter/index.js) returning:

- `add(dino)` - store by `dino.trackingId` (string). Overwrites same ID. `listSpecies()` must return unique species (a `Set` is a good building block).
- `get(trackingId)` - the record or `undefined`.
- `findByZone(zone)` - array of all dinos in that zone (any order).
- `listSpecies()` - **sorted** array of unique species strings.

## Verify

```bash
cd starter && pnpm install && pnpm test
```

Reference: [`solution/index.js`](solution/index.js).
