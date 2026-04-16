# Exercise 05 - Utility Types

## The goal

TypeScript ships with built-in utility types that transform existing types into new ones. Instead of defining `DinoUpdate` with every property marked optional by hand, you write `Partial<Dinosaur>`. These utilities are composable, concise, and show up constantly in real codebases.

The functions in `starter/park.ts` manage a dinosaur park's data. They need type annotations that use utility types. Your job is to define the base interface and annotate each function with the right utility type.

## Base interface

```ts
interface Dinosaur {
  name: string;
  species: string;
  zone: string;
  dangerLevel: number;
}
```

## Functions to annotate

| Function                         | Takes / Returns                                         | Utility type to use                    |
| -------------------------------- | ------------------------------------------------------- | -------------------------------------- |
| `updateDino(original, updates)`  | A `Dinosaur` and partial updates, returns `Dinosaur`    | `Partial<Dinosaur>`                    |
| `getDinoSummary(dino)`           | A `Dinosaur`, returns just `name` and `species`         | `Pick<Dinosaur, 'name' \| 'species'>` |
| `getPublicInfo(dino)`            | A `Dinosaur`, returns everything except `dangerLevel`   | `Omit<Dinosaur, 'dangerLevel'>`       |
| `createScoreboard(names, score)` | An array of names and a score, returns a scores object  | `Record<string, number>`              |
| `freezeConfig(config)`           | A config object, returns a readonly version             | `Readonly<T>`                          |
| `withDefaults(partial)`          | A partial dino, returns a complete `Dinosaur`           | `Partial<Dinosaur>` input, `Dinosaur` output |

## What to practise

- `Partial<T>` — all properties become optional
- `Pick<T, Keys>` — keep only the listed properties
- `Omit<T, Keys>` — remove the listed properties
- `Record<Keys, Type>` — object with specified keys all of the same type
- `Readonly<T>` — all properties become readonly
- Combining utility types with generics

## Getting started

```bash
cd starter && pnpm install
```

Open `park.ts`. Define the `Dinosaur` interface, then annotate each function using the appropriate utility type:

```bash
pnpm typecheck
pnpm test
```

### Example — `Partial`

```ts
export const updateDino = (
  original: Dinosaur,
  updates: Partial<Dinosaur>,
): Dinosaur => ({ ...original, ...updates });
```

`Partial<Dinosaur>` makes every property optional, so you can pass `{ zone: 'New Zone' }` without providing `name`, `species`, or `dangerLevel`.

### Example — `Pick`

```ts
export const getDinoSummary = (
  dino: Dinosaur,
): Pick<Dinosaur, 'name' | 'species'> => ({
  name: dino.name,
  species: dino.species,
});
```

## Edge cases to consider

- `updateDino` with an empty updates object should return the original unchanged
- `createScoreboard` with an empty names array should return `{}`
- `withDefaults` must fill in every missing property — think about what sensible defaults look like
- `freezeConfig` should work with any object type (make it generic)

## Hints

- You can combine utility types: `Readonly<Pick<Dinosaur, 'name'>>` is valid
- `Record<string, number>` is an object where every key is a string and every value is a number
- For `freezeConfig`, use a generic: `<T extends object>(config: T): Readonly<T>`
- `Partial<Dinosaur>` means every property is `string | undefined` or `number | undefined`

## Reference solution

[`solution/park.ts`](solution/park.ts)
