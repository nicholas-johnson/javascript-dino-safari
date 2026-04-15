# Exercise - ESM imports

**Mission briefing:** The park's alert system needs to pull in code from three sources: a **Node built-in** module, an **npm package**, and a **local file**. Wire up the imports and implement two small functions.

## Tasks

Edit [`starter/index.js`](starter/index.js):

1. **Import `path`** from `node:path` (Node built-in).
2. **Import `pc`** from `picocolors` (npm package - installed with `pnpm install`).
3. **Import `{ getRiskLabel }`** from `./risk-levels.js` (local module).
4. **Implement `formatAlert(dino)`**:
   - Apply `??` defaults: `name` → `'Unknown'`, `zone` → `'Uncharted'`, `dangerLevel` → `0`.
   - Get the risk label with `getRiskLabel(dangerLevel)`.
   - Colour the label with picocolors: `pc.red` if danger >= 4, `pc.yellow` if >= 2, otherwise `pc.green`.
   - Return format: `[COLOURED_LABEL] name @ zone`

## Verify

```bash
cd starter && pnpm install && pnpm test
```

Reference: [`solution/index.js`](solution/index.js).
