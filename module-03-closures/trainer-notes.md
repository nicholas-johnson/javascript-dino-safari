# Module 3 - Trainer Notes

## Goal

Students understand closures as functions that remember their creation scope. They can use closures for private state, partial application, and currying. They understand why mutating shared data is dangerous and how to copy safely.

## Demo walkthrough

### 01 - Closures

- Show `createZoneTracker` - two independent trackers with separate `sightings` arrays.
- Ask: "Where is `sightings` stored? Can you access it from outside?" (No - it's closure-held.)
- Key point: every call to the factory creates a fresh scope. That's how you get private state without classes.

### 02 - Partial application / currying

- `createAlertFn('WARN')` returns a function that remembers the severity.
- Show layering with `createTaggedLogger` - closures compose naturally.
- Currying: `curry(fn)` transforms `f(a, b)` into `f(a)(b)`. Show the reuse pattern with `inValley`.
- Caution: don't over-curry. If a function naturally takes two args and is always called with both, currying adds complexity for no benefit.

### 03 - Immutability

- Start with the bug: spread copies are shallow. Mutating `shallow.vitals` changes the original.
- Show `structuredClone` as the fix for nested data.
- Rule: if you didn't create it, don't mutate it. Return a new object.
- Tie to exercise 03: tests use `Object.freeze` to catch accidental mutation.

## Exercises

| #   | Folder                   | Key skills                                  | Notes                                                                    |
| --- | ------------------------ | ------------------------------------------- | ------------------------------------------------------------------------ |
| 1   | `01-closure-factory`     | Closures, private state                     | `createZoneTracker` with `logSighting`, `getSightings`, `getCount`.      |
| 2   | `02-partial-application` | Partial application, higher-order functions | `createAlertFn`, `createTaggedLogger`.                                   |
| 3   | `03-immutable-records`   | Spread, `structuredClone`, no mutation      | `bumpDangerLevel`, `renameZone` return new objects. Tests freeze inputs. |

## Timing

- Demo 01 (closures): ~15 min.
- Demo 02 (partial application + currying): ~15 min.
- Demo 03 (immutability): ~10 min.
- Exercises: ~30–40 min for all three.
- Total: ~1–1.5 hours.

## Common issues

- **"But I can see sightings in the debugger"**: Yes - closures aren't security. They're encapsulation. External code can't _reference_ the variable, but the debugger can inspect it.
- **Forgetting to return `acc` in reduce** (from Module 2 exercises): if students are still shaky, reinforce here.
- **Shallow spread on nested objects**: the most common bug. Show the `vitals` aliasing example live.
