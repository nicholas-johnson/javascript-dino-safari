import { fetchUserSummaries } from './fetch-combine.js';

const summaries = await fetchUserSummaries(fetch);

console.log(`Fetched ${summaries.length} users:\n`);
for (const u of summaries) {
  console.log(`  ${u.name} (${u.email}) - ${u.postCount} posts`);
}
