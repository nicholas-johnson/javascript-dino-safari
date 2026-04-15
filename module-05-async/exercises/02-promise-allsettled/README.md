# Exercise - Batch sensor read with `allSettled`

**Mission briefing:** Read every zone sensor, even if half the park is offline. Return a **uniform summary** per sensor.

## Tasks

Implement `summarizeSensorBatch(sensorFns)` in [`start.js`](start.js).

- `sensorFns` is an array of **functions** that each return a Promise.
- Use **`Promise.allSettled`**.
- Return an array of objects:
  - `{ status: 'fulfilled', value }` for successes
  - `{ status: 'rejected', reason: <Error message string> }` for failures (use `String(err?.message ?? err)`)

## Verify

```bash
pnpm vitest run module-05-async/exercises/02-promise-allsettled/start.test.js
```

Reference: [`solution.js`](solution.js).
