import { describe, it, expect } from 'vitest';
import { identity, wrapInArray, first, last, mapArray, filterArray, merge, lookup } from './collections.js';

describe('identity', () => {
  it('returns a number', () => {
    expect(identity(42)).toBe(42);
  });
  it('returns a string', () => {
    expect(identity('hello')).toBe('hello');
  });
});

describe('wrapInArray', () => {
  it('wraps a number', () => {
    expect(wrapInArray(5)).toEqual([5]);
  });
  it('wraps a string', () => {
    expect(wrapInArray('a')).toEqual(['a']);
  });
});

describe('first', () => {
  it('returns the first element', () => {
    expect(first([10, 20, 30])).toBe(10);
  });
  it('returns undefined for empty array', () => {
    expect(first([])).toBeUndefined();
  });
  it('works with strings', () => {
    expect(first(['a', 'b'])).toBe('a');
  });
});

describe('last', () => {
  it('returns the last element', () => {
    expect(last([10, 20, 30])).toBe(30);
  });
  it('returns undefined for empty array', () => {
    expect(last([])).toBeUndefined();
  });
});

describe('mapArray', () => {
  it('doubles numbers', () => {
    expect(mapArray([1, 2, 3], (n) => n * 2)).toEqual([2, 4, 6]);
  });
  it('converts to strings', () => {
    expect(mapArray([1, 2], (n) => String(n))).toEqual(['1', '2']);
  });
  it('handles empty array', () => {
    expect(mapArray([], (x) => x)).toEqual([]);
  });
});

describe('filterArray', () => {
  it('filters even numbers', () => {
    expect(filterArray([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([2, 4]);
  });
  it('filters by length', () => {
    expect(filterArray(['hi', 'hello', 'yo'], (s) => s.length > 2)).toEqual(['hello']);
  });
});

describe('merge', () => {
  it('merges two objects', () => {
    expect(merge({ a: 1 }, { b: 2 })).toEqual({ a: 1, b: 2 });
  });
  it('later properties win', () => {
    expect(merge({ a: 1 }, { a: 2 })).toEqual({ a: 2 });
  });
});

describe('lookup', () => {
  it('looks up a key', () => {
    expect(lookup({ name: 'Rex', age: 5 }, 'name')).toBe('Rex');
  });
  it('looks up another key', () => {
    expect(lookup({ name: 'Rex', age: 5 }, 'age')).toBe(5);
  });
});
