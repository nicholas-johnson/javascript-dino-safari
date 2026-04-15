# Exercise 04 - Reduce

## The scenario

The park's reporting engine needs to crunch arrays down to single values: total sensor readings, a count of dinosaurs per zone for the capacity dashboard, and the single most dangerous creature in the database for the "top threat" alert banner.

`.reduce()` is the Swiss army knife - it walks an array and accumulates a result of any shape: a number, an object, or even another array. You'll use it for all three.

## What you will build

All functions live in [`starter/reducers.js`](starter/reducers.js).

### `sum(numbers)`

Return the total of all numbers in the array. Return `0` for an empty array.

```js
sum([1, 2, 3, 4]); // 10
sum([]); // 0
```

### `countByZone(dinos)`

Return an object mapping each `zone` to the number of dinosaurs in it.

```js
countByZone([
  { species: 'Rex', zone: 'North' },
  { species: 'Raptor', zone: 'North' },
  { species: 'Bronto', zone: 'Lake' },
]);
// { North: 2, Lake: 1 }
```

### `maxDanger(dinos)`

Return the single dino object with the highest `dangerLevel`. Return `null` for an empty array.

```js
maxDanger([
  { species: 'Compy', dangerLevel: 2 },
  { species: 'Rex', dangerLevel: 9 },
]);
// { species: 'Rex', dangerLevel: 9 }
```

## Getting started

Open [`starter/reducers.js`](starter/reducers.js). Replace the stubs - each function is a single `.reduce()` call. Then run:

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The tests check empty arrays, negative numbers, multi-zone grouping, and single-item arrays.

## Hints

- `sum`: start with `0` as the initial accumulator - `numbers.reduce((total, n) => total + n, 0)`.
- `countByZone`: start with `{}` and increment `acc[d.zone]` on each iteration. Use `?? 0` to handle the first occurrence.
- `maxDanger`: start with `dinos[0] ?? null` and compare `dangerLevel` on each step.

## Reference solution

[`solution/reducers.js`](solution/reducers.js)
