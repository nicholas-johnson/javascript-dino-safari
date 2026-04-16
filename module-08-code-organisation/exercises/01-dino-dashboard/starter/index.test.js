import { describe, expect, it } from 'vitest';
import { buildDashboard } from './dashboard/index.js';
import { fetchParkData } from './data/index.js';
import {
  averagePostLength,
  postsPerUser,
  topPosters,
} from './analytics/index.js';

const mockUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const bodyLen10 = 'aaaaaaaaaa';
const bodyLen20 = 'aaaaaaaaaaaaaaaaaaaa';

const mockPosts = [
  ...Array.from({ length: 5 }, (_, i) => ({
    userId: 1,
    id: i + 1,
    title: 't',
    body: bodyLen10,
  })),
  ...Array.from({ length: 3 }, (_, i) => ({
    userId: 2,
    id: i + 100,
    title: 't',
    body: bodyLen20,
  })),
];

describe('transform', () => {
  it('postsPerUser returns correct Map', () => {
    const map = postsPerUser(mockUsers, mockPosts);
    expect(map.get(1)).toBe(5);
    expect(map.get(2)).toBe(3);
    expect(map.get(3)).toBe(0);
  });

  it('topPosters returns top 2 sorted by postCount descending', () => {
    expect(topPosters(mockUsers, mockPosts, 2)).toEqual([
      { id: 1, name: 'Alice', postCount: 5 },
      { id: 2, name: 'Bob', postCount: 3 },
    ]);
  });

  it('averagePostLength returns correct rounded average', () => {
    expect(averagePostLength(mockPosts)).toBe(14);
  });
});

describe('dashboard', () => {
  it('buildDashboard returns correct shape', () => {
    const dashboard = buildDashboard(mockUsers, mockPosts);
    expect(dashboard.userCount).toBe(3);
    expect(dashboard.postCount).toBe(8);
    expect(dashboard.averagePostLength).toBe(14);
    expect(dashboard.topPosters).toEqual([
      { id: 1, name: 'Alice', postCount: 5 },
      { id: 2, name: 'Bob', postCount: 3 },
      { id: 3, name: 'Charlie', postCount: 0 },
    ]);
  });

  it('summary returns the right string using this', () => {
    const dashboard = buildDashboard(mockUsers, mockPosts);
    expect(dashboard.summary()).toBe(
      'Dashboard: 3 users, 8 posts, avg length 14',
    );
  });
});

describe('fetch-data', () => {
  it('fetchParkData calls both URLs and returns { users, posts }', async () => {
    const calls = [];
    const mockFetch = async (url) => {
      calls.push(url);
      return {
        json: async () =>
          url.includes('/users') ? mockUsers : mockPosts,
      };
    };
    const result = await fetchParkData(mockFetch);
    expect(calls).toHaveLength(2);
    expect(calls.some((u) => u.includes('/users'))).toBe(true);
    expect(calls.some((u) => u.includes('/posts'))).toBe(true);
    expect(result).toEqual({ users: mockUsers, posts: mockPosts });
  });
});
