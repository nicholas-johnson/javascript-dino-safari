# Extras — TypeScript

## What is TypeScript?

TypeScript is JavaScript with a type system bolted on top. You annotate your variables, function parameters, and return values with types, and the TypeScript compiler checks them *before* the code runs. The result is plain JavaScript — browsers and Node never see your type annotations.

The key idea: **types are erased at runtime**. They exist only to catch mistakes during development. If the code compiles, the types are gone.

---

## Installation

Add TypeScript as a dev dependency:

```bash
pnpm add -D typescript
```

Check that it works:

```bash
npx tsc --version
```

---

## Configuration — `tsconfig.json`

Every TypeScript project needs a `tsconfig.json` in the root. Here's a sensible starting point:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["*.ts"]
}
```

### Key options

| Option              | What it does                                                    |
| ------------------- | --------------------------------------------------------------- |
| `target`            | Which JS version to emit (`ES2022` is a safe modern default)    |
| `module`            | Module system for output (`ES2022` keeps `import`/`export`)     |
| `moduleResolution`  | How to find modules (`bundler` works with Vite and most tools)  |
| `strict`            | Enables all strict type checks — always turn this on            |
| `noEmit`            | Only type-check, don't write `.js` files (Vite handles builds)  |
| `esModuleInterop`   | Fixes default import compatibility with CommonJS modules        |
| `skipLibCheck`      | Skips type-checking `.d.ts` files for faster builds             |

### What does `strict` actually enable?

`strict` is a shorthand for several flags at once:

- `strictNullChecks` — `null` and `undefined` aren't assignable to other types
- `noImplicitAny` — you can't leave off type annotations and get `any` silently
- `strictFunctionTypes` — function parameter types are checked correctly
- `strictPropertyInitialization` — class properties must be assigned in the constructor

You almost always want `strict: true`. Without it, TypeScript lets too many mistakes through.

---

## Basic types

### Primitives

```ts
let name: string = 'Rex';
let age: number = 65_000_000;
let isDangerous: boolean = true;
```

TypeScript can usually **infer** the type from the value, so you don't always need the annotation:

```ts
let name = 'Rex';          // inferred as string
let age = 65_000_000;      // inferred as number
```

Add explicit annotations when the type isn't obvious from context, or when you want to be specific.

### Arrays

```ts
let zones: string[] = ['Meadow', 'Aviary', 'Lagoon'];
let scores: number[] = [10, 20, 30];
```

### Functions

Annotate parameters and return types:

```ts
function add(a: number, b: number): number {
  return a + b;
}

const greet = (name: string): string => `Hello, ${name}`;
```

If a parameter is optional, add `?`:

```ts
function greet(name: string, title?: string): string {
  return title ? `${title} ${name}` : name;
}
```

---

## Interfaces

Interfaces define the shape of an object:

```ts
interface Dinosaur {
  name: string;
  species: string;
  zone: string;
  dangerLevel: number;
}

function describe(dino: Dinosaur): string {
  return `${dino.name} the ${dino.species}`;
}
```

### Optional and readonly properties

```ts
interface ParkConfig {
  name: string;
  maxCapacity?: number;         // optional — may be undefined
  readonly id: string;          // can't be changed after creation
}
```

### Extending interfaces

```ts
interface FlyingDinosaur extends Dinosaur {
  wingspanM: number;
}
```

`FlyingDinosaur` has all the properties of `Dinosaur` plus `wingspanM`.

---

## Type aliases

Type aliases name any type, not just object shapes:

```ts
type ID = string | number;
type StringArray = string[];
type Formatter = (input: string) => string;
```

Interfaces and type aliases overlap for object shapes. Use interfaces for objects you might extend; use type aliases for unions, tuples, and function types.

---

## Union types

A union means "this value could be one of several types":

```ts
function format(value: string | number): string {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value.toFixed(2);
}
```

Inside the `if`, TypeScript **narrows** the type — it knows `value` is a `string` in that branch and a `number` in the `else`.

### Discriminated unions

When objects in a union share a common `kind` or `type` property, TypeScript can narrow by checking it:

```ts
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
  }
}
```

---

## Generics

Generics let you write code that works with any type while keeping type safety:

```ts
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

