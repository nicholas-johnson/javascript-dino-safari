/**
 * TODO: Return the top `n` users by post count as
 * `[{ id, name, postCount }]`, sorted descending by postCount.
 *
 * @param {{ id: number, name: string }[]} users
 * @param {{ userId: number, body: string }[]} posts
 * @param {number} n
 * @returns {{ id: number, name: string, postCount: number }[]}
 */
export function topPosters(users, posts, n) {
  return [];
}

/**
 * TODO: Return a Map of userId → post count (use `reduce`).
 *
 * @param {{ id: number }[]} users
 * @param {{ userId: number }[]} posts
 * @returns {Map<number, number>}
 */
export function postsPerUser(users, posts) {
  return new Map();
}

/**
 * TODO: Return average `body.length` across all posts, rounded to nearest integer (use `reduce`).
 *
 * @param {{ body: string }[]} posts
 * @returns {number}
 */
export function averagePostLength(posts) {
  return 0;
}
