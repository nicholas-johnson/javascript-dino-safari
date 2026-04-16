# Exercise 04 - Error Handling

## The goal

Real-world functions don't just return values — they throw when something goes wrong. Testing errors requires a slightly different technique: you wrap the call in a function so Vitest can catch the throw, rather than your test blowing up.

The functions in `starter/validators.js` validate their inputs and **throw** when something is wrong. Write tests that verify both the happy path (valid input, correct return value) and the error path (invalid input, correct error message).

## Functions to test

| Function                         | Behaviour                                                        |
| -------------------------------- | ---------------------------------------------------------------- |
| `safeDivide(a, b)`               | Returns `a / b`, throws `"Cannot divide by zero"` when `b` is 0 |
| `parseJSON(str)`                 | Returns parsed object, throws `"Invalid JSON"` on bad input      |
| `requirePositive(n)`             | Returns `n`, throws `"Expected a positive number"` if `n <= 0`   |
| `lookupById(collection, id)`     | Returns matching item, throws `"Not found: <id>"` if missing     |
| `createUser({ name, email })`    | Returns the user object, throws if `name` or `email` is missing  |

## What to practise

- Wrapping calls in `() => fn()` so `toThrow` can catch the error
- `toThrow()` for any error
- `toThrow('message')` for matching a specific error message
- Testing both success and failure branches of each function

## Getting started

```bash
cd starter && pnpm install
```

Open `validators.test.js`. Here's the pattern — note the arrow wrapper on the error case:

```js
describe('safeDivide', () => {
  it('divides two numbers', () => {
    expect(safeDivide(10, 2)).toBe(5);
  });

  it('throws when dividing by zero', () => {
    expect(() => safeDivide(10, 0)).toThrow('Cannot divide by zero');
  });
});
```

Then run:

```bash
pnpm test
```

### Why the arrow wrapper?

This is the most common mistake when testing errors:

```js
// WRONG — the error fires immediately, before expect() can catch it
expect(safeDivide(1, 0)).toThrow();

// CORRECT — the arrow defers the call so expect() can observe it
expect(() => safeDivide(1, 0)).toThrow();
```

`toThrow` needs a **function to call**, not the result of calling it. The arrow function wraps the call so Vitest controls when it executes.

## Edge cases to consider

- **`parseJSON`** — test with valid JSON (`'{"a":1}'`), a JSON array (`'[1,2,3]'`), garbage input (`'not json'`), and an empty string
- **`requirePositive`** — test with a positive number, zero, negative numbers, and non-numeric input like `'5'`
- **`lookupById`** — test with a found item, a missing id, and an empty collection
- **`createUser`** — test the happy path, then missing `name`, missing `email`, and both missing. The function throws different messages for each.

## Hints

For `createUser`, the function checks `name` first. When both are missing, the error message is `"name is required"`, not `"email is required"`. You can test this:

```js
it('throws when both are missing', () => {
  expect(() => createUser({})).toThrow('name is required');
});
```

## Stretch goals

- Can you use `toThrow` with no argument to just verify *an* error was thrown, without checking the message?
- Try `expect(() => ...).not.toThrow()` for the happy path — it's another way to verify a function succeeds
- What happens if you pass `requirePositive(NaN)`? Is `NaN` positive? Write a test to find out

## Reference solution

[`solution/validators.test.js`](solution/validators.test.js)
