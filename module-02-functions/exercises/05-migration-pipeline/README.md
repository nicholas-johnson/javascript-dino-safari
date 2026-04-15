# Exercise 05 - Migration pipeline

## The scenario

Twice a year the herds migrate across the park. Motion sensors log every movement as a raw event with a zone name, headcount, and risk level. The operations team needs a clean report: filter out the noise, format human-readable log lines, and total up the animals per zone - all from the same filtered data set.

You'll combine everything from this module - `filter`, `map`, and `reduce` - into a composable pipeline of pure functions, then wire them together in a single `buildMigrationReport` function.

## What you will build

All functions live in [`starter/pipeline.js`](starter/pipeline.js).

Each event looks like `{ zone: string, headcount: number, risk: 'low' | 'high' }`.

### Step 1: `filterHighRiskZones(events)`

Keep only events where `risk === 'high'` **and** `headcount > 0`. A high-risk zone with zero animals is a false positive.

### Step 2: `toLogLines(events)`

Map each event to a string: `"<zone>: <headcount> animals"`.

```js
toLogLines([{ zone: 'ridge', headcount: 2, risk: 'high' }]);
// ['ridge: 2 animals']
```

### Step 3: `countByZone(events)`

Reduce to an object summing `headcount` per zone.

```js
countByZone([
  { zone: 'a', headcount: 2 },
  { zone: 'a', headcount: 1 },
  { zone: 'b', headcount: 3 },
]);
// { a: 3, b: 3 }
```

### Step 4: `buildMigrationReport(events)`

Compose the three steps: filter the events first, then produce:

```js
{
  lines: toLogLines(filtered),
  totals: countByZone(filtered)
}
```

Both `lines` and `totals` operate on the **same** filtered data.

## Getting started

Open [`starter/pipeline.js`](starter/pipeline.js). Implement each function, then wire them together in `buildMigrationReport`. Run the demo:

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The tests check each step individually, then verify the composed report end-to-end.

## Hints

- Build and test each function one at a time - `filterHighRiskZones` first, then `toLogLines`, then `countByZone`.
- `buildMigrationReport` is the payoff: call `filterHighRiskZones` once, then pass the result to both `toLogLines` and `countByZone`.
- This is the "filter → map → reduce" pattern you'll use constantly in real codebases.

## Reference solution

[`solution/pipeline.js`](solution/pipeline.js)
