import { averagePostLength, topPosters } from '../analytics/index.js';

export function buildDashboard(users, posts) {
  return {
    userCount: users.length,
    postCount: posts.length,
    topPosters: topPosters(users, posts, 3),
    averagePostLength: averagePostLength(posts),
    summary() {
      return `Dashboard: ${this.userCount} users, ${this.postCount} posts, avg length ${this.averagePostLength}`;
    },
  };
}
