# Module 6 - Async JavaScript: Trainer Notes

## Goal

Students can write async code confidently: chain promises, use `async`/`await`, choose the right `Promise` combinator, handle timeouts and cancellation, and reason about the event loop.

## Demo walkthrough

### 01 - Promise fundamentals

- Show a simple `delay` function returning a `new Promise`. Walk through the three states: pending → fulfilled or rejected.
- Chain `.then()` calls. Show how errors propagate through the chain and are caught by `.catch()`.
- Rewrite the chain with `async`/`await` and `try`/`catch`. Ask: "Which reads better?" (Almost always `await`.)
- Emphasise: `async` functions always return a promise. Even `return 42` wraps in a promise.

### 02 - Concurrency patterns

- `Promise.all` - run sensors in parallel, fail fast. Ask: "What if one sensor is slow but you need all results?" (You wait.)
- `Promise.allSettled` - same sensors, but now you get `{ status, value/reason }` for each. Perfect for dashboards.
- `Promise.race` - timeout pattern. Show the timeout wrapper sketch from the slides.
- Briefly mention `Promise.any` for completeness.
- The AbortController sketch: create a controller, pass `signal` to an async function, abort from outside.

### 03 - Event loop

- Run the demo - ordering of `console.log`, `setTimeout`, `Promise.resolve().then`, `queueMicrotask`.
- Draw the loop: call stack → microtask queue (drains fully) → macrotask queue (one at a time).
- Key takeaway: promise `.then` callbacks run before `setTimeout` even if the timer is 0ms.
- Keep this short (~5 min). It's conceptual scaffolding, not something students need to write.

## Exercises

| #   | Folder                  | Key skills                                | Notes                                  |
| --- | ----------------------- | ----------------------------------------- | -------------------------------------- |
| 1   | `01-retry-timeout`      | `Promise.race`, retry loop, backoff       | `withTimeout` and `runWithRetry`.      |
| 2   | `02-promise-allsettled` | `Promise.allSettled`, result aggregation  | Uniform summary of fulfilled/rejected. |
| 3   | `03-abort-controller`   | `AbortController`, `AbortSignal`, cleanup | `createCancellableTask` pattern.       |

## Timing

- Demo 01 (promises + async/await): ~20 min.
- Demo 02 (concurrency patterns): ~15 min.
- Demo 03 (event loop): ~5–10 min.
- Exercises: ~30–40 min for all three.
- Total: ~1.5 hours.

## Common issues

- **Forgetting `await`**: `const data = fetchZone(id)` assigns a Promise, not the resolved value. The test passes a Promise to assertions and everything looks "truthy" but wrong.
- **`try`/`catch` not wrapping `await`**: students put `await` outside the `try` block and rejections are unhandled.
- **`Promise.all` vs `allSettled` confusion**: `all` rejects on first failure; `allSettled` never rejects. Students mix them up.
- **Timer leaks in timeout wrappers**: the losing `setTimeout` in `Promise.race` keeps running. Mention `clearTimeout` cleanup.
- **AbortController signal not checked**: students create the controller but never check `signal.aborted` inside the async work.
