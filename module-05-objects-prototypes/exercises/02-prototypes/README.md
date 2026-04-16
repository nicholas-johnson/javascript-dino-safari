# Exercise 02 - ES Classes & Inheritance

## The scenario

The park's dinosaur registry needs a clean, modern class hierarchy. You'll use **ES6 classes** — `constructor`, `extends`, `super`, and method overriding — to model dinosaurs and a specialised flying variant.

## What you will build

Both classes live in [`starter/dinosaur.js`](starter/dinosaur.js).

### `Dinosaur`

A class whose constructor accepts `name`, `species`, and `zone`, storing each as an instance property.

Add a `describe()` method that returns:

```
"<name> - <species> @ <zone>"
```

```js
const tank = new Dinosaur('Tank', 'Triceratops', 'Herbivore Meadow');
tank.describe();  // "Tank - Triceratops @ Herbivore Meadow"
tank instanceof Dinosaur;  // true
```

### `FlyingDinosaur`

A subclass of `Dinosaur` that adds a `wingspanM` property. Override `describe()` to append ` - wingspan <wingspanM>m`.

Use `super()` to call the parent constructor and `super.describe()` to reuse the base implementation.

```js
const skyler = new FlyingDinosaur('Skyler', 'Pteranodon', 'Aviary Ascent', 6);
skyler.describe();          // "Skyler - Pteranodon @ Aviary Ascent - wingspan 6m"
skyler instanceof Dinosaur; // true
skyler instanceof FlyingDinosaur; // true
```

## Getting started

Open [`starter/dinosaur.js`](starter/dinosaur.js). The exports are stubbed — replace them. Then run:

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The tests check `describe()` output, `instanceof` for both types, and that `wingspanM` is stored correctly.

## Hints

- Define properties inside `constructor(name, species, zone) { ... }` with `this.name = name`.
- Use `extends` to create the subclass: `class FlyingDinosaur extends Dinosaur`.
- Call the parent constructor with `super(name, species, zone)` — this must come before any `this` access.
- Override `describe()` and call `super.describe()` to get the base string, then append the wingspan.

## Reference solution

[`solution/dinosaur.js`](solution/dinosaur.js)
