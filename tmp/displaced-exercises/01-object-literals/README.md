# Exercise - Object literals & string keys

**Mission briefing:** Plain objects are **string-keyed** maps (plus `Symbol` keys in the full language). Bracket notation **coerces** non-Symbol values to strings, so `obj[1]` and `obj['1']` are the same slot - a form of **coercion** that shows up everywhere in real code.

## Tasks

Implement the exports in [`start.js`](start.js):

- **`createPaddock(code, species, headcount)`** - return an object literal with those three properties.
- **`createTelemetryRow()`** - return `{ 1: 'motion', 2: 'heat' }` using numeric-looking keys in the literal.
- **`toBracketKeyString(value)`** - return the string JavaScript uses as the property name for `obj[value]` when `value` is **not** a `Symbol` (for this course, `String(value)` matches the values we test).
- **`buildCoercedKeyExample()`** - start from `{}`, assign using `[true]`, `[null]`, and `[undefined]`, with values `'bool key'`, `'null key'`, and `'undefined key'`, so `Object.keys` is `['true', 'null', 'undefined']`.
- **`noteSighting(sightingsByZone, zoneId, label)`** - **mutate** the map: ensure `sightingsByZone[zoneId]` is an array and `push` the label (classic associative-array pattern).
- **`forInKeysAreStrings(obj)`** - return whether every key from `for...in` has `typeof key === 'string'` (always `true` for ordinary objects - the point is to observe it).

## Verify

```bash
pnpm vitest run module-04-types-coercion/exercises/01-object-literals/start.test.js
```

Reference: [`solution.js`](solution.js).
