# Exercise - Cancellable dinosaur search

**Mission briefing:** Rangers often cancel a search when a closer sighting appears. Model cancellation with **`AbortController`**.

## Tasks

Implement `createCancellableTask(delayMs)` in [`start.js`](start.js) returning:

- `start(value)` - returns a Promise that resolves to the string **`"done:" + value`** after `delayMs`, unless cancelled.
- `cancel()` - aborts any in-flight `start` by rejecting with an **`Error`** whose `message` is **`"aborted"`**.
- Multiple calls: cancelling should not explode if nothing is running (no-op).

Use `AbortController` / `AbortSignal` (listeners or `throwIfAborted` - your choice).

## Verify

```bash
pnpm vitest run module-05-async/exercises/03-abort-controller/start.test.js
```

Reference: [`solution.js`](solution.js).
