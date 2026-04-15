# Capstone 01 - Dino Park Dashboard

## The scenario

Park HQ needs a dashboard that pulls user and post data from the API, crunches it into statistics, and presents a summary. This exercise ties together everything from the course: `fetch` with `Promise.all`, `map`/`filter`/`reduce` for data transforms, object literals with `this` for the dashboard report, and clean module boundaries.

You'll build it across three files - each with a single responsibility - then wire them together.

## What you will build

### [`starter/fetch-data.js`](starter/fetch-data.js) - Data fetching

**`fetchParkData(fetchFn)`** - fetch `/users` and `/posts` from jsonplaceholder **in parallel** using `Promise.all`. Parse both responses and return `{ users, posts }`.

### [`starter/transform.js`](starter/transform.js) - Pure transform functions

| Function                      | Description                                                                                  |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| `postsPerUser(users, posts)`  | Return a `Map<userId, count>` using `reduce`. Include all users (0 for those with no posts). |
| `topPosters(users, posts, n)` | Return the top `n` users by post count as `[{ id, name, postCount }]`, sorted descending.    |
| `averagePostLength(posts)`    | Return the average `body.length` across all posts, rounded to the nearest integer.           |

### [`starter/dashboard.js`](starter/dashboard.js) - Report assembly

**`buildDashboard(users, posts)`** - return an object with:

| Property            | Type   | Description                                                                                              |
| ------------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| `userCount`         | number | `users.length`                                                                                           |
| `postCount`         | number | `posts.length`                                                                                           |
| `topPosters`        | array  | Result of `topPosters(users, posts, 3)`                                                                  |
| `averagePostLength` | number | Result of `averagePostLength(posts)`                                                                     |
| `summary()`         | method | Returns `"Dashboard: <userCount> users, <postCount> posts, avg length <averagePostLength>"` using `this` |

## Getting started

Open the three starter files. Implement `fetch-data.js` and `transform.js` first, then wire them into `dashboard.js`. Run:

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
