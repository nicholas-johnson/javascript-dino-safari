import { describe, it, expect } from 'vitest';
import { add, greet, isAdult, repeat, head, sum, formatDino } from './math.js';

describe('add', () => {
  it('adds two numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
  it('handles negatives', () => {
    expect(add(-1, -4)).toBe(-5);
  });
});

describe('greet', () => {
  it('returns a greeting', () => {
    expect(greet('Rex')).toBe('Hello, Rex!');
  });
});

describe('isAdult', () => {
  it('returns true for 18+', () => {
    expect(isAdult(21)).toBe(true);
  });
  it('returns false for under 18', () => {
    expect(isAdult(12)).toBe(false);
  });
  it('returns true for exactly 18', () => {
    expect(isAdult(18)).toBe(true);
  });
});

describe('repeat', () => {
  it('repeats a string', () => {
    expect(repeat('ha', 3)).toBe('hahaha');
  });
  it('returns empty for 0 repeats', () => {
    expect(repeat('x', 0)).toBe('');
  });
});

describe('head', () => {
  it('returns the first element', () => {
    expect(head([10, 20, 30])).toBe(10);
  });
  it('returns undefined for empty array', () => {
    expect(head([])).toBeUndefined();
  });
});

describe('sum', () => {
  it('sums an array of numbers', () => {
    expect(sum([1, 2, 3, 4])).toBe(10);
  });
  it('returns 0 for an empty array', () => {
    expect(sum([])).toBe(0);
  });
});

describe('formatDino', () => {
  it('formats a dinosaur description', () => {
    expect(formatDino('Rex', 'T-Rex')).toBe('Rex the T-Rex');
  });
});
