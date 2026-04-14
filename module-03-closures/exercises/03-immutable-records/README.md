# Exercise - Immutable dino records

**Mission briefing:** Incident reports must never mutate archived records. Refactor mutating helpers to return **new objects** (nested fields included).

## Tasks

Edit [`starter/index.js`](starter/index.js):

1. **`bumpDangerLevel(dino, delta)`** - return a **new** dino object with `dangerLevel` increased by `delta`. Do **not** change `dino`.
2. **`renameZone(dino, newZone)`** - return a new object with `zone: newZone`, same other fields.

Assume `dino` is a plain data object like `{ name, zone, dangerLevel, tags: string[] }`.

## Verify

```bash
cd starter && pnpm install && pnpm test
```

Reference: [`solution/index.js`](solution/index.js).
