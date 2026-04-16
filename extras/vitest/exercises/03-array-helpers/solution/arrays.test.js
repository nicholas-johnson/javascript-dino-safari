import { describe, it, expect } from 'vitest';
import { unique, chunk, flatten, compact, intersection, zip, range } from './arrays.js';

describe('unique', () => {
  it('removes duplicates', () => {
    expect(unique([1, 2, 2, 3, 3, 3])).toEqual([1, 2, 3]);
  });

  it('returns an empty array for empty input', () => {
    expect(unique([])).toEqual([]);
  });

  it('handles strings', () => {
    expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b']);
  });

  it('preserves order of first occurrence', () => {
    expect(unique([3, 1, 2, 1, 3])).toEqual([3, 1, 2]);
  });
});

describe('chunk', () => {
  it('splits into equal chunks', () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });

  it('handles a remainder chunk', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('returns the whole array as one chunk when size >= length', () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });

  it('returns an empty array for empty input', () => {
    expect(chunk([], 3)).toEqual([]);
  });
});

describe('flatten', () => {
  it('flattens a nested array', () => {
    expect(flatten([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
  });

  it('returns a flat array unchanged', () => {
    expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it('handles an empty array', () => {
    expect(flatten([])).toEqual([]);
  });
});

describe('compact', () => {
  it('removes falsy values', () => {
    expect(compact([0, 1, false, 2, '', 3, null, undefined, NaN])).toEqual([1, 2, 3]);
  });

  it('returns an empty array when all values are falsy', () => {
    expect(compact([0, false, null, ''])).toEqual([]);
  });

  it('keeps truthy strings and numbers', () => {
    expect(compact(['hello', 42])).toEqual(['hello', 42]);
  });
});

describe('intersection', () => {
  it('finds common elements', () => {
    expect(intersection([1, 2, 3], [2, 3, 4])).toEqual([2, 3]);
  });

  it('returns an empty array when no overlap', () => {
    expect(intersection([1, 2], [3, 4])).toEqual([]);
  });

  it('handles duplicates in the first array', () => {
    expect(intersection([1, 1, 2], [1])).toEqual([1]);
  });

  it('handles empty arrays', () => {
    expect(intersection([], [1, 2])).toEqual([]);
  });
});

describe('zip', () => {
  it('pairs elements from two arrays', () => {
    expect(zip([1, 2, 3], ['a', 'b', 'c'])).toEqual([[1, 'a'], [2, 'b'], [3, 'c']]);
  });

  it('stops at the shorter array', () => {
    expect(zip([1, 2], ['a', 'b', 'c'])).toEqual([[1, 'a'], [2, 'b']]);
  });

  it('returns an empty array when one input is empty', () => {
    expect(zip([], [1, 2])).toEqual([]);
  });
});

describe('range', () => {
  it('generates a range of numbers', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4]);
  });

  it('uses a custom step', () => {
    expect(range(0, 10, 3)).toEqual([0, 3, 6, 9]);
  });

  it('returns an empty array when start >= end', () => {
    expect(range(5, 5)).toEqual([]);
  });

  it('starts from a non-zero value', () => {
    expect(range(3, 7)).toEqual([3, 4, 5, 6]);
  });
});
