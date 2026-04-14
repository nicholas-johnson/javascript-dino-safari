# Bug Hunt: Equality & typeof

**Mission briefing:** Five utility functions shipped with subtle equality and typeof bugs. The tests describe the correct behaviour - run them, read the failures, and fix each function.

## How it works

1. Run the tests - they will fail.
2. Read each failure message to understand the expected vs actual behaviour.
3. Fix the bug in `starter/index.js`. Each function has exactly one bug.

## The bugs you are hunting

| Function        | Symptom                                                        |
| --------------- | -------------------------------------------------------------- |
| `isNullish`     | Misses `undefined` - only catches `null`                       |
| `betterTypeof`  | Returns `"object"` for `null` and arrays                       |
| `isActuallyNaN` | Returns `true` for non-NaN values like `undefined` and strings |
| `isArray`       | Always returns `false` - `typeof` never returns `"array"`      |
| `areSameValue`  | Fails for `NaN === NaN` (false) and `0 === -0` (true)          |

## Verify

```bash
cd starter && pnpm install && pnpm test
```

Reference: [`solution/index.js`](solution/index.js).
