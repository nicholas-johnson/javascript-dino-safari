# Exercise 03 - Array Helpers

## The goal

Arrays are the most common data structure you'll test against. The key difference from the earlier exercises is that you need **deep equality** — two arrays with the same contents are separate objects, so `toBe` won't work. This is where `toEqual` becomes essential.

You are given a set of array utility functions in `starter/arrays.js`. Write tests in `starter/arrays.test.js`.

## Functions to test

| Function                   | Returns                                                      |
| -------------------------- | ------------------------------------------------------------ |
| `unique(arr)`              | New array with duplicates removed                            |
| `chunk(arr, size)`         | Array of sub-arrays, each at most `size` long                |
| `flatten(arr)`             | Deeply nested array flattened to a single level              |
| `compact(arr)`             | New array with all falsy values removed                      |
| `intersection(a, b)`       | Values present in both `a` and `b`                           |
| `zip(a, b)`                | Array of `[a[i], b[i]]` pairs (length = shorter array)      |
| `range(start, end, step)`  | Array of numbers from `start` up to (not including) `end`    |

## What to practise

- `toEqual` for deep array and nested array comparisons
- `toHaveLength` for checking array sizes
- Testing with empty arrays, single-element arrays, and uneven inputs

## Getting started

```bash
cd starter && pnpm install
```

Open `arrays.test.js`. Here's an example — notice `toEqual` instead of `toBe`:

```js
describe('unique', () => {
  it('removes duplicates', () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  it('returns an empty array for empty input', () => {
    expect(unique([])).toEqual([]);
  });
});
```

Then run:

```bash
pnpm test
```

### Why `toEqual` and not `toBe`?

```js
expect([1, 2]).toBe([1, 2]);     // FAILS — two different array objects
expect([1, 2]).toEqual([1, 2]);   // passes — same contents
```

`toBe` checks reference identity. `toEqual` checks that every element matches. For arrays and objects, always use `toEqual`.

## Edge cases to consider

- **Empty arrays** — `unique([])`, `chunk([], 3)`, `flatten([])`, `intersection([], [1, 2])`
- **Single elements** — `chunk([1], 5)`, `unique([7])`, `zip([1], [2, 3])`
- **Remainders** — `chunk([1, 2, 3, 4, 5], 2)` has a final chunk of `[5]`
- **Uneven lengths** — `zip([1, 2], ['a', 'b', 'c'])` should stop at the shorter array
- **Duplicates in input** — `intersection([1, 1, 2], [1])` — does it deduplicate?
- **Boundary step values** — `range(5, 5)` where start equals end, `range(0, 10, 3)` where end isn't a multiple of step

## Hints

For `compact`, remember that JavaScript has six falsy values: `false`, `0`, `''`, `null`, `undefined`, and `NaN`. A good test includes all of them:

```js
it('removes all falsy values', () => {
  expect(compact([0, 1, false, 2, '', 3, null, undefined, NaN])).toEqual([1, 2, 3]);
});
```

## Stretch goals

- Does `unique` preserve the order of first occurrence? Write a test: `unique([3, 1, 2, 1, 3])` should be `[3, 1, 2]`.
- Test `flatten` with deeply nested input: `[1, [2, [3, [4]]]]`
- What should `compact` do with truthy strings like `'hello'` and numbers like `42`? Verify it keeps them.

## Reference solution

[`solution/arrays.test.js`](solution/arrays.test.js)
