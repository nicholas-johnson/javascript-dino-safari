# Exercise - First Vitest: `formatSighting`

**Mission briefing:** HQ wants a single string format for console alerts. Implement `formatSighting(dino)` and let Vitest guard the contract.

## Tasks

Edit [`starter/format-sighting.js`](starter/format-sighting.js) and implement `formatSighting(dino)`:

- Use **template literals**.
- Include **trackingId**, **name**, **species**, **zone**, and **dangerLevel** in the output.
- Apply sensible defaults with **`??`** when a field is `null` or `undefined`:
  - `trackingId` → `'NO-ID'`
  - `name` → `'Unknown'`
  - `species` → `'unknown'`
  - `zone` → `'Unzoned'`
  - `dangerLevel` → `0`

Exact format (tests enforce this):

```
[ID] Name - species @ zone (risk N)
```

Example: `[TRX-001] Rex - Tyrannosaurus @ Cretaceous Valley (risk 5)`

## Verify

```bash
cd starter && npm test
```

Instructor reference: [`solution/format-sighting.js`](solution/format-sighting.js).
