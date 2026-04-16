const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function fetchParkData(fetchFn) {
  const [usersRes, postsRes] = await Promise.all([
    fetchFn(USERS_URL),
    fetchFn(POSTS_URL),
  ]);
  const [users, posts] = await Promise.all([usersRes.json(), postsRes.json()]);
  return { users, posts };
}
