# Exercise 01 - Dino Feeder

## The scenario

Each zone in the park has a feeding station - a hopper that rangers load with food, then dispense to individual dinosaurs throughout the day. The station needs to track how much food is in the hopper, record every feeding for the audit log, and refuse to dispense more than what's available.

You'll build this as a plain **object literal** with methods. The state lives as properties on the object, and the methods use `this` to read and modify that state. No classes, no constructors - just an object with behaviour.

## What you will build

Add four methods to the `feeder` object in [`starter/feeder.js`](starter/feeder.js):

| Method               | Description                                                                                                                            | Returns                         |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `stock(kg)`          | Add `kg` of food to the hopper                                                                                                         | The new total (number)          |
| `feed(dinoName, kg)` | Dispense `kg` of food. If supply is insufficient, throw `Error('Not enough food')`. Otherwise record the feeding and reduce the supply | `"Fed <dinoName> <kg>kg"`       |
| `remaining()`        | How much food is left                                                                                                                  | Number of kg                    |
| `log()`              | Every feeding recorded so far, oldest first                                                                                            | Array of `{ dino, kg }` objects |

The object already has `name`, `supply`, and `feedings` properties - your methods should use `this` to access them.

## Getting started

Open [`starter/feeder.js`](starter/feeder.js). The object skeleton is ready - add the four methods. Then run:

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The tests reset `supply` and `feedings` before each test. They check stocking, feeding, the error case, feeding log order, and the empty-log edge case.

## Hints

- `this.supply += kg` adds food; `this.supply -= kg` removes it.
- `this.feedings.push({ dino: dinoName, kg })` records a feeding.
- Return `[...this.feedings]` from `log()` to return a copy (prevents external mutation of the internal array).
- Throw with `throw new Error('Not enough food')` - the tests match this exact message.

## Reference solution

[`solution/feeder.js`](solution/feeder.js)
