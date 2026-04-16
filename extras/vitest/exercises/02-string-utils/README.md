# Exercise 02 - String Utilities

## The goal

Strings are everywhere in real applications — slugifying URLs, truncating preview text, converting between naming conventions. The functions in this exercise are small, but they have more edge cases than you might expect. Empty strings, single characters, extra whitespace, and exact boundary lengths all need thought.

You are given a collection of string helpers in `starter/strings.js`. Write thorough tests in `starter/strings.test.js`.

## Functions to test

| Function                  | Returns                                                  |
| ------------------------- | -------------------------------------------------------- |
| `capitalize(str)`         | String with the first character uppercased               |
| `slugify(str)`            | Lowercased, spaces replaced with hyphens, non-word chars removed |
| `truncate(str, max)`      | String cut to `max` length with `…` appended if trimmed  |
| `countWords(str)`         | Number of whitespace-separated words                     |
| `reverse(str)`            | Characters in reverse order                              |
| `isPalindrome(str)`       | `true` if the string reads the same forwards and backwards (case-insensitive) |
| `camelToKebab(str)`       | camelCase converted to kebab-case                        |

## What to practise

- `toBe` for string comparisons
- `toMatch` for regex patterns
- Testing empty strings and single characters
- Boundary conditions (string exactly at `max` length, one word, etc.)

## Getting started

```bash
cd starter && pnpm install
```

Open `strings.test.js`. Here's an example to get you started:

```js
describe('capitalize', () => {
  it('uppercases the first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('returns an empty string for empty input', () => {
    expect(capitalize('')).toBe('');
  });
});
```

Then run:

```bash
pnpm test
```

## Edge cases to consider

- **Empty strings** — what does `capitalize('')` return? `countWords('')`? `reverse('')`?
- **Single characters** — `capitalize('a')`, `reverse('x')`, `isPalindrome('a')`
- **Whitespace** — `slugify('  padded  ')`, `countWords('  lots   of   space  ')`
- **Already correct input** — `capitalize('Hello')` (already capitalised), `camelToKebab('color')` (no humps)
- **Boundary lengths** — `truncate('exact', 5)` where the string is exactly `max` characters

## Hints

`slugify` does several things: lowercases, trims, replaces spaces with hyphens, and strips non-word characters. Test each behaviour separately — one `it` per concern:

```js
describe('slugify', () => {
  it('converts spaces to hyphens and lowercases', () => { ... });
  it('removes special characters', () => { ... });
  it('collapses multiple spaces', () => { ... });
  it('trims leading and trailing whitespace', () => { ... });
});
```

## Stretch goals

- What does `isPalindrome('Madam')` return? It should be case-insensitive.
- Try testing `camelToKebab` with three or more humps: `'borderTopLeftRadius'`
- Can you think of an input where `slugify` returns an empty string?

## Reference solution

[`solution/strings.test.js`](solution/strings.test.js)
