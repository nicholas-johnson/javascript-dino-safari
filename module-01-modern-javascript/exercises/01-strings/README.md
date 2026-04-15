# Exercise 01 - String manipulation

## The scenario

Every tracking system in the park outputs raw text - sensor tags, ranger names, zone identifiers. Before any of it reaches the dashboard it needs cleaning up: shouting alerts in uppercase, whispering all-clears, formatting asset tags, searching for keywords, and pulling initials from personnel names.

You'll build five small string utility functions that could sit behind a real park console.

## What you will build

All functions live in [`starter/strings.js`](starter/strings.js).

| Function                  | Description                                                                                     | Example                                                           |
| ------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `shout(str)`              | Uppercase the string and append `!`                                                             | `shout('hello')` → `'HELLO!'`                                     |
| `whisper(str)`            | Lowercase the string and wrap in parentheses                                                    | `whisper('DANGER')` → `'(danger)'`                                |
| `formatTag(id, zone)`     | Return `"[id] zone"` using a template literal                                                   | `formatTag('TRX-001', 'North Ridge')` → `'[TRX-001] North Ridge'` |
| `containsWord(str, word)` | Return `true` if `str` includes `word`                                                          | `containsWord('Rex spotted', 'Rex')` → `true`                     |
| `initials(fullName)`      | Split on spaces, take the first character of each part, uppercase, join with dots, trailing dot | `initials('Ellie Sattler')` → `'E.S.'`                            |

## Getting started

Open [`starter/strings.js`](starter/strings.js). Each function is stubbed with the right signature - replace the body. Then run `starter/index.js` to see the results:

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The tests check normal input, mixed case, and multi-word names (including three-part names like `'Ian Malcolm Jr'` → `'I.M.J.'`).

## Hints

- `.toUpperCase()`, `.toLowerCase()`, `.includes()` are your main tools.
- Template literals (`` `[${id}] ${zone}` ``) make formatting cleaner than concatenation.
- For `initials`, `.split(' ')` gives you an array of name parts, then `.map()` and `.join('.')` do the rest.

## Reference solution

[`solution/strings.js`](solution/strings.js)
