# Exercise 01 - Pure Functions

## The goal

Pure functions are the easiest code to test — same input always gives the same output, no side effects to worry about. This exercise gets you comfortable with the basic testing workflow: import a function, call it with known inputs, and assert the output matches what you expect.

You are given a set of simple math utility functions in `starter/math.js`. Your job is to **write the tests** in `starter/math.test.js`.

## Functions to test

| Function              | Returns                                          |
| --------------------- | ------------------------------------------------ |
| `add(a, b)`           | Sum of `a` and `b`                               |
| `subtract(a, b)`      | `a` minus `b`                                    |
| `multiply(a, b)`      | Product of `a` and `b`                           |
| `divide(a, b)`        | `a / b`, or `null` when `b` is `0`               |
| `clamp(value, min, max)` | `value` constrained to the `[min, max]` range |
| `isEven(n)`           | `true` if `n` is even, `false` otherwise         |
| `factorial(n)`        | Factorial of `n` (assumes `n >= 0`)              |

## What to practise

- Structuring tests with `describe` blocks (one per function) and `it` cases
- `toBe` for primitive comparisons (numbers, booleans)
- `toBeNull` for null checks
- Thinking about edge cases before writing the code

## Getting started

```bash
cd starter && pnpm install
```

Open `math.test.js`. The imports are already wired up. Here's an example to get you going — write a `describe` block for each function with at least two `it` cases:

```js
describe('add', () => {
  it('adds two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('handles negative numbers', () => {
    expect(add(-1, -4)).toBe(-5);
  });
});
```

Then run:

```bash
pnpm test
```

## Edge cases to consider

Good tests don't just check the happy path. For each function, think about:

- **Zero** — `add(7, 0)`, `multiply(5, 0)`, `divide(0, 3)`, `factorial(0)`
- **Negative numbers** — `subtract(3, 8)`, `isEven(-2)`, `clamp(-5, 0, 10)`
- **Boundary values** — `clamp(0, 0, 10)` (value equals min), `clamp(10, 0, 10)` (value equals max)
- **Special returns** — `divide(5, 0)` should return `null`, not throw

## Stretch goals

- What happens with `factorial(1)`? With very large inputs like `factorial(20)`?
- Can you add a test that checks `multiply(-3, -4)` gives a positive result?
- Try using `.not` — e.g. `expect(isEven(7)).not.toBe(true)`

## Reference solution

[`solution/math.test.js`](solution/math.test.js)
