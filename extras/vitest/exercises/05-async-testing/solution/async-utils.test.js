import { describe, it, expect } from 'vitest';
import { delay, fetchUser, fetchAll, timeout, retry } from './async-utils.js';

describe('delay', () => {
  it('resolves with "done"', async () => {
    await expect(delay(10)).resolves.toBe('done');
  });
});

describe('fetchUser', () => {
  it('resolves a known user', async () => {
    const user = await fetchUser(1);
    expect(user).toEqual({ id: 1, name: 'Ada' });
  });

  it('resolves a different known user', async () => {
    const user = await fetchUser(3);
    expect(user).toEqual({ id: 3, name: 'Alan' });
  });

  it('rejects for an unknown id', async () => {
    await expect(fetchUser(99)).rejects.toThrow('Unknown user: 99');
  });
});

describe('fetchAll', () => {
  it('fetches multiple users', async () => {
    const users = await fetchAll([1, 2]);
    expect(users).toEqual([
      { id: 1, name: 'Ada' },
      { id: 2, name: 'Grace' },
    ]);
  });

  it('returns an empty array for no ids', async () => {
    const users = await fetchAll([]);
    expect(users).toEqual([]);
  });

  it('rejects if any id is unknown', async () => {
    await expect(fetchAll([1, 99])).rejects.toThrow('Unknown user: 99');
  });
});

describe('timeout', () => {
  it('resolves when the promise is fast enough', async () => {
    const result = await timeout(delay(10), 200);
    expect(result).toBe('done');
  });

  it('rejects when the promise is too slow', async () => {
    await expect(timeout(delay(500), 10)).rejects.toThrow('Timeout');
  });
});

describe('retry', () => {
  it('returns the value on first success', async () => {
    const fn = async () => 42;
    const result = await retry(fn, 3);
    expect(result).toBe(42);
  });

  it('retries until success', async () => {
    let calls = 0;
    const fn = async () => {
      calls++;
      if (calls < 3) throw new Error('not yet');
      return 'ok';
    };
    const result = await retry(fn, 5);
    expect(result).toBe('ok');
    expect(calls).toBe(3);
  });

  it('throws the last error when all attempts fail', async () => {
    const fn = async () => {
      throw new Error('always fails');
    };
    await expect(retry(fn, 3)).rejects.toThrow('always fails');
  });
});
