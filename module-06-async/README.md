# Module 6 - Async JavaScript: Taming the Unpredictable

Live tracking means sensor pings arrive out of order, some fail entirely, and a ranger might cancel a search mid-flight. JavaScript was built for this chaos - it has a single-threaded event loop that never blocks, and **Promises** are the currency of async work.

By the end of this module you should be able to:

- **Chain promises** and centralize errors with `try`/`catch` + `async`/`await`.
- **Use `Promise.all`, `allSettled`, and `race`** for realistic concurrency.
- **Model timeouts and cancellation** with `AbortController` and `AbortSignal`.
- **Picture the event loop**: microtasks vs macrotasks, and why order matters.

---

## 1. Promise fundamentals

```bash
node module-06-async/demo/01-promise-fundamentals
```

A **Promise** represents a value that doesn't exist yet. It lives in one of three states:

- **pending** - the operation is in flight.
- **fulfilled** - it completed successfully, and the result is available.
- **rejected** - it failed, and there's a reason (usually an `Error`).

### Creating a promise

```js
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ms), ms);
  });
}

delay(1000).then((ms) => console.log(`Waited ${ms}ms`));
```

`resolve` fulfills the promise. If you call `reject(new Error('...'))` instead, it moves to rejected state.

### Chaining

`.then()` returns a new promise. Chains read top-to-bottom like synchronous code - but each step waits for the previous one:

```js
fetchZone('paddock-a')
  .then((zone) => fetchDinos(zone.id))
  .then((dinos) => dinos.filter((d) => d.danger > 5))
  .then((dangerous) => console.log(dangerous))
  .catch((err) => console.error('Something failed:', err));
```

`.catch()` at the end handles any rejection from any step in the chain. Errors propagate automatically.

### async / await

`async`/`await` is syntactic sugar over `.then()` chains:

```js
async function getDangerousDinos(zoneId) {
  try {
    const zone = await fetchZone(zoneId);
    const dinos = await fetchDinos(zone.id);
    return dinos.filter((d) => d.danger > 5);
  } catch (err) {
    console.error('Failed:', err.message);
    return [];
  }
}
```

`await` pauses execution inside the `async` function (but **not** the thread - the event loop keeps running other work). `async` functions always return a promise, even if you return a plain value.

---

## 2. Concurrency patterns

```bash
node module-06-async/demo/02-concurrency-patterns
```

Sometimes you need to run multiple async operations at once. JavaScript gives you four combinators.

### Promise.all - fail fast

```js
const [zoneA, zoneB, zoneC] = await Promise.all([
  fetchZone('a'),
  fetchZone('b'),
  fetchZone('c'),
]);
```

All three requests run **in parallel**. `Promise.all` resolves with an array of results when all succeed. If **any** promise rejects, the whole thing rejects immediately - fail fast.

### Promise.allSettled - never rejects

```js
const results = await Promise.allSettled([
  fetchSensor('temp-1'),
  fetchSensor('temp-2'), // this one fails
  fetchSensor('temp-3'),
]);

// results: [
//   { status: 'fulfilled', value: 22.5 },
//   { status: 'rejected', reason: Error('timeout') },
//   { status: 'fulfilled', value: 19.1 },
// ]
```

You get the outcome of **every** promise, regardless of failures. Perfect for dashboards, batch imports, or any situation where partial success is useful.

### Promise.race - first one wins

```js
async function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms),
  );
  return Promise.race([promise, timeout]);
}

const data = await withTimeout(fetchZone('paddock-a'), 3000);
```

`Promise.race` resolves or rejects with whichever promise settles **first**. Combined with a timeout promise, you get a deadline pattern.

### AbortController - cancellation from outside

```js
const controller = new AbortController();

async function longTask(signal) {
  for (const item of items) {
    if (signal.aborted) throw new Error('Aborted');
    await processItem(item);
  }
}

longTask(controller.signal);
// Later, from somewhere else:
controller.abort();
```

`AbortController` creates a signal that you pass into async work. When you call `.abort()`, anything checking `signal.aborted` can bail out cleanly.

---

## 3. The event loop

```bash
node module-06-async/demo/03-event-loop
```

JavaScript is **single-threaded** - there's one call stack. Async work doesn't run on a second thread; it's scheduled via the **event loop**.

```js
console.log('1 - sync');

setTimeout(() => console.log('2 - macrotask (setTimeout)'), 0);

Promise.resolve().then(() => console.log('3 - microtask (promise)'));

console.log('4 - sync');
```

Output: `1`, `4`, `3`, `2`.

Why? After the synchronous code finishes, the engine drains the **microtask queue** (promise callbacks) before picking up the next **macrotask** (setTimeout callbacks). Microtasks always jump the queue.

The mental model:

1. Run all synchronous code on the call stack.
2. Drain the microtask queue (promise `.then`/`.catch`, `queueMicrotask`).
3. Pick **one** macrotask (`setTimeout`, `setInterval`, I/O callbacks).
4. Go to step 2.

You rarely need to think about this in daily code, but it explains why `setTimeout(fn, 0)` doesn't run "immediately" - it waits for all microtasks first.

---

## Exercises

| #   | Folder                                                                | What you'll practice                                                        |
| --- | --------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 1   | [`exercises/01-retry-timeout`](exercises/01-retry-timeout/)           | Build `withTimeout` and `runWithRetry` - deadline + exponential backoff.    |
| 2   | [`exercises/02-promise-allsettled`](exercises/02-promise-allsettled/) | Aggregate sensor results into a uniform summary using `Promise.allSettled`. |
| 3   | [`exercises/03-abort-controller`](exercises/03-abort-controller/)     | Implement `createCancellableTask` that respects an `AbortSignal`.           |

Run all module tests:

```bash
cd module-06-async/exercises/<exercise>/starter && pnpm install && pnpm test
```

---

## Slides

Teaching deck: from repo root run `pnpm slides:06`, or `cd slides && pnpm dev`.

## Reference

- [MDN: Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [MDN: async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN: AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [Jake Archibald: In the loop (video)](https://www.youtube.com/watch?v=cCOL7MC4Pl0)
