# Exercise 04 - Generics

## The goal

Without generics, you'd have to write separate functions for `firstNumber`, `firstString`, `firstDinosaur`... or give up and use `any`. Generics let you write **one** function that works with any type while keeping full type safety.

The functions in `starter/collections.ts` work with arrays and objects of any type, but they're currently untyped. Your job is to add generic type parameters so TypeScript knows the return type matches the input type.

## Functions to annotate

| Function                        | Takes                                     | Returns                            |
| ------------------------------- | ----------------------------------------- | ---------------------------------- |
| `identity(value)`               | any single value                          | the same value, same type          |
| `wrapInArray(value)`            | any single value                          | `[value]` — a one-element array    |
| `first(arr)`                    | an array of any type                      | first element or `undefined`       |
| `last(arr)`                     | an array of any type                      | last element or `undefined`        |
| `mapArray(arr, fn)`             | an array and a transform function         | transformed array                  |
| `filterArray(arr, fn)`          | an array and a predicate function         | filtered array                     |
| `merge(a, b)`                   | two objects                               | merged object (`a & b`)            |
| `lookup(obj, key)`              | an object and one of its keys             | the value at that key              |

## What to practise

- Type parameters: `<T>`, `<T, U>`
- Return types that depend on input types
- `extends` constraints: `<T extends object>`
- `keyof` and indexed access types: `<T, K extends keyof T>`

## Getting started

```bash
cd starter && pnpm install
```

Open `collections.ts`. Add generic type parameters to each function. Then check:

```bash
pnpm typecheck
pnpm test
```

### Example — single type parameter

```ts
export const identity = <T>(value: T): T => value;
```

Now `identity(5)` returns `number` and `identity('hello')` returns `string` — automatically.

### Example — two type parameters

```ts
export const mapArray = <T, U>(arr: T[], fn: (item: T) => U): U[] =>
  arr.map(fn);
```

`T` is the input element type, `U` is the output element type.

### Example — `keyof` constraint

```ts
export const lookup = <T, K extends keyof T>(obj: T, key: K): T[K] =>
  obj[key];
```

`K` is constrained to only the keys that exist on `T`. `T[K]` is the type of the value at that key.

## Edge cases to consider

- `first` and `last` must return `T | undefined` because the array might be empty
- `merge` should accept any two objects — use `<T extends object, U extends object>`
- `lookup` should only accept keys that exist on the object — TypeScript should reject `lookup({ a: 1 }, 'b')`

## Hints

- Start with `identity` (one type parameter, simplest possible)
- Work up to `lookup` (two type parameters with constraints)
- If you see "implicitly has type 'any'", you need a type parameter
- The constraint `K extends keyof T` means "K must be one of the keys of T"

## Reference solution

[`solution/collections.ts`](solution/collections.ts)
