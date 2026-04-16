# Extras — Testing with Vitest

## What is Vitest?

Vitest is a test runner built on top of Vite. It understands ES modules natively, needs almost no configuration, and has an API that will feel familiar if you've used Jest. It's fast — tests run in parallel by default and only re-run changed files in watch mode.

You write tests in plain `.test.js` files alongside your source code. Each test makes assertions about what your code should do. When the assertions pass, the test passes.

---

## Installation

Add Vitest as a dev dependency:

```bash
pnpm add -D vitest
```

Add a test script to `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

`vitest run` executes tests once and exits. `vitest` (no `run`) starts watch mode, re-running on every file change — useful during development.

---

## Configuration

Vitest works with zero configuration for most projects. When you need to customise it, create a `vitest.config.js`:

```js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['*.test.js'],       // which files are test files
    globals: false,                // if true, no need to import describe/it/expect
    testTimeout: 5000,             // ms before a test is considered hung
  },
});
```

### Key config options

| Option        | Default          | Purpose                                        |
| ------------- | ---------------- | ---------------------------------------------- |
| `include`     | `**/*.test.{js,ts,...}` | Glob patterns for test files             |
| `exclude`     | `node_modules`   | Patterns to skip                               |
| `globals`     | `false`          | Auto-inject `describe`/`it`/`expect` globally  |
| `testTimeout` | `5000`           | Max time per test in ms                        |
| `setupFiles`  | `[]`             | Scripts to run before each test file           |

If your project already has a `vite.config.js`, Vitest reads it automatically — you don't need a separate file.

---

## Writing your first test

Create a function:

```js
// math.js
export const add = (a, b) => a + b;
```

Create a test file alongside it:

```js
// math.test.js
import { describe, it, expect } from 'vitest';
import { add } from './math.js';

describe('add', () => {
  it('adds two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('handles negatives', () => {
    expect(add(-1, -4)).toBe(-5);
  });
});
```

Run it:

```bash
pnpm test
```

### The structure

- **`describe(name, fn)`** — groups related tests together. Nesting is allowed.
- **`it(name, fn)`** — defines a single test case. (`test` is an alias for `it`.)
- **`expect(value)`** — wraps a value and returns an object with matcher methods.

---

## Matchers

Matchers are the methods you chain after `expect()`. Here are the ones you'll reach for most often.

### Primitives

```js
expect(2 + 2).toBe(4);               // strict equality (===)
expect('hello').toBe('hello');
expect(true).toBe(true);
```

`toBe` uses `Object.is`, so it works for numbers, strings, booleans, `null`, and `undefined`. Don't use it for objects or arrays — two different objects are never `===`.

### Objects and arrays

```js
expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });   // deep equality
expect([1, 2, 3]).toEqual([1, 2, 3]);
```

`toEqual` recursively checks every property. Use it any time you're comparing non-primitives.

### Truthiness

```js
expect('hello').toBeTruthy();
expect(0).toBeFalsy();
expect(null).toBeNull();
expect(undefined).toBeUndefined();
expect(42).toBeDefined();
```

### Numbers

```js
expect(10).toBeGreaterThan(5);
expect(10).toBeGreaterThanOrEqual(10);
expect(3).toBeLessThan(5);
expect(0.1 + 0.2).toBeCloseTo(0.3);    // handles floating point
```

### Strings and arrays

```js
expect('hello world').toContain('world');
expect([1, 2, 3]).toContain(2);
expect([1, 2, 3]).toHaveLength(3);
expect('dinosaur').toMatch(/dino/);
```

### Errors

```js
expect(() => fnThatThrows()).toThrow();
expect(() => fnThatThrows()).toThrow('specific message');
expect(() => fnThatThrows()).toThrow(TypeError);
```

### Negation

Any matcher can be negated with `.not`:

```js
expect(3).not.toBe(4);
expect([1, 2]).not.toContain(5);
```

---

## Testing async code

Any test that involves promises or `async`/`await` must be handled carefully so Vitest waits for the asynchronous work to finish.

### Approach 1: async/await

The most straightforward pattern. Mark the `it` callback as `async` and `await` the result:

```js
it('fetches a user', async () => {
  const user = await fetchUser(1);
  expect(user.name).toBe('Ada');
});
```

### Approach 2: resolves / rejects

If you want to assert directly on a promise without a temporary variable:

```js
it('resolves a user', async () => {
  await expect(fetchUser(1)).resolves.toEqual({ id: 1, name: 'Ada' });
});

it('rejects for an unknown id', async () => {
  await expect(fetchUser(99)).rejects.toThrow('Unknown user');
});
```

**You must `await` the `expect` call.** Without `await`, the test finishes before the promise settles and silently passes even if the assertion would fail.

### Approach 3: callbacks (rare)

If you're testing callback-based code that can't be promisified, use the `done` callback pattern. But in modern JavaScript, prefer wrapping callbacks in a promise.

---

## Setup and teardown

If several tests need the same preparation, use lifecycle hooks to avoid repetition:

```js
describe('database tests', () => {
  let db;

  beforeEach(() => {
    db = createTestDatabase();
  });

  afterEach(() => {
    db.close();
  });

  it('inserts a record', () => {
    db.insert({ id: 1 });
    expect(db.count()).toBe(1);
  });

  it('starts empty', () => {
    expect(db.count()).toBe(0);
  });
});
```

| Hook          | Runs                                 |
| ------------- | ------------------------------------ |
| `beforeEach`  | Before every `it` in the block       |
| `afterEach`   | After every `it` in the block        |
| `beforeAll`   | Once before the first `it`           |
| `afterAll`    | Once after the last `it`             |

Hooks inside a `describe` only apply to tests in that block. Hooks outside any `describe` apply to every test in the file.

---

## Common gotchas

### 1. `toBe` vs `toEqual` for objects

```js
expect({ a: 1 }).toBe({ a: 1 });     // FAILS — two different object references
expect({ a: 1 }).toEqual({ a: 1 });   // passes — deep comparison
```

`toBe` checks reference identity (`Object.is`). For objects and arrays, always use `toEqual`.

### 2. Forgetting to wrap throwing calls

```js
expect(safeDivide(1, 0)).toThrow();          // WRONG — the error is thrown before
                                              //         expect() even runs

expect(() => safeDivide(1, 0)).toThrow();    // correct — wrapped in a function
```

`toThrow` needs a **function** to call, not the result of calling it. The arrow wrapper defers execution so `expect` can catch the error.

### 3. Missing `await` in async tests

```js
it('fetches a user', async () => {
  expect(fetchUser(99)).rejects.toThrow();   // WRONG — no await, test passes silently
});

it('fetches a user', async () => {
  await expect(fetchUser(99)).rejects.toThrow();  // correct
});
```

Without `await`, the test function returns before the promise settles. Vitest never sees the failed assertion, so the test appears to pass.

### 4. `toEqual` and `undefined` properties

```js
expect({ a: 1, b: undefined }).toEqual({ a: 1 });  // passes!
```

`toEqual` treats a missing key and an explicit `undefined` as equivalent. If you need to distinguish them, use `toStrictEqual`.

### 5. Floating-point comparisons

```js
expect(0.1 + 0.2).toBe(0.3);          // FAILS — 0.30000000000000004 !== 0.3
expect(0.1 + 0.2).toBeCloseTo(0.3);   // passes — within 5 decimal places
```

Always use `toBeCloseTo` when comparing floating-point arithmetic results.

### 6. Forgetting that `describe` is optional

`describe` blocks are for organisation — they're not required. A file with bare `it()` calls works fine:

```js
import { it, expect } from 'vitest';
import { add } from './math.js';

it('adds numbers', () => {
  expect(add(1, 2)).toBe(3);
});
```

Use `describe` when you have multiple logical groups. Don't nest more than two levels deep.

### 7. Tests that depend on each other

Each test should be independent. Never rely on one test running before another or mutating shared state. If two tests need the same object, create it fresh in `beforeEach`.

---

## Running tests

Each exercise in this module is self-contained:

```bash
cd exercises/01-pure-functions/starter
pnpm install
pnpm test
```

To run in watch mode (re-runs on save):

```bash
npx vitest
```

To run a single test file:

```bash
npx vitest math.test.js
```

To run tests matching a name pattern:

```bash
npx vitest -t "adds two"
```

---

## Exercises

Every exercise gives you **pre-written functions** and asks you to **write the tests**. The starter has the imports wired up and a TODO comment. The solution shows one way to write thorough tests.

| #  | Exercise                                                       | Focus                                      |
| -- | -------------------------------------------------------------- | ------------------------------------------ |
| 01 | [Pure Functions](exercises/01-pure-functions/)                 | `toBe`, basic matchers, edge cases         |
| 02 | [String Utilities](exercises/02-string-utils/)                 | String matchers, boundary conditions       |
| 03 | [Array Helpers](exercises/03-array-helpers/)                   | `toEqual`, deep equality, empty inputs     |
| 04 | [Error Handling](exercises/04-error-handling/)                 | `toThrow`, `toThrowError`, wrapping calls  |
| 05 | [Async Testing](exercises/05-async-testing/)                   | `async`/`await`, `resolves`, `rejects`     |
