# Exercise 03 - Map

## The scenario

Raw data from the park's sensors is never in the shape the dashboard needs. Numbers need doubling for calibration, dinosaur records need flattening to just their names for a dropdown menu, and full sighting records need formatting into human-readable log lines.

You'll use `.map()` to transform arrays - taking one shape of data in and producing a new array of a different shape, without mutating the original.

## What you will build

All functions live in [`starter/mappers.js`](starter/mappers.js).

| Function                 | Description                                               | Example                                           |
| ------------------------ | --------------------------------------------------------- | ------------------------------------------------- |
| `doubleAll(numbers)`     | Return a new array with every number doubled              | `doubleAll([1,2,3])` → `[2,4,6]`                  |
| `extractNames(dinos)`    | Return an array of just the `species` strings             | `extractNames([{species:'Rex',...}])` → `['Rex']` |
| `formatSightings(dinos)` | Return formatted strings like `"Rex (North) - danger: 9"` | One string per dino                               |

Each dino is `{ species: string, zone: string, dangerLevel: number }`.

## Getting started

Open [`starter/mappers.js`](starter/mappers.js). Replace the stubs with `.map()` calls. Then run:

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The tests check empty arrays, negative numbers, species extraction, and the exact format string for sightings.

## Hints

- `.map()` returns a **new array** of the same length - the callback transforms each element.
- For `extractNames`, you just need to pull one property: `d => d.species`.
- Template literals make `formatSightings` clean: `` `${d.species} (${d.zone}) - danger: ${d.dangerLevel}` ``.

## Reference solution

[`solution/mappers.js`](solution/mappers.js)
