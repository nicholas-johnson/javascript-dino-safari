/**
 * Demo: fetching real data from a public API.
 *
 * Run: node demo/04-fetch-from-api
 *
 * Uses JSONPlaceholder - a free, open REST API for testing.
 * https://jsonplaceholder.typicode.com
 */

const API = 'https://jsonplaceholder.typicode.com';

// --- 1. Simple fetch with error handling ------------------------------

async function getUser(id) {
  const res = await fetch(`${API}/users/${id}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.json();
}

console.log('\n--- 1. Fetch a single user ---');
try {
  const user = await getUser(1);
  console.log(`${user.name} (${user.email})`);
} catch (err) {
  console.error('Failed:', err.message);
}

// --- 2. Fetch that will 404 ------------------------------------------

console.log('\n--- 2. Handle a 404 ---');
try {
  const ghost = await getUser(99999);
  console.log(ghost);
} catch (err) {
  console.error('Expected error:', err.message);
}

// --- 3. Network error (bad domain) -----------------------------------

console.log('\n--- 3. Handle a network error ---');
try {
  const res = await fetch('https://this-domain-does-not-exist.example');
  const data = await res.json();
  console.log(data);
} catch (err) {
  console.error('Network error:', err.message);
}

// --- 4. Parallel fetches with Promise.all ----------------------------

async function getUserWithPosts(id) {
  const [user, posts] = await Promise.all([
    fetch(`${API}/users/${id}`).then((r) => r.json()),
    fetch(`${API}/users/${id}/posts`).then((r) => r.json()),
  ]);
  return { name: user.name, email: user.email, postCount: posts.length };
}

console.log('\n--- 4. Parallel fetch: user + their posts ---');
try {
  const summary = await getUserWithPosts(1);
  console.log(`${summary.name} has ${summary.postCount} posts`);
} catch (err) {
  console.error('Failed:', err.message);
}
