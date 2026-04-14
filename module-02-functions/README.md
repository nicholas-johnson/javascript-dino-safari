# Module 2 - Functions, Arrows, and Functional Loops

Functions are the fundamental unit of work in JavaScript. This module covers how to declare them, the compact arrow syntax you'll use constantly, and the array methods - `filter`, `sort`, `map`, `reduce` - that replace most hand-written loops.

By the end of this module you should be able to:

- **Write functions** with the `function` keyword, parameters, and `return`.
- **Run and read Vitest tests** - every exercise from here on ships with a `.test.js` file.
- **Declare functions** three ways: declaration, expression, and arrow.
- **Use default and rest parameters** to write flexible signatures.
- **Pass functions as values** - to other functions, into arrays, wherever.
- **Use `.filter()`** to select elements from an array.
- **Use `.sort()`** with a comparator to order arrays.
- **Use `.map()`** to transform every element.
- **Use `.reduce()`** to fold an array into a single value.
- **Chain** filter, map, and reduce into readable data pipelines.

---

## 1. Introduction to functions

```bash
node module-02-functions/demo/01-function-intro
```

A function is a reusable block of code. You declare one with the `function` keyword, give it a name, list any parameters, and use `return` to send a value back:

```js
function greet() {
  return 'Hello, Jurassic World!';
}
console.log(greet()); // "Hello, Jurassic World!"
```

### Parameters

Parameters let a function work with different inputs each time:

```js
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5
console.log(add(10, 20)); // 30
```

You can have as many as you need:

```js
function describeDino(name, species, zone) {
  return name + ' the ' + species + ', currently in ' + zone;
}
```

### Using return values

Whatever a function returns can be stored in a variable, passed to another function, or used in an expression:

```js
function double(n) {
  return n * 2;
}
const result = double(7); // 14
console.log(double(double(3))); // 12
```

Functions can return any type - numbers, strings, booleans:

```js
function isPositive(n) {
  return n > 0;
}
```

This is the building block for everything that follows.

---

## 2. Vitest - running and reading tests

```bash
node module-02-functions/demo/02-vitest-intro
```

Every exercise in this course ships with a `.test.js` file. When you complete an exercise, the tests go green. Learning to run and read tests _now_ means you'll be self-sufficient for the rest of the course.

The demo has three files: `alert.js` (the code under test), `alert.test.js` (the tests), and `index.js` (runs the functions so you can see output).

### Running tests

```bash
pnpm vitest run module-02-functions/demo/02-vitest-intro/alert.test.js
```

Seven green checks. Now let's look at what makes them tick.

### Anatomy of a test file

```js
import { describe, it, expect } from 'vitest';
import { formatAlert, isHighRisk } from './alert.js';

describe('formatAlert', () => {
  it('tags high-danger sightings', () => {
    const result = formatAlert({ name: 'Rex', zone: 'Valley', dangerLevel: 5 });
    expect(result).toBe('[DANGER] Rex spotted in Valley');
  });

  it('uses defaults for missing fields', () => {
    expect(formatAlert({})).toBe('[OK] Unknown spotted in Uncharted');
  });
});
```

`describe` groups related tests. `it` defines one assertion. `expect(value).toBe(expected)` is the check - if they don't match, Vitest shows a diff.

### Reading a failure

Change an expected string to something wrong and run again. Vitest highlights exactly what it got vs what you expected. Learning to read these diffs quickly is one of the most useful skills in the course.

### The testing loop

Write a function. Write a test. Run it. **Red** means something is wrong. Fix it. **Green** means the contract holds. Refactor freely - the tests catch regressions. This is the loop you'll follow in every exercise.

---

## 3. Function basics - declarations, expressions, arrows

```bash
node module-02-functions/demo/03-function-basics
```

### Declarations, expressions, arrows

Three ways to create a function:

```js
// Declaration - hoisted, available anywhere in the scope
function greetRanger(name) {
  return `Welcome, Ranger ${name}.`;
}

// Expression - assigned to a const, not hoisted
const describeDino = function (dino) {
  return `${dino.name} - ${dino.species}`;
};

// Arrow - compact, no own `this`
const double = (n) => n * 2;
```

Arrows shine for callbacks: short, no curly braces needed for single expressions, and no `this` confusion.

### Default parameters

```js
function formatSighting(name, zone = 'Uncharted', risk = 0) {
  return `${name} @ ${zone} (risk ${risk})`;
}
formatSighting('Compy'); // "Compy @ Uncharted (risk 0)"
```

Defaults fill in when the argument is `undefined`. They keep call sites clean - no need to pass values you rarely change.

### Rest parameters

```js
function logAll(label, ...items) {
  for (const item of items) {
    console.log(`${label}: ${item}`);
  }
}
logAll('Zone', 'North', 'South', 'Ridge');
```

`...items` collects all remaining arguments into a real array. Unlike the legacy `arguments` object, rest params are a proper array - you can `.map()` and `.filter()` them directly.

---

## 4. Filter

```bash
node module-02-functions/demo/04-filter
```

`.filter()` returns a **new array** containing only the elements that pass a test:

```js
const evens = [1, 2, 3, 4, 5, 6].filter((n) => n % 2 === 0);
// [2, 4, 6]
```

