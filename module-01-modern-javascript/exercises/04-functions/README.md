# Exercise 04 - Introduction to functions

## The scenario

The park's internal toolkit is missing basic utility functions. Every system - from the feeding calculator to the ranger ID printer - needs small, reusable building blocks: arithmetic helpers, a greeting formatter, an even/odd checker, and an initials extractor.

You'll write your first functions using the `function` keyword. Each one takes parameters and returns a value - no side effects, no complexity, just the fundamentals.

## What you will build

Functions are split across two files:

### [`starter/math.js`](starter/math.js)

| Function         | Description                                     | Example                 |
| ---------------- | ----------------------------------------------- | ----------------------- |
| `add(a, b)`      | Return the sum of `a` and `b`                   | `add(2, 3)` → `5`       |
| `multiply(a, b)` | Return the product of `a` and `b`               | `multiply(4, 5)` → `20` |
| `isEven(n)`      | Return `true` if `n` is even, `false` otherwise | `isEven(4)` → `true`    |

### [`starter/strings.js`](starter/strings.js)

| Function                | Description                                                                         | Example                                   |
| ----------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------- |
| `greet(name)`           | Return `"Hello, <name>!"`                                                           | `greet('Ellie')` → `'Hello, Ellie!'`      |
| `initials(first, last)` | Return first character of each name, uppercased, joined with a dot and trailing dot | `initials('Ellie', 'Sattler')` → `'E.S.'` |

## Getting started

Open both stub files in `starter/`. Each function has the right signature - replace the body. Then run `starter/index.js` to see the output:

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The tests cover positive numbers, zero, negatives, and lowercase name input (e.g. `initials('ian', 'malcolm')` should still produce `'I.M.'`).

## Hints

- The modulo operator `%` is the standard way to check even/odd: `n % 2 === 0`.
- For `greet`, string concatenation or a template literal both work.
- For `initials`, grab `first[0]` and `last[0]`, uppercase them, then join with dots.

## Reference solution

[`solution/math.js`](solution/math.js) | [`solution/strings.js`](solution/strings.js)
