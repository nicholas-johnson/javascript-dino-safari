# Exercise 01 - Zone tracker factory

## The scenario

Rangers across the park need independent sighting logs for each zone they patrol. A ranger at Raptor Ridge shouldn't see entries from Cretaceous Valley, and nobody outside the tracker should be able to tamper with the raw sighting data.

You'll build a **factory function** that uses a closure to keep each zone's sighting list completely private. Every call to the factory creates a fresh, isolated tracker - callers can add sightings and read them back, but they can never reach in and modify the internal array directly.

## What you will build

`createZoneTracker(zoneName)` - a factory that returns an object with three methods:

| Method                       | Description                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------- |
| `logSighting(assetId, note)` | Appends `{ assetId, note }` to the tracker's private sighting list.                      |
| `getSightings()`             | Returns a **shallow copy** of the sighting array. Callers can't push into the real list. |
| `getCount()`                 | Returns the number of sightings recorded so far.                                         |

### Key constraints

- Each tracker must have **its own** backing array - creating a second tracker must not affect the first.
- `getSightings()` must return a copy. If a caller pushes onto the returned array, the internal state must stay unchanged.
- Sightings are stored in the order they were logged.

## Getting started

Open [`starter/zone-tracker.js`](starter/zone-tracker.js). The stub already has the right function signature and return shape - replace the `// TODO` with your implementation.

Run `starter/index.js` to see the tracker in action once it works:

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The tests check isolated state between trackers, copy safety of `getSightings()`, and ordering.

## Hints

- A variable declared inside the outer function is captured by any inner function that references it - that's the closure.
- Spread (`[...arr]`) or `.slice()` both create a shallow copy of an array.

## Reference solution

[`solution/zone-tracker.js`](solution/zone-tracker.js)
