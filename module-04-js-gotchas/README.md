# Module 4 - JS Gotchas: the Weird Parts That Bite

JavaScript has opinions. Values silently coerce, equality has three flavours, `typeof null` returns `"object"`, and `0.1 + 0.2 !== 0.3`. This module is a guided tour of the traps that catch every team eventually - and the patterns that keep you safe.

By the end of this module you should be able to:

- **Predict** how `+`, `==`, and `if (…)` behave when types are mixed.
- **List the eight falsy values** and know why `[]` and `""` surprise people.
- **Choose** between `||` and `??` for defaults; know when each one bites.
- **Use `===` by default**, `== null` deliberately, and `Object.is` when you need it.
- **Handle `NaN`, `Infinity`, `-0`**, and IEEE float weirdness.
- **Validate and convert numbers** at the boundary - never trust raw input.

---

## 1. Coercion traps

```bash
node module-04-js-gotchas/demo/01-coercion-traps
```

JavaScript silently converts values when you mix types in an expression. Sometimes the result makes sense. Often it doesn't.

```js
'5' + 3; // "53" - string wins, + concatenates
'5' - 3; // 2    - - is only numeric, so the string is coerced
```

The rules are: `+` prefers strings (if either side is a string, it concatenates), while `-`, `*`, `/` always coerce to numbers.

Things get stranger with loose equality:

```js
null == undefined   // true  - they are "loosely equal" by spec
null === undefined  // false - different types
[] == false         // true  - [] coerces to "", then to 0; false coerces to 0
Boolean([])         // true  - an array is truthy!
```

The last two together are the classic gotcha: `[]` is truthy in an `if`, but `[] == false` is `true`. The takeaway: avoid `==` with booleans. Use explicit checks.

---

## 2. Truthy, falsy, and defaults

```bash
node module-04-js-gotchas/demo/02-truthy-falsy
```

### The eight falsy values

Every value in JavaScript is either **truthy** or **falsy** when used in a boolean context (`if`, `&&`, `||`, `!`). Exactly eight values are falsy:

```js
(false, 0, -0, 0n, '', null, undefined, NaN);
```

Everything else is truthy - including `[]`, `{}`, `"0"`, and `"false"`.

### The `||` trap

`||` returns the first truthy operand. That sounds useful for defaults, but it replaces _all_ falsy values - including valid ones like `0` and `""`:

```js
const timeout = config.timeout || 5000;
// If timeout is 0, this returns 5000 - oops, 0 was a valid timeout!

const zone = name || 'Unknown';
// If name is "", this returns "Unknown" - but "" might be a valid zone name.
```

### `??` to the rescue

`??` (nullish coalescing) only replaces `null` and `undefined`:

```js
const timeout = config.timeout ?? 5000;
// 0 → 0 (kept), null → 5000 (defaulted), undefined → 5000

const zone = name ?? 'Unknown';
// "" → "" (kept), null → "Unknown"
```

**Rule:** use `??` for defaults unless you genuinely want to replace all falsy values.

### The `!!` double-bang

`!!value` coerces any value to a boolean. It's a common idiom but can mask intent. Prefer explicit checks like `value !== null && value !== undefined` when the meaning matters.

---

## 3. Number gotchas

```bash
node module-04-js-gotchas/demo/03-number-gotchas
```

### IEEE floats

JavaScript numbers are 64-bit IEEE 754 floats. That means:

```js
0.1 + 0.2 === 0.3; // false - the result is 0.30000000000000004
```

This is not a JavaScript bug - it's how binary floating point works in every language. The fix for money: **work in integer cents**.

```js
function dollarsToCents(n) {
  return Math.round(n * 100);
}
// Sum cents, not dollars. Format to dollars only at the display edge.
```

### NaN

`NaN` is the result of invalid arithmetic (e.g. `0 / 0`, `Number("hello")`). It has two quirks:

```js
NaN === NaN; // false - the only JS value not equal to itself
typeof NaN; // "number" - NaN is technically a number
```

Use `Number.isNaN(x)` to check for it. The global `isNaN(x)` coerces first and gives false positives:

```js
isNaN('hello'); // true - it coerces "hello" to NaN, then checks
Number.isNaN('hello'); // false - "hello" is a string, not NaN
```

### `parseInt` hazards

```js
parseInt('12abc'); // 12 - it stops at the first non-digit and returns what it has
parseInt('08'); // 8 in modern engines, but historically 0 (octal). Always pass the radix.
```

---

## 4. Edge cases - typeof, -0, Object.is

```bash
node module-04-js-gotchas/demo/04-edge-cases
```

### `typeof` lies twice

```js
typeof null; // "object" - a famous bug from JavaScript's first implementation
typeof []; // "object" - arrays are objects under the hood
typeof NaN; // "number"
```

To check for `null`, use `=== null`. To check for arrays, use `Array.isArray()`.

### Negative zero

```js
-0 === 0; // true - strict equality says they're the same
Object.is(-0, 0); // false - Object.is knows the difference
1 / -0; // -Infinity - reveals the sign
String(-0); // "0" - toString hides it
```

### `Object.is` - the third equality

- `===` is the default. No coercion, type + value match.
- `== null` is the deliberate exception: catches both `null` and `undefined` in one check.
- `Object.is` handles the two cases `===` gets wrong: `NaN === NaN` (false, should be true) and `0 === -0` (true, should be false).

Use `===` by default. Use `Object.is` when debugging weird math or when your API contract requires distinguishing `+0` from `-0`.

---

## Exercises - Bug Hunt

Each exercise is a set of small functions with **subtle bugs** caused by JS gotchas. The tests describe the correct behaviour. Run them, read the failures, and fix the code.

| #   | Folder                                                          | Theme                                                                                   |
| --- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1   | [`exercises/01-bugfix-coercion`](exercises/01-bugfix-coercion/) | Coercion & truthiness: `!val` vs null check, `\|\|` vs `??`, `==` traps                 |
| 2   | [`exercises/02-bugfix-equality`](exercises/02-bugfix-equality/) | Equality & typeof: `=== null` vs `== null`, `typeof` quirks, `NaN`, `Object.is`         |
| 3   | [`exercises/03-bugfix-numbers`](exercises/03-bugfix-numbers/)   | Numbers & money: float drift, `parseInt` hazards, `isNaN` vs `Number.isNaN`, `.toFixed` |

Run all module tests:

```bash
cd module-04-js-gotchas/exercises/<exercise>/starter && pnpm install && pnpm test
```

---

## Slides

Teaching deck: from repo root run `pnpm slides:04`, or `cd slides && pnpm dev`.

## Reference

- [MDN: Equality comparisons](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
- [MDN: Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
- [MDN: Nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
- [MDN: Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)
