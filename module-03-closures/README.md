# Module 3 - Closures, Currying, and Immutability

In Module 2 you passed functions as values. Now we look at what happens when a function **remembers** the variables from the scope it was created in. That's a closure - and it unlocks private state, partial application, currying, and a clean approach to data that never mutates by accident.

By the end of this module you should be able to:

- **Explain closures** and use them to create private state.
- **Partially apply** arguments to build pre-configured functions.
- **Curry** a function so it can be called one argument at a time.
- **Copy objects immutably** with spread and `structuredClone`.

---

## 1. Closures - private state

```bash
node module-03-closures/demo/01-closures
```

A closure is a function that remembers the variables from the scope where it was defined, even after that scope has finished executing.

```js
function createZoneTracker(zoneName) {
  const sightings = [];

  return {
    logSighting(assetId, note) {
      sightings.push({ assetId, note });
    },
    getSightings() {
      return [...sightings];
    },
    count() {
      return sightings.length;
    },
  };
}
```

`sightings` is not on the returned object - it's invisible to the outside world. The only way to interact with it is through the methods that close over it. Each call to `createZoneTracker` gets its own separate `sightings` array. That's private state without classes, without `#private`, without anything except a function and its scope.

---

## 2. Partial application and currying

```bash
node module-03-closures/demo/02-partial-application
```

### Partial application

Bake in one argument now, supply the rest later:

```js
function createAlertFn(severity) {
  return (message) => `[${severity}] ${message}`;
}

const warn = createAlertFn('WARN');
warn('Fence voltage dropping'); // "[WARN] Fence voltage dropping"
```

`createAlertFn` returns a closure that remembers `severity`. The returned function has a simpler signature - one parameter instead of two.

### Layering

Partial application composes:

```js
function createTaggedLogger(tag, alertFn) {
  return (message) => `${tag}: ${alertFn(message)}`;
}

const lagoonWarn = createTaggedLogger('LAGOON', warn);
lagoonWarn('Mosasaurus near surface');
// "LAGOON: [WARN] Mosasaurus near surface"
```

### Currying

Currying transforms `f(a, b)` into `f(a)(b)`:

```js
function curry(fn) {
  return (a) => (b) => fn(a, b);
}

const sighting = curry((zone, name) => `${name} spotted in ${zone}`);
const inValley = sighting('Cretaceous Valley');
inValley('Rex'); // "Rex spotted in Cretaceous Valley"
inValley('Compy'); // "Compy spotted in Cretaceous Valley"
```

Currying is useful when you want to reuse the same first argument across many calls. Don't overuse it - clarity beats cleverness.

---

## 3. Immutability - don't mutate what you didn't create

```bash
node module-03-closures/demo/03-immutability
```

When a closure holds data, or when you receive an object from somewhere else, you need to be careful not to change it by accident. Immutability means always returning **new** objects instead of modifying existing ones.

### Shallow copy with spread

```js
const updated = { ...dino, zone: 'Ridge' };
```

This copies all top-level properties. But nested objects are still **shared**:

```js
const shallow = { ...dino };
shallow.vitals.weightKg = 9999; // also changes dino.vitals.weightKg!
```

### Deep copy with `structuredClone`

```js
const deep = structuredClone(dino);
deep.vitals.weightKg = 9999; // dino.vitals untouched
```

`structuredClone` copies everything recursively. Use it when you have nested data you need to isolate completely.

### The rule

If you didn't create it, don't mutate it. Return a new object with the changes applied. This prevents action-at-a-distance bugs and makes functions easier to test.

---

## Exercises

| #   | Folder                                                        | What you'll practice                                              |
| --- | ------------------------------------------------------------- | ----------------------------------------------------------------- |
| 1   | [`01-closure-factory`](exercises/01-closure-factory/)         | Build `createZoneTracker` with private `sightings` array.         |
| 2   | [`02-partial-application`](exercises/02-partial-application/) | `createAlertFn(severity)` and `createTaggedLogger(tag, alertFn)`. |
| 3   | [`03-immutable-records`](exercises/03-immutable-records/)     | `bumpDangerLevel` and `renameZone` without mutating the input.    |

Run tests:

```bash
cd module-03-closures/exercises/<exercise>/starter && pnpm install && pnpm test
```

---

## Slides

Teaching deck: from repo root run `pnpm slides:03`, or `cd slides && pnpm dev`.

## Reference

- [MDN: Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [MDN: structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)
