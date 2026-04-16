# Capstone 02 - Alert Pipeline

## The scenario

Sensor alerts arrive messy - some have missing fields, others have whitespace in zone names, and duplicates flood in when sensors fire multiple times for the same event. Before alerts reach the control room they need to pass through a pipeline that validates, normalises, deduplicates, and categorises them.

This exercise combines closures (the deduplicator), higher-order functions (filter/map), immutability (normalise returns new objects), and module organisation (each step in its own file, grouped by domain).

## Project structure

```
starter/
  alerts/
    validate.js         ← validation logic
    normalise.js        ← normalisation (trim, lowercase, add id)
    deduplicate.js      ← closure-based deduplicator
    index.js            ← barrel: exports { validateAlert, normaliseAlert, createDeduplicator }
  pipeline/
    pipeline.js         ← wires steps together, categorises output
    index.js            ← barrel: exports { processAlerts }
  index.js              ← entry point
  index.test.js         ← tests (imports through barrels)
```

## What you will build

### [`starter/alerts/validate.js`](starter/alerts/validate.js) - Validation

**`validateAlert(alert)`** - return `true` if the alert is valid:

- `zone` must be a non-empty string (after trimming whitespace)
- `level` must be an integer between 1 and 5 inclusive
- `timestamp` must be a positive number

### [`starter/alerts/normalise.js`](starter/alerts/normalise.js) - Normalisation

**`normaliseAlert(alert)`** - return a **new** object (don't mutate the original):

- `zone`: trimmed and lowercased
- `level` and `timestamp`: copied as-is
- `id`: `"<normalised zone>-<timestamp>"` (used for deduplication)

```js
normaliseAlert({ zone: '  East Wing  ', level: 2, timestamp: 99 });
// { zone: 'east wing', level: 2, timestamp: 99, id: 'east wing-99' }
```

### [`starter/alerts/deduplicate.js`](starter/alerts/deduplicate.js) - Deduplication (closure)

**`createDeduplicator()`** - return a **filter function** that uses a closure over a `Set`. The first time it sees an `id`, return `true` (keep). On subsequent calls with the same `id`, return `false` (drop).

### [`starter/pipeline/pipeline.js`](starter/pipeline/pipeline.js) - Composing the pipeline

**`processAlerts(rawAlerts)`** - wire the steps together (imports come from `../alerts/index.js`):

1. **Filter** with `validateAlert`
2. **Map** with `normaliseAlert`
3. **Filter** with a fresh deduplicator
4. **Categorise**: `level >= 4` → `critical`, `level >= 2` → `warning`, else → `info`

Return `{ critical, warning, info, total }` where `total` is the count of unique valid alerts.

## Getting started

Implement each file one at a time - the tests cover each step independently so you can work through them progressively. Then run:

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The tests check validation edge cases (whitespace-only zone, float levels, zero timestamp), normalisation immutability, deduplicator state, and the full end-to-end pipeline with a fixture of 6 raw alerts.

## Hints

- `typeof zone !== 'string' || zone.trim() === ''` catches missing and blank zones.
- `Number.isInteger(level) && level >= 1 && level <= 5` validates the level.
- The deduplicator is a classic closure pattern: `const seen = new Set()` captured by the returned function.
- In `processAlerts`, chain `.filter(validateAlert).map(normaliseAlert).filter(dedupe)` for a clean pipeline.

## Reference solution

[`solution/`](solution/) folder
