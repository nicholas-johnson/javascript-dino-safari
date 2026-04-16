/**
 * Fetch users and posts in parallel, return a combined summary.
 *
 * @param {typeof fetch} fetchFn
 * @returns {Promise<Array<{ id: number, name: string, email: string, postCount: number }>>}
 */
export async function fetchUserSummaries(fetchFn) {
  // TODO:
  // 1. Fetch /users and /posts in parallel with Promise.all
  // 2. Parse both JSON responses
  // 3. Count posts per userId
  // 4. Return [{ id, name, email, postCount }] sorted by id
  return [];
}
