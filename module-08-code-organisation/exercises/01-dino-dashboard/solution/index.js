import { fetchParkData } from './data/index.js';
import { buildDashboard } from './dashboard/index.js';

const { users, posts } = await fetchParkData(fetch);
const dashboard = buildDashboard(users, posts);

console.log(dashboard.summary());
console.log('Top posters:', dashboard.topPosters);
