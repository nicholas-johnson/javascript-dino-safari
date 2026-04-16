# Capstone 4 - Weather Aggregator CLI

Build a command-line tool that fetches weather data for multiple cities in parallel, merges the results, and writes a formatted report to a file.

---

## What you're building

```bash
node weather.js --cities "London,Tokyo,New York" --output report.txt
```

The tool:

1. Accepts a comma-separated list of city names.
2. Fetches current weather for every city concurrently using a free API.
3. Merges the results into a structured report.
4. Writes the report to a file (or prints to stdout if no `--output` is given).

Use the free [Open-Meteo API](https://open-meteo.com/) - no API key required.

---

## Requirements

### CLI parsing

- Parse `--cities` and `--output` from `process.argv`.
- Split the cities string on commas and `.map(c => c.trim())` to clean whitespace.
- Validate that at least one city was provided; print usage instructions if not.
- Use default parameters where appropriate.

### Geocoding and fetching

- First, convert each city name to coordinates using the Open-Meteo geocoding endpoint: `https://geocoding-api.open-meteo.com/v1/search?name=London&count=1`.
- Then fetch the weather for those coordinates: `https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=-0.1&current_weather=true`.
- Use the built-in `fetch` (available in Node 18+).

### Concurrency with Promise.all

- Fetch all cities in parallel with `Promise.all`.
- If one city fails (bad name, network error), the others should still succeed. Use `Promise.allSettled` and report which cities failed.
- Implement a timeout: if any single fetch takes longer than 5 seconds, abort it with `AbortController` + `AbortSignal.timeout(5000)`.

### Data transformation pipeline

- For each successful response, extract: city name, temperature, wind speed, weather description.
- Use `.filter()` to remove failed results, `.map()` to reshape into report objects, and `.sort()` to order by temperature (coldest first).
- Use `.reduce()` to compute aggregate stats: average temperature, highest wind speed.

### Report formatting

- Build the report string with template literals.
- Include a header with the current date and city count.
- List each city's weather on its own line, formatted in aligned columns.
- Append the aggregate stats at the bottom.

### Caching with closures

- Write a `createCache(ttlMs)` factory that returns an object with `get(key)` and `set(key, value)` methods.
- The cache closes over a `Map` and the TTL. `get` returns `undefined` for expired entries.
- Before fetching, check the cache. After fetching, store the result. This avoids redundant API calls during development.

### Error handling

- Network errors: catch and report gracefully per city.
- JSON parse errors: `try`/`catch` around every `response.json()`.
- Missing fields: use `??` for defaults (e.g. wind speed might be `null`).
- Be careful with `typeof` and `NaN` checks on numeric weather data.

### File output

- If `--output` is provided, write the report with `writeFile` from `node:fs/promises`.
- Create parent directories with `mkdir({ recursive: true })` if the path includes folders.
- Build the path safely with `path.join`.

### Code organisation

- `cli.js` - argument parsing.
- `geo.js` - geocoding lookups.
- `weather.js` - weather API calls.
- `report.js` - data transformation and formatting.
- `cache.js` - TTL cache factory.
- `index.js` - orchestration.

---

## Modules practiced

| Module | How it's used |
|---|---|
| 1 - Modern JS | ESM, template literals, destructuring, `process.argv` |
| 2 - Functions | `.filter()`, `.map()`, `.sort()`, `.reduce()` data pipeline |
| 3 - Closures | TTL cache factory closing over a Map and expiry time |
| 4 - Gotchas | `NaN` checks on weather data, `??` for null defaults, `typeof` |
| 5 - Objects | Weather data objects, Map for caching, destructured API responses |
| 6 - Async | `Promise.all` / `allSettled`, `AbortController` timeout, `try`/`catch` |
| 7 - Node tools | `fetch`, `fs/promises`, `path`, `url` for building API URLs |
| 8 - Code org | Six-module split, clear data flow, facade pattern |

---

## Stretch goals

- Add a `--format json` flag that outputs structured JSON instead of plain text.
- Add a `--interval 60` flag that re-fetches every N seconds and appends to the report (use `setInterval` + streams).
- Write Vitest tests for the report formatting functions using hardcoded sample data.
