# Module 4 - JS Gotchas: Trainer Notes

## Positioning

- End-of-day-1 module - keep it **fun and interactive**.
- Frame it as "JavaScript is trying to help, but sometimes it helps wrong."
- Encourage students to predict output before you run each demo line.

## Timing (~90 min total)

| Block                            | Time   |
| -------------------------------- | ------ |
| Demo 01 - Coercion traps         | 10 min |
| Demo 02 - Truthy/falsy           | 15 min |
| Demo 03 - Number gotchas         | 10 min |
| Demo 04 - Edge cases             | 10 min |
| Exercise 01 - Bug Hunt: Coercion | 15 min |
| Exercise 02 - Bug Hunt: Equality | 15 min |
| Exercise 03 - Bug Hunt: Numbers  | 15 min |

## Demo flow

1. **Coercion traps** - warm up with `"5" + 3` vs `"5" - 3`. Ask the room to predict. The `[] == false` vs `Boolean([])` contradiction always gets a reaction.
2. **Truthy/falsy** - walk through the eight falsy values. Emphasise `??` vs `||` as the practical takeaway - this is the one they will use every day.
3. **Number gotchas** - `0.1 + 0.2` is the crowd favourite. Transition to the money-in-cents pattern. Mention `BigInt` briefly but don't dwell on it.
4. **Edge cases** - `typeof null` is the historic favourite. `typeof []` is the segue to "we'll cover objects properly tomorrow". `Object.is` wraps up the equality trilogy.

## Exercise format - Bug Hunt

- These are different from earlier exercises: the code already exists, it just has bugs.
- Tell students: "Run the tests first. Read the failure messages. The test names are your hints."
- Each function has exactly one bug - encourage them to resist rewriting from scratch.
- Walk the room during exercises. Common sticking points:
  - Ex01 `countTruthy`: students often don't realise `1 == true` is `true` but `2 == true` is `false`.
  - Ex01 `hasItems`: the `[] == false` gotcha is counterintuitive - remind them of Demo 01.
  - Ex02 `isActuallyNaN`: many students don't know `val !== val` is the old-school NaN test.
  - Ex02 `betterTypeof`: two bugs in one function (null and arrays) - allow this to take a bit longer.
  - Ex03 `totalPriceCents`: the key insight is to convert each price to cents individually, not sum dollars then convert.
  - Ex03 `parseAge`: `parseInt("12abc")` returning `12` surprises everyone.

## Key messages to land

- **Default to `===`**. Use `== null` deliberately when you want to catch both null and undefined.
- **Use `??` for defaults**, not `||`, unless you genuinely want to replace all falsy values.
- **Never do maths on money as floats**. Convert to integer cents at the boundary.
- **`typeof` lies twice**: `null` is `"object"`, arrays are `"object"`. Use `=== null` and `Array.isArray()`.
- **`Number.isNaN` not `isNaN`**: the global version coerces first and will mislead you.
