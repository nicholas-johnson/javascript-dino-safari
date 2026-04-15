# Exercise 03 - Currying: dino data helpers

## The scenario

Park analysts spend a lot of time writing tiny arrow functions inside `.filter()` and `.map()` calls - things like `d => d.dangerLevel > 3` or `d => d.name`. These one-off functions are fine, but they don't compose well and they repeat the same logic in slightly different forms all over the codebase.

You'll build a small **curried utility library** that turns common two-argument operations into reusable, composable building blocks. Once curried, a function like `gt(3)` slots directly into a `.filter()` call with no wrapper arrow needed.

## What you will build

### 1. `curry(fn)` - in [`starter/curry.js`](starter/curry.js)

A helper that takes a **two-argument** function and returns its curried form:

```js
const add = curry((a, b) => a + b);

add(1)(2); // 3
typeof add(1); // 'function' - first call returns a function waiting for b
```

- `curry(f)(a)(b)` must equal `f(a, b)`.
- You only need to handle two-argument functions.

### 2. `gt(threshold)(value)` - in [`starter/gt.js`](starter/gt.js)

A curried **greater-than** comparator built using your `curry` function:

```js
gt(3)(5); // true  - 5 > 3
gt(3)(3); // false - 3 is not greater than 3
gt(3)(1); // false

// Plugs straight into filter:
[1, 2, 4, 5].filter(gt(3)); // [4, 5]
```

- Import and use `curry` from `./curry.js`.

### 3. `prop(key)(obj)` - in [`starter/prop.js`](starter/prop.js)

A curried **property accessor** built using your `curry` function:

```js
prop('name')({ name: 'Rex' }); // 'Rex'

// Plugs straight into map:
[{ name: 'Rex' }, { name: 'Blue' }].map(prop('name')); // ['Rex', 'Blue']
```

- Import and use `curry` from `./curry.js`.

## Getting started

Open the three stub files in `starter/`. Each already imports what it needs and has a placeholder body - replace the `// TODO` comments with your implementation. Then run `starter/index.js` to see the helpers used with real dino data:

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The test suite has 8 tests covering direct calls, return types, and real-world usage with `.filter()` and `.map()`.

## Hints

- `curry` is just a function that returns a function that returns the result of calling the original - three levels of nesting, one line of logic.
- For `gt` and `prop`, the entire implementation is a single `curry(...)` call wrapping a two-argument function.

## Reference solution

[`solution/`](solution/)
