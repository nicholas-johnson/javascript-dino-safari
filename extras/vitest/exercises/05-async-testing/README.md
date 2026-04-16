# Exercise 05 - Async Testing

## The goal

Most real applications are asynchronous — fetching data, waiting on timers, retrying failed requests. Testing async code is straightforward once you learn two rules: mark your test `async` and `await` every assertion on a promise. Miss the `await` and your test passes silently even when the assertion would fail.

The functions in `starter/async-utils.js` return promises. Write tests in `starter/async-utils.test.js` that handle both resolved and rejected outcomes.

## Functions to test

| Function                     | Behaviour                                                              |
| ---------------------------- | ---------------------------------------------------------------------- |
| `delay(ms)`                  | Resolves with `"done"` after `ms` milliseconds                         |
| `fetchUser(id)`              | Resolves with `{ id, name }` for ids 1–3, rejects otherwise           |
| `fetchAll(ids)`              | Resolves with an array of users (calls `fetchUser` for each id)        |
| `timeout(promise, ms)`       | Resolves with the promise value, or rejects `"Timeout"` if too slow    |
| `retry(fn, attempts)`        | Calls `fn()` up to `attempts` times, resolves on first success         |

The available users are:

| id | name    |
| -- | ------- |
| 1  | Ada     |
| 2  | Grace   |
| 3  | Alan    |

## What to practise

- `async` / `await` in test functions
- `await expect(...).resolves.toBe(value)` and `resolves.toEqual(value)`
- `await expect(...).rejects.toThrow(message)`
- Testing timing-sensitive code with small ms values

## Getting started

```bash
cd starter && pnpm install
```

Open `async-utils.test.js`. Here's the basic pattern — there are two ways to test a resolved promise:

**Style 1: await the result, then assert**

```js
it('fetches a known user', async () => {
  const user = await fetchUser(1);
  expect(user).toEqual({ id: 1, name: 'Ada' });
});
```

**Style 2: assert directly on the promise**

```js
it('fetches a known user', async () => {
  await expect(fetchUser(1)).resolves.toEqual({ id: 1, name: 'Ada' });
});
```

Both are valid. Style 1 is often clearer when you need multiple assertions on the result. Style 2 is more concise for single checks.

For rejections:

```js
it('rejects an unknown id', async () => {
  await expect(fetchUser(99)).rejects.toThrow('Unknown user');
});
```

Then run:

```bash
pnpm test
```

### The most important rule

**Always `await` the expect call when using `resolves` or `rejects`.**

```js
// WRONG — no await, test finishes before the promise settles, passes silently
expect(fetchUser(99)).rejects.toThrow();

// CORRECT
await expect(fetchUser(99)).rejects.toThrow();
```

Without `await`, the test function returns synchronously. Vitest considers it passed because no assertion failed *during* the test. The promise rejection happens later, after the test is already done.

## Edge cases to consider

- **`delay`** — does it resolve with the string `"done"`? Keep the ms value small (e.g. 10) so tests run fast.
- **`fetchUser`** — test each valid id (1, 2, 3) and at least one invalid id. Check that the error message includes the id.
- **`fetchAll`** — test with multiple valid ids, an empty array, and a mix that includes an invalid id (it should reject because `Promise.all` rejects on the first failure).
- **`timeout`** — test a fast promise that resolves in time, and a slow promise that exceeds the limit. Use small ms values: e.g. a `delay(10)` with a 200ms timeout should succeed, a `delay(500)` with a 10ms timeout should reject.
- **`retry`** — test a function that succeeds immediately, one that fails twice then succeeds, and one that always fails. For the flaky function, use a closure with a counter:

```js
it('retries until success', async () => {
  let calls = 0;
  const flaky = async () => {
    calls++;
    if (calls < 3) throw new Error('not yet');
    return 'ok';
  };
  const result = await retry(flaky, 5);
  expect(result).toBe('ok');
  expect(calls).toBe(3);
});
```

## Hints

- `fetchAll` uses `Promise.all` internally. Remember that `Promise.all` rejects as soon as *any* promise rejects — you don't get partial results.
- For `retry`, the last error should be re-thrown when all attempts fail. Check the message matches.
- Keep all delay values low (10–50ms) so the test suite runs in under a second.

## Stretch goals

- Can you test that `timeout` rejects with the exact message `"Timeout"`?
- What happens if you call `retry(fn, 1)` — one attempt, no retries? Does it behave like calling `fn()` directly?
- Try writing a test where `fetchAll([])` resolves with `[]` — an empty input should give an empty output.

## Reference solution

[`solution/async-utils.test.js`](solution/async-utils.test.js)
