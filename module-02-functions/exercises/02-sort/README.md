# Exercise 02 - Sort

## The scenario

Rangers need their briefing boards sorted: numbers in ascending order so they can spot anomalies fast, dinosaurs ranked by danger level so the biggest threats show first, and species lists in alphabetical order for the field guide.

JavaScript's default `.sort()` compares strings lexicographically - which means `[10, 1, 21, 2]` sorts to `[1, 10, 2, 21]` unless you supply a comparator. You'll write three sort functions with proper comparison callbacks.

## What you will build

All functions live in [`starter/sorters.js`](starter/sorters.js).

| Function               | Description                                             | Example                                    |
| ---------------------- | ------------------------------------------------------- | ------------------------------------------ |
| `sortNumbers(numbers)` | Sort numbers in ascending order                         | `sortNumbers([10,1,21,2])` → `[1,2,10,21]` |
| `sortByDanger(dinos)`  | Sort by `dangerLevel` descending (most dangerous first) | Rex (9), Raptor (7), Compy (2)             |
| `sortByName(dinos)`    | Sort alphabetically by `species`                        | Allosaurus, Brachiosaurus, Triceratops     |

Each dino is `{ species: string, dangerLevel: number }`.

## Getting started

Open [`starter/sorters.js`](starter/sorters.js). Replace the stubs with `.sort()` calls that include a comparator function. Then run:

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The tests check ascending numeric order (including negatives), descending danger order, and alphabetical species sorting.

## Hints

- Numeric ascending: `.sort((a, b) => a - b)` - if the result is negative, `a` comes first.
- Numeric descending: flip it - `.sort((a, b) => b.dangerLevel - a.dangerLevel)`.
- Alphabetical: `.localeCompare()` handles string comparison properly - `a.species.localeCompare(b.species)`.

## Reference solution

[`solution/sorters.js`](solution/sorters.js)
