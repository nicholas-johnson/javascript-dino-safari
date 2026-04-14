# Exercise — String manipulation

**Mission briefing:** Practice everyday string methods — trimming, searching, slicing, splitting, and formatting.

## Tasks

Implement in [`starter/index.js`](starter/index.js):

1. **`shout(str)`** — returns the string in uppercase with `!` appended.
2. **`whisper(str)`** — returns the string in lowercase, wrapped in parentheses.
3. **`formatTag(id, zone)`** — returns `"[ID] zone"` using a template literal.
4. **`containsWord(str, word)`** — returns `true` if `str` includes `word`, `false` otherwise.
5. **`initials(fullName)`** — given `"First Last"`, returns `"F.L."`. Split on space, take the first character of each part, uppercase it, join with dots, add a trailing dot.

## Verify

```bash
cd starter && pnpm install && pnpm test
```

Reference: [`solution/index.js`](solution/index.js).
