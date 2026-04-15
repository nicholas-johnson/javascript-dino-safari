# Exercise 01 - Filter

## The scenario

The park's monitoring system collects huge arrays of raw data - sensor readings, zone rosters, dinosaur records. Most of the time you only care about a subset: the even-numbered readings, the IDs that appear in two overlapping patrol lists, or the dinosaurs dangerous enough to warrant a lockdown.

You'll use `.filter()` to write three functions that select elements from arrays - starting with plain numbers and working up to objects.

## What you will build

All functions live in [`starter/filters.js`](starter/filters.js).

| Function              | Description                                      | Example                                              |
| --------------------- | ------------------------------------------------ | ---------------------------------------------------- |
| `keepEvens(numbers)`  | Return only the even numbers                     | `keepEvens([1,2,3,4])` → `[2,4]`                     |
| `overlap(a, b)`       | Return elements from `a` that also appear in `b` | `overlap([1,2,3], [3,4])` → `[3]`                    |
| `getDangerous(dinos)` | Return dinos where `dangerLevel > 5`             | Filters an array of `{ species, zone, dangerLevel }` |

## Getting started

Open [`starter/filters.js`](starter/filters.js). Each function is stubbed - replace the body with a single `.filter()` call. Then run the demo:

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The tests check empty arrays, all-odd input, no-overlap cases, and a mixed roster of safe and dangerous dinos.

## Hints

- `n % 2 === 0` tests whether a number is even.
- `b.includes(n)` checks if `n` exists in array `b`.
- The callback you pass to `.filter()` receives each element - return `true` to keep it, `false` to drop it.

## Reference solution

[`solution/filters.js`](solution/filters.js)
