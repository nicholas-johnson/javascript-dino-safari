# Module 2 - Trainer Notes

## Goal

Students should leave this module comfortable declaring functions in all three forms (declaration, expression, arrow), using default/rest parameters, and working individually with filter, sort, map, and reduce before composing them into pipelines.

> **Prerequisites:** Function basics and Vitest are now covered in Module 1 (demos 06–07).

## Demo walkthrough

### 01 - Filter

- Start with numbers: filter evens from `[1..10]`. Simple predicate.
- Show overlap between two arrays using `.filter()` + `.includes()`.
- Filter objects: dangerous dinosaurs. Point out the predicate callback is the same pattern - just reads a property.
- Emphasise: `.filter()` returns a new array, original untouched.

### 02 - Sort

- The gotcha: `[10, 1, 21, 2].sort()` gives `[1, 10, 2, 21]`. Why? Lexicographic.
- Fix: `(a, b) => a - b`. Explain negative = a first, positive = b first, zero = equal.
- Sort objects by `dangerLevel` descending: `b.dangerLevel - a.dangerLevel`.
- Sort alphabetically: `.localeCompare()`.
- Mention: `.sort()` mutates! Spread first if you need a copy.

### 03 - Map

- Double numbers: `[1,2,3].map(n => n * 2)`. Same length in, same length out.
- Extract a field: `.map(d => d.species)`. Common pattern for dropdowns / labels.
- Format to strings: template literals inside map. Good for log lines and display.
- Reshape objects: `.map(d => ({ name: d.species, isLethal: d.dangerLevel > 7 }))`.

### 04 - Reduce

- Sum: walk through `acc` step by step on a whiteboard.
- Count by zone: `acc` starts as `{}`, each iteration adds or increments a key. Draw the object after each step.
- Find max: comparator reduce. Point out the gotcha with empty arrays (no initial value = throw).
- For groups struggling: run the "step by step" section of the demo which logs `acc` each iteration.

### 05 - Pipelines

- Run the demo - it reads `data/dinosaurs.json` and builds a carnivore pressure summary.
- Walk through the chain: filter → map → reduce. Ask: "What does each step produce?"
- Emphasise: each method returns a **new** array (or value). No mutation.
- This is the capstone - students already know each method. The new skill is composition.

## Exercises

| #   | Folder                  | Key skills                               | Notes                                                |
| --- | ----------------------- | ---------------------------------------- | ---------------------------------------------------- |
| 1   | `01-filter`             | `.filter()`                              | Numbers → overlap → objects. Escalating.             |
| 2   | `02-sort`               | `.sort()`                                | Numeric, descending, alphabetic. Mutation awareness. |
| 3   | `03-map`                | `.map()`                                 | Numbers → field extraction → formatted strings.      |
| 4   | `04-reduce`             | `.reduce()`                              | Sum → group-by → find max. Accumulator practice.     |
| 5   | `05-migration-pipeline` | Composition                              | filter + map + reduce. Capstone.                     |

## Timing

- Demo 01 (filter): ~10 min.
- Exercise 01 (filter): ~10 min.
- Demo 02 (sort): ~10 min.
- Exercise 02 (sort): ~10 min.
- Demo 03 (map): ~10 min.
- Exercise 03 (map): ~10 min.
- Demo 04 (reduce): ~15 min.
- Exercise 04 (reduce): ~15 min.
- Demo 05 (pipelines): ~10 min.
- Exercise 05 (capstone): ~20 min.
- Total: ~2 hours.

## Common issues

- **Arrow vs block body**: students forget `return` inside `{ }`. `(x) => { x * 2 }` returns `undefined`.
- **`.sort()` without comparator**: `[10, 1, 21].sort()` gives `[1, 10, 21]`. Must pass `(a, b) => a - b`.
- **`.sort()` mutation**: students don't expect the original array to change. Show spread-first pattern.
- **`reduce` accumulator**: forgetting to return `acc` from the callback. The next iteration gets `undefined`.
- **Empty array edge case**: `reduce` on an empty array with no initial value throws. Always pass an initial value.
- **`.map()` vs `.forEach()`**: students use `.forEach()` and try to push into an external array. Show `.map()` as the cleaner alternative.
