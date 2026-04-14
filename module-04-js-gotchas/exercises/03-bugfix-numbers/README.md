# Bug Hunt: Numbers & Money

**Mission briefing:** Five utility functions shipped with subtle number-handling bugs. The tests describe the correct behaviour - run them, read the failures, and fix each function.

## How it works

1. Run the tests - they will fail.
2. Read each failure message to understand the expected vs actual behaviour.
3. Fix the bug in `starter/index.js`. Each function has exactly one bug.

## The bugs you are hunting

| Function          | Symptom                                                                                                     |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| `totalPriceCents` | Accumulates IEEE float errors by summing dollars then converting - should convert each price to cents first |
| `parseAge`        | `parseInt("12abc")` happily returns `12` - should reject unclean input                                      |
| `isStrictlyNaN`   | Global `isNaN` coerces before checking - `undefined` and strings wrongly return `true`                      |
| `safeDivide`      | Returns `Infinity` or `NaN` on division by zero instead of `null`                                           |
| `roundTo2`        | `.toFixed(2)` returns a string - arithmetic on the result silently concatenates                             |

## Verify

```bash
cd starter && pnpm install && pnpm test
```

Reference: [`solution/index.js`](solution/index.js).
