# Module 2 — Trainer Notes

## Goal

Students should leave this module comfortable writing plain functions, running Vitest, declaring functions in all three forms, using default/rest parameters, and working individually with filter, sort, map, and reduce before composing them into pipelines.

## Demo walkthrough

### 01 — Introduction to functions

- Start simple: `function greet() { return 'Hello'; }` — declare, call, see the result.
- Parameters: show `add(a, b)` with different inputs. Point out the `return` keyword — without it you get `undefined`.
- Multiple parameters: `describeDino(name, species, zone)` — show string concatenation.
- Using return values: store in a variable, pass to another call (`double(double(3))`).
- Returning booleans: `isPositive(n)` — functions can return any type.
- Keep this short and sweet. It's the foundation for everything that follows.

### 02 — Vitest intro

- **Emphasise this one.** Every exercise from here on has a `.test.js` file. Students need to be comfortable running and reading tests.
- Run the tests live: `pnpm vitest run module-02-functions/demo/02-vitest-intro/alert.test.js`.
- Break one test on purpose — change an expected string. Show how Vitest highlights the diff.
- Walk through `describe` / `it` / `expect` structure.
- Mention watch mode briefly: `pnpm vitest module-02-functions/demo/02-vitest-intro/alert.test.js` (no `run`).

### 03 — Function basics (declarations, expressions, arrows)

- Walk through declaration vs expression vs arrow side by side.
- Ask: "What happens if you call a function expression before its `const` declaration?" (TDZ error.)
- Show implicit return with arrows: `(n) => n * 2`. Then show block body when you need multiple statements.
- Default params: call `formatSighting('Compy')` and show the defaults filling in.
- Rest params: show how `...items` collects extras into a real array.
- Functions as values: `applyToEach` is a manual `map` — use it to motivate demo 04.

### 04 — Filter

- Start with numbers: filter evens from `[1..10]`. Simple predicate.
- Show overlap between two arrays using `.filter()` + `.includes()`.
- Filter objects: dangerous dinosaurs. Point out the predicate callback is the same pattern — just reads a property.
- Emphasise: `.filter()` returns a new array, original untouched.

### 05 — Sort

- The gotcha: `[10, 1, 21, 2].sort()` gives `[1, 10, 2, 21]`. Why? Lexicographic.
- Fix: `(a, b) => a - b`. Explain negative = a first, positive = b first, zero = equal.
- Sort objects by `dangerLevel` descending: `b.dangerLevel - a.dangerLevel`.
- Sort alphabetically: `.localeCompare()`.
- Mention: `.sort()` mutates! Spread first if you need a copy.

### 06 — Map

- Double numbers: `[1,2,3].map(n => n * 2)`. Same length in, same length out.
- Extract a field: `.map(d => d.species)`. Common pattern for dropdowns / labels.
- Format to strings: template literals inside map. Good for log lines and display.
- Reshape objects: `.map(d => ({ name: d.species, isLethal: d.dangerLevel > 7 }))`.

### 07 — Reduce

- Sum: walk through `acc` step by step on a whiteboard.
- Count by zone: `acc` starts as `{}`, each iteration adds or increments a key. Draw the object after each step.
- Find max: comparator reduce. Point out the gotcha with empty arrays (no initial value = throw).
- For groups struggling: run the "step by step" section of the demo which logs `acc` each iteration.

### 08 — Pipelines

- Run the demo — it reads `data/dinosaurs.json` and builds a carnivore pressure summary.
- Walk through the chain: filter → map → reduce. Ask: "What does each step produce?"
- Emphasise: each method returns a **new** array (or value). No mutation.
- This is the capstone — students already know each method. The new skill is composition.

## Exercises

| # | Folder | Key skills | Notes |
|---|--------|-----------|-------|
| 1 | `01-function-intro` | `function` keyword, params, return | Gentlest intro — plain functions, no arrows yet. |
| 2 | `02-vitest-contract` | `??` defaults, template literals, Vitest | First time students write code *to pass a test*. |
| 3 | `03-arrow-functions` | Arrows, defaults, rest | No array methods — pure syntax practice. |
| 4 | `04-filter` | `.filter()` | Numbers → overlap → objects. Escalating. |
| 5 | `05-sort` | `.sort()` | Numeric, descending, alphabetic. Mutation awareness. |
| 6 | `06-map` | `.map()` | Numbers → field extraction → formatted strings. |
| 7 | `07-reduce` | `.reduce()` | Sum → group-by → find max. Accumulator practice. |
| 8 | `08-migration-pipeline` | Composition | filter + map + reduce. Capstone. |

## Timing

- Demo 01 (function intro): ~10 min.
- Exercise 01 (function intro): ~10 min.
- Demo 02 (Vitest): ~15 min — don't rush this, it pays off all course.
- Exercise 02 (vitest contract): ~10 min.
- Demo 03 (function basics): ~15 min.
- Exercise 03 (arrows): ~10 min.
- Demo 04 (filter): ~10 min.
- Exercise 04 (filter): ~10 min.
- Demo 05 (sort): ~10 min.
- Exercise 05 (sort): ~10 min.
- Demo 06 (map): ~10 min.
- Exercise 06 (map): ~10 min.
- Demo 07 (reduce): ~15 min.
- Exercise 07 (reduce): ~15 min.
- Demo 08 (pipelines): ~10 min.
- Exercise 08 (capstone): ~20 min.
- Total: ~3 hours.

## Common issues

- **Arrow vs block body**: students forget `return` inside `{ }`. `(x) => { x * 2 }` returns `undefined`.
- **`.sort()` without comparator**: `[10, 1, 21].sort()` gives `[1, 10, 21]`. Must pass `(a, b) => a - b`.
- **`.sort()` mutation**: students don't expect the original array to change. Show spread-first pattern.
- **`reduce` accumulator**: forgetting to return `acc` from the callback. The next iteration gets `undefined`.
- **Empty array edge case**: `reduce` on an empty array with no initial value throws. Always pass an initial value.
- **`.map()` vs `.forEach()`**: students use `.forEach()` and try to push into an external array. Show `.map()` as the cleaner alternative.
