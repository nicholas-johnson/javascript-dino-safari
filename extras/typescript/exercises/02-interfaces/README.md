# Exercise 02 - Interfaces

## The goal

Interfaces describe the shape of objects — what properties they have and what types those properties are. Once you define an interface, TypeScript enforces it everywhere: you can't pass an object that's missing a required property, and you can't add properties that aren't in the interface.

The functions in `starter/dinos.ts` work with dinosaur objects but have no interfaces defined. Your job is to define the interfaces and annotate the functions.

## What to build

### Interfaces

| Interface        | Properties                                                                  |
| ---------------- | --------------------------------------------------------------------------- |
| `Dinosaur`       | `name: string`, `species: string`, `zone: string`, `dangerLevel: number`   |
| `FlyingDinosaur` | Everything in `Dinosaur` plus `wingspanM: number` (use `extends`)          |
| `ParkConfig`     | `name: string`, `readonly id: string`, `maxCapacity?: number`              |

### Functions to annotate

| Function                       | Takes                     | Returns                              |
| ------------------------------ | ------------------------- | ------------------------------------ |
| `describeDino(dino)`           | a `Dinosaur`              | string: `"<name> the <species>"`     |
| `isDangerous(dino)`            | a `Dinosaur`              | `true` if `dangerLevel >= 5`         |
| `createDino(name, species, zone, dangerLevel)` | four primitives | a `Dinosaur` object       |
| `describeFlyer(dino)`          | a `FlyingDinosaur`        | string including wingspan            |
| `getParkSummary(config)`       | a `ParkConfig`            | string summary of the park           |

## What to practise

- Defining interfaces with required and optional properties
- `readonly` properties
- Extending interfaces with `extends`
- Using interfaces as parameter and return types

## Getting started

```bash
cd starter && pnpm install
```

Open `dinos.ts`. Define the interfaces at the top, then annotate each function. Check your work:

```bash
pnpm typecheck    # types compile?
pnpm test         # runtime correct?
```

### Example

```ts
interface Dinosaur {
  name: string;
  species: string;
  zone: string;
  dangerLevel: number;
}

export const describeDino = (dino: Dinosaur): string =>
  `${dino.name} the ${dino.species}`;
```

## Edge cases to consider

- `ParkConfig.maxCapacity` is optional — `getParkSummary` must handle the case where it's missing
- `ParkConfig.id` is `readonly` — your code should never try to reassign it
- `FlyingDinosaur` should extend `Dinosaur`, not duplicate its properties

## Hints

- Define all three interfaces before annotating any functions
- `extends` works like class inheritance: `interface FlyingDinosaur extends Dinosaur { ... }`
- For optional properties, use `config.maxCapacity ?? 'unlimited'` to provide a default

## Reference solution

[`solution/dinos.ts`](solution/dinos.ts)
