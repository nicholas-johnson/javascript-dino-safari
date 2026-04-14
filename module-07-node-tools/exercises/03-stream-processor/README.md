# Exercise - Stream dangerous sightings from CSV

**Mission briefing:** Large CSV exports should be processed as a **stream** so memory stays flat. Parse our simple `trackingId,dangerLevel,zone` format and keep rows where `dangerLevel >= minDanger`.

## Tasks

Implement `streamFilterDangerous(filePath, minDanger)` in [`starter/index.js`](starter/index.js):

- Use **`fs.createReadStream`** plus **`readline.createInterface`** (or a `Transform` stream if you prefer).
- Skip the header row.
- For each data row, parse integers safely; emit objects `{ trackingId, dangerLevel, zone }`.
- Return a **Promise** resolving to the **array** of matching rows (tests keep I/O small).

## Verify

```bash
cd starter && pnpm install && pnpm test
```

Reference: [`solution/index.js`](solution/index.js).
