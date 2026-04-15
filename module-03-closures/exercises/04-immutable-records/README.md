# Exercise 04 - Immutable dino records

## The scenario

Every dinosaur in the park has a data record - name, zone, danger level, tags. When an incident occurs, the system needs to create an **updated** record (e.g. bumped danger level, new zone assignment) without touching the original. The archived record must remain exactly as it was for audit purposes.

The starter code already has two transform functions, but they **mutate the input object** - the classic JavaScript pitfall where two variables point to the same object in memory. Your job is to refactor them so they return brand-new objects and leave the original untouched.

## What you will build

Both functions live in [`starter/record-transforms.js`](starter/record-transforms.js).

### 1. `bumpDangerLevel(dino, delta)`

Returns a **new** dino object with `dangerLevel` increased by `delta`. The original `dino` must not be changed.

```js
const rex = { name: 'Rex', zone: 'CV', dangerLevel: 4, tags: ['apex'] };
const bumped = bumpDangerLevel(rex, 1);

bumped.dangerLevel; // 5
rex.dangerLevel; // 4 - original unchanged
bumped !== rex; // true - different object
```

### 2. `renameZone(dino, newZone)`

Returns a **new** dino object with `zone` set to `newZone`. All other fields stay the same. The original must not be changed.

```js
const blue = { name: 'Blue', zone: 'RR', dangerLevel: 3, tags: [] };
const moved = renameZone(blue, 'Quarantine Bay');

moved.zone; // 'Quarantine Bay'
blue.zone; // 'RR' - original unchanged
moved !== blue; // true - different object
```

### Dino record shape

Assume every dino object looks like this:

```js
{ name: string, zone: string, dangerLevel: number, tags: string[] }
```

## Getting started

Open [`starter/record-transforms.js`](starter/record-transforms.js). The current implementations **deliberately mutate** - run the tests first to see them fail, then refactor to use the spread operator (`{ ...obj }`) or `Object.assign` to produce new objects.

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The tests use `structuredClone` to snapshot the input before your function runs, then compare afterwards to prove you didn't mutate it.

## Hints

- `{ ...dino, dangerLevel: dino.dangerLevel + delta }` creates a shallow copy with one field overridden.
- You only need shallow copies here - the tests don't check for deep-clone behaviour on nested fields like `tags`.

## Reference solution

[`solution/record-transforms.js`](solution/record-transforms.js)
