# Exercise — Sort

**Mission briefing:** Use `.sort()` with comparator functions to order arrays of numbers and objects.

## Tasks

Implement in [`starter/index.js`](starter/index.js):

1. **`sortNumbers(numbers)`** — return the array sorted ascending. Remember: `.sort()` without a comparator sorts lexicographically!
2. **`sortByDanger(dinos)`** — given `{ species, dangerLevel }[]`, return sorted by `dangerLevel` **descending** (highest first).
3. **`sortByName(dinos)`** — given `{ species, dangerLevel }[]`, return sorted by `species` alphabetically.

**Note:** `.sort()` mutates the original array. The tests pass copies, so you can sort in place.

## Verify

```bash
cd starter && pnpm install && pnpm test
```

Reference: [`solution/index.js`](solution/index.js).
