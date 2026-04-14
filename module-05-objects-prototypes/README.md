# Module 5 - Objects & Prototypes: How JavaScript Really Does OOP

JavaScript doesn't have classes in the way Java or C# do. It has **prototypes** - a chain of linked objects that share behaviour. The `class` keyword is syntactic sugar over this mechanism. Understanding what's underneath helps you debug `instanceof` surprises, reach for `Map`/`Set` when plain objects fall short, and prefer composition when inheritance trees get tangled.

By the end of this module you should be able to:

- **Trace the prototype chain** and predict property lookup.
- **Use `class` syntax** - `extends`, `super`, getters, statics, private fields - knowing it's sugar over prototypes.
- **Choose `Map` / `Set`** when object keys or uniqueness semantics matter.
- **Prefer composition** for mixed capabilities vs deep inheritance trees.

---

## 1. The prototype chain

```bash
node module-05-objects-prototypes/demo/01-prototype-chain
```

Every object in JavaScript has a hidden link to another object - its **prototype**. When you access a property that doesn't exist on the object itself, JavaScript walks up the chain until it finds it or reaches `null`.

```js
function Dinosaur(species, diet) {
  this.species = species;
  this.diet = diet;
}

Dinosaur.prototype.describe = function () {
  return `${this.species} (${this.diet})`;
};
```

`describe` lives on `Dinosaur.prototype`, not on each instance. Every dinosaur created with `new Dinosaur(...)` shares the same function through the chain.

### Inheritance with `Object.create`

```js
function Theropod(species, lengthM) {
  Dinosaur.call(this, species, 'carnivore');
  this.lengthM = lengthM;
}

Theropod.prototype = Object.create(Dinosaur.prototype);
Theropod.prototype.constructor = Theropod;
```

`Object.create(Dinosaur.prototype)` creates a new object whose prototype is `Dinosaur.prototype`. Now `Theropod` instances can reach `describe` by walking: `rex` → `Theropod.prototype` → `Dinosaur.prototype`.

`instanceof` checks this chain - `rex instanceof Dinosaur` is `true` because `Dinosaur.prototype` appears somewhere in the chain above `rex`.

---

## 2. Classes - sugar over prototypes

```bash
node module-05-objects-prototypes/demo/02-classes
```

The same hierarchy, rewritten with `class`:

```js
class Dinosaur {
  constructor(name, species, zone) {
    this.name = name;
    this.species = species;
    this.zone = zone;
  }

  describe() {
    return `${this.name} - ${this.species} @ ${this.zone}`;
  }
}

class FlyingDinosaur extends Dinosaur {
  constructor(name, species, zone, wingspanM) {
    super(name, species, zone);
    this.wingspanM = wingspanM;
  }

  describe() {
    return `${super.describe()} - wingspan ${this.wingspanM}m`;
  }
}
```

Under the hood, `class` still creates a constructor function and sets up `prototype`. `typeof Dinosaur` is `"function"`. `extends` wires the chain with `Object.create`. `super()` calls the parent constructor.

### Getters and private fields

```js
class Paddock {
  #residents = [];

  add(dino) {
    this.#residents.push(dino);
  }
  get headcount() {
    return this.#residents.length;
  }
  get isEmpty() {
    return this.#residents.length === 0;
  }
}
```

`#residents` is truly private - code outside the class cannot access it. `get headcount` creates a property you read like data (`paddock.headcount`) but computes on access.

### Static methods

```js
class DinoUtils {
  static isDangerous(dino) {
    return ['Tyrannosaurus', 'Velociraptor'].includes(dino.species);
  }
}
DinoUtils.isDangerous(rex); // called on the class, not an instance
```

---

## 3. Map and Set

```bash
node module-05-objects-prototypes/demo/03-maps-and-sets
```

### When plain objects aren't enough

Plain objects use **string keys** (or Symbols). If you need keys of any type, ordered iteration, or frequent add/delete, reach for `Map`:

```js
const zoneToDinos = new Map();

zoneToDinos.set('Cretaceous Valley', ['Rex', 'Chomper']);
zoneToDinos.set('Herbivore Meadow', ['Tank']);

zoneToDinos.get('Cretaceous Valley'); // ['Rex', 'Chomper']
zoneToDinos.has('Lagoon'); // false
zoneToDinos.size; // 2
```

### Set for uniqueness

`Set` stores unique values. Adding a duplicate is silently ignored:

```js
const speciesTags = new Set();
speciesTags.add('Tyrannosaurus');
speciesTags.add('Allosaurus');
speciesTags.add('Tyrannosaurus'); // ignored - already present
speciesTags.size; // 2
```

Combine them: `Map` for id→record lookups, `Set` for "have we seen this species before?"

---

## 4. Composition over inheritance

```bash
node module-05-objects-prototypes/demo/04-composition
node module-05-objects-prototypes/demo/05-composition-destructuring
```

Deep inheritance trees get brittle. What if you need a dinosaur that can swim AND fly AND has armor? With inheritance you'd need `SwimmingFlyingArmoredDinosaur extends ...` - a combinatorial nightmare.

Composition mixes small capability objects with spread:

```js
const canRoar = (state) => ({
  roar() {
    return `${state.name} ROARS (${state.volume}dB)`;
  },
});

const canFly = (state) => ({
  fly() {
    return `${state.name} lifts off - wingspan ${state.wingspanM}m`;
  },
});

function createPterosaur(name) {
  const state = { name, wingspanM: 6, volume: 110 };
  return { ...state, ...canRoar(state), ...canFly(state) };
}
```

Need swim too? Just add `...canSwim(state)`. No class hierarchy changes. Each capability is independent and testable.

### Factory arguments with destructuring

Demo 05 shows a common production pattern - destructuring the options object:

```js
function createRanger({ name, callsign, zone }) {
  const state = { name, callsign, zone };
  return { ...state, ...withCallsign(state), ...withPatrol(state) };
}

const ellie = createRanger({
  name: 'Ellie Sattler',
  callsign: 'R-NORTH',
  zone: 'Paddock',
});
const { name, zone } = ellie; // pull data back out
```

---

## Exercises

| #   | Folder                                                    | What you'll practice                                                                    |
| --- | --------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1   | [`01-prototypes`](exercises/01-prototypes/)               | Build `Dinosaur` / `FlyingDinosaur` with constructors and `Object.create` - no `class`. |
| 2   | [`02-map-and-set`](exercises/02-map-and-set/)             | `createDinoRegistry` with `Map` + `Set`: add, get, findByZone, sorted unique species.   |
| 3   | [`03-mixin-composition`](exercises/03-mixin-composition/) | `withSwim`, `withFly`, `withArmor` - spread composition, no mutation.                   |

Run tests:

```bash
cd module-05-objects-prototypes/exercises/<exercise>/starter && pnpm install && pnpm test
```

---

## Slides

Teaching deck: from repo root run `pnpm slides:05`, or `cd slides && pnpm dev`.

## Reference

- [MDN: Inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [MDN: Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [MDN: Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [MDN: Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
