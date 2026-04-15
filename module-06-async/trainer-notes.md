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

### 04 - Fetch from a real API

- Run the demo - it hits JSONPlaceholder live. Requires internet.
- Walk through the four sections: single fetch, 404 handling, network error (bad domain), parallel fetch with `Promise.all`.
- Stress that `fetch` does **not** reject on HTTP errors (404, 500) - only on network failures. You must check `res.ok`.
- Show how `try`/`catch` catches both network errors and the manual `throw` from a bad status code.
- This demo leads directly into Exercise 03 (fetch-combine).

## Exercises

| #   | Folder                  | Key skills                               | Notes                                              |
| --- | ----------------------- | ---------------------------------------- | -------------------------------------------------- |
| 1   | `01-retry-timeout`      | `Promise.race`, retry loop, backoff      | `withTimeout` and `runWithRetry`.                  |
| 2   | `02-promise-allsettled` | `Promise.allSettled`, result aggregation | Uniform summary of fulfilled/rejected.             |
| 3   | `03-fetch-combine`      | `fetch`, `Promise.all`, data aggregation | Real API call; `fetchFn` injected for testability. |

## Timing

- Demo 01 (promises + async/await): ~20 min.
- Demo 02 (concurrency patterns): ~15 min.
- Demo 04 (fetch from API): ~10 min.
- Demo 03 (event loop): ~5–10 min.
- Exercises: ~30–40 min for all three.
- Total: ~1.5 hours.

## Common issues

- **Forgetting `await`**: `const data = fetchZone(id)` assigns a Promise, not the resolved value. The test passes a Promise to assertions and everything looks "truthy" but wrong.
- **`try`/`catch` not wrapping `await`**: students put `await` outside the `try` block and rejections are unhandled.
- **`Promise.all` vs `allSettled` confusion**: `all` rejects on first failure; `allSettled` never rejects. Students mix them up.
- **Timer leaks in timeout wrappers**: the losing `setTimeout` in `Promise.race` keeps running. Mention `clearTimeout` cleanup.
- **Forgetting to `.json()` the response**: `fetch` resolves with a `Response`, not the parsed body. Students need `await res.json()`.
- **Sequential instead of parallel**: students `await` each fetch one at a time instead of using `Promise.all`. It works but is slower - point it out.
