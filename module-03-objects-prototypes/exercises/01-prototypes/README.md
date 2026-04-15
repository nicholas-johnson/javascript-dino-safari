# Exercise - Prototype Safari (no `class`)

**Mission briefing:** The legacy registry uses **constructor functions** and the **prototype chain**. Rebuild `Dinosaur` and `FlyingDinosaur` without `class` syntax.

## Tasks

Edit [`start.js`](start.js):

1. **`Dinosaur(name, species, zone)`** - instances have `describe()` on the prototype returning  
   `"<name> - <species> @ <zone>"`.
2. **`FlyingDinosaur(name, species, zone, wingspanM)`** - inherits from `Dinosaur`, adds `wingspanM`, overrides `describe()` to append ` - wingspan <wingspanM>m`.

Use `Object.create` / `prototype` wiring so `instanceof` works.

## Verify

```bash
pnpm vitest run module-03-objects-prototypes/exercises/01-prototypes/start.test.js
```

Reference: [`solution.js`](solution.js).
