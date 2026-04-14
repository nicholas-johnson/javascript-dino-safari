# Exercise - Minimal Dino HTTP API

**Mission briefing:** Expose read-only dinosaur data over **`http.createServer`** with JSON responses.

## Tasks

Implement `createDinoApiServer({ dinosaurs })` in [`starter/index.js`](starter/index.js) returning an `http.Server` instance (do **not** call `listen` inside the factory - tests will bind a port).

Routes:

- `GET /health` → **200** `{"ok":true}` with `Content-Type: application/json`.
- `GET /dinosaurs` → **200** JSON array of all dinosaurs passed in.
- `GET /dinosaurs/<trackingId>` → **200** single record if found; **404** JSON `{"error":"not_found"}` if missing.
- Anything else → **404** JSON `{"error":"not_found"}`.

Use only built-in modules (`node:http`, `node:url`, etc.).

## Verify

```bash
cd starter && pnpm install && pnpm test
```

Reference: [`solution/index.js`](solution/index.js).
