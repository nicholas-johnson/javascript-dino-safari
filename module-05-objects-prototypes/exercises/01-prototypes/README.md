# Exercise - Prototype Safari (no `class`)

**Mission briefing:** The legacy registry uses **constructor functions** and the **prototype chain**. Rebuild `Dinosaur` and `FlyingDinosaur` without `class` syntax.

## Tasks

Edit [`starter/index.js`](starter/index.js):

1. **`Dinosaur(name, species, zone)`** - instances have `describe()` on the prototype returning  
   `"<name> - <species> @ <zone>"`.
2. **`FlyingDinosaur(name, species, zone, wingspanM)`** - inherits from `Dinosaur`, adds `wingspanM`, overrides `describe()` to append ` - wingspan <wingspanM>m`.

Use `Object.create` / `prototype` wiring so `instanceof` works.

## Verify

```bash
cd starter && pnpm install && pnpm test
```

Reference: [`solution/index.js`](solution/index.js).
