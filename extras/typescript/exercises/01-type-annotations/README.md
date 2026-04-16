# Exercise 01 - Type Annotations

## The goal

This is the starting point for TypeScript — annotating function parameters, return types, and variables. The functions in `starter/math.ts` work correctly at runtime but have no type annotations. Your job is to add types so that `tsc` compiles cleanly.

When you're done, every parameter, return type, and variable should have an explicit annotation. TypeScript can infer most of these, but writing them out explicitly is the best way to build the habit.

## Functions to annotate

| Function                    | Parameters             | Returns                          |
| --------------------------- | ---------------------- | -------------------------------- |
| `add(a, b)`                 | two numbers            | number                           |
| `greet(name)`               | a string               | string                           |
| `isAdult(age)`              | a number               | boolean                          |
| `repeat(str, times)`        | a string and a number  | string                           |
| `head(arr)`                 | an array of numbers    | `number \| undefined`            |
| `sum(numbers)`              | an array of numbers    | number                           |
| `formatDino(name, species)` | two strings            | string                           |

## What to practise

- Basic types: `string`, `number`, `boolean`
- Array types: `number[]`, `string[]`
- Union return types: `number | undefined`
- Annotating both arrow functions and function declarations

## Getting started

```bash
cd starter && pnpm install
```

Open `math.ts`. Every function has `// TODO` comments where annotations are needed. Add the types, then check your work two ways:

```bash
pnpm typecheck    # tsc --noEmit — do the types compile?
pnpm test         # vitest — does the runtime behaviour match?
```

### Example

Before:

```ts
export const add = (a, b) => a + b;
```

After:

```ts
export const add = (a: number, b: number): number => a + b;
```

## Edge cases to consider

- `head` returns `undefined` when the array is empty — the return type must be `number | undefined`, not just `number`
- `repeat` takes a `number` for the count — make sure it's not typed as `string`

## Hints

- Start with the simplest functions (`add`, `greet`) and work your way down
- If `tsc` gives you an error like "Parameter 'a' implicitly has an 'any' type", that's the function you need to annotate next
- The return type annotation goes after the parameter list: `(a: number): number =>`

## Reference solution

[`solution/math.ts`](solution/math.ts)
