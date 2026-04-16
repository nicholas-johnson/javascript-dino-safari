# Capstone 01 - Dino Park Dashboard

## The scenario

Park HQ needs a dashboard that pulls user and post data from the API, crunches it into statistics, and presents a summary. This exercise ties together everything from the course: `fetch` with `Promise.all`, `map`/`filter`/`reduce` for data transforms, object literals with `this` for the dashboard report, and clean module boundaries.

The code is organised into domain folders with barrel `index.js` files controlling the public surface of each module.

## Project structure

```
starter/
  data/
    fetch-data.js       ← data fetching logic
    index.js            ← barrel: exports { fetchParkData }
  analytics/
    transforms.js       ← pure transform functions
    index.js            ← barrel: exports { postsPerUser, topPosters, averagePostLength }
  dashboard/
    dashboard.js        ← report assembly
    index.js            ← barrel: exports { buildDashboard }
  index.js              ← entry point
  index.test.js         ← tests (imports through barrels)
```

## What you will build

### [`starter/data/fetch-data.js`](starter/data/fetch-data.js) - Data fetching

**`fetchParkData(fetchFn)`** - fetch `/users` and `/posts` from jsonplaceholder **in parallel** using `Promise.all`. Parse both responses and return `{ users, posts }`.

### [`starter/analytics/transforms.js`](starter/analytics/transforms.js) - Pure transform functions

| Function                      | Description                                                                                  |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| `postsPerUser(users, posts)`  | Return a `Map<userId, count>` using `reduce`. Include all users (0 for those with no posts). |
| `topPosters(users, posts, n)` | Return the top `n` users by post count as `[{ id, name, postCount }]`, sorted descending.    |
| `averagePostLength(posts)`    | Return the average `body.length` across all posts, rounded to the nearest integer.           |

### [`starter/dashboard/dashboard.js`](starter/dashboard/dashboard.js) - Report assembly

**`buildDashboard(users, posts)`** - return an object with:

| Property            | Type   | Description                                                                                              |
| ------------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| `userCount`         | number | `users.length`                                                                                           |
| `postCount`         | number | `posts.length`                                                                                           |
| `topPosters`        | array  | Result of `topPosters(users, posts, 3)`                                                                  |
| `averagePostLength` | number | Result of `averagePostLength(posts)`                                                                     |
| `summary()`         | method | Returns `"Dashboard: <userCount> users, <postCount> posts, avg length <averagePostLength>"` using `this` |

Note: `dashboard.js` imports its helpers from `../analytics/index.js` - cross-module imports go through barrels.

## Getting started

Implement `data/fetch-data.js` and `analytics/transforms.js` first, then wire them into `dashboard/dashboard.js`. Run:

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The tests use mock data and a mock fetch function - no network access needed. They check each transform individually, the dashboard shape, the `summary()` output, and that both API endpoints are called.

## Hints

- `postsPerUser`: reduce posts into a Map, then loop over users to ensure every user has an entry (even 0).
- `topPosters` can reuse `postsPerUser` internally.
- `summary()` must use `this` - it reads `this.userCount`, `this.postCount`, and `this.averagePostLength`.
- `Math.round(total / posts.length)` handles the rounding for average length.

## Reference solution

[`solution/`](solution/) folder
