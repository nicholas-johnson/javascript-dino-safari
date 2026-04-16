# Capstone 2 - URL Shortener API

Build a JSON API that shortens URLs, stores them in a local file, and redirects visitors to the original address.

---

## What you're building

A small HTTP server with three endpoints:

```
POST /shorten        { "url": "https://example.com/very/long/path" }
                     → 201  { "short": "http://localhost:3000/abc123" }

GET  /abc123         → 302 redirect to the original URL

GET  /stats/abc123   → 200  { "url": "...", "created": "...", "hits": 7 }
```

All data lives in a single `links.json` file on disk. No database required.

---

## Requirements

### HTTP server

- Use `node:http` with `createServer`.
- Route requests by matching `req.method` and parsing `req.url` with `new URL()`.
- Return proper status codes: `201` on creation, `302` for redirects, `404` for unknown slugs, `400` for bad input.
- Set `Content-Type: application/json` on all JSON responses. Set `Location` header on redirects.

### Body parsing

- Collect request body chunks with `for await`, then `JSON.parse`.
- Wrap parsing in `try`/`catch` and return `400` with `{ "error": "invalid JSON" }` on failure.

### Slug generation

- Write a `createSlugGenerator(length)` factory that returns a function.
- The returned function closes over `length` and generates a random alphanumeric string each time it's called.
- Default length: 6 characters.

### Data persistence

- On startup, load `links.json` synchronously with `readFileSync` (fine at boot). If the file doesn't exist, start with an empty object.
- After every write (new link or hit increment), save the updated object with `writeFile`.
- Build all file paths with `path.join` from a `__dirname` derived via `import.meta.url`.

### URL validation

- Check that the submitted `url` field is a non-empty string.
- Wrap it in `new URL()` inside a `try`/`catch` to verify it's a valid URL. Return `400` if not.
- Be careful: `new URL()` throws on invalid input.

### Hit counting

- Each link object stores a `hits` counter, initialised to `0`.
- Increment on every `GET /:slug` redirect.
- The `/stats/:slug` endpoint returns the full link object including `hits`.

### Data pipeline for stats

- Add a `GET /stats` endpoint (no slug) that returns a summary: total links, total hits, and the top 3 most-visited links.
- Use `.map()`, `.sort()`, and `.slice()` to compute the ranking.

### Code organisation

- Split into modules: `server.js` (HTTP routing), `store.js` (file I/O and data access), `slugs.js` (slug generation), `validate.js` (input validation).
- Wire them together in `index.js`.

---

## Modules practiced

| Module | How it's used |
|---|---|
| 1 - Modern JS | ESM imports, template literals, `const`/`let`, destructuring |
| 2 - Functions | `.map()`, `.sort()`, `.slice()` for stats ranking |
| 3 - Closures | Slug generator factory closing over length |
| 4 - Gotchas | `new URL()` throwing, `===` for comparisons, falsy checks on input |
| 5 - Objects | Link objects, `Map` or plain object as in-memory store, `this` in methods |
| 6 - Async | `async`/`await` for file writes, `try`/`catch` for JSON parsing |
| 7 - Node tools | `http.createServer`, `node:url`, `fs/promises`, `readFileSync`, `path` |
| 8 - Code org | Multi-module split, facade `index.js`, explicit exports |

---

## Stretch goals

- Add a `DELETE /stats/:slug` endpoint that removes a link.
- Add an expiry: links older than 24 hours return `410 Gone`.
- Serve a tiny HTML page at `GET /` that shows all links in a table (use template literals to build the HTML string).