The callback (the **predicate**) receives each element. Return `true` to keep it, `false` to drop it.

Filter works on objects too:

```js
const dangerous = dinosaurs.filter((d) => d.dangerLevel > 5);
```

You can combine filter with `.includes()` to find overlap between two arrays:

```js
const shared = zoneA.filter((id) => zoneB.includes(id));
```

The original array is never mutated - `.filter()` always returns a fresh array.

---

## 5. Sort

```bash
node module-02-functions/demo/05-sort
```

`.sort()` orders elements **in place** (it mutates the array). Without a comparator, it sorts **lexicographically** - which gives wrong results for numbers:

```js
[10, 1, 21, 2].sort(); // [1, 10, 2, 21] - wrong!
[10, 1, 21, 2].sort((a, b) => a - b); // [1, 2, 10, 21] - correct
```

The comparator function returns a negative number if `a` should come first, positive if `b` should come first, and zero if they're equal.

Sort objects by a numeric field:

```js
dinos.sort((a, b) => b.dangerLevel - a.dangerLevel); // highest first
```

Sort alphabetically with `.localeCompare()`:

```js
dinos.sort((a, b) => a.species.localeCompare(b.species));
```

**Mutation warning:** If you need to keep the original order, spread first: `[...dinos].sort(...)`.

---

## 6. Map

```bash
node module-02-functions/demo/06-map
```

`.map()` transforms **every element** and returns a new array of the same length:

```js
const doubled = [1, 2, 3].map((n) => n * 2); // [2, 4, 6]
```

Extract a single field from objects:

```js
const names = dinosaurs.map((d) => d.species);
// ['Tyrannosaurus', 'Brachiosaurus', 'Velociraptor']
```

Format objects into strings:

```js
const lines = dinosaurs.map((d) => `${d.species} (${d.zone}) - danger: ${d.dangerLevel}`);
```

Like `.filter()`, `.map()` never mutates the original - it returns a fresh array every time.

---

## 7. Reduce

```bash
node module-02-functions/demo/07-reduce
```

`.reduce()` folds an array down to a **single value** - a number, a string, an object, anything. It takes a callback and an initial value for the **accumulator**:

```js
const total = [3, 7, 2, 8].reduce((acc, n) => acc + n, 0); // 20
```

The accumulator carries state between iterations. After each call, whatever you return becomes the new `acc`.

Group items into an object:

```js
const countByZone = dinos.reduce((acc, d) => {
  acc[d.zone] = (acc[d.zone] ?? 0) + 1;
  return acc;
}, {});
// { North: 2, Lake: 2, South: 1 }
```

Find a maximum:

```js
const mostDangerous = dinos.reduce((best, d) =>
  d.dangerLevel > best.dangerLevel ? d : best,
);
```

**Always pass an initial value.** Without one, `.reduce()` on an empty array throws a `TypeError`.

---

## 8. Pipelines - putting it all together

```bash
node module-02-functions/demo/08-pipelines
```

The real power comes from chaining filter, map, and reduce together:

```js
const carnivorePressure = dinosaurs
  .filter((d) => d.diet === 'carnivore' && d.isActive)
  .map((d) => ({ zone: d.zone, danger: d.dangerLevel }))
  .reduce((acc, row) => {
    acc[row.zone] = (acc[row.zone] ?? 0) + row.danger;
    return acc;
  }, {});
```

Read it top to bottom: filter the data, reshape it, fold it into a summary. Each step returns a new value - no mutation, no side effects.

---

## Exercises

| #   | Folder                                                                | What you'll practice                                                                           |
| --- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 1   | [`exercises/01-function-intro`](exercises/01-function-intro/)         | `function` keyword, parameters, return values                                                  |
| 2   | [`exercises/02-vitest-contract`](exercises/02-vitest-contract/)       | Implement `formatSighting` - template literals and `??` defaults, Vitest guarding the contract |
| 3   | [`exercises/03-arrow-functions`](exercises/03-arrow-functions/)       | Arrow syntax, default params, rest params                                                      |
| 4   | [`exercises/04-filter`](exercises/04-filter/)                         | `.filter()` on numbers and objects                                                             |
| 5   | [`exercises/05-sort`](exercises/05-sort/)                             | `.sort()` with numeric and string comparators                                                  |
| 6   | [`exercises/06-map`](exercises/06-map/)                               | `.map()` to double, extract, format                                                            |
| 7   | [`exercises/07-reduce`](exercises/07-reduce/)                         | `.reduce()` to sum, group, find max                                                            |
| 8   | [`exercises/08-migration-pipeline`](exercises/08-migration-pipeline/) | Full pipeline: filter + map + reduce composed                                                  |

Each exercise has a `starter/` folder. To work on an exercise:

```bash
cd module-02-functions/exercises/<exercise>/starter && pnpm install && pnpm test
```

---

## Slides

Teaching deck: from repo root run `pnpm slides:02`, or `cd slides && pnpm dev`.

## Reference

- [MDN: Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)
- [MDN: Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [MDN: Array.prototype.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [MDN: Array.prototype.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
- [MDN: Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [MDN: Array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
