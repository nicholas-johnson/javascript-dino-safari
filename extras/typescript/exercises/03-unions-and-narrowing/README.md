# Exercise 03 - Unions & Narrowing

## The goal

A union type means "this value could be one of several types". The challenge is that TypeScript won't let you use type-specific methods until you **narrow** the type — prove which variant you're dealing with using runtime checks like `typeof`, `in`, or a discriminant property.

The functions in `starter/shapes.ts` accept union types but are missing their type annotations and narrowing logic. Your job is to define the types and add the narrowing code so everything compiles.

## Types to define

```ts
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };
```

## Functions to annotate and implement

| Function                        | Takes                    | Returns                                    |
| ------------------------------- | ------------------------ | ------------------------------------------ |
| `area(shape)`                   | a `Shape`                | number — the area of the shape             |
| `describe(shape)`               | a `Shape`                | string like `"circle (r=5)"`               |
| `formatValue(value)`            | `string \| number`       | string — uppercased or fixed to 2 decimals |
| `getLength(value)`              | `string \| any[]`        | number — length of string or array         |
| `summarise(item)`               | `string \| number \| boolean` | string description of the value       |

## What to practise

- Defining discriminated union types (the `kind` pattern)
- Narrowing with `typeof` for primitive unions
- Narrowing with `switch` on a discriminant property
- The `Array.isArray()` type guard

## Getting started

```bash
cd starter && pnpm install
```

Open `shapes.ts`. Define the `Shape` type, annotate each function, and add the narrowing logic. Then check:

```bash
pnpm typecheck
pnpm test
```

### Example — narrowing with `typeof`

```ts
export const formatValue = (value: string | number): string => {
  if (typeof value === 'string') {
    return value.toUpperCase();     // TS knows it's a string here
  }
  return value.toFixed(2);          // TS knows it's a number here
};
```

### Example — narrowing with `switch`

```ts
export const area = (shape: Shape): number => {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    // ...
  }
};
```

## Edge cases to consider

- The `summarise` function takes three possible types — make sure every branch returns a string
- `getLength` takes a string or an array — use `typeof` or `Array.isArray()` to narrow
- The `describe` function should include the shape's key measurements in the output

## Hints

- A discriminated union needs a common literal property (`kind`) that differs between variants
- `switch` on `shape.kind` is the cleanest way to handle discriminated unions
- For `string | number`, `typeof value === 'string'` narrows one branch; the other is automatically `number`
- `Array.isArray(value)` narrows to `any[]` (or the specific array type)

## Reference solution

[`solution/shapes.ts`](solution/shapes.ts)
