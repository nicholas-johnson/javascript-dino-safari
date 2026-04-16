/**
 * @param {{ id: number, name: string }[]} users
 * @param {{ userId: number, body: string }[]} posts
 * @param {number} n
 * @returns {{ id: number, name: string, postCount: number }[]}
 */
export function topPosters(users, posts, n) {
  const counts = postsPerUser(users, posts);
  return [...users]
    .map((user) => ({
      id: user.id,
      name: user.name,
      postCount: counts.get(user.id) ?? 0,
    }))
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, n);
}

/**
 * @param {{ id: number }[]} users
 * @param {{ userId: number }[]} posts
 * @returns {Map<number, number>}
 */
export function postsPerUser(users, posts) {
  const map = posts.reduce((acc, post) => {
    const uid = post.userId;
    acc.set(uid, (acc.get(uid) ?? 0) + 1);
    return acc;
  }, new Map());
  for (const user of users) {
    if (!map.has(user.id)) {
      map.set(user.id, 0);
    }
  }
  return map;
}

/**
 * @param {{ body: string }[]} posts
 * @returns {number}
 */
export function averagePostLength(posts) {
  if (posts.length === 0) {
    return 0;
  }
  const total = posts.reduce((sum, post) => sum + post.body.length, 0);
  return Math.round(total / posts.length);
}
