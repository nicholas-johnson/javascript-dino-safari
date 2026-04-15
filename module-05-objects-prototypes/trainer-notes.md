# Module 5 - Objects & Prototypes: Trainer Notes

## Goal

Students understand how JavaScript objects really work: the prototype chain, `class` as sugar, when to reach for `Map`/`Set`, and why composition often beats deep inheritance.

## Demo walkthrough

### 01 - Object literals and `this`

- Build a `feeder` object literal live with properties and methods.
- Show `this` inside a method refers to the object before the dot.
- Copy the same function to another object - `this` changes. This is the key insight.
- Extract a method to a variable - `this` is lost. Show the error. Mention `.bind()` as a fix.
- Show shorthand property names and computed keys as a bonus.

### 02 - Prototype chain

- Build `Dinosaur` and `Theropod` constructors live. Show `Object.create` wiring the chain.
- Ask: "What happens if you call `rex.toString()`? Where does it come from?" (walks up to `Object.prototype`.)
- Draw the chain on a whiteboard: `rex` → `Theropod.prototype` → `Dinosaur.prototype` → `Object.prototype` → `null`.
- Show `instanceof` - it checks the chain, not a label.

### 03 - Classes

- Same hierarchy rewritten with `class`. Side-by-side with demo 02 if projector allows.
- Point out `typeof Dinosaur` is `"function"` - classes are syntactic sugar, not a new mechanism.
- Show `extends` and `super()`. Then getters (`get headcount`), private fields (`#residents`), and static methods.
- Ask: "Would you use `class` or the prototype version in new code?" (Almost always `class` - but knowing what it desugars to helps debugging.)

### 04 - Maps and Sets

- Build a zone registry with `Map`. Show non-string keys, `.has()`, `.size`, iteration order.
- Show `Set` for deduping species tags. Combine: Map for id→record, Set for "seen species."
- Contrast with plain objects: prototype pollution, keys always strings, no `.size`.

### 05 - Composition (simple)

- `canRoar` and `canFly` as mixin factories. Spread into a new object.
- Ask: "What if we need swim AND fly AND armor?" Show the spread approach scales flat.
- Caution: spread is shallow. Nested objects are shared references (reinforce Module 3 immutability lesson).

### 06 - Composition with destructuring

- Factory that takes a destructured options object. Show renaming, defaults, nested destructuring.
- Pull properties back out of the composed object. This is a common API pattern.
- Keep this brief - it's a refinement of demo 05, not a new concept.

## Exercises

| #   | Folder                 | Key skills                                     | Notes                                                              |
| --- | ---------------------- | ---------------------------------------------- | ------------------------------------------------------------------ |
| 1   | `01-dino-feeder`       | Object literal methods, `this` keyword         | Plain object with methods - state as properties, `this` to access. |
| 2   | `02-prototypes`        | Prototype chain, `Object.create`, `instanceof` | Deliberately no `class` - cements the mental model.                |
| 3   | `03-mixin-composition` | Spread, composition, no mutation               | `withSwim`, `withFly`, `withArmor` - input must not be mutated.    |

## Timing

- Demo 01 (object literals / `this`): ~10 min.
- Demo 02 (prototype chain): ~15 min.
- Demo 03 (classes): ~15 min.
- Demo 04 (Map/Set): ~10 min.
- Demo 05 + 06 (composition): ~15 min total.
- Exercises: ~30–40 min for all three.
- Total: ~1.5–2 hours.

## Common issues

- **Forgetting `Object.create` in prototype wiring**: students set `Child.prototype = Parent.prototype` directly - now changes to Child.prototype affect Parent.
- **Missing `constructor` reset**: after `Child.prototype = Object.create(Parent.prototype)`, `constructor` points to `Parent`. Set it back.
- **`this` confusion**: if students extract a method, `this` is lost. Demo 01 covers this explicitly - reinforce during exercises.
- **Set has no index access**: `set[0]` doesn't work. Use spread or `.values()` to convert.
- **Mixin spread order matters**: later spreads overwrite earlier keys. If two mixins add the same method name, last wins silently.