first([1, 2, 3]);       // returns number | undefined
first(['a', 'b']);       // returns string | undefined
```

`T` is a type parameter — it's filled in automatically when you call the function.

### Constraints

Use `extends` to restrict what `T` can be:

```ts
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength('hello');    // 5
getLength([1, 2, 3]);  // 3
getLength(42);         // Error: number doesn't have .length
```

---

## Utility types

TypeScript includes built-in types that transform other types:

| Type                 | What it does                                          |
| -------------------- | ----------------------------------------------------- |
| `Partial<T>`         | All properties become optional                        |
| `Required<T>`        | All properties become required                        |
| `Readonly<T>`        | All properties become readonly                        |
| `Pick<T, Keys>`      | Only keep the listed properties                       |
| `Omit<T, Keys>`      | Remove the listed properties                          |
| `Record<Keys, Type>` | Object with specified keys, all of the same type      |

```ts
interface Dinosaur {
  name: string;
  species: string;
  zone: string;
}

type DinoUpdate = Partial<Dinosaur>;          // { name?: string; species?: string; zone?: string }
type DinoSummary = Pick<Dinosaur, 'name'>;    // { name: string }
type DinoScores = Record<string, number>;     // { [key: string]: number }
```

---

## Common gotchas

### 1. `any` defeats the purpose

```ts
function process(data: any) {    // no type checking at all
  return data.foo.bar.baz;       // no error, even if this crashes at runtime
}
```

Avoid `any`. If you don't know the type yet, use `unknown` and narrow it.

### 2. `==` vs `===` still matters

TypeScript checks types at compile time, but `==` still does loose coercion at runtime. Always use `===`.

### 3. Types are erased at runtime

You can't do `if (typeof x === 'Dinosaur')` — interfaces don't exist at runtime. Use discriminated unions or `in` checks instead:

```ts
if ('wingspanM' in dino) {
  // TypeScript narrows to FlyingDinosaur
}
```

### 4. `Object` vs `object` vs `{}`

- `object` — any non-primitive (what you usually want)
- `Object` — almost everything (rarely useful)
- `{}` — any non-null, non-undefined value (misleading)

Use specific interfaces or type aliases instead of any of these.

### 5. Forgetting to handle `undefined` from optional properties

```ts
interface Config {
  timeout?: number;
}

function getTimeout(config: Config): number {
  return config.timeout;         // Error: might be undefined
  return config.timeout ?? 5000; // correct: provide a default
}
```

With `strict: true`, TypeScript forces you to handle the `undefined` case.

### 6. Array method return types

```ts
const items = [1, 2, 3];
const found = items.find(x => x > 2);  // number | undefined, NOT number
```

`find` might not find anything. TypeScript reflects this in the return type. You need to handle the `undefined` case.

---

## Type checking

These exercises use Vitest for runtime tests and `tsc` for type checking. Each exercise has two scripts:

```bash
pnpm test          # run vitest — checks runtime behaviour
pnpm typecheck     # run tsc --noEmit — checks types compile
```

Both must pass. The tests verify your code does the right thing; the type checker verifies your annotations are correct.

---

## Exercises

Every exercise gives you **working JavaScript logic** with missing or incorrect type annotations. Your job is to **add the types** so that `tsc` compiles cleanly and all tests pass.

| #  | Exercise                                                        | Focus                                        |
| -- | --------------------------------------------------------------- | -------------------------------------------- |
| 01 | [Type Annotations](exercises/01-type-annotations/)              | Function params, return types, variables     |
| 02 | [Interfaces](exercises/02-interfaces/)                          | Object shapes, optional, readonly, extends   |
| 03 | [Unions & Narrowing](exercises/03-unions-and-narrowing/)         | Union types, type guards, `switch` narrowing |
| 04 | [Generics](exercises/04-generics/)                              | Type parameters, constraints, `keyof`        |
| 05 | [Utility Types](exercises/05-utility-types/)                    | `Partial`, `Pick`, `Omit`, `Record`, `Readonly` |
