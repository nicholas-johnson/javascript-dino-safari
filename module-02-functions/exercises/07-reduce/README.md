# Exercise - Reduce

**Mission briefing:** Use `.reduce()` to fold arrays into a single value - a number, an object, or a specific element.

## Tasks

Implement in [`starter/index.js`](starter/index.js):

1. **`sum(numbers)`** - reduce an array of numbers to their total.
2. **`countByZone(dinos)`** - given `{ species, zone }[]`, reduce to a `{ zone: count }` object.
3. **`maxDanger(dinos)`** - given `{ species, dangerLevel }[]`, reduce to the single dino object with the highest `dangerLevel`. Return `null` for an empty array.

## Verify

```bash
cd starter && pnpm install && pnpm test
```

Reference: [`solution/index.js`](solution/index.js).
