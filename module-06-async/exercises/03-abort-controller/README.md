# Exercise - Cancellable dinosaur search

**Mission briefing:** Rangers often cancel a search when a closer sighting appears. Model cancellation with **`AbortController`**.

## Tasks

Implement `createCancellableTask(delayMs)` in [`starter/index.js`](starter/index.js) returning:

- `start(value)` - returns a Promise that resolves to the string **`"done:" + value`** after `delayMs`, unless cancelled.
- `cancel()` - aborts any in-flight `start` by rejecting with an **`Error`** whose `message` is **`"aborted"`**.
- Multiple calls: cancelling should not explode if nothing is running (no-op).

Use `AbortController` / `AbortSignal` (listeners or `throwIfAborted` - your choice).

## Verify

```bash
cd starter && pnpm install && pnpm test
```

Reference: [`solution/index.js`](solution/index.js).
