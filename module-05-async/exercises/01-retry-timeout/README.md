# Exercise - Sighting fetcher with retry + timeout

**Mission briefing:** Perimeter pings are flaky. Wrap any async task so each attempt has a **timeout**, and failures **retry** up to a limit.

## Tasks

Implement in [`start.js`](start.js):

1. **`withTimeout(promise, timeoutMs)`** - resolves/rejects with the same outcome as `promise`, but if `promise` is not settled within `timeoutMs`, reject with an `Error` whose `message` is **`"timeout"`**.
2. **`runWithRetry(task, { maxAttempts, timeoutMs })`** - `task` is a **zero-arg** function returning a Promise (call it fresh each attempt). Try up to `maxAttempts` times. Each attempt wraps `task()` with `withTimeout`. If all attempts fail, throw the **last** error.

## Verify

```bash
pnpm vitest run module-05-async/exercises/01-retry-timeout/start.test.js
```

Reference: [`solution.js`](solution.js).
