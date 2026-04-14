# Module 5 - Objects & Prototypes: Trainer Notes

## Goal

Students understand how JavaScript objects really work: the prototype chain, `class` as sugar, when to reach for `Map`/`Set`, and why composition often beats deep inheritance.

## Demo walkthrough

### 01 - Prototype chain

- Build `Dinosaur` and `Theropod` constructors live. Show `Object.create` wiring the chain.
- Ask: "What happens if you call `rex.toString()`? Where does it come from?" (walks up to `Object.prototype`.)
- Draw the chain on a whiteboard: `rex` → `Theropod.prototype` → `Dinosaur.prototype` → `Object.prototype` → `null`.
- Show `instanceof` - it checks the chain, not a label.

### 02 - Classes

- Same hierarchy rewritten with `class`. Side-by-side with demo 01 if projector allows.
- Point out `typeof Dinosaur` is `"function"` - classes are syntactic sugar, not a new mechanism.
- Show `extends` and `super()`. Then getters (`get headcount`), private fields (`#residents`), and static methods.
- Ask: "Would you use `class` or the prototype version in new code?" (Almost always `class` - but knowing what it desugars to helps debugging.)

### 03 - Maps and Sets

- Build a zone registry with `Map`. Show non-string keys, `.has()`, `.size`, iteration order.
- Show `Set` for deduping species tags. Combine: Map for id→record, Set for "seen species."
- Contrast with plain objects: prototype pollution, keys always strings, no `.size`.

### 04 - Composition (simple)

- `canRoar` and `canFly` as mixin factories. Spread into a new object.
- Ask: "What if we need swim AND fly AND armor?" Show the spread approach scales flat - no class diamond.
- Caution: spread is shallow. Nested objects are shared references (reinforce Module 3 immutability lesson).

### 05 - Composition with destructuring

- Factory that takes a destructured options object. Show renaming, defaults, nested destructuring.
- Pull properties back out of the composed object. This is a common API pattern.
- Keep this brief - it's a refinement of demo 04, not a new concept.

## Exercises

| #   | Folder                 | Key skills                                     | Notes                                                                |
| --- | ---------------------- | ---------------------------------------------- | -------------------------------------------------------------------- |
| 1   | `01-prototypes`        | Prototype chain, `Object.create`, `instanceof` | Deliberately no `class` - cements the mental model.                  |
| 2   | `02-map-and-set`       | `Map`, `Set`, iteration, uniqueness            | `createDinoRegistry` with `add`, `get`, `findByZone`, `listSpecies`. |
| 3   | `03-mixin-composition` | Spread, composition, no mutation               | `withSwim`, `withFly`, `withArmor` - input must not be mutated.      |

## Timing

- Demo 01 (prototype chain): ~15 min.
- Demo 02 (classes): ~15 min.
- Demo 03 (Map/Set): ~10 min.
- Demo 04 + 05 (composition): ~15 min total.
- Exercises: ~30–40 min for all three.
- Total: ~1.5–2 hours.

## Common issues

- **Forgetting `Object.create` in prototype wiring**: students set `Child.prototype = Parent.prototype` directly - now changes to Child.prototype affect Parent.
- **Missing `constructor` reset**: after `Child.prototype = Object.create(Parent.prototype)`, `constructor` points to `Parent`. Set it back.
- **`this` confusion in class methods**: if students extract a method from an instance, `this` is lost. Brief mention - not the focus of this module.
- **Set has no index access**: `set[0]` doesn't work. Use spread or `.values()` to convert.
- **Mixin spread order matters**: later spreads overwrite earlier keys. If two mixins add the same method name, last wins silently.
